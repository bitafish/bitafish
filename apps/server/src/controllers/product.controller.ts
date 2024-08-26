import { Request, Response, NextFunction } from 'express';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../schemas/product.schema';
import { ProductService } from '../services/product.service';

export class ProductController {
  private service: ProductService;

  constructor(_service: ProductService) {
    this.service = _service;
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query['limit']);
      const offset = Number(req.query['offset']);
      const products = await this.service.getProducts(limit, offset);
      return res.status(200).json({
        status: 'success',
        data: { products },
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await this.service.getProductById(id);
      if (!product) {
        return res.status(404).json({
          status: 'fail',
          message: 'Product not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  }

  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <CreateProductInput>req.body;
      const product = await this.service.createProduct(body);
      return res.status(201).json({
        status: 'success',
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  }
  async onUpdateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <UpdateProductInput>req.body;
      const productId: string = req.params.id;

      const updateProduct = await this.service.updateProduct(productId, body);

      return res.status(200).json({
        status: 'success',
        data: { product: updateProduct },
      });
    } catch (error) {
      next(error);
    }
  }
  async onDeleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId: string = req.params.id;
      const deleteProduct = await this.service.deleteProduct(productId);
      return res.status(200).json({
        status: 'success',
        data: { id: deleteProduct.id },
      });
    } catch (error) {
      next(error);
    }
  }
}
