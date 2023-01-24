import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    // ponemos nuestra estrategia creada aqui ya que se podra injectar en otras clases
    // hay que tener en cuenta que el JWTStrategy tenga el decorator Injectable
    JwtStrategy
  ],
  imports:[
    // este config Module es para que en la clase de JWTStraterge pueda utilizar el
    // configservice mediante una inyeccion de dependencias
    ConfigModule,
    // para poder generar la tabla y tambien para poder utilizar esta entidad como un respositorio
    // dentro de este modulo
    // si quiere utilizar el repositorio de otra entidad debo colocar el modulo de esta entidad
    // aqui solo va las entidades que se convertiran en tablas pero de este modulo actual
    TypeOrmModule.forFeature([ User ]),

    // establecer estrategia
    PassportModule.register({ defaultStrategy:'jwt' }),
    
    // investigar diferencias
    // esto tambien me servira para poder usar el JWTservice o cualquier cosa que tenga el jwtmodule
    JwtModule.registerAsync({
      // este configModule es para el JWT para las variables de entorno
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        // console.log('JWT Secret', configService.get('JWT_SECRET') )
        // console.log('JWT SECRET', process.env.JWT_SECRET)
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn:'2h'
          }
        }
      }
    }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn:'2h'
    //   }
    // })
  ],
  exports:[
    // si voy a utilizar la entidad User o alguna entidad que lo coloque arriba
    TypeOrmModule,

    // exporto todo esto ya que esta configurado y poder utilizar todo esto ya configurado
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
