
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { validate as DTOValidate } from "class-validator";

// con el injectable le decimos que esta clase va poderse inyectar y si ya existe una
// clase de esta instanciada reutilizara la instancia
@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,

        configService:ConfigService
    ){
        super({
            // la llave para poder extraer todo
            secretOrKey: configService.get('JWT_SECRET'),
            // aqui extrae de Bearer 31jnk2.123j1n312.1j2n312
            // y que exista el Bearer
            // aqui estan las validaciones de si el jwt es valido o si no se ha expirado
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    // si el jwt es valido o si el jwt no ha expirado
    // hara todo esto
    async validate( payload: JwtPayload ): Promise<User> {
        
        const errors = await DTOValidate(payload)

        if(errors.length) {
            throw new UnauthorizedException('Token not valid')
        }
        console.log(errors)

        const { id } = payload;
        // if(!id){
        //     throw new UnauthorizedException('Token not valid')
        // }

        // trae error en el futuro, si el jwt no existe el id
        // const user = await this.userRepository.findOneBy({ id });
        // const user = await this.userRepository.findOne({
        //     where:{
        //         id
        //     }
        // })

        const user = await this.userRepository
                        .createQueryBuilder('user')
                        .where('user.id = :id',{id})
                        .getOne()

        if ( !user ) 
            throw new UnauthorizedException('Token not valid')
            
        if ( !user.isActive ) 
            throw new UnauthorizedException('User is inactive, talk with an admin');
        
        return user;
    }

}