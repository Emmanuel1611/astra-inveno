"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PublicNavbar from "@/components/PublicNavbar";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const faqs = [
	{
		question: "What is Astra Inventory Management?",
		answer:
			"Astra is a comprehensive cloud-based platform that helps businesses manage inventory, sales, purchases, and reporting in one centralized location. It's designed to streamline operations for businesses of all sizes across Africa.",
	},
	{
		question: "Do you offer a free plan?",
		answer:
			"Yes! Our free plan includes up to 50 items, single warehouse management, and basic reports so you can get started immediately. No credit card required to begin using Astra.",
	},
	{
		question: "Can I cancel anytime?",
		answer:
			"Absolutely. You can cancel or change your subscription anytime from your account settings. There are no long-term contracts or cancellation fees.",
	},
	{
		question: "How secure is my data?",
		answer:
			"We take security seriously. Your data is protected with enterprise-grade encryption, secure data centers, regular backups, and we comply with international security standards.",
	},
	{
		question: "Can I import my existing inventory data?",
		answer:
			"Yes! Astra supports importing data from Excel/CSV files. We provide templates and migration assistance to make the transition smooth from your current system.",
	},
	{
		question: "Does Astra work on mobile devices?",
		answer:
			"Absolutely! Astra is fully responsive and works perfectly on smartphones and tablets. Our mobile interface is optimized for warehouse operations including barcode scanning.",
	},
	{
		question: "Can I manage multiple warehouses?",
		answer:
			"Yes! Astra supports unlimited warehouses across different locations. You can track inventory levels, transfer stock between locations, and get consolidated reporting.",
	},
	{
		question: "What kind of support do you provide?",
		answer:
			"We offer email support for all users, priority support for paid plans, comprehensive documentation, video tutorials, and phone support for enterprise customers.",
	},
	{
		question: "Do you offer integrations with other software?",
		answer:
			"Yes! Astra integrates with popular accounting software like QuickBooks and Xero, e-commerce platforms like Shopify, and offers API access for custom integrations.",
	},
	{
		question: "Is there a setup fee?",
		answer:
			"No setup fees! You can start using Astra immediately after signing up. Our free trial gives you full access to test all features before committing to a paid plan.",
	},
];

export default function FAQPage() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className="min-h-screen bg-white">
			<PublicNavbar />

			{/* Header Section */}
			<section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-16">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8 }}
					>
						{/* Logo */}
						<div className="flex items-center justify-center space-x-3 mb-8">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
								<img src="/2.png" alt="Astra Logo" className="w-6 h-6" />
							</div>
							<span className="font-bold text-2xl text-gray-900">
								Astra Inventory
							</span>
						</div>

						<h1 className="text-5xl font-bold text-gray-900 mb-6">
							Frequently Asked{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
								Questions
							</span>
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Find answers to common questions about Astra Inventory. Can't find
							what you're looking for?
							<br className="hidden sm:block" /> Contact our support team.
						</p>
					</motion.div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="max-w-4xl mx-auto px-6 py-16 -mt-10">
				<motion.div
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="bg-white rounded-2xl shadow-lg p-8"
				>
					<div className="space-y-6">
						{faqs.map((faq, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: i * 0.1 }}
								className="border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
							>
								<button
									onClick={() => setOpenIndex(openIndex === i ? null : i)}
									className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 rounded-xl transition-colors"
								>
									<span className="font-semibold text-gray-900 text-lg pr-4">
										{faq.question}
									</span>
									<span className="text-2xl text-blue-600 font-light flex-shrink-0">
										{openIndex === i ? "−" : "+"}
									</span>
								</button>
								{openIndex === i && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="border-t border-gray-200"
									>
										<div className="px-6 py-5 text-gray-600 leading-relaxed">
											{faq.answer}
										</div>
									</motion.div>
								)}
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>

			{/* Still Need Help Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Still have questions?
						</h2>
						<p className="text-xl text-gray-600 mb-8">
							Our support team is here to help you get the most out of Astra
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/contact"
								className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
							>
								Contact Support
							</Link>
							<Link
								href="/demo"
								className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
							>
								Schedule Demo
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
				<div className="max-w-4xl mx-auto text-center px-6">
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl font-bold text-white mb-6">
							Ready to Get Started?
						</h2>
						<p className="text-xl text-blue-100 mb-8">
							Start your free trial and see why businesses choose Astra
						</p>
						<Link
							href="/signup"
							className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
						>
							Start Free Trial
							<ArrowRightIcon className="ml-2 w-5 h-5" />
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	);
}