import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // para las variables de entorno personalizadas npm i @nestjs/config
    // por defecto todos son string
    // debe estar arriba
    // ConfigModule.forRoot(),

    // otra configuracion por msi tenemos .env.production .env
    ConfigModule.forRoot({
      load:[ EnvConfiguration ],
      // para validar lo que si o si debe de tener mi .env o mi .env.production
      validationSchema : JoiValidationSchema
    }),

    ServeStaticModule.forRoot({
      // renderPath:'/romelin',
      rootPath : join(__dirname,'..','public')
    }),

    // para conectar con mongo
    // MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    MongooseModule.forRoot(process.env.MONGODB),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
  // controllers: [AppController],
  controllers: [],
  // providers: [AppService],
  providers: [],
})
export class AppModule {

  // para cargar las env personalizadas instalar npm i @nestjs/config
  constructor(){
    // console.log(process.env)
  }
}
