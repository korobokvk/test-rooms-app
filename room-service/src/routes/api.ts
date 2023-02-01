import { decode } from '@src/middlewares/auth.middleware';
import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import RoomRoutes from './RoomRoutes';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// ** Add RoomRouter ** //

const roomRouter = Router();

// Add user to room
roomRouter.post(Paths.Room.ConnectToRoom, validate('email', ['id', 'number']), RoomRoutes.connectToRoom);

// Remove user from room
roomRouter.post(Paths.Room.RemoveFromRoom, validate('email'), RoomRoutes.removeRoom);

// Add new room
roomRouter.post(Paths.Room.Add, validate('name'), RoomRoutes.add);

// Get room
roomRouter.get(Paths.Room.Get, RoomRoutes.get);

// Delete room
roomRouter.delete(Paths.Room.Delete, RoomRoutes.delete);

// Get all room
roomRouter.get(Paths.Room.GetAll, RoomRoutes.getAll);

apiRouter.use(Paths.Room.Base, decode, roomRouter);

// **** Export default **** //

export default apiRouter;
