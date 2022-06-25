import { Types } from 'mongoose';
import ItemModel from '../model/item';
import Item from '../interface/Item';
import ERRORS from '../utilities/errors';

const { ObjectId } = Types;

const create = async (restaurantId: number | string, payload: Item): Promise<Item> => {
  const isAlreadyCreated = await ItemModel.findOne(
    { name: payload.name, restaurantId: new ObjectId(restaurantId) },
  );

  if(isAlreadyCreated) {
    throw ERRORS.ITEM.ALREADY_EXISTS;
  }

  const response = await ItemModel.create({ restaurantId, ...payload });
  return response.toObject();
};

const remove = async (itemId: number | string): Promise<void> => {
  const response = await ItemModel.findByIdAndDelete(itemId);
  if (!response) {
    throw ERRORS.ITEM.NOT_FOUND;
  }
};

export default {
  create,
  remove,
};