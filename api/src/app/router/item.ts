import { Router } from 'express';
import ItemMiddleware from '../middleware/item';
import ItemController from '../controller/item';

const itemRouter = Router({ mergeParams: true });

itemRouter.route('/')
  .get(
    ItemMiddleware.validateRead,
    ItemController.read,
  )
  .post(
    ItemMiddleware.validateCreate,
    ItemController.create,
  );

itemRouter.route('/:itemId')
  .patch(
    ItemMiddleware.validateUpdate,
    ItemController.update,
  )
  .delete(
    ItemMiddleware.validateRemove,
    ItemController.remove,
  );

export default itemRouter;