import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error);

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      res.status(400).json({
        error: 'Unique constraint violation',
        field: error.meta?.target
      });
      return;
    }
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Record not found' });
      return;
    }
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    res.status(400).json({
      error: 'Validation failed',
      details: error.details
    });
    return;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  // Default error
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message
  });
};