import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const range = req.query.range as string || '30D';
    const warehouse = req.query.warehouse as string || 'all';
    
    // Generate random fulfillment metrics
    const orderCount = Math.floor(Math.random() * 1000) + 2000;
    const shipmentRate = 92 + (Math.random() * 7);
    const onTimeDelivery = 88 + (Math.random() * 10);
    const fulfillmentTime = 1.8 + (Math.random() * 0.8);
    const returnRate = 2 + (Math.random() * 2);
    
    // Calculate changes
    const orderChange = ((Math.random() * 15) - 5).toFixed(1);
    const shipmentChange = ((Math.random() * 10) - 3).toFixed(1);
    const onTimeChange = ((Math.random() * 8) - 2).toFixed(1);
    const timeChange = ((Math.random() * 12) - 6).toFixed(1);
    const returnChange = ((Math.random() * 12) - 8).toFixed(1);
    
    return res.json({
      metrics: {
        orders: orderCount,
        shipmentRate: parseFloat(shipmentRate.toFixed(1)),
        onTimeDelivery: parseFloat(onTimeDelivery.toFixed(1)),
        fulfillmentTime: parseFloat(fulfillmentTime.toFixed(1)),
        returnRate: parseFloat(returnRate.toFixed(1)),
      },
      changes: {
        orders: orderChange,
        shipmentRate: shipmentChange,
        onTimeDelivery: onTimeChange,
        fulfillmentTime: timeChange,
        returnRate: returnChange,
      },
      filters: {
        range,
        warehouse
      }
    });
  } catch (error) {
    console.error('Error generating fulfillment metrics:', error);
    return res.status(500).json({ error: 'Failed to generate fulfillment metrics' });
  }
});

export default router;