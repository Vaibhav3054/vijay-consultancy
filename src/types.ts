export interface Customer {
  mobile_number: string;
  customer_name: string;
  father_husband_name?: string;
  dob?: string;
  gender?: string;
  alternate_number?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pin_code?: string;
  occupation?: string;
  aadhaar_number?: string;
  pan_number?: string;
  nominee_name?: string;
  nominee_relation?: string;
  notes?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Policy {
  id: string;
  mobile_number: string;
  policy_number: string;
  policy_type?: string;
  insurance_company?: string;
  plan_name?: string;
  sum_assured?: number;
  premium_amount?: number;
  premium_frequency?: string;
  policy_start_date?: string;
  policy_maturity_date?: string;
  premium_due_date?: string;
  status?: string;
  agent_remarks?: string;
  created_at?: string;
}

export interface PremiumPayment {
  id: string;
  policy_id: string;
  amount: number;
  due_date?: string;
  paid_date?: string;
  status?: string;
  created_at?: string;
}

export interface DocumentRecord {
  id: string;
  mobile_number: string;
  file_name: string;
  file_type: string;
  file_url: string;
  uploaded_at?: string;
}

export interface Activity {
  id: string;
  mobile_number: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface DashboardStats {
  totalCustomers: number;
  activePolicies: number;
  expiringPolicies: number;
  duePremiums: number;
  recentActivities: Activity[];
  recentCustomers: Customer[];
}

export interface InsuranceCompany {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  type: 'Consultation' | 'Inquiry' | 'Callback' | 'Contact';
  status: 'Pending' | 'Contacted' | 'Resolved';
  createdAt: string;
}

export interface CMSContent {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    bio: string;
    experience: string;
    vision: string;
    mission: string;
    whyChooseUs: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    mapEmbedUrl: string;
    workingHours: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    iconName: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}
