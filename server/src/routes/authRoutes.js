import express from 'express';
import { loginAdmin, getAdminMe, updateAdminProfile, logoutAdmin } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protectAdmin, getAdminMe);
router.put('/update-profile', protectAdmin, updateAdminProfile);

export default router;