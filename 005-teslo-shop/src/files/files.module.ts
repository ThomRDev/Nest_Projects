import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FilesController],
  providers: [FilesService],

  imports:[
    // para poder utilizar las variables de entorno
    // y yo pueda injectarlo en cualquier lugar dentro de las clases de esto modulo
    ConfigModule
  ]
})
export class FilesModule {}
