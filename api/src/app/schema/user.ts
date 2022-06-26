import Joi from 'joi';

const create = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('customer', 'seller').required(),
  restaurantId: Joi.string().hex().length(24),
  lat: Joi.number(),
  lng: Joi.number(),
});

export default {
  create,
};