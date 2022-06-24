import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

interface ValidationMiddleware {
    validateCreate: RequestHandler
    validateRead: RequestHandler
    validateReadOne: RequestHandler
    validateUpdate: RequestHandler
    validateDelete: RequestHandler
}

interface ValidationSchema {
  create: ObjectSchema,
  read: ObjectSchema,
  readOne: ObjectSchema,
  update: ObjectSchema,
  delete: ObjectSchema,
}

export {
  ValidationMiddleware,
  ValidationSchema,
};