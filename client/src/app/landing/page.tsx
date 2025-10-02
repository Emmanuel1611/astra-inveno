"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCartIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  ClockIcon,
  ShieldCheckIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  CheckIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function LandingPage() {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <img src="/2.png" alt="Astra Logo" className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-gray-900">Astra Inventory</span>
        </div>

        <nav className="hidden lg:flex space-x-8 text-sm font-medium text-gray-700">
          <Link href="/features" className="hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="/testimonials" className="hover:text-blue-600 transition-colors">
            Testimonials
          </Link>
          <Link href="/faq" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Start Free Trial
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-8 pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Trusted by 1,000+ businesses worldwide
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Smart Inventory
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}Management
                </span>
                <br />Made Simple
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your business with our comprehensive inventory management platform.
                Track stock, manage orders, and gain powerful insights—all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl group"
                >
                  Start Free Trial
                  <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  Explore Features
                </Link>
                {/* View Dashboard Button */}
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-500 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 hover:border-indigo-600 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Dashboard
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  14-day free trial
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border">
                <img
                  src="./Inventory-Management.png"
                  alt="Astra Inventory Dashboard"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-3xl opacity-20 -z-10 transform scale-105"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="px-6 lg:px-8 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Inventory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From small businesses to enterprise operations, Astra scales with your needs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: ShoppingCartIcon,
                title: "Smart Order Management",
                description: "Automate purchase and sales orders with intelligent reorder points and supplier management.",
                color: "bg-blue-500"
              },
              {
                icon: BuildingStorefrontIcon,
                title: "Multi-Warehouse Support",
                description: "Manage inventory across multiple locations with real-time stock transfers and tracking.",
                color: "bg-green-500"
              },
              {
                icon: ChartBarIcon,
                title: "Advanced Analytics",
                description: "Get insights into sales trends, inventory turnover, and performance metrics.",
                color: "bg-purple-500"
              },
              {
                icon: DevicePhoneMobileIcon,
                title: "Mobile Ready",
                description: "Access your inventory data anywhere with our responsive web app and mobile support.",
                color: "bg-orange-500"
              },
              {
                icon: CloudIcon,
                title: "Cloud-Based & Secure",
                description: "Your data is safely stored in the cloud with enterprise-grade security and backups.",
                color: "bg-indigo-500"
              },
              {
                icon: ClockIcon,
                title: "Real-Time Updates",
                description: "Get instant notifications for low stock, order updates, and critical inventory changes.",
                color: "bg-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="px-6 lg:px-8 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about Astra Inventory
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Operations Manager",
                company: "TechFlow Solutions",
                content: "Astra transformed our inventory management. We reduced stockouts by 85% and improved our order accuracy significantly.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "CEO",
                company: "GreenLeaf Retail",
                content: "The real-time analytics helped us optimize our inventory levels and reduce carrying costs by 30%. Highly recommended!",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Warehouse Manager",
                company: "Urban Fashion Co.",
                content: "Multi-warehouse management became so much easier. The mobile app lets our team update inventory on the go.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="px-6 lg:px-8 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "UGX 189,000",
                period: "/month",
                description: "Perfect for small businesses just getting started",
                features: [
                  "Up to 1,000 products",
                  "2 warehouse locations",
                  "Basic reporting",
                  "Email support",
                  "Mobile app access"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "UGX 259,000",
                period: "/month",
                description: "Ideal for growing businesses with advanced needs",
                features: [
                  "Unlimited products",
                  "10 warehouse locations",
                  "Advanced analytics",
                  "Priority support",
                  "API access",
                  "Custom integrations"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "Tailored solutions for large organizations",
                features: [
                  "Everything in Professional",
                  "Unlimited warehouses",
                  "Dedicated account manager",
                  "24/7 phone support",
                  "Custom features",
                  "On-premise deployment"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border-2 ${plan.popular
                  ? 'border-blue-500 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
                  } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 lg:px-8 py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Inventory Management?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses already using Astra to streamline their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start Your Free Trial
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Schedule a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <img src="/2.png" alt="Astra Logo" className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl text-white">Astra Inventory</span>
              </div>
              <p className="text-gray-400 mb-4">
                The most comprehensive inventory management solution for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-center">
              &copy; 2025 Astra Inventory Management. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}