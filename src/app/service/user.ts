import User from '../interface/User';
import RestaurantModel from '../model/restaurant';
import UserModel from '../model/user';
import UserUtilities from '../utilities/user';
import ERRORS from '../utilities/errors';

const create = async (payload: User): Promise<Partial<User>> => {
  const isAlreadyCreated = await UserModel.findOne(
    { email: payload.email },
  );
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
  const user: Partial<User> = response.toObject();
  delete user.password;

  return user;
};

const login = async (payload: Partial<User>): Promise<void> => {
  const response = await UserModel.findOne({
    email: payload.email,
    password: UserUtilities.hashPassword(payload.password || ''),
  });

  if (!response) {
    throw ERRORS.AUTH.INVALID_CREDENTIALS;
  }
};

export default {
  create,
  login,
};