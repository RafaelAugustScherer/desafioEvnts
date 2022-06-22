interface Service<T> {
  create(payload: T): Promise<T>,
  read(filter?: Partial<T>): Promise<T[]>,
  readOne(id: number | string): Promise<T>,
  update(id: number | string, payload: T): Promise<T>,
  delete(id: number | string): Promise<void>,
}

export default Service;