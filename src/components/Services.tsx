import * as LucideIcons from "lucide-react";
import { CMSContent } from "../types";
import { motion } from "motion/react";

interface ServicesProps {
  cms: CMSContent;
  onApplyService: (serviceName: string) => void;
}

// Map of icons from lucide-react to render dynamically
const getIconComponent = (iconName: string) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Shield;
  return <Icon className="h-6 w-6 text-[#1E5EFF]" />;
};

export default function Services({ cms, onApplyService }: ServicesProps) {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#1E5EFF] uppercase mb-3">Our Offerings</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            Comprehensive Insurance & Advisory Services
          </p>
          <p className="text-sm text-[#666666] font-normal leading-relaxed mt-4">
            Protect your life, health, vehicle, business assets, and commercial properties with customized, high-coverage packages.
          </p>
          <div className="h-1 w-20 bg-[#1E5EFF] mx-auto mt-5 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" id="services_grid">
          {cms.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all flex flex-col justify-between"
              id={`service_card_${service.id}`}
            >
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="bg-[#EAF3FF] group-hover:bg-[#1E5EFF] p-3.5 rounded-2xl w-fit transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {getIconComponent(service.iconName)}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-[#222222] tracking-tight group-hover:text-[#1E5EFF] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-xs text-[#666666] leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">Consultation Available</span>
                <button
                  onClick={() => onApplyService(service.title)}
                  className="bg-white hover:bg-[#1E5EFF] text-[#1E5EFF] hover:text-white border border-[#EAF3FF] hover:border-[#1E5EFF] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 group-hover:shadow-md cursor-pointer"
                  id={`btn_apply_${service.id}`}
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
