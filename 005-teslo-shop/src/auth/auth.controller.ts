import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req,Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';
import { AuthService } from './auth.service';
import { RawHeaders,GetUser } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator'
import { ValidRoles } from './interfaces/valid-roles'
import { Auth } from './decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  // Diferentes formas de usar guards

  // guard : permitir o prevenir acceso a una ruta
  // AuthGuard : utiliza la estrategia que hicimos JWTStratergy y hay un metodo que 
  // retorna a nuestro usuario es decir si todo esta bien  en el AuthGuard
  // que utiliza nuestro jwt retornara al usuario 
  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @Req() req:Express.Request,
    // estos son decadores propios extrayendo el req.user, es un custom decorator
    @GetUser() user:User,
    @GetUser('email') userEmail:string,

    // custom decorator para extraer el req.rawHeaders
    @RawHeaders() rawHeaders: string[],
    // para traer el rawHeaders nest tambien tiene sus propio decorator
    @Headers() headers: IncomingHttpHeaders,
  ){
    // console.log(req.user)
    // console.log(req.headers)
    //console.log(req.rawHeaders)
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }

  @Get('private2')
  // añadir informacion extra a este metodo
  // los roles permitidos para poder acceder a este metodo
  // @SetMetadata('roles',['admin','super-user']) // esto es muy volatil, mejor crear un custom decorator
  
  @RoleProtected(ValidRoles.IS_ADMIN,ValidRoles.IS_SUPER_USER)
  // nest g d auth/decorators/roleProtected --no-spec

  // nest g gu auth/guards/userRole --no-spec
  // AuthGuard(),UserRoleGuard = autenticacion y autorizacion
  @UseGuards( AuthGuard(),UserRoleGuard )
  privateRoute2(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }


  @Get('private3')
  @Auth( ValidRoles.IS_ADMIN )
  privateRoute3(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }

  // para verificar el jwt y genere otro
  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user:User
  ){
    return this.authService.checkAuthStatus(user)
  }
}
