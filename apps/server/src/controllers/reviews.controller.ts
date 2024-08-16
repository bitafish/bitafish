import { Request, Response, NextFunction } from 'express';
import { ReviewQuery } from '@bitafish/shared-types';

import { ReviewsService } from '../services/reviews.service';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from '../schemas/reviews.schema';

export class ReviewsController {
  private service: ReviewsService;

  constructor(_service: ReviewsService) {
    this.service = _service;
  }

  async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query['where'];
      const limit = Number(req.query['limit']);
      const offset = Number(req.query['offset']);
      const reviews = await this.service.getReviews(
        query as ReviewQuery,
        limit,
        offset
      );

      return res.status(200).json({
        status: 'success',
        data: {
          reviews,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const data = <CreateReviewInput>req.body;
      const newReview = await this.service.createReview(data);

      return res.status(201).json({
        status: 'success',
        data: {
          review: newReview,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = req.params.reviewId;
      const data = <UpdateReviewInput>req.body;

      const updatedReview = await this.service.updateReview(reviewId, data);

      return res.status(200).json({
        status: 'succcess',
        data: {
          review: updatedReview,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = req.params.reviewId;
      const deleteReview = await this.service.deleteReview(reviewId);

      return res.status(200).json({
        status: 'success',
        data: {
          review: deleteReview,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
