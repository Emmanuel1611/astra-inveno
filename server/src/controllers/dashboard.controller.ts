import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, startOfQuarter, endOfQuarter, format } from 'date-fns';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Get dashboard trends (sales, purchases, expenses over time)
export const getDashboardTrends = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { range = '30D', warehouse = 'all', channel = 'all' } = req.query;
    
    // Calculate date range based on the selected range
    let startDate: Date, endDate: Date = new Date();
    const today = new Date();
    
    switch(range) {
      case '7D':
        startDate = subDays(today, 7);
        break;
      case '30D':
        startDate = subDays(today, 30);
        break;
      case 'QTD':
        startDate = startOfQuarter(today);
        break;
      case 'YTD':
        startDate = startOfYear(today);
        break;
      default:
        startDate = subDays(today, 30);
    }
    
    // Build warehouse filter
    const warehouseFilter = warehouse !== 'all' ? 
      { warehouseId: warehouse as string } : {};
    
    // Build channel filter
    const channelFilter = channel !== 'all' ? 
      { channel: channel as string } : {};
    
    // Get sales data
    const sales = await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        ...warehouseFilter,
        ...channelFilter
      },
      orderBy: { createdAt: 'asc' }
    });
    
    // Get purchases data
    const purchases = await prisma.purchase.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        ...warehouseFilter
      },
      orderBy: { createdAt: 'asc' }
    });
    
    // Get expenses data
    const expenses = await prisma.expense.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { date: 'asc' }
    });
    
    // Group data by date for chart display
    const trendsByDate = new Map();
    
    // Process sales
    sales.forEach(sale => {
      const date = format(sale.createdAt, 'MMM d');
      if (!trendsByDate.has(date)) {
        trendsByDate.set(date, { date, sales: 0, purchases: 0, expenses: 0 });
      }
      trendsByDate.get(date).sales += sale.amount;
    });
    
    // Process purchases
    purchases.forEach(purchase => {
      const date = format(purchase.createdAt, 'MMM d');
      if (!trendsByDate.has(date)) {
        trendsByDate.set(date, { date, sales: 0, purchases: 0, expenses: 0 });
      }
      trendsByDate.get(date).purchases += purchase.amount;
    });
    
    // Process expenses
    expenses.forEach(expense => {
      const date = format(expense.date, 'MMM d');
      if (!trendsByDate.has(date)) {
        trendsByDate.set(date, { date, sales: 0, purchases: 0, expenses: 0 });
      }
      trendsByDate.get(date).expenses += expense.amount;
    });
    
    // Calculate total month-over-month changes
    const currentMonth = {
      sales: 0,
      purchases: 0,
      expenses: 0
    };
    
    const previousMonth = {
      sales: 0,
      purchases: 0,
      expenses: 0
    };
    
    // Current month data
    const currentMonthStart = startOfMonth(today);
    const currentMonthSales = await prisma.sale.aggregate({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lte: today
        }
      },
      _sum: { amount: true }
    });
    currentMonth.sales = currentMonthSales._sum.amount || 0;
    
    const currentMonthPurchases = await prisma.purchase.aggregate({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lte: today
        }
      },
      _sum: { amount: true }
    });
    currentMonth.purchases = currentMonthPurchases._sum.amount || 0;
    
    const currentMonthExpenses = await prisma.expense.aggregate({
      where: {
        date: {
          gte: currentMonthStart,
          lte: today
        }
      },
      _sum: { amount: true }
    });
    currentMonth.expenses = currentMonthExpenses._sum.amount || 0;
    
    // Previous month data
    const previousMonthStart = startOfMonth(subDays(currentMonthStart, 1));
    const previousMonthEnd = endOfMonth(previousMonthStart);
    
    const previousMonthSales = await prisma.sale.aggregate({
      where: {
        createdAt: {
          gte: previousMonthStart,
          lte: previousMonthEnd
        }
      },
      _sum: { amount: true }
    });
    previousMonth.sales = previousMonthSales._sum.amount || 0;
    
    const previousMonthPurchases = await prisma.purchase.aggregate({
      where: {
        createdAt: {
          gte: previousMonthStart,
          lte: previousMonthEnd
        }
      },
      _sum: { amount: true }
    });
    previousMonth.purchases = previousMonthPurchases._sum.amount || 0;
    
    const previousMonthExpenses = await prisma.expense.aggregate({
      where: {
        date: {
          gte: previousMonthStart,
          lte: previousMonthEnd
        }
      },
      _sum: { amount: true }
    });
    previousMonth.expenses = previousMonthExpenses._sum.amount || 0;
    
    // Calculate percentage changes
    const changes = {
      sales: previousMonth.sales ? ((currentMonth.sales - previousMonth.sales) / previousMonth.sales * 100).toFixed(1) : '0.0',
      purchases: previousMonth.purchases ? ((currentMonth.purchases - previousMonth.purchases) / previousMonth.purchases * 100).toFixed(1) : '0.0',
      expenses: previousMonth.expenses ? ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1) : '0.0'
    };
    
    // Calculate gross margin
    const totals = {
      sales: Array.from(trendsByDate.values()).reduce((sum, day) => sum + day.sales, 0),
      purchases: Array.from(trendsByDate.values()).reduce((sum, day) => sum + day.purchases, 0),
      expenses: Array.from(trendsByDate.values()).reduce((sum, day) => sum + day.expenses, 0)
    };
    
    const grossMargin = totals.sales - totals.purchases - totals.expenses;
    const previousGrossMargin = previousMonth.sales - previousMonth.purchases - previousMonth.expenses;
    
    const marginChange = previousGrossMargin ? 
      ((grossMargin - previousGrossMargin) / Math.abs(previousGrossMargin) * 100).toFixed(1) : '0.0';
    
    res.json({
      trends: Array.from(trendsByDate.values()),
      totals,
      changes: {
        ...changes,
        margin: marginChange
      },
      dateRange: {
        start: format(startDate, 'MMM d, yyyy'),
        end: format(endDate, 'MMM d, yyyy')
      }
    });
  } catch (error) {
    console.error('Dashboard trends error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard trends' });
  }
};

