import { CMSContent, InsuranceCompany } from './types';

export const DEFAULT_CMS_CONTENT: CMSContent = {
  hero: {
    title: "Protect What Matters Most",
    subtitle: "Professional guidance and personalized insurance solutions by Vijay Kumar Sahu. Your trusted advisor for Life, Health, Vehicle, and Commercial coverage.",
    ctaPrimary: "Get Free Consultation",
    ctaSecondary: "Explore Services"
  },
  about: {
    title: "Vijay Kumar Sahu",
    bio: "Vijay Kumar Sahu is an experienced Coach, Consultant, and Insurance Advisor with over 15 years of industry experience. He has helped thousands of families and business owners secure their futures through custom-tailored insurance portfolios.",
    experience: "15+ Years of Dedicated Service, 2000+ Satisfied Clients, and over 10 Crore+ Claims Assisted.",
    vision: "To be the most trusted and customer-centric insurance and financial advisory consultancy, ensuring every client feels completely secure and protected.",
    mission: "To deliver personalized, high-value insurance portfolios with absolute transparency, rapid claim assistance, and seamless renewal processes.",
    whyChooseUs: "As an independent advisor, I don't work for one single insurance company—I work for YOU. I analyze multiple carriers to secure the highest coverage at the most competitive premium rates."
  },
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "vijay.insurance@gmail.com",
    address: "Vijay Consultancy, 1st Floor, Royal Arcade, Main Road, Raipur, Chhattisgarh, 492001",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14876.516599292854!2d81.631248!3d21.235122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee1204ff9e240!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1719500000000!5m2!1sen!2sin",
    workingHours: "Monday to Saturday: 10:00 AM - 07:00 PM (Sunday: Closed)"
  },
  services: [
    {
      id: "life",
      title: "Life Insurance",
      description: "Secure your family's future with Term Plans, Whole Life, and Endowment policies customized to your financial goals.",
      iconName: "Shield"
    },
    {
      id: "health",
      title: "Health Insurance",
      description: "Comprehensive medical cover for your family including cashless hospitalization, critical illness, and maternity benefits.",
      iconName: "Heart"
    },
    {
      id: "vehicle",
      title: "Vehicle Insurance",
      description: "Hassle-free coverage for your Car, Bike, or Commercial Vehicle with zero-depreciation and instant road-side assistance.",
      iconName: "Car"
    },
    {
      id: "home",
      title: "Home Insurance",
      description: "Protect your sanctuary against fire, natural disasters, theft, and damage with comprehensive home structure and content cover.",
      iconName: "Home"
    },
    {
      id: "shop",
      title: "Shop Insurance",
      description: "Secure your retail business, inventory, and cash-in-transit with customized retail shop package insurance policies.",
      iconName: "Store"
    },
    {
      id: "warehouse",
      title: "Warehouse Insurance",
      description: "Specialized coverage for high-value logistics, storage facilities, warehouses, and stored goods from potential hazards.",
      iconName: "Warehouse"
    },
    {
      id: "commercial",
      title: "Commercial Insurance",
      description: "Robust risk management and coverage for commercial properties, machinery breakdown, and liability risks.",
      iconName: "Briefcase"
    },
    {
      id: "business",
      title: "Business Insurance",
      description: "Tailored policies for MSMEs and corporate enterprises, covering asset protection, business interruption, and keyman risks.",
      iconName: "Building"
    },
    {
      id: "claims",
      title: "Claim Assistance",
      description: "Stuck with a claim? We provide end-to-end guidance, documentation review, and representation to ensure speedy settlements.",
      iconName: "FileCheck"
    },
    {
      id: "renewal",
      title: "Policy Renewal",
      description: "Never let your policy lapse. Enjoy seamless and instant digital renewal of any insurance policy with zero paperwork gaps.",
      iconName: "RefreshCw"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Rajesh Sharma",
      role: "Business Owner, Raipur",
      text: "Vijay Sahu has been our family's trusted insurance advisor for over 10 years. His guidance on life and health planning has been incredibly reassuring and highly customized.",
      rating: 5
    },
    {
      id: "t2",
      name: "Amit Verma",
      role: "Logistics Manager",
      text: "Outstanding claim support! When our warehouse suffered minor damage, Vijay Sahu was on the ground immediately. He handled the entire claim documentation and got it approved in record time.",
      rating: 5
    },
    {
      id: "t3",
      name: "Neha Gupta",
      role: "Co-Founder, TechStart",
      text: "Highly professional service. He simplified our complex corporate business insurance and found a bundle that saved us 15% on premiums while offering better coverage limits.",
      rating: 5
    }
  ],
  faqs: [
    {
      id: "faq1",
      question: "Why do I need an insurance consultant instead of buying online?",
      answer: "Online portals list standardized products, but an experienced consultant like Vijay Sahu analyzes your exact risks, customizes sum assured limits, uncovers hidden terms, and critically represents you during a claim. Our personalized support ensures your claim actually gets paid."
    },
    {
      id: "faq2",
      question: "What should I do in case of an emergency medical claim?",
      answer: "Inform us immediately on our WhatsApp or phone number. If you are at a network hospital, we will assist you in initiating cashless claims. For reimbursement, we help you compile bills, discharge summaries, and medical reports to ensure error-free submission."
    },
    {
      id: "faq3",
      question: "How far in advance should I plan my policy renewal?",
      answer: "We recommend renewing at least 15 days before expiry. This prevents any premium rate changes, avoids lapse inspection fees (for vehicle policies), and ensures there is no gap in your continuous coverage benefits like waiting period wave-offs."
    }
  ]
};

export const DEFAULT_COMPANIES: InsuranceCompany[] = [
  { id: "lic", name: "LIC of India" },
  { id: "hdfc", name: "HDFC Ergo General Insurance" },
  { id: "icici", name: "ICICI Lombard" },
  { id: "bajaj", name: "Bajaj Allianz" },
  { id: "star", name: "Star Health Insurance" },
  { id: "niva", name: "Niva Bupa Health" },
  { id: "care", name: "Care Health Insurance" },
  { id: "sbi", name: "SBI General Insurance" },
  { id: "future", name: "Future Generali" }
];
