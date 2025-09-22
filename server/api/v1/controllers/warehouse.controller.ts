import { Request, Response } from 'express';
import { prisma } from '../../../app';
import Joi from 'joi';

const createWarehouseSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  description: Joi.string().optional()
});

const updateWarehouseSchema = createWarehouseSchema.fork(
  ['name', 'code'],
  (schema) => schema.optional()
);

export const getAllWarehouses = async (req: Request, res: Response) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      where: { isActive: true },
      include: {
        items: {
          include: {
            item: {
              select: { id: true, name: true, sku: true }
            }
          }
        },
        _count: {
          select: { items: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ warehouses });
  } catch (error) {
    console.error('Get warehouses error:', error);
    res.status(500).json({ error: 'Failed to retrieve warehouses' });
  }
};

export const getWarehouseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const warehouse = await prisma.warehouse.findUnique({
      where: { id, isActive: true },
      include: {
        items: {
          include: {
            item: {
              select: { 
                id: true, 
                name: true, 
                sku: true, 
                unitOfMeasure: true,
                minStockLevel: true,
                reorderPoint: true
              }
            }
          }
        }
      }
    });

    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    res.json({ warehouse });
  } catch (error) {
    console.error('Get warehouse error:', error);
    res.status(500).json({ error: 'Failed to retrieve warehouse' });
  }
};

export const createWarehouse = async (req: Request, res: Response) => {
  try {
    const { error, value } = createWarehouseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if code already exists
    const existingWarehouse = await prisma.warehouse.findUnique({
      where: { code: value.code }
    });

    if (existingWarehouse) {
      return res.status(400).json({ error: 'Warehouse with this code already exists' });
    }

    const warehouse = await prisma.warehouse.create({
      data: value
    });

    res.status(201).json({
      message: 'Warehouse created successfully',
      warehouse
    });
  } catch (error) {
    console.error('Create warehouse error:', error);
    res.status(500).json({ error: 'Failed to create warehouse' });
  }
};

export const updateWarehouse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error, value } = updateWarehouseSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingWarehouse = await prisma.warehouse.findUnique({
      where: { id, isActive: true }
    });

    if (!existingWarehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    // Check code uniqueness if being updated
    if (value.code && value.code !== existingWarehouse.code) {
      const codeExists = await prisma.warehouse.findUnique({
        where: { code: value.code }
      });
      if (codeExists) {
        return res.status(400).json({ error: 'Warehouse with this code already exists' });
      }
    }

    const warehouse = await prisma.warehouse.update({
      where: { id },
      data: value
    });

    res.json({
      message: 'Warehouse updated successfully',
      warehouse
    });
  } catch (error) {
    console.error('Update warehouse error:', error);
    res.status(500).json({ error: 'Failed to update warehouse' });
  }
};
