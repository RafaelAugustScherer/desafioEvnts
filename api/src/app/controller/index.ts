import Service from '../interface/Service';
import IController from '../interface/Controller';
import { RequestHandler } from 'express-serve-static-core';

class Controller<T> implements IController {
  constructor(private service: Service<T>) {}

  create: RequestHandler = async (req, res) => {
    const response = await this.service.create(req.body);
    return res.status(201).json(response);
  };

  read: RequestHandler = async (req, res) => {
    const filter = req.params as unknown as Partial<T>;
    const response = await this.service.read(filter);

    return res.status(200).json(response);
  };

  readOne: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.readOne(id);

    return res.status(200).json(response);
  };

  update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.update(id, req.body);
    
    return res.status(200).json(response);
  };

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    await this.service.delete(id);

    return res.status(204).end();
  };
}

export default Controller;