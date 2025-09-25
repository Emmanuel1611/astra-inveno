import express from 'express';
import trendsRouter from './trends/route';
import fulfillmentMetricsRouter from './fulfillment-metrics/route';
import categoriesRouter from './categories/route';
import channelsRouter from './channels/route';
import topProductsRouter from './top-products/route';
import lowStockRouter from './low-stock/route';
import receivablesRouter from './receivables/route';
import activityRouter from './activity/route';
import customerMetricsRouter from './customer-metrics/route';

const router = express.Router();

// Register all dashboard routes
router.use('/trends', trendsRouter);
router.use('/fulfillment-metrics', fulfillmentMetricsRouter);
router.use('/categories', categoriesRouter);
router.use('/channels', channelsRouter);
router.use('/top-products', topProductsRouter);
router.use('/low-stock', lowStockRouter);
router.use('/receivables', receivablesRouter);
router.use('/activity', activityRouter);
router.use('/customer-metrics', customerMetricsRouter);

export default router;