import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./authService";
import { getCMSContent, getCompanies } from "./dbService";
import { CMSContent, InsuranceCompany } from "./types";
import { DEFAULT_CMS_CONTENT } from "./defaultData";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import CompanyLogos from "./components/CompanyLogos";
import Testimonials from "./components/Testimonials";
import FAQs from "./components/FAQs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InquiryModal from "./components/InquiryModal";
import AdminLogin from "./components/AdminLogin";

// Admin Components to be built later
import AdminLayout from "./components/admin/AdminLayout";
import DashboardOverview from "./components/admin/DashboardOverview";
import CustomerList from "./components/admin/CustomerList";
import CustomerProfile from "./components/admin/CustomerProfile";

function PublicApp() {
  const [cms, setCms] = useState<CMSContent>(DEFAULT_CMS_CONTENT);
  const [companies, setCompanies] = useState<InsuranceCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const liveCms = await getCMSContent();
        const liveComps = await getCompanies();
        setCms(liveCms);
        setCompanies(liveComps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1E5EFF]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col text-[#222222] font-sans antialiased">
      <Navbar 
        cms={cms} 
        currentPath="home"
        onNavigate={(path) => path === "admin" ? navigate("/login") : null}
        onOpenConsultation={() => setSelectedService("General Insurance Consultation")}
      />
      <main className="flex-grow fade-in">
        <Hero cms={cms} onOpenConsultation={() => setSelectedService("General Insurance Consultation")} onScrollToContact={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />
        <Services cms={cms} onApplyService={(s) => setSelectedService(s)} />
        <About cms={cms} />
        <WhyChooseUs />
        <CompanyLogos companies={companies} />
        <Testimonials cms={cms} />
        <FAQs cms={cms} />
        <Contact cms={cms} onSubmitInquiry={async () => {}} />
      </main>
      <Footer cms={cms} onNavigate={(path) => path === "admin" ? navigate("/login") : null} />
      <InquiryModal 
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        serviceName={selectedService || ""}
        onSubmitInquiry={async () => { setSelectedService(null); }}
      />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<PublicApp />} />
        
        <Route path="/login" element={<AdminLogin onLoginSuccess={() => window.location.href = "/admin"} />} />
        
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/:mobile" element={<CustomerProfile />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
