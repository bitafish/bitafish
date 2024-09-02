import { RoleEnumType } from '@prisma/client';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleEnumType;
  image?: string;
  isEmailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
