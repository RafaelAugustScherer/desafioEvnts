import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().valid('customer', 'seller').required(),
  restaurantId: Joi.string().hex().length(24),
  lat: Joi.number(),
  lng: Joi.number(),
});

export default {
  create,
};