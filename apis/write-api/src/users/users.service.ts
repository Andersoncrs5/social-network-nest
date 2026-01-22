import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { ModelNotFoundException } from '@app/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneByIdSimple(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findById(id);

    if (user == null) {
      throw new ModelNotFoundException('User not found');
    }

    return user;
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  create(dto: CreateUserDto): User | null {
    return null;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    await this.findOneByIdSimple(id);
    await this.userRepository.delete(id);
  }
}
