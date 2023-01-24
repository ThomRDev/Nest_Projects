import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {


  constructor(
    private readonly reflector:Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // leyendo el SetMetadata
    // const validRoles:string[] = this.reflector.get('roles',context.getHandler())
    const validRoles:string[] = this.reflector.get(META_ROLES,context.getHandler())
    // console.log(validRoles)

    // que no verififique los permisos, que sea accesible para todos
    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest()
    const user = req.user as User

    if(!user) throw new BadRequestException('User not found')
    
    for (const role of user.roles )
      if ( validRoles.includes( role ) ) return true;

    throw new ForbiddenException(
      `User ${ user.fullName } need a valid role: [${ validRoles }]`
    );
    // si retorna true continuara
    // si retorna false no continuara
    return true;
  }
}
