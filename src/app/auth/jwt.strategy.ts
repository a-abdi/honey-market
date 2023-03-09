import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';
import { AdminsService } from 'src/app/admins/admins.service';
import 'dotenv/config';

const INVALID_PHONE_OR_PASSWORD = 'شماره تماس یا پسورد اشتباه است';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private adminsSevice: AdminsService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const _id: string = payload.sub;
    const roles: string[] = payload.roles;
    let user: any = null;
    if (roles.includes('admin')) {
      user = (await this.adminsSevice.findByID(_id))?.toObject();
    } else if(roles.includes('user')) {
      user = (await this.usersService.findOne(_id))?.toObject();
    }

    if (!user) {
      throw new UnauthorizedException(INVALID_PHONE_OR_PASSWORD);
    }

    if (payload?.phoneNumber !== user.phoneNumber) {
      throw new UnauthorizedException(INVALID_PHONE_OR_PASSWORD);
    }

    return { 
      userId: _id, 
      phoneNumber: payload.phoneNumber,
      roles: payload.roles,
   };
  }
}