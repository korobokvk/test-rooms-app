import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import { sendData } from '@src/queue';

import AuthService from '@src/services/AuthService';
import UserService from '@src/services/UserService';
import PwdUtil from '@src/util/PwdUtil';
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
  name: string;
}

const PASSWORD_NOT_MUCH = 'Passwords do not much';

// **** Functions **** //

/**
 * Create user
 */
async function createUser(req: IReq<ICreateUser>, res: IRes) {
  const { email, password, reEnteredPassword, name } = req.body;

  if (password !== reEnteredPassword) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, PASSWORD_NOT_MUCH);
  }

  const pwdHash = PwdUtil.hashSync(password);
  const user = await UserService.addOne({ email, pwdHash, name });
  sendData(user);
  return res.send({ message: 'User created successfully' });
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

// **** Export default **** //

export default {
  login,
  createUser,
} as const;
