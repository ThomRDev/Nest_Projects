import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CarsModule } from 'src/cars/cars.module';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  // si quiere utilizar un servicio fuera de este modulo tengo que colocarlo aqui
  imports:[CarsModule,BrandsModule]
})
export class SeedModule {}
