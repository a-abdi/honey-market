import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from './auth-user.service';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(Strategy, 'user-local') {
  constructor(private authService: UserAuthService) {
    super({
      usernameField: 'phoneNumber',
      passwordField: 'password',
    });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(phoneNumber, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
}