import { useState, useEffect } from 'react';

export interface UserData {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  role?: string;
  organization?: {
    name: string;
    id: string;
  };
}

// Static mock user data
const mockUserData: UserData = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatar: '/default-avatar.png',
  role: 'Admin',
  organization: {
    name: 'Demo Company',
    id: 'org-1'
  }
};

export const useUser = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const timeoutId = setTimeout(() => {
      // Check if user is logged in (static check)
      const authToken = localStorage.getItem('authToken');
      
      if (authToken) {
        setUserData(mockUserData);
      } else {
        setUserData(null);
      }
      
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const updateUser = (updates: Partial<UserData>) => {
    if (userData) {
      setUserData({ ...userData, ...updates });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUserData(null);
  };

  return {
    userData,
    isLoading,
    updateUser,
    logout,
  };
};
