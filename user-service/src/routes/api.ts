import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import User from '@src/models/User';
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

// Update one user
userRouter.put(Paths.Users.Update, validate(['user', User.instanceOf]), UserRoutes.update);

// Get status
apiRouter.use(Paths.Users.GetStatus, UserRoutes.getStatus);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
