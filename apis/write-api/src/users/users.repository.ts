import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { BaseRepository } from "@app/common"; 

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email } as any);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.userRepository.exists({ email } as any);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ username } as any);
  }
  
  async existsByUsername(username: string): Promise<boolean> {
    return await this.userRepository.exists({ username } as any);
  }



}