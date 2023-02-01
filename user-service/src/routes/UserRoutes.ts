import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import PwdUtil from '@src/util/PwdUtil';

const ROOM_ADDED_SUCCESSFULLY = 'User ad to room successfully';
// **** Functions **** //

/**
 * Add one user.
 */
async function add(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body;
  await UserService.addOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Connect user to room
 */
async function connectToRoom(req: IReq<{ data: Buffer }>, res: IRes) {
  const body = req.body.data;
  const { email, roomId } = PwdUtil.decryptData<{ email: string; roomId: number }>(body);
  await UserService.getOneByAvailable(email);

  await UserService.updateOne(email, roomId);
  return res.status(HttpStatusCodes.OK).send({ message: ROOM_ADDED_SUCCESSFULLY });
}

/**
 * Delete user from room
 */
async function deleteFromRoom(req: IReq<{ data: Buffer }>, res: IRes) {
  const body = req.body.data;
  const { email } = PwdUtil.decryptData<{ email: string }>(body);
  await UserService.getOneByAvailable(email);

  await UserService.updateOne(email, null);
  return res.status(HttpStatusCodes.OK).send({ message: ROOM_ADDED_SUCCESSFULLY });
}

/**
 * Get user status
 */
async function getStatus(req: IReq<{ data: Buffer }>, res: IRes) {
  const body = req.body.data;
  const decryptedObject = PwdUtil.decryptData<IUser>(body);
  const userObject = await UserService.getOne(decryptedObject.email);

  return res.status(HttpStatusCodes.OK).send(userObject).end();
}

// **** Export default **** //

export default {
  add,
  getStatus,
  connectToRoom,
  deleteFromRoom,
} as const;
