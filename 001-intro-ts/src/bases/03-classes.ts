import axios from "axios"
import { Move, PokeApiResponse } from "../interfaces/pokeapi-response.interface"


// clases, abstraccion de un objeto de la vida real

export class Pokemon {
  // public id !:number
  // public name !:string
  // constructor(id:number,name:string){
  //   this.id = id
  //   this.name = name
  // }

  // con nivel de acceso 
  constructor( public id:number, public name:string){}

  get imageUrl ():string {
    return `http://pokemon.com/${this.id}.png`
  }

  async getMoves():Promise<Move[]>{
    const response = await axios.get<PokeApiResponse>("https://pokeapi.co/api/v2/pokemon/"+this.id)
    return response.data.moves
  }
}

// un metodo con static el this tambien funciona diferente
/*
  readonly es muy usado para la inyeccion de dependencias (no podre modificar)
  constructor( public readonly id:number, public name:string){ }
*/

