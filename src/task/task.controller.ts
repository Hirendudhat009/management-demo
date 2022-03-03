import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createTaskDto } from './dto/task.dto';
import { getTaskByFilterDto } from './dto/task.filter.dto';
import { updateTaskDto } from './dto/task.update.dto';
import { Tasks } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskservice: TaskService) {}

  @Get()
  async getAllTask(@Query() filterDto: getTaskByFilterDto): Promise<Tasks[]> {
    if (filterDto) {
      return this.taskservice.filterTask(filterDto);
    } else {
      return this.taskservice.getAllTask();
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id): Promise<Tasks> {
    return this.taskservice.getTaskById(id);
  }

  @Post()
  // @UsePipes(new ValidationPipe())
  createTask(@Body() createTaskDto: createTaskDto) {
    return this.taskservice.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskservice.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(@Param('id') id, @Body() updateTaskDto: updateTaskDto) {
    const { status } = updateTaskDto;
    return this.taskservice.updateTask(id, status);
  }
}
