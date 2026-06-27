import React, { useState, useEffect, useRef } from "react";
import { 
  Check, 
  CheckCircle2, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Star, 
  BookOpen, 
  Users, 
  Award, 
  DollarSign, 
  Globe, 
  Percent, 
  Clock, 
  Lock, 
  Shield, 
  FileText, 
  Laptop, 
  Search, 
  Filter, 
  Briefcase, 
  Calendar, 
  ArrowUp, 
  Menu, 
  XCircle, 
  Plus, 
  Minus, 
  Send, 
  FileCheck2, 
  TrendingUp, 
  UserCheck, 
  Download, 
  Scale
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import local faculty & logo assets
import logo from "@/assets/logo.webp";
import tanujKalia from "@/assets/Tanuj-Kalia.webp";
import pranjalDoshi from "@/assets/Pranjal-Doshi.webp";
import shashankSardesai from "@/assets/Shashank-Sardesai.webp";
import shayoneeDasgupta from "@/assets/Shayonee-Dasgupta_Faculty_0012_Group-9.webp";
import bhumeshVarma from "@/assets/Bhumesh-Varma_Faculty_0017_Group-4.webp";
import debanshuKhettry from "@/assets/Debanshu-Khettry-Faculty_0015_Group-6.webp";
import akankshaMishra from "@/assets/Akanksha-Mishra.webp";
import anupMenon from "@/assets/Anup-Menon.webp";

// ---------------------------------------------------------
// DATA CONFIGURATIONS
// ---------------------------------------------------------

const CONTRACTS_DATA = [
  { id: "1", name: "One-way Non-Disclosure Agreement (NDA)", category: "general", complexity: "Easy", duration: "1 Week", value: 150, description: "Protects proprietary business data during initial deal evaluation. High volume, essential standard." },
  { id: "2", name: "Mutual Non-Disclosure Agreement", category: "general", complexity: "Easy", duration: "1 Week", value: 200, description: "Protects two-way disclosure of confidential information. High freelance demand." },
  { id: "3", name: "Software-as-a-Service (SaaS) SLA Agreement", category: "tech", complexity: "Advanced", duration: "3 Weeks", value: 1200, description: "Governs cloud software delivery, uptimes, remedies, and support obligations." },
  { id: "4", name: "Co-Founder Agreement (with equity vesting)", category: "corporate", complexity: "Medium", duration: "2 Weeks", value: 800, description: "Regulates early equity split, IP assignments, vesting schedules, and co-founder exits." },
  { id: "5", name: "Shareholders' Agreement (SHA)", category: "corporate", complexity: "Advanced", duration: "4 Weeks", value: 1800, description: "Specifies minority rights, tag-along/drag-along, exit options, and board representation." },
  { id: "6", name: "Intellectual Property (IP) Assignment Deed", category: "tech", complexity: "Medium", duration: "1 Week", value: 500, description: "Legally transfers IP rights from independent contractors/founders to the business." },
  { id: "7", name: "Master Service Agreement (MSA)", category: "general", complexity: "Advanced", duration: "3 Weeks", value: 1500, description: "Framework contract governing long-term commercial relationships and multiple statements of work." },
  { id: "8", name: "SaaS Terms of Service (ToS)", category: "tech", complexity: "Medium", duration: "2 Weeks", value: 900, description: "Governs platform usage, payment policies, user-generated content, and liability limits." },
  { id: "9", name: "Employment Contract (with Restrictive Covenants)", category: "employment", complexity: "Medium", duration: "2 Weeks", value: 450, description: "Protects proprietary data with non-competes, non-solicits, and IP ownership clauses." },
  { id: "10", name: "Independent Contractor / Freelance Agreement", category: "employment", complexity: "Easy", duration: "1 Week", value: 350, description: "Ensures professional results, clear payment milestones, and IP assignment." },
  { id: "11", name: "Software Development & IP Licensing Agreement", category: "tech", complexity: "Advanced", duration: "3 Weeks", value: 1400, description: "Outlines custom code deliverables, milestones, acceptance criteria, and license scopes." },
  { id: "12", name: "Trademark Licensing Agreement", category: "corporate", complexity: "Medium", duration: "2 Weeks", value: 750, description: "Grants commercial permission to exploit brands, logos, or trading styles securely." },
  { id: "13", name: "Memorandum of Understanding (MOU)", category: "general", complexity: "Easy", duration: "1 Week", value: 250, description: "Sets out high-level principles of understanding before drafting standard agreements." },
  { id: "14", name: "Comprehensive Franchise Agreement", category: "corporate", complexity: "Advanced", duration: "4 Weeks", value: 2000, description: "Permits franchisees to launch regional operations under strict system/brand compliance." },
  { id: "15", name: "Share Purchase Agreement (SPA)", category: "corporate", complexity: "Advanced", duration: "4 Weeks", value: 2500, description: "Governs the transfer of corporate shares, purchase price adjustments, and indemnity caps." },
  { id: "16", name: "Privacy Policy (GDPR & CCPA Compliant)", category: "tech", complexity: "Medium", duration: "2 Weeks", value: 650, description: "Mandatory consumer-facing policy explaining data collection, consent, and user access rights." },
  { id: "17", name: "E-Commerce Website Terms & Conditions", category: "general", complexity: "Easy", duration: "1 Week", value: 300, description: "Manages returns, store policies, payment gateways, and dispute forum limitations." },
  { id: "18", name: "Commercial Agency & Distribution Agreement", category: "general", complexity: "Medium", duration: "2 Weeks", value: 850, description: "Appoints local marketing/selling agents with commission targets and territory protections." },
  { id: "19", name: "Influencer Campaign & Brand Endorsement Contract", category: "tech", complexity: "Easy", duration: "1 Week", value: 400, description: "Specifies content guidelines, posting cadence, usage rights, and moral clauses." },
  { id: "20", name: "Commercial Lease Agreement", category: "general", complexity: "Medium", duration: "2 Weeks", value: 700, description: "Regulates corporate office leases, fit-outs, maintenance, escalations, and defaults." },
  { id: "21", name: "Consultancy & Advisory Services Agreement", category: "employment", complexity: "Easy", duration: "1 Week", value: 400, description: "Appoints specialized domain advisors with stock options, advisory shares, or cash fees." },
  { id: "22", name: "Product Manufacturing & Supply Agreement", category: "general", complexity: "Medium", duration: "3 Weeks", value: 1000, description: "Regulates product specs, QA, minimum orders, delivery terms, and liability limits." },
  { id: "23", name: "Term Sheet (Series Seed / Pre-A Venture Funding)", category: "corporate", complexity: "Advanced", duration: "2 Weeks", value: 900, description: "Sets out funding amounts, liquidation preference, vesting, and anti-dilution rights." },
  { id: "24", name: "Settlement and Mutual Release Agreement", category: "general", complexity: "Medium", duration: "1 Week", value: 600, description: "Resolves ongoing business disputes, ensuring complete waiver of legal claims and non-disparagement." }
];

const CURRICULUM_DATA = [
  {
    month: "1",
    title: "Foundations of Commercial Contracts & Plain English Drafting",
    subtitle: "Ditching Archaic Legalese for Bulletproof Clarity",
    description: "Traditional law schools teach you to write like 18th-century English clerks. We unlearn the clutter and master clean, modern plain English that corporate clients and global courts actively prefer. You'll master the foundational structure of commercial agreements.",
    skills: ["Anatomy of a Contract", "Preamble & Recital Strategies", "Plain English Conversions", "Definitions & Operative Clauses", "Managing Execution & Sign-Offs"],
    contracts: ["One-way NDA", "Mutual NDA", "MOU (Memorandum of Understanding)", "Letter of Intent (LOI)"],
    instructor: "Pranjal Doshi"
  },
  {
    month: "2",
    title: "The Boilerplate Engine & Risk-Allocating Clauses",
    subtitle: "Representations, Warranties, Indemnities & Limits",
    description: "This is where deals are won or lost. You will learn the heavy-hitting transactional components: how to represent and warrant business states, create mutual indemnification paths, and craft robust limitation of liability caps that shield your clients from ruin.",
    skills: ["Reps & Warranties Structuring", "Indemnity & Hold Harmless drafting", "Limitation of Liability Caps", "Force Majeure in a Post-COVID Era", "Dispute Resolution & Governing Law Selection"],
    contracts: ["Master Service Agreement (MSA)", "Commercial Lease Agreement", "Settlement & Mutual Release"],
    instructor: "Shashank Sardesai"
  },
  {
    month: "3",
    title: "Technology Agreements, SaaS & IP Protection",
    subtitle: "Drafting for the Multi-Billion Dollar Digital Economy",
    description: "The digital world operates on SaaS, software licenses, data processing, and IP transfers. Master the specialized terminology needed to draft software SLAs, API integrations, and GDPR-ready privacy policies for scaling global tech companies.",
    skills: ["Software License Scopes", "Uptime & Service Level Standards (SLAs)", "GDPR & CCPA Data Processing Clauses", "IP Assignment & Work-For-Hire deeds", "API Integration Terms"],
    contracts: ["SaaS SLA Agreement", "IP Assignment Deed", "SaaS Terms of Service (ToS)", "Privacy Policy (GDPR Compliant)"],
    instructor: "Anup Menon"
  },
  {
    month: "4",
    title: "Corporate Governance, Equity & Employment",
    subtitle: "Aligning Founders, Key Hires, and Investors",
    description: "Learn how to orchestrate relationships inside scaling startups. You'll master early founder alignment, equity vesting schedules, specialized non-compete covenants, and investment-readiness templates that are worth thousands of dollars.",
    skills: ["Vesting & Acceleration Schedules", "IP Protection in Employment", "Startup Capitalization Table Basics", "Minority Shareholders Safeguards", "Non-Compete Enforceability Rules"],
    contracts: ["Co-Founder Agreement", "Employment Contract", "Independent Contractor Agreement", "Series Seed Term Sheet"],
    instructor: "Bhumesh Varma"
  },
  {
    month: "5",
    title: "Specialised Deals: Franchising, M&A, and Joint Ventures",
    subtitle: "Structuring Advanced Business Partnerships",
    description: "High-value commercial drafting requires looking at complex distributions, local franchising channels, and major corporate buyouts. Learn to handle share sales and regional franchise distribution agreements with multi-million dollar liabilities.",
    skills: ["Franchise Disclosure Documents", "Share Purchases & Target Warranties", "Joint Venture Profit Distributions", "Agency Commission Protections", "Exclusivity & Territory Restrictions"],
    contracts: ["Franchise Agreement", "Share Purchase Agreement (SPA)", "Commercial Agency Agreement", "Product Manufacturing Agreement"],
    instructor: "Debanshu Khettry"
  },
  {
    month: "6",
    title: "The Legal Freelancer's Client Acquisition Playbook",
    subtitle: "Turning Drafting Craft into International Freelance Dollars",
    description: "Being a elite drafter is only half the battle. This module is our crown jewel: We teach you how to set up highly optimized Upwork & Fiverr profiles, draft high-conversion proposals, price your projects, leverage LinkedIn for inbound leads, and build a $5k+/mo freelance business.",
    skills: ["Upwork & Fiverr SEO Optimization", "Winning Proposal Outlines", "Value-Based Project Pricing", "Client Onboarding & Retainer Strategies", "Managing Payments, Escrow & Invoices"],
    contracts: ["Freelance Proposal Templates", "Freelancer Master Retainer Contract", "Consultancy Services Agreement"],
    instructor: "Akanksha Mishra"
  }
];

const FACULTY_DATA = [
  {
    name: "Tanuj Kalia",
    role: "Founder & CEO, Lawctopus",
    description: "Author of the bestselling 'Law as a Career'. Pioneer of digital legal education in India who has helped 50,000+ law students build high-growth legal careers.",
    image: tanujKalia,
    tag: "Founder & Mentor"
  },
  {
    name: "Pranjal Doshi",
    role: "Lead Course Designer & Instructor",
    description: "Senior Corporate Lawyer with years of specialization in drafting high-stake venture financing and tech transactions. Known for hyper-pragmatic teaching.",
    image: pranjalDoshi,
    tag: "Core Faculty"
  },
  {
    name: "Shashank Sardesai",
    role: "Commercial Contracts Consultant",
    description: "Partner at Sardesai Partners. Specializes in multi-jurisdictional procurement agreements, global construction contracts, and commercial arbitration.",
    image: shashankSardesai,
    tag: "Commercial Law Expert"
  },
  {
    name: "Shayonee Dasgupta",
    role: "Corporate Counsel & Trainer",
    description: "Ex-Corporate Associate at Top-Tier Law Firms. Extensively drafts complex investment, tech, and content contracts for global corporations.",
    image: shayoneeDasgupta,
    tag: "Corporate Drafting Mentor"
  },
  {
    name: "Bhumesh Varma",
    role: "Managing Partner, CorpComm Legal",
    description: "Veteran corporate lawyer with 30+ years of legal practice. Author of landmark books on contract drafting. Ex-Partner at Link Legal & Luthra.",
    image: bhumeshVarma,
    tag: "Senior Legal Advisor"
  },
  {
    name: "Debanshu Khettry",
    role: "Corporate & Litigation Expert",
    description: "Partner at Khettry Chambers. Expert in cross-border JVs, corporate restructurings, high-value commercial leases, and litigation-proofing contracts.",
    image: debanshuKhettry,
    tag: "Litigation & JV Expert"
  },
  {
    name: "Akanksha Mishra",
    role: "Legal Freelancing Specialist",
    description: "Top-Rated Plus Legal Freelancer on Upwork. Successfully drafts 100+ international contracts annually, earning $8,000+ monthly from remote clients.",
    image: akankshaMishra,
    tag: "Freelancing Mentor"
  },
  {
    name: "Anup Menon V",
    role: "Technology & IP Counsel",
    description: "Tech Counsel representing global SaaS brands and enterprise IT players. Deep specialization in cloud SLAs, AI API liability, and data privacy.",
    image: anupMenon,
    tag: "SaaS & IP Counsel"
  }
];

const TESTIMONIALS_DATA = [
  {
    quote: "I landed my first Upwork client—drafting a SaaS Service Agreement for an Austin-based software startup—just 3 months into the course! The contract alone paid me $1,200. The 1-on-1 feedback on my mock assignments in this course made all the difference. I knew exactly what clauses were critical.",
    author: "Rohan Deshmukh",
    role: "Legal Freelancer & Practicing Advocate",
    rating: 5,
    tag: "Freelancer Success"
  },
  {
    quote: "Traditional legal education completely failed to teach me contract drafting. In this course, I drafted 24 distinct types of commercial agreements. My senior associate was blown away when I handed in an IP assignment deed with airtight indemnification caps. Highly recommend this to all corporate lawyers.",
    author: "Sneha Nair",
    role: "Junior Associate, Trilegal",
    rating: 5,
    tag: "Career Accelerator"
  },
  {
    quote: "The international remote market pays beautifully. Using Akanksha's freelance blueprints from Module 6, I optimized my Upwork profile. I now command $80/hour and have 3 ongoing retainers from US and UK clients. This course doesn't just teach drafting; it teaches the business of legal freelancing.",
    author: "Aditya Kumar",
    role: "Independent Contracts Consultant",
    rating: 5,
    tag: "International Remote Work"
  },
  {
    quote: "As a corporate counsel, I manage hundreds of vendor agreements. This course taught me modern plain English and risk-allocation strategies that cut down our contract negotiation cycles by 40%. The mock exercises were extremely intense and practical.",
    author: "Meera Sen",
    role: "Senior Legal Counsel, FinTech Corp",
    rating: 5,
    tag: "Corporate Counsel Growth"
  }
];

const FAQ_DATA = [
  {
    q: "I am a busy professional or law student. What is the weekly time commitment?",
    a: "The course is structured specifically for busy law students and working professionals. You need to invest 5 to 6 hours per week. Video lectures are pre-recorded so you can watch them at your own convenience, and live interactive webinars/Q&As are hosted on weekends with lifetime recording access available."
  },
  {
    q: "How does the '1-on-1 personalized feedback' work?",
    a: "Every week, you will submit a drafting assignment based on real-world business scenarios. A senior faculty member or drafting evaluator manually reviews your entire contract, line-by-line, highlighting issues in red (e.g., weak liability caps, boilerplate gaps, archaic syntax) and giving clear directions. It mimics working under a rigorous corporate law firm partner."
  },
  {
    q: "I have zero background in freelancing. Can I really find international clients?",
    a: "Absolutely. Module 6 is dedicated entirely to 'The Legal Freelancer's Client Acquisition Masterclass'. We guide you step-by-step: choosing your niche, setting up high-SEO profiles on platforms like Upwork and Fiverr, parsing buyer briefs, drafting unbeatable proposals, and pricing your work. We even provide real-world copy-paste proposal scripts."
  },
  {
    q: "Are the certificates verified? Will they help in job applications?",
    a: "Yes. Lawctopus & Academike is India's most respected legal education brand. Our certificates of excellence carry immense weight with recruiters, and are recognized by 100+ tier-1 law firms, corporate legal teams, and international drafting agencies. Each certificate has a unique, verifiable URL link."
  },
  {
    q: "Is there an installment option available for the course fee?",
    a: "Yes! We offer a 3-Month Interest-Free Installment plan where you pay ₹8,999 per month. You can also avail of a flat discount if you choose our one-time secure payment option of ₹24,500 (saving 30% on the total regular price of ₹35,000)."
  },
  {
    q: "What is your refund policy / 14-Day Performance Guarantee?",
    a: "We are so confident in the value of this course that we offer a 14-Day Performance Guarantee. Enroll, watch the Module 1 lectures, attend the first live class, and look at the templates. If you feel the course isn't completely worth it, write to us within 14 days for an immediate, no-questions-asked refund."
  }
];

// ---------------------------------------------------------
// COMPONENT IMPLEMENTATION
// ---------------------------------------------------------

export default function App() {
  // Navigation & Scroll
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Landing Page State
  const [activeMonth, setActiveMonth] = useState("1");
  const [contractsCategory, setContractsCategory] = useState("all");
  const [contractsSearch, setContractsSearch] = useState("");
  const [pricingCycle, setPricingCycle] = useState<"one-time" | "installment">("one-time");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interactive Live Contract Preview State (Hero section)
  const [previewTab, setPreviewTab] = useState<"amateur" | "expert">("expert");

  // Interactive Calculator State
  const [contractsPerMonth, setContractsPerMonth] = useState(4);
  const [avgFeePerContract, setAvgFeePerContract] = useState(400); // in USD

  // Form States & Validation
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "law-student",
    motivation: "freelance-income",
    payment: "one-time"
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Target references for smooth scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const facultyRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const enrollmentRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for progress bar & back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    setMobileMenuOpen(false);
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filtered contracts
  const filteredContracts = CONTRACTS_DATA.filter((contract) => {
    const matchesCategory = contractsCategory === "all" || contract.category === contractsCategory;
    const matchesSearch = contract.name.toLowerCase().includes(contractsSearch.toLowerCase()) || 
                          contract.description.toLowerCase().includes(contractsSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate Form Completion Progress
  const calculateFormProgress = () => {
    let filled = 0;
    if (formInputs.name.trim() !== "") filled++;
    if (formInputs.email.trim() !== "") filled++;
    if (formInputs.phone.trim() !== "") filled++;
    return Math.round((filled / 3) * 100);
  };

  // Form Submission Handler
  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formInputs.name.trim()) {
      errors.name = "Full Name is required";
    } else if (formInputs.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!formInputs.email.trim()) {
      errors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInputs.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formInputs.phone.trim()) {
      errors.phone = "Phone/WhatsApp Number is required";
    } else if (!/^[0-9+\s-]{8,15}$/.test(formInputs.phone)) {
      errors.phone = "Please enter a valid phone/WhatsApp number";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased relative">
      
      {/* ---------------------------------------------------------
          SCROLL PROGRESS INDICATOR
          --------------------------------------------------------- */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-indigo-600 z-[9999] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />

      {/* ---------------------------------------------------------
          STICKY HEADER & NAVIGATION
          --------------------------------------------------------- */}
      <header className="sticky top-0 w-full bg-white/85 backdrop-blur-md border-b border-slate-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with clean badge */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection(heroRef)} id="nav-logo">
            <img 
              src={logo} 
              alt="Lawctopus Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="hidden md:block h-6 w-px bg-slate-200" />
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider font-mono">
              6-Month Masterclass
            </span>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <button 
              onClick={() => scrollToSection(featuresRef)} 
              className="hover:text-indigo-600 transition-colors py-2 cursor-pointer relative group"
            >
              Benefits
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </button>
            <button 
              onClick={() => scrollToSection(curriculumRef)} 
              className="hover:text-indigo-600 transition-colors py-2 cursor-pointer relative group"
            >
              Curriculum
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </button>
            <button 
              onClick={() => scrollToSection(showcaseRef)} 
              className="hover:text-indigo-600 transition-colors py-2 cursor-pointer relative group"
            >
              24+ Contracts
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </button>
            <button 
              onClick={() => scrollToSection(facultyRef)} 
              className="hover:text-indigo-600 transition-colors py-2 cursor-pointer relative group"
            >
              Faculty
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </button>
            <button 
              onClick={() => scrollToSection(pricingRef)} 
              className="hover:text-indigo-600 transition-colors py-2 cursor-pointer relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </button>
            <button 
              onClick={() => scrollToSection(faqRef)} 
              className="hover:text-indigo-600 transition-colors py-2 cursor-pointer relative group"
            >
              FAQs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection(pricingRef)} 
              className="hidden sm:inline-flex text-xs text-indigo-600 hover:text-indigo-700 font-semibold uppercase tracking-wider font-mono bg-indigo-50/50 hover:bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 transition-all cursor-pointer"
            >
              Installments Available
            </button>
            <button 
              onClick={() => scrollToSection(enrollmentRef)} 
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              id="header-cta"
            >
              Enroll Now <ArrowRight size={15} />
            </button>

            {/* Mobile Menu Icon Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-50 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
              id="mobile-nav-drawer"
            >
              <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
                <button 
                  onClick={() => scrollToSection(featuresRef)} 
                  className="px-4 py-3 text-left font-medium text-slate-700 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all"
                >
                  Core Benefits
                </button>
                <button 
                  onClick={() => scrollToSection(curriculumRef)} 
                  className="px-4 py-3 text-left font-medium text-slate-700 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all"
                >
                  6-Month Curriculum
                </button>
                <button 
                  onClick={() => scrollToSection(showcaseRef)} 
                  className="px-4 py-3 text-left font-medium text-slate-700 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all"
                >
                  24+ Contracts Grid
                </button>
                <button 
                  onClick={() => scrollToSection(facultyRef)} 
                  className="px-4 py-3 text-left font-medium text-slate-700 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all"
                >
                  Meet Faculty
                </button>
                <button 
                  onClick={() => scrollToSection(pricingRef)} 
                  className="px-4 py-3 text-left font-medium text-slate-700 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all"
                >
                  Pricing Details
                </button>
                <button 
                  onClick={() => scrollToSection(faqRef)} 
                  className="px-4 py-3 text-left font-medium text-slate-700 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all"
                >
                  Frequently Asked Questions
                </button>
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <div className="px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-100 text-center">
                    <span className="text-xs font-semibold text-indigo-700 font-mono">
                      Cohort filling: Only 7 seats remaining!
                    </span>
                  </div>
                  <button 
                    onClick={() => scrollToSection(enrollmentRef)} 
                    className="w-full py-3 bg-indigo-600 text-white text-center font-semibold rounded-lg shadow-sm hover:bg-indigo-700"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ---------------------------------------------------------
          HERO SECTION
          --------------------------------------------------------- */}
      <section 
        ref={heroRef} 
        className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#fafbfc]"
        id="hero-section"
      >
        {/* Soft floating background gradient blobs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Core Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200/70 shadow-sm rounded-full text-xs font-medium text-slate-700">
                <Sparkles size={14} className="text-amber-500 fill-amber-500" />
                <span>Next Cohort Starts Soon</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-400 font-mono">Early Bird: Save 30%</span>
              </div>

              {/* Major Display Typography Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">Contract Drafting</span> & Build an Elite Freelance Career
              </h1>

              {/* Factual Sub-headline */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                The absolute most comprehensive, practical, 6-month masterclass designed by corporate lawyers. Learn to draft <span className="font-semibold text-slate-900">24+ commercial agreements</span>, get <span className="font-semibold text-slate-900">1-on-1 personalized feedback</span>, and build a high-income legal freelancing business on Upwork and LinkedIn.
              </p>

              {/* Factual Core Accents */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2 text-slate-700 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <span>24+ Practical Contracts</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <span>1-on-1 Personalized Reviews</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium col-span-2 md:col-span-1">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <span>Upwork & LinkedIn Playbooks</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                <button 
                  onClick={() => scrollToSection(enrollmentRef)} 
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  Enroll Now
                  <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => scrollToSection(curriculumRef)} 
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base rounded-xl border border-slate-200 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  Explore Curriculum
                </button>
              </div>

              {/* Trust Indicators / Social Proof */}
              <div className="pt-4 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <span key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-800 border border-slate-400">
                        {i === 1 ? "🎓" : i === 2 ? "💼" : i === 3 ? "⚖️" : "📈"}
                      </span>
                    ))}
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                      <span className="ml-1.5 text-xs font-bold text-slate-900">4.9/5 Rating</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Trusted by 1,200+ Law Students, Advocates & Consultants
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: High-Craft Interactive Live Contract Preview Stack */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-2xl rotate-3 blur-sm opacity-10" />
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-md sm:max-w-lg mx-auto">
                
                {/* Editor Header Bar */}
                <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-400 font-mono ml-2">contract_evaluator.py</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/15 text-indigo-400 rounded border border-indigo-500/20 font-mono">
                    Live Demo
                  </span>
                </div>

                {/* Switchable Tabs: Amateur vs Expert */}
                <div className="grid grid-cols-2 bg-slate-900/50 border-b border-slate-800 text-xs font-mono">
                  <button 
                    onClick={() => setPreviewTab("amateur")}
                    className={`py-2.5 text-center transition-all cursor-pointer border-r border-slate-800 flex items-center justify-center gap-1.5 ${previewTab === "amateur" ? "bg-slate-900 text-red-400 border-b-2 border-b-red-500" : "text-slate-500 hover:text-slate-300 bg-slate-900/10"}`}
                  >
                    <XCircle size={13} /> Amateur Draft
                  </button>
                  <button 
                    onClick={() => setPreviewTab("expert")}
                    className={`py-2.5 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${previewTab === "expert" ? "bg-slate-900 text-emerald-400 border-b-2 border-b-emerald-500" : "text-slate-500 hover:text-slate-300 bg-slate-900/10"}`}
                  >
                    <CheckCircle2 size={13} /> Lawctopus Expert Draft
                  </button>
                </div>

                {/* Contract Text Body */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 min-h-[280px]">
                  {previewTab === "amateur" ? (
                    <div className="space-y-4">
                      <p className="text-slate-500 italic text-[11px] border-b border-slate-800 pb-2">
                        // Typified raw legalese. Full of archaic repetition & litigation risk.
                      </p>
                      <p className="line-through text-slate-400 decoration-red-500 decoration-2 bg-red-950/20 p-2 rounded">
                        <span className="text-red-400 font-semibold">[1] INDEMNIFICATION:</span> The Vendor shall at all times hereinafter fully save, defend, hold harmless, and indemnify the Client from and against any and all claims, demands, liabilities, actions, suits, or losses whatsoever...
                      </p>
                      <p className="line-through text-slate-400 decoration-red-500 decoration-2 bg-red-950/20 p-2 rounded">
                        <span className="text-red-400 font-semibold">[2] LIABILTIY LIMITATION:</span> There shall be absolutely no liability on the Vendor for any issues arising under this Agreement whatsoever, without limitation...
                      </p>
                      <div className="text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-300 space-y-1">
                        <p className="font-bold flex items-center gap-1"><X size={12} /> Partner Diagnostic Critique:</p>
                        <p className="font-sans text-slate-300">1. Uses archaic repetitive triplets ("save, defend, hold harmless").</p>
                        <p className="font-sans text-slate-300">2. The liability limit is completely unilateral & lacks commercial reasonableness (unenforceable in many courts).</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-slate-500 italic text-[11px] border-b border-slate-800 pb-2">
                        // Modern plain English syntax. Commercially balanced & airtight.
                      </p>
                      <p className="text-slate-300 bg-emerald-950/20 p-2 rounded border-l-2 border-emerald-500">
                        <span className="text-emerald-400 font-semibold">[1] Mutual Indemnity:</span> Each party will indemnify the other against any third-party claims, liabilities, or expenses arising from its breach of Intellectual Property representations under this Agreement.
                      </p>
                      <p className="text-slate-300 bg-emerald-950/20 p-2 rounded border-l-2 border-emerald-500">
                        <span className="text-emerald-400 font-semibold">[2] Liability Cap:</span> Each party's aggregate liability under this Agreement is limited to the total fees paid by Client in the 12 months preceding the claim. This limit does not apply to IP infringement or confidentiality breaches.
                      </p>
                      <div className="text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-emerald-300 space-y-1">
                        <p className="font-bold flex items-center gap-1"><Check size={12} /> Lawctopus Senior Partner Annotation:</p>
                        <p className="font-sans text-slate-300">1. Drafted in plain, direct English—easier to negotiate and enforce.</p>
                        <p className="font-sans text-slate-300">2. Establishes a standard commercial 12-month cap with clear exclusions for critical breaches (IP, NDA) to protect company value.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Editor Footer / Info */}
                <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex justify-between">
                  <span>Lines: 124 | Chars: 4.8k</span>
                  <span>Evaluator Rating: {previewTab === "amateur" ? "34% Fail" : "98% Airtight!"}</span>
                </div>

              </div>

              {/* Hover Badge */}
              <div className="absolute -bottom-4 -right-2 md:bottom-2 md:-right-6 bg-white border border-slate-200 rounded-xl shadow-xl p-4 flex items-center gap-3 max-w-xs">
                <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold font-mono">
                  $80/h
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Average Contract Drafting Freelance Rate</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Based on Upwork Legal Freelance Indices</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          STATISTICS SECTION
          --------------------------------------------------------- */}
      <section 
        className="py-12 bg-white border-y border-slate-100"
        id="statistics-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            <div className="pt-6 lg:pt-0 text-center lg:text-left lg:px-6">
              <p className="text-3xl md:text-4xl font-extrabold text-indigo-600 font-mono">6 Months</p>
              <h3 className="text-sm font-semibold text-slate-900 mt-1 uppercase tracking-wider font-sans">Intensive Training</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Step-by-step guidance from basic syntax to elite commercial clauses.
              </p>
            </div>

            <div className="pt-6 lg:pt-0 text-center lg:text-left lg:px-6">
              <p className="text-3xl md:text-4xl font-extrabold text-indigo-600 font-mono">24+ Drafts</p>
              <h3 className="text-sm font-semibold text-slate-900 mt-1 uppercase tracking-wider font-sans">Drafting Projects</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Build a portfolio of 24 client-ready commercial contracts.
              </p>
            </div>

            <div className="pt-6 lg:pt-0 text-center lg:text-left lg:px-6">
              <p className="text-3xl md:text-4xl font-extrabold text-indigo-600 font-mono">1-on-1 Reviews</p>
              <h3 className="text-sm font-semibold text-slate-900 mt-1 uppercase tracking-wider font-sans">Personalized Feedback</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Every contract assignment manually reviewed line-by-line with markup.
              </p>
            </div>

            <div className="pt-6 lg:pt-0 text-center lg:text-left lg:px-6">
              <p className="text-3xl md:text-4xl font-extrabold text-indigo-600 font-mono">92% Gain</p>
              <h3 className="text-sm font-semibold text-slate-900 mt-1 uppercase tracking-wider font-sans">Career Success Rate</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Alumni report landing high-ticket freelance gigs or law firm roles.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          "WHY CHOOSE THIS COURSE" / CORE VALUE PROPOSITION
          --------------------------------------------------------- */}
      <section 
        ref={featuresRef} 
        className="py-16 lg:py-24 bg-[#fafbfc]"
        id="benefits-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              Core Value Proposition
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Critical Legal Education Gap, Finally Solved.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Traditional law schools teach archaic theory. Working at a law firm expects instant proficiency. We fill this gap by providing an elite commercial-grade drafting lab.
            </p>
          </div>

          {/* Comparison Side-by-Side Table */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* The Theoretical Gap Card */}
            <div className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="bg-red-50/50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
                <h3 className="font-bold text-red-900 flex items-center gap-2 text-base">
                  <XCircle className="text-red-600" size={20} /> Traditional Legal Training
                </h3>
                <span className="text-xs font-mono bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase font-semibold">
                  Obsolete
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0 text-sm">✕</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Archaic & Repetitive Legalese</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Focuses heavily on copying 19th-century templates with phrases like 'witnesseth' or 'hereinbefore' that complicate negotiation.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0 text-sm">✕</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Zero Practical Drafting Mock-ups</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Students read case laws instead of drafting actual commercial NDA, SaaS, SLA, or Investment Term Sheets from clean scratch.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0 text-sm">✕</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">No Structured Direct Feedback</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Assignments receive a single high-level letter grade. No line-by-line annotation, leaving student mistakes uncorrected.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0 text-sm">✕</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Complete Absence of Business Training</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Teaches zero client-acquisition, profile SEO, proposal writing, or remote freelancing. Leaves lawyers broke despite skills.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Lawctopus Solution Card */}
            <div className="bg-white border border-teal-100 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="bg-teal-50/50 px-6 py-4 border-b border-teal-100 flex items-center justify-between">
                <h3 className="font-bold text-teal-900 flex items-center gap-2 text-base">
                  <CheckCircle2 className="text-teal-600" size={20} /> The Lawctopus Mastery Path
                </h3>
                <span className="text-xs font-mono bg-teal-100 text-teal-700 px-2 py-0.5 rounded uppercase font-semibold">
                  Elite Standard
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0 text-sm">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Modern Plain English Strategy</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Learn to write clear, commercially-sound sentences. Highly valued by international corporate clients and modern legal teams.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0 text-sm">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">24+ End-to-End Drafting Projects</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Draft 24 actual contracts. Go step-by-step from NDA, Employment contracts to multi-million dollar SaaS, SHA, and Share Purchase agreements.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0 text-sm">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Line-by-Line 1-on-1 Evaluation</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Every assignment is marked up manually with custom corrections, comments, and advice from our senior legal faculty team.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0 text-sm">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Module 6 Remote Freelancing Engine</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Learn how to build elite profiles on Upwork & Fiverr, win high-value global client proposals, price retainer fees, and expand LinkedIn branding.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Three Key Pillars Cards Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Comprehensive Curriculum</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                6 exhaustive modules covering general commercial, SaaS & technology, IP licensing, startup corporate agreements, investment terms, and freelance playbooks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Active Live Mentorship</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Weekly live webinars, Q&As, drafting workshops with seasoned attorneys, plus an exclusive Slack workspace of highly-driven lawyers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Elite Certification</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Graduates receive a verified Lawctopus & Academike Certificate of Excellence, highly respected by top corporate recruiters and agencies.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          SIX-MONTH INTERACTIVE Timeline
          --------------------------------------------------------- */}
      <section 
        ref={curriculumRef} 
        className="py-16 lg:py-24 bg-white border-y border-slate-100"
        id="curriculum-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              Syllabus Outline
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Six-Month Advanced Learning Roadmap
            </h2>
            <p className="text-base text-slate-600">
              Click on each Month of the timeline below to inspect specific curriculum chapters, learning objectives, drafting tasks, and mentor oversight details.
            </p>
          </div>

          {/* Interactive Month Selector (Timeline tabs) */}
          <div className="mt-12">
            <div className="flex overflow-x-auto pb-4 justify-start md:justify-center items-center gap-2 border-b border-slate-100 px-2 scrollbar-none">
              {CURRICULUM_DATA.map((item) => (
                <button
                  key={item.month}
                  onClick={() => setActiveMonth(item.month)}
                  className={`px-5 py-3 rounded-lg font-mono text-sm font-semibold transition-all shrink-0 cursor-pointer ${activeMonth === item.month ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800"}`}
                >
                  Month {item.month}
                </button>
              ))}
            </div>

            {/* Dynamic Content Detail Box */}
            <div className="mt-8 bg-[#fafbfc] border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                {CURRICULUM_DATA.filter((i) => i.month === activeMonth).map((data) => (
                  <motion.div
                    key={data.month}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                  >
                    
                    {/* Left details */}
                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <span className="text-xs font-bold font-mono text-indigo-600 tracking-widest uppercase">
                          Month {data.month} Module Focus
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
                          {data.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                          {data.subtitle}
                        </p>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {data.description}
                      </p>

                      {/* Learning Skills Checklist */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">What you will learn to execute:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          {data.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-indigo-600 shrink-0" />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right details: Projects and Faculty */}
                    <div className="lg:col-span-5 bg-white border border-slate-200/50 rounded-xl p-5 md:p-6 space-y-5">
                      
                      {/* Projects to Draft */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-indigo-900">
                          <FileCheck2 size={18} className="text-indigo-600 shrink-0" />
                          <h4 className="text-sm font-bold">Practical Drafting Deliverables:</h4>
                        </div>
                        <div className="space-y-2">
                          {data.contracts.map((c, index) => (
                            <div key={index} className="px-3 py-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 border border-slate-100 flex items-center justify-between">
                              <span>{c}</span>
                              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono font-bold px-1.5 py-0.5 rounded uppercase">Portfolio Template</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="h-px bg-slate-100" />

                      {/* Faculty Mentor */}
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                          👨‍⚖️
                        </span>
                        <div>
                          <p className="text-xs text-slate-400">Lead Curriculum Director:</p>
                          <p className="text-xs font-bold text-slate-900">{data.instructor}</p>
                          <p className="text-[10px] text-slate-500">Corporate Drafting Expert</p>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          24+ CONTRACTS CATEGORISED SHOWCASE
          --------------------------------------------------------- */}
      <section 
        ref={showcaseRef} 
        className="py-16 lg:py-24 bg-[#fafbfc]"
        id="contracts-showcase-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              Full Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Draft 24+ Practical Commercial Contracts
            </h2>
            <p className="text-base text-slate-600">
              We do not use dummy text. You will draft complete, legal-grade commercial agreements spanning cloud software, employment, corporate investments, and joint ventures.
            </p>
          </div>

          {/* Interactive Filtering and Search Controls */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-200/60 pb-6">
            
            {/* Category Pill Filters */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 scrollbar-none px-1">
              {[
                { label: "All Contracts", value: "all" },
                { label: "Tech & SaaS", value: "tech" },
                { label: "Corporate", value: "corporate" },
                { label: "General", value: "general" },
                { label: "Employment", value: "employment" }
              ].map((category) => (
                <button
                  key={category.value}
                  onClick={() => setContractsCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${contractsCategory === category.value ? "bg-slate-900 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Dynamic Real-Time Search Bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search drafting templates..."
                value={contractsSearch}
                onChange={(e) => setContractsSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              />
            </div>

          </div>

          {/* Contracts Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredContracts.map((contract) => (
                <motion.div
                  key={contract.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded uppercase">
                        {contract.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span>{contract.complexity}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {contract.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {contract.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock size={12} />
                      <span>{contract.duration}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Freelance Value</p>
                      <p className="font-bold text-teal-600 font-mono">${contract.value}+</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty Search State */}
            {filteredContracts.length === 0 && (
              <div className="col-span-full bg-white border border-slate-200/50 rounded-xl p-12 text-center text-slate-500">
                <FileText size={48} className="mx-auto text-slate-300 mb-3" />
                <p className="font-bold text-slate-700 text-sm">No matching contracts found</p>
                <p className="text-xs text-slate-400 mt-1">Try searching for alternative keywords like "SaaS", "NDA", or "Vesting".</p>
              </div>
            )}
          </div>

          {/* ---------------------------------------------------------
              CRO INTERACTIVE INCOME ESTIMATION CALCULATOR
              --------------------------------------------------------- */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest font-mono text-teal-400">
                  Interactive Freelance ROI Calculator
                </span>
                <h3 className="text-xl md:text-2xl font-bold">
                  Calculate Your Potential Remote Legal Freelance Earnings
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  The international remote legal market regularly pays premium dollar for contract drafting. Adjust the sliders on the right to see how quickly you can recover your course tuition and generate sustainable remote income!
                </p>

                {/* Proof Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center sm:text-left">
                    <p className="text-[10px] text-slate-400">Average Hourly Rate</p>
                    <p className="text-lg font-bold text-teal-400 font-mono">$50 - $120</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center sm:text-left">
                    <p className="text-[10px] text-slate-400">Tuition Recovery Rate</p>
                    <p className="text-lg font-bold text-teal-400 font-mono">1 - 2 Contracts</p>
                  </div>
                </div>
              </div>

              {/* Calculator Panel */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 space-y-5">
                
                {/* Contracts Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Contracts Drafted per Month:</span>
                    <span className="font-bold font-mono text-teal-400">{contractsPerMonth}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={contractsPerMonth}
                    onChange={(e) => setContractsPerMonth(Number(e.target.value))}
                    className="w-full accent-teal-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>1 contract</span>
                    <span>15 contracts</span>
                  </div>
                </div>

                {/* Avg Fee Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Average Fee per Contract (USD):</span>
                    <span className="font-bold font-mono text-teal-400">${avgFeePerContract}</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="1500"
                    step="50"
                    value={avgFeePerContract}
                    onChange={(e) => setAvgFeePerContract(Number(e.target.value))}
                    className="w-full accent-teal-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>$150 (NDA)</span>
                    <span>$1,500 (SHA/SaaS)</span>
                  </div>
                </div>

                <div className="h-px bg-slate-800" />

                {/* Output Display */}
                <div className="text-center space-y-1 py-1 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Estimated Monthly Freelance Income</p>
                  <p className="text-3xl font-extrabold text-teal-400 font-mono">
                    ${(contractsPerMonth * avgFeePerContract).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 font-sans">
                    ≈ ₹{Math.round(contractsPerMonth * avgFeePerContract * 84).toLocaleString()} per Month
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          FACULTY & MENTORS SHOWCASE
          --------------------------------------------------------- */}
      <section 
        ref={facultyRef} 
        className="py-16 lg:py-24 bg-white border-y border-slate-100"
        id="faculty-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              Meet Your Mentors
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Learn from India's Most Elite Drafting Faculty
            </h2>
            <p className="text-base text-slate-600">
              Not academics. You will learn directly from practicing veteran partners, legal counsel of top startups, and elite Upwork consultants.
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACULTY_DATA.map((faculty, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Faculty Image Frame */}
                  <div className="relative bg-slate-200 overflow-hidden group aspect-[4/3] sm:aspect-square">
                    <img 
                      src={faculty.image} 
                      alt={faculty.name} 
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
                    
                    {/* Faculty Tag */}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-bold uppercase tracking-wider font-mono text-indigo-700 px-2 py-1 rounded">
                      {faculty.tag}
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base leading-tight">
                      {faculty.name}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600">
                      {faculty.role}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {faculty.description}
                    </p>
                  </div>

                </div>

                <div className="px-5 pb-5 pt-2">
                  <div className="flex gap-1.5 items-center text-[10px] font-mono font-semibold text-slate-400">
                    <Award size={12} className="text-teal-600 shrink-0" />
                    <span>Verified Practicing Mentor</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          "THE LEGAL FREELANCER'S TOOLKIT" (CAREER OUTCOMES)
          --------------------------------------------------------- */}
      <section 
        className="py-16 lg:py-24 bg-[#fafbfc]"
        id="toolkit-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Graphics panel (Plain SVG clean preview) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-3xl -rotate-2 scale-98 blur-sm -z-10" />
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 space-y-6">
                
                <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Briefcase className="text-indigo-600" size={18} /> The Freelancer's Setup Sheet
                </h3>

                <div className="space-y-4">
                  
                  {/* Step 1 */}
                  <div className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">01</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Upwork Profile SEO Setup</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Optimize headers, certifications, and portfolios to rank in the top 1% of legal search queries globally.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">02</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">The 4-Sentence Proposal Framework</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Stop writing essays. Learn the high-conversion formula that secures response rates of up to 45%.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">03</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Retainer Escalation Formulas</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">How to transition one-off SaaS draft orders into recurring monthly advisory packages of $1,000+.</p>
                    </div>
                  </div>

                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
                  <p className="text-xs font-bold text-indigo-900">100+ Ready proposal scripts included</p>
                  <p className="text-[10px] text-indigo-600 mt-0.5">Tested on international clients</p>
                </div>

              </div>
            </div>

            {/* Right text panel */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                Freelancing Engine
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Not Just How to Draft. <br />
                <span className="text-indigo-600">How to Earn.</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Most drafting courses leave you with a portfolio of contracts but zero knowledge of client acquisition. Lawctopus' Module 6 flips the script. We teach you remote business systems so you can turn your skills into a premium, international freelancing company.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Upwork & Fiverr Blueprints</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Tested profile setups and SEO strategies that bypass platform waiting lists.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">LinkedIn Inbound Systems</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Publish contract teardowns that compel foreign startup CEOs to DM you for hire.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Escrow & Invoice templates</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Handle international currencies, escrow protections, and custom retainer clauses securely.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Job Placement Support</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Top performing students are recommended directly to partner boutique law firms.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => scrollToSection(enrollmentRef)} 
                  className="px-6 py-3 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  Start Your Freelance Journey <ArrowRight size={14} />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          STUDENT TESTIMONIALS
          --------------------------------------------------------- */}
      <section 
        className="py-16 lg:py-24 bg-white border-y border-slate-100"
        id="testimonials-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              Real Alumni Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              A Course That Actively Pays for Itself
            </h2>
            <p className="text-base text-slate-600">
              Read how our students transitioned from theoretical legal studies into client-ready, high-earning remote lawyers and drafting specialists.
            </p>
          </div>

          {/* Grid of Testimonials */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow transition-all"
              >
                
                <div className="space-y-4">
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-light">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.author}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
                  </div>
                  <span className="text-[10px] font-bold font-mono uppercase bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-100">
                    {t.tag}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          VALUE-FOCUSED PRICING TIERS
          --------------------------------------------------------- */}
      <section 
        ref={pricingRef} 
        className="py-16 lg:py-24 bg-[#fafbfc]"
        id="pricing-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              Simple & Clear Tuition
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              An Investment in Unfair Career Advantage
            </h2>
            <p className="text-base text-slate-600">
              Pick the secure payment plan that fits your current budget. Recover your entire investment with your very first international drafting contract project.
            </p>

            {/* Toggle Switch */}
            <div className="pt-4 flex justify-center items-center">
              <div className="inline-flex p-1 bg-slate-200/60 border border-slate-200 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setPricingCycle("one-time")}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${pricingCycle === "one-time" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  One-time Discount (Save 30%)
                </button>
                <button
                  onClick={() => setPricingCycle("installment")}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${pricingCycle === "installment" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  3-Month Installments (Interest-Free)
                </button>
              </div>
            </div>

          </div>

          {/* Pricing Card Grid */}
          <div className="mt-12 max-w-lg mx-auto bg-white border-2 border-indigo-600 rounded-2xl shadow-xl overflow-hidden relative">
            
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 to-teal-500" />

            {/* Ribbon tag */}
            <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-extrabold uppercase font-mono tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              Filling Fast
            </span>

            <div className="p-6 md:p-8 space-y-6">
              
              {/* Plan name */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                  Expert Contract Drafting Cohort <Sparkles size={16} className="text-amber-500 fill-amber-500" />
                </h3>
                <p className="text-xs text-slate-500 mt-1">Full 6-month intensive masterclass + freelance setup system.</p>
              </div>

              {/* Price calculation display */}
              <div className="py-4 border-y border-slate-100 flex items-baseline gap-2">
                {pricingCycle === "one-time" ? (
                  <>
                    <span className="text-4xl md:text-5xl font-extrabold text-slate-900 font-mono">₹24,500</span>
                    <span className="text-xs text-slate-400 line-through font-mono">₹35,000</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Save 30%</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl md:text-5xl font-extrabold text-slate-900 font-mono">₹8,999</span>
                    <span className="text-xs text-slate-500">/ month</span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">3 Interest-Free Payments</span>
                  </>
                )}
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">What is included in tuition:</p>
                
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">24+ practical drafting assignments</strong> with manual line-by-line feedback.</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Lifetime access</strong> to 120+ hours of video lessons & drafting templates.</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Weekly live webinars & mock reviews</strong> hosted by elite partners.</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Module 6 remote business blueprints</strong> (Upwork profiles & winning copy-paste proposals).</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Verified Certificate of Excellence</strong> from Lawctopus & Academike.</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Risk-Free 14-Day Performance Guarantee</strong> (100% refund, no questions asked).</span>
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <div className="pt-4">
                <button 
                  onClick={() => scrollToSection(enrollmentRef)} 
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Secure Your Seat Now <ArrowRight size={16} />
                </button>
              </div>

              {/* Guarantee info */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <Shield size={28} className="text-indigo-600 shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">14-Day Money Back Guarantee</p>
                  <p className="text-[10px] text-slate-500 leading-snug mt-0.5">Test module lessons and live session. Unhappy? Get an instant 100% full tuition refund.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          INTERACTIVE FAQ ACCORDION
          --------------------------------------------------------- */}
      <section 
        ref={faqRef} 
        className="py-16 lg:py-24 bg-white border-y border-slate-100"
        id="faq-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              Faqs
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Can't find the answer you are looking for? Reach out to our dedicated support team at <strong className="text-indigo-600">courses@lawctopus.com</strong>.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-slate-50 border border-slate-200/50 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left font-bold text-slate-900 text-sm md:text-base flex justify-between items-center cursor-pointer hover:bg-slate-100/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 p-1 bg-white border border-slate-200 rounded text-slate-500">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-200/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          HIGH-CONVERTING ENROLLMENT FORM SECTION
          --------------------------------------------------------- */}
      <section 
        ref={enrollmentRef} 
        className="py-16 lg:py-24 bg-[#fafbfc]"
        id="enrollment-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            
            {/* Top dynamic info banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Secure Your Seat in the Next Cohort</h3>
                <p className="text-xs text-indigo-100">Complete the form below. We will send full onboarding instructions to your inbox.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-center shrink-0">
                <p className="text-[10px] uppercase font-mono tracking-wider text-indigo-200 font-semibold">Cohort Status</p>
                <p className="text-xs font-bold text-white font-mono">Only 7 Seats Left</p>
              </div>
            </div>

            {/* Form body */}
            <div className="p-6 md:p-10">
              
              {formSubmitted ? (
                /* Interactive success state card with smooth micro-animation */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                  id="enrollment-success-card"
                >
                  <div className="h-16 w-16 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">Enrollment Application Received!</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Congratulations <strong className="text-slate-900">{formInputs.name}</strong>! Your application for the Lawctopus Contract Drafting Cohort has been successfully registered.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500 max-w-sm mx-auto text-left space-y-2">
                    <p className="font-bold text-slate-800 text-center">Next Steps:</p>
                    <p>1. We have dispatched a confirmation email to <strong className="text-slate-800 font-medium">{formInputs.email}</strong>.</p>
                    <p>2. A Lawctopus admissions coordinator will WhatsApp you at <strong className="text-slate-800 font-medium">{formInputs.phone}</strong> within 12 hours to walk through onboarding and payment gateway options.</p>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormInputs({ name: "", email: "", phone: "", experience: "law-student", motivation: "freelance-income", payment: "one-time" });
                      }}
                      className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer"
                    >
                      Fill another application
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-6">
                  
                  {/* Real-time Dynamic form progress tracker */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>Form Completeness Progress:</span>
                      <span className="font-bold text-indigo-600">{calculateFormProgress()}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${calculateFormProgress()}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Input: Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Full Name:</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formInputs.name}
                        onChange={(e) => setFormInputs({ ...formInputs, name: e.target.value })}
                        className={`w-full p-3 text-xs bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.name ? "border-red-400 focus:ring-red-300" : "border-slate-200"}`}
                        id="form-input-name"
                      />
                      {formErrors.name && (
                        <p className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
                          <XCircle size={10} /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Input: Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Email Address:</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formInputs.email}
                        onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
                        className={`w-full p-3 text-xs bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.email ? "border-red-400 focus:ring-red-300" : "border-slate-200"}`}
                        id="form-input-email"
                      />
                      {formErrors.email && (
                        <p className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
                          <XCircle size={10} /> {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Input: WhatsApp Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">WhatsApp Number (with country code):</label>
                      <input
                        type="text"
                        placeholder="+91 98765 43210"
                        value={formInputs.phone}
                        onChange={(e) => setFormInputs({ ...formInputs, phone: e.target.value })}
                        className={`w-full p-3 text-xs bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.phone ? "border-red-400 focus:ring-red-300" : "border-slate-200"}`}
                        id="form-input-phone"
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
                          <XCircle size={10} /> {formErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Select: Professional Background */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Professional Background:</label>
                      <select
                        value={formInputs.experience}
                        onChange={(e) => setFormInputs({ ...formInputs, experience: e.target.value })}
                        className="w-full p-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-600 font-medium"
                      >
                        <option value="law-student">Law Student (3rd/5th Year)</option>
                        <option value="practicing-advocate">Practicing Litigation Advocate</option>
                        <option value="corporate-counsel">In-House Corporate Counsel</option>
                        <option value="legal-freelancer">Independent Legal Freelancer</option>
                        <option value="other">Other Professional</option>
                      </select>
                    </div>

                    {/* Select: Motivation */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Primary Course Objective:</label>
                      <select
                        value={formInputs.motivation}
                        onChange={(e) => setFormInputs({ ...formInputs, motivation: e.target.value })}
                        className="w-full p-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-600 font-medium"
                      >
                        <option value="freelance-income">Build high-income remote legal freelancing (Upwork/LinkedIn)</option>
                        <option value="law-firm">Land a corporate law firm associate role</option>
                        <option value="contract-accuracy">Improve client drafting speed and litigation-proof vendor contracts</option>
                        <option value="academic">Gain solid practical skills absent in law school</option>
                      </select>
                    </div>

                    {/* Select: Payment Preference */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Preferred Payment Option:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                        <label className={`p-4 border rounded-xl flex items-start gap-3 cursor-pointer transition-all ${formInputs.payment === "one-time" ? "border-indigo-600 bg-indigo-50/10" : "border-slate-200 hover:bg-slate-50"}`}>
                          <input 
                            type="radio" 
                            name="payment" 
                            value="one-time" 
                            checked={formInputs.payment === "one-time"} 
                            onChange={() => setFormInputs({ ...formInputs, payment: "one-time" })} 
                            className="mt-1 accent-indigo-600"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900">One-Time Secure Option (₹24,500)</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Saves ₹10,500 compared to list price. Most popular option.</p>
                          </div>
                        </label>

                        <label className={`p-4 border rounded-xl flex items-start gap-3 cursor-pointer transition-all ${formInputs.payment === "installment" ? "border-indigo-600 bg-indigo-50/10" : "border-slate-200 hover:bg-slate-50"}`}>
                          <input 
                            type="radio" 
                            name="payment" 
                            value="installment" 
                            checked={formInputs.payment === "installment"} 
                            onChange={() => setFormInputs({ ...formInputs, payment: "installment" })} 
                            className="mt-1 accent-indigo-600"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900">3-Month Interest-Free Installments (₹8,999/mo)</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Split fee into 3 easy monthly parts. No hidden interest rates.</p>
                          </div>
                        </label>
                      </div>
                    </div>

                  </div>

                  {/* Submit CTA */}
                  <div className="pt-4 text-center md:text-right">
                    <button 
                      type="submit" 
                      className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 cursor-pointer inline-flex items-center justify-center gap-1.5"
                    >
                      Apply For Enrollment <Send size={14} />
                    </button>
                    <p className="text-[10px] text-slate-400 mt-2 font-mono">
                      🔒 Secured with AES-256 bank-grade protocol
                    </p>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          FOOTER
          --------------------------------------------------------- */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
            
            {/* Logo column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src={logo} 
                  alt="Lawctopus Logo" 
                  className="h-10 w-auto object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Lawctopus & Academike is India's leading digital platform for practical legal education, career advisory, and elite skills development. Trusted by over 50,000+ law students and recruiters.
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                Academike is a division of Lawctopus Online Education LLP.
              </p>
            </div>

            {/* Quick links columns */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Course Syllabus</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => scrollToSection(curriculumRef)} className="hover:text-white transition-colors cursor-pointer">Module 1: Foundations</button></li>
                <li><button onClick={() => scrollToSection(curriculumRef)} className="hover:text-white transition-colors cursor-pointer">Module 2: Boilerplate</button></li>
                <li><button onClick={() => scrollToSection(curriculumRef)} className="hover:text-white transition-colors cursor-pointer">Module 3: SaaS & IP</button></li>
                <li><button onClick={() => scrollToSection(curriculumRef)} className="hover:text-white transition-colors cursor-pointer">Module 4: Corporate</button></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Career & Freelance</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => scrollToSection(showcaseRef)} className="hover:text-white transition-colors cursor-pointer">24+ Contract Blueprints</button></li>
                <li><button onClick={() => scrollToSection(featuresRef)} className="hover:text-white transition-colors cursor-pointer">Freelancer's Setup Guide</button></li>
                <li><button onClick={() => scrollToSection(featuresRef)} className="hover:text-white transition-colors cursor-pointer">Upwork & LinkedIn SEO</button></li>
                <li><button onClick={() => scrollToSection(facultyRef)} className="hover:text-white transition-colors cursor-pointer">1-on-1 Feedback Evaluation</button></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Admissions Support</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-1.5">📧 courses@lawctopus.com</li>
                <li className="flex items-center gap-1.5">📞 +91 98765 43210</li>
                <li className="flex items-center gap-1.5">💬 Support Hours: 10AM - 6PM IST</li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
            <p>© {new Date().getFullYear()} Lawctopus Online Education LLP. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Refund & Cancellation</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ---------------------------------------------------------
          STICKY MOBILE CTA BANNER
          --------------------------------------------------------- */}
      <div 
        className="fixed bottom-0 left-0 right-0 lg:hidden bg-slate-900 text-white px-4 py-3 border-t border-slate-800 z-40 flex items-center justify-between"
        id="sticky-mobile-cta"
      >
        <div className="space-y-0.5">
          <p className="text-[10px] text-teal-400 font-bold uppercase tracking-wider font-mono">Batch Filling Fast</p>
          <p className="text-xs font-semibold text-slate-200">Only 7 seats remaining</p>
        </div>
        <button 
          onClick={() => scrollToSection(enrollmentRef)} 
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-1"
        >
          Enroll Now <ArrowRight size={13} />
        </button>
      </div>

      {/* ---------------------------------------------------------
          FLOATING BACK TO TOP BUTTON WITH SCROLL TRAIL
          --------------------------------------------------------- */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 h-10 w-10 md:h-12 md:w-12 bg-white hover:bg-slate-50 text-indigo-600 rounded-full border border-slate-200 shadow-xl cursor-pointer flex items-center justify-center z-50 transition-transform active:scale-95"
            id="back-to-top-button"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
