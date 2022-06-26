import { RequestHandler } from 'express-serve-static-core';
import RestaurantService from '../service/restaurant';

const create: RequestHandler = async (req, res) => {
  const response = await RestaurantService.create(req.body);
  return res.status(201).json(response);
};

const read: RequestHandler = async (req, res) => {
  const filter = req.query;
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
  const { email } = res.locals;
  await RestaurantService.remove(id, email);

  return res.status(204).end();
};

export default {
  create,
  read,
  readOne,
  remove,
};