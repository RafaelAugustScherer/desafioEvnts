import { Model } from 'mongoose';
import IService from '../interface/Service';
import ERRORS from '../utilities/errors';

class Service<T> implements IService<T> {
  constructor(private model: Model<T>) {}

  create = async (payload: T) => {
    const response = await this.model.create(payload);
    return response.toObject();
  };

  read = async (filter: Partial<T>) => (
    this.model.find({ where: { ...filter } })
  );

  readOne = async (id: number | string) => {
    const response = await this.model.findById(id);
    if (!response) {
      throw ERRORS.USER.NOT_FOUND;
    }

    return response;
  };

  update = async (id: number | string, payload: Partial<T>) => {
    const response = await this.model.findByIdAndUpdate(id, payload);
    if (!response) {
      throw ERRORS.USER.NOT_FOUND;
    }

    return response;
  };

  delete = async (id: number | string) => {
    const response = await this.model.findByIdAndDelete(id);
    if (!response) {
      throw ERRORS.USER.NOT_FOUND;
    }
  };
}

export default Service;