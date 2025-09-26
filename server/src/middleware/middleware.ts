import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token || req.headers.authorization?.replace('Bearer ', '');

  if (req.path.startsWith("/dashboard") || req.path.startsWith("/api/dashboard")) {
    if (!token) {
      return res.status(401).json({ 
        error: 'Authentication required',
        redirect: '/login' 
      });
    }
    // Later: verify subscription/org/role via API
  }

  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Authentication required',
      redirect: '/login' 
    });
  }
  
  // Later: verify token validity here
  next();
}