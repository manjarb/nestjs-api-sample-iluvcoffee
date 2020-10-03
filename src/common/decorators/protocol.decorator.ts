import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// For inject Req variable into controller
export const Protocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
