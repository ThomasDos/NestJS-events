import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request) {
    const access_token = this.authService.getTokenForUser(request.user);
    return { access_token };
  }

  @Post('signup')
  async signUp(@Request() request) {
    const user = await this.usersService.createUser(request.body);
    const access_token = this.authService.getTokenForUser(user);
    return { access_token };
  }
}
