import { FilterQuery, Types } from 'mongoose';
import ItemModel from '../model/item';
import Item from '../interface/Item';
import UserModel from '../model/user';
import ERRORS from '../utilities/errors';

const { ObjectId } = Types;

const verifyRestaurantOwnership = async (
  restaurantId: string,
  email: string,
) => {
  const validUser = await UserModel.findOne({
    email, role: 'seller', restaurantId: new ObjectId(restaurantId),
  });

  if (!validUser) {
    throw ERRORS.AUTH.INVALID_CREDENTIALS;
  }
};

const create = async (
  payload: Item,
  restaurantId: string,
  email: string,
): Promise<Item> => {
  await verifyRestaurantOwnership(restaurantId, email);

  const isAlreadyCreated = await ItemModel.findOne(
    { name: payload.name, restaurantId: new ObjectId(restaurantId) },
  );
  if(isAlreadyCreated) {
    throw ERRORS.ITEM.ALREADY_EXISTS;
  }

  const response = await ItemModel.create({ restaurantId, ...payload });
  return response.toObject();
};

const read = async (
  filter: Partial<Item>,
  restaurantId: string,
): Promise<Item[]> => {
  const query: FilterQuery<Item> = { ...filter };
  if (filter.name) {
    query.name = { $regex: filter.name };
  }

  const response = await ItemModel.find({ restaurantId: new ObjectId(restaurantId), ...query });
  return response as Item[];
};

const update = async (
  payload: Partial<Item>,
  restaurantId: string,
  itemId: string,
  email: string,
): Promise<Item> => {
  await verifyRestaurantOwnership(restaurantId, email);

  const response = await ItemModel.findOneAndUpdate(
    { _id: new ObjectId(itemId) },
    payload,
    { new: true },
  );
  if (!response) {
    throw ERRORS.ITEM.NOT_FOUND;
  }

  return response.toObject();
};

const remove = async (
  itemId: string,
  email: string,
): Promise<void> => {
  const item = await ItemModel.findById(itemId);
  if (!item) {
    throw ERRORS.ITEM.NOT_FOUND;
  }

  await verifyRestaurantOwnership(item.restaurantId as string, email);

  await ItemModel.findByIdAndDelete(itemId);
};

export default {
  create,
  read,
  update,
  remove,
};