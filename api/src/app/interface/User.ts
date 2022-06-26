type UserType = 'customer' | 'seller';

interface User {
  name: string,
  role: UserType,
  restaurantId?: string,
  lat?: number,
  lng?: number,
}

export default User;