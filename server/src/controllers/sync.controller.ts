import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const getSyncStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Get pending sync count
    const pendingSync = await prisma.syncLog.count({
      where: {
        syncStatus: 'PENDING'
      }
    });

    // Get last successful sync
    const lastSync = await prisma.syncLog.findFirst({
      where: {
        syncStatus: 'SUCCESS'
      },
      orderBy: {
        processedAt: 'desc'
      }
    });

    // Check if any sync is currently in progress
    const syncInProgress = await prisma.syncLog.count({
      where: {
        syncStatus: 'PENDING',
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
        }
      }
    }) > 0;

    res.json({
      isOnline: true, // This would be determined by your sync service
      lastSync: lastSync?.processedAt || null,
      pendingSync,
      syncInProgress
    });
  } catch (error) {
    console.error('Get sync status error:', error);
    res.status(500).json({ error: 'Failed to get sync status' });
  }
};