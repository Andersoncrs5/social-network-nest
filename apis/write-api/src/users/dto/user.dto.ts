export class UserDTO {
  id!: string;
  version!: number;
  name: string;
  username: string;
  email: string;
  loginBlockAt: Date | null;
  createdAt!: Date;
  updatedAt?: Date;
}
