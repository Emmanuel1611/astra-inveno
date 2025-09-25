import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const range = req.query.range as string || '30D';
    
    // Sample categories with colors
    const categories = [
      { name: 'Electronics', color: '#3b82f6' },
      { name: 'Clothing', color: '#ef4444' },
      { name: 'Home & Kitchen', color: '#10b981' },
      { name: 'Books', color: '#f59e0b' },
      { name: 'Sports & Outdoors', color: '#8b5cf6' },
      { name: 'Beauty', color: '#ec4899' },
      { name: 'Toys & Games', color: '#06b6d4' },
    ];
    
    // Generate random data for categories
    const categoryData = categories.map(category => {
      const sales = Math.floor(Math.random() * 50000) + 10000;
      const units = Math.floor(Math.random() * 1000) + 100;
      const profit = Math.floor(sales * (0.2 + Math.random() * 0.3));
      const change = ((Math.random() * 30) - 10).toFixed(1);
      
      return {
        ...category,
        sales,
        units,
        profit,
        change
      };
    });
    
    // Sort by sales
    categoryData.sort((a, b) => b.sales - a.sales);
    
    return res.json({
      categories: categoryData,
      total: {
        sales: categoryData.reduce((sum, cat) => sum + cat.sales, 0),
        units: categoryData.reduce((sum, cat) => sum + cat.units, 0),
        profit: categoryData.reduce((sum, cat) => sum + cat.profit, 0)
      },
      filters: {
        range
      }
    });
  } catch (error) {
    console.error('Error generating categories data:', error);
    return res.status(500).json({ error: 'Failed to generate categories data' });
  }
});

export default router;