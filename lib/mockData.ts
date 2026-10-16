import { User, Product, Order, AdminStats } from "./types";

// ── Users ──────────────────────────────────────────────────────────────────────
export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Selamawit Tadesse",
    username: "selam.tadesse",
    email: "selam.tadesse@aau.edu.et",
    bio: "Final-year Software Engineering student at AAU (4Kilo). Dean's list scholar sharing concise algorithms, lab guides, and exam solutions.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    role: "student",
    isVerified: true,
    university: "Addis Ababa University (AAU)",
    listingsCount: 4,
    memberSince: "September 2023",
  },
  {
    id: "u2",
    name: "Dawit Alemayehu",
    username: "dawit_alem",
    email: "dawit.alemayehu@eiabc.edu.et",
    bio: "Civil & Environmental Engineering student at EiABC. Sharing structured lecture notes, structural dynamics walkthroughs, and midterm packages.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    role: "student",
    isVerified: true,
    university: "EiABC (Architecture & Civil Eng)",
    listingsCount: 5,
    memberSince: "January 2024",
  },
  {
    id: "u3",
    name: "Bethlehem Haile",
    username: "bethlehem_h",
    email: "bethlehem.haile@aau.edu.et",
    bio: "4th year LLB Law student at AAU Main Campus. Sharing case briefs, legal commentary on Ethiopian Civil Code, and tutorial prep kits.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    role: "student",
    isVerified: false,
    university: "AAU Faculty of Law",
    listingsCount: 1,
    memberSince: "March 2024",
  },
  {
    id: "u4",
    name: "Nahom Girma",
    username: "nahom_g",
    email: "nahom.girma@aait.edu.et",
    bio: "Electrical & Computer Engineering honors student at AAiT (5Kilo). Tutored Calculus and Digital Signal Processing for 2+ years.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    role: "student",
    isVerified: true,
    university: "AAiT (Addis Ababa Inst. of Tech)",
    listingsCount: 6,
    memberSince: "October 2023",
  },
  {
    id: "u5",
    name: "Meron Yohannes",
    username: "meron_y",
    email: "meron.yohannes@ju.edu.et",
    bio: "5th year Medical student at Jimma University. Creating illustrated clinical summary cards, histology breakdowns, and pathology atlases.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
    role: "student",
    isVerified: false,
    university: "Jimma University (Medicine)",
    listingsCount: 2,
    memberSince: "November 2023",
  },
  {
    id: "u6",
    name: "Alazar Bekele",
    username: "alazar_b",
    email: "alazar.bekele@astu.edu.et",
    bio: "Computer Science & Engineering at ASTU. Passionate about algorithms, modern full-stack engineering, and practical software design patterns.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    role: "student",
    isVerified: true,
    university: "ASTU (Adama Science & Tech)",
    listingsCount: 3,
    memberSince: "February 2024",
  },
  {
    id: "u7",
    name: "Kalkidan Daniel",
    username: "kalkidan.d",
    email: "kalkidan.daniel@hu.edu.et",
    bio: "Accounting & Finance scholar at Hawassa University. Author of concise summaries for Corporate Finance, IFRS, and Commercial Banking.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    role: "student",
    isVerified: true,
    university: "Hawassa University (Economics)",
    listingsCount: 3,
    memberSince: "December 2023",
  },
  {
    id: "u8",
    name: "Yared Tefera",
    username: "yared.tefera@bdu.edu.et",
    email: "yared.tefera@bdu.edu.et",
    bio: "Applied Chemistry senior at Bahir Dar University. Creator of visual organic synthesis sheets and physical chemistry equation cheat-sheets.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    role: "student",
    isVerified: false,
    university: "Bahir Dar University (Sciences)",
    listingsCount: 1,
    memberSince: "April 2024",
  },
  {
    id: "admin1",
    name: "Dawit Girma",
    username: "admin",
    email: "admin@campusly.app",
    bio: "Campusly platform administrator and content moderator.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    role: "admin",
    isVerified: true,
    university: "Campusly Moderation Team",
    listingsCount: 0,
    memberSince: "January 2023",
  },
];

