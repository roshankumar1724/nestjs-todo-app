import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { getDBConnectionOptions, runDBMigrations } from '@shared/utils';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(
    await getDBConnectionOptions(process.env.NODE_ENV)
  ));

  /**
   * Run DB migrations
   */
  Logger.log(`Running DB Migration`, 'bootstrap');
  await runDBMigrations();

  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'bootstrap');
}
bootstrap();
