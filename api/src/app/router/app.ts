import { Router } from 'express';
import errorMiddleware from '../middleware/error';
import restaurantRouter from './restaurant';

const appRouter = Router();

appRouter.use('/restaurant', restaurantRouter);
appRouter.use(errorMiddleware);

export default appRouter;

