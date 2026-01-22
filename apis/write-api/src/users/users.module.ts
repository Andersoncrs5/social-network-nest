import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UserRepository } from './users.repository.js';
import { UniqueEmailValidator } from './decorators/user/unique-email-user.decorator.js';
import { CryptoService } from '../configs/security/crypto/crypto.service.js';
import { UserMapper } from '../utils/mappers/user-profile.mapper.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UniqueEmailValidator,
    UniqueEmailValidator,
    UserMapper,
    CryptoService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
