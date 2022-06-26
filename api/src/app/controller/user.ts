import { RequestHandler } from 'express-serve-static-core';
import UserService from '../service/user';

const create: RequestHandler = async (req, res) => {
  const response = await UserService.create(req.body);
  return res.status(201).json(response);
};

export default {
  create,
};