import express from 'express';
import { ReviewsController } from '../controllers/reviews.controller';
import { ReviewsRepository } from '../repositories/reviews.repository';
import { ReviewsService } from '../services/reviews.service';
import { deserializeUser } from '../middlewares/deserializeUser.middleware';
import { requireUser } from '../middlewares/requireUser.middleware';
import { validate } from '../utils/validator';
import {
  createReviewSchema,
  updateReviewSchema,
} from '../schemas/reviews.schema';

const router = express.Router();

const repository = new ReviewsRepository();
const service = new ReviewsService(repository);
const controller = new ReviewsController(service);

router.get('/', controller.getReviews.bind(controller));

router.use(deserializeUser, requireUser);
router.post(
  '/',
  validate(createReviewSchema),
  controller.createReview.bind(controller)
);
router.patch(
  '/:reviewId',
  validate(updateReviewSchema),
  controller.updateReview.bind(controller)
);
router.delete('/:reviewId', controller.deleteReview.bind(controller));

export default router;
