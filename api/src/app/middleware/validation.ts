import { RequestHandler } from 'express';
import {
  ValidationMiddleware as IValidationMiddleware,
  ValidationSchema,
} from '../interface/Middleware';

class ValidationMiddleware implements IValidationMiddleware {
  constructor(protected schema: ValidationSchema) {}

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