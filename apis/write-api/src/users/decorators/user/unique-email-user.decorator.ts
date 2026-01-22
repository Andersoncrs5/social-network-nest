import {
  registerDecorator,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
  type ValidationArguments,
} from 'class-validator';
import { UserRepository } from '../../users.repository';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@ValidatorConstraint({ name: 'UniqueEmail', async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(email: string): Promise<boolean> {
    if (!email) return false;

    const exists: boolean = await this.userRepository.existsByEmail(email);

    return !exists;
  }

  defaultMessage(args?: ValidationArguments): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return `Email ${args?.value} already exists`;
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
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
