"use client";

import { useState } from "react";
import { ShoppingCart, Eye, Edit, Truck, CheckCircle, Clock } from "lucide-react";

const mockOrders = [
	{ id: "ORD-001", customer: "John Smith", items: 3, total: 299.99, status: "pending", date: "2024-03-15" },
	{ id: "ORD-002", customer: "Sarah Johnson", items: 1, total: 149.5, status: "shipped", date: "2024-03-14" },
	{ id: "ORD-003", customer: "Mike Wilson", items: 5, total: 599.25, status: "delivered", date: "2024-03-13" },
	{ id: "ORD-004", customer: "Emma Davis", items: 2, total: 89.99, status: "processing", date: "2024-03-12" },
];

export default function SalesOrders() {
	const [orders, setOrders] = useState(mockOrders);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-700";
			case "processing":
				return "bg-blue-100 text-blue-700";
			case "shipped":
				return "bg-purple-100 text-purple-700";
			case "delivered":
				return "bg-green-100 text-green-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "pending":
				return <Clock className="w-4 h-4" />;
			case "processing":
				return <Edit className="w-4 h-4" />;
			case "shipped":
				return <Truck className="w-4 h-4" />;
			case "delivered":
				return <CheckCircle className="w-4 h-4" />;
			default:
				return <Clock className="w-4 h-4" />;
		}
	};

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
						<ShoppingCart className="w-5 h-5 text-white" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Sales Orders</h1>
						<p className="text-gray-600">Manage customer orders</p>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
							<Clock className="w-6 h-6 text-yellow-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">1</div>
							<div className="text-sm text-gray-600">Pending</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<Edit className="w-6 h-6 text-blue-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">1</div>
							<div className="text-sm text-gray-600">Processing</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<Truck className="w-6 h-6 text-purple-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">1</div>
							<div className="text-sm text-gray-600">Shipped</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<CheckCircle className="w-6 h-6 text-green-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">1</div>
							<div className="text-sm text-gray-600">Delivered</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Order ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Customer
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Items
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Total
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{orders.map((order) => (
								<tr key={order.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
									<td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
									<td className="px-6 py-4 text-sm text-gray-900">{order.items}</td>
									<td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total}</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
												order.status
											)}`}
										>
											{getStatusIcon(order.status)}
											{order.status}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
									<td className="px-6 py-4">
										<button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
											<Eye className="w-4 h-4" />
											View
										</button>
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
