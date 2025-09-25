import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const range = req.query.range as string || '30D';
    
    // Define sales channels
    const channels = [
      { id: 'online', name: 'Online Store', color: '#3b82f6' },
      { id: 'marketplace', name: 'Marketplace', color: '#f59e0b' },
      { id: 'retail', name: 'Retail Stores', color: '#10b981' },
      { id: 'wholesale', name: 'Wholesale', color: '#8b5cf6' },
    ];
    
    // Generate random distribution for channels
    const total = 100;
    let remaining = total;
    
    const channelData = channels.map((channel, index) => {
      // For the last item, use the remaining percentage
      if (index === channels.length - 1) {
        return {
          ...channel,
          percentage: remaining,
          sales: Math.round((remaining / 100) * 500000)
        };
      }
      
      // Generate a random percentage for this channel
      const min = Math.max(5, remaining - (channels.length - index - 1) * 30);
      const max = Math.min(60, remaining - (channels.length - index - 1) * 5);
      const percentage = Math.floor(Math.random() * (max - min + 1)) + min;
      
      remaining -= percentage;
      
      return {
        ...channel,
        percentage,
        sales: Math.round((percentage / 100) * 500000)
      };
    });
    
    // Generate monthly comparisons
    const comparisons = channels.map(channel => {
      const currentMonth = Math.floor(Math.random() * 150000) + 50000;
      const previousMonth = Math.floor(Math.random() * 150000) + 50000;
      const change = parseFloat(((currentMonth / previousMonth - 1) * 100).toFixed(1));
      return {
        id: channel.id,
        name: channel.name,
        currentMonth,
        previousMonth,
        change
      };
    });
    
    return res.json({
      channels: channelData,
      comparisons,
      totalSales: channelData.reduce((sum, channel) => sum + channel.sales, 0),
      filters: {
        range
      }
    });
  } catch (error) {
    console.error('Error generating channels data:', error);
    return res.status(500).json({ error: 'Failed to generate channels data' });
  }
});

export default router;