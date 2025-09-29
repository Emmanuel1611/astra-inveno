"use client";

import { useState } from "react";
import { MapPin, Plus, Package, Warehouse, Edit2, Trash2 } from "lucide-react";

const mockLocations = [
  { id: 1, name: "Main Warehouse", address: "123 Industrial Blvd, City Center", type: "warehouse", items: 450, capacity: 1000, manager: "John Smith" },
  { id: 2, name: "Retail Store A", address: "456 Shopping Mall, Downtown", type: "store", items: 120, capacity: 200, manager: "Sarah Johnson" },
  { id: 3, name: "Distribution Center", address: "789 Logistics Park, Suburb", type: "distribution", items: 350, capacity: 800, manager: "Mike Wilson" },
  { id: 4, name: "Storage Room B", address: "321 Office Building, Business District", type: "storage", items: 80, capacity: 150, manager: "Emma Davis" },
];

export default function InventoryLocations() {
  const [locations, setLocations] = useState(mockLocations);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "warehouse": return "bg-blue-100 text-blue-700";
      case "store": return "bg-green-100 text-green-700";
      case "distribution": return "bg-purple-100 text-purple-700";
      case "storage": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warehouse": return <Warehouse className="w-5 h-5" />;
      case "store": return <Package className="w-5 h-5" />;
      case "distribution": return <Warehouse className="w-5 h-5" />;
      case "storage": return <Package className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const getCapacityPercentage = (items: number, capacity: number) => {
    return Math.round((items / capacity) * 100);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Storage Locations</h1>
            <p className="text-gray-600">Manage inventory locations</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{locations.length}</div>
              <div className="text-sm text-gray-600">Total Locations</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,000</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Warehouse className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">2,150</div>
              <div className="text-sm text-gray-600">Total Capacity</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">47%</div>
              <div className="text-sm text-gray-600">Avg Utilization</div>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {locations.map((location) => {
          const utilizationPercent = getCapacityPercentage(location.items, location.capacity);
          return (
            <div key={location.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(location.type)}`}>
                    {getTypeIcon(location.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(location.type)}`}>
                    {location.type}
                  </span>
                  <span className="text-sm text-gray-600">Manager: {location.manager}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacity Utilization</span>
                    <span className="font-medium">{location.items}/{location.capacity} ({utilizationPercent}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        utilizationPercent > 80 ? 'bg-red-500' : 
                        utilizationPercent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${utilizationPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{location.items}</div>
                    <div className="text-sm text-gray-600">Items Stored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{location.capacity - location.items}</div>
                    <div className="text-sm text-gray-600">Available Space</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}