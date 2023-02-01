import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';

// **** Functions **** //

/**
 * Add one user.
 */
function addOne(user: IUser): Promise<IUser> {
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(userEmail: string, roomNumber: number | null): Promise<void> {
  await UserRepo.update(userEmail, roomNumber);
}

/**
 * Get one
 */
async function getOne(email: string): Promise<IUser> {
  const user = await UserRepo.getOne(email);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  return user;
}

/**
 * Get user if available rooms
 */
async function getOneByAvailable(email: string): Promise<IUser> {
  const user = await UserRepo.getOneByAvailable(email);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  return user;
}
// **** Export default **** //

export default {
  addOne,
  updateOne,
  getOne,
  getOneByAvailable,
} as const;
