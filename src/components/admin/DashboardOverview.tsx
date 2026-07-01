import { useState, useEffect } from "react";
import { Users, FileText, AlertTriangle, ShieldCheck } from "lucide-react";
import { DashboardStats } from "../../types";

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here is the summary of your consultancy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#1E5EFF]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Customers</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Policies</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activePolicies}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Expiring Policies (7d)</p>
            <p className="text-2xl font-bold text-gray-900">{stats.expiringPolicies}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Premiums Due (7d)</p>
            <p className="text-2xl font-bold text-gray-900">{stats.duePremiums}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Customers */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Recently Added Customers</h3>
          </div>
          <div className="p-0 flex-1">
            <ul className="divide-y divide-gray-50">
              {stats.recentCustomers.map((c) => (
                <li key={c.mobile_number} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{c.customer_name}</p>
                    <p className="text-sm text-gray-500">{c.mobile_number}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-0 flex-1 overflow-y-auto max-h-96">
            <ul className="divide-y divide-gray-50">
              {stats.recentActivities.map((a) => (
                <li key={a.id} className="px-6 py-4 flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#1E5EFF]"></div>
                  <div>
                    <p className="text-sm text-gray-900">{a.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(a.timestamp).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
