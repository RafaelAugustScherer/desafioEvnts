import express from 'express';
import 'express-async-errors';
import { ConnectOptions } from 'mongoose';
import { connectToDatabase } from './model/connection';
import appRouter from './router/app';

class App {
  private _app = express();

  constructor(
    private router = appRouter,
    private connectionUri?: string,
    private connectionOptions?: ConnectOptions,
  ) {
    this.router = router;
    this.config();
  }

  get app() {
    return this._app;
  }

  config = () => {
    this.app.use(express.json());
    this.app.use(this.router);
    connectToDatabase(this.connectionUri, this.connectionOptions);
  };

  start = (port: number) => {
    this.app.listen(
      port,
      () => console.log('App running at', port),
    );
  };
}

export default App;