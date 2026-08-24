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
  subtitle: "Long-distance relationship app that brings couples closer.",
  chips: ["Mobile App", "Relationship", "UX UI"],
  intro:
    "Bridgly helps long-distance couples communicate better, build shared routines, and feel emotionally connected no matter the distance.",
  heroImage: ART.bridglyScene2,
  overview: {
    title: "Designing connection across distance.",
    body: "Long-distance couples face unique challenges in communication, trust, and emotional intimacy. Bridgly is designed to reduce that distance by helping couples stay in sync, share moments, and grow together.",
    meta: [
      { icon: "Users", label: "Role", value: "UI/UX Designer" },
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
    title: "Understanding long-distance couples better.",
    body: "We conducted research to understand the real challenges, behaviors, and needs of couples in long-distance relationships.",
    image: ART.bridglyCoupleCloud,
    illustration: true,
    methods: [
      { icon: "Users", title: "User Interviews", body: "12 interviews with couples in long-distance relationships.", image: ART.iconInterview },
      { icon: "BarChart3", title: "Surveys", body: "87 responses from users across different countries.", image: ART.iconSurvey },
      { icon: "Zap", title: "Competitive Analysis", body: "Analyzed 6 relationship and communication apps.", image: ART.iconCompetitive },
    ],
    insights: [
      { icon: "Heart", body: 'Couples want to feel "present" in each other\'s daily lives.' },
      { icon: "Repeat", body: "Shared routines strengthen feelings of connection." },
      { icon: "Sparkles", body: "Small, meaningful interactions matter more than big gestures." },
    ],
  },
  process: {
    title: "From messy sketches to a calm, warm interface.",
    body: "I moved from low-fidelity flows to a polished, emotion-first design language — testing at every step to keep interactions light and heartfelt.",
    steps: [
      { icon: "PenTool", title: "Sketches & Flows", body: "Mapped core journeys around daily rituals and shared moments." },
      { icon: "Boxes", title: "Wireframes", body: "Prioritized a home feed of 'togetherness' cards and quick reactions." },
      { icon: "Sparkles", title: "UI & Prototype", body: "Warm palette, soft shapes, and micro-interactions that feel affectionate." },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title: "Couples felt closer, and it showed.",
    body: "Usability testing on the high-fidelity prototype showed a clear lift in perceived closeness and daily engagement.",
    stats: [
      { value: "+38%", label: "Perceived daily closeness" },
      { value: "92%", label: "Task success rate" },
      { value: "4.7/5", label: "Prototype satisfaction" },
    ],
    image: IMAGES.coupleHands,
  },
  reflection: {
    title: "Designing for feelings, not just features.",
    body: "The biggest lesson was that emotional design lives in the details — timing, tone, and tiny moments of delight.",
    points: [
      "Small, meaningful interactions build connection more than big flashy gestures.",
      "Testing early with real couples reshaped the entire home experience.",
      "A warm, consistent visual system made the app feel safe and intimate.",
    ],
  },
};

const greenpathCase: CaseStudy = {
  subtitle: "A sustainable living companion that makes greener habits effortless.",
  chips: ["Mobile App", "Lifestyle", "UX UI"],
  intro:
    "GreenPath turns sustainability into small, satisfying daily wins — tracking habits, nudging better choices, and celebrating progress over time.",
  heroImage: ART.greenpathScene,
  overview: {
    title: "Making sustainable living feel easy.",
    body: "People want to live more sustainably but feel overwhelmed by conflicting advice. GreenPath breaks it down into simple daily actions with gentle guidance and visible progress.",
    meta: [
      { icon: "Users", label: "Role", value: "Product Designer" },
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
    title: "Understanding eco-conscious beginners.",
    body: "I focused on people who care about the planet but haven't built lasting habits — learning what motivates and what blocks them.",
    image: IMAGES.volunteers,
    methods: [
      { icon: "Users", title: "User Interviews", body: "10 interviews with aspiring sustainable livers." },
      { icon: "BarChart3", title: "Surveys", body: "120 responses on habits and motivations." },
      { icon: "Zap", title: "Competitive Analysis", body: "Reviewed 5 habit and sustainability apps." },
    ],
    insights: [
      { icon: "Sparkles", body: "Tiny, achievable actions beat ambitious lifestyle overhauls." },
      { icon: "BarChart3", body: "Seeing cumulative impact keeps people motivated." },
      { icon: "Heart", body: "Community and encouragement reinforce new habits." },
    ],
  },
  process: {
    title: "From guilt-driven to encouragement-first.",
    body: "Early concepts felt preachy, so I reframed the whole experience around positive reinforcement and playful momentum.",
    steps: [
      { icon: "PenTool", title: "Concept & Flows", body: "Designed a daily 'green action' loop with streaks." },
      { icon: "Boxes", title: "Wireframes", body: "Balanced tracking with light, motivating feedback." },
      { icon: "Sparkles", title: "UI & Prototype", body: "Fresh, earthy visuals with rewarding micro-animations." },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title: "Greener habits that actually stick.",
    body: "Prototype testing showed users found the experience motivating rather than guilt-inducing.",
    stats: [
      { value: "+45%", label: "Weekly habit completion" },
      { value: "89%", label: "Task success rate" },
      { value: "4.6/5", label: "Prototype satisfaction" },
    ],
    image: IMAGES.seedling,
  },
  reflection: {
    title: "Encouragement beats guilt.",
    body: "Sustainability design succeeds when it makes people feel capable, not ashamed.",
    points: [
      "Positive reinforcement drove far more engagement than warnings.",
      "Visualizing cumulative impact was the single biggest motivator.",
      "Small daily wins compounded into real behavior change.",
    ],
  },
};

const studyflowCase: CaseStudy = {
  subtitle: "A focus & productivity workspace for calmer, deeper study sessions.",
  chips: ["Web App", "Productivity", "UX UI"],
  intro:
    "StudyFlow combines a gentle focus timer, task planning, and progress tracking to help students work with intention instead of stress.",
  heroImage: ART.studyflowScene,
  overview: {
    title: "Helping students focus without burnout.",
    body: "Students juggle deadlines, distractions, and self-doubt. StudyFlow creates a calm, structured environment that makes deep work feel achievable.",
    meta: [
      { icon: "Users", label: "Role", value: "UI/UX Designer" },
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
    title: "Understanding how students really study.",
    body: "I explored the habits, tools, and emotional patterns of students during high-pressure periods.",
    image: IMAGES.student,
    methods: [
      { icon: "Users", title: "User Interviews", body: "9 interviews with university students." },
      { icon: "BarChart3", title: "Diary Study", body: "1 week of study-session logs from 15 students." },
      { icon: "Zap", title: "Competitive Analysis", body: "Reviewed 6 focus and productivity tools." },
    ],
    insights: [
      { icon: "Clock", body: "Time-boxing sessions reduced anxiety and improved focus." },
      { icon: "Sparkles", body: "A calm interface helped students stay in flow longer." },
      { icon: "BarChart3", body: "Visible progress motivated consistent daily study." },
    ],
  },
  process: {
    title: "From cluttered dashboard to calm workspace.",
    body: "I stripped away noise and built a focused, single-task experience with everything else a click away.",
    steps: [
      { icon: "PenTool", title: "Flows & IA", body: "Structured around one active focus session at a time." },
      { icon: "Boxes", title: "Wireframes", body: "Timer, task list, and progress in a distraction-free layout." },
      { icon: "Sparkles", title: "UI & Prototype", body: "Soft, low-contrast visuals that reduce cognitive load." },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title: "Deeper focus, less stress.",
    body: "Testing showed students completed sessions more consistently and reported feeling calmer.",
    stats: [
      { value: "+32%", label: "Completed focus sessions" },
      { value: "94%", label: "Task success rate" },
      { value: "4.8/5", label: "Prototype satisfaction" },
    ],
    image: IMAGES.studyflow,
  },
  reflection: {
    title: "Calm is a feature.",
    body: "For productivity tools, restraint and clarity matter more than packing in features.",
    points: [
      "A single-focus layout dramatically reduced overwhelm.",
      "Gentle visuals kept students in flow longer.",
      "Progress tracking turned study into a rewarding routine.",
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
