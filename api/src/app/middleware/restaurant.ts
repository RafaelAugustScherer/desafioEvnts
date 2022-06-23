import RestaurantSchema from '../schema/restaurant';
import ValidationMiddleware from './validation';

class RestaurantValidationMiddleware extends ValidationMiddleware {
  constructor(protected schema = RestaurantSchema) {
    super(schema);
  }
}

export default RestaurantValidationMiddleware;