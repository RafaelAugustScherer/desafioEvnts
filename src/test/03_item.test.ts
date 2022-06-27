import chai from 'chai';
import chaiHttp from 'chai-http';
import { Document } from 'mongoose';
import appRequester from './utilities/appRequester';
import ItemModel from '../app/model/item';
import RestaurantModel from '../app/model/restaurant';
import UserModel from '../app/model/user';
import ItemMocks from './mocks/item';
import RestaurantMocks from './mocks/restaurant';
import UserMocks from './mocks/user';
import Restaurant from '../app/interface/Restaurant';

chai.use(chaiHttp);
const { expect } = chai;

const { validItem, invalidItem, validItemTwo } = ItemMocks;
const { fakeId, validRestaurant, validRestaurantTwo } = RestaurantMocks;
const { fakeToken, validSeller, validLoginUser, validSellerTwo, validLoginSellerTwo  } = UserMocks;

describe('Teste das rotas de item', () => {
  let token: string;
  let restaurant: Document<Restaurant>;

  const emptyDatabase = async () => {
    await UserModel.deleteMany({});
    await RestaurantModel.deleteMany({});
    await ItemModel.deleteMany({});
  };

  const createUserAndReturnToken = async (user = validSeller, loginUser = validLoginUser) => {
    await appRequester.post('/user').send(user);
    const loginResponse = await appRequester.post('/user/login').send(loginUser);

    return loginResponse.body.token;
  };

  const createRestaurant = async (restaurant = validRestaurant, tkn = token) => {
    const response = await appRequester.post('/restaurant').set('Authorization', tkn).send(restaurant);
    return response.body;
  };

  const createItem = async (item = validItem, restaurantId = restaurant._id, tkn = token) => {
    const response = await appRequester.post(`/restaurant/${restaurantId}/item`).set('Authorization', tkn).send(item);
    return response.body;
  };

  beforeEach(async () => {
    token = await createUserAndReturnToken();
    restaurant = await createRestaurant();
  });
  
  afterEach(async () => {
    await emptyDatabase();
  });

  describe('Quando é feita a criação de um item', () => {
    it('Espera que o item seja criado com sucesso', async () => {
      const response = await appRequester
        .post(`/restaurant/${restaurant._id}/item`)
        .set('Authorization', token)
        .send(validItem);

      expect(response).to.have.status(201);
      expect(response.body).to.have.keys(['_id', 'restaurantId', ...Object.keys(validItem)]);
  
      const createdItem = await ItemModel.findById(response.body._id);
      expect(createdItem).not.to.be.null;
    });

    it('Espera que um item inválido não possa ser criado', async () => {
      const response = await appRequester
        .post(`/restaurant/${restaurant._id}/item`)
        .set('Authorization', token)
        .send(invalidItem);

      expect(response).to.have.status(400);
    });

    it('Espera que o mesmo item não possa ser criado duas vezes', async () => {
      await createItem();

      const response = await appRequester
        .post(`/restaurant/${restaurant._id}/item`)
        .set('Authorization', token)
        .send(validItem);

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });

    it('Espera que um item não possa ser criado com usuário inválido', async () => {
      const response = await appRequester
        .post(`/restaurant/${restaurant._id}/item`)
        .set('Authorization', fakeToken)
        .send(validItem);

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });

    it('Espera que um item não possa ser criado com restaurante inválido', async () => {
      const response = await appRequester
        .post(`/restaurant/${fakeId}/item`)
        .set('Authorization', token)
        .send(validItem);

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });
  });

  describe('Quando é feita a listagem de itens', async () => {
    it('Espera que os itens cadastrados sejam listados', async () => {
      const item = await createItem();

      const response = await appRequester.get(`/restaurant/${restaurant._id}/item`);

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([item]);
    });

    it('Espera que os itens de outros restaurantes não sejam listados', async () => {
      const secondSellerToken = await createUserAndReturnToken(validSellerTwo, validLoginSellerTwo);
      const restaurantTwo = await createRestaurant(validRestaurantTwo, secondSellerToken);

      await createItem(validItemTwo, restaurantTwo._id, secondSellerToken);

      const response = await appRequester.get(`/restaurant/${restaurant._id}/item`);

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([]);
    });

    it('Espera que seja retornado um array vazio caso não tenham itens cadastrados', async () => {
      const response = await appRequester.get(`/restaurant/${restaurant._id}/item`);

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([]);
    });

    it('Espera que os itens sejam encontrados por filtro de nome', async () => {
      const item = await createItem();
      await createItem(validItemTwo);

      const response = await appRequester.get(`/restaurant/${restaurant._id}/item?name=Queijo`);

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([item]);
    });

    it('Espera que os itens sejam encontrados por filtro de tipo', async () => {
      await createItem();
      const itemTwo = await createItem(validItemTwo);

      const response = await appRequester.get(`/restaurant/${restaurant._id}/item?type=Bebida`);

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([itemTwo]);
    });
  });

  describe('Quando é feita a atualização de um item', () => {
    it('Espera que o item seja atualizado com sucesso', async () => {
      const item = await createItem();
      
      const response = await appRequester
        .patch(`/restaurant/${restaurant._id}/item/${item._id}`)
        .set('Authorization', token)
        .send({ price: 40 });

      expect(response).to.have.status(200);
      expect(response.body).to.have.keys(Object.keys(item));
  
      const updatedItem = await ItemModel.findById(item._id);
      expect(updatedItem).to.have.property('price', 40);
    });

    it('Espera que um item não possa ser atualizado com uma propriedade inválida', async () => {
      const item = await createItem();
      
      const response = await appRequester
        .patch(`/restaurant/${restaurant._id}/item/${item._id}`)
        .set('Authorization', token)
        .send({ price: 'quarenta' });

      expect(response).to.have.status(400);

      const updatedItem = await ItemModel.findById(item._id);
      expect(updatedItem).to.have.property('price', item.price);
    });

    it('Espera que um item não existente não possa ser atualizado', async () => {
      const response = await appRequester
        .patch(`/restaurant/${restaurant._id}/item/${fakeId}`)
        .set('Authorization', token)
        .send({ price: 40 });

      expect(response).to.have.status(404);
    });

    it('Espera que um item não possa ser atualizado com usuário inválido', async () => {
      const item = await createItem();
      
      const response = await appRequester
        .patch(`/restaurant/${restaurant._id}/item/${item._id}`)
        .set('Authorization', fakeToken)
        .send({ price: 40 });

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });

    it('Espera que um item não possa ser atualizado com restaurante inválido', async () => {
      const item = await createItem();
      
      const response = await appRequester
        .patch(`/restaurant/${fakeId}/item/${item._id}`)
        .set('Authorization', token)
        .send({ price: 40 });

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });
  });

  describe('Quando é feita a remoção de um item', async () => {
    it('Espera que o item seja removido', async () => {
      const item = await createItem();
      
      const response = await appRequester.delete(`/restaurant/${restaurant._id}/item/${item._id}`).set('Authorization', token);
      
      expect(response).to.have.status(204);
      
      const deletedItem = await ItemModel.findById(item._id);
      expect(deletedItem).to.be.null;
    });

    it('Espera que um item não possa ser removido com usuário inválido', async () => {
      const item = await createItem();
      
      const response = await appRequester
        .delete(`/restaurant/${restaurant._id}/item/${item._id}`)
        .set('Authorization', fakeToken);

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });

    it('Espera que um item não possa ser removido com restaurante inválido', async () => {
      const item = await createItem();
      
      const response = await appRequester
        .delete(`/restaurant/${fakeId}/item/${item._id}`)
        .set('Authorization', token);

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });
  });
});