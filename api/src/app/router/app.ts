import { Router } from 'express';
import errorMiddleware from '../middleware/error';
import RestaurantRouter from './restaurant';

const appRouter = Router();

const { router: restaurantRouter } = new RestaurantRouter();

appRouter.use(restaurantRouter);
appRouter.use(errorMiddleware);

export default appRouter;

