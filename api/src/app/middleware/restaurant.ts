import { RequestHandler } from 'express';
import RestaurantSchema from '../schema/restaurant';

const validateCreate: RequestHandler = async (req, _res, next) => {
  await RestaurantSchema.create.validateAsync(req.body);
  return next();
};

const validateRead: RequestHandler = async (req, _res, next) => {
  await RestaurantSchema.read.validateAsync(req.params);
  return next();
};

const validateReadOne: RequestHandler = async (req, _res, next) => {
  await RestaurantSchema.readOne.validateAsync(req.params);
  return next();
};

const validateUpdate: RequestHandler = async (req, _res, next) => {
  await RestaurantSchema.update.validateAsync({ ...req.params, ...req.body });
  return next();
};

const validateRemove: RequestHandler = async (req, _res, next) => {
  await RestaurantSchema.remove.validateAsync(req.params);
  return next();
};

export default {
  validateCreate,
  validateRead,
  validateReadOne,
  validateUpdate,
  validateRemove,
};