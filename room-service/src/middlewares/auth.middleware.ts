import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { Request, Response, NextFunction } from 'express';
import JwtUtil from '@src/util/JwtUtil';
import { IUser } from '@src/models/User';

export async function decode(req: Request, res: Response, next: NextFunction) {
  const jwt = req.headers.authorization;
  if (jwt) {
    const user = await JwtUtil.verify(jwt);
    req.body = user as IUser;
    return next();
  }
  // Added 404 to be more secure
  res.status(HttpStatusCodes.NOT_FOUND).send({ message: 'Not found' });
}
