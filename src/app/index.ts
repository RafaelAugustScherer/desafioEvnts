import express from 'express';
import 'express-async-errors';
import { connectToDatabase } from './model/connection';
import appRouter from './router/app';

class App {
  private app = express();

  constructor(private router = appRouter) {
    this.router = router;
    this.config();
  }

  config = () => {
    this.app.use(express.json());
    this.app.use(this.router);
    connectToDatabase();
  };

  start = (port: number) => {
    this.app.listen(
      port,
      () => console.log('App running at', port),
    );
  };
}

export default App;