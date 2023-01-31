import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import PwdUtil from '@src/util/PwdUtil';
import logger from 'jet-logger';

// **** Functions **** //

/**
 * Add one user.
 */
async function add(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body;
  await UserService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body;
  await UserService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Get user status
 */
async function getStatus(req: IReq<{ data: NodeJS.ArrayBufferView }>, res: IRes) {
  const body = req.body.data;
  const decryptedData = PwdUtil.decryptData(body).toString();
  const decryptedObject = JSON.parse(decryptedData) as IUser;

  logger.info(decryptedObject);

  const userObject = await UserService.getOne(decryptedObject.email);

  return res.status(HttpStatusCodes.ACCEPTED).send(userObject).end();
}

// **** Export default **** //

export default {
  add,
  update,
  getStatus,
} as const;
