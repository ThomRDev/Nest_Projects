import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator(
    // data : o bien recibe el parametro del GetUser('email') => email
    // ctx : Contexto de la aplicacion 
    ( data: string, ctx: ExecutionContext )=> {
        // return 'hola mundo'
        const req = ctx.switchToHttp().getRequest()
        const user = req.user

        if(!user) throw new InternalServerErrorException('User not found (request)')
        return !data ? user : user[data]
    }
)