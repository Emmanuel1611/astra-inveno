export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
  organizationId: string | null;
  organization?: Organization | null;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string | null;
  slug?: string | null;
  users?: User[];
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}