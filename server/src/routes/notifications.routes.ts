import express from 'express';
import { 
  getNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead 
} from '../controllers/notifications.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, getNotifications);
router.patch('/:id/read', authMiddleware, markNotificationAsRead);
router.patch('/read-all', authMiddleware, markAllNotificationsAsRead);

export default router;