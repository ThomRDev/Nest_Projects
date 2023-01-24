import { IsJWT, IsNotEmpty, IsString } from "class-validator";

class PayloadDTO{
    @IsNotEmpty()
    @IsString()
    @IsJWT()
    id : string
}