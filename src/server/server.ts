import express, { Application } from 'express';
import cors from 'cors';

import Ip from '../middleware/params';
import log4js from '../common/logger/log4js';

import initRoute from '../routes';

class Server {
  private readonly app: Application;
  private readonly port: string | number;

  constructor(params: { port: string | number }) {
    this.app = express();
    this.port = params.port;
    this.middlewares();
    this.routes();
  }

  // 各种中间件
  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(Ip);
    const logger = log4js.getLogger('http');
    this.app.use(log4js.connectLogger(logger, { level: 'info' }));
  }

  // 初始化路由
  private routes(): void {
    initRoute(this.app);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

export default Server;
