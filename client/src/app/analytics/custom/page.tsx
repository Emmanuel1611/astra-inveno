"use client";

import React, { useState } from "react";
import { Settings, Download, Plus, BarChart3, PieChart, LineChart, TrendingUp } from "lucide-react";

export default function CustomReports() {
  const [reportConfig, setReportConfig] = useState({
    name: "",
    dateRange: "30d",
    metrics: [],
    filters: {},
    chartType: "bar"
  });

  const availableMetrics = [
    { id: "revenue", name: "Revenue", category: "Financial" },
    { id: "orders", name: "Orders", category: "Sales" },
    { id: "customers", name: "Customers", category: "Sales" },
    { id: "inventory", name: "Inventory Value", category: "Inventory" },
    { id: "profit", name: "Profit Margin", category: "Financial" },
    { id: "conversion", name: "Conversion Rate", category: "Sales" },
  ];

  const savedReports = [
    { id: 1, name: "Monthly Sales Summary", metrics: ["revenue", "orders", "customers"], lastRun: "2024-03-15" },
    { id: 2, name: "Inventory Performance", metrics: ["inventory", "turnover"], lastRun: "2024-03-14" },
    { id: 3, name: "Profit Analysis", metrics: ["revenue", "profit", "expenses"], lastRun: "2024-03-13" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Custom Reports</h1>
            <p className="text-gray-600">Create and manage custom reports</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Builder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Builder</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
                <input
                  type="text"
                  value={reportConfig.name}
                  onChange={(e) => setReportConfig({...reportConfig, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter report name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={reportConfig.dateRange}
                  onChange={(e) => setReportConfig({...reportConfig, dateRange: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Metrics</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableMetrics.map((metric) => (
                    <label key={metric.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{metric.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
                <div className="flex gap-3">
                  {[
                    { id: "bar", icon: BarChart3, name: "Bar Chart" },
                    { id: "line", icon: TrendingUp, name: "Line Chart" },
                    { id: "pie", icon: PieChart, name: "Pie Chart" },
                  ].map((chart) => (
                    <button
                      key={chart.id}
                      onClick={() => setReportConfig({...reportConfig, chartType: chart.id})}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                        reportConfig.chartType === chart.id
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <chart.icon className="w-4 h-4" />
                      <span className="text-sm">{chart.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors">
                  Generate Report
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Save Template
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
            <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              Configure your report settings above to see preview
            </div>
          </div>
        </div>

        {/* Saved Reports */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Reports</h3>
            <div className="space-y-3">
              {savedReports.map((report) => (
                <div key={report.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <button className="text-gray-400 hover:text-red-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Metrics: {report.metrics.join(", ")}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last run: {report.lastRun}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Export all data
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Schedule reports
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Share dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}