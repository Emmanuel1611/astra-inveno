import { Router } from 'express';

const router = Router();

// Example route: GET /inventory
router.get('/', (_req, res) => {
  res.json({ message: 'Inventory route works!' });
});

export default router;
