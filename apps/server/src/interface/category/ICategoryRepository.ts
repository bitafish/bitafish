import { UpdateCategorySchema } from './../../schemas/category.schema';

import { Category } from "@bitafish/shared-types";
import { CreateCategoryInput, UpdateCategoryInput } from "../../schemas/category.schema";

export interface ICategoryRepository{
    find(limit: number, offset: number): Promise<Category[]>;
    findById(id: string): Promise<Category>;
    create(data: CreateCategoryInput): Promise<Category>;
    update(id: string, data: UpdateCategoryInput): Promise<Category>;
    delete(categoryId: string): Promise<Category>;
}