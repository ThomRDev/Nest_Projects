import { IsString, MinLength } from 'class-validator'

export class CreateCarDTO {
    @IsString({
        message : 'brand is required'
    })
    readonly brand:string
    
    @IsString()
    @MinLength(3)
    readonly model:string
}