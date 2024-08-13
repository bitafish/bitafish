import express from 'express';

import usersRoutes from './user.route';
import authRoutes from './auth.route';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

export default router;
