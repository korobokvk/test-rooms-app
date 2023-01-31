import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import logger from 'jet-logger';
import RoomService, { USER_ALREADY_CONNECTED } from '@src/services/RoomService';
import { IRoom } from '@src/models/Room';
import { IReq, IRes } from './types/express/misc';

// **** Functions **** //

/**
 * Add one room.
 */
async function add(req: IReq<IRoom>, res: IRes) {
  const room = req.body;
  const newRoom = await RoomService.addOne(room);
  return res.status(HttpStatusCodes.OK).send(newRoom).end();
}

/**
 * Get all rooms
 */
async function getAll(req: IReq, res: IRes) {
  const rooms = await RoomService.getAll();
  return res.status(HttpStatusCodes.OK).send(rooms);
}

/**
 * Get room by id
 */
async function _get(req: IReq, res: IRes) {
  const id = req.params.id;
  const room = await RoomService.getOne(Number(id));

  if (room) {
    return res.status(HttpStatusCodes.OK).send(room).end();
  }

  return res.status(HttpStatusCodes.NOT_FOUND).send(room).end();
}

/**
 * Delete room
 */
async function _delete(req: IReq, res: IRes) {
  const id = req.params.id;
  const deletedCount = await RoomService.delete(Number(id));
  return res.status(HttpStatusCodes.OK).send({ message: deletedCount });
}

/**
 * Connect user to room
 */
async function connectToRoom(req: IReq<{ email: string; id: number }>, res: IRes) {
  const { email, id } = req.body;
  const response = await RoomService.connectUserToRoom({ email, id });

  const code = response?.message ? HttpStatusCodes.OK : HttpStatusCodes.BAD_REQUEST;

  return res.status(code).send(response).end();
}

// **** Export default **** //

export default {
  add,
  getAll,
  delete: _delete,
  connectToRoom,
  get: _get,
} as const;
