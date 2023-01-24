import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities:true,
      // si hay algun cambio en las entidades automaticamente los actualiza
      // esto solo es valido en desarrollo y en production se utiliza la migracion que es manual
      synchronize:true
    }),

    // npm i @nestjs/serve-static 
    // tengo que crear products en public
    // y pegar estas imagenes 
    // https://github.com/Klerith/nest-teslo-shop/tree/fin-seccion-16/static/products
    // o sino colocar todo esto en static products
    // https://github.com/Klerith/nest-teslo-shop/tree/fin-seccion-16/static/products
    
    // esto de aqui es una forma otra es ponerlo en el static
    // pero el public se veria todas las imagenes, si eso necesitamos
    // podemos hacer eso
    // ServeStaticModule.forRoot({
    //   rootPath:join(__dirname,'..','public')
    // })

    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
    AuthModule,
    MessagesWsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
