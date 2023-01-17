import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { Role } from '../Role';
import { AuthService } from './auth-admin.service';

@Controller('auth-admin')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login( req.user );
  }
}