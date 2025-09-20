import { Router } from 'express';

const router = Router();

// Example authentication route
router.post('/login', (req, res) => {
  // Example: use req.body to access login data
  const { username } = req.body;
  res.send(`Login route for user: ${username}`);
});

export default router;
