import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { syncDb } from './dbUpdater';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  await app.listen(3000);
  // syncDb();
}

bootstrap();
