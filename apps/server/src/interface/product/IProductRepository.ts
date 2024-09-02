import { Product } from '@bitafish/shared-types';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../../schemas/product.schema';

export interface IProductRepository {
  find(limit: number, offset: number): Promise<Product[]>;
   findById(id: string): Promise<Product>;
   create(data: CreateProductInput): Promise<Product>;
   update(id: string, data: UpdateProductInput): Promise<Product>;
   delete(productId: string): Promise<Product>;
}
