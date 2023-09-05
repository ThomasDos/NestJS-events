import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { IsAdmin } from '@/shared/decorators/is-admin.decorator';
import { AuthGuardJwtAdmin } from '@/shared/guards/auth-guard-jwt-admin.guard';
import { AuthGuardJwt } from '@/shared/guards/auth-guard-jwt.guard';
import { AuthGuardLocal } from '@/shared/guards/auth-guard-local.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuardLocal)
  async signIn(@CurrentUser() user) {
    const access_token = this.authService.getTokenForUser(user);
    return { access_token };
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Get('me')
  @UseGuards(AuthGuardJwt)
  async getMe(@CurrentUser() user: User) {
    return user;
  }

  @Get('admin')
  @UseGuards(AuthGuardJwtAdmin)
  async getAdmin(@CurrentUser() user: User, @IsAdmin() isAdmin: boolean) {
    return user;
  }
}
