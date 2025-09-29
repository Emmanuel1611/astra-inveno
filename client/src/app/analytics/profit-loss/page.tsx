"use client";

import React, { useState } from "react";
import { TrendingUp, Download, DollarSign, Calendar, BarChart3, PieChart } from "lucide-react";

export default function ProfitLossAnalysis() {
  const [period, setPeriod] = useState("quarterly");

  const plData = [
    { category: "Revenue", items: [
      { name: "Product Sales", q1: 125000, q2: 142000, q3: 158000, q4: 167000 },
      { name: "Service Revenue", q1: 45000, q2: 52000, q3: 48000, q4: 55000 },
      { name: "Other Income", q1: 3200, q2: 2800, q3: 4100, q4: 3600 }
    ]},
    { category: "Cost of Goods Sold", items: [
      { name: "Direct Materials", q1: 62500, q2: 71000, q3: 79000, q4: 83500 },
      { name: "Direct Labor", q1: 18750, q2: 21300, q3: 23700, q4: 25050 },
      { name: "Manufacturing Overhead", q1: 12500, q2: 14200, q3: 15800, q4: 16700 }
    ]},
    { category: "Operating Expenses", items: [
      { name: "Salaries & Benefits", q1: 35000, q2: 36500, q3: 37200, q4: 38000 },
      { name: "Rent & Utilities", q1: 8500, q2: 8500, q3: 8800, q4: 8800 },
      { name: "Marketing", q1: 12000, q2: 15000, q3: 18000, q4: 22000 },
      { name: "Administrative", q1: 5500, q2: 6200, q3: 6800, q4: 7100 }
    ]}
  ];

  const calculateTotal = (items: any[], quarter: string) => {
    return items.reduce((sum, item) => sum + item[quarter as keyof typeof item], 0);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profit & Loss Analysis</h1>
            <p className="text-gray-600">Detailed financial performance</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export P&L
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$692K</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-xs text-green-600 font-medium">+21.2% YoY</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$374K</div>
              <div className="text-sm text-gray-600">Total COGS</div>
              <div className="text-xs text-red-600 font-medium">+18.5% YoY</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$318K</div>
              <div className="text-sm text-gray-600">Gross Profit</div>
              <div className="text-xs text-blue-600 font-medium">+24.8% YoY</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">46%</div>
              <div className="text-sm text-gray-600">Gross Margin</div>
              <div className="text-xs text-purple-600 font-medium">+1.2% vs last year</div>
            </div>
          </div>
        </div>
      </div>

      {/* P&L Statement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Profit & Loss Statement</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Q1</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Q2</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Q3</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Q4</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plData.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  <tr className="bg-gray-100">
                    <td colSpan={6} className="px-6 py-3 text-sm font-bold text-gray-900 uppercase">
                      {section.category}
                    </td>
                  </tr>
                  {section.items.map((item, itemIndex) => {
                    const total = (item.q1 + item.q2 + item.q3 + item.q4);
                    return (
                      <tr key={itemIndex} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 pl-12">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">${item.q1.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">${item.q2.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">${item.q3.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">${item.q4.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">${total.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-gray-50 border-b-2">
                    <td className="px-6 py-3 text-sm font-bold text-gray-900">Total {section.category}</td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900 text-right">
                      ${calculateTotal(section.items, 'q1').toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900 text-right">
                      ${calculateTotal(section.items, 'q2').toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900 text-right">
                      ${calculateTotal(section.items, 'q3').toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900 text-right">
                      ${calculateTotal(section.items, 'q4').toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900 text-right">
                      ${(calculateTotal(section.items, 'q1') + calculateTotal(section.items, 'q2') + 
                         calculateTotal(section.items, 'q3') + calculateTotal(section.items, 'q4')).toLocaleString()}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              
              {/* Net Income Calculation */}
              <tr className="bg-green-50 border-t-2 border-green-200">
                <td className="px-6 py-4 text-lg font-bold text-green-800">NET INCOME</td>
                <td className="px-6 py-4 text-lg font-bold text-green-800 text-right">$16,950</td>
                <td className="px-6 py-4 text-lg font-bold text-green-800 text-right">$21,300</td>
                <td className="px-6 py-4 text-lg font-bold text-green-800 text-right">$26,700</td>
                <td className="px-6 py-4 text-lg font-bold text-green-800 text-right">$31,200</td>
                <td className="px-6 py-4 text-lg font-bold text-green-800 text-right">$96,150</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}