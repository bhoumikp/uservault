import express from 'express';
import userControls from '../controllers/user.controls.js';
import { auth } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('/', auth, userControls.handleGetUser);
router.post('/', userControls.handleCreateUser);
router.put('/', auth, userControls.handleUpdateUser);
router.delete('/', auth, userControls.handleDeleteUser);

export default router;