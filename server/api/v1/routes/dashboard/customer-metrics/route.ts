import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const range = req.query.range as string || '30D';
    
    // Define regions
    const regions = [
      { id: 'north_america', name: 'North America', color: '#3b82f6' },
      { id: 'europe', name: 'Europe', color: '#10b981' },
      { id: 'asia_pacific', name: 'Asia Pacific', color: '#f59e0b' },
      { id: 'latin_america', name: 'Latin America', color: '#8b5cf6' },
      { id: 'middle_east', name: 'Middle East & Africa', color: '#ec4899' }
    ];
    
    // Generate random distribution for regions
    let remaining = 100;
    
    const regionData = regions.map((region, index) => {
      // For the last item, use the remaining percentage
      if (index === regions.length - 1) {
        return {
          ...region,
          percentage: remaining,
          customers: Math.round((remaining / 100) * 5000)
        };
      }
      
      // Generate a random percentage for this region
      const min = Math.max(5, Math.floor(remaining / (regions.length - index) / 2));
      const max = Math.min(40, remaining - (regions.length - index - 1) * 5);
      const percentage = Math.floor(Math.random() * (max - min + 1)) + min;
      
      remaining -= percentage;
      
      return {
        ...region,
        percentage,
        customers: Math.round((percentage / 100) * 5000)
      };
    });
    
    // Customer acquisition and retention metrics
    const acquisitionRate = 12 + (Math.random() * 8);
    const retentionRate = 70 + (Math.random() * 20);
    const churnRate = 100 - retentionRate;
    const customerLifetimeValue = 250 + (Math.random() * 500);
    const acquisitionCost = 50 + (Math.random() * 100);
    const newCustomers = Math.floor(Math.random() * 500) + 300;
    const repeatPurchaseRate = 25 + (Math.random() * 35);
    
    // Calculate changes
    const acquisitionChange = ((Math.random() * 20) - 5).toFixed(1);
    const retentionChange = ((Math.random() * 15) - 5).toFixed(1);
    const clvChange = ((Math.random() * 25) - 5).toFixed(1);
    const newCustomersChange = ((Math.random() * 30) - 10).toFixed(1);
    
    // Customer segments
    const segments = [
      { name: 'One-time', percentage: Math.floor(Math.random() * 20) + 30, color: '#f87171' },
      { name: 'Occasional', percentage: Math.floor(Math.random() * 20) + 20, color: '#60a5fa' },
      { name: 'Regular', percentage: Math.floor(Math.random() * 15) + 15, color: '#4ade80' },
      { name: 'VIP', percentage: Math.floor(Math.random() * 10) + 5, color: '#c084fc' },
    ];
    
    // Ensure segments add up to 100%
    const totalSegments = segments.reduce((sum, segment) => sum + segment.percentage, 0);
    if (totalSegments !== 100) {
      const diff = 100 - totalSegments;
      segments[0].percentage += diff;
    }
    
    return res.json({
      regions: regionData,
      metrics: {
        acquisitionRate: parseFloat(acquisitionRate.toFixed(1)),
        retentionRate: parseFloat(retentionRate.toFixed(1)),
        churnRate: parseFloat(churnRate.toFixed(1)),
        customerLifetimeValue: parseFloat(customerLifetimeValue.toFixed(2)),
        acquisitionCost: parseFloat(acquisitionCost.toFixed(2)),
        newCustomers,
        repeatPurchaseRate: parseFloat(repeatPurchaseRate.toFixed(1)),
        totalCustomers: regionData.reduce((sum, region) => sum + region.customers, 0)
      },
      changes: {
        acquisitionRate: acquisitionChange,
        retentionRate: retentionChange,
        customerLifetimeValue: clvChange,
        newCustomers: newCustomersChange
      },
      segments,
      filters: {
        range
      }
    });
  } catch (error) {
    console.error('Error generating customer metrics:', error);
    return res.status(500).json({ error: 'Failed to generate customer metrics' });
  }
});

export default router;