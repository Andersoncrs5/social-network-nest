import {
  registerDecorator,
  ValidationArguments, type ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../../users.repository';
import { UniqueEmailValidator } from './unique-email-user.decorator';

@ValidatorConstraint({ name: 'UniqueUsername', async: true })
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(username: string): Promise<boolean> {
    if (!username) return false;

    const exists: boolean =
      await this.userRepository.existsByUsername(username);

    return !exists;
  }

  defaultMessage(agrs?: ValidationArguments): string {
    return `Username ${agrs?.value} already exists`;
  }
}

export function UniqueUsername(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
}
