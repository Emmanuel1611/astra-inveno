import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

// Helper to format dates and times
const formatDateTime = (date: Date) => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

// Helper to generate a past date/time
const generatePastDateTime = (minutes: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return formatDateTime(date);
};

// Format relative time
const formatRelativeTime = (minutes: number) => {
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
};

// GET endpoint handler
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string || '20');
    
    // User names
    const users = [
      { name: 'John Smith', role: 'Inventory Manager', avatar: '/avatars/user1.png' },
      { name: 'Emma Johnson', role: 'Sales Manager', avatar: '/avatars/user2.png' },
      { name: 'Michael Brown', role: 'Warehouse Supervisor', avatar: '/avatars/user3.png' },
      { name: 'Sarah Davis', role: 'Purchasing Agent', avatar: '/avatars/user4.png' },
      { name: 'Robert Wilson', role: 'Admin', avatar: '/avatars/user5.png' }
    ];
    
    // Activity types
    const activityTypes = [
      { type: 'product_added', message: 'added a new product', entity: 'product', icon: 'package' },
      { type: 'product_updated', message: 'updated product details', entity: 'product', icon: 'edit' },
      { type: 'order_placed', message: 'placed a new order', entity: 'order', icon: 'shopping-bag' },
      { type: 'order_shipped', message: 'marked an order as shipped', entity: 'order', icon: 'truck' },
      { type: 'stock_adjusted', message: 'performed a stock adjustment', entity: 'inventory', icon: 'clipboard' },
      { type: 'user_added', message: 'added a new user', entity: 'user', icon: 'user-plus' },
      { type: 'supplier_added', message: 'added a new supplier', entity: 'supplier', icon: 'briefcase' },
      { type: 'payment_received', message: 'recorded a payment', entity: 'finance', icon: 'credit-card' },
      { type: 'report_generated', message: 'generated a report', entity: 'report', icon: 'file-text' },
      { type: 'price_updated', message: 'updated product pricing', entity: 'product', icon: 'tag' }
    ];
    
    // Generate entity names
    const generateEntityName = (type: string) => {
      switch (type) {
        case 'product':
          const products = ['Laptop Pro 15"', 'Wireless Earbuds', 'Smart Watch SE', '4K Monitor 28"', 'Bluetooth Speaker Mini'];
          return products[Math.floor(Math.random() * products.length)];
        case 'order':
          return `Order #${Math.floor(Math.random() * 9000) + 1000}`;
        case 'user':
          const names = ['Alex Turner', 'Jessica Parker', 'Ryan Cooper', 'Amanda Lee', 'David Miller'];
          return names[Math.floor(Math.random() * names.length)];
        case 'supplier':
          const suppliers = ['TechSource Inc.', 'Global Electronics', 'Quality Parts Co.', 'Prime Supplies', 'Best Distributors'];
          return suppliers[Math.floor(Math.random() * suppliers.length)];
        case 'report':
          const reports = ['Monthly Sales', 'Inventory Status', 'Revenue Analysis', 'Product Performance', 'Supplier Evaluation'];
          return reports[Math.floor(Math.random() * reports.length)];
        case 'finance':
          return `Invoice #${Math.floor(Math.random() * 9000) + 1000}`;
        default:
          return '';
      }
    };
    
    // Generate activities
    const activities = Array.from({ length: 50 }, (_, i) => {
      const user = users[Math.floor(Math.random() * users.length)];
      const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const minutes = Math.floor(Math.random() * (60 * 24 * 7)); // Up to a week ago
      const timestamp = generatePastDateTime(minutes);
      const entityName = generateEntityName(activityType.entity);
      
      return {
        id: `ACT-${1000 + i}`,
        user: user.name,
        userRole: user.role,
        avatar: user.avatar,
        type: activityType.type,
        message: activityType.message,
        entity: activityType.entity,
        entityName,
        icon: activityType.icon,
        timestamp,
        relativeTime: formatRelativeTime(minutes)
      };
    });
    
    // Sort by timestamp (newest first)
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Apply limit
    const limitedActivities = activities.slice(0, limit);
    
    return res.json({
      activities: limitedActivities,
      counts: {
        product: activities.filter(a => a.entity === 'product').length,
        order: activities.filter(a => a.entity === 'order').length,
        inventory: activities.filter(a => a.entity === 'inventory').length,
        user: activities.filter(a => a.entity === 'user').length,
        other: activities.filter(a => !['product', 'order', 'inventory', 'user'].includes(a.entity)).length
      },
      total: activities.length
    });
  } catch (error) {
    console.error('Error generating activity data:', error);
    return res.status(500).json({ error: 'Failed to generate activity data' });
  }
});

export default router;