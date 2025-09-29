"use client";

import { useState } from "react";
import { BarChart3, Download, TrendingUp, Users, Package, ShoppingCart, AlertTriangle, Calendar } from "lucide-react";

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Business intelligence and insights</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$24,580</div>
              <div className="text-sm text-gray-600">Revenue Growth</div>
              <div className="text-xs text-green-600 font-medium">+12.5% vs last period</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">Active Customers</div>
              <div className="text-xs text-green-600 font-medium">+8.2% vs last period</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-sm text-gray-600">Product Lines</div>
              <div className="text-xs text-blue-600 font-medium">+3 new products</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">4.2x</div>
              <div className="text-sm text-gray-600">Inventory Turnover</div>
              <div className="text-xs text-orange-600 font-medium">+0.3x improvement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales & Revenue Trends</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-80 flex items-center justify-center text-gray-500">
            Interactive sales trend chart would go here
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { category: "Electronics", revenue: "$35,200", growth: 15.3 },
              { category: "Furniture", revenue: "$28,900", growth: -2.1 },
              { category: "Stationery", revenue: "$15,650", growth: 8.7 },
              { category: "Accessories", revenue: "$9,700", growth: 22.4 },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{item.category}</span>
                  <span className={`text-sm font-medium ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.growth >= 0 ? '+' : ''}{item.growth}%
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">{item.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Acquisition</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-600">New Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">Retention Rate</div>
              </div>
            </div>
            <div className="h-32 flex items-center justify-center text-gray-500">
              Customer acquisition chart
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Inventory Alerts</h3>
            <AlertTriangle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[
              { item: "Office Chair", status: "Low Stock", level: 8, color: "yellow" },
              { item: "Notebook", status: "Critical", level: 3, color: "red" },
              { item: "USB Cable", status: "Reorder", level: 15, color: "orange" },
              { item: "Headphones", status: "Good", level: 45, color: "green" },
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{alert.item}</div>
                  <div className="text-sm text-gray-600">{alert.level} units remaining</div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  alert.color === 'red' ? 'bg-red-100 text-red-700' :
                  alert.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  alert.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}