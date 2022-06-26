import { RequestHandler } from 'express';
import UserSchema from '../schema/user';

const validateCreate: RequestHandler = async (req, _res, next) => {
  await UserSchema.create.validateAsync(req.body);
  return next();
};

export default {
  validateCreate,
};