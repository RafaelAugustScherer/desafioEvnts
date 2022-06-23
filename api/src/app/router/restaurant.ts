import Router from '.';
import RestaurantController from '../controller/restaurant';
import RestaurantValidationMiddleware from '../middleware/restaurant';

class RestaurantRouter extends Router {
  constructor() {
    super(
      'restaurant',
      new RestaurantController(),
      new RestaurantValidationMiddleware(),
    );
  }
}

export default RestaurantRouter;