import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    // importo todo lo que exporto en mi ProductsModule
    ProductsModule,

    // si quiere utilizar el Auth decorator, ya que esto por dentro utiliza jwt y passport
    AuthModule
  ]
})
export class SeedModule {}
