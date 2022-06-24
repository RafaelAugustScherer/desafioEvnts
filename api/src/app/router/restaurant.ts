import { Router as ExpressRouter } from 'express';
import Router from '.';
import {
  RestaurantController as IRestaurantController,
  RestaurantMiddleware as IRestaurantMiddleware,
} from '../interface/Restaurant';
import RestaurantController from '../controller/restaurant';
import RestaurantValidationMiddleware from '../middleware/restaurant';

class RestaurantRouter extends Router {
  private itemRouter = ExpressRouter({ mergeParams: true });
  declare controller: IRestaurantController;
  declare middleware: IRestaurantMiddleware;

  constructor(
    controller = new RestaurantController(),
    middleware = new RestaurantValidationMiddleware(),
  ) {
    super(controller, middleware);

    this.itemRouter
    .post('/',
      this.middleware.validateAddItem,
      this.controller.addItem,
    );
  
    this.router.use('/:id/item', this.itemRouter);
  }
}

export default RestaurantRouter;