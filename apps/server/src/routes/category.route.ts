import express from 'express';
import { CategoryController } from '../controllers/category.controller';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryService } from '../services/category.service';
import { validate } from '../utils/validator';
import { UpdateCategorySchema } from '../schemas/category.schema';

const router = express.Router();
const repository = new CategoryRepository();
const service = new CategoryService(repository);
const controller = new CategoryController(service);

router.get('/', controller.getCategories.bind(controller));
router.get('/category/:id', controller.getCategoryById.bind(controller));
router.post('/createCategory', controller.onCreateCategory.bind(controller));
router.put(
  '/:id',
  validate(UpdateCategorySchema),
  controller.onUpdateCategory.bind(controller)
);
router.delete('/:id', controller.onDeleteCategory.bind(controller));

export default router;
