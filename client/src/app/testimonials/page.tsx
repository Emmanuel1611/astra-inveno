"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { StarIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { BuildingOfficeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";

// Add this counter hook
const useCountUp = (end: number, duration: number = 2000, delay: number = 0) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			let startTime: number;
			const animate = (currentTime: number) => {
				if (!startTime) startTime = currentTime;
				const progress = Math.min((currentTime - startTime) / duration, 1);

				// Easing function for smooth animation
				const easeOutCubic = 1 - Math.pow(1 - progress, 3);
				setCount(Math.floor(end * easeOutCubic));

				if (progress < 1) {
					requestAnimationFrame(animate);
				}
			};
			requestAnimationFrame(animate);
		}, delay);

		return () => clearTimeout(timer);
	}, [end, duration, delay]);

	return count;
};

// Component for animated statistics
const AnimatedStat = ({ stat, index }: { stat: any; index: number }) => {
	const [isVisible, setIsVisible] = useState(false);

	// Extract numbers from the stat value
	const getNumericValue = (value: string) => {
		if (value.includes("1,000+")) return 1000;
		if (value.includes("2M+")) return 2000000;
		if (value.includes("15+")) return 15;
		if (value.includes("4.9/5")) return 4.9;
		return 0;
	};

	const formatValue = (count: number, originalValue: string) => {
		if (originalValue.includes("1,000+")) return `${count.toLocaleString()}+`;
		if (originalValue.includes("2M+"))
			return count >= 1000000
				? `${(count / 1000000).toFixed(1)}M+`
				: `${Math.floor(count / 1000)}K+`;
		if (originalValue.includes("15+")) return `${count}+`;
		if (originalValue.includes("4.9/5")) return `${count.toFixed(1)}/5`;
		return count.toString();
	};

	const numericValue = getNumericValue(stat.value);
	const animatedCount = useCountUp(numericValue, 2500, index * 200);

	return (
		<motion.div
			key={index}
			initial={{ scale: 0.8, opacity: 0 }}
			whileInView={{ scale: 1, opacity: 1 }}
			onViewportEnter={() => setIsVisible(true)}
			viewport={{ once: true }}
			transition={{ delay: index * 0.1, duration: 0.5 }}
			className="text-center"
		>
			<div className="text-3xl font-bold text-blue-600 mb-2 min-h-[2.5rem] flex items-center justify-center">
				{isVisible ? formatValue(animatedCount, stat.value) : "0"}
			</div>
			<div className="text-sm text-gray-600">{stat.label}</div>
		</motion.div>
	);
};

const testimonials = [
	{
		name: "John Nsubuga",
		position: "Operations Manager",
		company: "Kampala Traders Ltd",
		location: "Kampala, Uganda",
		avatar: "/avatars/john.jpg", // You can add actual avatar images
		feedback:
			"Astra has completely transformed how we manage inventory. It's intuitive, reliable, and has saved us countless hours of manual work. Our stock accuracy improved from 75% to 98%!",
		rating: 5,
		metrics: "98% stock accuracy",
	},
	{
		name: "Sarah Nakato",
		position: "CEO",
		company: "Uganda Retailers",
		location: "Entebbe, Uganda",
		avatar: "/avatars/sarah.jpg",
		feedback:
			"The reports and analytics helped us cut waste and grow revenue by 20%. The insights we get from Astra's dashboard are invaluable for making data-driven decisions.",
		rating: 5,
		metrics: "20% revenue growth",
	},
	{
		name: "David Okello",
		position: "Warehouse Manager",
		company: "East Africa Logistics",
		location: "Nairobi, Kenya",
		avatar: "/avatars/david.jpg",
		feedback:
			"I love the simplicity. Even our non-technical staff use Astra without issues. The mobile app is perfect for warehouse operations, and the barcode scanning feature is a game-changer.",
		rating: 5,
		metrics: "50% faster processing",
	},
	{
		name: "Grace Auma",
		position: "Supply Chain Director",
		company: "Nile Commerce Co.",
		location: "Jinja, Uganda",
		avatar: "/avatars/grace.jpg",
		feedback:
			"Multi-warehouse management was a nightmare before Astra. Now we track inventory across 8 locations seamlessly. The real-time synchronization is flawless.",
		rating: 5,
		metrics: "8 warehouses managed",
	},
	{
		name: "Michael Kiprotich",
		position: "Business Owner",
		company: "Rift Valley Supplies",
		location: "Eldoret, Kenya",
		avatar: "/avatars/michael.jpg",
		feedback:
			"As a small business, we needed something affordable yet powerful. Astra's pricing is fair, and the features rival expensive enterprise solutions. Best investment we've made!",
		rating: 5,
		metrics: "3x business growth",
	},
	{
		name: "Fatima Hassan",
		position: "Inventory Manager",
		company: "Dar es Salaam Trading",
		location: "Dar es Salaam, Tanzania",
		avatar: "/avatars/fatima.jpg",
		feedback:
			"Customer support is outstanding. Any question we have gets answered within hours. The training they provided was thorough, and our team was up and running in days.",
		rating: 5,
		metrics: "<24hr support response",
	},
];

