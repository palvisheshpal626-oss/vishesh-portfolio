export type ProficiencyLevel = "Strong Practical Experience" | "Working Knowledge" | "Currently Learning";

export interface SkillItem {
  name: string;
  tag?: string;
  proficiency: ProficiencyLevel;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  projectStatus: "Live Deployed Application" | "Completed Personal Project" | "Completed Native Android Project" | "Completed Web Tool" | "Workflow Automation Tool" | "Client Solution Design & Prototype";
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  myContribution: string[];
  features: string[];
  technicalChallenges: string[];
  solutionsImplemented: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  statusLabel?: string;
  isClientDesign?: boolean;
  architectureDetails: string;
}

export const PERSONAL_INFO = {
  name: "VISHESH KUMAR",
  displayName: "Vishesh Kumar",
  primaryTitle: "Full Stack Developer | Android & Flutter Developer",
  roleTitles: [
    "Full Stack Developer",
    "Android & Flutter Developer",
    "Software Developer"
  ],
  headline: "Building Digital Experiences. Engineering Real-World Solutions.",
  intro:
    "I am a BCA student and independent software developer focused on building modern web applications, Android applications and backend systems. I enjoy solving real-world problems through practical software engineering, secure database architecture and third-party API integrations.",
  aboutDetailed:
    "I am currently pursuing a Bachelor of Computer Applications (BCA) at VKIT, Bijnor (affiliated with GJUM, Moradabad). My development approach is grounded in building practical, production-ready software: architecting scalable relational database models with PostgreSQL Row Level Security, building cross-platform and native mobile applications with Flutter and Kotlin, crafting responsive web frontends with Next.js and Tailwind CSS, and leveraging modern agentic AI coding tools (Claude Code, Google Antigravity, Cursor, Windsurf) to accelerate development while personally reviewing, testing, and verifying every line of code.",
  email: "palvisheshpal626@gmail.com",
  location: "Bijnor, Uttar Pradesh, India",
  openTo: [
    {
      title: "Software Developer Jobs",
      description: "Junior and associate software engineering roles across web, mobile, and backend systems."
    },
    {
      title: "Full Stack Developer Internships",
      description: "Hands-on engineering internships focused on Next.js, React, Node.js/PostgreSQL, and Supabase."
    },
    {
      title: "Android Developer Internships",
      description: "Mobile development internships working with Kotlin, MVVM, Android SDK, and Flutter."
    },
    {
      title: "Remote Developer Opportunities",
      description: "Distributed engineering teams worldwide across full-stack, mobile, and API development."
    },
    {
      title: "Freelance Projects",
      description: "Custom web development, mobile apps, database design, and workflow automation for clients."
    }
  ],
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    institute: "VKIT, Bijnor, Uttar Pradesh",
    university: "GJUM, Moradabad",
    status: "Currently Pursuing"
  },
  social: {
    github: "https://github.com/palvisheshpal626-oss",
    linkedin: "https://www.linkedin.com/in/vishesh-kumar-516a433a6/",
    email: "mailto:palvisheshpal626@gmail.com"
  },
  resume: {
    downloadUrl: "/VISHESH KUMAR (2).pdf",
    fallbackUrl: "/resume.pdf",
    filename: "VISHESH KUMAR (2).pdf"
  },
  images: {
    heroPortrait: "/f11c5b9d-9439-4ec9-ae86-f60bd7029a30.png",
    workspacePortrait: "/assets/vishesh-hoodie-blue.png",
    portraitBw: "/assets/vishesh-portrait-bw.jpeg",
    portraitMain: "/assets/vishesh-main.png"
  }
};

