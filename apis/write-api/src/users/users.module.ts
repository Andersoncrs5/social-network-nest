import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { UniqueEmailValidator } from './decorators/user/unique-email-user.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UniqueEmailValidator,
    UniqueEmailValidator,
  ],
  exports: [UsersService],
})
export class UsersModule {}
