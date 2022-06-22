const ErrorConstructor = (status: number, message: string) => ({
  status,
  message,
  isExpected: true,
});

const ERRORS = {
  USER: {
    NOT_FOUND: ErrorConstructor(404, 'User not found'),
  },
};

export default ERRORS;

