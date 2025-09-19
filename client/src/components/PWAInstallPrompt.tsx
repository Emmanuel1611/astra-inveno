"use client";

import React, { useState, useEffect } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { X, Download, Smartphone } from 'lucide-react';

interface PWAInstallPromptProps {
  onClose?: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onClose }) => {
  const { isInstallable, isInstalled, installPWA } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Show prompt after 30 seconds if app is installable and not installed
    const timer = setTimeout(() => {
      if (isInstallable && !isInstalled && !localStorage.getItem('pwa-prompt-dismissed')) {
        setShowPrompt(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled]);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installPWA();
      if (success) {
        setShowPrompt(false);
        onClose?.();
      }
    } catch (error) {
      console.error('Install failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-prompt-dismissed', 'true');
    setShowPrompt(false);
    onClose?.();
  };

  if (!showPrompt || !isInstallable || isInstalled) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Install Astra Inventory
              </h3>
              <p className="text-sm text-gray-600">
                Get the native app experience
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>Works offline with cached data</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>Faster loading and better performance</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>Add to home screen like a native app</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>Push notifications for important updates</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDismiss}
            className="flex-1 py-2.5 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Not now
          </button>
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isInstalling ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Installing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Install App
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Hook to manually trigger the install prompt
export const useInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  const showInstallPrompt = () => setShowPrompt(true);
  const hideInstallPrompt = () => setShowPrompt(false);

  return {
    showPrompt,
    showInstallPrompt,
    hideInstallPrompt,
    InstallPrompt: () => (
      <PWAInstallPrompt 
        onClose={hideInstallPrompt}
      />
    )
  };
};
