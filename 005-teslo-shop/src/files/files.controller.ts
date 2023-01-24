import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, BadRequestException, UseInterceptors, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';

@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,  
  ) {}

  @Get('/product/:imageName')
  findProductImage(
    @Res() res:Response,
    @Param('imageName') imageName:string
  ){
    const path = this.filesService.getStaticProductImage( imageName );

    res.sendFile( path );
  }

  // form-data
  // de tipo file
  // en postman
  @Post('product')
  // INVESTIGAR ESTA PARTE
  @UseInterceptors(FileInterceptor('file',{
    fileFilter:fileFilter,
    // 1MB
    // limits: { fileSize: 1000 },
    // es el que guarda la imagen
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(@UploadedFile() file: Express.Multer.File){
    // vendra null dependiendo de nuestras validaciones de fileFilter o nuestro fileNamer
    if(!file){
      throw new BadRequestException('Make sure that the file is an image')
    }
    console.log(file)
    
    const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`;

    return { secureUrl };

  }
}
