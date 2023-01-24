import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductImage } from './entities/product-image.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductService')

  // se aconseja a utilizar con el patron repositorio
  // para manejar la db
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    // sirve para query runner, para hacer transacciones
    // si todas las siguientes consultan se ejecutan bien , que haga los cambios
    private readonly dataSource: DataSource,
  ) { }

  async create(createProductDto: CreateProductDto,user: User) {

    // no se aconseja es mejor utilizar el patron repostiorio
    // const product = new Product()
    try {
      const { images = [], ...productDetails } = createProductDto
      // revisar todo los parametros son 3 hay flechitas en el create
      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(
          image => this.productImageRepository.create({ url: image })
        ),
        user
      })
      await this.productRepository.save(product)
      return { ...product, images }
    } catch (error) {
      // throw new InternalServerErrorException('helpe me')
      this.handleDBExceptions(error)
    }

    // return 'This action adds a new product';
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    // el que tiene el id del producto es la tabla de iamgenes
    // el producto no se entera que tiene imagenes

    // los array de imagenes solo lo maneja typeorm

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
        // images:{
        //   url : true
        // }
      }
    })
    // return products
    return products.map((product) => ({
      ...product,
      images: product.images.map(img => img.url)
    }))
  }

  async findOne(term: string) {
    let product: Product

    // instalar uuid para verificar is es uuid
    // npm i uuid
    // import { validate as isUUID } from 'uuid';
    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term })
    } else {
      // prod es una alias para los joins
      // si no uso los joins normalemente se puede hacer el
      // select * from productos as prod inner join images as img
      // this.productRepository.createQueryBuilder()
      // el createQueryBuilder como su mismo nombre lo dice es para construir
      // queries 
      const queryBuilder = this.productRepository.createQueryBuilder('prod')
      product = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
          // prodImages es el alias del la tabla imagenes
        }).leftJoinAndSelect('prod.images', 'prodImages').getOne()
    }
    if (!product) {
      throw new NotFoundException(`Product with ${term} not found`)
    }
    return product
  }

  // para que me de un producto con las imagenes aplanadas ['','','']
  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term)
    return {
      ...rest,
      images: images.map(image => image.url)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto,user:User) {

    const { images, ...toUpdate } = updateProductDto

    // preload, busca un producto por el id y cargalo las propiedades del dto
    // solo prepara para el update no lo actualiza
    const product = await this.productRepository.preload({
      id,
      ...toUpdate
    })

    if (!product) throw new NotFoundException(`Product with id: ${id} not found`)

    // estudiar sobre query runner

    const queryRunner = this.dataSource.createQueryRunner()

    // aqui comienza la transaccion, checkpoint
    await queryRunner.connect()
    await queryRunner.startTransaction()


    try {
      if (images) {

        await queryRunner.manager.delete(ProductImage, {
          product: {
            id
          }
        })
        product.images = images.map(
          image => this.productImageRepository.create({ url: image })
        )
      }

      // return await this.productRepository.save(product);

      product.user = user

      await queryRunner.manager.save(product)
      await queryRunner.commitTransaction()
      await queryRunner.release()
      return this.findOnePlain(id)
    } catch (err) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      this.handleDBExceptions(err)
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error)

    // este codigo 23505 es por las keys son duplicadas
    // puedo poner todos los codigos aqui
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }

    throw new InternalServerErrorException('Unexpected error, check server logs')
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product')
    try {
      return await query.delete().where({}).execute()
    } catch (err) {
      this.handleDBExceptions(err)
    }

  }
}
