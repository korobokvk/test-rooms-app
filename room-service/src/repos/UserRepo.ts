import { UserModel } from '../models';
import { Model } from 'sequelize';
import { IUser } from '@src/models/User';

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(email: string): Promise<IUser | void> {
  const user: Model<IUser> | null = await UserModel.findOne({ where: { email } });
  const dataObject = user?.dataValues;
  return dataObject;
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<IUser> {
  const newRoom = UserModel.build({ ...user });
  const savedRoom: Model<IUser> | null = await newRoom.save();
  return savedRoom.dataValues;
}

// **** Export default **** //

export default {
  getOne,
  add,
} as const;
