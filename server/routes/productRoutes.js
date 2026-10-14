import express from 'express';
import {
  getPublicProducts,
  getFeaturedProducts,
  getProductBySlug,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getPublicProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:slug', getProductBySlug);

export default router;
