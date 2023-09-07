import { User } from '@domains/users/entity/user.entity';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const IsAdmin = createParamDecorator<
  unknown,
  ExecutionContext,
  User | null
>((data, ctx): User | null => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.is_admin ?? null;
});
