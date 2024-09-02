import {  object, string, TypeOf } 
from "zod";

export const CreateCategorySchema = object({
body: object({
    name: string({
        required_error: 'The name of the category is required',
    })
})
});

export const UpdateCategorySchema = object ({
    body: object({
        name: string().optional(),
    })
});

export type CreateCategoryInput = TypeOf<typeof CreateCategorySchema>['body'];

export type UpdateCategoryInput = TypeOf<typeof CreateCategorySchema>['body'];