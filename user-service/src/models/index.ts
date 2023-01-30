import logger from 'jet-logger';
import { Sequelize } from 'sequelize';
import User from './User';

import EnvVars from '@src/constants/EnvVars';

// Connect to DB
const sequelize = new Sequelize(EnvVars.DbName, EnvVars.DbUser, EnvVars.DbPassword, {
  host: EnvVars.DbHost,
  dialect: 'postgres',
  port: Number(EnvVars.DbPort),
});

// const connectToDB = async () => {
//   try {
//     await sequelize.authenticate();
//     logger.info('Connected to DB successfully');
//   } catch (e) {
//     logger.err(e);
//   }
// };

// connectToDB();

const UserModel = User.UserModel(sequelize);
export { sequelize, UserModel };
