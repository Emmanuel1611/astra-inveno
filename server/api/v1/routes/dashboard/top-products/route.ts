import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const range = req.query.range as string || '30D';
    const warehouse = req.query.warehouse as string || 'all';
    const limit = parseInt(req.query.limit as string || '10');
    
    // Product name generator
    const productTypes = ['Smartphone', 'Laptop', 'Headphones', 'Smart Watch', 'Tablet', 'Monitor', 'Camera', 'Speaker', 'Keyboard', 'Mouse', 'TV', 'Charger'];
    const brands = ['TechPro', 'Nexus', 'Stellar', 'Prime', 'Elite', 'Ultra', 'MaxTech', 'InfiniteTech', 'ProGadget', 'SmartLife', 'ZenTech', 'FusionTech'];
    const attributes = ['Pro', 'Ultra', 'Plus', 'Max', 'Elite', 'Premium', 'Lite', 'Standard', 'Advanced', 'Deluxe'];
    
    const generateProductName = () => {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const type = productTypes[Math.floor(Math.random() * productTypes.length)];
      const attribute = Math.random() > 0.5 ? ` ${attributes[Math.floor(Math.random() * attributes.length)]}` : '';
      const version = Math.random() > 0.3 ? ` ${Math.floor(Math.random() * 15) + 1}` : '';
      return `${brand} ${type}${attribute}${version}`;
    };
    
    // Generate top products
    const products = Array.from({ length: limit }, (_, i) => {
      const name = generateProductName();
      const units = Math.floor(Math.random() * 500) + 50;
      const price = (Math.random() * 900 + 100).toFixed(2);
      const revenue = (units * parseFloat(price)).toFixed(2);
      const profit = (parseFloat(revenue) * (0.2 + Math.random() * 0.3)).toFixed(2);
      const stock = Math.floor(Math.random() * 1000) + 100;
      
      return {
        id: `PROD-${1000 + i}`,
        rank: i + 1,
        name,
        sku: `SKU${100000 + Math.floor(Math.random() * 900000)}`,
        units,
        price: parseFloat(price),
        revenue: parseFloat(revenue),
        profit: parseFloat(profit),
        stock,
        change: parseFloat(((Math.random() * 40) - 15).toFixed(1))
      };
    });
    
    // Sort by revenue
    products.sort((a, b) => b.revenue - a.revenue);
    
    // Update ranks after sorting
    products.forEach((product, index) => {
      product.rank = index + 1;
    });
    
    return res.json({
      products,
      totals: {
        units: products.reduce((sum, product) => sum + product.units, 0),
        revenue: parseFloat(products.reduce((sum, product) => sum + product.revenue, 0).toFixed(2)),
        profit: parseFloat(products.reduce((sum, product) => sum + product.profit, 0).toFixed(2))
      },
      filters: {
        range,
        warehouse,
        limit
      }
    });
  } catch (error) {
    console.error('Error generating top products data:', error);
    return res.status(500).json({ error: 'Failed to generate top products data' });
  }
});

export default router;