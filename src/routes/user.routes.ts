import { Router } from 'express';

import userController from '../controllers/user.controller';
import { register, login } from '../validator/user.validator';
import midJwt from '../middleware/jwt';

class UserRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get('/', midJwt, userController.list);
    this.router.post('/register', register, userController.register);
    this.router.get('/login', login, userController.login);
    // this.router.get('/:id', userController.get)
    // this.router.post('/', userController.create)
    // this.router.put('/:id', userController.update)
    // this.router.delete('/:id', userController.delete)
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
