import { IsOptional, IsString, IsUUID, MinLength } from "class-validator"

export class UpdateCarDTO {
    @IsString({
        message : 'brand is required'
    })
    @IsOptional()
    readonly brand?:string
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly model?:string

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?:string
}