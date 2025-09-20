"use client";

import Link from "next/link";
import { Edit, Package } from "lucide-react";

export default async function InventoryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" /> Item #{id}
        </h1>
        <Link
          href={`/inventory/items/${id}/edit`}
          className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800"
        >
          <Edit className="w-4 h-4" /> Edit
        </Link>
      </div>

      {/* Tabs Placeholder */}
      <div className="border rounded-lg p-6">
        <p className="text-gray-600">Details, stock history, and transactions for this item will be displayed here.</p>
      </div>
    </div>
  );
}
