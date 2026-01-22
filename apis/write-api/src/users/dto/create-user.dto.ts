import { UniqueEmail } from '../decorators/user/unique-email-user.decorator';
import { UniqueUsername } from '../decorators/user/unique-username.decorator';
import { EmailConstraint } from '@app/common/decorators/email-constraint.decorator';
import { MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(5)
  @MaxLength(100)
  name: string;

  @MinLength(5)
  @MaxLength(100)
  @UniqueUsername()
  username: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @EmailConstraint()
  @UniqueEmail()
  email: string;

  @MinLength(8)
  @MaxLength(50)
  password: string;
}
