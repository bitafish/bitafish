export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  CategoryId: string;
  images: string[];
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}
