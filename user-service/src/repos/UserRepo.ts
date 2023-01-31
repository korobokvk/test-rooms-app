import { IUser } from '@src/models/User';
import { UserModel } from '../models';
import { Model } from 'sequelize';

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
 * Get one by available.
 */
async function getOneByAvailable(email: string): Promise<IUser | void> {
  const user: Model<IUser> | null = await UserModel.findOne({ where: { email, room: null } });
  const dataObject = user?.dataValues;
  return dataObject;
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<IUser> {
  const newUser = UserModel.build({ ...user });
  const savedUser: Model<IUser> | null = await newUser.save();
  return savedUser.dataValues;
}

/**
 * Update a user.
 */
async function update(userEmail: string, roomId: number | null): Promise<[affectedCount: number]> {
  const newUser = UserModel.update({ room: roomId }, { where: { email: userEmail } });
  return newUser;
}

// **** Export default **** //

export default {
  getOne,
  add,
  update,
  getOneByAvailable,
} as const;
