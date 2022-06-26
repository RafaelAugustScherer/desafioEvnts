import { Router } from 'express';
import RestaurantMiddleware from '../middleware/restaurant';
import RestaurantController from '../controller/restaurant';
import itemRouter from './item';
import AuthMiddleware from '../middleware/auth';

const restaurantRouter = Router();

restaurantRouter.use('/:id/item', itemRouter);

restaurantRouter.route('/')
  .get(
    RestaurantMiddleware.validateRead,
    RestaurantController.read,
  )
  .post(
    AuthMiddleware.validateToken,
    RestaurantMiddleware.validateCreate,
    RestaurantController.create,
  );

restaurantRouter.route('/:id')
  .get(
    RestaurantMiddleware.validateReadOne,
    RestaurantController.readOne,
  )
  .delete(
    AuthMiddleware.validateToken,
    RestaurantMiddleware.validateRemove,
    RestaurantController.remove,
  );

export default restaurantRouter;