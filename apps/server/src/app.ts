import { createSchema, createYoga } from 'graphql-yoga';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.setupGraphQLServer();
  }

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(helmet());
  };

  private setupGraphQLServer = (): void => {
    const yoga = createYoga({
      schema: createSchema({
        typeDefs: /* GraphQL */ `
          type Query {
            someNumber: Int!
          }
        `,
        resolvers: {},
      }),
    });
    this.app.use('/graphql', yoga);
  };
}

export default new App().app;
