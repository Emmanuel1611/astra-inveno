import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from "./user.routes";
// Import other route files
import dashboardRoutes from './dashboard';

const router = express.Router();

// Register routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// Register other routes

// Register dashboard routes
router.use('/dashboard', dashboardRoutes);

export default router;