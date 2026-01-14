import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "@app/common";

@Entity('users')
@Index('idx_username', ['username'])
@Index('idx_email', ['email'])
export class User extends BaseEntity {
  
  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 100, unique: true, nullable: false })
  username: string;

  @Column({ length: 150, unique: true, nullable: false })
  email: string;

  @Column({ length: 300, nullable: false, select: false }) 
  password: string;

  @Column({ length: 500, nullable: true })
  refreshToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  loginBlockAt: Date | null;

}