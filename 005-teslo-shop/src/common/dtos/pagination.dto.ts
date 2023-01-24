import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {

    @ApiProperty({
        default: 10, description: 'How many rows do you need'
    })
    @IsOptional()
    @IsPositive()
    // esto significa que cada ves que se envia en por el query
    // se convirta ya que todo es string
    // y esto es mejor que lo que hicimos en main.ts del pokedex
    // si no hicieramos el Type tendriamos que usar esto de abajo
    // app.useGlobalPipes(new ValidationPipe({
    //     whitelist:true,
    //     forbidNonWhitelisted:true,
    //     // tiene ventajas y desventajas (ya que tiene que hacer el transform y demoraria)
    //     // comvierte la data del request a la data que espera el dto
    //     transform:true,
    //     transformOptions:{
    //       enableImplicitConversion:true
    //     }
    //   }))
    @Type( () => Number ) 
    limit?:number;

    @ApiProperty({
        default: 0, description: 'How many rows do you want to skip'
    })
    @IsOptional()
    @Min(0)
    @Type( () => Number ) 
    offset?:number;
}