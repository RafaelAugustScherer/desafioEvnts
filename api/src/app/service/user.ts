import User from '../interface/User';
import RestaurantModel from '../model/restaurant';
import UserModel from '../model/user';
import UserUtilities from '../utilities/user';
import ERRORS from '../utilities/errors';

const create = async (payload: User): Promise<User> => {
  const isAlreadyCreated = await UserModel.findOne({
    $or: [
      { email: payload.email },
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

  const response = await UserModel.create({
    ...payload,
    password: UserUtilities.hashPassword(payload.password) },
  );
  return response.toObject();
};

export default {
  create,
};