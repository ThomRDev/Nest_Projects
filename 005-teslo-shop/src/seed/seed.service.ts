import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService:ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){

  }
  async runSeed(){
    await this.deleteTables()
    const adminUser = await this.insertUsers();

    await this.insertNewProducts( adminUser );

    return `SEED EXECUTED`
  }

  private async insertUsers(){
    const seedUsers = initialData.users
    const users:User[] = []
    seedUsers.forEach(user=>
      users.push(this.userRepository.create(user))
    )
    const dbUsers = await this.userRepository.save( seedUsers )

    return dbUsers[0];
  }

  // esto hacemos cuando hacemos un cambio en la entidad en el nombre de alguna entidad
  // y tambien queremos eliminar esas tablas con nombres antiguos
  // tambien para borrar todos los productos y luego borrar los usuarios para
  // evitar lo que es la integridad referencial
  private async deleteTables(){
    await this.productsService.deleteAllProducts()
    const queryBuilder = this.userRepository.createQueryBuilder()
    await queryBuilder.delete().where({}).execute()
  }

  private async insertNewProducts(user:User){
    await this.productsService.deleteAllProducts()

    const products = initialData.products

    const insertPromises = []

    products.forEach(product => {
      insertPromises.push(this.productsService.create(product,user))
    })
    await Promise.all(insertPromises)
    return true
  }
}