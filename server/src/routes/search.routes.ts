import express from 'express';
import { globalSearch } from '../controllers/search.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, globalSearch);

export default router;