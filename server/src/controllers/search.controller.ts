import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const globalSearch = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { q, limit = 10, type } = req.query;
    const query = q as string;
    
    if (!query || query.length < 2) {
      return res.json({ results: [], totalFound: 0, query });
    }

    const searchLimit = Math.min(parseInt(limit as string), 50);
    const results: any[] = [];

    // Search Items
    if (!type || type === 'item') {
      const items = await prisma.item.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { sku: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          name: true,
          sku: true,
          description: true,
          sellingPrice: true,
          category: {
            select: { name: true }
          }
        },
        take: Math.floor(searchLimit / 4)
      });

      items.forEach((item: { id: any; name: string | null | undefined; sku: string | null | undefined; sellingPrice: any; category: { name: any; }; description: string | null | undefined; }) => {
        results.push({
          id: item.id,
          type: 'item',
          title: item.name,
          subtitle: `SKU: ${item.sku} • $${item.sellingPrice}`,
          url: `/inventory/items/${item.id}`,
          category: item.category?.name || 'Uncategorized',
          relevanceScore: calculateRelevanceScore(query, [item.name, item.sku, item.description])
        });
      });
    }

    // Search Customers
    if (!type || type === 'customer') {
      const customers = await prisma.customer.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        },
        take: Math.floor(searchLimit / 4)
      });

      customers.forEach((customer: { id: any; name: string | null | undefined; email: string | null | undefined; phone: any; }) => {
        results.push({
          id: customer.id,
          type: 'customer',
          title: customer.name,
          subtitle: customer.email || customer.phone || '',
          url: `/customers/${customer.id}`,
          relevanceScore: calculateRelevanceScore(query, [customer.name, customer.email])
        });
      });
    }

    // Search Orders
    if (!type || type === 'order') {
      const orders = await prisma.salesOrder.findMany({
        where: {
          OR: [
            { orderNumber: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          orderNumber: true,
          totalAmount: true,
          status: true,
          customer: {
            select: { name: true }
          }
        },
        take: Math.floor(searchLimit / 4)
      });

      orders.forEach((order: { id: any; orderNumber: string | null | undefined; customer: { name: any; }; totalAmount: any; status: any; }) => {
        results.push({
          id: order.id,
          type: 'order',
          title: `Order ${order.orderNumber}`,
          subtitle: `${order.customer?.name || 'Unknown'} • $${order.totalAmount} • ${order.status}`,
          url: `/sales/orders/${order.id}`,
          relevanceScore: calculateRelevanceScore(query, [order.orderNumber])
        });
      });
    }

    // Sort by relevance score
    const sortedResults = results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, parseInt(limit as string));

    res.json({ 
      results: sortedResults,
      totalFound: results.length,
      query 
    });
  } catch (error) {
    console.error('Global search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

// Helper function to calculate relevance score
function calculateRelevanceScore(query: string, fields: (string | null | undefined)[]): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  fields.forEach(field => {
    if (!field) return;
    
    const lowerField = field.toLowerCase();
    
    // Exact match gets highest score
    if (lowerField === lowerQuery) {
      score += 100;
    }
    // Starts with query gets high score
    else if (lowerField.startsWith(lowerQuery)) {
      score += 50;
    }
    // Contains query gets medium score
    else if (lowerField.includes(lowerQuery)) {
      score += 25;
    }
  });

  return score;
}