import { Review, ReviewQuery } from '@bitafish/shared-types';
import { PrismaClient } from '@prisma/client';

import { IReviewsRepository } from '../interface/review/IReviewsRepository';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from '../schemas/reviews.schema';

export class ReviewsRepository implements IReviewsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(limit: number, offset: number) {
    return await this.prisma.reviews.findMany({
      take: limit,
      skip: offset,
    });
  }

  async find(
    where: ReviewQuery,
    limit: number,
    offset: number
  ): Promise<Review | Review[]> {
    return await this.prisma.reviews.findMany({
      where,
      take: limit,
      skip: offset,
    });
  }

  async create({
    userId,
    productId,
    stars,
  }: CreateReviewInput): Promise<Review> {
    return await this.prisma.reviews.create({
      data: {
        userId,
        productId,
        stars,
      },
    });
  }

  async update(id: string, { stars }: UpdateReviewInput) {
    return await this.prisma.reviews.update({
      where: { id },
      data: {
        stars,
      },
    });
  }

  async delete(reviewId: string) {
    return await this.prisma.reviews.delete({ where: { id: reviewId } });
  }
}
