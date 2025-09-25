import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

// Helper to format dates
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Helper to generate dates for the past N days
const generateDatesForPastDays = (days: number) => {
  const dates = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(formatDate(date));
  }
  
  return dates;
};

// Helper to generate random increasing/decreasing trends with some variation
const generateTrend = (days: number, startValue: number, volatility: number) => {
  const trend = [];
  let currentValue = startValue;
  
  for (let i = 0; i < days; i++) {
    // Add some random variation
    const change = (Math.random() - 0.48) * volatility;
    currentValue = Math.max(0, currentValue + change);
    trend.push(Math.round(currentValue));
  }
  
  return trend;
};

router.get('/', async (req: Request, res: Response) => {
  try {
    // Get query parameters
    const range = req.query.range as string || '30D';
    const warehouse = req.query.warehouse as string || 'all';
    const channel = req.query.channel as string || 'all';
    
    // Determine number of days based on range
    let days;
    let rangeLabel;
    
    switch(range) {
      case '7D':
        days = 7;
        rangeLabel = 'Last 7 days';
        break;
      case '30D':
        days = 30;
        rangeLabel = 'Last 30 days';
        break;
      case 'QTD':
        days = 90;
        rangeLabel = 'Quarter to date';
        break;
      case 'YTD':
        days = 365;
        rangeLabel = 'Year to date';
        break;
      default:
        days = 30;
        rangeLabel = 'Last 30 days';
    }
    
    // Generate dates
    const dates = generateDatesForPastDays(days);
    
    // Generate sales, purchases, and expenses trends
    const salesBase = warehouse === 'all' ? 150000 : 80000;
    const salesTrend = generateTrend(days, salesBase, 15000);
    
    const purchasesBase = warehouse === 'all' ? 90000 : 40000;
    const purchasesTrend = generateTrend(days, purchasesBase, 8000);
    
    const expensesBase = warehouse === 'all' ? 25000 : 10000;
    const expensesTrend = generateTrend(days, expensesBase, 3000);
    
    // Apply channel filter if needed
    const channelMultiplier = channel === 'all' ? 1 : (channel === 'online' ? 0.7 : (channel === 'retail' ? 0.5 : 0.3));
    
    // Create trend data with dates
    const trends = dates.map((date, i) => ({
      date,
      sales: Math.round(salesTrend[i] * channelMultiplier),
      purchases: Math.round(purchasesTrend[i] * channelMultiplier),
      expenses: Math.round(expensesTrend[i] * channelMultiplier)
    }));
    
    // Calculate totals
    const totalSales = Math.round(salesTrend.reduce((a, b) => a + b, 0) * channelMultiplier);
    const totalPurchases = Math.round(purchasesTrend.reduce((a, b) => a + b, 0) * channelMultiplier);
    const totalExpenses = Math.round(expensesTrend.reduce((a, b) => a + b, 0) * channelMultiplier);
    
    // Calculate month-over-month changes
    const salesChange = (Math.random() * 20 - 5).toFixed(1);
    const purchasesChange = (Math.random() * 10 - 3).toFixed(1);
    const expensesChange = (Math.random() * 15 - 8).toFixed(1);
    const marginChange = (Math.random() * 18 - 4).toFixed(1);
    
    // Get date range for display
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];
    
    // Construct response
    const response = {
      trends,
      totals: {
        sales: totalSales,
        purchases: totalPurchases,
        expenses: totalExpenses
      },
      changes: {
        sales: salesChange,
        purchases: purchasesChange,
        expenses: expensesChange,
        margin: marginChange
      },
      dateRange: {
        start: startDate,
        end: endDate,
        label: rangeLabel
      },
      filters: {
        range,
        warehouse,
        channel
      }
    };
    
    return res.json(response);
  } catch (error) {
    console.error('Error generating trends data:', error);
    return res.status(500).json({ error: 'Failed to generate trends data' });
  }
});

export default router;