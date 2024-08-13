import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import routes from './routes/index';
import { HandleErrorWithLogger } from './utils/error/handler';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors({ credentials: true }));
    this.app.use(helmet());

    this.app.use('/api/v1', routes);

    this.app.use(HandleErrorWithLogger);
  };
}

export default new App().app;
