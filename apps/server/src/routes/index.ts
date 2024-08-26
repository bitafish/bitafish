import express from 'express';

import usersRoutes from './user.route';
import authRoutes from './auth.route';
import productsRoutes from './product.route'
import categoriesRoutes from './category.route'

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/products',productsRoutes);
router.use('/categories', categoriesRoutes);

export default router;
