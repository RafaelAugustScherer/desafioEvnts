import { Router } from 'express';
import ItemMiddleware from '../middleware/item';
import ItemController from '../controller/item';

const itemRouter = Router({ mergeParams: true });

itemRouter.route('/')
  .post(
    ItemMiddleware.validateCreate,
    ItemController.create,
  );

itemRouter.route('/:itemId')
  .delete(
    ItemMiddleware.validateRemove,
    ItemController.remove,
  );

export default itemRouter;