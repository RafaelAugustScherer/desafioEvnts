import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import ERRORS from '../utilities/errors';

const validateToken: RequestHandler = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    throw ERRORS.AUTH.TOKEN_NOT_FOUND;
  }
  
  JWT.decode(token);

  return next();
};

const generateToken: RequestHandler = async (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const { email } = req.body;

  if (!JWT_SECRET) {
    return next('Define JWT_SECRET as an environment variable!');
  }

  const token = JWT.sign({ email }, JWT_SECRET);
  res.locals.token = token;

  return next();
};

export default {
  validateToken,
  generateToken,
};