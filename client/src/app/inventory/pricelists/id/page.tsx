"use client";

import Link from "next/link";
import { Edit, DollarSign } from "lucide-react";
import { use } from 'react'; // Add this import

export default function PriceListDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Use the use() hook to unwrap the Promise

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" /> Price List #{id}
        </h1>
        <Link
          href={`/inventory/pricelists/${id}/edit`}
          className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800"
        >
          <Edit className="w-4 h-4" /> Edit
        </Link>
      </div>

      <div className="border rounded-lg p-6">
        <p className="text-gray-600">Details of this price list will appear here.</p>
      </div>
    </div>
  );
}