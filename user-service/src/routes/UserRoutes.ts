import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import PwdUtil from '@src/util/PwdUtil';
import logger from 'jet-logger';

// **** Functions **** //
const USER_NOT_AVAILABLE = 'User can be only in one room at the same time';
const ROOM_ADDED_SUCCESSFULLY = 'User ad to room successfully';

/**
 * Add one user.
 */
async function add(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body;
  await UserService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Connect user to room
 */
async function connectToRoom(req: IReq<{ data: Buffer }>, res: IRes) {
  const body = req.body.data;
  const { email, roomId } = PwdUtil.decryptData<{ email: string; roomId: number }>(body);
  const userObject = await UserService.getOneByAvailable(email);

  if (typeof userObject !== 'string' && userObject) {
    await UserService.updateOne(email, roomId);
    return res.status(HttpStatusCodes.OK).send({ message: ROOM_ADDED_SUCCESSFULLY });
  }

  return res.status(HttpStatusCodes.BAD_REQUEST).send({ USER_NOT_AVAILABLE });
}

/**
 * Delete user from room
 */
async function deleteFromRoom(req: IReq<{ data: Buffer }>, res: IRes) {
  const body = req.body.data;
  const { email } = PwdUtil.decryptData<{ email: string }>(body);
  const userObject = await UserService.getOneByAvailable(email);

  if (typeof userObject !== 'string' && userObject) {
    await UserService.updateOne(email, null);
    return res.status(HttpStatusCodes.OK).send({ message: ROOM_ADDED_SUCCESSFULLY });
  }

  return res.status(HttpStatusCodes.BAD_REQUEST).send({ USER_NOT_AVAILABLE });
}

/**
 * Get user status
 */
async function getStatus(req: IReq<{ data: Buffer }>, res: IRes) {
  const body = req.body.data;
  const decryptedObject = PwdUtil.decryptData<IUser>(body);

  logger.info(decryptedObject);
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
