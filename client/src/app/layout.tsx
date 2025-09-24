import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import DashboardWrapper from "./dashboardWrapper";
import QueryProvider from "./providers/QueryProvider";
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astra Inventory Management System",
  description: "A complete inventory management solution",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <DashboardWrapper>{children}</DashboardWrapper>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
