import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  private default_limit:number
  constructor(
    @InjectModel(Pokemon.name) // ya que esto no es un provider no es injectable por defecto
    private readonly pokemonModel:Model<Pokemon>,

    // esto es para que pueda leear la configuracion de los environment
    private readonly configService:ConfigService
  ){
    // console.log(process.env.DEFAULT_LIMIT)   
    this.default_limit = this.configService.get<number>('default_limit')
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    
    try{
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;

    }catch(error){
      this.handleExceptions( error )
    }
  }

  findAll(paginationdto:PaginationDTO) {

    // const { limit = 5,offset=0 } = paginationdto
    const { limit = this.default_limit,offset=0 } = paginationdto

    // -__v para quitar el __v
    return this.pokemonModel.find().limit(limit).skip(offset).sort({ no:1 }).select('-__v')
  }

  async findOne(term: string) {
    let pokemon:Pokemon

    // validando si es un numero
    if(!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no:term })
    }

    // validanndo si es un MongoId
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term)
    }

    // validando si es un nombre
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({ name:term })
    }

    if(!pokemon){
      throw new NotFoundException(`Pokemon with id, name or no "${term} not found`)
    }
    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne( term )
    if(updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
    }
    try{
      await pokemon.updateOne(updatePokemonDto)
      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto
      }
    }catch(error){
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id:id }) 
    if(deletedCount === 0 ) {
      throw new BadRequestException('Pokemon with id "'+id+'" not found')
    }
    return
  }
  private handleExceptions(error:any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
  }
}