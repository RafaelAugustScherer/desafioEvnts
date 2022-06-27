const ErrorConstructor = (status: number, message: string) => ({
  status,
  message,
  isExpected: true,
});

const ERRORS = {
  USER: {
    NOT_FOUND: ErrorConstructor(404, 'User not found'),
    ALREADY_EXISTS: ErrorConstructor(403, 'User already exists'),
    ALREADY_OWNS_A_RESTAURANT: ErrorConstructor(403, 'User is already owner of a restaurant'),
  },
  RESTAURANT: {
    NOT_FOUND: ErrorConstructor(404, 'Restaurant not found'),
    ALREADY_EXISTS: ErrorConstructor(403, 'Restaurant already exists'),
  },
  ITEM: {
    NOT_FOUND: ErrorConstructor(404, 'Item not found'),
    ALREADY_EXISTS: ErrorConstructor(403, 'Item already exists'),
  },
  AUTH: {
    TOKEN_NOT_FOUND: ErrorConstructor(400, 'Token not found'),
    INVALID_TOKEN: ErrorConstructor(403, 'Invalid token'),
    INVALID_CREDENTIALS: ErrorConstructor(403, 'Invalid credentials'),
  },
};

export default ERRORS;

