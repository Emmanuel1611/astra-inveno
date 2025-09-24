import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Updated with proper error handling and TypeScript casting for properties
export const me = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        organization: true // Use simpler include for better TypeScript support
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Return only the fields we need in a properly typed response
    return res.json({ 
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar || null,
        organization: user.organization 
          ? {
              id: user.organization.id,
              name: user.organization.name,
              logo: user.organization.logo || null, // Handle nullable logo
              slug: user.organization.slug || null  // Handle possibly undefined slug
            } 
          : null
      }
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        organization: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update last login time
    await prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });

    res.json({ 
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar || null,
        lastLoginAt: user.lastLoginAt,
        organization: user.organization 
          ? {
              id: user.organization.id,
              name: user.organization.name,
              logo: user.organization.logo || null,
              slug: user.organization.slug || null,
            } 
          : null
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // If you need to do any cleanup like invalidating tokens in a blacklist
    // or updating user logout time, add that logic here
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
};

export const register = async (_req: Request, _res: Response): Promise<void> => { /* ... */ };
export const login = async (_req: Request, _res: Response): Promise<void> => { /* ... */ };