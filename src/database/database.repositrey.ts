import { User } from 'src/auth/user.model';
import { Tasks } from 'src/task/task.model';

export const TaskRepositery = [
  {
    provide: 'TASK_REPOSITORY',
    useValue: Tasks,
  },
];

export const UserRepositery = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
