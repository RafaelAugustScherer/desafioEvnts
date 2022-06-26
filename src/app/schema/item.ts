import Joi from 'joi';

const create = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
  price: Joi.number().positive().required(),
});

const read = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string(),
  type: Joi.string(),
});

const update = Joi.object({
  id: Joi.string().hex().length(24).required(),
  itemId: Joi.string().hex().length(24).required(),
  name: Joi.string(),
  description: Joi.string(),
  type: Joi.string(),
  price: Joi.number().positive(),
});

const remove = Joi.object({
  id: Joi.string().hex().length(24).required(),
  itemId: Joi.string().hex().length(24).required(),
});

export default {
  create,
  read,
  update,
  remove,
};