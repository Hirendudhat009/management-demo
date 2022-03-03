import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TaskRepositery } from 'src/database/database.repositrey';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, ...TaskRepositery],
})
export class TaskModule {}