// Get sales by category
export const getDashboardCategories = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { range = '30D' } = req.query;
    
    // Calculate date range
    let startDate: Date, endDate: Date = new Date();
    const today = new Date();
    
    switch(range) {
      case '7D':
        startDate = subDays(today, 7);
        break;
      case '30D':
        startDate = subDays(today, 30);
        break;
      case 'QTD':
        startDate = startOfQuarter(today);
        break;
      case 'YTD':
        startDate = startOfYear(today);
        break;
      default:
        startDate = subDays(today, 30);
    }
    
    // Get sales by category
    const categories = await prisma.$queryRaw`
      SELECT c.name as category, SUM(si.totalPrice) as amount
      FROM sale_items si
      JOIN items i ON si.itemId = i.id
      JOIN categories c ON i.categoryId = c.id
      JOIN sales s ON si.saleId = s.id
      WHERE s.createdAt BETWEEN ${startDate} AND ${endDate}
      GROUP BY c.name
      ORDER BY amount DESC
      LIMIT 5
    `;
    
    res.json(categories);
  } catch (error) {
    console.error('Dashboard categories error:', error);
    res.status(500).json({ error: 'Failed to fetch sales by category' });
  }
};

// Get sales by channel
export const getDashboardChannels = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { range = '30D' } = req.query;
    
    // Calculate date range
    let startDate: Date, endDate: Date = new Date();
    const today = new Date();
    
    switch(range) {
      case '7D':
        startDate = subDays(today, 7);
        break;
      case '30D':
        startDate = subDays(today, 30);
        break;
      case 'QTD':
        startDate = startOfQuarter(today);
        break;
      case 'YTD':
        startDate = startOfYear(today);
        break;
      default:
        startDate = subDays(today, 30);
    }
    
    // Get total sales
    const totalSales = await prisma.sale.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: { amount: true }
    });
    
    const total = totalSales._sum.amount || 0;
    
    // Get sales by channel
    const channelData = await prisma.sale.groupBy({
      by: ['channel'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: { amount: true }
    });
    
    // Calculate percentages
    const channels = channelData.map(channel => ({
      name: channel.channel,
      value: Math.round((channel._sum.amount || 0) / total * 100)
    }));
    
    res.json(channels);
  } catch (error) {
    console.error('Dashboard channels error:', error);
    res.status(500).json({ error: 'Failed to fetch sales by channel' });
  }
};

// Get top selling products
export const getTopProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { range = '30D' } = req.query;
    
    // Calculate date range
    let startDate: Date, endDate: Date = new Date();
    const today = new Date();
    
    switch(range) {
      case '7D':
        startDate = subDays(today, 7);
        break;
      case '30D':
        startDate = subDays(today, 30);
        break;
      case 'QTD':
        startDate = startOfQuarter(today);
        break;
      case 'YTD':
        startDate = startOfYear(today);
        break;
      default:
        startDate = subDays(today, 30);
    }
    
    // Get top products
    const topProducts = await prisma.$queryRaw`
      SELECT i.id, i.sku, i.name, SUM(si.quantity) as sold, SUM(si.totalPrice) as revenue
      FROM sale_items si
      JOIN items i ON si.itemId = i.id
      JOIN sales s ON si.saleId = s.id
      WHERE s.createdAt BETWEEN ${startDate} AND ${endDate}
      GROUP BY i.id, i.sku, i.name
      ORDER BY revenue DESC
      LIMIT 5
    `;
    
    res.json(topProducts);
  } catch (error) {
    console.error('Top products error:', error);
    res.status(500).json({ error: 'Failed to fetch top products' });
  }
};

