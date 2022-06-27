import chai from 'chai';
import chaiHttp from 'chai-http';
import appRequester from './utilities/appRequester';
import RestaurantModel from '../app/model/restaurant';
import UserModel from '../app/model/user';
import RestaurantMocks from './mocks/restaurant';
import UserMocks from './mocks/user';

chai.use(chaiHttp);
const { expect } = chai;

const { fakeId, validRestaurant, validRestaurantTwo, invalidRestaurant } = RestaurantMocks;
const { fakeToken, validSeller, validLoginUser, validSellerTwo, validLoginSellerTwo  } = UserMocks;

describe('Teste das rotas de restaurante', () => {
  let token: string;

  const emptyDatabase = async () => {
    await UserModel.deleteMany({});
    await RestaurantModel.deleteMany({});
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

  beforeEach(async () => {
    token = await createUserAndReturnToken();
  });
  
  afterEach(async () => {
    await emptyDatabase();
  });

  describe('Quando é feita a criação de um restaurante', () => {
    it('Espera que o restaurante seja criado com sucesso', async () => {
      const response = await appRequester.post('/restaurant').set('Authorization', token).send(validRestaurant);

      expect(response).to.have.status(201);
      expect(response.body).to.have.keys(['_id', ...Object.keys(validRestaurant)]);
  
      const createdRestaurant = await RestaurantModel.findById(response.body._id);
      expect(createdRestaurant).not.to.be.null;
    });

    it('Espera que um restaurante inválido não possa ser criado', async () => {
      const response = await appRequester.post('/restaurant').set('Authorization', token).send(invalidRestaurant);
      expect(response).to.have.status(400);
    });

    it('Espera que o mesmo restaurante não possa ser criado duas vezes', async () => {
      await appRequester.post('/restaurant').set('Authorization', token).send(validRestaurant);
      const response = await appRequester.post('/restaurant').set('Authorization', token).send(validRestaurant);

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });

    it('Espera que um restaurante não possa ser criado com usuário inválido', async () => {
      const response = await appRequester.post('/restaurant').set('Authorization', fakeToken).send(validRestaurant);

      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });
  });

  describe('Quando é feita a listagem de restaurantes', async () => {
    it('Espera que os restaurantes cadastrados sejam listados', async () => {
      const restaurant = await createRestaurant();

      const response = await appRequester.get('/restaurant');

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([restaurant]);
    });

    it('Espera que seja retornado um array vazio caso não tenham restaurantes cadastrados', async () => {
      const response = await appRequester.get('/restaurant');

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([]);
    });

    it('Espera que os restaurantes sejam encontrados por filtro de nome', async () => {
      const secondSellerToken = await createUserAndReturnToken(validSellerTwo, validLoginSellerTwo);
      const restaurant = await createRestaurant();
      await createRestaurant(validRestaurantTwo, secondSellerToken);

      const response = await appRequester.get('/restaurant?name=Zé');

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([restaurant]);
    });

    it('Espera que os restaurantes sejam encontrados por filtro de tipo', async () => {
      const secondSellerToken = await createUserAndReturnToken(validSellerTwo, validLoginSellerTwo);
      const restaurant = await createRestaurant();
      const restaurantTwo = await createRestaurant(validRestaurantTwo, secondSellerToken);

      const response = await appRequester.get('/restaurant?type=Brasileira');

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([restaurant, restaurantTwo]);
    });

    it('Espera que os restaurantes sejam encontrados por filtro de distância', async () => {
      const secondSellerToken = await createUserAndReturnToken(validSellerTwo, validLoginSellerTwo);
      const restaurant = await createRestaurant();
      await createRestaurant(validRestaurantTwo, secondSellerToken);

      const response = await appRequester.get('/restaurant?lat=-21.19342&lng=-43.78443&distance=3');

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal([restaurant]);
    });
  });

  describe('Quando é feita a busca de um restaurante por id', async () => {
    it('Espera encontrar o restaurante criado com sucesso', async () => {
      const restaurant = await createRestaurant();

      const response = await appRequester.get(`/restaurant/${restaurant._id}`);
      
      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal(restaurant);
    });

    it('Espera que um erro \'não encontrado\' seja lançado caso o restaurante não exista', async () => {
      const response = await appRequester.get(`/restaurant/${fakeId}`);
      
      expect(response).to.have.status(404);
    });
  });

  describe('Quando é feita a remoção de um restaurante', async () => {
    it('Espera que o restaurante seja removido', async () => {
      const restaurant = await createRestaurant();
      
      const response = await appRequester.delete(`/restaurant/${restaurant._id}`).set('Authorization', token);
      
      expect(response).to.have.status(204);
      
      const deletedRestaurant = await RestaurantModel.findById(restaurant._id);
      expect(deletedRestaurant).to.be.null;
    });
  });
});