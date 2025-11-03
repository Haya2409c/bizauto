"use client";

import { Bell, Sun, DollarSign, Users, Package, MessageSquare, Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const data = [
  { month: "Jan", clients: 45 },
  { month: "Feb", clients: 52 },
  { month: "Mar", clients: 58 },
  { month: "Apr", clients: 65 },
  { month: "May", clients: 72 },
  { month: "Jun", clients: 80 },
];

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (Desktop) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar (Mobile Drawer) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64 bg-white shadow-lg h-full">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b px-4 md:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Hamburger Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 border rounded-md hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Search clients, invoices, products..."
              className="border rounded-lg px-4 py-2 w-full sm:w-80"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5" />
            <Sun className="w-5 h-5" />
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Main Analytics Section */}
        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          <h1 className="text-xl md:text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Comprehensive business insights and performance metrics
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {[
              {
                title: "Total Revenue",
                value: "Rs 328K",
                icon: <DollarSign className="w-5 h-5 text-blue-600" />,
                change: "+12.5%",
                color: "text-green-600",
              },
              {
                title: "Client Growth",
                value: "+78",
                icon: <Users className="w-5 h-5 text-green-600" />,
                change: "+18.2%",
                color: "text-green-600",
              },
              {
                title: "Products Sold",
                value: "16,500",
                icon: <Package className="w-5 h-5 text-purple-600" />,
                change: "+8.3%",
                color: "text-green-600",
              },
              {
                title: "Messages Sent",
                value: "324",
                icon: <MessageSquare className="w-5 h-5 text-orange-500" />,
                change: "-5.4%",
                color: "text-red-500",
              },
            ].map((card, i) => (
              <div key={i} className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  {card.icon}
                </div>
                <h2 className="text-2xl font-semibold">{card.value}</h2>
                <p className={`${card.color} text-sm mt-1`}>{card.change}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-6 overflow-x-auto">
            {["Revenue", "Clients", "Products", "Messages"].map((tab, i) => (
              <button
                key={i}
                className={`px-3 md:px-4 py-2 rounded-full border text-xs md:text-sm font-medium whitespace-nowrap ${
                  tab === "Clients"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chart Section ✅ FIXED HEIGHT */}
          <div className="bg-white border rounded-lg p-4 md:p-6">
            <h2 className="text-gray-700 font-semibold mb-4 text-sm md:text-base">
              Client Growth Over Time
            </h2>
            <div className="w-full h-64"> {/* ✅ Fixed Height */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="month"
                    stroke="#999"
                    fontSize={12}
                    tickMargin={10}
                  />
                  <YAxis stroke="#999" fontSize={12} tickMargin={10} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
