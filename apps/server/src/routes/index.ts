import express from 'express';

import usersRoutes from './user.route';
import authRoutes from './auth.route';
import productRoutes from './products.route';
import reviewsRoutes from './reviews.route';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/reviews', reviewsRoutes);

export default router;
