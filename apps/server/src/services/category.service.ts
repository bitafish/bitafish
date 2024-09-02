import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from './../schemas/category.schema';
import { ICategoryService } from './../interface/category/ICategoryService';
import { CategoryRepository } from '../repositories/category.repository';

import { NotFoundError } from '../utils/error';
import { Category } from '@bitafish/shared-types';
import { string } from 'zod';

export class CategoryService implements ICategoryService {
  private repository: CategoryRepository;

  constructor(_repository: CategoryRepository) {
    this.repository = _repository;
  }

  async getCategories(limit: number, offset: number) {
    return await this.repository.find(limit, offset);
  }
  async createCategory({ id, name }: { id: string; name: string }) {
    const existingCategory = await this.repository.findById(id);

    if (existingCategory) {
      throw new Error('This Category already exists');
    }

    return await this.repository.create({
      name,
    });
  }
  async getCategoryById(id: string) {
    const category = await this.repository.findById(id);

    if (!category) {
      throw new NotFoundError('No product found.');
    }
    return category;
  }

  async updateCategory(CategoryId: string, { name }: UpdateCategoryInput) {
    const existingCategory = await this.repository.findById(CategoryId);

    if (!existingCategory) {
      throw new NotFoundError('No category with this id found');
    }
    return await this.repository.update(CategoryId, { name });
  }

  async deleteCategory(CategoryId: string) {
    return await this.repository.delete(CategoryId);
  }
}
