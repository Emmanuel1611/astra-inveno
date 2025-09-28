import { useState } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: any;
  read: boolean;
}

// Static mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "info",
    message: "New product added to inventory",
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: "2", 
    type: "warning",
    message: "Low stock alert for Product A",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
  },
  {
    id: "3",
    type: "success", 
    message: "Order completed successfully",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
  },
];

// Static hooks without API calls
export const useNotifications = () => {
  const [notifications] = useState(mockNotifications);
  
  return {
    data: notifications,
    isLoading: false,
    error: null,
  };
};

export const useMarkNotificationAsRead = () => {
  return {
    mutate: (id: string) => {
      console.log('Mark notification as read:', id);
      // Static - no actual API call
    },
    isLoading: false,
  };
};

export const useDeleteNotification = () => {
  return {
    mutate: (id: string) => {
      console.log('Delete notification:', id);
      // Static - no actual API call
    },
    isLoading: false,
  };
};