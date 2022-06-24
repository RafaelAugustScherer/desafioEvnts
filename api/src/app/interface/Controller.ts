import { RequestHandler } from 'express';

interface Controller {
  create: RequestHandler,
  read: RequestHandler,
  readOne: RequestHandler,
  update: RequestHandler,
  delete: RequestHandler,
  addItem?: RequestHandler,
}

export default Controller;