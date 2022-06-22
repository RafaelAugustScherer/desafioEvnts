import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

interface ValidationSchemas {
  create: ObjectSchema,
  read: ObjectSchema,
  readOne: ObjectSchema,
  update: ObjectSchema,
  delete: ObjectSchema,
}

class ValidationMiddleware {
  constructor(private schema: ValidationSchemas) {}

  validateCreate: RequestHandler = async (req, _res, next) => {
    await this.schema.create.validateAsync(req.body);
    return next();
  };

  validateRead: RequestHandler = async (req, _res, next) => {
    await this.schema.read.validateAsync(req.params);
    return next();
  };
  
  validateReadOne: RequestHandler = async (req, _res, next) => {
    await this.schema.readOne.validateAsync(req.params);
    return next();
  };

  validateUpdate: RequestHandler = async (req, _res, next) => {
    await this.schema.update.validateAsync({ ...req.params, ...req.body });
    return next();
  };

  validateDelete: RequestHandler = async (req, _res, next) => {
    await this.schema.delete.validateAsync(req.params);
    return next();
  };
}

export default ValidationMiddleware;