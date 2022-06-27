import { RequestHandler } from 'express';
import ItemService from '../service/item';

const create: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { email } = res.locals;

  const response = await ItemService.create(req.body, id, email);
  return res.status(201).json(response);
};

const read: RequestHandler = async (req, res) => {
  const filter = req.query;
  const { id } = req.params;

  const response = await ItemService.read(filter, id);
  return res.status(200).json(response);
};

const update: RequestHandler = async (req, res) => {
  const { id, itemId } = req.params;
  const { email } = res.locals;
  
  const response = await ItemService.update(req.body, id, itemId, email);
  return res.status(200).json(response);
};

const remove: RequestHandler = async (req, res) => {
  const { id, itemId } = req.params;
  const { email } = res.locals;

  await ItemService.remove(id, itemId, email);

  return res.status(204).end();
};

export default {
  create,
  read,
  update,
  remove,
};