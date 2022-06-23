import Controller from '.';
import { Restaurant } from '../model/restaurant';
import RestaurantService from '../service/restaurant';

class RestaurantController extends Controller<Restaurant> {
  constructor(protected service = new RestaurantService()) {
    super(service);
  }
}

export default RestaurantController;