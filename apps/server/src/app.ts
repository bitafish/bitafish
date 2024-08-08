import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes/index';
import { HandleErrorWithLogger } from './utils/error/handler';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use('/api/v1', routes);

    this.app.use(HandleErrorWithLogger);
  };
}

export default new App().app;
