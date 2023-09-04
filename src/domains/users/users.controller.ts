import { Controller, Delete, Get, Param } from '@nestjs/common';
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

  @Delete()
  async deleteUsers() {
    return await this.usersService.deleteUsers();
  }
}
