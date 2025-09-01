"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Package,
  ShoppingCart,
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Truck,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  ChevronDown,
  Clock4,
  Users,
  Tag,
  Building,
} from "lucide-react";

import { useEffect, } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ----------------------------- Mocked Data ----------------------------- */
const trendData = [
  { date: "Aug 1", sales: 1200, purchases: 800, expenses: 300 },
  { date: "Aug 5", sales: 2200, purchases: 1200, expenses: 600 },
  { date: "Aug 9", sales: 1800, purchases: 1500, expenses: 500 },
  { date: "Aug 13", sales: 2600, purchases: 1800, expenses: 700 },
  { date: "Aug 17", sales: 3100, purchases: 1600, expenses: 650 },
  { date: "Aug 21", sales: 2900, purchases: 1400, expenses: 550 },
  { date: "Aug 25", sales: 3600, purchases: 2100, expenses: 800 },
];

const categoryData = [
  { category: "Electronics", amount: 7800 },
  { category: "Home", amount: 5600 },
  { category: "Apparel", amount: 4200 },
  { category: "Beauty", amount: 2900 },
  { category: "Other", amount: 1800 },
];

const channels = [
  { name: "Online", value: 52 },
  { name: "Retail", value: 31 },
  { name: "Wholesale", value: 17 },
];

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EC4899", "#0EA5E9"];

const topProducts = [
  { sku: "SKU-001", name: "Wireless Headset", sold: 143, revenue: 5720 },
  { sku: "SKU-014", name: "Smart Lamp", sold: 118, revenue: 3540 },
  { sku: "SKU-112", name: "Yoga Mat", sold: 92, revenue: 1840 },
  { sku: "SKU-098", name: "Leather Wallet", sold: 77, revenue: 2310 },
  { sku: "SKU-077", name: "Mini Tripod", sold: 63, revenue: 1260 },
];

const lowStock = [
  { sku: "SKU-201", name: "USB-C Cable", qty: 6, reorder: 20 },
  { sku: "SKU-333", name: "Notebook A5", qty: 3, reorder: 15 },
  { sku: "SKU-245", name: "Ceramic Mug", qty: 9, reorder: 25 },
];

const receivables = [
  { id: "INV-1049", customer: "Zen Ltd.", dueIn: 3, amount: 740 },
  { id: "INV-1055", customer: "Alpha Co.", dueIn: 7, amount: 1280 },
  { id: "INV-1061", customer: "Nimbus Inc.", dueIn: 12, amount: 560 },
];

