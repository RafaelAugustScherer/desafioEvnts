type UserRole = 'customer' | 'seller';

interface User {
  email: string,
  password: string,
  role: UserRole,
  restaurantId?: string,
  lat?: number,
  lng?: number,
}

export default User;