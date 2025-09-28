"use client";

import React, { useEffect, useState } from "react";
import {
  DollarSign, ShoppingCart, CreditCard, TrendingUp, TrendingDown,
  Package, Users, Clock4, Tag, Building, Calendar, ChevronDown,
  Filter, Download, ArrowUpRight, ArrowDownRight, CheckCircle2,
  Truck, AlertTriangle,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell,
} from "recharts";

/* ---------------------- Static Mock Data ---------------------- */
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  organization: {
    name: "Demo Company Ltd"
  }
};

const mockTrends = {
  trends: [
    { date: "Jan", sales: 45000, purchases: 30000, expenses: 8000 },
    { date: "Feb", sales: 52000, purchases: 35000, expenses: 9000 },
    { date: "Mar", sales: 48000, purchases: 32000, expenses: 7500 },
    { date: "Apr", sales: 61000, purchases: 40000, expenses: 10000 },
    { date: "May", sales: 55000, purchases: 38000, expenses: 8500 },
    { date: "Jun", sales: 67000, purchases: 45000, expenses: 11000 },
  ],
  totals: {
    sales: 328000,
    purchases: 220000,
    expenses: 54000,
  },
  changes: {
    sales: "+12.5",
    purchases: "+8.3",
    expenses: "-5.2",
    margin: "+15.8",
  },
  dateRange: {
    start: "Jan 1, 2024",
    end: "Jun 30, 2024"
  }
};

const mockCategories = [
  { category: "Electronics", amount: 120000 },
  { category: "Furniture", amount: 85000 },
  { category: "Office Supplies", amount: 65000 },
  { category: "Software", amount: 45000 },
  { category: "Hardware", amount: 35000 },
];

const mockChannels = [
  { name: "Online", value: 45 },
  { name: "Retail", value: 30 },
  { name: "Wholesale", value: 25 },
];

const mockTopProducts = [
  { name: "MacBook Pro", sku: "MBP-001", sold: 45, revenue: 135000 },
  { name: "Office Chair", sku: "OFC-002", sold: 120, revenue: 96000 },
  { name: "Wireless Mouse", sku: "WM-003", sold: 200, revenue: 24000 },
  { name: "Monitor 27''", sku: "MON-004", sold: 85, revenue: 85000 },
  { name: "Keyboard", sku: "KB-005", sold: 150, revenue: 22500 },
];

const mockLowStock = [
  { name: "Laptop Charger", sku: "LC-001", qty: 5, reorder: 20 },
  { name: "USB Cable", sku: "USB-002", qty: 8, reorder: 25 },
  { name: "Power Bank", sku: "PB-003", qty: 3, reorder: 15 },
];

const mockReceivables = [
  { id: "INV-001", customer: "ABC Corp", amount: 15000, dueIn: 5 },
  { id: "INV-002", customer: "XYZ Ltd", amount: 22000, dueIn: 12 },
  { id: "INV-003", customer: "Tech Solutions", amount: 8500, dueIn: 18 },
];

const mockActivity = [
  { text: "Order #1234 shipped to ABC Corp", ts: "2 mins ago", icon: "truck" },
  { text: "Payment received from XYZ Ltd", ts: "15 mins ago", icon: "credit-card" },
  { text: "New order #1235 created", ts: "1 hour ago", icon: "check" },
  { text: "Low stock alert: USB Cables", ts: "2 hours ago", icon: "alert" },
];

const mockCustomerMetrics = {
  newCustomers: { count: 24, change: 15.2, increasing: true },
  openOrders: { count: 156, change: 8.7, increasing: true },
};

const mockFulfillmentMetrics = {
  readyToShip: 45,
  inTransit: 23,
  delivered: 187,
};

/* ---------------------- Skeleton Components ---------------------- */
const KpiSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="w-3/4">
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="mt-2 h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="mt-2 h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="rounded-xl bg-gray-200 p-4 w-10 h-10 animate-pulse"></div>
    </div>
  </div>
);

const ChartSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-1/6 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="h-64 bg-gray-100 rounded animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading chart data...</div>
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-1/6 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex items-center justify-between py-2">
          <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

const ListSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-1/6 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <ul className="divide-y">
      {[1, 2, 3].map(i => (
        <li key={i} className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-200 p-2 w-8 h-8 animate-pulse"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-200 mt-1 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-200 mt-1 rounded animate-pulse"></div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

/* ---------------------- Reusable UI Pieces ---------------------- */
const DashboardHeader = ({ greeting, userName, organization }: any) => (
  <div className="mb-8 rounded-2xl bg-gradient-to-r from-white to-gray-50 border border-gray-200 p-4 shadow-sm">
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

function KpiCard({ title, value, delta, positive = true, icon }: any) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          <div
            className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {positive ? (
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
            )}
            {delta}
          </div>
        </div>
        <div className="rounded-xl bg-gray-100 p-3">{icon}</div>
      </div>
    </div>
  );
}

function SectionCard({ title, actions, children }: any) {
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

/* ---------------------- Main Dashboard ---------------------- */
const Dashboard = () => {
  // Static user data instead of using auth context
  const [user] = useState(mockUser);
  const [userLoading] = useState(false);
  
  const [range, setRange] = useState("30D");
  const [warehouse, setWarehouse] = useState("all");
  const [channel, setChannel] = useState("all");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static data state
  const [trends] = useState(mockTrends);
  const [categories] = useState(mockCategories);
  const [channels] = useState(mockChannels);
  const [topProducts] = useState(mockTopProducts);
  const [lowStock] = useState(mockLowStock);
  const [receivables] = useState(mockReceivables);
  const [activity] = useState(mockActivity);
  const [customerMetrics] = useState(mockCustomerMetrics);
  const [fulfillmentMetrics] = useState(mockFulfillmentMetrics);

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EC4899", "#0EA5E9"];

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 second loading simulation

    return () => clearTimeout(timer);
  }, [range, warehouse, channel]);

  // Update greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[50px] pb-6 px-4">
      <DashboardHeader
        greeting={greeting}
        userName={userLoading ? "..." : user.firstName}
        organization={userLoading ? "..." : user.organization.name}
      />
      
      {error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          <p className="font-medium">Error loading dashboard</p>
          <p className="text-sm mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-sm bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
              
              {/* Left: Range Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {["7D", "30D", "QTD", "YTD", "CUSTOM"].map((key) => (
                  <button
                    key={key}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition 
                      ${
                        range === key
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    onClick={() => setRange(key)}
                  >
                    {key === "7D"
                      ? "Last 7 days"
                      : key === "30D"
                      ? "Last 30 days"
                      : key === "QTD"
                      ? "Quarter-to-date"
                      : key === "YTD"
                      ? "Year-to-date"
                      : "Custom Range"}
                  </button>
                ))}
              </div>

              {/* Right: Filters + Export */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Date Display */}
                <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs hover:border-blue-400 transition cursor-pointer">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  <span className="text-gray-700 whitespace-nowrap">
                    {loading
                      ? "Loading..."
                      : `${trends.dateRange?.start} — ${trends.dateRange?.end}`}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                </div>

                {/* Warehouse Filter */}
                <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs hover:border-blue-400 transition">
                  <Filter className="h-3.5 w-3.5 text-gray-500" />
                  <select
                    className="bg-transparent text-gray-700 focus:outline-none text-xs"
                    value={warehouse}
                    onChange={(e) => setWarehouse(e.target.value)}
                    disabled={loading}
                  >
                    <option value="all">All Warehouses</option>
                    <option value="1">Kampala HQ</option>
                    <option value="2">Gulu Depot</option>
                    <option value="3">Mbarara Hub</option>
                  </select>
                </div>

                {/* Channel Filter */}
                <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs hover:border-blue-400 transition">
                  <Tag className="h-3.5 w-3.5 text-gray-500" />
                  <select
                    className="bg-transparent text-gray-700 focus:outline-none text-xs"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    disabled={loading}
                  >
                    <option value="all">All Channels</option>
                    <option value="online">Online</option>
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                  </select>
                </div>

                {/* Export */}
                <button className="inline-flex items-center gap-1.5 rounded-md bg-gray-950 px-3 py-1.5 text-xs text-white font-medium shadow-sm hover:bg-black transition">
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
              </div>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {loading ? (
              <>
                <KpiSkeleton />
                <KpiSkeleton />
                <KpiSkeleton />
                <KpiSkeleton />
              </>
            ) : (
              <>
                <KpiCard
                  title="Total Sales"
                  value={`UGX ${trends.totals.sales?.toLocaleString()}`}
                  delta={`${trends.changes.sales}% MoM`}
                  positive={Number(trends.changes.sales) >= 0}
                  icon={<DollarSign className="h-5 w-5 text-indigo-600" />}
                />
                <KpiCard
                  title="Total Purchases"
                  value={`UGX ${trends.totals.purchases?.toLocaleString()}`}
                  delta={`${trends.changes.purchases}% MoM`}
                  positive={Number(trends.changes.purchases) < 0}
                  icon={<ShoppingCart className="h-5 w-5 text-emerald-600" />}
                />
                <KpiCard
                  title="Expenses"
                  value={`UGX ${trends.totals.expenses?.toLocaleString()}`}
                  delta={`${trends.changes.expenses}% MoM`}
                  positive={Number(trends.changes.expenses) < 0}
                  icon={<CreditCard className="h-5 w-5 text-rose-600" />}
                />
                <KpiCard
                  title="Gross Margin"
                  value={`UGX ${(trends.totals.sales - trends.totals.purchases - trends.totals.expenses).toLocaleString()}`}
                  delta={`${trends.changes.margin}% MoM`}
                  positive={Number(trends.changes.margin) >= 0}
                  icon={<TrendingUp className="h-5 w-5 text-amber-600" />}
                />
              </>
            )}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {loading ? (
              <>
                <ChartSkeleton />
                <ChartSkeleton />
                <ChartSkeleton />
              </>
            ) : (
              <>
                <SectionCard
                  title="Sales vs Purchases vs Expenses"
                  actions={
                    <div className="text-xs text-gray-500">UGX • {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                  }
                >
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trends.trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                      <BarChart data={categories} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              </>
            )}
          </div>

          {/* Tables & Alerts Row */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {loading ? (
              <>
                <TableSkeleton />
                <ListSkeleton />
                <ListSkeleton />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Activity + At-a-Glance */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {loading ? (
              <>
                <ListSkeleton />
                <TableSkeleton />
                <TableSkeleton />
              </>
            ) : (
              <>
                <SectionCard
                  title="Today's Activity"
                  actions={<div className="text-xs text-gray-500 inline-flex items-center gap-1"><Clock4 className="h-4 w-4" /> Live</div>}
                >
                  <ul className="space-y-3">
                    {activity.map((a, i) => {
                      let icon;
                      switch(a.icon) {
                        case 'check':
                          icon = <CheckCircle2 className="w-3.5 h-3.5" />;
                          break;
                        case 'truck':
                          icon = <Truck className="w-3.5 h-3.5" />;
                          break;
                        case 'credit-card':
                          icon = <CreditCard className="w-3.5 h-3.5" />;
                          break;
                        case 'alert':
                          icon = <AlertTriangle className="w-3.5 h-3.5" />;
                          break;
                        default:
                          icon = <Clock4 className="w-3.5 h-3.5" />;
                      }
                      
                      return (
                        <li key={i} className="flex items-center gap-3">
                          <div className="rounded-lg bg-gray-100 p-2 text-gray-700">{icon}</div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-800">{a.text}</div>
                            <div className="text-xs text-gray-500">{a.ts}</div>
                          </div>
                        </li>
                      );
                    })}
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
                      <p className="mt-2 text-2xl font-semibold">{customerMetrics.newCustomers.count || 0}</p>
                      <div className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs ${customerMetrics.newCustomers.increasing ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {customerMetrics.newCustomers.increasing ? 
                          <TrendingUp className="mr-1 h-3.5 w-3.5" /> : 
                          <TrendingDown className="mr-1 h-3.5 w-3.5" />
                        }
                        {customerMetrics.newCustomers.change}%
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">Open Orders</p>
                        <ShoppingCart className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="mt-2 text-2xl font-semibold">{customerMetrics.openOrders.count || 0}</p>
                      <div className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs ${customerMetrics.openOrders.increasing ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {customerMetrics.openOrders.increasing ? 
                          <TrendingUp className="mr-1 h-3.5 w-3.5" /> : 
                          <TrendingDown className="mr-1 h-3.5 w-3.5" />
                        }
                        {customerMetrics.openOrders.change}%
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
                      <p className="mt-2 text-2xl font-semibold">{fulfillmentMetrics.readyToShip || 0}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 p-3">
                      <p className="text-xs text-gray-500">In Transit</p>
                      <p className="mt-2 text-2xl font-semibold">{fulfillmentMetrics.inTransit || 0}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 p-3">
                      <p className="text-xs text-gray-500">Delivered</p>
                      <p className="mt-2 text-2xl font-semibold">{fulfillmentMetrics.delivered || 0}</p>
                    </div>
                  </div>
                </SectionCard>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
