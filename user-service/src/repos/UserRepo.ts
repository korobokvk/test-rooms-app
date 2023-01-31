import { IUser } from '@src/models/User';
import orm from './MockOrm';
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
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  const db = await orm.openDb();
  return db.users;
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
async function update(user: IUser): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      db.users[i] = user;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      db.users.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
