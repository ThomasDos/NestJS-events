import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request) {
    return { user_id: request.user.id, access_token: 'X' };
  }
}
