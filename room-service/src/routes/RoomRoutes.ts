import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import RoomService from '@src/services/RoomService';
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

  return res.status(HttpStatusCodes.OK).send(room).end();
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

  return res.status(HttpStatusCodes.OK).send(response).end();
}

/**
 * Remove user from room
 */
async function removeRoom(req: IReq<{ email: string }>, res: IRes) {
  const { email } = req.body;
  const response = await RoomService.removeUserFromRoom(email);

  return res.status(HttpStatusCodes.OK).send(response).end();
}

// **** Export default **** //

export default {
  add,
  getAll,
  delete: _delete,
  connectToRoom,
  removeRoom,
  get: _get,
} as const;
