import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Customer, Policy, DocumentRecord } from "../../types";
import toast from "react-hot-toast";

export default function CustomerProfile() {
  const { mobile } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Note: For simplicity, "new" customer creation is handled in this file if mobile === "new"
  const isNew = mobile === "new";

  useEffect(() => {
    if (isNew) {
      setCustomer({
        mobile_number: "",
        customer_name: "",
        status: "Active"
      } as Customer);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(`/api/customers/${mobile}`);
        if (res.ok) {
          const data = await res.json();
          setCustomer(data);
          setPolicies(data.policies || []);
          setDocuments(data.documents || []);
        } else {
          toast.error("Customer not found");
          navigate("/admin/customers");
        }
      } catch (err) {
        toast.error("Error loading profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [mobile, isNew, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer?.mobile_number || !customer?.customer_name) {
      toast.error("Mobile Number and Name are required");
      return;
    }

    const url = isNew ? "/api/customers" : `/api/customers/${mobile}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      toast.success(isNew ? "Customer created!" : "Profile updated!");
      if (isNew) {
        navigate(`/admin/customers/${customer.mobile_number}`);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {isNew ? "New Customer" : "Customer Profile"}
          </h1>
          <p className="text-gray-500 mt-1">{isNew ? "Enter details below" : customer?.mobile_number}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Personal Details</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={customer?.customer_name || ""}
                onChange={e => setCustomer({...customer!, customer_name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1E5EFF] focus:ring-1 focus:ring-[#1E5EFF] outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number * (Primary Key)</label>
              <input
                type="text"
                value={customer?.mobile_number || ""}
                onChange={e => setCustomer({...customer!, mobile_number: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1E5EFF] focus:ring-1 focus:ring-[#1E5EFF] outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                required
                disabled={!isNew}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={customer?.email || ""}
                onChange={e => setCustomer({...customer!, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1E5EFF] focus:ring-1 focus:ring-[#1E5EFF] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={customer?.dob || ""}
                onChange={e => setCustomer({...customer!, dob: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1E5EFF] focus:ring-1 focus:ring-[#1E5EFF] outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1E5EFF] text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-[#1E5EFF]/20"
            >
              {isNew ? "Create Customer" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {!isNew && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Policies</h2>
            <button className="text-sm font-medium text-[#1E5EFF] hover:underline">
              + Add Policy
            </button>
          </div>
          {policies.length === 0 ? (
            <p className="text-gray-500 text-sm">No policies linked to this customer yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {policies.map(p => (
                <div key={p.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{p.policy_number}</p>
                    <p className="text-sm text-gray-500">{p.insurance_company} - {p.policy_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{p.premium_amount}</p>
                    <p className="text-xs text-red-500">Due: {p.premium_due_date || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
