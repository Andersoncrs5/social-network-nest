import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, Min, IsNumberString } from 'class-validator';

export function IsId() {
  return applyDecorators(
    IsNotEmpty({ message: 'ID is required' }),
    IsNumberString({}, { message: 'ID must be a numeric string' }),
    Min(100000000000000, { message: 'Invalid Snowflake ID' })
  );
}