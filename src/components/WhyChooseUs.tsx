import { ShieldCheck, Zap, Handshake, Sparkles, PiggyBank, FileStack } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    id: "expert",
    title: "Expert Advice",
    description: "Personalized mapping of premium limits and sum assured based on over 15 years of industry experience.",
    icon: ShieldCheck,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    id: "claim",
    title: "Quick Claim Support",
    description: "End-to-end guidance, coordination, and rapid documentation submission to resolve claims without hassle.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    id: "trust",
    title: "Trusted Consultant",
    description: "Certified advisor representing you, not individual corporate insurance brands. Fully transparent.",
    icon: Handshake,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    id: "personal",
    title: "Personalized Plans",
    description: "No cookie-cutter portfolios. Plans are selected specifically for your family and cashflow constraints.",
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    id: "affordable",
    title: "Affordable Premiums",
    description: "Comparing dozens of top-rated private and public insurers to secure maximum coverage at lowest cost.",
    icon: PiggyBank,
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  {
    id: "fast",
    title: "Fast Documentation",
    description: "Streamlined online application procedures with 100% compliant digital signatures and zero delays.",
    icon: FileStack,
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#F6F8FB]" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#1E5EFF] uppercase mb-3">Consultancy Benefits</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            Why Hundreds of Families Trust Vijay Kumar Sahu
          </p>
          <div className="h-1 w-20 bg-[#1E5EFF] mx-auto mt-4 rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" id="benefits_grid">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex gap-4"
              >
                <div className={`${benefit.bg} ${benefit.color} p-3.5 rounded-2xl h-fit shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#222222] tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
