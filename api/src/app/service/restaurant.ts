import Restaurant from '../interface/Restaurant';
import RestaurantModel from '../model/restaurant';
import ERRORS from '../utilities/errors';

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

const read = async (filter: Partial<Restaurant>): Promise<Restaurant[]> => (
  RestaurantModel.find({ ...filter })
);

const readOne = async (id: number | string): Promise<Restaurant> => {
  const response = await RestaurantModel.findById(id);
  if (!response) {
    throw ERRORS.RESTAURANT.NOT_FOUND;
  }

  return response;
};

const update = async (id: number | string, payload: Partial<Restaurant>): Promise<Restaurant> => {
  const response = await RestaurantModel.findByIdAndUpdate(id, payload, { new: true });
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
  update,
  remove,
};