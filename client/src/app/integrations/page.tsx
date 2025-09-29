"use client";

import { Truck, DollarSign, Plug } from "lucide-react";
import Image from "next/image";

const integrations = [
	{
		category: "Shipping Integrations",
		icon: <Truck className="w-6 h-6 text-indigo-500" />,
		services: [
			{
				name: "Alibaba Logistics",
				logo: "https://logos-world.net/wp-content/uploads/2020/09/Alibaba-Logo.png",
				description: "Global B2B shipping and sourcing solutions.",
			},
			{
				name: "DHL Express",
				logo: "https://static.cdnlogo.com/logos/d/73/dhl.svg",
				description: "Fast international shipping with real-time tracking.",
			},
			{
				name: "FedEx",
				logo: "https://logos-world.net/wp-content/uploads/2020/03/FedEx-Logo.png",
				description: "Reliable global courier and logistics service.",
			},
			{
				name: "UPS",
				logo: "https://logos-world.net/wp-content/uploads/2020/03/UPS-Logo.png",
				description: "Integrated domestic and international shipping solutions.",
			},
		],
	},
	{
		category: "Finance & Accounting",
		icon: <DollarSign className="w-6 h-6 text-green-500" />,
		services: [
			{
				name: "QuickBooks",
				logo: "https://logos-world.net/wp-content/uploads/2021/03/QuickBooks-Logo.png",
				description: "Simplify bookkeeping, payroll, and taxes.",
			},
			{
				name: "Xero",
				logo: "https://logos-world.net/wp-content/uploads/2021/02/Xero-Logo.png",
				description: "Cloud-based accounting software for small businesses.",
			},
			{
				name: "Zoho Books",
				logo: "https://www.zoho.com/books/images/books-logo.png",
				description: "Smart accounting tailored for growing businesses.",
			},
			{
				name: "PayPal",
				logo: "https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png",
				description: "Online payments and financial transactions made easy.",
			},
			{
				name: "Stripe",
				logo: "https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png",
				description: "Subscription billing, online payments, and invoicing.",
			},
		],
	},
	{
		category: "Other Business Tools",
		icon: <Plug className="w-6 h-6 text-blue-500" />,
		services: [
			{
				name: "Shopify",
				logo: "https://logos-world.net/wp-content/uploads/2020/11/Shopify-Logo.png",
				description: "E-commerce platform for online stores and retail.",
			},
			{
				name: "Slack",
				logo: "https://logos-world.net/wp-content/uploads/2021/01/Slack-Logo.png",
				description: "Team collaboration and messaging platform.",
			},
			{
				name: "Salesforce",
				logo: "https://logos-world.net/wp-content/uploads/2020/11/Salesforce-Logo.png",
				description: "CRM for managing customer relationships at scale.",
			},
			{
				name: "Zoho CRM",
				logo: "https://www.zoho.com/crm/images/crm-logo.png",
				description: "Omnichannel CRM for growing businesses.",
			},
		],
	},
];

export default function IntegrationsPage() {
	return (
		<div className="p-6 md:p-10">
			{/* Header */}
			<div className="mb-10 text-center">
				<h1 className="text-3xl md:text-4xl font-bold text-gray-900">
					Integrations
				</h1>
				<p className="mt-2 text-gray-600 max-w-2xl mx-auto">
					Connect Astra with your favorite apps and services. Streamline shipping,
					manager your finances, and integrate powerful tools to grow your business.
				</p>
			</div>

			{/* Categories */}
			<div className="space-y-12">
				{integrations.map((section, i) => (
					<div key={i}>
						<div className="flex items-center gap-3 mb-6">
							{section.icon}
							<h2 className="text-xl font-semibold text-gray-800">
								{section.category}
							</h2>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{section.services.map((service, idx) => (
								<div
									key={idx}
									className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md hover:border-blue-400 transition"
								>
									<div className="flex items-center gap-3">
										{service.logo ? (
											<Image
												src={service.logo}
												alt={service.name}
												width={36}
												height={36}
												className="rounded object-contain"
												unoptimized={true}
											/>
										) : (
											<div className="w-9 h-9 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
												{service.name[0]}
											</div>
										)}
										<h3 className="text-lg font-semibold text-gray-900">
											{service.name}
										</h3>
									</div>
									<p className="mt-3 text-sm text-gray-600">
										{service.description}
									</p>
									<button className="mt-4 w-full rounded-md bg-blue-600 text-white text-sm py-2 hover:bg-blue-700 transition">
										Connect
									</button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
