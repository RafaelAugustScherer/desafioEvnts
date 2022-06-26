interface Restaurant {
  id?: string,
  name: string,
  type: string,
  city: string,
  state_ab: string,
  lat?: number,
  lng?: number,
}

export default Restaurant;