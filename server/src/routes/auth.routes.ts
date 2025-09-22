import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getCurrentUser } from '../controllers/auth.controller';

const router = Router();

// authentication route
router.post('/login', (req, res) => {
  //use req.body to access login data
  const { username } = req.body;
  res.send(`Login route for user: ${username}`);
});

// Add this route to your existing auth routes
router.get('/me', authMiddleware, getCurrentUser);

export default router;
