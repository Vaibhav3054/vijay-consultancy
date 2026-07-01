import { Target, Award, Eye, HeartHandshake, Check } from "lucide-react";
import { CMSContent } from "../types";
import { motion } from "motion/react";

interface AboutProps {
  cms: CMSContent;
}

export default function About({ cms }: AboutProps) {
  return (
    <section className="py-20 bg-[#F6F8FB] overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#1E5EFF] uppercase mb-3">About the Advisor</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            Meet Vijay Kumar Sahu
          </p>
          <div className="h-1 w-20 bg-[#1E5EFF] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Illustration / Photo Placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md aspect-[3/4] rounded-3xl bg-white p-6 shadow-xl border border-gray-100 flex flex-col justify-between overflow-hidden group"
            >
              {/* Background gradient block */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#EAF3FF]/40 to-[#EAF3FF]/10 opacity-60 rounded-3xl" />
              
              {/* Decorative shield outline watermark */}
              <div className="absolute -right-12 -bottom-12 h-44 w-44 rounded-full border-4 border-blue-500/5 flex items-center justify-center">
                <div className="h-28 w-28 rounded-full border-4 border-blue-500/5" />
              </div>

              {/* Avatar Placeholder Illustration */}
              <div className="my-auto flex flex-col items-center justify-center space-y-4 z-10">
                <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  VS
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-extrabold text-[#222222]">Vijay Kumar Sahu</h3>
                  <p className="text-[#1E5EFF] text-xs font-bold uppercase tracking-widest mt-1">
                    Coach • Consultant • Advisor
                  </p>
                  <p className="text-xs text-[#666666] font-medium mt-1">Based in Raipur, CG, India</p>
                </div>
              </div>

              {/* Quick bio footer inside photo box */}
              <div className="bg-[#F6F8FB] p-4 rounded-2xl border border-gray-100 text-center z-10">
                <span className="text-xs font-extrabold text-[#222222] block uppercase tracking-wide">License Status</span>
                <span className="text-[11px] text-[#666666] font-semibold mt-0.5 block">IRDAI Certified Insurance Advisor</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Information / Vision / Mission */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-[#222222]">
                Your Security is My Full-Time Mission
              </h3>
              <p className="text-base text-[#666666] leading-relaxed">
                {cms.about.bio}
              </p>
              <div className="flex items-start gap-3 bg-[#EAF3FF]/60 p-4 rounded-2xl border border-[#1E5EFF]/10">
                <Award className="h-6 w-6 text-[#1E5EFF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-[#222222] block">Verified Accomplishments</span>
                  <span className="text-sm text-[#666666] font-normal leading-relaxed">{cms.about.experience}</span>
                </div>
              </div>
            </motion.div>

            {/* Vision & Mission Bento-like layout */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Vision Card */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="bg-[#EAF3FF] p-2.5 rounded-xl w-fit">
                  <Eye className="h-5 w-5 text-[#1E5EFF]" />
                </div>
                <h4 className="text-lg font-bold text-[#222222]">Our Vision</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {cms.about.vision}
                </p>
              </motion.div>

              {/* Mission Card */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="bg-[#EAF3FF] p-2.5 rounded-xl w-fit">
                  <Target className="h-5 w-5 text-[#1E5EFF]" />
                </div>
                <h4 className="text-lg font-bold text-[#222222]">Our Mission</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {cms.about.mission}
                </p>
              </motion.div>

            </div>

            {/* Why Choose Him section */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
            >
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-[#1E5EFF]" />
                <h4 className="text-lg font-bold text-[#222222]">Why Choose Me?</h4>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                {cms.about.whyChooseUs}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 p-1 rounded-full shrink-0">
                    <Check className="h-3 w-3 text-[#1E5EFF]" />
                  </div>
                  <span className="text-xs font-bold text-[#222222]">Independent & Unbiased</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 p-1 rounded-full shrink-0">
                    <Check className="h-3 w-3 text-[#1E5EFF]" />
                  </div>
                  <span className="text-xs font-bold text-[#222222]">24/7 Claim Escalation</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
