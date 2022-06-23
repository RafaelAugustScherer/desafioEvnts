import { Router as ExpressRouter } from 'express';
import Controller from '../interface/Controller';
import { ValidationMiddleware } from '../interface/Middleware';

class Router {
  public router = ExpressRouter();

  constructor(
    protected route: string,
    protected controller: Controller,
    protected middleware: ValidationMiddleware,
  ) {
    this.router.route(`/${route}`)
      .post(
        middleware.validateCreate,
        controller.create,
      );

    this.router.route(`/${route}/search`)
      .get(
        middleware.validateRead,
        controller.read,
      );

    this.router.route(`/${route}/:id`)
      .get(
        middleware.validateReadOne,
        controller.readOne,
      )
      .put(
        middleware.validateUpdate,
        controller.update,
      )
      .delete(
        middleware.validateDelete,
        controller.delete,
      );
  }
}

export default Router;