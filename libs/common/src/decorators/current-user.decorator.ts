import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'apps/auth/src/users/entity/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): UserEntity => {
  return context.switchToHttp().getRequest().user;
};
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
