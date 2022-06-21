import App from './app';
import appRouter from './app/router';

const app = new App(appRouter);
const PORT = process.env.PORT || 3001;

app.start(+PORT);