import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import AuthService from '@src/services/AuthService';
import { IReq, IRes } from './types/express/misc';

// **** Types **** //

interface ILoginReq {
  email: string;
  password: string;
}

interface ICreateUser {
  email: string;
  password: string;
  reEnteredPassword: string;
}

// **** Functions **** //

/**
 * Create user
 */
function createUser(req: IReq<ICreateUser>, res: IRes) {
  const { email, password, reEnteredPassword } = req.body;

  if (password !== reEnteredPassword) {
    return res.status(HttpStatusCodes.BAD_REQUEST).end();
  }
}
/**
 * Login a user.
 */
async function login(req: IReq<ILoginReq>, res: IRes) {
  const { email, password } = req.body;
  // Add jwt to cookie
  const jwt = await AuthService.getJwt(email, password);
  res.send({
    authToken: jwt,
  });
  // Return
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  login,
  logout,
  createUser,
} as const;
