import { Router } from 'express';
import ItemMiddleware from '../middleware/item';
import ItemController from '../controller/item';
import AuthMiddleware from '../middleware/auth';

const itemRouter = Router({ mergeParams: true });

itemRouter.route('/')
  .get(
    ItemMiddleware.validateRead,
    ItemController.read,
  )
  .post(
    AuthMiddleware.validateToken,
    ItemMiddleware.validateCreate,
    ItemController.create,
  );

itemRouter.route('/:itemId')
  .patch(
    AuthMiddleware.validateToken,
    ItemMiddleware.validateUpdate,
    ItemController.update,
  )
  .delete(
    AuthMiddleware.validateToken,
    ItemMiddleware.validateRemove,
    ItemController.remove,
  );

export default itemRouter;