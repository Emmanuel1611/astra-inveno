"use client";

import React, { useState, useEffect } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA();
  const [showIndicator, setShowIndicator] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setHasBeenOffline(true);
      setShowIndicator(true);
    } else if (hasBeenOffline) {
      // Show "back online" message briefly
      setShowIndicator(true);
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, hasBeenOffline]);

  if (!showIndicator) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm transform transition-all duration-300 ${
      showIndicator ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`rounded-lg p-4 shadow-lg border flex items-center gap-3 ${
        isOnline 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-orange-50 border-orange-200 text-orange-800'
      }`}>
        <div className="flex-shrink-0">
          {isOnline ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            {isOnline ? 'Back Online' : 'You\'re Offline'}
          </p>
          <p className="text-xs opacity-75 mt-0.5">
            {isOnline 
              ? 'All features are now available' 
              : 'Limited features available. Changes will sync when back online.'
            }
          </p>
        </div>

        <div className="flex-shrink-0">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-600" />
          ) : (
            <WifiOff className="w-4 h-4 text-orange-600" />
          )}
        </div>
      </div>
    </div>
  );
};

// Network status hook
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Get connection info if available
    const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
    
    if (connection) {
      setConnectionType(connection.effectiveType || 'unknown');
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    const handleConnectionChange = () => {
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return {
    isOnline,
    connectionType,
    isSlowConnection: connectionType === 'slow-2g' || connectionType === '2g'
  };
};
