import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Items endpoints
router.get('/items', async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.post('/items', async (req, res) => {
  try {
    const { name, sku, description, quantity, unitPrice } = req.body;
    const item = await prisma.item.create({
      data: {
        name,
        sku,
        description,
        quantity: parseInt(quantity),
        unitPrice: parseFloat(unitPrice)
      }
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Warehouse endpoints
router.get('/warehouses', async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch warehouses' });
  }
});

router.post('/warehouses', async (req, res) => {
  try {
    const { name, location } = req.body;
    const warehouse = await prisma.warehouse.create({
      data: {
        name,
        location
      }
    });
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create warehouse' });
  }
});

// Inventory movements endpoints
router.post('/movements', async (req, res) => {
  try {
    const { itemId, warehouseId, quantity, type, reference } = req.body;
    const movement = await prisma.movement.create({
      data: {
        itemId,
        warehouseId,
        quantity: parseInt(quantity),
        type,
        reference
      }
    });
    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create movement' });
  }
});

router.get('/movements', async (req, res) => {
  try {
    const movements = await prisma.movement.findMany({
      include: {
        item: true,
        warehouse: true
      }
    });
    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movements' });
  }
});

export default router;
