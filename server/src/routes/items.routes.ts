import { Router } from 'express';

const router = Router();

// Example route
router.get('/', (_, res) => {
  res.send('Items route is working!');
});

export default router;
