import { IProductService } from './../interface/product/IProductService';
import { ProductRepository } from '../repositories/product.repository';

import {
  CreateProductInput,
  UpdateProductInput,
} from '../schemas/product.schema';
import { NotFoundError } from '../utils/error';
import { Product } from '@bitafish/shared-types';

export class ProductService implements IProductService {
  private repository: ProductRepository;

  constructor(_repository: ProductRepository) {
    this.repository = _repository;
  }

  async getProducts(limit: number, offset: number) {
    return await this.repository.find(limit, offset);
  }

  async getProductById(id: string) {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new NotFoundError('No product found.');
    }
    return product;
  }

  async createProduct({
    name,
    price,
    description,
    CategoryId,
    images,
    stock,
  }: CreateProductInput) {
    try {
      const product = await this.repository.create({
        name,
        price,
        description,
        CategoryId,
        stock,
        images,
      });

      return product;
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }
  async updateProduct(
    productId: string,
    { name, price, description, CategoryId, images, stock }: UpdateProductInput
  ) {
    const existingProduct= await this.repository.findById(productId);

    if(!existingProduct) {
      throw new NotFoundError('No product with this id found');
    }
    return await this.repository.update(productId, {
      name,
      price,
      description,
      CategoryId,
      images,
      stock,
    });
  }
  async deleteProduct(productId: string) {
    const existingProduct = await this.repository.findById(productId);

    if (!existingProduct) {
      throw new NotFoundError('No product with this id found');
    }
    return await this.repository.delete(productId);
  }
      
  }

