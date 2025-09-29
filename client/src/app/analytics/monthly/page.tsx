"use client";

import React, { useState } from "react";
import { Calendar, Download, TrendingUp, BarChart3, DollarSign, Package } from "lucide-react";

export default function MonthlyAnalytics() {
  const [selectedMonth, setSelectedMonth] = useState("2024-03");

  const monthlyData = {
    revenue: 52400,
    expenses: 31200,
    profit: 21200,
    orders: 156,
    customers: 89,
    inventory: 1247,
  };

  const weeklyBreakdown = [
    { week: "Week 1", revenue: 12800, orders: 38, customers: 22 },
    { week: "Week 2", revenue: 14200, orders: 42, customers: 25 },
    { week: "Week 3", revenue: 13600, orders: 39, customers: 21 },
    { week: "Week 4", revenue: 11800, orders: 37, customers: 21 },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 45, revenue: 2250, growth: 12.5 },
    { name: "Office Chair", sales: 23, revenue: 1890, growth: -2.3 },
    { name: "USB Cable", sales: 89, revenue: 1230, growth: 25.8 },
    { name: "Notebook", sales: 67, revenue: 890, growth: 8.9 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Monthly Analytics</h1>
            <p className="text-gray-600">Detailed monthly performance</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">${monthlyData.revenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
              <div className="text-xs text-green-600 font-medium">+15.3% vs last month</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">${monthlyData.profit.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Net Profit</div>
              <div className="text-xs text-blue-600 font-medium">+22.7% vs last month</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{monthlyData.orders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
              <div className="text-xs text-purple-600 font-medium">+8.2% vs last month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {weeklyBreakdown.map((week, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{week.week}</span>
                  <span className="text-lg font-bold text-gray-900">${week.revenue.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>{week.orders} orders</div>
                  <div>{week.customers} customers</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Products This Month</h3>
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.sales} units sold</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">${product.revenue}</div>
                  <div className={`text-sm font-medium ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth >= 0 ? '+' : ''}{product.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Monthly trends chart would go here (Revenue, Orders, Customers over time)
        </div>
      </div>
    </div>
  );
}