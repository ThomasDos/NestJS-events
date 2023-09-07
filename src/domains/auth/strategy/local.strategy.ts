import { UsersService } from '@domains/users/users.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);

    if (!user) {
      this.logger.error(`User ${username} not found`);
      throw new UnauthorizedException();
    }

    if (!bcrypt.compare(password, user.password)) {
      this.logger.error(`Password is invalid`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
