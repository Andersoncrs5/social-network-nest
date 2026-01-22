import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  private readonly memoryCost: number = Number(process.env.ARGON2_MEMORY);

  private readonly timeCost: number = Number(process.env.ARGON2_TIME);

  async hash(password: string): Promise<string> {
    return await Bun.password.hash(password, {
      algorithm: 'argon2id',
      memoryCost: this.memoryCost,
      timeCost: this.timeCost,
    });
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await Bun.password.verify(password, hash);
  }
}
