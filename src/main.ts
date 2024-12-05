import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(parseInt(process.env.HTTP_PORT),() => {
    Logger.log(`Server is running on port "${process.env.HTTP_PORT}"`)
  });
}
bootstrap();