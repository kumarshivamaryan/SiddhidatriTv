import express from 'express';
import {
  createQuery,
  getQueries,
  updateQueryStatus,
  deleteQuery,
} from '../controllers/queryController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public submission endpoint
router.post('/', createQuery);

// Protected dashboard actions
router.get('/', protectAdmin, getQueries);
router.put('/:id', protectAdmin, updateQueryStatus);
router.delete('/:id', protectAdmin, deleteQuery);

export default router;