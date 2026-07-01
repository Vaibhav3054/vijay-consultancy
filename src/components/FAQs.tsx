import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import { CMSContent } from "../types";
import { motion } from "motion/react";

interface FAQsProps {
  cms: CMSContent;
}

export default function FAQs({ cms }: FAQsProps) {
  const [openId, setOpenId] = useState<string | null>("faq1");

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-[#F6F8FB]" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#1E5EFF] uppercase mb-3">Help Center</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            Frequently Asked Questions
          </p>
          <div className="h-1 w-20 bg-[#1E5EFF] mx-auto mt-4 rounded-full" />
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faqs_accordions">
          {cms.faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-blue-100 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                  id={`faq_btn_${faq.id}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#1E5EFF] shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-[#222222]">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-[#1E5EFF] shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#666666] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-gray-50 bg-[#F6F8FB]/30">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
