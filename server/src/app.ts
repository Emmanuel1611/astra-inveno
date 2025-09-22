// server/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import routes from the correct paths
import authRoutes from './routes/auth.routes';
import itemsRoutes from './routes/items.routes';
import warehouseRoutes from './routes/warehouse.routes';
import inventoryRoutes from './routes/inventory.routes';
import searchRoutes from './routes/search.routes';
import notificationsRoutes from './routes/notifications.routes';
import syncRoutes from './routes/sync.routes';

import { errorMiddleware } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// API Routes
const API_PREFIX = '/api/v1';
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/items`, itemsRoutes);
app.use(`${API_PREFIX}/warehouses`, warehouseRoutes);
app.use(`${API_PREFIX}/inventory`, inventoryRoutes);
app.use(`${API_PREFIX}/search`, searchRoutes);
app.use(`${API_PREFIX}/notifications`, notificationsRoutes);
app.use(`${API_PREFIX}/sync`, syncRoutes);

// Error handling
app.use(errorMiddleware);

export default app;