import { Shield, Phone, ArrowRight, Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import { CMSContent } from "../types";

interface NavbarProps {
  cms: CMSContent;
  onNavigate: (path: "home" | "admin") => void;
  currentPath: string;
  onOpenConsultation: () => void;
}

export default function Navbar({ cms, onNavigate, currentPath, onOpenConsultation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (currentPath !== "home") {
      onNavigate("home");
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm" id="nav_container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate("home")}
            id="nav_logo"
          >
            <div className="bg-[#1E5EFF] p-2.5 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#222222] tracking-tight block">
                Vijay Consultancy
              </span>
              <span className="text-xs text-[#666666] font-medium -mt-1 block">
                Insurance & Financial Advisor
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8" id="nav_menu_desktop">
            <button 
              onClick={() => handleNavClick("home")}
              className={`text-sm font-medium hover:text-[#1E5EFF] transition-colors ${currentPath === 'home' ? 'text-[#1E5EFF]' : 'text-[#666666]'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick("services")}
              className="text-sm font-medium text-[#666666] hover:text-[#1E5EFF] transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick("about")}
              className="text-sm font-medium text-[#666666] hover:text-[#1E5EFF] transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick("why-choose-us")}
              className="text-sm font-medium text-[#666666] hover:text-[#1E5EFF] transition-colors"
            >
              Why Us
            </button>
            <button 
              onClick={() => handleNavClick("faqs")}
              className="text-sm font-medium text-[#666666] hover:text-[#1E5EFF] transition-colors"
            >
              FAQs
            </button>
            <button 
              onClick={() => handleNavClick("contact")}
              className="text-sm font-medium text-[#666666] hover:text-[#1E5EFF] transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => onNavigate("admin")}
              className={`flex items-center gap-1 text-sm font-medium hover:text-[#1E5EFF] transition-colors ${currentPath === 'admin' ? 'text-[#1E5EFF]' : 'text-[#666666]'}`}
              id="btn_nav_admin"
            >
              <Settings className="h-4 w-4" />
              CRM Admin
            </button>
          </div>

          {/* Desktop Call / CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${cms.contact.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:text-[#1E5EFF] transition-colors"
            >
              <Phone className="h-4 w-4 text-[#1E5EFF]" />
              <span>{cms.contact.phone}</span>
            </a>
            <button
              onClick={onOpenConsultation}
              className="bg-[#1E5EFF] hover:bg-[#1E5EFF]/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 group cursor-pointer"
              id="btn_consultation_desktop"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => onNavigate("admin")}
              className={`p-2 rounded-xl border border-gray-100 ${currentPath === 'admin' ? 'bg-[#EAF3FF] text-[#1E5EFF]' : 'text-gray-600'}`}
              title="CRM Admin"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-[#1E5EFF] hover:bg-gray-50 focus:outline-none"
              id="btn_mobile_menu_toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white" id="mobile_menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button
              onClick={() => handleNavClick("home")}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-[#222222] hover:bg-[#EAF3FF] hover:text-[#1E5EFF]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("services")}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-[#222222] hover:bg-[#EAF3FF] hover:text-[#1E5EFF]"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-[#222222] hover:bg-[#EAF3FF] hover:text-[#1E5EFF]"
            >
              About Vijay Sahu
            </button>
            <button
              onClick={() => handleNavClick("why-choose-us")}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-[#222222] hover:bg-[#EAF3FF] hover:text-[#1E5EFF]"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick("faqs")}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-[#222222] hover:bg-[#EAF3FF] hover:text-[#1E5EFF]"
            >
              FAQs
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-[#222222] hover:bg-[#EAF3FF] hover:text-[#1E5EFF]"
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate("admin");
              }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-[#222222] hover:bg-[#EAF3FF] hover:text-[#1E5EFF] flex items-center gap-2 text-blue-600"
            >
              <Settings className="h-5 w-5 text-blue-600" />
              CRM Admin Panel
            </button>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-100 px-5 flex flex-col gap-3">
            <a 
              href={`tel:${cms.contact.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#222222]"
            >
              <Phone className="h-4 w-4 text-[#1E5EFF]" />
              <span>{cms.contact.phone}</span>
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#1E5EFF] text-white text-center py-3 rounded-xl text-sm font-semibold shadow-md shadow-blue-500/10"
              id="btn_consultation_mobile"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
