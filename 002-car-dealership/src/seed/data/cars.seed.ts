import { Car } from "src/cars/interfaces/car.interface";
import {v4 as uuid} from 'uuid'

export const CARS_SEED:Car[] = [
    {
        id: uuid(),
        brand : 'Something brand 1',
        model : 'Something model 1',
    },
    {
        id: uuid(),
        brand : 'Something brand 2',
        model : 'Something model 2',
    },
    {
        id: uuid(),
        brand : 'Something brand 3',
        model : 'Something model 3',
    },
]