export const PROJECTS: Project[] = [
  {
    slug: "earn-master",
    title: "Earn Master",
    category: "Gaming & Rewards Platform",
    projectStatus: "Live Deployed Application",
    tagline: "High-concurrency gaming and rewards ecosystem with real-time wallet and backend security.",
    description:
      "A comprehensive gaming and rewards platform providing a unified web and mobile application experience. Features extensive game catalog integration, secured transactional wallets, user reward tracking, and Supabase Edge Functions with PostgreSQL Row Level Security (RLS).",
    problem:
      "Reward platforms require rock-solid transaction integrity, zero duplicate payouts, low latency for gaming sessions, and strict fraud prevention without creating high operational costs.",
    solution:
      "Architected a scalable Flutter client paired with a Supabase PostgreSQL backend. Leveraged serverless Edge Functions for atomic wallet ledger operations, implemented strict Row Level Security (RLS) rules to isolate user data, and enabled referral tree tracking.",
    myContribution: [
      "Designed and developed the Flutter cross-platform user experience for web and mobile.",
      "Engineered the Supabase backend architecture, schemas, and Row Level Security (RLS) policies.",
      "Implemented serverless Edge Functions for transaction processing and wallet reconciliation.",
      "Integrated secure authentication, referral code propagation, and rewards disbursement pipelines."
    ],
    features: [
      "Gaming ecosystem featuring 14,000+ integrated game titles (supplied project catalog)",
      "Secure double-entry transactional wallet workflow with instant balance verification",
      "Dynamic referral and multi-tier invitation mechanism with attribution tracking",
      "Advertising & monetization integration hooks for reward-based video actions",
      "Supabase Edge Functions handling sensitive payout logic and balance modifications",
      "Granular PostgreSQL Row Level Security (RLS) enforcing strict multi-tenant privacy",
      "Admin telemetry dashboard for transaction auditing and user status monitoring"
    ],
    technicalChallenges: [
      "Preventing concurrent wallet balance manipulation during simultaneous reward claims.",
      "Ensuring client applications cannot directly execute unauthorized balance modifications.",
      "Structuring high-volume transactional logs without degrading read queries for users."
    ],
    solutionsImplemented: [
      "Enforced atomic database transactions and triggers in PostgreSQL so wallet increments are isolated.",
      "Applied strict Row Level Security (RLS) prohibiting direct client UPDATEs on balance tables; all balance mutations are processed strictly through authenticated Supabase Edge Functions.",
      "Separated user profile reads from transaction ledger entries using indexed foreign key relations."
    ],
    technologies: ["Flutter", "Supabase", "PostgreSQL", "Edge Functions", "REST APIs", "Dart", "RLS"],
    liveUrl: "https://earn-master.online/",
    architectureDetails:
      "Client (Flutter) -> Supabase Edge Functions (Deno Runtime) -> PostgreSQL (RLS Protected Tables, Stored Triggers & Atomic Balance Updates) -> External Game Feeds & Ad Networks."
  },
  {
    slug: "restaurant-lead-finder",
    title: "Restaurant Lead Finder",
    category: "Full Stack Web Application",
    projectStatus: "Completed Personal Project",
    tagline: "Location-aware geospatial intelligence platform for automated B2B restaurant lead acquisition.",
    description:
      "A specialized full-stack web application designed for B2B prospecting. Queries OpenStreetMap geospatial APIs to scan geographical bounding boxes, detect dining establishments, deduplicate records, and facilitate instant direct outreach via WhatsApp.",
    problem:
      "Marketing and sales teams waste countless hours manually combing search engines and directories to find local restaurant leads, often encountering outdated contacts and duplicated records.",
    solution:
      "Developed a Next.js web application utilizing OpenStreetMap, the Overpass query engine, and Nominatim geocoding. Implemented client-side and server-side deduplication algorithms, fuzzy name matching, offline local storage caching, and one-click WhatsApp click-to-chat links.",
    myContribution: [
      "Engineered the responsive Next.js frontend with dynamic geospatial search queries.",
      "Constructed Overpass API QL pipelines to extract node and way metadata efficiently.",
      "Built client-side fuzzy deduplication filters to ensure unique lead rosters.",
      "Integrated direct WhatsApp API links with dynamic message pre-formatting for instant outreach."
    ],
    features: [
      "Geospatial location-based radius and bounding box search via Nominatim & Overpass API",
      "Automated lead collection (name, coordinates, address, contact details, cuisine type)",
      "Intelligent duplicate detection across overlapping geo-queries",
      "Offline data handling using browser storage to preserve query results between sessions",
      "One-click WhatsApp click-to-chat integration with templated sales introduction",
      "Exportable filtered datasets for downstream CRM and marketing workflows",
      "Fast, responsive UI with interactive map and list view toggles"
    ],
    technicalChallenges: [
      "Overpass API timeouts when querying densely populated metropolitan areas.",
      "Handling heterogeneous OpenStreetMap tag schemas where phone numbers and addresses are stored under varying keys."
    ],
    solutionsImplemented: [
      "Constructed targeted Overpass QL bounding-box filters that request only amenity=restaurant|cafe nodes, decreasing payload size by 60%.",
      "Built a flexible normalization parser in JavaScript that extracts contact information across multiple OSM tag variations (phone, contact:phone, mobile, etc.)."
    ],
    technologies: ["Next.js", "React.js", "OpenStreetMap", "Overpass API", "Nominatim", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/palvisheshpal626-oss",
    architectureDetails:
      "Next.js App -> Nominatim Geocoder (Coords Resolution) -> Overpass API (OSM Vector Data Query) -> In-Memory Deduplication & Normalization -> LocalStorage Caching & WhatsApp URI Generator."
  },
  {
    slug: "code-master",
    title: "Code Master",
    category: "Android Application",
    projectStatus: "Completed Native Android Project",
    tagline: "Native Android interactive computer science learning platform with progressive challenges.",
    description:
      "A native Android educational application engineered to guide aspiring programmers through foundational programming concepts, interactive quizzes, multi-choice assessments, and coding progression tracks.",
    problem:
      "Learning to code on mobile devices is frequently frustrating due to rigid text-heavy layouts, lack of structured progression milestones, and poor offline access.",
    solution:
      "Built a native Android app in Kotlin following the MVVM (Model-View-ViewModel) architectural pattern and Material Design 3 guidelines. Provided structured chapters, interactive MCQs with instant feedback, level unlocking, and clean typography tailored for code readability on small screens.",
    myContribution: [
      "Designed and coded the native Android interface using XML layouts adhering to Material Design 3.",
      "Implemented MVVM architecture with Kotlin Coroutines and LiveData/StateFlow for reactive state.",
      "Created modular quiz engines with score computation and persistent level progression.",
      "Optimized offline performance and asset rendering for low-spec Android devices."
    ],
    features: [
      "Structured programming language tracks (Java, Kotlin, Python, Web fundamentals)",
      "Interactive MCQ evaluation engine with immediate explanation of correct answers",
      "Level progression system rewarding completed quizzes and unlocking advanced concepts",
      "Material Design 3 aesthetic with dynamic theme adaptation and high-contrast code snippets",
      "Offline-first lesson caching allowing uninterrupted studying without an internet connection",
      "Comprehensive progress dashboard tracking accuracy, completion percentage, and streaks"
    ],
    technicalChallenges: [
      "Preventing UI stutter during lesson parsing on low-RAM budget Android hardware.",
      "Preserving user quiz progress and selected answers during device orientation changes."
    ],
    solutionsImplemented: [
      "Offloaded asset parsing and JSON chapter deserialization to background threads using Kotlin Coroutines (Dispatchers.IO).",
      "Adopted Android ViewModel architecture with LiveData, ensuring UI state survives configuration changes without reloading data."
    ],
    technologies: ["Kotlin", "Android Studio", "XML", "MVVM", "Material Design 3", "LiveData", "Coroutines"],
    githubUrl: "https://github.com/palvisheshpal626-oss",
    architectureDetails:
      "Kotlin UI (Activity/Fragment + Material 3) <-> ViewModel (StateFlow/LiveData) <-> Repository Layer <-> Local SQLite / Room Database & Asset Lesson Bundles."
  },
  {
    slug: "code-compiler",
    title: "Online Code Compiler",
    category: "Web Application",
    projectStatus: "Completed Web Tool",
    tagline: "Browser-based multi-language code compilation environment powered by Judge0 API.",
    description:
      "A developer utility enabling users to write, submit, and execute source code directly in their web browser across various programming languages. Bridges web clients to the Judge0 remote execution sandbox.",
    problem:
      "Setting up local language runtimes, compilers, and toolchains is a major hurdle for students and beginners who want to quickly test algorithms or verify logic.",
    solution:
      "Engineered an interactive browser coding interface with syntax highlighting, custom stdin input buffers, language selection, and an asynchronous polling client that communicates with Judge0 API instances to deliver execution stdout, stderr, compile errors, and runtime stats.",
    myContribution: [
      "Constructed the responsive browser-based editor layout and terminal output panel.",
      "Integrated the Judge0 REST API with tokenized submission and polling cycles.",
      "Handled error parsing (Syntax errors, Time Limit Exceeded, Run Time Exceptions).",
      "Built customizable standard input (stdin) piping for interactive problem testing."
    ],
    features: [
      "Multi-language code submission support (Python, Java, C++, JavaScript)",
      "Asynchronous submission handling with Judge0 API status polling",
      "Execution output streaming for stdout, stderr, memory usage, and execution runtime",
      "Custom standard input (stdin) injection for testing edge test cases",
      "Clean dark terminal interface with monospaced execution logging",
      "One-click code reset and sample boilerplate generator for rapid testing"
    ],
    technicalChallenges: [
      "Managing asynchronous execution delays without freezing the browser client or spamming the Judge0 endpoint.",
      "Accurately surfacing multi-line compiler tracebacks and execution timeouts."
    ],
    solutionsImplemented: [
      "Constructed an asynchronous polling loop with exponential backoff that checks submission status tokens at controlled intervals.",
      "Parsed base64-encoded stderr, stdout, and compile_output payloads safely to prevent rendering crashes."
    ],
    technologies: ["Web Development", "Judge0 API", "JavaScript", "REST APIs", "CSS3", "HTML5"],
    githubUrl: "https://github.com/palvisheshpal626-oss",
    architectureDetails:
      "Web Client (Editor & Terminal) -> REST POST /submissions (Judge0 API) -> Token Polling Loop -> Sandboxed Docker Execution -> JSON Result Response (stdout, stderr, exit code, time, memory)."
  },
  {
    slug: "instagram-automation",
    title: "Instagram Reel Automation",
    category: "Automation Tool",
    projectStatus: "Workflow Automation Tool",
    tagline: "Python-driven browser automation workflow for AI-assisted short-form content preparation.",
    description:
      "An automated pipeline built in Python to streamline the preparation and browser-driven publishing steps for social media short-form video reels, combining AI content prompts with automated file handling and browser sessions.",
    problem:
      "Consistent video content publishing involves repetitive manual overhead: formatting captions, matching audio prompts, uploading files, and handling repetitive session verifications.",
    solution:
      "Created an automated Python utility leveraging Chrome Automation (Selenium / Playwright principles). Orchestrates asset directories, reads scheduled prompt metadata, launches dedicated browser profiles with saved session state, and executes automated staging workflows.",
    myContribution: [
      "Developed Python automation scripts for scheduled queue inspection and file organization.",
      "Configured Chrome automation routines to handle complex dynamic web forms and file pickers.",
      "Implemented resilient wait strategies, DOM selectors, and session persistence to avoid security lockouts.",
      "Added telemetry logs and screenshot checkpoints for debugging automation exceptions."
    ],
    features: [
      "Automated media asset verification and directory structure cleanup",
      "AI-assisted caption and hashtag generation ingestion workflow",
      "Browser automation controlling Chromium sessions with persistent authentication cookies",
      "Resilient exception handling for network lags, dynamic DOM updates, and re-authentication",
      "Detailed diagnostic logging with timestamped error captures",
      "Configurable scheduling flags for batch and single-file processing"
    ],
    technicalChallenges: [
      "Handling unexpected dynamic DOM class mutations across social media web interfaces.",
      "Preventing authentication expiration from terminating automated processing queues."
    ],
    solutionsImplemented: [
      "Utilized persistent Chrome user-data-dir profiles to maintain session state and cookies across runs.",
      "Employed robust explicit waits (WebDriverWait) keyed to stable ARIA roles and element relationships rather than fragile auto-generated CSS classes."
    ],
    technologies: ["Python", "Chrome Automation", "Selenium", "AI Integration", "File I/O", "Browser Profiles"],
    githubUrl: "https://github.com/palvisheshpal626-oss",
    architectureDetails:
      "Python Controller -> Content Metadata Ingestion -> Chrome WebDriver Engine -> Browser Profile Session State -> Automated Web DOM Interactions -> Execution Log & Audit Checkpoint."
  },
  {
    slug: "hotel-management",
    title: "Hotel Guest Management",
    category: "Client Solution Design",
    projectStatus: "Client Solution Design & Prototype",
    tagline: "Architectural blueprint and prototype for digital guest registration and cloud spreadsheet sync.",
    description:
      "A client solution design conceptualized for a boutique hospitality client needing a streamlined digital check-in interface, guest registry lookup, daily occupancy reports, and two-way Google Sheets synchronization.",
    problem:
      "Small boutique hotels often rely on cumbersome paper check-in registers or expensive monolithic property management systems, leading to slow check-in queues and lost guest histories.",
    solution:
      "Designed a lightweight, client-focused web registration system tailored to hospitality workflows. Incorporates digital ID capture, fast guest search, automated daily arrival/departure reports, and direct synchronization with the client's existing Google Sheets operational pipeline.",
    myContribution: [
      "Conducted client requirement gathering and mapped out the digital check-in workflow.",
      "Designed the user interface wireframes and responsive guest registration forms.",
      "Specified the Google Sheets API synchronization layer for zero-friction client adoption.",
      "Authored the technical specification document, data schemas, and implementation roadmap."
    ],
    features: [
      "Streamlined guest check-in form with ID record capture and room assignment fields",
      "Searchable guest directory with instant filtering by name, phone, or check-in date",
      "Daily automated occupancy report generation for front-desk handoffs",
      "Exportable CSV/PDF summaries for accounting and regulatory compliance",
      "Two-way synchronization design with Google Sheets for non-technical hotel staff",
      "Client solution design clearly labeled as an architectural proposal & prototype"
    ],
    technicalChallenges: [
      "Accommodating non-technical hotel front-desk staff who require zero onboarding complexity.",
      "Ensuring guest records are backed up into familiar spreadsheet software without requiring expensive ongoing database hosting."
    ],
    solutionsImplemented: [
      "Architected the backend interface around Google Sheets API v4 with Service Account credentials, eliminating manual database management for the client.",
      "Created high-contrast, responsive form wireframes with automatic input formatting for phone numbers and check-in timestamps."
    ],
    technologies: ["Web Development", "Google Sheets API", "Client Solution Design", "JavaScript", "HTML5/CSS3"],
    isClientDesign: true,
    statusLabel: "Client Solution Design & Prototype",
    architectureDetails:
      "Frontdesk Web Form -> Client Solution Architecture -> Google Sheets API v4 (Service Account) -> Cloud Spreadsheets / Drive Storage -> Daily PDF/CSV Dispatcher."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Kotlin", tag: "Android & Multiplatform", proficiency: "Strong Practical Experience" },
      { name: "Java", tag: "Enterprise & Android", proficiency: "Strong Practical Experience" },
      { name: "JavaScript", tag: "ES6+ / Full Stack", proficiency: "Strong Practical Experience" },
      { name: "Python", tag: "Automation & Scripting", proficiency: "Strong Practical Experience" },
      { name: "Dart", tag: "Flutter Framework", proficiency: "Strong Practical Experience" },
      { name: "HTML5", tag: "Semantic Markup", proficiency: "Strong Practical Experience" },
      { name: "CSS3", tag: "Modern Styling", proficiency: "Strong Practical Experience" }
    ]
  },
  {
    title: "Frontend Development",
    iconName: "Layout",
    skills: [
      { name: "Next.js", tag: "App Router & SSR", proficiency: "Strong Practical Experience" },
      { name: "React.js", tag: "Hooks & Component Architecture", proficiency: "Strong Practical Experience" },
      { name: "Tailwind CSS", tag: "Utility-First Design", proficiency: "Strong Practical Experience" },
      { name: "Responsive Web Design", tag: "Mobile-First UX", proficiency: "Strong Practical Experience" }
    ]
  },
  {
    title: "Backend & Cloud",
    iconName: "Server",
    skills: [
      { name: "Supabase", tag: "BaaS & Auth", proficiency: "Strong Practical Experience" },
      { name: "PostgreSQL", tag: "Relational Modeling", proficiency: "Strong Practical Experience" },
      { name: "Firebase", tag: "NoSQL & Realtime", proficiency: "Working Knowledge" },
      { name: "REST APIs", tag: "Contract Design & Fetching", proficiency: "Strong Practical Experience" },
      { name: "Supabase Edge Functions", tag: "Deno Serverless Logic", proficiency: "Strong Practical Experience" }
    ]
  },
  {
    title: "Android & Mobile Development",
    iconName: "Smartphone",
    skills: [
      { name: "Android Studio", tag: "IDE & Profiler", proficiency: "Strong Practical Experience" },
      { name: "Kotlin", tag: "Coroutines & Flow", proficiency: "Strong Practical Experience" },
      { name: "XML Layouts", tag: "Declarative Views", proficiency: "Strong Practical Experience" },
      { name: "MVVM Architecture", tag: "Clean Separation", proficiency: "Strong Practical Experience" },
      { name: "Material Design 3", tag: "Modern Design Language", proficiency: "Strong Practical Experience" },
      { name: "Flutter", tag: "Cross-Platform Framework", proficiency: "Strong Practical Experience" }
    ]
  },
  {
    title: "Database & Security",
    iconName: "ShieldCheck",
    skills: [
      { name: "PostgreSQL", tag: "Indexes, Triggers, Views", proficiency: "Strong Practical Experience" },
      { name: "Database Design", tag: "Normalization & Schemas", proficiency: "Strong Practical Experience" },
      { name: "Authentication", tag: "JWT & OAuth Workflows", proficiency: "Strong Practical Experience" },
      { name: "Row Level Security (RLS)", tag: "Zero-Trust Multi-Tenancy", proficiency: "Strong Practical Experience" },
      { name: "Firebase Database", tag: "Realtime Sync", proficiency: "Working Knowledge" }
    ]
  },
  {
    title: "APIs & Integrations",
    iconName: "Network",
    skills: [
      { name: "Judge0 API", tag: "Code Execution Sandbox", proficiency: "Working Knowledge" },
      { name: "OpenStreetMap", tag: "Geospatial Data", proficiency: "Strong Practical Experience" },
      { name: "Overpass API", tag: "OSM Vector Query Language", proficiency: "Strong Practical Experience" },
      { name: "Nominatim", tag: "Forward & Reverse Geocoding", proficiency: "Strong Practical Experience" },
      { name: "REST API Integration", tag: "Data Fetching & Caching", proficiency: "Strong Practical Experience" }
    ]
  },
  {
    title: "Developer Tools",
    iconName: "Wrench",
    skills: [
      { name: "Git", tag: "Version Control", proficiency: "Strong Practical Experience" },
      { name: "GitHub", tag: "CI/CD & Collaboration", proficiency: "Strong Practical Experience" },
      { name: "VS Code", tag: "Primary Editor", proficiency: "Strong Practical Experience" },
      { name: "Postman", tag: "API Debugging & Collections", proficiency: "Strong Practical Experience" },
      { name: "Chrome Automation", tag: "Browser Scripting", proficiency: "Working Knowledge" }
    ]
  }
];

