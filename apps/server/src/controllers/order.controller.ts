import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';
import { CreateOrderInput, UpdateOrderInput } from '../schemas/orders.schema';

export class OrderController {
  private service: OrderService;

  constructor(_service: OrderService) {
    this.service = _service;
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query['limit']) | 10;
      const offset = Number(req.query['offset']) | 0;
      const orders = await this.service.getOrders(limit, offset);

      return res.status(200).json({
        status: 'success',
        data: {
          orders,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async createOrder(
    req: Request<unknown, unknown, CreateOrderInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, shippingAddress, totalPrice, orderItems } = req.body;

      const newOrder = await this.service.createOrder({
        userId,
        shippingAddress,
        totalPrice,
        orderItems,
      });

      return res.json({
        status: 'success',
        data: {
          order: newOrder,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(
    req: Request<{ orderId: string }, unknown, UpdateOrderInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { orderId } = req.params;
      const data = req.body;
      const updatedOrder = await this.service.updateOrder(orderId, data);

      return res.status(200).json({
        status: 'success',
        data: {
          order: updatedOrder,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(
    req: Request<{ orderId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { orderId } = req.params;
      const deletedOrder = await this.service.deleteOrder(orderId);

      return res.status(200).json({
        status: 'success',
        data: {
          order: deletedOrder,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
