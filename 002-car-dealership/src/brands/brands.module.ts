import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  // si la instancia ya existe lo reutilizará en los modulos donde importen
  exports:[BrandsService]
})
export class BrandsModule {}
