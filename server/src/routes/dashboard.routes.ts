import express from 'express';
import {
  getDashboardTrends,
  getDashboardCategories,
  getDashboardChannels,
  getTopProducts,
  getLowStock,
  getReceivables,
  getActivity,
  getCustomerMetrics,
  getFulfillmentMetrics
} from '../controllers/dashboard.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Apply auth middleware to all dashboard routes
router.use(authMiddleware);

// Dashboard data endpoints
router.get('/trends', getDashboardTrends);
router.get('/categories', getDashboardCategories);
router.get('/channels', getDashboardChannels);
router.get('/top-products', getTopProducts);
router.get('/low-stock', getLowStock);
router.get('/receivables', getReceivables);
router.get('/activity', getActivity);
router.get('/customer-metrics', getCustomerMetrics);
router.get('/fulfillment-metrics', getFulfillmentMetrics);

export default router;