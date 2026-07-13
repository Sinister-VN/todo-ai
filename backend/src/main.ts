import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
  });

  await app.listen(configService.get<number>('PORT') ?? 3000);
}
bootstrap();
