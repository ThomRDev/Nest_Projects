// nest trabaja fuertemente con los principios solid
// PRINCIPIO DE SUSTICION DE LISKOV
// QUE NUESTRAS CLASES DEBEN DEPENDER DE UNA INTERFACE Y NO DE UNA CLASE EN ESPECIFICO
// DE ESTA MANERA NO DEPENDE DIRECTAMENTE Y REDUCE EL ACOPLAMIENTO

import { HttpAdapter, PokeApiAxiosAdapter, PokeApiFetchAdapter } from "../api/pokeApi.adapter"
import { Move, PokeApiResponse } from "../interfaces/pokeapi-response.interface"


export class Pokemon {
  constructor( 
    public id:number, 
    public name:string,
    // EJEMPLO INYECCION DE DEPENDENCIAS
    private readonly http:HttpAdapter
  ){}

  get imageUrl ():string {
    return `http://pokemon.com/${this.id}.png`
  }

  async getMoves():Promise<Move[]>{
    const data = await this.http.get<PokeApiResponse>("https://pokeapi.co/api/v2/pokemon/"+this.id)
    return data.moves
  }
}

new Pokemon(4,'something 4',new PokeApiAxiosAdapter())
new Pokemon(5,'something 5',new PokeApiFetchAdapter())
