import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/poke-response.interface';
@Injectable()
export class SeedService {

  // private readonly axios:AxiosInstance = axios

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly http:AxiosAdapter
  ){}

  // async executeSeed(){
  //   // const { data} = await this.axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
  //   // tipar la data con quicktype

  //   // delete * from pokemoms
  //   await this.pokemonModel.deleteMany()
    
  //   const pokemonToInsert:{name:string,no:number}[]= []

  //   const { data} = await this.axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
  //   data.results.forEach(({name,url})=>{
  //     const segments = url.split('/')
  //     const no = Number(segments.at(-2))
  //     pokemonToInsert.push({ name,no })
  //   })

  //   await this.pokemonModel.insertMany(pokemonToInsert)

  //   return 'Seed exectuted'
  // }
  async executeSeed(){
    
    await this.pokemonModel.deleteMany()
    
    const pokemonToInsert:{name:string,no:number}[]= []

    const data = await this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
    data.results.forEach(({name,url})=>{
      const segments = url.split('/')
      const no = Number(segments.at(-2))
      pokemonToInsert.push({ name,no })
    })

    await this.pokemonModel.insertMany(pokemonToInsert)

    return 'Seed exectuted'
  }
}
/*
tip
quita los cambios del staging
git checkout -- .
*/