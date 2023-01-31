import { TAll } from 'jet-validator';
import { DataTypes, Sequelize } from 'sequelize';

// **** Types **** //

export interface IRoom {
  id?: number;
  name: string;
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(name: string): IRoom {
  return {
    name,
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return !!arg && typeof arg === 'object' && 'name' in arg;
}

const RoomModel = (sequelize: Sequelize) => {
  return sequelize.define('Room', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

// **** Export default **** //

export default {
  new: new_,
  instanceOf,
  RoomModel,
} as const;