// Get low stock items
export const getLowStock = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Get items that are below their reorder level
    const lowStock = await prisma.itemWarehouse.findMany({
      where: {
        quantity: {
          lt: prisma.raw('reorderPoint')
        }
      },
      include: {
        item: true
      },
      orderBy: {
        quantity: 'asc'
      },
      take: 3
    });
    
    const formattedLowStock = lowStock.map(iw => ({
      sku: iw.item.sku,
      name: iw.item.name,
      qty: iw.quantity,
      reorder: iw.reorderPoint
    }));
    
    res.json(formattedLowStock);
  } catch (error) {
    console.error('Low stock error:', error);
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
};

// Get upcoming receivables
export const getReceivables = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const today = new Date();
    
    // Get upcoming receivables
    const receivables = await prisma.salesOrder.findMany({
      where: {
        status: 'approved',
        paymentStatus: 'pending'
      },
      select: {
        id: true,
        orderNumber: true,
        totalAmount: true,
        dueDate: true,
        customer: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        dueDate: 'asc'
      },
      take: 3
    });
    
    const formattedReceivables = receivables.map(r => ({
      id: r.orderNumber,
      customer: r.customer.name,
      dueIn: Math.ceil((r.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
      amount: r.totalAmount
    }));
    
    res.json(formattedReceivables);
  } catch (error) {
    console.error('Receivables error:', error);
    res.status(500).json({ error: 'Failed to fetch receivables' });
  }
};

// Get recent activity
export const getActivity = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { limit = 4 } = req.query;
    
    // Get recent activity
    const activity = await prisma.dashboardActivity.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: Number(limit)
    });
    
    // Format activity for display
    const formattedActivity = activity.map(a => ({
      ts: format(a.createdAt, 'HH:mm'),
      text: a.message,
      icon: a.icon
    }));
    
    res.json(formattedActivity);
  } catch (error) {
    console.error('Activity error:', error);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
};

// Get customer and order metrics
export const getCustomerMetrics = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const today = new Date();
    const startOfThisMonth = startOfMonth(today);
    const startOfLastMonth = startOfMonth(subDays(startOfThisMonth, 1));
    const endOfLastMonth = endOfMonth(startOfLastMonth);
    
    // Get new customers this month
    const newCustomersThisMonth = await prisma.customer.count({
      where: {
        createdAt: {
          gte: startOfThisMonth
        }
      }
    });
    
    // Get new customers last month
    const newCustomersLastMonth = await prisma.customer.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfThisMonth
        }
      }
    });
    
    // Calculate percentage change in new customers
    const customerChange = newCustomersLastMonth ? 
      ((newCustomersThisMonth - newCustomersLastMonth) / newCustomersLastMonth * 100).toFixed(0) : '0';
    
    // Get open orders
    const openOrders = await prisma.salesOrder.count({
      where: {
        status: {
          in: ['pending', 'approved']
        }
      }
    });
    
    // Get open orders last month
    const openOrdersLastMonth = await prisma.salesOrder.count({
      where: {
        status: {
          in: ['pending', 'approved']
        },
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth
        }
      }
    });
    
    // Calculate percentage change in open orders
    const orderChange = openOrdersLastMonth ? 
      ((openOrders - openOrdersLastMonth) / openOrdersLastMonth * 100).toFixed(0) : '0';
    
    res.json({
      newCustomers: {
        count: newCustomersThisMonth,
        change: Number(customerChange),
        increasing: Number(customerChange) > 0
      },
      openOrders: {
        count: openOrders,
        change: Number(orderChange),
        increasing: Number(orderChange) > 0
      }
    });
  } catch (error) {
    console.error('Customer metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch customer metrics' });
  }
};

// Get fulfillment metrics
export const getFulfillmentMetrics = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Count of orders by fulfillment status
    const readyToShip = await prisma.salesOrder.count({
      where: {
        status: 'approved',
        fulfillmentStatus: 'ready'
      }
    });
    
    const inTransit = await prisma.salesOrder.count({
      where: {
        fulfillmentStatus: 'in_transit'
      }
    });
    
    const delivered = await prisma.salesOrder.count({
      where: {
        fulfillmentStatus: 'delivered'
      }
    });
    
    res.json({
      readyToShip,
      inTransit,
      delivered
    });
  } catch (error) {
    console.error('Fulfillment metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch fulfillment metrics' });
  }
};