// ── Products ───────────────────────────────────────────────────────────────────
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Complete Data Structures & Algorithms Notes + Solved Past Exams",
    price: 250,
    description:
      "Comprehensive typed notes covering the full CS301 curriculum: arrays, linked lists, trees, graphs, heaps, dynamic programming, and complexity analysis (Big-O).\n\nIncludes 8 annotated coding walkthroughs, diagrams for every data structure, and step-by-step solutions for 2022–2024 AAU midterm and final examination papers.",
    category: "Computer Science",
    productType: "notes",
    department: "Software Engineering",
    rating: 4.9,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    ],
    seller: MOCK_USERS[0], // Selamawit Tadesse (Verified, 4 listings)
    status: "approved",
    createdAt: "2024-05-10",
    isFeatured: true,
  },
  {
    id: "p2",
    title: "Thermodynamics & Heat Transfer II — Full Lecture Notes & Solved Midterm",
    description:
      "Detailed, high-clarity notes for the full second-half of Thermodynamics & Fluid Dynamics. Covers Carnot cycles, Rankine cycles, entropy generation, heat exchangers, and refrigeration systems.\n\nIncludes annotated problem sets with full worked calculations and formula sheets verified by top lecturers at EiABC.",
    price: 320,
    category: "Engineering",
    productType: "module",
    department: "Mechanical & Civil Eng",
    rating: 4.8,
    reviewCount: 31,
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
    ],
    seller: MOCK_USERS[1], // Dawit Alemayehu (Verified, 5 listings)
    status: "approved",
    createdAt: "2024-05-08",
    isFeatured: true,
  },
  {
    id: "p3",
    title: "Human Anatomy & Systemic Physiology — Illustrated High-Yield Atlas",
    description:
      "Color-coded, beautifully illustrated clinical notes for Medical students. Covers musculoskeletal, cardiovascular, respiratory, and central nervous systems.\n\nContains mnemonics, high-yield clinical correlations, dissection landmarks, and diagnostic table summaries aligned with Guyton and Moore.",
    price: 450,
    category: "Medicine",
    productType: "notes",
    department: "School of Medicine",
    rating: 5.0,
    reviewCount: 56,
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&auto=format&fit=crop&q=80",
    ],
    seller: MOCK_USERS[4], // Meron Yohannes (Unverified, 2 listings)
    status: "approved",
    createdAt: "2024-05-12",
    isFeatured: true,
  },
  {
    id: "p4",
    title: "Ethiopian Civil Code & Contract Law Cases with Model Exam Answers",
    description:
      "A complete revision manual for law students examining Ethiopian Contract Law (Arts 1675–2026). Summarises 28 landmark Cassation Bench decisions, statutory interpretations, and liability principles.\n\nIncludes 5 years of past exam questions with distinction-level model answers.",
    price: 280,
    category: "Law",
    productType: "past-exam",
    department: "Faculty of Law",
    rating: 4.7,
    reviewCount: 28,
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80",
    ],
    seller: MOCK_USERS[2], // Bethlehem Haile (Unverified, 1 listing)
    status: "approved",
    createdAt: "2024-05-06",
    isFeatured: true,
  },
  {
    id: "p5",
    title: "Corporate Financial Management & Investment Strategy Master Guide",
    description:
      "Comprehensive study guide for corporate finance, valuation methods, capital budgeting (NPV, IRR), WACC computation, and portfolio theory.\n\nFeatures worked spreadsheet examples, financial ratio breakdown templates, and mock exam case studies from Hawassa University exams.",
    price: 300,
    category: "Business",
    productType: "module",
    department: "Accounting & Finance",
    rating: 4.8,
    reviewCount: 24,
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    ],
    seller: MOCK_USERS[6], // Kalkidan Daniel (Verified, 3 listings)
    status: "approved",
    createdAt: "2024-05-15",
    isFeatured: true,
  },
  {
    id: "p6",
    title: "Calculus III & Differential Equations — Video Lecture Series & Solved Problems",
    description:
      "12-part recorded high-definition video lecture series breaking down multivariable calculus, partial derivatives, double and triple integrals, Green's theorem, and first/second order ODEs.\n\nIncludes downloadable PDF summary notes and 50+ worked tutorial problem sheets.",
    price: 350,
    category: "Mathematics",
    productType: "video-lecture",
    department: "Applied Mathematics",
    rating: 4.9,
    reviewCount: 63,
    images: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
    ],
    seller: MOCK_USERS[3], // Nahom Girma (Verified, 6 listings)
    status: "approved",
    createdAt: "2024-05-14",
    isFeatured: true,
  },
  {
    id: "p7",
    title: "Organic Chemistry Reaction Mechanisms & Lab Synthesis Worksheets",
    description:
      "Clean, handwritten & digitally rendered organic reaction mechanisms covering electrophilic additions, nucleophilic substitutions (SN1/SN2, E1/E2), aromatic chemistry, and spectroscopy (NMR & IR).\n\nIncludes laboratory preparation questions and practice synthesis pathways.",
    price: 220,
    category: "Natural Sciences",
    productType: "notes",
    department: "Department of Chemistry",
    rating: 4.6,
    reviewCount: 19,
    images: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=1200&auto=format&fit=crop&q=80",
    ],
    seller: MOCK_USERS[7], // Yared Tefera (Unverified, 1 listing)
    status: "approved",
    createdAt: "2024-05-01",
    isFeatured: false,
  },
  {
    id: "p8",
    title: "Full Stack Web Engineering & Microservices Architecture Workshop",
    description:
      "Complete workshop recording and annotated code repos covering Next.js App Router, NestJS REST API microservices, PostgreSQL with Prisma ORM, and secure JWT authentication.\n\nContains production deployment guides, architecture diagrams, and testing suites.",
    price: 400,
    category: "Computer Science",
    productType: "video-lecture",
    department: "Computer Science & IT",
    rating: 5.0,
    reviewCount: 47,
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&auto=format&fit=crop&q=80",
    ],
    seller: MOCK_USERS[5], // Alazar Bekele (Verified, 3 listings)
    status: "approved",
    createdAt: "2024-05-16",
    isFeatured: true,
  },
];

// ── Admin Stats ────────────────────────────────────────────────────────────────
export const MOCK_ADMIN_STATS: AdminStats = {
  totalListings: 47,
  activeUsers: 312,
  pendingReview: 3,
  flaggedReported: 2,
};

// ── Orders ─────────────────────────────────────────────────────────────────────
export const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    product: MOCK_PRODUCTS[0],
    buyer: MOCK_USERS[1],
    createdAt: "2024-05-11",
    status: "completed",
  },
  {
    id: "o2",
    product: MOCK_PRODUCTS[2],
    buyer: MOCK_USERS[0],
    createdAt: "2024-05-13",
    status: "completed",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  "Engineering",
  "Business",
  "Medicine",
  "Law",
  "Computer Science",
  "Mathematics",
  "Arts & Humanities",
  "Natural Sciences",
] as const;

export const PRODUCT_TYPES = [
  { value: "module", label: "Modules" },
  { value: "notes", label: "Lecture Notes" },
  { value: "past-exam", label: "Past Exam Papers" },
  { value: "video-lecture", label: "Video Lectures" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;
