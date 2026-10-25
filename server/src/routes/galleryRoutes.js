import express from 'express';
import {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/auth.js';
import upload from '../utils/upload.js';

const router = express.Router();

// Public: view all items
router.get('/', getGalleryItems);

// Admin: upload new case study from device file
router.post('/', protectAdmin, upload.single('image'), createGalleryItem);

// Admin: delete project
router.delete('/:id', protectAdmin, deleteGalleryItem);

export default router;