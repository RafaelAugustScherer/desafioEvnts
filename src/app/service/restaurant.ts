import { FilterQuery } from 'mongoose';
import Restaurant from '../interface/Restaurant';
import RestaurantModel from '../model/restaurant';
import ItemModel from '../model/item';
import ERRORS from '../utilities/errors';

interface RestaurantFilter {
  itemName?: string,
}

const create = async (payload: Restaurant): Promise<Restaurant> => {
    const isAlreadyCreated = await RestaurantModel.findOne(
      { name: payload.name },
    );

    if (isAlreadyCreated) {
      throw ERRORS.RESTAURANT.ALREADY_EXISTS;
    }

    const response = await RestaurantModel.create(payload);
    return response.toObject();
};

const read = async (filter: Partial<Restaurant> & RestaurantFilter): Promise<Restaurant[]> => {
  const query: FilterQuery<Restaurant> = { ...filter };
  if (filter.name) {
    query.name = { $regex: `^${filter.name}`};
  }
  if (filter.itemName) {
    const items = await ItemModel.find({ name: { $regex: `^${filter.itemName}` } });
    if (!items.length) return [];

    const restaurantsByItemName: string[] = [];
    items.forEach(({ restaurantId }) => {
      if (!restaurantsByItemName.includes((restaurantId as string))) {
        restaurantsByItemName.push((restaurantId as string));
      }
    });

    query._id = { $in: restaurantsByItemName };
    delete query.itemName;
  }

  return RestaurantModel.find({
    ...query,
  });
};

const readOne = async (id: number | string): Promise<Restaurant> => {
  const response = await RestaurantModel.findById(id);
  if (!response) {
    throw ERRORS.RESTAURANT.NOT_FOUND;
  }

  return response;
};

const remove = async (id: number | string): Promise<void> => {
  const response = await RestaurantModel.findByIdAndDelete(id);
  if (!response) {
    throw ERRORS.RESTAURANT.NOT_FOUND;
  }
};

export default {
  create,
  read,
  readOne,
  remove,
};