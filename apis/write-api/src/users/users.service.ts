import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { ModelNotFoundException } from '@app/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findOneById(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findById(id)

    if (user == null) {
      throw new ModelNotFoundException("User not found")
    }

    return user;
  }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  
  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
