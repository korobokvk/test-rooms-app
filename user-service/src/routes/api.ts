import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// **** Setup **** //

const authRouter = Router();

// Create user
authRouter.post(Paths.Auth.Create, validate('email', 'password', 'reEnteredPassword'), AuthRoutes.createUser);

// Login user
authRouter.post(Paths.Auth.Login, validate('email', 'password'), AuthRoutes.login);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);

// ** Add UserRouter ** //

const userRouter = Router();

// USER PRIVATE ROUTES

// Get status
userRouter.post(Paths.Users.GetStatus, UserRoutes.getStatus);

// Connect to room
userRouter.post(Paths.Users.ConnectRoom, UserRoutes.connectToRoom);

// Delete from room
userRouter.post(Paths.Users.DeleteRoom, validate('email'), UserRoutes.deleteFromRoom);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
