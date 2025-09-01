"use client";

import Link from "next/link";
import { Edit, Package } from "lucide-react";

export default function ItemDetailsPage({ params }: { params: { id: string } }) {
  const itemId = params.id;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" /> Item #{itemId}
        </h1>
        <Link
          href={`/inventory/items/${itemId}/edit`}
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
