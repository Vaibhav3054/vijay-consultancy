import { Star, Quote } from "lucide-react";
import { CMSContent } from "../types";
import { motion } from "motion/react";

interface TestimonialsProps {
  cms: CMSContent;
}

export default function Testimonials({ cms }: TestimonialsProps) {
  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#1E5EFF] uppercase mb-3">Client Satisfaction</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            Hear From Our Protected Clients
          </p>
          <div className="h-1 w-20 bg-[#1E5EFF] mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials_list">
          {cms.testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-[#F6F8FB] rounded-3xl p-6 border border-gray-100 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-xs text-[#222222] leading-relaxed italic relative z-10 font-medium">
                  "{test.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-between items-center">
                <div>
                  <span className="text-sm font-bold text-[#222222] block">
                    {test.name}
                  </span>
                  <span className="text-[11px] text-[#666666] font-semibold mt-0.5 block">
                    {test.role}
                  </span>
                </div>
                <Quote className="h-8 w-8 text-blue-500/10 shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
