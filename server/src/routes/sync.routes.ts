import express from 'express';
import { getSyncStatus } from '../controllers/sync.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/status', authMiddleware, getSyncStatus);

export default router;