import express from 'express';

import { validate } from '../utils/validator';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { deserializeUser } from '../middlewares/deserializeUser.middleware';
import { requireUser } from '../middlewares/requireUser.middleware';

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const service = new AuthService(userRepository);
const controller = new AuthController(service, userService);

router.post(
  '/register',
  validate(createUserSchema),
  controller.onRegisterUser.bind(controller)
);
router.post(
  '/login',
  validate(loginUserSchema),
  controller.onLoginUser.bind(controller)
);

router.use(deserializeUser, requireUser);
router.post('/refresh', controller.onRefreshAccessToken.bind(controller));
router.post('/logout', controller.onLogout.bind(controller));

export default router;
