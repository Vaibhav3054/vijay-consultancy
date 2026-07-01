import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, User, Trash2 } from "lucide-react";
import { Customer } from "../../types";
import toast from "react-hot-toast";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCustomers = async (phone = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/customers?phone=${encodeURIComponent(phone)}`);
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (err) {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers(searchPhone);
    if (searchPhone && customers.length === 1) {
      navigate(`/admin/customers/${customers[0].mobile_number}`);
    }
  };

  const handleDelete = async (mobile: string) => {
    if (!window.confirm("Are you sure you want to delete this customer? This will also delete all policies and documents linked to them.")) return;
    
    try {
      const res = await fetch(`/api/customers/${mobile}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Customer deleted");
        fetchCustomers(searchPhone);
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Customers</h1>
          <p className="text-gray-500 mt-1">Manage your consultancy clients.</p>
        </div>
        
        <Link 
          to="/admin/customers/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E5EFF] text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-[#1E5EFF]/20"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Mobile Number..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1E5EFF] focus:ring-1 focus:ring-[#1E5EFF] outline-none transition-all"
          />
        </form>
        <button onClick={() => fetchCustomers(searchPhone)} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Customer</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Mobile Number</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-sm">City</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading customers...</td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No customers found.</td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.mobile_number} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1E5EFF]/10 flex items-center justify-center text-[#1E5EFF]">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{c.customer_name}</p>
                          <p className="text-sm text-gray-500">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{c.mobile_number}</td>
                    <td className="px-6 py-4 text-gray-500">{c.city || "-"}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2.5 py-1 bg-green-100 text-green-700 rounded-full">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link 
                        to={`/admin/customers/${c.mobile_number}`}
                        className="inline-block px-3 py-1.5 text-sm font-medium text-[#1E5EFF] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        View
                      </Link>
                      <button 
                        onClick={() => handleDelete(c.mobile_number)}
                        className="inline-block px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
