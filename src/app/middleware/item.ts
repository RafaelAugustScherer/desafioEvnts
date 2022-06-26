import { RequestHandler } from 'express';
import ItemSchema from '../schema/item';

const validateCreate: RequestHandler = async (req, _res, next) => {
  await ItemSchema.create.validateAsync({ ...req.params, ...req.body });
  return next();
};

const validateRead: RequestHandler = async (req, _res, next) => {
  await ItemSchema.read.validateAsync({ ...req.params, ...req.query });
  return next();
};

const validateUpdate: RequestHandler = async (req, _res, next) => {
  await ItemSchema.update.validateAsync({ ...req.params, ...req.body });
  return next();
};

const validateRemove: RequestHandler = async (req, _res, next) => {
  await ItemSchema.remove.validateAsync(req.params);
  return next();
};

export default {
  validateCreate,
  validateRead,
  validateUpdate,
  validateRemove,
};