import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from './../schemas/category.schema';
import { ICategoryService } from './../interface/category/ICategoryService';
import { CategoryRepository } from '../repositories/category.repository';

import { NotFoundError } from '../utils/error';
import { Category } from '@bitafish/shared-types';

export class CategoryService implements ICategoryService {
  private repository: CategoryRepository;

  constructor(_repository: CategoryRepository) {
    this.repository = _repository;
  }

  async getCategories(limit: number, offset: number) {
    return await this.repository.find(limit, offset);
  }
  async createCategory({ name }: CreateCategoryInput) {
    try {
      const category = await this.repository.create({
        name,
      });
      return category;
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }
  async getCategoryById(id: string) {
    const category = await this.repository.findById(id);

    if (!category) {
      throw new NotFoundError('No product found.');
    }
    return category;
  }

  async updateCategory(CategoryId: string, { name }: UpdateCategoryInput) {
    return await this.repository.update(CategoryId, { name });
  }

  async deleteCategory(CategoryId: string) {
    return await this.repository.delete(CategoryId);
  }
}
