"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  FileText,
  BarChart3,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";

const ReportsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerClasses = isDark
    ? "bg-gray-900 text-gray-100"
    : "bg-white text-gray-900";

  const cardClasses = isDark
    ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
    : "bg-gray-100 text-gray-900 hover:bg-gray-200";

  // Report categories
  const categories = [
    {
      title: "Sales Reports",
      icon: <TrendingUp size={20} />,
      reports: [
        { name: "Sales by Customer", slug: "sales-by-customer" },
        { name: "Sales by Item", slug: "sales-by-item" },
        { name: "Aging Receivables", slug: "aging-receivables" },
      ],
    },
    {
      title: "Purchase Reports",
      icon: <ShoppingCart size={20} />,
      reports: [
        { name: "Purchases by Vendor", slug: "purchases-by-vendor" },
        { name: "Purchases by Item", slug: "purchases-by-item" },
        { name: "Payables Aging", slug: "payables-aging" },
      ],
    },
    {
      title: "Inventory Reports",
      icon: <Package size={20} />,
      reports: [
        { name: "Stock Summary", slug: "stock-summary" },
        { name: "Inventory Valuation", slug: "inventory-valuation" },
        { name: "Low Stock Items", slug: "low-stock-items" },
      ],
    },
    {
      title: "Financial Reports",
      icon: <FileText size={20} />,
      reports: [
        { name: "Profit & Loss", slug: "profit-loss" },
        { name: "Balance Sheet", slug: "balance-sheet" },
        { name: "Cash Flow", slug: "cash-flow" },
      ],
    },
  ];

  return (
    <div className={`p-8 min-h-screen ${containerClasses}`}>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <p className="opacity-70 mb-10">
        Access insights categorized into Sales, Purchases, Inventory, and Financial reports.
      </p>

      <div className="grid gap-10">
        {categories.map((cat, idx) => (
          <div key={idx}>
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-4">
              {cat.icon}
              <h2 className="text-xl font-semibold">{cat.title}</h2>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cat.reports.map((r, rIdx) => (
                <Link
                  key={rIdx}
                  href={`/reports/${r.slug}`}
                  className={`rounded-xl shadow p-6 transition ${cardClasses}`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 font-semibold">
                      <BarChart3 size={18} />
                      {r.name}
                    </div>
                    <p className="text-sm opacity-70">
                      View detailed {r.name.toLowerCase()}.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
