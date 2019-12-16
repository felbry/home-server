import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './interceptors/exception.interceptor';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
