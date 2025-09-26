"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { 
  CheckIcon, 
  XMarkIcon,
  StarIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

const plans = [
  {
    name: "Free",
    price: "UGX 0",
    period: "",
    description: "Perfect for small businesses just getting started",
    features: [
      "Up to 50 items",
      "Single warehouse",
      "Basic reports",
      "Email support",
      
    ],
    limitations: [
      "Limited integrations",
      "Basic analytics only"
    ],
    popular: false,
    cta: "Start Free",
    highlight: false
  },
  {
    name: "Standard",
    price: "UGX 189,000",
    period: "/month",
    description: "Ideal for growing businesses with multiple locations",
    features: [
      "Up to 500 items",
      "Multi-warehouse support",
      "Sales & purchase orders",
      "Advanced reporting",
      "Email support",
      "Barcode scanning",
      "Inventory alerts"
    ],
    limitations: [],
    popular: true,
    cta: "Start Free Trial",
    highlight: true
  },
  {
    name: "Professional",
    price: "UGX 259,000",
    period: "/month",
    description: "Comprehensive solution for established businesses",
    features: [
      "Unlimited items",
      "Unlimited warehouses",
      "Advanced analytics",
      "Vendor management",
      "Priority support",
      "API access",
      "Custom integrations",
      "Role-based permissions"
    ],
    limitations: [],
    popular: false,
    cta: "Start Free Trial",
    highlight: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated support manager",
      "24/7 phone support",
      "On-premise deployment",
      "Advanced security",
      "Training & onboarding",
      "SLA guarantee"
    ],
    limitations: [],
    popular: false,
    cta: "Contact Sales",
    highlight: false
  },
];

const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and mobile money payments."
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Yes, save 20% when you pay annually instead of monthly."
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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              <span className="font-bold text-2xl text-gray-900">Astra Inventory</span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Choose the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">perfect plan</span> for your business
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Flexible pricing designed to scale with your business. Start free and upgrade as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-8">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'annual'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative rounded-2xl border-2 p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  plan.highlight
                    ? 'border-blue-500 shadow-blue-500/25 scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.name === 'Free' ? 'bg-gray-50' : 'bg-white'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      <StarIcon className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.name === 'Enterprise' ? plan.price : plan.price.split(' ')[0] + (billingCycle === 'annual' && plan.price !== 'UGX 0' ? ' ' + Math.floor(parseInt(plan.price.split(' ')[1]?.replace(',', '') || '0') * 0.8).toLocaleString() : plan.price.split(' ')[1] || '')}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 ml-1">
                        {billingCycle === 'annual' ? '/year' : plan.period}
                      </span>
                    )}
                  </div>
                  
                  {billingCycle === 'annual' && plan.price !== 'UGX 0' && plan.name !== 'Enterprise' && (
                    <p className="text-sm text-green-600">
                      Save UGX {Math.floor(parseInt(plan.price.split(' ')[1]?.replace(',', '') || '0') * 0.2 * 12).toLocaleString()} per year
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <li key={limitIndex} className="flex items-start">
                      <XMarkIcon className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 text-sm line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.highlight
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : plan.name === 'Free'
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>

                {plan.name !== 'Free' && plan.name !== 'Enterprise' && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    14-day free trial included
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-600">
              See what's included in each plan
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Standard</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Professional</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 text-gray-700">Items Limit</td>
                    <td className="text-center py-4 px-6 text-gray-600">50</td>
                    <td className="text-center py-4 px-6 text-gray-600">500</td>
                    <td className="text-center py-4 px-6 text-green-600">Unlimited</td>
                    <td className="text-center py-4 px-6 text-green-600">Unlimited</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">Warehouses</td>
                    <td className="text-center py-4 px-6 text-gray-600">1</td>
                    <td className="text-center py-4 px-6 text-gray-600">Multiple</td>
                    <td className="text-center py-4 px-6 text-green-600">Unlimited</td>
                    <td className="text-center py-4 px-6 text-green-600">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700">API Access</td>
                    <td className="text-center py-4 px-6"><XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center py-4 px-6"><XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center py-4 px-6"><CheckIcon className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-6"><CheckIcon className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">Priority Support</td>
                    <td className="text-center py-4 px-6"><XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center py-4 px-6"><XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="text-center py-4 px-6"><CheckIcon className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-6"><CheckIcon className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <QuestionMarkCircleIcon 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses already using Astra to manage their inventory
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