const activity = [
  { ts: "09:20", text: "Sales order SO-219 confirmed", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  { ts: "10:05", text: "Received 120 units of SKU-014", icon: <Truck className="w-3.5 h-3.5" /> },
  { ts: "11:30", text: "Invoice INV-1055 sent to Alpha Co.", icon: <CreditCard className="w-3.5 h-3.5" /> },
  { ts: "13:15", text: "Low stock alert for USB-C Cable", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
];

/* ------------------------------ UI Pieces ------------------------------ */
const DashboardHeader = ({
  greeting,
  userName,
  organization,
}: { greeting: string; userName: string; organization: string }) => {
  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-0 to-indigo-0 border border-gray-200/0 p-4 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">
        {greeting}, <span className="text-indigo-600">{userName}</span>
      </h1>
      <div className="mt-2 flex items-center text-sm text-gray-600">
        <Building className="w-4 h-4 mr-2 text-indigo-500" />
        <span className="font-medium">{organization}</span>
      </div>
      <p className="mt-3 text-gray-500 text-sm">
        Welcome back! Here's what's happening in your business today.
      </p>
    </div>
  );
};


function KpiCard({
  title,
  value,
  delta,
  positive = true,
  icon,
}: {
  title: string;
  value: string;
  delta: string;
  positive?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          <div
            className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
          >
            {positive ? <ArrowUpRight className="mr-1 h-3.5 w-3.5" /> : <ArrowDownRight className="mr-1 h-3.5 w-3.5" />}
            {delta}
          </div>
        </div>
        <div className="rounded-xl bg-gray-100 p-3">{icon}</div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------ Page Core ------------------------------ */
const Dashboard = () => {
  const [range, setRange] = useState<"7D" | "30D" | "QTD" | "YTD">("30D");
  const [warehouse, setWarehouse] = useState<string>("All Warehouses");
  const [channel, setChannel] = useState<string>("All Channels");
  const [greeting, setGreeting] = useState("");

  const totals = useMemo(() => {
    const sales = trendData.reduce((a, b) => a + b.sales, 0);
    const purchases = trendData.reduce((a, b) => a + b.purchases, 0);
    const expenses = trendData.reduce((a, b) => a + b.expenses, 0);
    const margin = sales - purchases - expenses;
    return { sales, purchases, expenses, margin };
  }, []);

  // Function to calculate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    setGreeting(getGreeting());

    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <DashboardHeader
        greeting={greeting}
        userName="Emmanuel"
        organization="Astra Enterprises"
      />
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="rounded-2xl border border-gray-200/0 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                className={`rounded-full px-3 py-1.5 text-sm ${range === "7D" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => setRange("7D")}
              >
                Last 7 days
              </button>
              <button
                className={`rounded-full px-3 py-1.5 text-sm ${range === "30D" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => setRange("30D")}
              >
                Last 30 days
              </button>
              <button
                className={`rounded-full px-3 py-1.5 text-sm ${range === "QTD" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => setRange("QTD")}
              >
                Quarter-to-date
              </button>
              <button
                className={`rounded-full px-3 py-1.5 text-sm ${range === "YTD" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => setRange("YTD")}
              >
                Year-to-date
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Aug 1 — Aug 25, 2025</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  className="bg-transparent text-gray-700 focus:outline-none"
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                >
                  <option>All Warehouses</option>
                  <option>Kampala HQ</option>
                  <option>Gulu Depot</option>
                  <option>Mbarara Hub</option>
                </select>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm">
                <Tag className="h-4 w-4 text-gray-500" />
                <select
                  className="bg-transparent text-gray-700 focus:outline-none"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                >
                  <option>All Channels</option>
                  <option>Online</option>
                  <option>Retail</option>
                  <option>Wholesale</option>
                </select>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black">
                <Download className="h-4 w-4" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Sales"
            value={`UGX ${totals.sales.toLocaleString()}`}
            delta="+14.2% MoM"
            positive
            icon={<DollarSign className="h-5 w-5 text-indigo-600" />}
          />
          <KpiCard
            title="Total Purchases"
            value={`UGX ${totals.purchases.toLocaleString()}`}
            delta="-6.1% MoM"
            positive={false}
            icon={<ShoppingCart className="h-5 w-5 text-emerald-600" />}
          />
          <KpiCard
            title="Expenses"
            value={`UGX ${totals.expenses.toLocaleString()}`}
            delta="+3.4% MoM"
            positive={false}
            icon={<CreditCard className="h-5 w-5 text-rose-600" />}
          />
          <KpiCard
            title="Gross Margin"
            value={`UGX ${totals.margin.toLocaleString()}`}
            delta="+9.7% MoM"
            positive
            icon={<TrendingUp className="h-5 w-5 text-amber-600" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <SectionCard
            title="Sales vs Purchases vs Expenses"
            actions={
              <div className="text-xs text-gray-500">UGX • Aug 2025</div>
            }
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#6366F1" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="purchases" stroke="#22C55E" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="expenses" stroke="#F43F5E" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard
            title="Revenue by Category"
            actions={<div className="text-xs text-gray-500">Top 5</div>}
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#0EA5E9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard
            title="Sales by Channel"
            actions={<div className="text-xs text-gray-500">Share %</div>}
          >
            <div className="flex h-64 items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={channels}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={2}
                  >
                    {channels.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* Tables & Alerts Row */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <SectionCard
            title="Top Products"
            actions={<button className="text-xs text-indigo-600 hover:underline">View all</button>}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Product</th>
                    <th className="py-2">Sold</th>
                    <th className="py-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-2">
                        <div className="font-medium text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.sku}</div>
                      </td>
                      <td className="py-2">{p.sold}</td>
                      <td className="py-2">UGX {p.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard
            title="Low Stock (Reorder Needed)"
            actions={<button className="text-xs text-indigo-600 hover:underline">Reorder</button>}
          >
            <ul className="divide-y">
              {lowStock.map((l, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-amber-50 p-2">
                      <Package className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{l.name}</div>
                      <div className="text-xs text-gray-500">{l.sku}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-800">Qty: {l.qty}</div>
                    <div className="text-xs text-gray-500">Reorder at {l.reorder}</div>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            title="Receivables (Upcoming Due)"
            actions={<button className="text-xs text-indigo-600 hover:underline">Go to Invoices</button>}
          >
            <ul className="divide-y">
              {receivables.map((r, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-50 p-2">
                      <DollarSign className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{r.id}</div>
                      <div className="text-xs text-gray-500">{r.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-800">UGX {r.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Due in {r.dueIn} days</div>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {/* Activity + At-a-Glance */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <SectionCard
            title="Today’s Activity"
            actions={<div className="text-xs text-gray-500 inline-flex items-center gap-1"><Clock4 className="h-4 w-4" /> Live</div>}
          >
            <ul className="space-y-3">
              {activity.map((a, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2 text-gray-700">{a.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-800">{a.text}</div>
                    <div className="text-xs text-gray-500">{a.ts}</div>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            title="Customers & Orders"
            actions={<button className="text-xs text-indigo-600 hover:underline">Open CRM</button>}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">New Customers</p>
                  <Users className="h-4 w-4 text-indigo-600" />
                </div>
                <p className="mt-2 text-2xl font-semibold">47</p>
                <div className="mt-1 inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">
                  <TrendingUp className="mr-1 h-3.5 w-3.5" /> +12%
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Open Orders</p>
                  <ShoppingCart className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="mt-2 text-2xl font-semibold">129</p>
                <div className="mt-1 inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-700">
                  <TrendingDown className="mr-1 h-3.5 w-3.5" /> -4%
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Fulfillment Health"
            actions={<button className="text-xs text-indigo-600 hover:underline">Open Shipments</button>}
          >
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-gray-200 p-3">
                <p className="text-xs text-gray-500">Ready to Ship</p>
                <p className="mt-2 text-2xl font-semibold">38</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-3">
                <p className="text-xs text-gray-500">In Transit</p>
                <p className="mt-2 text-2xl font-semibold">24</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-3">
                <p className="text-xs text-gray-500">Delivered</p>
                <p className="mt-2 text-2xl font-semibold">91</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
