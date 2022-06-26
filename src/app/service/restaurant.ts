import { FilterQuery } from 'mongoose';
import * as geolib from 'geolib';
import Restaurant from '../interface/Restaurant';
import RestaurantModel from '../model/restaurant';
import ItemModel from '../model/item';
import UserModel from '../model/user';
import ERRORS from '../utilities/errors';

interface RestaurantFilter {
  itemName?: string,
  distance?: number,
}

const findRestaurantsByDistance = async (
  lat: number,
  lng: number,
  distance: number,
): Promise<Restaurant[]> => {
  const restaurants = await RestaurantModel.find();

  const restaurantsWithinDistance = restaurants
    .reduce((acc: Restaurant[], restaurant: Restaurant) => {
    const { lat: rLat, lng: rLng } = restaurant;
    if (!rLat || !rLng) return acc;

    const rDistance = geolib.getDistance(
      { lat, lng },
      { lat: rLat, lng: rLng },
    ) / 1000;

    if (rDistance < distance) {
      return [...acc, restaurant];
    }
    return acc;
  }, []);

  return restaurantsWithinDistance;
};

const create = async (payload: Restaurant): Promise<Restaurant> => {
    const isAlreadyCreated = await RestaurantModel.findOne(
      { name: payload.name },
    );
    if (isAlreadyCreated) {
      throw ERRORS.RESTAURANT.ALREADY_EXISTS;
    }

    const response = await RestaurantModel.create(payload);
    return response.toObject();
};

const read = async (
  filter: Partial<Restaurant> & RestaurantFilter,
): Promise<Restaurant[]> => {
  const query: FilterQuery<Restaurant> = {};
  if (filter.name) {
    query.name = { $regex: `^${filter.name}`};
  }
  if (filter.itemName) {
    const items = await ItemModel.find({ name: { $regex: `^${filter.itemName}` } });
    if (!items.length) return [];

    const restaurantsIdsByItemName = [...new Set(
      items.map(({ restaurantId }) => (restaurantId as string)),
    )];

    query._id = { $in: restaurantsIdsByItemName };
  }
  if (filter.lat && filter.lng && filter.distance) {
    const { lat, lng, distance } = filter;
    const restaurantsWithinDistance = await findRestaurantsByDistance(lat, lng, distance);
    const restaurantIdsWithinDistance = restaurantsWithinDistance.map(({ id }) => id);

    if (query._id) {
      const prevFilterRestaurants = query._id.$in;
      const validRestaurantsIds = restaurantIdsWithinDistance.filter((id) => (
        prevFilterRestaurants.includes(id)
      ));
      query._id = { $in: validRestaurantsIds };
    } else {
      query._id = { $in: restaurantIdsWithinDistance };
    }
    
  }

  return RestaurantModel.find({
    ...query,
  });
};

const readOne = async (id: string): Promise<Restaurant> => {
  const response = await RestaurantModel.findById(id);
  if (!response) {
    throw ERRORS.RESTAURANT.NOT_FOUND;
  }

  return response;
};

const remove = async (id: string, email: string): Promise<void> => {
  const restaurant = await RestaurantModel.findById(id);
  if (!restaurant) {
    throw ERRORS.RESTAURANT.NOT_FOUND;
  }
  
  const isUserValid = UserModel.findOne({
    email, role: 'seller', restaurantId: restaurant.id,
  });
  if (!isUserValid) {
    throw ERRORS.AUTH.INVALID_CREDENTIALS;
  }
  
  await RestaurantModel.findByIdAndDelete(id);
};

export default {
  create,
  read,
  readOne,
  remove,
};