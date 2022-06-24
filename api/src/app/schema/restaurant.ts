import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
});

const read = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
});

const update = Joi.object({
  id: Joi.string().hex().length(24),
  name: Joi.string(),
  type: Joi.string(),
});

const id = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const addItem = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
  price: Joi.number().positive().required(),
});

export default {
  create,
  read,
  readOne: id,
  update,
  delete: id,
  addItem,
};