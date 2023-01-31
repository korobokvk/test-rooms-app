import { RoomModel } from '../models';
import { Model } from 'sequelize';
import { IRoom } from '@src/models/Room';

import logger from 'jet-logger';

// **** Functions **** //

/**
 * Get one room.
 */
async function getOne(id: number): Promise<IRoom | void> {
  const room: Model<IRoom> | null = await RoomModel.findOne({ where: { id } });
  const dataObject = room?.dataValues;
  return dataObject;
}

/**
 * Get all rooms
 */
async function getAll(): Promise<Model<IRoom>[] | void> {
  const rooms: Model<IRoom>[] | null = await RoomModel.findAll();
  return rooms;
}

/**
 * Add one room.
 */
async function add(room: IRoom): Promise<IRoom> {
  logger.info(room);
  const newRoom = RoomModel.build({ ...room });
  const savedRoom: Model<IRoom> | null = await newRoom.save();
  return savedRoom.dataValues;
}

/**
 * Delete one room.
 */
async function delete_(id: number): Promise<number> {
  return await RoomModel.destroy({ where: { id } });
}

// **** Export default **** //

export default {
  getOne,
  getAll,
  add,
  delete: delete_,
} as const;
