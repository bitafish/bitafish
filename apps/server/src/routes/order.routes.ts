import express from 'express';
// import { deserializeUser } from '../middlewares/deserializeUser.middleware';
// import { requireUser } from '../middlewares/requireUser.middleware';
import { OrderRepository } from '../repositories/order.repository';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { OrderItemService } from '../services/order-item.service';
import { OrderItemRepository } from '../repositories/order-item.repository';

const router = express();

const repository = new OrderRepository();
const orderItemRepository = new OrderItemRepository();
const orderItemService = new OrderItemService(orderItemRepository);
const service = new OrderService(repository, orderItemService);
const controller = new OrderController(service);

// router.use(deserializeUser, requireUser);
router.get('/', controller.getOrders.bind(controller));
router.post('/', controller.createOrder.bind(controller));
router.put('/:orderId', controller.updateOrder.bind(controller));
router.delete('/:orderId', controller.deleteOrder.bind(controller));

export default router;
