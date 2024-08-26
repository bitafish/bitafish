import { Request, Response, NextFunction } from 'express';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../schemas/category.schema';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  private service: CategoryService;

  constructor(_service: CategoryService) {
    this.service = _service;
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query['limit']);
      const offset = Number(req.query['offset']);
      const categories = await this.service.getCategories(limit, offset);
      return res.status(200).json({
        status: 'success',
        data: { categories },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await this.service.getCategoryById(id);
      if (!category) {
        return res.status(404).json({
          status: 'fail',
          message: 'Category not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: { category },
      });
    } catch (error) {
      next(error);
    }
  }

  async onCreateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <CreateCategoryInput>req.body;
      const category = await this.service.createCategory(body);
      res.status(201).json({
        status: 'success',
        data: { category },
      });
    } catch (error) {
      next(error);
    }
  }

  async onUpdateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <UpdateCategoryInput>req.body;
      const categoryId: string = req.params.id;

      const updateCategory = await this.service.updateCategory(
        categoryId,
        body
      );

      return res.status(200).json({
        status: 'success',
        data: { category: updateCategory },
      });
    } catch (error) {
      next(error);
    }
  }

  async onDeleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId: string = req.params.id;
      const category = await this.service.getCategoryById(categoryId);
      if (!category) {
        return res.status(404).json({
          status: 'fail',
          message: 'Category not found',
        });
      }
      const deleteCategory = await this.service.deleteCategory(categoryId);

      return res.status(200).json({
        status: 'success',
        data: { id: deleteCategory.id },
      });
    } catch (error) {
      next(error);
    }
  }
}