export const AI_CODING_TOOLS = [
  {
    name: "Claude Code",
    role: "Terminal Agentic Development",
    description: "Deep terminal-driven codebase refactoring, multi-file architectural reasoning, and autonomous debugging.",
    badge: "Agentic CLI"
  },
  {
    name: "Google Antigravity",
    role: "Autonomous Agentic IDE",
    description: "Multi-agent pair programming, test orchestration, system exploration, and end-to-end task execution.",
    badge: "Agentic IDE"
  },
  {
    name: "Cursor",
    role: "AI-First Code Editor",
    description: "Context-aware code completion, instant diff application, semantic codebase search, and targeted inline edits.",
    badge: "Editor"
  },
  {
    name: "GitHub Copilot",
    role: "Pair Programmer",
    description: "Pattern-based autocomplete, boilerplate reduction, and unit test generation directly within the editor.",
    badge: "Autocomplete"
  },
  {
    name: "Windsurf",
    role: "Flow-State Coding Agent",
    description: "Multi-turn codebase indexing, deep structural edits, and execution-guided error remediation.",
    badge: "Agentic IDE"
  },
  {
    name: "ChatGPT",
    role: "Algorithmic & Architecture Assistant",
    description: "Complex logic planning, SQL query optimization, edge-case analysis, and architectural design sparring.",
    badge: "LLM"
  },
  {
    name: "Google Gemini",
    role: "Multimodal & Large-Context Analysis",
    description: "Large context window code analysis, API documentation exploration, and comprehensive system documentation.",
    badge: "Multimodal LLM"
  }
];

