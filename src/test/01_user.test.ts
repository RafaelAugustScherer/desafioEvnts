import chai from 'chai';
import chaiHttp from 'chai-http';
import appRequester from './utilities/appRequester';
import UserModel from '../app/model/user';
import RestaurantModel from '../app/model/restaurant';
import UserMocks from './mocks/user';

chai.use(chaiHttp);
const { expect } = chai;

const { validUser, invalidUser, validSeller, validLoginUser } = UserMocks;

describe('Teste das rotas de usuário', () => {
  const emptyDatabase = async () => {
    await UserModel.deleteMany({});
    await RestaurantModel.deleteMany({});
  };
  
  afterEach(async () => {
    await emptyDatabase();
  });

  describe('Quando é feita a criação de usuário', () => {
    it('Espera que o usuário seja criado com sucesso', async () => {
      const response = await appRequester.post('/user').send(validUser);
      expect(response).to.have.status(201);
      expect(response.body).to.have.keys(['_id', 'email', 'role', 'lat', 'lng']);
  
      const createdUser = await UserModel.findById(response.body._id);
      expect(createdUser).not.to.be.null;
    });
  
    it('Espera que um vendedor seja criado com sucesso', async () => {
      const response = await appRequester.post('/user').send(validSeller);
      expect(response).to.have.status(201);
      expect(response.body).to.have.keys(['_id', 'email', 'role', 'lat', 'lng']);
    });
  
    it('Espera que um usuário inválido não possa ser criado', async () => {
      const response = await appRequester.post('/user').send(invalidUser);
      expect(response).to.have.status(400);
    });
  
    it('Espera que o mesmo usuário não possa ser criado duas vezes', async () => {
      await appRequester.post('/user').send(validUser);
      const response = await appRequester.post('/user').send(validUser);
  
      expect(response).to.have.status(403);
      expect(response).not.to.have.key('_id');
    });
  });

  describe('Quando é feito o login', async () => {
    it('Espera que um usuário possa logar com sucesso e retorne um token', async () => {
      await appRequester.post('/user').send(validUser);
      const response = await appRequester.post('/user/login').send(validLoginUser);

      expect(response).to.have.status(200);
      expect(response.body).to.have.key('token');
    });

    it('Espera que um usuário inválido não possa fazer login', async () => {
      const response = await appRequester.post('/user/login').send(validLoginUser);

      expect(response).to.have.status(403);
      expect(response.body).not.to.have.key('token');
    });
  });
});