import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string) {
    return await this.usersRepository.getUserById(id);
  }

  async getUserByUsername(username: string) {
    return await this.usersRepository.getUserByUsername(username);
  }

  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  async createUser(user: CreateUserDto) {
    return await this.usersRepository.createUser(user);
  }

  async deleteUsers() {
    return await this.usersRepository.deleteUsers();
  }
}
