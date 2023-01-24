import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto';

// la palabra cars significa la ruta a donde apuntará
// nest si no encuentra un recurso lanzara un 404 por default
@Controller('cars')
// @UsePipes(ValidationPipe) // para todos los metodos del controlador que valide el dto si estan decorados
export class CarsController {
    constructor(
        // si el servicio ya se instancio previamente lo reutilizará utilizando singleton
        // pero se le puede decir para que use otra instancia
        private readonly carsService:CarsService
    ){}
    
    @Get()
    getAllCars(){
        return this.carsService.findAll()
    }

    @Get(':id')
    // getById(@Param('id',ParseIntPipe) id:number){
    // por defecto valida que sea uuid de forma general y se reutiliza la instancia
    // getById(@Param('id',ParseUUIDPipe) id:string){
    getById(@Param('id',new ParseUUIDPipe({ version:'4' })) id:string){
        return this.carsService.findOneById(id)
    }

    @Post()
    // @UsePipes(ValidationPipe) // valida el dto de este metodo si tiene los decoradores
    createCar(@Body() createCarDto:CreateCarDTO){
        return this.carsService.create(createCarDto)
    }

    @Patch(':id')
    updateCar(
        // @Param('id',ParseIntPipe) id:number,
        @Param('id',ParseUUIDPipe) id:string,
        @Body() updateCarDTO:UpdateCarDTO
    ){
        return this.carsService.update(id,updateCarDTO)
    }

    @Delete(':id')
    deleteCar(
        // @Param('id',ParseIntPipe) id
        @Param('id',ParseUUIDPipe) id:string
    ){
        return this.carsService.delete(id)
    }
}
