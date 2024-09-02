export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderItemInput {
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
}
