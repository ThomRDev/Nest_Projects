import { IsInt, IsNotEmpty, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {
    
    @IsInt()
    @IsPositive()
    @Min(1)
    
    no:string
    
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    name:string
}
