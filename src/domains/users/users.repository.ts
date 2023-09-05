import { ConflictException, Injectable } from '@nestjs/common';
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
    return await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['events'],
    });
  }

  async getUserByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username,
      },
      relations: ['events'],
    });
  }

  async getUsers() {
    return await this.usersRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt);
    try {
      const newUser: User = await this.usersRepository.save({
        username: user.username,
        password: passwordHash,
        is_admin: Boolean(user.is_admin),
      });
      return new User(newUser);
    } catch (error) {
      throw new ConflictException('Username already exists');
    }
  }

  async deleteUsers() {
    return await this.usersRepository.clear();
  }
}
