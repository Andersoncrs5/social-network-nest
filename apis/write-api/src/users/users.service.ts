import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { UserRepository } from './users.repository.js';
import { ModelNotFoundException } from '@app/common';
import { CryptoService } from '../configs/security/crypto/crypto.service.js';
import { UserMapper } from '../utils/mappers/user-profile.mapper.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    private readonly cryptoService: CryptoService,
  ) {}

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

  async create(dto: CreateUserDto) {
    const user = this.userMapper.toEntity(dto);
    user.password = await this.cryptoService.hash(user.password);
    return this.userRepository.save(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    await this.findOneByIdSimple(id);
    await this.userRepository.delete(id);
  }
}
