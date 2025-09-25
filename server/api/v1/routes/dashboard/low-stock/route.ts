import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const warehouse = req.query.warehouse as string || 'all';
    const limit = parseInt(req.query.limit as string || '10');
    
    // Product name generator (similar to top-products but with variation)
    const productTypes = ['Cable', 'Adapter', 'Case', 'Memory Card', 'Battery', 'Power Bank', 'Screen Protector', 'Stylus', 'Controller', 'Mount', 'Hub', 'Stand'];
    const brands = ['TechPro', 'Nexus', 'Stellar', 'Prime', 'Elite', 'Ultra', 'MaxTech', 'InfiniteTech', 'ProGadget', 'SmartLife', 'ZenTech', 'FusionTech'];
    const attributes = ['Wireless', 'Fast Charging', 'Premium', 'Heavy Duty', 'Foldable', 'Universal', 'Compact', 'Rugged', 'Ergonomic', 'Travel'];
    
    const generateProductName = () => {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const type = productTypes[Math.floor(Math.random() * productTypes.length)];
      const attribute = Math.random() > 0.5 ? `${attributes[Math.floor(Math.random() * attributes.length)]} ` : '';
      return `${brand} ${attribute}${type}`;
    };
    
    // Generate low stock products
    const products = Array.from({ length: limit }, (_, i) => {
      const name = generateProductName();
      const stock = Math.floor(Math.random() * 10) + 1;
      const threshold = Math.floor(Math.random() * 20) + 15;
      const price = (Math.random() * 100 + 10).toFixed(2);
      const salesVelocity = Math.floor(Math.random() * 5) + 1;
      const daysRemaining = Math.max(1, Math.floor(stock / salesVelocity));
      
      return {
        id: `PROD-${2000 + i}`,
        name,
        sku: `SKU${200000 + Math.floor(Math.random() * 900000)}`,
        stock,
        threshold,
        stockPercent: Math.round((stock / threshold) * 100),
        price: parseFloat(price),
        salesVelocity,
        daysRemaining,
        status: daysRemaining <= 3 ? 'critical' : 'warning'
      };
    });
    
    // Sort by stock percentage (lowest first)
    products.sort((a, b) => a.stockPercent - b.stockPercent);
    
    return res.json({
      products,
      summary: {
        critical: products.filter(p => p.status === 'critical').length,
        warning: products.filter(p => p.status === 'warning').length,
        total: products.length
      },
      filters: {
        warehouse,
        limit
      }
    });
  } catch (error) {
    console.error('Error generating low stock data:', error);
    return res.status(500).json({ error: 'Failed to generate low stock data' });
  }
});

export default router;