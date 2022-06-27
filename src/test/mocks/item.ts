import Item from '../../app/interface/Item';

const validItem: Item = {
  name: 'Queijo Minas na Tábua - 2 pessoas',
  description: 'Delicioso queijo minas servido na tábua para 2 pessoas.',
  type: 'Tábua',
  price: 35,
};

const validItemTwo: Item = {
  name: 'Koca Kola 2L',
  description: 'Tradicional Koca Kola para acompanhar seu lanche.',
  type: 'Bebida',
  price: 12,
};

const invalidItem = {
  name: 'Queijo Minas na Tábua - 2 pessoas',
  type: 'Tábua',
  price: 35,
};

export default {
  validItem,
  validItemTwo,
  invalidItem,
};