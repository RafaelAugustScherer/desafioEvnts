import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';
import Controller from './Controller';
import { ValidationMiddleware, ValidationSchema } from './Middleware';
import Service from './Service';

interface RestaurantService<T, R> extends Service<T> {
  addItem(
    restaurantId: number | string,
    payload: R,
  ): Promise<T>,
}

interface RestaurantController extends Controller {
  addItem: RequestHandler,
}

interface RestaurantMiddleware extends ValidationMiddleware {
  validateAddItem: RequestHandler,
}

interface RestaurantSchema extends ValidationSchema {
  addItem: ObjectSchema,
}

export {
  RestaurantService,
  RestaurantController,
  RestaurantMiddleware,
  RestaurantSchema,
};