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
          } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""
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
    (state: any) => state.global?.isSidebarCollapsed ?? false
  );

  const sidebarWidth = isSidebarCollapsed ? 60 : 240;

  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-16" : "w-60"
    } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  // Static subscription state - no API call
  const [daysLeft] = useState(15); // Mock 15 days left
  const [loading] = useState(false);

  // Dropdown states
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setIsInventoryOpen(menu === "inventory" ? !isInventoryOpen : false);
    setIsSalesOpen(menu === "sales" ? !isSalesOpen : false);
    setIsPurchasesOpen(menu === "purchases" ? !isPurchasesOpen : false);
  };

  return (
    <div className={sidebarClassNames} style={{ width: sidebarWidth }}>
      {/* Logo */}
      <div
        className={`flex gap-3 items-center pt-8 ${isSidebarCollapsed ? "justify-center" : "px-8"
          }`}
      >
        <Image
          src="/2.png"
          alt="Astra-logo"
          width={32}
          height={32}
          className="rounded w-8"
        />
        {!isSidebarCollapsed && (
          <h1 className="font-extrabold text-2xl">ASTRA</h1>
        )}
      </div>

      {/* Links */}
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
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center py-4" : "justify-between px-8 py-4"
              } hover:bg-blue-100 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 !text-gray-700" />
              {!isSidebarCollapsed && (
                <span className="font-medium text-gray-700">Inventory</span>
              )}
            </div>
            {!isSidebarCollapsed &&
              (isInventoryOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ))}
          </button>
          {isInventoryOpen && !isSidebarCollapsed && (
            <div className="ml-14 flex flex-col gap-2 py-2">
              <Link href="/inventory/items" className="hover:text-blue-600">Items</Link>
              <Link href="/inventory/pricelists" className="hover:text-blue-600">Price Lists</Link>
              <Link href="/inventory/adjustments" className="hover:text-blue-600">Stock Adjustments</Link>
              <Link href="/inventory/warehouses" className="hover:text-blue-600">Warehouses</Link>
            </div>
          )}
        </div>

        {/* Sales */}
        <div>
          <button
            onClick={() => toggleDropdown("sales")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center py-4" : "justify-between px-8 py-4"
              } hover:bg-blue-100 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 !text-gray-700" />
              {!isSidebarCollapsed && (
                <span className="font-medium text-gray-700">Sales</span>
              )}
            </div>
            {!isSidebarCollapsed &&
              (isSalesOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ))}
          </button>
          {isSalesOpen && !isSidebarCollapsed && (
            <div className="ml-14 flex flex-col gap-2 py-2">
              <Link href="/sales/orders" className="hover:text-blue-600">Sales Orders</Link>
              <Link href="/sales/invoices" className="hover:text-blue-600">Invoices</Link>
              <Link href="/sales/payments" className="hover:text-blue-600">Payments Received</Link>
            </div>
          )}
        </div>

        {/* Purchases */}
        <div>
          <button
            onClick={() => toggleDropdown("purchases")}
            className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center py-4" : "justify-between px-8 py-4"
              } hover:bg-blue-100 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 !text-gray-700" />
              {!isSidebarCollapsed && (
                <span className="font-medium text-gray-700">Purchases</span>
              )}
            </div>
            {!isSidebarCollapsed &&
              (isPurchasesOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ))}
          </button>
          {isPurchasesOpen && !isSidebarCollapsed && (
            <div className="ml-14 flex flex-col gap-2 py-2">
              <Link href="/purchases/orders" className="hover:text-blue-600">Purchase Orders</Link>
              <Link href="/purchases/received" className="hover:text-blue-600">Purchase Received</Link>
              <Link href="/purchases/made" className="hover:text-blue-600">Purchases Made</Link>
            </div>
          )}
        </div>

        <SidebarLink
          href="/stock-management"
          icon={Boxes}
          label="Stock Management"
          isCollapsed={isSidebarCollapsed}
        />

        <SidebarLink
          href="/reports"
          icon={BarChart2}
          label="Reports"
          isCollapsed={isSidebarCollapsed}
        />
      </div>
    </div>
  );
};

export default Sidebar;
