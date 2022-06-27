import chai from 'chai';
import chaiHttp from 'chai-http';
import App from '../../app';
import appRouter from '../../app/router/app';

chai.use(chaiHttp);
const { app } = new App(
  appRouter,
  'mongodb://localhost:3002',
  { dbName: 'desafio-evnts', autoIndex: true },
);

const appRequester = chai.request(app).keepOpen();

export default appRequester;