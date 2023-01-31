import axios from 'axios';

import RoomRepo from '@src/repos/RoomRepo';
import UserRepo from '@src/repos/UserRepo';
import { IRoom } from '@src/models/Room';
import { encryptText } from '@src/util/PwdUtil';
import EnvVars from '@src/constants/EnvVars';
import { IUser } from '@src/models/User';

// **** Variables **** //

export const ROOM_NOT_FOUND_ERR = 'Room not found';
export const USER_ALREADY_CONNECTED = 'User can connect only to one room per time';

// **** Functions **** //

/**
 * Add one room.
 */
async function addOne(room: IRoom): Promise<IRoom | void> {
  const newRoom = await RoomRepo.add(room);
  return newRoom;
}

/**
 * Get one
 */
async function getOne(id: number): Promise<IRoom | { message: string }> {
  return (await RoomRepo.getOne(id)) || { message: ROOM_NOT_FOUND_ERR };
}

/**
 *  Get all rooms
 */
async function getAll() {
  const rooms = await RoomRepo.getAll();
  return rooms;
}

/**
 * Delete room
 */
async function _delete(id: number): Promise<number> {
  return await RoomRepo.delete(id);
}

/**
 * Connect user to room
 */
async function connectUserToRoom({ email, id }: { email: string; id: number }) {
  const userExist = await UserRepo.getOne(email);

  if (!userExist) {
    return null;
  }

  const room = await getUserStatus(userExist);

  if (room) {
    return { message: USER_ALREADY_CONNECTED };
  }

  const connectResponse = await sendConnectionRequest(userExist.email, id);

  return connectResponse;
}

/**
 * Get user status
 */
async function getUserStatus(user: IUser) {
  const axiosConfig = {
    method: 'POST',
    data: {
      data: encryptText(user),
    },
    url: `${EnvVars.UserServiceUrl}/api/users/get-status`,
  };
  const result = await axios<IUser>(axiosConfig);

  if (result.data.room) {
    return USER_ALREADY_CONNECTED;
  }

  return result.data.room;
}

/**
 * Send request to connect
 */
async function sendConnectionRequest(email: string, roomId: number) {
  const axiosConfig = {
    method: 'POST',
    data: {
      data: encryptText({ email, roomId }),
    },
    url: `${EnvVars.UserServiceUrl}/api/users/connect-room`,
  };

  const result = await axios<{ message: string }>(axiosConfig);

  return result.data;
}
// **** Export default **** //

export default {
  addOne,
  getOne,
  getAll,
  delete: _delete,
  connectUserToRoom,
} as const;
