import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enforcing validation rules for all incoming client payloads
  app.useGlobalPipes(
    new ValidationPipe({
      // White list only acceptable payload
      whitelist: true,
      forbidNonWhitelisted: true,
      // Enabling auto transform body type of payload
      // Might impact some performance
      transform: true,
      // To remove  @Type(() => Number) from PaginationQueryDto
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
