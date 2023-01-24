import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  // si quiero usar un modulo debe importando
  // modulos == imports
  // para poner todos mis modelos en la db
  imports:[
    // esto sirve para hacer la inyeccion de dependcias de los enviroment dentro de mi servicio
    ConfigModule,
    
    MongooseModule.forFeature([
      {
        name : Pokemon.name,
        schema : PokemonSchema
      }
    ])
  ],
  // exportaremos para poder llenar la db afuera
  // pero debemos importar el modulo completo 
  // para poder tulizar el model de pokemon
  exports:[
    MongooseModule
  ]
})
export class PokemonModule {}
