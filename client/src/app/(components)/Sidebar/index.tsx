"use client";

import { useAppSelector } from "@/app/redux";
import {
  Layout,
  BarChart2,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Package,
  Truck,
  Boxes,
  Plug,
  FileText,
  Inbox,
  Search,
  Settings,
  Users,
  TrendingUp,
  AlertTriangle,
  Archive,
  Tag,
  Warehouse,
  Plus,
  RotateCcw,
  UserCheck,
  Receipt,
  DollarSign,
  MapPin,
  PieChart,
  FileBarChart,
  Calendar,
  Database,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SidebarLink = ({ href, icon: Icon, label, isCollapsed, badge }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center py-3" : "justify-between px-4 py-3"
        } gap-3 rounded-md transition duration-300 hover:scale-105
        ${
          isActive
            ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          {!isCollapsed && (
            <span className="text-sm font-medium">{label}</span>
          )}
        </div>
        {!isCollapsed && badge && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
};

const DropdownSection = ({ title, icon: Icon, children, isCollapsed, isOpen, onToggle }: any) => {
  if (isCollapsed) {
    return (
      <div className="space-y-1">
        {children}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition duration-300 ${
          isOpen 
            ? "bg-red-500/20 text-white border border-red-500/30" 
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      
      {isOpen && (
        <div className="ml-6 space-y-1 border-l border-white/10 pl-4">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const isSidebarCollapsed = useAppSelector(
    (state: any) => state.global?.isSidebarCollapsed ?? false
  );

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const sidebarWidth = isSidebarCollapsed ? 70 : 240;

  return (
    <div
      className={`fixed flex flex-col ${
        isSidebarCollapsed ? "w-16" : "w-60"
      } bg-black/90 backdrop-blur-xl border-r border-white/10 text-white transition-all duration-300 h-full shadow-lg z-40 overflow-hidden`}
      style={{ width: sidebarWidth }}
    >
      {/* Enhanced Logo Section */}
      <div
        className={`flex gap-4 items-center pt-8 pb-6 ${
          isSidebarCollapsed ? "justify-center" : "px-6"
        } border-b border-white/10`}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl shadow-red-500/25 ring-1 ring-red-400/20">
            <Warehouse className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
        </div>
        {!isSidebarCollapsed && (
          <div>
            <h1 className="font-bold text-2xl text-white tracking-tight">IMS</h1>
            <p className="text-xs text-gray-400 font-medium">Inventory Management Sys</p>
          </div>
        )}
      </div>

      {/* Search */}
      {!isSidebarCollapsed && (
        <div className="px-4 mt-2">
          <div className="flex items-center bg-white/5 rounded-lg px-3 py-2 text-gray-400 border border-white/10">
            <Search className="w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-500 w-full"
            />
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-white/10 mt-4" />

      {/* Scrollable Content with Professional Scrollbar */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `}</style>

        {/* Main Links */}
        <div className="mt-6 space-y-2 px-2">
          <SidebarLink 
            href="/dashboard" 
            icon={Layout} 
            label="Dashboard" 
            isCollapsed={isSidebarCollapsed} 
          />
          
          {/* Inventory Dropdown */}
          <DropdownSection 
            title="Inventory" 
            icon={Package} 
            isCollapsed={isSidebarCollapsed}
            isOpen={openDropdown === 'inventory'}
            onToggle={() => handleDropdownToggle('inventory')}
          >
            <SidebarLink href="/inventory/items" icon={Archive} label="All Items" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/inventory/add" icon={Plus} label="Add Item" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/inventory/categories" icon={Tag} label="Categories" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/inventory/low-stock" icon={AlertTriangle} label="Low Stock" isCollapsed={isSidebarCollapsed} badge="3" />
            <SidebarLink href="/inventory/adjustments" icon={RotateCcw} label="Stock Adjustments" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/inventory/locations" icon={MapPin} label="Locations" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/inventory/transfers" icon={Boxes} label="Transfers" isCollapsed={isSidebarCollapsed} />
          </DropdownSection>

          {/* Sales Dropdown */}
          <DropdownSection 
            title="Sales" 
            icon={ShoppingCart} 
            isCollapsed={isSidebarCollapsed}
            isOpen={openDropdown === 'sales'}
            onToggle={() => handleDropdownToggle('sales')}
          >
            <SidebarLink href="/sales/all" icon={TrendingUp} label="All Sales" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/sales/orders" icon={ShoppingCart} label="Orders" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/sales/customers" icon={Users} label="Customers" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/sales/invoices" icon={Receipt} label="Invoices" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/sales/quotes" icon={FileText} label="Quotes" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/sales/returns" icon={RotateCcw} label="Returns" isCollapsed={isSidebarCollapsed} />
          </DropdownSection>

          {/* Procurement Dropdown */}
          <DropdownSection 
            title="Procurement" 
            icon={Truck} 
            isCollapsed={isSidebarCollapsed}
            isOpen={openDropdown === 'purchases'}
            onToggle={() => handleDropdownToggle('purchases')}
          >
            <SidebarLink href="/purchases" icon={Truck} label="All Purchases" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/purchases/orders" icon={Plus} label="Purchase Orders" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/purchases/suppliers" icon={UserCheck} label="Suppliers" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/purchases/receiving" icon={Package} label="Receiving" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/purchases/bills" icon={Receipt} label="Bills" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/purchases/payments" icon={DollarSign} label="Payments" isCollapsed={isSidebarCollapsed} />
          </DropdownSection>
          
          {/* Analytics & Reports Dropdown */}
          <DropdownSection 
            title="Analytics & Reports" 
            icon={BarChart2} 
            isCollapsed={isSidebarCollapsed}
            isOpen={openDropdown === 'reports'}
            onToggle={() => handleDropdownToggle('reports')}
          >
            <SidebarLink href="/reports/sales" icon={TrendingUp} label="Sales Reports" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/reports/inventory" icon={Package} label="Inventory Reports" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/reports/financial" icon={DollarSign} label="Financial Reports" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/analytics/dashboard" icon={PieChart} label="Analytics" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/analytics/profit-loss" icon={FileBarChart} label="Profit & Loss" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/analytics/monthly" icon={Calendar} label="Monthly Reports" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/analytics/custom" icon={Database} label="Custom Reports" isCollapsed={isSidebarCollapsed} />
          </DropdownSection>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-4" />

        {/* Other Section */}
        <div className="space-y-2 px-2 pb-4">
          {!isSidebarCollapsed && (
            <p className="px-2 text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">System</p>
          )}
          <SidebarLink href="/documentation" icon={FileText} label="Documentation" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/inbox" icon={Inbox} label="Inbox" isCollapsed={isSidebarCollapsed} badge="5" />
          <SidebarLink href="/integrations" icon={Plug} label="Integrations" isCollapsed={isSidebarCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
