import { Router } from 'express';

const router = Router();

// Example route for warehouses
router.get('/', (_req, res) => {
  res.json({ message: 'Warehouse route is working!' });
});

export default router;
