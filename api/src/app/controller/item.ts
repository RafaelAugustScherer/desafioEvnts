import { RequestHandler } from 'express';
import ItemService from '../service/item';

const create: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const response = await ItemService.create(id, req.body);
  return res.status(201).json(response);
};

const read: RequestHandler = async (req, res) => {
  const filter = req.query;
  const { id } = req.params;

  const response = await ItemService.read(id, filter);
  return res.status(200).json(response);
};

const update: RequestHandler = async (req, res) => {
  const { id, itemId } = req.params;
  
  const response = await ItemService.update(id, itemId, req.body);
  return res.status(200).json(response);
};

const remove: RequestHandler = async (req, res) => {
  const { itemId } = req.params;
  await ItemService.remove(itemId);

  return res.status(204).end();
};

export default {
  create,
  read,
  update,
  remove,
};