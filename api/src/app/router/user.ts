import { Router } from 'express';
import UserMiddleware from '../middleware/user';
import UserController from '../controller/user';

const userRouter = Router();

userRouter.route('/')
  .post(
    UserMiddleware.validateCreate,
    UserController.create,
  );

export default userRouter;