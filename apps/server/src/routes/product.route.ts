import express from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from '../services/product.service';
import { validate } from '../utils/validator';
import { updateProductSchema } from '../schemas/product.schema';

const router = express.Router();
const repository = new ProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

router.get('/', controller.getProducts.bind(controller));
router.get('/product/:id', controller.getProductById.bind(controller));
router.post('/createProduct', controller.onCreateProduct.bind(controller));
router.put(
  '/:id',
  validate(updateProductSchema),
  controller.onUpdateProduct.bind(controller)
);
router.delete('/:id', controller.onDeleteProduct.bind(controller));

export default router;
