import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  // Catch Http error ex. find non-exist :id -1
  app.useGlobalFilters(new HttpExceptionFilter());
  // Add interceptor to modify response
  app.useGlobalInterceptors(
    // Modify route response
    // new WrapResponseInterceptor(),
    // Timeout request handle
    new TimeoutInterceptor(),
  );

  // Setting up Swagger document
  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
