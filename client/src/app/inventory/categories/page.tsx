"use client";

import { useState } from "react";
import { Tag, Plus, Edit2, Trash2, Package } from "lucide-react";

const mockCategories = [
  { id: 1, name: "Electronics", items: 45, color: "bg-blue-500" },
  { id: 2, name: "Clothing", items: 32, color: "bg-green-500" },
  { id: 3, name: "Food & Beverages", items: 28, color: "bg-orange-500" },
  { id: 4, name: "Books", items: 15, color: "bg-purple-500" },
  { id: 5, name: "Furniture", items: 12, color: "bg-indigo-500" },
];

export default function InventoryCategories() {
  const [categories, setCategories] = useState(mockCategories);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <Tag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600">Manage inventory categories</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.items} items</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">{category.items}</div>
              <div className="text-sm text-gray-500">Total Items</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}