import Service from '.';
import IService from '../interface/Service';
import RestaurantModel, { Restaurant } from '../model/restaurant';
import ERRORS from '../utilities/errors';

class RestaurantService extends Service<Restaurant> implements IService<Restaurant> {
  constructor(protected model = RestaurantModel) {
    super('RESTAURANT', model);
  }

  create = async (payload: Restaurant) => {
    const isAlreadyCreated = await this.model.findOne({
      where: { name: payload.name },
    });

    if (isAlreadyCreated) {
      throw ERRORS.RESTAURANT.ALREADY_EXISTS;
    }

    const response = await this.model.create(payload);
    return response.toObject();
  };
}

export default RestaurantService;