const ErrorConstructor = (status: number, message: string) => ({
  status,
  message,
  isExpected: true,
});

const ERRORS = {
  USER: {
    NOT_FOUND: ErrorConstructor(404, 'User not found'),
    ALREADY_EXISTS: ErrorConstructor(403, 'User already exists'),
  },
  RESTAURANT: {
    NOT_FOUND: ErrorConstructor(404, 'Restaurant not found'),
    ALREADY_EXISTS: ErrorConstructor(403, 'Restaurant already exists'),
  },
  ITEM: {
    NOT_FOUND: ErrorConstructor(404, 'Item not found'),
    ALREADY_EXISTS: ErrorConstructor(403, 'Item already exists'),
  },
};

export default ERRORS;

