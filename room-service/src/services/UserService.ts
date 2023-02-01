import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';

// **** Functions **** //

/**
 * Add one user.
 */
async function addOne(user: IUser): Promise<IUser> {
  const newUser = await UserRepo.add(user);
  return newUser;
}

// **** Export default **** //

export default {
  addOne,
} as const;
