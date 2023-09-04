import { User } from '@domains/users/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly usersService: UsersService,
  ) {}

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
      admin: user.is_admin,
    });
  }

  async signUp(user: CreateUserDto) {
    const new_user = await this.usersService.createUser(user);
    const access_token = this.getTokenForUser(new_user);
    return { access_token };
  }
}
