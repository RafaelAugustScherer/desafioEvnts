import express, { Router } from 'express';
import { connectToDatabase } from './model/connection';

class App {
  private app = express();

  constructor(private router: Router) {
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