const stats = [
	{ label: "Happy Customers", value: "1,000+" },
	{ label: "Items Tracked Daily", value: "2M+" },
	{ label: "Countries Served", value: "15+" },
	{ label: "Average Rating", value: "4.9/5" },
];

const fadeInUp = {
	initial: { y: 60, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	transition: { duration: 0.6 },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export default function TestimonialsPage() {
	return (
		<div className="min-h-screen bg-white">
			{/* Header Section */}
			<section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-16">
				<div className="max-w-7xl mx-auto px-6 text-center">
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
							Loved by businesses across{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
								Africa
							</span>
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
							Join thousands of businesses that trust Astra to manage their
							inventory, streamline operations, and drive growth.
						</p>

						{/* Animated Stats */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
							{stats.map((stat, index) => (
								<AnimatedStat key={index} stat={stat} index={index} />
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Testimonials Grid */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-6">
					<motion.div
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
						className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
					>
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="group relative rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
							>
								{/* Quote Icon */}
								<div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
									<ChatBubbleLeftIcon className="w-12 h-12 text-blue-600" />
								</div>

								{/* Rating */}
								<div className="flex items-center mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<StarIcon key={i} className="w-5 h-5 text-yellow-400" />
									))}
								</div>

								{/* Feedback */}
								<blockquote className="text-gray-700 mb-6 leading-relaxed">
									"{testimonial.feedback}"
								</blockquote>

								{/* Metrics Badge */}
								<div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-6">
									{testimonial.metrics}
								</div>

								{/* Author Info */}
								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
										<UserCircleIcon className="w-8 h-8 text-blue-600" />
									</div>
									<div className="flex-1">
										<div className="font-semibold text-gray-900">
											{testimonial.name}
										</div>
										<div className="text-sm text-gray-600">
											{testimonial.position}
										</div>
										<div className="flex items-center mt-1 text-xs text-gray-500">
											<BuildingOfficeIcon className="w-3 h-3 mr-1" />
											{testimonial.company}
										</div>
										<div className="text-xs text-gray-400 mt-1">
											{testimonial.location}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Trust Indicators */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-6">
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Trusted by Industry Leaders
						</h2>
						<p className="text-xl text-gray-600">
							From startups to enterprises, businesses rely on Astra
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<motion.div
							initial={{ x: -30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							className="text-center p-6"
						>
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<StarIcon className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								4.9/5 Rating
							</h3>
							<p className="text-gray-600">
								Consistently rated as the top inventory solution
							</p>
						</motion.div>

						<motion.div
							initial={{ y: 30, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="text-center p-6"
						>
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<BuildingOfficeIcon className="w-8 h-8 text-green-600" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								1,000+ Businesses
							</h3>
							<p className="text-gray-600">
								Companies across Africa trust our platform
							</p>
						</motion.div>

						<motion.div
							initial={{ x: 30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-center p-6"
						>
							<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<UserCircleIcon className="w-8 h-8 text-purple-600" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								24/7 Support
							</h3>
							<p className="text-gray-600">
								Dedicated support team ready to help you succeed
							</p>
						</motion.div>
					</div>
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
							Join These Successful Businesses
						</h2>
						<p className="text-xl text-blue-100 mb-8">
							Start your free trial today and see why businesses choose Astra
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/signup"
								className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
							>
								Start Free Trial
								<ArrowRightIcon className="ml-2 w-5 h-5" />
							</Link>
							<Link
								href="/demo"
								className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
							>
								Request Demo
							</Link>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}