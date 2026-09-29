import { ART } from "./assets";

export const IMAGES = {
  cloudsPink:
    "https://images.unsplash.com/photo-1560803262-95a9de00a057?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  cloudsSky:
    "https://images.unsplash.com/photo-1694023445883-7398cfea9a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  couple:
    "https://images.unsplash.com/photo-1506014299253-3725319c0f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  coupleHands:
    "https://images.unsplash.com/photo-1541679368093-5c967ac6de11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  phone:
    "https://images.unsplash.com/photo-1634403665481-74948d815f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  desk:
    "https://images.unsplash.com/photo-1651684195895-38708dc94cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  greenpath:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
  seedling:
    "https://images.unsplash.com/photo-1779085031158-a2519daf9747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  volunteers:
    "https://images.unsplash.com/photo-1758599668203-05ee0bca83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  studyflow:
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
  student:
    "https://images.unsplash.com/photo-1514369118554-e20d93546b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  stickyNotes:
    "https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

/* ---------- Case study content model ---------- */
type IconText = { icon: string; label: string; image?: string };
type IconCard = { icon: string; title: string; body: string; image?: string };

export type CaseStudy = {
  subtitle: string;
  chips: string[];
  intro: string;
  heroImage: string;
  overview: {
    title: string;
    body: string;
    meta: { icon: string; label: string; value: string }[];
    problemSub: string;
    problems: IconText[];
    problemImage: string;
    phoneImage: string;
    phoneMockup?: string;
  };
  research: {
    title: string;
    body: string;
    image: string;
    illustration?: boolean;
    methods: IconCard[];
    insights: { icon: string; body: string }[];
  };
  process: {
    title: string;
    body: string;
    steps: IconCard[];
    image: string;
  };
  results: {
    title: string;
    body: string;
    stats: { value: string; label: string }[];
    image: string;
  };
  reflection: {
    title: string;
    body: string;
    points: string[];
  };
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  image: string;
  icon: string;
  iconImage?: string;
  accent: string;
  hasCaseStudy: boolean;
  caseStudy?: CaseStudy;
};

const bridglyCase: CaseStudy = {
  subtitle: "A peer accountability app that helps couples build shared goals and daily habits — regardless of distance.",
  chips: ["Mobile App", "Relationship", "UX UI"],
  intro:
    "Bridgly started as a goal-tracking app for long-distance couples, but research reshaped it into something more meaningful: a platform built on mutual accountability, trust, and daily micro-commitments.",
  heroImage: ART.bridglyScene2,
  overview: {
    title: "From personal tracker to shared accountability platform.",
    body: "Long-distance couples don't just struggle with distance — they struggle with feeling out of sync. I initially assumed the gap was a lack of personal goal-tracking tools, but research revealed the real problem: motivation collapses without social accountability. Bridgly was redesigned around that insight.",
    meta: [
      { icon: "Tag", label: "Type", value: "Personal Concept Project" },
      { icon: "Users", label: "Role", value: "UI/UX Designer (Solo)" },
      { icon: "CalendarDays", label: "Timeline", value: "May – Jul 2024 (10 Weeks)" },
      { icon: "Wrench", label: "Tools", value: "Figma" },
    ],
    problemSub: "Long-distance couples often struggle with:",
    problems: [
      { icon: "Heart", label: "Lack of daily connection", image: ART.iconBrokenHeart },
      { icon: "Clock", label: "Different schedules & time zones", image: ART.iconClock },
      { icon: "Repeat", label: "Hard to build shared routines", image: ART.iconCalendar },
      { icon: "MessageCircle", label: "Lack of meaningful interaction", image: ART.iconHeartChat },
    ],
    problemImage: IMAGES.desk,
    phoneImage: IMAGES.phone,
    phoneMockup: ART.bridglyPhones,
  },
  research: {
    title: "The real problem wasn't missing tools — it was missing accountability.",
    body: "I conducted 12 user interviews and collected 87 survey responses from couples in long-distance relationships across different countries. My original hypothesis was that users couldn't stay on track because goal-setting was too complicated. The interviews proved me wrong.",
    image: ART.bridglyCoupleCloud,
    illustration: true,
    methods: [
      { icon: "Users", title: "User Interviews", body: "12 in-depth interviews with couples in long-distance relationships, focusing on daily habits, communication patterns, and motivation breakdown.", image: ART.iconInterview },
      { icon: "BarChart3", title: "Surveys", body: "87 responses from users across 6 countries, measuring how often people abandoned personal goals and what factors influenced that.", image: ART.iconSurvey },
      { icon: "Zap", title: "Competitive Analysis", body: "Reviewed 6 existing relationship and habit-tracking apps to identify gaps in social accountability features.", image: ART.iconCompetitive },
    ],
    insights: [
      { icon: "Users", body: "Self-tracking alone doesn't sustain motivation. Users needed a partner who could see their progress — social accountability was the missing layer." },
      { icon: "Heart", body: "Couples craved daily micro-moments of presence, not just milestone sharing. A simple \"did you do it today?\" mattered more than weekly reviews." },
      { icon: "Repeat", body: "Shared routines, even small ones, were perceived as emotional glue. Users who checked in together daily reported feeling \"more in sync\" overall." },
    ],
  },
  process: {
    title: "V1 was a data dashboard. V2 was a daily question: did you do it?",
    body: "The first prototype had a full analytics dashboard on the home screen — progress charts, streaks, history logs. Usability testing revealed it created cognitive overload and made users feel behind before they even started. I stripped it down to one focused card: today's action, and your partner's status.",
    steps: [
      { icon: "PenTool", title: "V1: Dashboard Home", body: "Initial lo-fi used a data-heavy home screen with charts and history. Testing showed users felt overwhelmed and anxious at launch — not motivated." },
      { icon: "Boxes", title: "V2: Today's Action Card", body: "Redesigned home to show only 1–2 key actions for today plus partner status in a single card. Reduced cognitive load and increased perceived approachability." },
      { icon: "Sparkles", title: "Cut: Global Leaderboard", body: "Originally planned a gamified leaderboard and point shop. Removed after testing showed ranking against strangers triggered peer pressure and anxiety, undermining the core trust mechanic." },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title: "Validated by 8 users over 2 weeks of usability testing.",
    body: "I recruited 8 target users (students and working professionals) for a 2-week usability test using Think-Aloud Protocol combined with task completion tracking. All testing compared the V1 lo-fi wireframe against the V2 hi-fi prototype.",
    stats: [
      { value: "+38%", label: "Check-in task completion rate (V1 → V2)" },
      { value: "92%", label: "Onboarding success — no assistance needed" },
      { value: "4.7/5", label: "Visual clarity & interaction satisfaction" },
    ],
    image: IMAGES.coupleHands,
  },
  reflection: {
    title: "Layout must follow user psychology, not data logic.",
    body: "The most important lesson came from watching users fail in V1. Partner status was buried in a secondary tab — so users assumed Bridgly was a solo app. The moment I moved the Dual Progress Cards to the first screen and added a one-tap 'Ping Partner' action, the entire dynamic shifted. Users immediately said 'Oh, I get it now.'",
    points: [
      "The home screen pivot wasn't a visual decision — it was an IA decision driven by user intent. Users asked 'Did I do it? Did my partner?' Those two questions became the product.",
      "Removing the global leaderboard was a better design decision than building it. Scope cuts that improve focus and trust are valid UX choices.",
      "Think-Aloud testing revealed confusion that post-test surveys would have missed. Observing behaviour, not just asking opinions, led to the biggest redesigns.",
    ],
  },
};

const greenpathCase: CaseStudy = {
  subtitle: "A sustainable living companion that replaces guilt-tripping with actionable low-carbon alternatives and habit-building micro-rewards.",
  chips: ["Mobile App", "Lifestyle", "UX UI"],
  intro:
    "GreenPath started as a carbon calculator — but research revealed guilt doesn't change behavior. I redesigned it from the ground up around convenience, positive reinforcement, and frictionless daily logging.",
  heroImage: ART.greenpathScene,
  overview: {
    title: "Guilt-tripping doesn't work. Convenience does.",
    body: "I originally assumed people avoided sustainable choices because they lacked knowledge about their carbon footprint. Research proved otherwise: users already knew the problem. What they lacked was a frictionless way to act on it. GreenPath pivoted from a warning dashboard to an actionable habit-building platform.",
    meta: [
      { icon: "Tag", label: "Type", value: "Personal Concept Project" },
      { icon: "Users", label: "Role", value: "UI/UX Designer (Solo)" },
      { icon: "CalendarDays", label: "Timeline", value: "Feb – Apr 2024 (8 Weeks)" },
      { icon: "Wrench", label: "Tools", value: "Figma" },
    ],
    problemSub: "People trying to live greener often face:",
    problems: [
      { icon: "Zap", label: "Overwhelming, conflicting advice" },
      { icon: "Clock", label: "No time to research choices" },
      { icon: "Repeat", label: "Habits are hard to sustain" },
      { icon: "BarChart3", label: "No sense of real impact" },
    ],
    problemImage: IMAGES.volunteers,
    phoneImage: IMAGES.greenpath,
  },
  research: {
    title: "Users knew the problem. They needed a frictionless way to act.",
    body: "I conducted 10 user interviews and collected 120 survey responses from working adults interested in sustainability but struggling to build lasting habits. My initial assumption — that carbon knowledge was the gap — was disproven in the first three interviews.",
    image: IMAGES.volunteers,
    methods: [
      { icon: "Users", title: "User Interviews", body: "10 interviews with eco-conscious adults who had tried and abandoned sustainability apps, exploring motivation triggers and drop-off moments." },
      { icon: "BarChart3", title: "Surveys", body: "120 responses measuring frequency of sustainable choices, barriers to adoption, and reactions to different feedback styles (guilt vs. reward)." },
      { icon: "Zap", title: "Competitive Analysis", body: "Reviewed 5 habit and sustainability apps, mapping how each handles data input complexity and motivational feedback loops." },
    ],
    insights: [
      { icon: "AlertTriangle", body: "Guilt-tripping doesn't drive action — it drives anxiety and avoidance. Showing users their carbon output without alternatives caused disengagement, not behavior change." },
      { icon: "Sparkles", body: "Convenience of alternatives was the #1 behavior driver. Users were willing to change habits when a low-carbon option was surfaced in the moment, not after logging." },
      { icon: "Star", body: "Micro-rewards and visible cumulative impact (e.g. 'equivalent to 3 trees saved') sustained motivation far better than raw carbon kilograms." },
    ],
  },
  process: {
    title: "From carbon calculator to one-tap low-carbon alternatives.",
    body: "V1 required users to manually input every purchase and trip in detail across dense forms and pie charts. Drop-off was immediate. V2 replaced that with one-tap logging cards and context-aware eco-routing suggestions — turning sustainable choices into the path of least resistance.",
    steps: [
      { icon: "PenTool", title: "V1: Warning Dashboard", body: "Initial lo-fi used full-screen carbon charts and manual data entry forms. Testing showed users felt overwhelmed and judged — drop-off happened within the first two screens." },
      { icon: "Boxes", title: "V2: One-tap Logging + Eco-Routing", body: "Redesigned around card-based one-tap logging and map-integrated low-carbon route suggestions. Carbon data was reframed as trees saved, not kilograms emitted." },
      { icon: "Sparkles", title: "Cut: Barcode Supply-Chain Scanner", body: "Planned a product scanner to show full supply-chain carbon data. Removed after finding third-party databases were incomplete (damaging trust) and users wouldn't scan items mid-shopping." },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title: "Validated by 10 users over 2 weeks of task-based testing.",
    body: "I tested with 10 target users (sustainability-curious working adults) over 2 weeks using remote and in-person task-based evaluation. All metrics compare V1 lo-fi against the V2 hi-fi prototype.",
    stats: [
      { value: "+45%", label: "Task flow efficiency & daily interaction rate (V1 → V2)" },
      { value: "89%", label: "Onboarding success — first challenge set up in under 90s" },
      { value: "4.6/5", label: "Visual aesthetics, IA clarity & positive feedback rating" },
    ],
    image: IMAGES.seedling,
  },
  reflection: {
    title: "Design for human behavior, not ideal behavior.",
    body: "The core lesson from GreenPath: you cannot design for the user you wish existed. Real people won't log 15 fields of data to feel virtuous. True UX craft means wrapping large societal values — sustainability — inside experiences so frictionless and instantly rewarding that behaviour change happens as a side effect of convenience.",
    points: [
      "Removing the warning dashboard wasn't a visual decision — it was a behaviour science decision. Anxiety reduces action; encouragement increases it.",
      "The barcode scanner cut was the right call. A feature that damages trust when it fails is worse than no feature at all. Scope discipline is a design skill.",
      "Carbon data only motivates when translated into human-scale equivalents. '3 trees saved this week' lands. '14.2 kg CO₂ avoided' doesn't.",
    ],
  },
};

const studyflowCase: CaseStudy = {
  subtitle: "A frictionless focus workspace that lowers the activation energy of starting — so students spend less time planning and more time in flow.",
  chips: ["Web App", "Productivity", "UX UI"],
  intro:
    "StudyFlow started as a strict scheduling tool. Research revealed that rigid time planning was the problem, not the solution. I redesigned it around one principle: make starting so easy that there's no excuse not to.",
  heroImage: ART.studyflowScene,
  overview: {
    title: "The problem wasn't focus. It was the friction before focus.",
    body: "I originally assumed students failed to study because they lacked structured timers or detailed scheduling tools. Research proved the opposite: over-planning and strict schedules were causing analysis paralysis. StudyFlow was redesigned to remove every barrier between the user and their first focused minute.",
    meta: [
      { icon: "Tag", label: "Type", value: "Personal Concept Project" },
      { icon: "Users", label: "Role", value: "UI/UX Designer (Solo)" },
      { icon: "CalendarDays", label: "Timeline", value: "Sep – Nov 2023 (9 Weeks)" },
      { icon: "Wrench", label: "Tools", value: "Figma" },
    ],
    problemSub: "Students trying to focus often struggle with:",
    problems: [
      { icon: "Zap", label: "Constant digital distractions" },
      { icon: "Clock", label: "Poor time estimation" },
      { icon: "Repeat", label: "Inconsistent study routines" },
      { icon: "MessageCircle", label: "Procrastination & overwhelm" },
    ],
    problemImage: IMAGES.student,
    phoneImage: IMAGES.studyflow,
  },
  research: {
    title: "Strict schedules were making procrastination worse.",
    body: "I conducted 9 user interviews and a 1-week diary study with 15 students during high-pressure exam periods. My initial assumption — that students needed more precise time-planning tools — was challenged within the first few sessions. The real barrier was activation energy, not scheduling.",
    image: IMAGES.student,
    methods: [
      { icon: "Users", title: "User Interviews", body: "9 interviews with university students and working adults studying for certifications, focusing on where focus attempts broke down and what caused them to give up." },
      { icon: "BarChart3", title: "Diary Study", body: "15 students logged study sessions for 1 week, capturing start times, interruptions, and emotional states. Revealed that missed sessions often followed over-ambitious planning the night before." },
      { icon: "Zap", title: "Competitive Analysis", body: "Reviewed 6 focus and productivity tools including Forest, Notion, and Todoist — mapping how each handled session setup complexity and failure recovery." },
    ],
    insights: [
      { icon: "AlertTriangle", body: "Activation energy was the #1 blocker. The more steps required to begin a session, the higher the likelihood of abandonment before starting." },
      { icon: "Clock", body: "Strict time-boxing created anxiety, not structure. When users fell behind their plan, they gave up entirely rather than adjusting. Flexibility in timing reduced all-or-nothing thinking." },
      { icon: "Sparkles", body: "Visual calm directly influenced perceived cognitive load. Low-contrast, minimal interfaces helped users stay in flow longer compared to feature-dense dashboards." },
    ],
  },
  process: {
    title: "From calendar grid to one-tap focus card.",
    body: "V1 opened with a calendar-style form requiring users to input subjects, estimated durations, and sub-tasks before a single session could begin. Testing showed users exhausted their willpower filling in the setup — before any studying had happened. V2 reduced setup to a single card tap.",
    steps: [
      { icon: "PenTool", title: "V1: Calendar Grid Setup", body: "Initial lo-fi required filling a detailed schedule before studying. Testing showed significant drop-off during the setup phase itself — users felt overwhelmed before opening a single book." },
      { icon: "Boxes", title: "V2: One-tap Focus Cards", body: "Redesigned home to show a single active task with a minimal countdown. Setup reduced by 80%. The guiding message: 'Just start 5 minutes — you can adjust later.'" },
      { icon: "Sparkles", title: "Cut: App Blocking & Penalty System", body: "Originally planned a forced lock-out and point-deduction penalty for leaving mid-session. Removed after testing found it triggered strong feelings of being controlled, causing users to uninstall rather than comply." },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title: "Validated by 8 users over 2 weeks of task-based testing.",
    body: "I tested with 8 target users (university students and certification-prep working adults) over 2 weeks using usability testing and task completion evaluation. All metrics compare V1 lo-fi against the V2 hi-fi prototype.",
    stats: [
      { value: "+32%", label: "Focus session completion rate without interruption (V1 → V2)" },
      { value: "94%", label: "Onboarding success — first focus card started in under 60s" },
      { value: "4.8/5", label: "Minimalist aesthetics, micro-interaction quality & flow guidance" },
    ],
    image: IMAGES.studyflow,
  },
  reflection: {
    title: "Design for cognitive flow, not cognitive load.",
    body: "The defining principle of StudyFlow: every decision point, every form field, every extra screen is a potential exit. Productivity tools fail when they demand mental effort before delivering mental reward. The job of the designer is to eliminate friction until starting feels easier than not starting.",
    points: [
      "The calendar setup cut was the most impactful design decision in the project. Removing complexity from the entry point had more effect than any visual or interaction refinement downstream.",
      "The penalty system removal was a values decision as much as a UX one. Focus should come from internal motivation and smooth experience — not fear of punishment.",
      "Calm is a design feature, not a visual style. Low-contrast, single-task layouts actively reduced the cognitive load users reported feeling before a session began.",
    ],
  },
};

export const PROJECTS: Project[] = [
  {
    id: "bridgly",
    name: "Bridgly",
    tagline: "A long-distance relationship app that helps couples stay connected.",
    description:
      "A long-distance relationship app that helps couples stay connected and feel closer.",
    tags: ["Mobile", "Relationship", "UX UI"],
    image: ART.bridglyScene2,
    icon: "Heart",
    iconImage: ART.bridglyIcon2,
    accent: "var(--hw-accent-bridgly)",
    hasCaseStudy: true,
    caseStudy: bridglyCase,
  },
  {
    id: "greenpath",
    name: "GreenPath",
    tagline: "Sustainable living companion app.",
    description: "A companion app that nudges you toward greener daily habits.",
    tags: ["Mobile", "Lifestyle"],
    image: ART.greenpathScene,
    icon: "Leaf",
    iconImage: ART.greenpathIcon,
    accent: "var(--hw-accent-greenpath)",
    hasCaseStudy: true,
    caseStudy: greenpathCase,
  },
  {
    id: "studyflow",
    name: "StudyFlow",
    tagline: "Focus & productivity web application.",
    description: "A focus timer and study planner for calmer, deeper work sessions.",
    tags: ["Web", "Productivity"],
    image: ART.studyflowScene,
    icon: "BookOpen",
    iconImage: ART.studyflowIcon,
    accent: "var(--hw-accent-studyflow)",
    hasCaseStudy: true,
    caseStudy: studyflowCase,
  },
];

export const SKILLS = [
  { label: "UX Research", icon: "Search" },
  { label: "UI Design", icon: "PenTool" },
  { label: "Prototyping", icon: "Boxes" },
  { label: "Design Systems", icon: "LayoutGrid" },
  { label: "Interaction Design", icon: "MousePointerClick" },
  { label: "Usability Testing", icon: "ClipboardCheck" },
];

export const CASE_TABS = [
  "Overview",
  "Research",
  "Design Process",
  "Results",
  "Reflection",
] as const;

export type CaseTab = (typeof CASE_TABS)[number];
