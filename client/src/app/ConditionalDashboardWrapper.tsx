"use client";

import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const ConditionalDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSidebarCollapsed = useAppSelector(
    (state: any) => state.global?.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state: any) => state.global?.isDarkMode);

  // Routes where you want to show just the content without dashboard components
  const publicRoutes = [
    '/', 
    '/landing', 
    '/login', 
    '/signup', 
    '/register',
    '/features',
    '/pricing',
    '/testimonials',  
    '/faq',
    '/contact',
    '/about',
    '/help',
    '/demo'
  ];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  // For public routes, just return children without dashboard layout
  if (isPublicRoute) {
    return (
      <div className={`${isDarkMode ? "dark" : "light"} w-full min-h-screen`}>
        {children}
      </div>
    );
  }

  // For authenticated routes, use full dashboard layout
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const ConditionalDashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ConditionalDashboardLayout>{children}</ConditionalDashboardLayout>
    </StoreProvider>
  );
};

export default ConditionalDashboardWrapper;