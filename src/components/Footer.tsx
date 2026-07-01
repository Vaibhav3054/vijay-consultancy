import { Shield, Phone, Mail, MapPin, ArrowUp, Facebook, Linkedin, Twitter } from "lucide-react";
import { CMSContent } from "../types";

interface FooterProps {
  cms: CMSContent;
  onNavigate: (path: "home" | "admin") => void;
}

export default function Footer({ cms, onNavigate }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (sectionId: string) => {
    onNavigate("home");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer className="bg-[#222222] text-white pt-16 pb-8 border-t border-gray-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("home")}>
              <div className="bg-[#1E5EFF] p-2.5 rounded-xl">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  Vijay Consultancy
                </span>
                <span className="text-[10px] text-gray-400 font-medium block">
                  Insurance & Financial Advisor
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Providing expert, unbiased insurance planning and quick claims assistance under the leadership of advisor Vijay Kumar Sahu.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold text-white tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => handleLinkClick("home")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("about")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  About Vijay Sahu
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("why-choose-us")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("faqs")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("contact")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Insurance Services Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-white tracking-widest uppercase">Our Key Services</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  Life Insurance Plans
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  Health & Cashless Cover
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  Vehicle & Car Insurance
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  Warehouse & Property Insurance
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("services")} className="hover:text-white hover:underline transition-all cursor-pointer">
                  Claim & Renewal Assistance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4 text-xs text-gray-400">
            <h4 className="text-xs font-extrabold text-white tracking-widest uppercase">Office Address</h4>
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 text-[#1E5EFF] shrink-0 mt-0.5" />
                <span>{cms.contact.address}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-[#1E5EFF] shrink-0" />
                <a href={`tel:${cms.contact.phone}`} className="hover:text-white transition-colors">{cms.contact.phone}</a>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-[#1E5EFF] shrink-0" />
                <a href={`mailto:${cms.contact.email}`} className="hover:text-white transition-colors break-all">{cms.contact.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            <span>© {new Date().getFullYear()} Vijay Consultancy. All Rights Reserved. </span>
            <span className="block sm:inline sm:ml-2 text-gray-600">IRDAI Certification No: IRDA/COMP/VIJAY/2026</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-white hover:underline">Terms of Service</a>
            <button
              onClick={handleScrollToTop}
              className="p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
