import {
  BarChart3,
  Brain,
  Calendar,
  Car,
  CheckCircle2,
  Cpu,
  FileText,
  FlaskConical,
  HeartPulse,
  type LucideIcon,
  Presentation,
  Sprout,
  Trophy,
  Zap,
} from "lucide-react";

// ─── Event Date ───────────────────────────────────────────────────────────────

export const EVENT_DATE = new Date("2026-04-15T09:00:00");

// ─── Navigation Links ─────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Home", to: "/", ocid: "nav.home.link" },
  { label: "About", to: "/about", ocid: "nav.about.link" },
  { label: "Domains", to: "/domains", ocid: "nav.domains.link" },
  { label: "Timeline", to: "/timeline", ocid: "nav.timeline.link" },
  { label: "Register", to: "/register", ocid: "nav.registration.link" },
  { label: "Screening", to: "/screening", ocid: "nav.screening.link" },
  { label: "Contact", to: "/contact", ocid: "nav.contact.link" },
];

// ─── Domains ─────────────────────────────────────────────────────────────────

export interface StaticDomain {
  name: string;
  description: string;
  icon: LucideIcon;
  glowColor: string;
  iconBg: string;
  iconColor: string;
}

export const STATIC_DOMAINS: StaticDomain[] = [
  {
    name: "AI & Machine Learning",
    description:
      "Intelligent systems, deep learning, NLP, and autonomous agents.",
    icon: Brain,
    glowColor: "oklch(0.72 0.21 160 / 0.3)",
    iconBg: "from-emerald-500/20 to-teal-600/20",
    iconColor: "text-emerald-400",
  },
  {
    name: "IoT & Embedded Systems",
    description: "Connected devices, microcontrollers, sensor networks.",
    icon: Cpu,
    glowColor: "oklch(0.72 0.21 160 / 0.25)",
    iconBg: "from-green-500/20 to-emerald-600/20",
    iconColor: "text-green-400",
  },
  {
    name: "Data Analytics",
    description:
      "Big data, visualization, statistical modeling, business intelligence.",
    icon: BarChart3,
    glowColor: "oklch(0.78 0.17 78 / 0.25)",
    iconBg: "from-amber-500/20 to-yellow-600/20",
    iconColor: "text-amber-400",
  },
  {
    name: "Smart Agriculture",
    description: "Precision farming, crop monitoring, automated irrigation.",
    icon: Sprout,
    glowColor: "oklch(0.72 0.21 160 / 0.3)",
    iconBg: "from-lime-500/20 to-green-600/20",
    iconColor: "text-lime-400",
  },
  {
    name: "Healthcare Technologies",
    description:
      "Medical devices, health monitoring, telemedicine, biomedical.",
    icon: HeartPulse,
    glowColor: "oklch(0.6 0.22 25 / 0.2)",
    iconBg: "from-rose-500/20 to-red-600/20",
    iconColor: "text-rose-400",
  },
  {
    name: "Sustainable Energy",
    description: "Solar, wind, energy harvesting, storage, grid optimization.",
    icon: Zap,
    glowColor: "oklch(0.78 0.17 78 / 0.3)",
    iconBg: "from-yellow-500/20 to-amber-600/20",
    iconColor: "text-yellow-400",
  },
  {
    name: "Smart Transportation",
    description:
      "Autonomous vehicles, traffic management, EV systems, logistics.",
    icon: Car,
    glowColor: "oklch(0.65 0.18 200 / 0.25)",
    iconBg: "from-sky-500/20 to-blue-600/20",
    iconColor: "text-sky-400",
  },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────

export interface StaticTimelineStage {
  stageName: string;
  date: string;
  desc: string;
}

export const STATIC_TIMELINE: StaticTimelineStage[] = [
  {
    stageName: "Registration Opens",
    date: "January 10, 2026",
    desc: "Teams register online with project details and team member info.",
  },
  {
    stageName: "Abstract Submission",
    date: "February 1, 2026",
    desc: "Submit project abstract (max 500 words) covering objectives and SDG alignment.",
  },
  {
    stageName: "Round 1 Results",
    date: "February 15, 2026",
    desc: "Shortlisted teams announced online via email and official website.",
  },
  {
    stageName: "PPT Presentation",
    date: "March 1, 2026",
    desc: "Online presentation to a panel of expert evaluators from industry and academia.",
  },
  {
    stageName: "Final Expo",
    date: "April 15, 2026",
    desc: "Live project showcase, prototype demo, and prize distribution ceremony.",
  },
];

export const TIMELINE_ICONS: LucideIcon[] = [
  Calendar,
  FileText,
  CheckCircle2,
  Presentation,
  Trophy,
];

// ─── Contacts ─────────────────────────────────────────────────────────────────

export interface StaticContact {
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
}

export const STATIC_CONTACTS: StaticContact[] = [
  {
    name: "Arjun Kumar",
    role: "Student Coordinator",
    email: "arjun@college.ac.in",
    phoneNumber: "+91 98765 43210",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Faculty Coordinator",
    email: "drpriya@college.ac.in",
    phoneNumber: "+91 87654 32109",
  },
];

// ─── SDG Goals ────────────────────────────────────────────────────────────────

export const SDG_GOALS = [
  "1 - No Poverty",
  "2 - Zero Hunger",
  "3 - Good Health and Well-being",
  "4 - Quality Education",
  "5 - Gender Equality",
  "6 - Clean Water and Sanitation",
  "7 - Affordable and Clean Energy",
  "8 - Decent Work and Economic Growth",
  "9 - Industry, Innovation and Infrastructure",
  "10 - Reduced Inequalities",
  "11 - Sustainable Cities and Communities",
  "12 - Responsible Consumption and Production",
  "13 - Climate Action",
  "14 - Life Below Water",
  "15 - Life on Land",
  "16 - Peace, Justice and Strong Institutions",
  "17 - Partnerships for the Goals",
];

// ─── Screening Rounds ─────────────────────────────────────────────────────────

export const SCREENING_ROUNDS = [
  {
    number: "01",
    title: "Abstract Screening",
    subtitle: "Round 1",
    icon: FileText,
    description:
      "Teams submit a written abstract. Evaluated on innovation, feasibility, and SDG relevance. Shortlisted teams are notified by February 15, 2026. Top 50% advance to Round 2.",
    criteria: [
      "Innovation & Originality",
      "Technical Feasibility",
      "SDG Alignment",
      "Impact Potential",
    ],
    borderColor: "border-primary/30",
    badgeClass: "bg-primary/15 text-primary border-primary/40",
    iconBg: "bg-primary/15",
  },
  {
    number: "02",
    title: "PPT Presentation",
    subtitle: "Round 2",
    icon: Presentation,
    description:
      "Shortlisted teams present their project online to a panel of experts. Evaluated on clarity, technical depth, and impact. 10-minute presentation + 5-minute Q&A.",
    criteria: [
      "Technical Depth",
      "Clarity of Presentation",
      "Q&A Response",
      "Prototype Readiness",
    ],
    borderColor: "border-accent/30",
    badgeClass: "bg-accent/15 text-accent border-accent/40",
    iconBg: "bg-accent/15",
  },
  {
    number: "03",
    title: "Prototype Verification",
    subtitle: "Round 3 — Final Expo",
    icon: FlaskConical,
    description:
      "Selected teams demonstrate their prototype or working model at the live Final Expo on April 15, 2026. Winners receive prizes, certificates, and industry mentorship.",
    criteria: [
      "Working Prototype",
      "Live Demo Quality",
      "Scalability & Impact",
      "Jury Interview",
    ],
    borderColor: "border-primary/30",
    badgeClass: "bg-primary/15 text-primary border-primary/40",
    iconBg: "bg-primary/15",
  },
];
