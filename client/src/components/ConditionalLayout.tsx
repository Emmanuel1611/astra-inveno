"use client";
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ConditionalLayoutProps {
  children: ReactNode;
  navbar?: ReactNode;
  sidebar?: ReactNode;
}

export default function ConditionalLayout({ 
  children, 
  navbar, 
  sidebar 
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  const publicRoutes = ['/', '/landing', '/login', '/signup'];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <div className="flex">
        {sidebar}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}