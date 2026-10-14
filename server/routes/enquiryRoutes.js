import express from 'express';
import rateLimit from 'express-rate-limit';
import { createEnquiry } from '../controllers/enquiryController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Rate limiter for public enquiry submissions
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 enquiry submissions per windowMs
  message: {
    success: false,
    message: 'Too many enquiry requests from this IP address. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  '/',
  enquiryLimiter,
  upload.array('referenceImages', 4),
  createEnquiry
);

export default router;
