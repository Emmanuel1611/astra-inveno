import { Request, Response } from 'express';
import { prisma } from '../../../app';
import Joi from 'joi';

const createItemSchema = Joi.object({
  sku: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  categoryId: Joi.string().optional(),
  unitOfMeasure: Joi.string().required(),
  costPrice: Joi.number().positive().required(),
  sellingPrice: Joi.number().positive().required(),
  minStockLevel: Joi.number().min(0).default(0),
  maxStockLevel: Joi.number().positive().optional(),
  reorderPoint: Joi.number().min(0).default(0),
  barcode: Joi.string().optional(),
  imageUrl: Joi.string().uri().optional(),
  trackInventory: Joi.boolean().default(true)
});

const updateItemSchema = createItemSchema.fork(
  ['sku', 'name', 'unitOfMeasure', 'costPrice', 'sellingPrice'],
  (schema) => schema.optional()
);

export const getAllItems = async (req: any, res: Response) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const categoryId = req.query.categoryId;
    
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(categoryId && { categoryId })
    };

    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true }
          },
          warehouses: {
            include: {
              warehouse: {
                select: { id: true, name: true, code: true }
              }
            }
          },
          createdBy: {
            select: { id: true, firstName: true, lastName: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.item.count({ where })
    ]);

    res.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await prisma.item.findUnique({
      where: { id, isActive: true },
      include: {
        category: {
          select: { id: true, name: true }
        },
        warehouses: {
          include: {
            warehouse: {
              select: { id: true, name: true, code: true }
            }
          }
        },
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        },
        movements: {
          include: {
            warehouse: {
              select: { name: true, code: true }
            },
            user: {
              select: { firstName: true, lastName: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10 // Last 10 movements
        }
      }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ item });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ error: 'Failed to retrieve item' });
  }
};

export const createItem = async (req: any, res: Response) => {
  try {
    const { error, value } = createItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if SKU already exists
    const existingItem = await prisma.item.findUnique({
      where: { sku: value.sku }
    });

    if (existingItem) {
      return res.status(400).json({ error: 'Item with this SKU already exists' });
    }

    const item = await prisma.item.create({
      data: {
        ...value,
        createdById: req.user.id
      },
      include: {
        category: {
          select: { id: true, name: true }
        },
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    res.status(201).json({
      message: 'Item created successfully',
      item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

export const updateItem = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { error, value } = updateItemSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if item exists
    const existingItem = await prisma.item.findUnique({
      where: { id, isActive: true }
    });

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check SKU uniqueness if being updated
    if (value.sku && value.sku !== existingItem.sku) {
      const skuExists = await prisma.item.findUnique({
        where: { sku: value.sku }
      });
      if (skuExists) {
        return res.status(400).json({ error: 'Item with this SKU already exists' });
      }
    }

    const item = await prisma.item.update({
      where: { id },
      data: {
        ...value,
        updatedById: req.user.id
      },
      include: {
        category: {
          select: { id: true, name: true }
        },
        updatedBy: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    res.json({
      message: 'Item updated successfully',
      item
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await prisma.item.findUnique({
      where: { id, isActive: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Soft delete
    await prisma.item.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};