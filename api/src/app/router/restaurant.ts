import { Router } from 'express';
import RestaurantMiddleware from '../middleware/restaurant';
import RestaurantController from '../controller/restaurant';
import itemRouter from './item';

const restaurantRouter = Router();

restaurantRouter.use('/:id/item', itemRouter);

restaurantRouter.route('/')
  .post(
    RestaurantMiddleware.validateCreate,
    RestaurantController.create,
  );

restaurantRouter.route('/search')
  .get(
    RestaurantMiddleware.validateRead,
    RestaurantController.read,
  );

restaurantRouter.route('/:id')
  .get(
    RestaurantMiddleware.validateReadOne,
    RestaurantController.readOne,
  )
  .delete(
    RestaurantMiddleware.validateRemove,
    RestaurantController.remove,
  );

export default restaurantRouter;