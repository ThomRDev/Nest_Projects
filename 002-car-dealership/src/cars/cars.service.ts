import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
    private cars:Car[] = [
        {
            id:uuid(),
            brand : 'Toyota',
            model : 'Corala'
        },
        {
            id:uuid(),
            brand : 'Jeep',
            model : 'Civic'
        },
        {
            id:uuid(),
            brand : 'Otro',
            model : 'Toro'
        },
    ]

    findAll(){
        return this.cars
    }

    findOneById(id:string){
        const car = this.cars.find(car=>car.id === id)
        if(!car) throw new NotFoundException(`Car with id '${id}' not found`)
        return car
    }

    create(createCarDto:CreateCarDTO){
        this.cars.push({
            id:uuid(),
            ...createCarDto
        })
        return this.cars
    }

    update(id:string,updateCarDTO:UpdateCarDTO){
        let carDB = this.findOneById(id)
        if(updateCarDTO.id && updateCarDTO.id!==id){
            throw new BadRequestException('Car id is not valid inside body')
        }
        this.cars = this.cars.map(car=>car.id===id?{ ...carDB,...updateCarDTO,id }:car)        
        return this.findOneById(id)
    }

    delete(id:string){
        this.findOneById(id)
        this.cars = this.cars.filter(car=>car.id!==id)
        return this.cars
    }
    fillCarsWithSeedData(cars:Car[]){
        this.cars = this.cars.concat(cars)
    }
}
