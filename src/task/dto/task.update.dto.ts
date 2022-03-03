import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class updateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
