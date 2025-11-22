import express from 'express';
import authControls from '../controllers/auth.controls.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/token', authControls.handleGenerateToken);
router.get('/verify', auth, authControls.handleVerifyToken);
router.post('/logout', auth, authControls.handleLogout);

export default router;