"use client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Layout,
  Menu,
  BarChart2,
  ChevronDown,
  ChevronRight,
  Clock,
  AlertTriangle,
  ShoppingCart,
  Package,
  Truck,
  Boxes,
  Crown,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SidebarLinkProps {
  href: string;
  icon: any;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
          }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""
          }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
    } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  //  Subscription State 
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [planName, setPlanName] = useState("Professional");

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const res = await fetch("/api/subscription");
        const data = await res.json();

        const expiryDate = new Date(data.expiryDate);
        const today = new Date();

        const diffTime = expiryDate.getTime() - today.getTime();
        const days = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

        setDaysLeft(days);
        if (data.planName) setPlanName(data.planName);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, []);

  // --- Dropdown States ---
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setIsInventoryOpen(menu === "inventory" ? !isInventoryOpen : false);
    setIsSalesOpen(menu === "sales" ? !isSalesOpen : false);
    setIsPurchasesOpen(menu === "purchases" ? !isPurchasesOpen : false);
    setIsReportsOpen(menu === "reports" ? !isReportsOpen : false);
  };

  const handleSubscriptionClick = () => {
    // Track the click event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'subscription_button_clicked', {
        event_category: 'subscription',
        event_label: daysLeft && daysLeft > 0 ? 'renewal' : 'new_subscription'
      });
    }
    
    // Open subscription page
    window.open('https://payment-gateway-link.com', '_blank', 'noopener,noreferrer');
  };

  const getSubscriptionStatus = () => {
    if (loading) return { color: 'gray', text: 'Checking...', urgent: false };
    if (!daysLeft || daysLeft === 0) return { color: 'red', text: 'Expired', urgent: true };
    if (daysLeft <= 7) return { color: 'orange', text: `${daysLeft} days left`, urgent: true };
    if (daysLeft <= 30) return { color: 'yellow', text: `${daysLeft} days left`, urgent: false };
    return { color: 'green', text: `${daysLeft} days left`, urgent: false };
  };

  const status = getSubscriptionStatus();

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"
          }`}
      >
        <Image
          src="/2.png"
          alt="Astra-logo"
          width={27}
          height={27}
          className="rounded w-8"
        />
        <h1
          className={`${isSidebarCollapsed ? "hidden" : "block"
            } font-extrabold text-2xl`}
        >
          ASTRA
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8 text-base py-2">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />

        {/* Inventory Dropdown */}
        <div>
          <button
            onClick={() => toggleDropdown("inventory")}
            className={`w-full flex items-center ${isSidebarCollapsed
                ? "justify-center py-4"
                : "justify-between px-8 py-4"
              } hover:bg-blue-100 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 !text-gray-700" />
              <span
                className={`${isSidebarCollapsed ? "hidden" : "block"
                  } font-medium text-gray-700 text-base py-2`}
              >
                Inventory
              </span>
            </div>
            {!isSidebarCollapsed &&
              (isInventoryOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ))}
          </button>
          {isInventoryOpen && !isSidebarCollapsed && (
            <div className="ml-14 flex flex-col gap-2 text-base py-2">
              <Link
                href="/inventory/items"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Items
              </Link>
              <Link
                href="/inventory/pricelists"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Price Lists
              </Link>
              <Link
                href="/inventory/adjustments"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Stock Adjustments
              </Link>
              <Link
                href="/inventory/warehouses"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Warehouses
              </Link>
            </div>
          )}
        </div>

        {/* Sales Dropdown */}
        <div>
          <button
            onClick={() => toggleDropdown("sales")}
            className={`w-full flex items-center ${isSidebarCollapsed
                ? "justify-center py-4"
                : "justify-between px-8 py-4"
              } hover:bg-blue-100 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 !text-gray-700" />
              <span
                className={`${isSidebarCollapsed ? "hidden" : "block"
                  } font-medium text-gray-700 text-base py-2`}
              >
                Sales
              </span>
            </div>
            {!isSidebarCollapsed &&
              (isSalesOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ))}
          </button>
          {isSalesOpen && !isSidebarCollapsed && (
            <div className="ml-14 flex flex-col gap-2 text-base py-2">
              <Link
                href="/sales/orders"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Sales Orders
              </Link>
              <Link
                href="/sales/invoices"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Invoices
              </Link>
              <Link
                href="/sales/payments"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Payments Received
              </Link>
            </div>
          )}
        </div>

        {/* Purchases Dropdown */}
        <div>
          <button
            onClick={() => toggleDropdown("purchases")}
            className={`w-full flex items-center ${isSidebarCollapsed
                ? "justify-center py-4"
                : "justify-between px-8 py-4"
              } hover:bg-blue-100 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 !text-gray-700" />
              <span
                className={`${isSidebarCollapsed ? "hidden" : "block"
                  } font-medium text-gray-700 text-base py-2`}
              >
                Purchases
              </span>
            </div>
            {!isSidebarCollapsed &&
              (isPurchasesOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ))}
          </button>
          {isPurchasesOpen && !isSidebarCollapsed && (
            <div className="ml-14 flex flex-col gap-2 text-base py-2">
              <Link
                href="/purchases/orders"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Purchase Orders
              </Link>
              <Link
                href="/purchases/received"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Purchase Received
              </Link>
              <Link
                href="/purchases/made"
                className="font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              >
                Purchases Made
              </Link>
            </div>
          )}
        </div>

        {/* Stock Management  */}
        <SidebarLink
          href="/stock-management"
          icon={Boxes}
          label="Stock Management"
          isCollapsed={isSidebarCollapsed}
        />

        {/* Reports */}
        <div>
          <Link href="/reports">
            <div className={`w-full flex items-center ${isSidebarCollapsed
                ? "justify-center py-4"
                : "justify-between px-8 py-4"
              } hover:bg-blue-100 transition-colors`}
            >
              <div className="flex items-center gap-3">
                <BarChart2 className="w-6 h-6 !text-gray-700" />
                <span className={`${isSidebarCollapsed ? "hidden" : "block"
                  } font-medium text-gray-700 text-base py-2`}>
                  Reports
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* FOOTER -Subscription Card */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-4 mx-3`}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-sm">
          {/* Plan Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-800">{planName}</span>
            </div>
            {status.urgent && (
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                status.color === 'red' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {status.color === 'red' ? 'EXPIRED' : 'URGENT'}
              </div>
            )}
          </div>

          {/* Status */}
          {loading ? (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">Checking subscription...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              {status.color === 'red' ? (
                <AlertTriangle className="w-4 h-4 text-red-600" />
              ) : (
                <Clock className={`w-4 h-4 ${
                  status.color === 'orange' ? 'text-orange-600' : 
                  status.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                }`} />
              )}
              <span className={`text-sm font-medium ${
                status.color === 'red' ? 'text-red-700' : 
                status.color === 'orange' ? 'text-orange-700' : 
                status.color === 'yellow' ? 'text-yellow-700' : 'text-green-700'
              }`}>
                {status.text}
              </span>
            </div>
          )}

          {/* Subscription Button */}
          <button
            onClick={handleSubscriptionClick}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm ${
              status.color === 'red'
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
                : status.urgent
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
            }`}
            disabled={loading}
          >
            <span>
              {loading 
                ? 'Loading...' 
                : (daysLeft && daysLeft > 0) 
                  ? 'Renew Subscription' 
                  : 'Subscribe Now'
              }
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Additional Info */}
          {!loading && (
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                {status.color === 'red' 
                  ? 'Renew now to avoid service interruption'
                  : status.urgent
                  ? 'Renew soon to avoid interruption'
                  : 'Manage your subscription'
                }
              </p>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="text-xs text-gray-400">&copy; 2025 Astra</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;