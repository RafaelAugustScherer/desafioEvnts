import { RequestHandler } from 'express';
import { RestaurantMiddleware, RestaurantSchema as IRestaurantSchema } from '../interface/Restaurant';
import RestaurantSchema from '../schema/restaurant';
import ValidationMiddleware from './validation';

class RestaurantValidationMiddleware extends ValidationMiddleware implements RestaurantMiddleware {
  declare schema: IRestaurantSchema;
  
  constructor(schema = RestaurantSchema) {
    super(schema);
  }

  validateAddItem: RequestHandler = async (req, _res, next) => {
    await this.schema.addItem.validateAsync({ ...req.params, ...req.body });
    return next();
  };
}

export default RestaurantValidationMiddleware;