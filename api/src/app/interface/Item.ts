interface Item {
  name: string,
  description: string,
  type: string,
  price: number,
  restaurantId?: number | string,
}

export default Item;