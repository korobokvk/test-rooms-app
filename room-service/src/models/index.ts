import { Sequelize } from 'sequelize';
import Room from './Room';

import EnvVars from '@src/constants/EnvVars';
import User from './User';

// Connect to DB
const sequelize = new Sequelize(EnvVars.DbName, EnvVars.DbUser, EnvVars.DbPassword, {
  host: EnvVars.DbHost,
  dialect: 'postgres',
  port: Number(EnvVars.DbPort),
});

const RoomModel = Room.RoomModel(sequelize);
const UserModel = User.UserModel(sequelize);

export { sequelize, RoomModel, UserModel };
