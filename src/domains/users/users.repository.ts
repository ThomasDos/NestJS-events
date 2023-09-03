import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUserById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async getUserByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async getUsers() {
    return await this.usersRepository.find();
  }

  async createUser(user: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt);
    return await this.usersRepository.save({
      username: user.username,
      password: passwordHash,
    });
  }

  async deleteUsers() {
    return await this.usersRepository.clear();
  }
}
