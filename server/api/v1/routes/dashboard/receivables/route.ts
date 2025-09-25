import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

// Helper to format dates
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Helper to generate a future date
const generateFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

// Helper to generate a past date
const generatePastDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
};

router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string || '10');
    
    // Generate company names
    const companyNames = [
      'Acme Corporation', 'Tech Innovators', 'Global Retail', 'Prime Distributors', 
      'EcoSolutions', 'Modern Enterprises', 'Elite Services', 'Pinnacle Group',
      'Nexus Ventures', 'Omega Industries', 'Delta Partners', 'Horizon Traders'
    ];
    
    // Generate receivable invoices
    const invoices = Array.from({ length: 20 }, (_, i) => {
      const company = companyNames[Math.floor(Math.random() * companyNames.length)];
      const amount = Math.floor(Math.random() * 10000) + 1000;
      const dueDays = [5, 10, 15, 30, 45, 60][Math.floor(Math.random() * 6)];
      const invoiceDate = generatePastDate(Math.floor(Math.random() * 60) + 5);
      const dueDate = generateFutureDate(Math.floor(Math.random() * 45) - 15);
      const today = new Date();
      const due = new Date(dueDate);
      const daysDiff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      let status;
      if (daysDiff < 0) {
        status = 'overdue';
      } else if (daysDiff <= 7) {
        status = 'due-soon';
      } else {
        status = 'upcoming';
      }
      
      return {
        id: `INV-${10000 + i}`,
        customer: company,
        amount,
        invoiceDate,
        dueDate,
        status,
        daysToDue: daysDiff,
        paymentTerms: `Net ${dueDays}`
      };
    });
    
    // Sort by due date (ascending)
    invoices.sort((a, b) => a.daysToDue - b.daysToDue);
    
    // Apply limit
    const limitedInvoices = invoices.slice(0, limit);
    
    // Calculate statistics
    const totalReceivables = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);
    const dueSoonAmount = invoices.filter(inv => inv.status === 'due-soon').reduce((sum, inv) => sum + inv.amount, 0);
    
    return res.json({
      invoices: limitedInvoices,
      stats: {
        totalReceivables,
        overdueAmount,
        dueSoonAmount,
        overdueCount: invoices.filter(inv => inv.status === 'overdue').length,
        dueSoonCount: invoices.filter(inv => inv.status === 'due-soon').length,
        overduePercent: parseFloat((overdueAmount / totalReceivables * 100).toFixed(1)),
        dueSoonPercent: parseFloat((dueSoonAmount / totalReceivables * 100).toFixed(1))
      }
    });
  } catch (error) {
    console.error('Error generating receivables data:', error);
    return res.status(500).json({ error: 'Failed to generate receivables data' });
  }
});

export default router;