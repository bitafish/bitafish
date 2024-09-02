import { Category } from '@bitafish/shared-types';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../../schemas/category.schema';

export interface ICategoryService {
  getCategories(limit: number, offset: number): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category>;
  createCategory(data: CreateCategoryInput): Promise<Category>;
  updateCategory(
    categoryId: string,
    data: UpdateCategoryInput
  ): Promise<Category>;
  deleteCategory(categoryId: string): Promise<Category>;
}
