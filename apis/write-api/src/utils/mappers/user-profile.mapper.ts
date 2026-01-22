import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto.js';
import { User } from 'src/users/entities/user.entity.js';
import { UserDTO } from '../../users/dto/user.dto.js';

@Injectable()
export class UserMapper {
  toEntity(dto: CreateUserDto): User {
    const user = new User();

    user.name = dto.name;
    user.username = dto.username;
    user.email = dto.email;
    user.password = dto.password;

    return user;
  }

  toDTO(user: User): UserDTO {
    const dto = new UserDTO();

    dto.id = user.id;
    dto.version = user.version;
    dto.name = user.name;
    dto.username = user.username;
    dto.email = user.email;
    dto.loginBlockAt = user.loginBlockAt;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;

    return dto;
  }
}
