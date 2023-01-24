
// hacen una referencia en mongodb : collection | tablas

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

// registro | documento
@Schema()
export class Pokemon extends Document {

    // id:string // mongo me lo da

    @Prop({
        unique:true,
        index:true // identificador para este documento igual que el _id
    })
    name:string

    // numero del pokemon dentro del pokedex
    
    @Prop({
        unique:true,
        index:true
    })
    no:number
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)
