import User from '../interface/User';
import RestaurantModel from '../model/restaurant';
import UserModel from '../model/user';
import ERRORS from '../utilities/errors';

const create = async (payload: User): Promise<User> => {
  const isAlreadyCreated = await UserModel.findOne({
    $or: [
      { name: payload.name },
      { restaurantId: payload.restaurantId },
    ],
  });

  if (isAlreadyCreated) {
    throw ERRORS.USER.ALREADY_EXISTS;
  }

  if (payload.restaurantId) {
    const restaurantExists = await RestaurantModel.findById(payload.restaurantId);

    if (!restaurantExists) {
      throw ERRORS.RESTAURANT.NOT_FOUND;
    }
  }

  const response = await UserModel.create(payload);
  return response.toObject();
};

export default {
  create,
};