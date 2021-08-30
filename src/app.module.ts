import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TodoModule } from './todo/todo.module';
import { TaskModule } from './task/task.module';

@Module({})
export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    Logger.log(`In forRoot Method...`, 'AppModule | forRoot');
    return {
      module: AppModule,
      controllers: [
        AppController,
      ],
      imports: [
        // TodoModule,
        TaskModule,
        TypeOrmModule.forRoot(connOptions),
      ],
      providers: [
        AppService
      ]
    }
  }
}
