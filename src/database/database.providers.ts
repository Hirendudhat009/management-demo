import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/auth/user.model';
import { Tasks } from 'src/task/task.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest-js',
        logging: false,
      });
      sequelize.addModels([Tasks, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
