import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';

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
async function getOne(email: string): Promise<IUser | string> {
  return (await UserRepo.getOne(email)) || USER_NOT_FOUND_ERR;
}

/**
 * Get user if available rooms
 */
async function getOneByAvailable(email: string): Promise<IUser | string> {
  return (await UserRepo.getOneByAvailable(email)) || USER_NOT_FOUND_ERR;
}
// **** Export default **** //

export default {
  addOne,
  updateOne,
  getOne,
  getOneByAvailable,
} as const;
