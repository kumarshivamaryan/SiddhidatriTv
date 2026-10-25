import express from 'express';
import {
  getCompanyInfo,
  updateCompanyInfo,
  getFounders,
  createFounder,
  updateFounder,
  deleteFounder,
  getTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  deleteTestimonial,
} from '../controllers/contentController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/company', getCompanyInfo);
router.get('/founders', getFounders);
router.get('/testimonials', getTestimonials);

// Admin protected routes
router.put('/company', protectAdmin, updateCompanyInfo);
router.post('/founders', protectAdmin, createFounder);
router.put('/founders/:id', protectAdmin, updateFounder);
router.delete('/founders/:id', protectAdmin, deleteFounder);

router.get('/admin/testimonials', protectAdmin, getAllTestimonialsAdmin);
router.post('/testimonials', protectAdmin, createTestimonial);
router.delete('/testimonials/:id', protectAdmin, deleteTestimonial);

export default router;