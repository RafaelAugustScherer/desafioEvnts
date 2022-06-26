import Joi from 'joi';

const create = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('customer', 'seller').required(),
  restaurantId: Joi.string().hex().length(24),
  lat: Joi.number(),
  lng: Joi.number(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default {
  create,
  login,
};