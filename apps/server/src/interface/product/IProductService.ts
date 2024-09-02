import {Product} from '@bitafish/shared-types';
import { CreateProductInput,UpdateProductInput } from '../../schemas/product.schema';

export interface IProductService {
    getProducts(limit: number, offset: number):
    Promise<Product[]>;
     getProductById(id: string): Promise<Product>;
     createProduct(data: CreateProductInput): Promise<Product>;
     updateProduct(productId: string, data: UpdateProductInput): Promise<Product>;
     deleteProduct(productId: string): Promise<Product>;
}