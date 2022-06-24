import { Model } from 'mongoose';
import IService from '../interface/Service';
import ERRORS from '../utilities/errors';

class Service<T> implements IService<T> {
  constructor(
    protected entity: keyof typeof ERRORS,
    protected model: Model<T>,
  ) {}

  create = async (payload: T): Promise<T> => {
    const response = await this.model.create(payload);
    return response.toObject();
  };

  read = async (filter: Partial<T>): Promise<T[]> => (
    this.model.find({ where: { ...filter } })
  );

  readOne = async (id: number | string): Promise<T> => {
    const response = await this.model.findById(id);
    if (!response) {
      throw ERRORS[this.entity].NOT_FOUND;
    }

    return response;
  };

  update = async (id: number | string, payload: Partial<T>): Promise<T> => {
    const response = await this.model.findByIdAndUpdate(id, payload, { new: true });
    if (!response) {
      throw ERRORS[this.entity].NOT_FOUND;
    }

    return response;
  };

  delete = async (id: number | string): Promise<void> => {
    const response = await this.model.findByIdAndDelete(id);
    if (!response) {
      throw ERRORS[this.entity].NOT_FOUND;
    }
  };
}

export default Service;