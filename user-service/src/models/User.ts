import { TAll } from 'jet-validator';
import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize';

// **** Types **** //

export interface IUser {
  id?: number;
  name: string;
  email: string;
  pwdHash?: string;
  room?: number;
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(name: string, email: string, pwdHash?: string): IUser {
  return {
    email,
    name,
    pwdHash: pwdHash ?? '',
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return !!arg && typeof arg === 'object' && 'email' in arg && 'name' in arg;
}

export const UserModel = (sequelize: Sequelize) => {
  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pwdHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  });
};

// **** Export default **** //

export default {
  new: new_,
  instanceOf,
  UserModel,
} as const;
