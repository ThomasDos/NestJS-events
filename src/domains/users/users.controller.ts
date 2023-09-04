import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(user);
  }

  @Delete()
  async deleteUsers() {
    return await this.usersService.deleteUsers();
  }
}
