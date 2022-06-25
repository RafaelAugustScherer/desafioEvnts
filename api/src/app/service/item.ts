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

const read = async (
  restaurantId: number | string,
  filter?: Partial<Item>,
): Promise<Item[]> => {
  const response = await ItemModel.find({ restaurantId: new ObjectId(restaurantId), ...filter });

  return response as Item[];
};

const update = async (
  restaurantId: number | string,
  itemId: number | string,
  payload: Partial<Item>,
): Promise<Item> => {

  const response = await ItemModel.findOneAndUpdate(
    { _id: new ObjectId(itemId), restaurantId: new ObjectId(restaurantId) },
    payload,
    { new: true },
  );
  if (!response) {
    throw ERRORS.ITEM.NOT_FOUND;
  }

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
  read,
  update,
  remove,
};