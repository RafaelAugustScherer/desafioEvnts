import { RequestHandler } from 'express';

interface ValidationMiddleware {
    validateCreate: RequestHandler
    validateRead: RequestHandler
    validateReadOne: RequestHandler
    validateUpdate: RequestHandler
    validateDelete: RequestHandler
}

export {
  ValidationMiddleware,
};