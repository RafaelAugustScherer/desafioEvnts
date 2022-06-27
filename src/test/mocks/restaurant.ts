import Restaurant from '../../app/interface/Restaurant';

const fakeId = '62b9b6b8fd65bdd5e91e5491';

const validRestaurant: Restaurant = {
  name: 'Restaurante do Zé',
  type: 'Brasileira',
  city: 'Barbacena',
  state_ab: 'MG',
  lat: -21.21,
  lng: -43.77,
};

const validRestaurantTwo: Restaurant = {
  name: 'Restaurante da Cecília',
  type: 'Brasileira',
  city: 'Joinville',
  state_ab: 'SC',
  lat: -26.30,
  lng: -48.84,
};

const invalidRestaurant = {
  name: 'Restaurante do Zé',
  city: 'Barbacena',
  state_ab: 'MG',
  lat: -21.21,
  lng: -43.77,
};

export default {
  fakeId,
  validRestaurant,
  validRestaurantTwo,
  invalidRestaurant,
};