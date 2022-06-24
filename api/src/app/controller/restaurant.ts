import { RequestHandler } from 'express-serve-static-core';
import Controller from '.';
import { Restaurant } from '../model/restaurant';
import RestaurantService from '../service/restaurant';
import { RestaurantController as IRestaurantController } from '../interface/Restaurant';

class RestaurantController extends Controller<Restaurant> implements IRestaurantController {
  constructor(protected service = new RestaurantService()) {
    super(service);
  }

  addItem: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const item = req.body;

    const response = await this.service.addItem(id, item);
    return res.status(201).json(response);
  };
}

export default RestaurantController;