import { X, Shield, Send, CheckCircle } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { Inquiry } from "../types";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  onSubmitInquiry: (inq: Omit<Inquiry, "id" | "createdAt" | "status">) => Promise<void>;
}

export default function InquiryModal({ isOpen, onClose, serviceName, onSubmitInquiry }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `I would like to apply for and get details about ${serviceName}. Please provide plan recommendations and a premium quote.`
      });
    }
  }, [isOpen, serviceName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setError("Please fill out your Name, Phone Number, and Message.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: serviceName,
        message: formData.message,
        type: "Inquiry"
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Failed to submit insurance inquiry:", err);
      setError("We encountered an error. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="inquiry_modal_container">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden" id="inquiry_modal_body">
        
        {/* Header */}
        <div className="bg-[#EAF3FF] px-6 py-5 flex items-center justify-between border-b border-blue-50">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#1E5EFF]" />
            <h3 className="text-lg font-extrabold text-[#222222]">Inquire: {serviceName}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white text-[#666666] hover:text-[#222222] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4" id="modal_success_state">
              <div className="mx-auto bg-emerald-50 text-emerald-500 p-3.5 rounded-full w-fit">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-bold text-[#222222]">Request Received</h4>
              <p className="text-xs text-[#666666] leading-relaxed max-w-sm mx-auto">
                Your inquiry for <strong>{serviceName}</strong> has been logged. Advisor Vijay Sahu will compile policy quotes and reach out on your mobile number shortly.
              </p>
              <button
                onClick={onClose}
                className="bg-[#1E5EFF] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="modal_inquiry_form">
              {error && (
                <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-xs font-semibold border border-rose-100">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1">
                <label htmlFor="modal_name" className="text-[10px] font-bold text-[#222222] uppercase tracking-wide">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  id="modal_name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="E.g., Rakesh Kumar Dewangan"
                  className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Phone & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="modal_phone" className="text-[10px] font-bold text-[#222222] uppercase tracking-wide">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="modal_phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="E.g., 9876543210"
                    className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="modal_email" className="text-[10px] font-bold text-[#222222] uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="modal_email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E.g., rakesh@example.com"
                    className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="modal_message" className="text-[10px] font-bold text-[#222222] uppercase tracking-wide">
                  Message / Policy Requirements *
                </label>
                <textarea
                  id="modal_message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1E5EFF] hover:bg-[#1E5EFF]/90 disabled:bg-blue-300 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
                id="modal_submit_btn"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <span>Submit Quote Request</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
