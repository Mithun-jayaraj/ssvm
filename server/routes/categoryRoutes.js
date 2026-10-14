import express from 'express';
import {
  getPublicCategories,
  getCategoryBySlug,
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getPublicCategories);
router.get('/:slug', getCategoryBySlug);

export default router;
