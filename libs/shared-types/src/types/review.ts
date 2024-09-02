export interface Review {
  id: string;
  userId: string;
  productId: string;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewQuery {
  id?: string;
  userId?: string;
  productId?: string;
}
