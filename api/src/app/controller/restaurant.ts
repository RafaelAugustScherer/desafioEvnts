import { RequestHandler } from 'express-serve-static-core';
import Restaurant from '../interface/Restaurant';
import RestaurantService from '../service/restaurant';

const create: RequestHandler = async (req, res) => {
  const response = await RestaurantService.create(req.body);
  return res.status(201).json(response);
};

const read: RequestHandler = async (req, res) => {
  const filter = req.query as unknown as Partial<Restaurant>;
  const response = await RestaurantService.read(filter);

  return res.status(200).json(response);
};

const readOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const response = await RestaurantService.readOne(id);

  return res.status(200).json(response);
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await RestaurantService.remove(id);

  return res.status(204).end();
};

export default {
  create,
  read,
  readOne,
  remove,
};