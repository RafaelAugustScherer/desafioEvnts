import { RequestHandler } from 'express';
import ItemService from '../service/item';

const create: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const response = await ItemService.create(id, req.body);
  return res.status(201).json(response);
};

const remove: RequestHandler = async (req, res) => {
  const { itemId } = req.params;
  await ItemService.remove(itemId);

  return res.status(204).end();
};

export default {
  create,
  remove,
};