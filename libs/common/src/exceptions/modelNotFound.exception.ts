import { HttpException, HttpStatus } from '@nestjs/common';

export class ModelNotFoundException extends HttpException {
  constructor(modelName: string) {
    super(`${modelName}`, HttpStatus.NOT_FOUND);
  }
}