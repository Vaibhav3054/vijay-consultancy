import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import { CMSContent, Inquiry } from "../types";
import { motion } from "motion/react";

interface ContactProps {
  cms: CMSContent;
  onSubmitInquiry: (inq: Omit<Inquiry, "id" | "createdAt" | "status">) => Promise<void>;
}

export default function Contact({ cms, onSubmitInquiry }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "General Insurance Consultation",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const servicesList = [
    "General Insurance Consultation",
    "Life Insurance Plans",
    "Health Insurance cover",
    "Vehicle / Auto Insurance",
    "Commercial Property / Shop Insurance",
    "Warehouse Protection",
    "Claim Settlement Support",
    "Policy Renewals",
    "Other Services"
  ];

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
        service: formData.service,
        message: formData.message,
        type: "Contact"
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "General Insurance Consultation",
        message: ""
      });
    } catch (err: any) {
      console.error("Inquiry submission failed:", err);
      setError("An error occurred. Please try again or reach out on WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#1E5EFF] uppercase mb-3">Get in Touch</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            Schedule a Free Insurance Consultation
          </p>
          <div className="h-1 w-20 bg-[#1E5EFF] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-2xl font-bold text-[#222222]">
              Office Information
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
              Have an urgent claim or renewal question? Reach out through any of our channels or drop by our Raipur office during work hours.
            </p>

            {/* Contact list cards */}
            <div className="space-y-4" id="contact_info_cards">
              {/* Phone */}
              <div className="flex gap-4 p-5 bg-[#F6F8FB] rounded-2xl border border-gray-50 hover:border-blue-100 transition-colors">
                <div className="bg-[#EAF3FF] p-3 rounded-xl text-[#1E5EFF] h-fit">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider block">Call or WhatsApp</span>
                  <a href={`tel:${cms.contact.phone}`} className="text-sm font-extrabold text-[#222222] hover:text-[#1E5EFF] transition-colors mt-0.5 block">
                    {cms.contact.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 p-5 bg-[#F6F8FB] rounded-2xl border border-gray-50 hover:border-blue-100 transition-colors">
                <div className="bg-[#EAF3FF] p-3 rounded-xl text-[#1E5EFF] h-fit">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider block">Email Address</span>
                  <a href={`mailto:${cms.contact.email}`} className="text-sm font-extrabold text-[#222222] hover:text-[#1E5EFF] transition-colors mt-0.5 block break-all">
                    {cms.contact.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 p-5 bg-[#F6F8FB] rounded-2xl border border-gray-50 hover:border-blue-100 transition-colors">
                <div className="bg-[#EAF3FF] p-3 rounded-xl text-[#1E5EFF] h-fit shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider block">Head Office</span>
                  <p className="text-xs sm:text-sm text-[#222222] font-semibold mt-0.5 leading-relaxed">
                    {cms.contact.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 p-5 bg-[#F6F8FB] rounded-2xl border border-gray-50 hover:border-blue-100 transition-colors">
                <div className="bg-[#EAF3FF] p-3 rounded-xl text-[#1E5EFF] h-fit">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider block">Working Hours</span>
                  <p className="text-xs sm:text-sm text-[#222222] font-semibold mt-0.5">
                    {cms.contact.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Map iframe */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm aspect-video w-full relative">
              <iframe
                title="Office Location Map"
                src={cms.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#F6F8FB] border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm"
            >
              {submitted ? (
                <div className="text-center py-12 space-y-4" id="contact_form_success">
                  <div className="mx-auto bg-emerald-50 text-emerald-500 p-4 rounded-full w-fit">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#222222]">Inquiry Submitted!</h4>
                  <p className="text-sm text-[#666666] max-w-md mx-auto">
                    Thank you for reaching out to Vijay Consultancy. Advisor Vijay Kumar Sahu will review your request and get back to you within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-[#1E5EFF] font-bold text-sm hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="contact_form">
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-[#222222]">Send a Message</h4>
                    <p className="text-xs text-[#666666]">Submit your request below, and we'll contact you shortly.</p>
                  </div>

                  {error && (
                    <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-xs font-semibold border border-rose-100">
                      {error}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-[#222222] uppercase tracking-wide">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g., Rakesh Dewangan"
                        className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors shadow-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-[#222222] uppercase tracking-wide">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="E.g., +91 9876543210"
                        className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-[#222222] uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="E.g., rakesh@example.com"
                        className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors shadow-sm"
                      />
                    </div>

                    {/* Service Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="service" className="text-xs font-bold text-[#222222] uppercase tracking-wide">
                        Insurance Service
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors shadow-sm"
                      >
                        {servicesList.map((srv, idx) => (
                          <option key={idx} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-[#222222] uppercase tracking-wide">
                      Consultation Details / Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your insurance requirement, current policies (if any), or claims help needed..."
                      className="w-full bg-white border border-gray-200 focus:border-[#1E5EFF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1E5EFF] hover:bg-[#1E5EFF]/90 disabled:bg-blue-300 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
                    id="btn_submit_contact"
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
