import { Column, PrimaryKey, Table, Model } from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';

@Table
export class Tasks extends Model {
  @Column
  taskId: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: TaskStatus;
}
