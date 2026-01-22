import { applyDecorators } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export function EmailConstraint(): PropertyDecorator {
    return applyDecorators(
        IsNotEmpty({ message: 'Email cannot be empty' }),
        IsEmail({}, { message: 'Invalid email format' }),
        MinLength(5),
        MaxLength(150),
    );
}