"use client";

import { useState } from "react";
import { Receipt, Plus, Download, Eye, Send, DollarSign } from "lucide-react";

const mockInvoices = [
	{
		id: "INV-001",
		customer: "John Smith",
		amount: 299.99,
		status: "paid",
		dueDate: "2024-03-20",
		issueDate: "2024-03-15",
	},
	{
		id: "INV-002",
		customer: "Sarah Johnson",
		amount: 149.5,
		status: "pending",
		dueDate: "2024-03-25",
		issueDate: "2024-03-14",
	},
	{
		id: "INV-003",
		customer: "Mike Wilson",
		amount: 599.25,
		status: "overdue",
		dueDate: "2024-03-10",
		issueDate: "2024-02-28",
	},
	{
		id: "INV-004",
		customer: "Emma Davis",
		amount: 89.99,
		status: "draft",
		dueDate: "2024-03-30",
		issueDate: "2024-03-12",
	},
];

export default function Invoices() {
	const [invoices, setInvoices] = useState(mockInvoices);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "paid":
				return "bg-green-100 text-green-700";
			case "pending":
				return "bg-yellow-100 text-yellow-700";
			case "overdue":
				return "bg-red-100 text-red-700";
			case "draft":
				return "bg-gray-100 text-gray-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
						<Receipt className="w-5 h-5 text-white" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
						<p className="text-gray-600">Manage customer invoices</p>
					</div>
				</div>

				<button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors">
					<Plus className="w-4 h-4" />
					Create Invoice
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<DollarSign className="w-6 h-6 text-green-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">1</div>
							<div className="text-sm text-gray-600">Paid</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
							<Receipt className="w-6 h-6 text-yellow-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">1</div>
							<div className="text-sm text-gray-600">Pending</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
							<Receipt className="w-6 h-6 text-red-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">1</div>
							<div className="text-sm text-gray-600">Overdue</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
							<Receipt className="w-6 h-6 text-gray-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">1</div>
							<div className="text-sm text-gray-600">Draft</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Invoice List</h2>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Invoice ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Customer
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Amount
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Issue Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Due Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{invoices.map((invoice) => (
								<tr key={invoice.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 text-sm font-medium text-gray-900">
										{invoice.id}
									</td>
									<td className="px-6 py-4 text-sm text-gray-900">
										{invoice.customer}
									</td>
									<td className="px-6 py-4 text-sm font-medium text-gray-900">
										${invoice.amount}
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
												invoice.status
											)}`}
										>
											{invoice.status}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-500">
										{invoice.issueDate}
									</td>
									<td className="px-6 py-4 text-sm text-gray-500">
										{invoice.dueDate}
									</td>
									<td className="px-6 py-4">
										<div className="flex gap-2">
											<button className="text-blue-600 hover:text-blue-800">
												<Eye className="w-4 h-4" />
											</button>
											<button className="text-green-600 hover:text-green-800">
												<Download className="w-4 h-4" />
											</button>
											<button className="text-purple-600 hover:text-purple-800">
												<Send className="w-4 h-4" />
											</button>
										</div>
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
