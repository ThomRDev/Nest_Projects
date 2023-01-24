import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  // para que otros modulos puedas utilizar nuestro servicio de este modulo
  exports:[CarsService]
})
export class CarsModule {}
