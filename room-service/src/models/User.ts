import { TAll } from 'jet-validator';
import { Sequelize, DataTypes } from 'sequelize';

// **** Types **** //

export interface IUser {
  id: number;
  name: string;
  email: string;
  room?: number;
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(name: string, email: string, id: number): IUser {
  return {
    id,
    email,
    name,
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return !!arg && typeof arg === 'object' && 'id' in arg && 'email' in arg && 'name' in arg && 'role' in arg;
}

const UserModel = (sequelize: Sequelize) => {
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
  });
};

// **** Export default **** //

export default {
  new: new_,
  instanceOf,
  UserModel,
} as const;
