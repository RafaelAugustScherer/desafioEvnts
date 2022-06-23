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

export default {
  create,
  read,
  readOne: id,
  update,
  delete: id,
};