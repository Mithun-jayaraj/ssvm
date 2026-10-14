import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  loginAdmin,
  logoutAdmin,
  getAdminMe,
} from '../controllers/adminAuthController.js';
import {
  getAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
} from '../controllers/productController.js';
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import {
  getAdminEnquiries,
  getAdminEnquiryById,
  updateAdminEnquiry,
  exportEnquiriesCSV,
} from '../controllers/enquiryController.js';
import {
  getAdminSettings,
  updateAdminSettings,
  getDashboardMetrics,
} from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Rate limiter for admin login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

// Admin Auth
router.post('/auth/login', loginLimiter, loginAdmin);
router.post('/auth/logout', protectAdmin, logoutAdmin);
router.get('/auth/me', protectAdmin, getAdminMe);

// Admin Dashboard Overview
router.get('/dashboard', protectAdmin, getDashboardMetrics);

// Admin Products CRUD & Image Uploads
router.get('/products', protectAdmin, getAdminProducts);
router.post('/products', protectAdmin, createProduct);
router.get('/products/:id', protectAdmin, getAdminProductById);
router.put('/products/:id', protectAdmin, updateProduct);
router.delete('/products/:id', protectAdmin, deleteProduct);
router.post(
  '/products/upload-images',
  protectAdmin,
  upload.array('images', 8),
  uploadProductImages
);

// Admin Categories CRUD
router.get('/categories', protectAdmin, getAdminCategories);
router.post('/categories', protectAdmin, createCategory);
router.put('/categories/:id', protectAdmin, updateCategory);
router.delete('/categories/:id', protectAdmin, deleteCategory);

// Admin Enquiries Management & CSV Export
router.get('/enquiries/export', protectAdmin, exportEnquiriesCSV);
router.get('/enquiries', protectAdmin, getAdminEnquiries);
router.get('/enquiries/:id', protectAdmin, getAdminEnquiryById);
router.patch('/enquiries/:id', protectAdmin, updateAdminEnquiry);

// Admin Settings
router.get('/settings', protectAdmin, getAdminSettings);
router.put('/settings', protectAdmin, updateAdminSettings);

export default router;
