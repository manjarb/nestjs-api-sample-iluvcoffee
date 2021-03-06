import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule],
  providers: [
    // Add Guard for route protecting
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
