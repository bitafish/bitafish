import { object, string, TypeOf, z } from 'zod';
import { RoleEnumType } from '@prisma/client';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    }),
    lastName: string({
      required_error: 'Last Name is required',
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

export const updateUserSchema = object({
  body: object({
    firstName: string().optional(),
    lastName: string().optional(),
    role: z.optional(z.nativeEnum(RoleEnumType)),
    isEmailVerified: z.boolean().optional(),
    image: z.string().optional(),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];

export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
