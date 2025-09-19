"use client";

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

  // --- Subscription State ---
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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

        {/* Inventory */}
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

        {/* Sales */}
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

        {/* Purchases */}
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

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mt-auto px-3 pb-4`}>
        {/* Subscription Card */}
        <div className="rounded-md border border-gray-200 bg-white shadow-sm p-3">
          {loading ? (
            <p className="text-xs text-gray-400 animate-pulse">Checking subscription...</p>
          ) : (
            <>
              {/* Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {daysLeft === 0 ? (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {daysLeft && daysLeft > 0
                      ? `${daysLeft} days left`
                      : "Expired"}
                  </span>
                </div>
                <a
                  href="https://payment-gateway-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm transition 
              ${daysLeft && daysLeft > 0
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"}`}
                >
                  {daysLeft && daysLeft > 0 ? "Renew" : "Subscribe"}
                </a>
              </div>

              {/* Progress Bar */}
              {daysLeft !== null && daysLeft > 0 && (
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-1.5 bg-blue-500 transition-all duration-500"
                    style={{ width: `${Math.min((daysLeft / 30) * 100, 100)}%` }} // adjust denominator if not 30 days
                  ></div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Copyright */}
        <p className="mt-3 text-[10px] text-gray-400 text-center">&copy; 2025 Astra</p>
      </div>

    </div>
  );
};

export default Sidebar;