export const AI_WORKFLOWS = [
  {
    step: "01",
    title: "Context & Architecture Analysis",
    description: "Using AI to analyze requirements, map component hierarchies, design schema relations, and evaluate edge cases before writing code."
  },
  {
    step: "02",
    title: "Agentic Code Generation & Prototyping",
    description: "Leveraging tools like Claude Code and Google Antigravity to scaffold boilerplate, generate typesafe contracts, and build initial implementations rapidly."
  },
  {
    step: "03",
    title: "Systematic Debugging & Error Tracing",
    description: "Feeding runtime stack traces, SQL errors, and API payload mismatches into AI models to diagnose root causes and generate targeted patches."
  },
  {
    step: "04",
    title: "API Integration & Schema Validation",
    description: "Accelerating integration with third-party APIs (OpenStreetMap, Judge0, Supabase) by generating types, parsing response payloads, and handling exceptions."
  },
  {
    step: "05",
    title: "Strict Human Verification & Ownership",
    description: "I retain 100% personal accountability for all code: every line of AI-assisted code is rigorously reviewed, audited for security, tested locally, and manually verified before deployment."
  }
];

export const EXPERIENCE_ITEMS = [
  {
    period: "April 2025 – Present",
    role: "Independent Software Developer | Personal & Client Projects",
    type: "Practical Engineering & Applied Development",
    transparencyNote: "Independent software development and applied client design projects. Delineated clearly between completed software, native mobile builds, and architectural consultancy.",
    highlights: [
      "Engineered the full-stack architecture for 'Earn Master' using Flutter, Supabase, and PostgreSQL with Row Level Security (RLS) policies.",
      "Constructed 'Restaurant Lead Finder' using Next.js and OpenStreetMap/Overpass APIs for automated geospatial lead acquisition.",
      "Designed and implemented native Android apps in Kotlin following MVVM architecture and Material Design 3 ('Code Master').",
      "Created Python automation scripts utilizing Chrome Automation to streamline media preparation workflows.",
      "Authored architectural client solution designs including digital guest management systems integrated with Google Sheets.",
      "Integrated modern AI coding agents (Claude Code, Google Antigravity, Cursor, Windsurf) into development workflows while maintaining strict human auditing and validation."
    ],
    categories: [
      {
        name: "Personal Software Projects",
        details: "Built and deployed Earn Master (Flutter + Supabase) and Restaurant Lead Finder (Next.js + OSM), managing full lifecycles from DB design to deployment."
      },
      {
        name: "Native Android Engineering",
        details: "Developed Code Master using Kotlin, Coroutines, StateFlow, and Room SQLite, focusing on offline learning on budget Android hardware."
      },
      {
        name: "Client Solution Architecture",
        details: "Specified and prototyped Hotel Guest Management, mapping workflow requirements to Google Sheets API integrations for non-technical clients."
      }
    ]
  }
];

export const CORE_COMPETENCIES = [
  { name: "Full Stack Web Development", icon: "Globe" },
  { name: "Android App Development", icon: "Smartphone" },
  { name: "Backend & Database Architecture", icon: "Database" },
  { name: "Row Level Security (RLS)", icon: "Shield" },
  { name: "API Design & Integration", icon: "Network" },
  { name: "Python Automation & Scripting", icon: "Cpu" },
  { name: "Application Debugging & Testing", icon: "Bug" },
  { name: "AI-Assisted Agentic Coding", icon: "Sparkles" },
  { name: "Problem Solving & Logic", icon: "Terminal" },
  { name: "Responsive UI/UX Engineering", icon: "Layers" }
];
