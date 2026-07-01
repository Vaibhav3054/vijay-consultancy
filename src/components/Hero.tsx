import { Shield, Sparkles, FileText, CheckCircle2, UserCheck } from "lucide-react";
import { CMSContent } from "../types";
import { motion } from "motion/react";

interface HeroProps {
  cms: CMSContent;
  onOpenConsultation: () => void;
  onScrollToContact: () => void;
}

export default function Hero({ cms, onOpenConsultation, onScrollToContact }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-20 lg:pt-16 lg:pb-32" id="home">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f4f8_1px,transparent_1px),linear-gradient(to_bottom,#f0f4f8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-50/50 blur-3xl" />
      <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-[#EAF3FF]/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF3FF] text-[#1E5EFF] text-xs font-semibold tracking-wide uppercase"
            >
              <Sparkles className="h-4 w-4" />
              <span>Vijay Consultancy • Registered Advisor</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#222222] tracking-tight leading-tight"
              id="hero_title"
            >
              {cms.hero.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#666666] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
              id="hero_subtitle"
            >
              {cms.hero.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero_ctas"
            >
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto bg-[#1E5EFF] hover:bg-[#1E5EFF]/90 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all cursor-pointer"
                id="btn_hero_primary"
              >
                {cms.hero.ctaPrimary}
              </button>
              <button
                onClick={onScrollToContact}
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#222222] border border-gray-200 px-8 py-4 rounded-2xl text-base font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                id="btn_hero_secondary"
              >
                {cms.hero.ctaSecondary}
              </button>
            </motion.div>

            {/* Value Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#1E5EFF] shrink-0" />
                <span className="text-sm font-medium text-[#222222]">100% Secure Claims</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#1E5EFF] shrink-0" />
                <span className="text-sm font-medium text-[#222222]">Expert Coaching</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="h-5 w-5 text-[#1E5EFF] shrink-0" />
                <span className="text-sm font-medium text-[#222222]">Instant Renewal</span>
              </div>
            </motion.div>
          </div>

          {/* Right side interactive illustration */}
          <div className="lg:col-span-5 mt-16 lg:mt-0 flex justify-center relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-blue-500 to-blue-600 p-8 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Glowing circles decoration inside card */}
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-400/30 blur-2xl" />
              <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-xl" />

              <div className="flex justify-between items-start z-10">
                <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-xs font-semibold text-white tracking-wider uppercase">Active Coverage</span>
                </div>
              </div>

              {/* Central Premium Graphic */}
              <div className="my-auto py-6 space-y-4 z-10">
                <h3 className="text-3xl font-extrabold text-white leading-tight">
                  Protecting <br />Families & Businesses
                </h3>
                <p className="text-blue-50/90 text-sm font-medium">
                  Vijay Kumar Sahu provides personalized expert planning and fast-track support in Raipur & beyond.
                </p>
              </div>

              {/* Interactive sub-components inside illustration representing policies */}
              <div className="grid grid-cols-2 gap-3 z-10 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                  <UserCheck className="h-4 w-4 text-white" />
                  <span className="text-xs font-bold text-white">2000+ Clients</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                  <FileText className="h-4 w-4 text-white" />
                  <span className="text-xs font-bold text-white">Fast Settlement</span>
                </div>
              </div>
            </motion.div>

            {/* Mini floating card 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-8 -left-6 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3"
            >
              <div className="bg-emerald-50 p-2 rounded-xl">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <span className="text-[10px] text-[#666666] font-semibold block">Health Claim Approved</span>
                <span className="text-xs font-bold text-[#222222]">₹8.4 Lakhs Disbursed</span>
              </div>
            </motion.div>

            {/* Mini floating card 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3"
            >
              <div className="bg-[#EAF3FF] p-2 rounded-xl">
                <Shield className="h-5 w-5 text-[#1E5EFF]" />
              </div>
              <div>
                <span className="text-[10px] text-[#666666] font-semibold block">Life Insurance Sum Insured</span>
                <span className="text-xs font-bold text-[#222222]">₹2.5 Crore Secured</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
