"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PublicNavbar from "@/components/PublicNavbar";
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  BarChart3,
  Warehouse,
  Users,
  Shield,
  Smartphone,
  Clock,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const mainFeatures = [
  {
    title: "Inventory Management",
    description:
      "Track stock levels, warehouses, and item movements in real-time with automated alerts and intelligent forecasting.",
    icon: Package,
    color: "bg-blue-50 text-blue-600",
    details: [
      "Real-time stock tracking",
      "Low stock alerts",
      "Barcode scanning",
      "Batch & serial tracking"
    ]
  },
  {
    title: "Sales & Invoicing",
    description:
      "Create sales orders, invoices, and manage customer payments seamlessly with integrated billing.",
    icon: ShoppingCart,
    color: "bg-green-50 text-green-600",
    details: [
      "Automated invoicing",
      "Payment tracking",
      "Customer management",
      "Sales analytics"
    ]
  },
  {
    title: "Purchases & Vendors",
    description:
      "Streamline purchase orders, bills, and vendor relationships with automated procurement workflows.",
    icon: Truck,
    color: "bg-purple-50 text-purple-600",
    details: [
      "Purchase order automation",
      "Vendor management",
      "Cost tracking",
      "Delivery scheduling"
    ]
  },
  {
    title: "Analytics & Reports",
    description:
      "Powerful dashboards and financial insights to grow your business with data-driven decisions.",
    icon: BarChart3,
    color: "bg-orange-50 text-orange-600",
    details: [
      "Custom dashboards",
      "Financial reports",
      "Inventory analytics",
      "Performance metrics"
    ]
  },
];

const additionalFeatures = [
  {
    title: "Multi-Warehouse Support",
    description: "Manage inventory across multiple locations with ease",
    icon: Warehouse,
    color: "text-indigo-600"
  },
  {
    title: "Team Collaboration",
    description: "Role-based access control and team management",
    icon: Users,
    color: "text-cyan-600"
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security with data encryption",
    icon: Shield,
    color: "text-red-600"
  },
  {
    title: "Mobile Access",
    description: "Access your inventory anywhere, anytime",
    icon: Smartphone,
    color: "text-pink-600"
  },
  {
    title: "Real-Time Sync",
    description: "Instant updates across all devices and locations",
    icon: Clock,
    color: "text-yellow-600"
  },
  {
    title: "API Integration",
    description: "Connect with your existing tools and systems",
    icon: Zap,
    color: "text-emerald-600"
  }
];

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

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      
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
              <span className="font-bold text-2xl text-gray-900">Astra Inventory</span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Features that power <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">modern businesses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Everything you need to run your inventory, sales, and purchases — 
              designed for efficiency, scalability, and growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <div className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 h-full">
                  <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Additional Features Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Even More Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover additional capabilities that make Astra the complete inventory solution
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className={`w-8 h-8 ${feature.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Astra Inventory?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Save Time & Money</h3>
                    <p className="text-gray-600">Automate manual processes and reduce operational costs by up to 40%</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Scale with Confidence</h3>
                    <p className="text-gray-600">From startup to enterprise, Astra grows with your business needs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Make Better Decisions</h3>
                    <p className="text-gray-600">Data-driven insights help you optimize inventory and increase profits</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Package className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Dashboard Preview</p>
                </div>
              </div>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your free trial today and see why thousands choose Astra
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}