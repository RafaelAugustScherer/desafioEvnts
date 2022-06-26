type UserRole = 'customer' | 'seller';

interface User {
  id?: string,
  email: string,
  password: string,
  role: UserRole,
  restaurantId?: string,
  lat?: number,
  lng?: number,
}

export default User;