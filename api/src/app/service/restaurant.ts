import Service from '.';
import { RestaurantService as IRestaurantService } from '../interface/Restaurant';
import RestaurantModel, { Restaurant } from '../model/restaurant';
import Item from '../interface/Item';
import ERRORS from '../utilities/errors';

class RestaurantService extends Service<Restaurant> implements IRestaurantService<Restaurant, Item> {
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

  addItem = async (
    restaurantId: number | string,
    payload: Item,
  ): Promise<Restaurant> => {
    const isAlreadyCreated = await this.model.findOne({
      where: { items: { $elemMatch: { name: payload.name } } },
    });

    if (isAlreadyCreated) {
      throw ERRORS.RESTAURANT.ITEM.ALREADY_EXISTS;
    }

    const response = await this.model.findByIdAndUpdate(restaurantId,
      { $push: { 'items': payload } },
      { new: true },
    );

    if (!response) {
      throw ERRORS.RESTAURANT.NOT_FOUND;
    }

    return response;
  };
}

export default RestaurantService;