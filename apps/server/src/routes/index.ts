import express from 'express';

import usersRoutes from './user.route';
import authRoutes from './auth.route';
import productRoutes from './products.route';
import reviewsRoutes from './reviews.route';
import ordersRoutes from './order.routes';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/orders', ordersRoutes);

export default router;
