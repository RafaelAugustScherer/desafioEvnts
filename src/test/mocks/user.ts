import User from '../../app/interface/User';

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9,eyJlbWFpbCI6InplYmlyaXRhQGdtYWlsLmNvbSIsImlhdCI6MTY1NjI3NDc2MiwiZXhwIjoxNjU2MzYxMTYyfQ.waqco8rT2kIQc4Wyf-ebDT3vsZLFQehP3FRWtOk3thU';

const validUser: User = {
  email: 'rafaelaugustscherer@gmail.com',
  password: 'minhaSenha123',
  role: 'customer',
  lat: -29.58,
  lng: -51.08,
};

const invalidUser = {
  password: 'minhaSenha123',
  role: 'customer',
  lat: -29.58,
  lng: -51.08,
};


const validSeller: User = {
  email: 'rafaelaugustscherer@gmail.com',
  password: 'minhaSenha123',
  role: 'seller',
  lat: -29.58,
  lng: -51.08,
};

const validSellerTwo: User = {
  email: 'cecilia@email.com',
  password: 'OutraSenha123',
  role: 'seller',
};

const validLoginUser = {
  email: 'rafaelaugustscherer@gmail.com',
  password: 'minhaSenha123',
};

const validLoginSellerTwo = {
  email: 'cecilia@email.com',
  password: 'OutraSenha123',
};

export default {
  fakeToken,
  validUser,
  invalidUser,
  validSeller,
  validSellerTwo,
  validLoginUser,
  validLoginSellerTwo,
};