"use client";

import { useState } from "react";
import { DollarSign, Download, TrendingUp, TrendingDown, PieChart, Calendar } from "lucide-react";

export default function FinancialReports() {
  const [period, setPeriod] = useState("monthly");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
            <p className="text-gray-600">Track financial performance</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$156,780</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-xs text-green-600 font-medium">+18.2% from last period</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$89,340</div>
              <div className="text-sm text-gray-600">Total Expenses</div>
              <div className="text-xs text-red-600 font-medium">+5.1% from last period</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$67,440</div>
              <div className="text-sm text-gray-600">Net Profit</div>
              <div className="text-xs text-blue-600 font-medium">+32.8% from last period</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">43%</div>
              <div className="text-sm text-gray-600">Profit Margin</div>
              <div className="text-xs text-purple-600 font-medium">+2.1% from last period</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue vs Expenses</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Revenue vs expenses chart would go here
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { category: "Cost of Goods Sold", amount: "$45,200", percentage: 75 },
              { category: "Operating Expenses", amount: "$18,900", percentage: 40 },
              { category: "Marketing", amount: "$12,650", percentage: 25 },
              { category: "Administrative", amount: "$12,590", percentage: 25 },
            ].map((expense, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{expense.category}</span>
                  <span className="text-gray-600">{expense.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" 
                    style={{ width: `${expense.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Details Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Financial Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { account: "Sales Revenue", current: 156780, previous: 132650, change: 24130, pctChange: 18.2 },
                { account: "Cost of Goods Sold", current: 45200, previous: 41800, change: 3400, pctChange: 8.1 },
                { account: "Gross Profit", current: 111580, previous: 90850, change: 20730, pctChange: 22.8 },
                { account: "Operating Expenses", current: 44140, previous: 40120, change: 4020, pctChange: 10.0 },
                { account: "Net Income", current: 67440, previous: 50730, change: 16710, pctChange: 32.9 },
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.account}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${item.current.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${item.previous.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${item.change.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${item.pctChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.pctChange >= 0 ? '+' : ''}{item.pctChange}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}