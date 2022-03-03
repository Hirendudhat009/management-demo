import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { createTaskDto } from './dto/task.dto';
import { getTaskByFilterDto } from './dto/task.filter.dto';
import { Tasks } from './task.model';
import { v4 as uuid } from 'uuid';
import { json } from 'sequelize';

@Injectable()
export class TaskService {
  // private tasks: Task[] = [];

  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: typeof Tasks,
  ) {}

  async getAllTask(): Promise<Tasks[]> {
    return this.taskRepository.findAll<Tasks>();
  }

  async filterTask(filterDto: getTaskByFilterDto): Promise<Tasks[]> {
    const { status, search } = filterDto;

    let tasks = await this.getAllTask();

    if (status) {
      tasks = (await tasks).filter((data) => data.status === status);
    }

    if (search) {
      tasks = (await tasks).filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          console.log(search);
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  async createTask(createTaskDto: createTaskDto): Promise<Tasks> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      taskId: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    });

    (await task).save();
    return task;
  }

  // createTask(createTaskDto: createTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  async getTaskById(id: string): Promise<Tasks> {
    const found = await this.taskRepository.findOne<Tasks>({
      where: { taskId: id },
    });
    if (!found) {
      throw new NotFoundException(`TaskID ${id}is not found`);
    }
    return found;
  }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((data) => data.id === id);

  //   if (!task) {
  //     throw new NotFoundException(`TaskID ${id}is not found`);
  //   }
  //   return task;
  // }

  async deleteTask(id): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { taskId: id } });
    if (!task) {
      throw new NotFoundException(`TaskID ${id}is not found`);
    }
    (await task).destroy();
  }

  // deleteTask(id) {
  //   return this.tasks.filter((data) => data.id !== id);
  // }

  async updateTask(id: string, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    (await task).save();
    return task;
  }
}
