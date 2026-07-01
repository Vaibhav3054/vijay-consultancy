import { Shield } from "lucide-react";
import { InsuranceCompany } from "../types";
import { motion } from "motion/react";

interface CompanyLogosProps {
  companies: InsuranceCompany[];
}

export default function CompanyLogos({ companies }: CompanyLogosProps) {
  // If empty, show a gentle fallback
  const list = companies.length > 0 ? companies : [
    { id: "lic", name: "LIC of India" },
    { id: "hdfc", name: "HDFC Ergo" },
    { id: "icici", name: "ICICI Lombard" },
    { id: "star", name: "Star Health" }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-50" id="companies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtitle */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-widest text-[#666666] uppercase">
            Authorized Distribution & Service Partners
          </span>
          <p className="text-sm text-[#666666] mt-1 font-medium">
            Representing India's Leading General & Life Insurance Carriers
          </p>
        </div>

        {/* Logos Marquee / Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" id="companies_list">
          {list.map((company, idx) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="px-6 py-4 rounded-2xl bg-[#F6F8FB] border border-gray-100/80 shadow-sm hover:border-blue-200 hover:bg-white transition-all flex items-center gap-2 shrink-0 select-none group"
            >
              <Shield className="h-4 w-4 text-[#1E5EFF]/60 group-hover:text-[#1E5EFF] group-hover:scale-110 transition-all shrink-0" />
              <span className="text-xs font-extrabold text-[#222222] group-hover:text-[#1E5EFF] transition-colors">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
