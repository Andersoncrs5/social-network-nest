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
    return await this.findOneByOptions({ email } as any);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.existsByOptions({ email } as any);
  }

}