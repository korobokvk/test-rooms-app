import { SuperTest, Test, Response } from 'supertest';

import User, { IUser } from '@src/models/User';
import UserRepo from '@src/repos/UserRepo';
import PwdUtil from '@src/util/PwdUtil';
import FullPaths from '@src/routes/constants/FullPaths';

// **** Variables **** //

const LoginCreds = {
  email: 'jsmith@gmail.com',
  password: 'Password@1',
} as const;

// **** Functions **** //

/**
 * Login a user.
 */
function login(beforeAgent: SuperTest<Test>, done: (arg: string) => void) {
  // Setup dummy data
  const pwdHash = PwdUtil.hashSync(LoginCreds.password);
  const loginUser: IUser = User.new('john smith', LoginCreds.email, pwdHash);
  // Add spy
  spyOn(UserRepo, 'getOne').and.resolveTo(loginUser);
  // Call Login API
  beforeAgent
    .post(FullPaths.Auth.Login)
    .type('form')
    .send(LoginCreds)
    .end((_: Error, res: Response) => {
      const cookie = res.headers['set-cookie'][0];
      return done(cookie);
    });
}

// **** Export default **** //

export default login;
