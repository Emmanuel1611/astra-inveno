import express from 'express';
import { getHelpContent, searchHelpArticles } from '../controllers/help.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, getHelpContent);
router.get('/search', authMiddleware, searchHelpArticles);

export default router;