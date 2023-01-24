import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[
    TypeOrmModule.forFeature([ Product,ProductImage ]),
    // si quiere utilizar el Auth decorator, ya que esto por dentro utiliza jwt y passport
    AuthModule
  ],
  
  exports:[

    // para poder utilizar el repositorio, y poder inyectarlo
    ProductsService,

    // Para poder trabajar con los especificamente con los repositorios de 
    // Product,ProductImage
    TypeOrmModule
  ]
})
export class ProductsModule {}
