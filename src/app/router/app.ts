import { Router } from 'express';
import errorMiddleware from '../middleware/error';
import restaurantRouter from './restaurant';
import userRouter from './user';

const appRouter = Router();

appRouter.use('/restaurant', restaurantRouter);
appRouter.use('/user', userRouter);
appRouter.use(errorMiddleware);

export default appRouter;

