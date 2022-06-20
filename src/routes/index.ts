import { Application } from 'express';
import userRoutes from './user.routes';

const initRoute = (app: Application) => {
  app.use('/api/user', userRoutes);
};

export default initRoute;
