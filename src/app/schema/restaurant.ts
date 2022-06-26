import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  city: Joi.string().required(),
  state_ab: Joi.string().required().length(2),
  lat: Joi.number(),
  lng: Joi.number(),
});

const read = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  city: Joi.string(),
  state_ab: Joi.string(),
  lat: Joi.number(),
  lng: Joi.number(),
  radius: Joi.number().positive(),
});

const id = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export default {
  create,
  read,
  readOne: id,
  remove: id,
};