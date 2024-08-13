import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';

import { validate } from '../utils/validator';
import { createUserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

const router = express.Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router.get('/', controller.getUsers.bind(controller));
router.post(
  '/',
  validate(createUserSchema),
  controller.onCreateUser.bind(controller)
);

export default router;
