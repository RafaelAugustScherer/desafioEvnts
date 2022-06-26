type UserType = 'customer' | 'seller';

interface User {
  email: string,
  role: UserType,
  restaurantId?: string,
  lat?: number,
  lng?: number,
}

export default User;