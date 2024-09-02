import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express.Router();

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const products = await prisma.product.findMany({});

  return res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
});

router.post('/', async (req, res) => {
  const data = req.body;
  const product = await prisma.product.create({
    data,
  });

  return res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

export default router;
