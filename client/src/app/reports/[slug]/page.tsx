"use client";

import { useTheme } from "next-themes";
import {
  Download,
  Calendar,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import html2canvas from 'html2canvas';
import * as XLSX from "xlsx";

// Dummy data per report slug
const reportData: Record<string, any[]> = {
  "sales-by-customer": [
    { name: "Alice", amount: 1200 },
    { name: "Bob", amount: 800 },
    { name: "Charlie", amount: 950 },
  ],
  "sales-by-item": [
    { name: "Laptop", amount: 1500 },
    { name: "Phone", amount: 1100 },
    { name: "Monitor", amount: 700 },
  ],
  "purchases-by-vendor": [
    { name: "Vendor A", amount: 2000 },
    { name: "Vendor B", amount: 1450 },
    { name: "Vendor C", amount: 1000 },
  ],
  "stock-summary": [
    { name: "Item A", amount: 120 },
    { name: "Item B", amount: 80 },
    { name: "Item C", amount: 45 },
  ],
  "profit-loss": [
    { name: "Jan", income: 4000, expense: 2800 },
    { name: "Feb", income: 4500, expense: 3000 },
    { name: "Mar", income: 4700, expense: 3100 },
  ],
};

const ReportDetailPage = ({ params }: { params: { slug: string } }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerClasses = isDark
    ? "bg-gray-900 text-gray-100"
    : "bg-white text-gray-900";

  const cardClasses = isDark
    ? "bg-gray-800 text-gray-100"
    : "bg-gray-100 text-gray-900";

  const data = reportData[params.slug] || [];

  // Export CSV
  const handleExportCSV = () => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = [headers, rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${params.slug}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export PDF using html2canvas
  const handleExportPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = `${params.slug}.png`;
      downloadLink.click();
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  // Export Excel
  const handleExportExcel = () => {
    if (!data.length) return;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `${params.slug}.xlsx`);
  };

  return (
    <div className={`p-8 min-h-screen ${containerClasses}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold capitalize">
            {params.slug.replace("-", " ")}
          </h1>
          <p className="text-sm opacity-70">
            Detailed analytics and insights
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
          >
            <Download size={16} /> CSV
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm"
          >
            <Download size={16} /> Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
          >
            <Download size={16} /> PDF
          </button>
        </div>
      </div>

      {/* Content to be exported */}
      <div id="report-content">
        {/* Filters */}
        <div
          className={`rounded-lg p-4 mb-8 flex items-center gap-4 shadow ${cardClasses}`}
        >
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm">
            <Calendar size={16} /> Date Range
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm">
            <Filter size={16} /> Advanced Filters
          </button>
        </div>

        {/* Data Table + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data Table */}
          <div className={`rounded-lg shadow p-6 ${cardClasses}`}>
            <h2 className="font-semibold mb-4">Data Table</h2>
            {data.length > 0 ? (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key, i) => (
                      <th
                        key={i}
                        className={`px-3 py-2 text-left border-b ${
                          isDark ? "border-gray-700" : "border-gray-300"
                        }`}
                      >
                        {key.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td
                          key={j}
                          className={`px-3 py-2 border-b ${
                            isDark ? "border-gray-700" : "border-gray-300"
                          }`}
                        >
                          {String (val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-64 flex items-center justify-center text-sm opacity-70">
                No data available
              </div>
            )}
          </div>

          {/* Chart */}
          <div className={`rounded-lg shadow p-6 ${cardClasses}`}>
            <h2 className="font-semibold mb-4">Chart View</h2>
            {params.slug === "profit-loss" ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#22c55e" />
                  <Bar dataKey="expense" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
