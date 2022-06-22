import { RequestHandler } from 'express';

interface Controller {
  create: RequestHandler,
  read: RequestHandler,
  readOne: RequestHandler,
  update: RequestHandler,
  delete: RequestHandler,
}

export default Controller;