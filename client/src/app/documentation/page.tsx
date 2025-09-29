"use client";

import React, { useState } from "react";
import { BookOpen, Search, ChevronRight, ExternalLink, Download } from "lucide-react";

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("getting-started");

  const docCategories = [
    { id: "getting-started", name: "Getting Started", articles: 5 },
    { id: "inventory", name: "Inventory Management", articles: 12 },
    { id: "sales", name: "Sales & Orders", articles: 8 },
    { id: "procurement", name: "Procurement", articles: 10 },
    { id: "reports", name: "Reports & Analytics", articles: 7 },
    { id: "integrations", name: "Integrations", articles: 6 },
    { id: "api", name: "API Reference", articles: 15 },
    { id: "troubleshooting", name: "Troubleshooting", articles: 9 },
  ];

  const popularArticles = [
    { title: "Setting up your first inventory", category: "Getting Started", views: 1250 },
    { title: "Creating purchase orders", category: "Procurement", views: 980 },
    { title: "Understanding stock levels", category: "Inventory", views: 875 },
    { title: "Generating sales reports", category: "Reports", views: 720 },
    { title: "API authentication", category: "API", views: 650 },
  ];

  const recentArticles = [
    { title: "New dashboard features", date: "2024-03-15", category: "Getting Started" },
    { title: "Advanced inventory tracking", date: "2024-03-12", category: "Inventory" },
    { title: "Bulk operations guide", date: "2024-03-10", category: "Inventory" },
    { title: "Custom report builder", date: "2024-03-08", category: "Reports" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
            <p className="text-gray-600">Learn how to use the inventory system</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {docCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === category.id
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs text-gray-500">{category.articles}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Start */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "System Setup", desc: "Configure your inventory system", time: "5 min" },
                { title: "Add Products", desc: "Start managing your inventory", time: "10 min" },
                { title: "Create Orders", desc: "Process your first sale", time: "8 min" },
                { title: "Generate Reports", desc: "View your business insights", time: "5 min" },
              ].map((guide, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{guide.title}</h4>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{guide.desc}</p>
                  <span className="text-xs text-red-600 font-medium">{guide.time} read</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
            <div className="space-y-3">
              {recentArticles.map((article, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}