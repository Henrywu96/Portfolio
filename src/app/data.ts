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
  desk: "https://images.unsplash.com/photo-1651684195895-38708dc94cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
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
type IconText = {
  icon: string;
  label: string;
  description?: string;
  image?: string;
};
type IconCard = {
  icon: string;
  title: string;
  body: string;
  image?: string;
  directions?: {
    label: "A" | "B" | "C";
    title: string;
    verdict: string;
    chosen?: boolean;
    explored?: boolean;
  }[];
};

export type CaseStudy = {
  subtitle: string;
  chips: string[];
  intro: string;
  heroImage: string;
  tldr: {
    problem: string;
    whatIDid: string;
    outcome: string;
  };
  finalDesign?: {
    intro: string;
    images: { src: string; caption: string }[];
    interactionDetails?: { src: string; caption: string }[];
    styleGuide?: {
      colors: { name: string; hex: string; role: string }[];
      type: string;
      rules: string[];
    };
  };
  overview: {
    title: string;
    body: string;
    meta: { icon: string; label: string; value: string }[];
    problemSub: string;
    problems: IconText[];
    problemImage: string;
    phoneImage: string;
    phoneMockup?: string;
    /** three real screens shown in phone frames next to the overview */
    phoneScreens?: [string, string, string];
    solutionsTitle?: string;
    solutions?: { title: string; body: string; image: string }[];
  };
  research: {
    title: string;
    body: string;
    image: string;
    illustration?: boolean;
    methods: IconCard[];
    insights: { icon: string; body: string; means?: string; built?: string }[];
    hmw?: { question: string; items: string[] };
  };
  process: {
    title: string;
    body: string;
    steps: IconCard[];
    image: string;
    /** show the whole image (a diagram or screen strip) instead of a cropped photo */
    imageContain?: boolean;
    imageCaption?: string;
    changes?: { area: string; before: string; after: string; why: string }[];
  };
  results: {
    title: string;
    body: string;
    note?: string;
    stats: { value: string; label: string }[];
    quote?: { text: string; source: string };
    image: string;
    next?: {
      title: string;
      body: string;
      hypotheses: string[];
      tasks: { task: string; measure: string; target: string }[];
      method: string;
    };
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
  subtitle:
    "Designing for emotional presence across distance: a mobile app that helps long-distance couples feel part of each other's day.",
  chips: ["Mobile App", "Relationship", "UX / UI"],
  intro:
    "Bridgly began as a shared goal tracker. Research showed couples didn't need another task manager — they wanted to feel present in each other's daily lives, so the design moved to partner context, warm contact and shared plans.",
  heroImage: ART.bridglyScene2,
  tldr: {
    problem:
      "Messages arrive, but presence doesn't. Across time zones, couples couldn't tell when the other was awake or free, and messaging apps left no space for shared memories or plans.",
    whatIDid:
      "Solo, 10 weeks. 12 interviews, 87 survey responses and a review of 6 apps led me to pivot from a goal tracker to V2: a warm, photo-led app built around partner awareness, warm contact, shared anticipation and shared memories.",
    outcome:
      "In a 2-week Think-Aloud test with 8 users, V2 felt warmer and more personal than V1, and most reached partner context and the reunion countdown on the first try. V2 is the final design.",
  },
  finalDesign: {
    intro:
      "V2 is the final design: onboarding sets a warm tone, Home shows both cities at a glance, Chat carries feeling, Blueprint counts down to the reunion, and Moments and Profile keep the shared story.",
    images: [
      {
        src: ART.bridglyOnboarding1,
        caption: "Onboarding · see their world in real time",
      },
      {
        src: ART.bridglyOnboarding2,
        caption: "Onboarding · chat with emotion, not just words",
      },
      {
        src: ART.bridglyOnboarding3,
        caption: "Onboarding · build your future together",
      },
      {
        src: ART.bridglyHome,
        caption: "Home · both cities at a glance",
      },
      {
        src: ART.bridglyChat,
        caption: "Chat · hugs and voice capsules",
      },
      {
        src: ART.bridglyBlueprint,
        caption: "Blueprint · 23 days to go",
      },
      {
        src: ART.bridglyMoments,
        caption: "Moments · shared timeline",
      },
      {
        src: ART.bridglyProfile,
        caption: "Profile · memory vault and badges",
      },
      {
        src: ART.bridglyOnboarding4,
        caption: "Bridge the distance",
      },
    ],
    styleGuide: {
      colors: [
        { name: "Midnight lavender", hex: "#2B2D42", role: "Headings and dark accents" },
        { name: "Dawn peach", hex: "#FFB5A7", role: "Primary actions and warmth" },
        { name: "Peach dark", hex: "#E89485", role: "Pressed states and highlights" },
        { name: "Sage", hex: "#81B29A", role: "Progress and done states" },
        { name: "White", hex: "#FFFFFF", role: "Surfaces" },
      ],
      type: "Inter throughout: Extra Bold headings, Semi Bold labels, Medium body text.",
      rules: [
        "Both cities' times wherever you plan together",
        "Photos and illustrations carry the emotion",
        "8 px spacing · 4-column grid · 16 px margins",
      ],
    },
  },
  overview: {
    title:
      "Couples didn't want another task manager. They wanted to feel part of each other's day.",
    body: "A personal mobile concept for long-distance couples — students and working professionals living in different cities or countries. It began as a shared goal tracker. Research showed couples didn't need another task manager — they wanted to feel present in each other's daily lives.",
    meta: [
      {
        icon: "Tag",
        label: "Type",
        value: "Personal concept · Mobile app",
      },
      {
        icon: "Users",
        label: "Role",
        value: "UI/UX Designer (Solo)",
      },
      {
        icon: "CalendarDays",
        label: "Timeline",
        value: "May – Jul 2024 (10 weeks)",
      },
      { icon: "Wrench", label: "Tool", value: "Figma" },
    ],
    problemSub: "Messages arrive, presence doesn't:",
    problems: [
      {
        icon: "Clock",
        label: "Time difference",
        description:
          "Messages often land during a partner's sleep, creating pressure and emotional asymmetry.",
        image: ART.iconClock,
      },
      {
        icon: "CalendarDays",
        label: "Opaque schedules",
        description:
          "Without seeing the overlap, it's hard to know a partner's status or find a good time to call.",
        image: ART.iconCalendar,
      },
      {
        icon: "Repeat",
        label: "Lack of rituals",
        description:
          "Messaging apps have no shared space for memories and plans to look forward to.",
        image: ART.iconHeartChat,
      },
    ],
    problemImage: IMAGES.desk,
    phoneImage: IMAGES.phone,
    phoneScreens: [ART.bridglyOnboarding1, ART.bridglyHome, ART.bridglyMoments],
    solutionsTitle: "Four product areas, each tied to a user need",
    solutions: [
      {
        title: "Partner awareness",
        body: "Both cities side by side on Home: local time, weather, status and a shared calendar of free time.",
        image: ART.bridglyHome,
      },
      {
        title: "Warm contact",
        body: "Hugs, mood tags and voice capsules, so a quick gesture still carries feeling.",
        image: ART.bridglyChat,
      },
      {
        title: "Shared anticipation",
        body: "A reunion countdown, a future canvas of plans, and the couple's journey timeline.",
        image: ART.bridglyBlueprint,
      },
      {
        title: "Shared memories",
        body: "A timeline of moments, a memory vault and milestones such as 100 days together.",
        image: ART.bridglyMoments,
      },
    ],
  },
  research: {
    title: "Three methods tested the original assumption.",
    body: "My original hypothesis was that couples lacked shared goal-tracking tools. I ran 12 interviews, collected 87 survey responses and reviewed 6 apps. The interviews revealed something different.",
    image: ART.bridglyCoupleCloud,
    illustration: true,
    methods: [
      {
        icon: "Users",
        title: "12 interviews",
        body: "Long-distance couples on what made them feel connected or disconnected each day.",
        image: ART.iconInterview,
      },
      {
        icon: "BarChart3",
        title: "87 survey responses",
        body: "Respondents across 6 countries on emotional patterns and communication habits.",
        image: ART.iconSurvey,
      },
      {
        icon: "Zap",
        title: "6 apps reviewed",
        body: "Relationship and messaging apps focused on chat or tasks — rarely on ambient presence.",
        image: ART.iconCompetitive,
      },
    ],
    insights: [
      {
        icon: "Heart",
        body: "Couples wanted to feel part of each other's day.",
        means: "Everyday context should be readable without composing a message.",
        built: "Lead with partner time, weather and availability.",
      },
      {
        icon: "Sparkles",
        body: "Small, ambient moments sustained connection.",
        means: "A brief gesture of care should fit inside an existing habit.",
        built: "Keep hugs and mood cues next to messaging.",
      },
      {
        icon: "Repeat",
        body: "Countdowns and rituals created anticipation.",
        means: "The future can carry emotional weight, not just tasks.",
        built: "Use reunion countdowns and shared milestones.",
      },
    ],
    hmw: {
      question:
        "How might we help long-distance couples feel present in each other's daily lives, while respecting personal boundaries?",
      items: [
        "How might we explain availability without making someone feel monitored?",
        "How might we make a brief gesture of affection feel meaningful between calls?",
        "How might we turn the next reunion into a shared source of anticipation?",
      ],
    },
  },
  process: {
    title: "V1 felt like project management. V2 felt like being close.",
    body: "Research set the direction: couples needed presence, not a productivity layer. Prototype testing showed how to deliver it. The information-dense V1 felt clinical, so V2 put partner context first and replaced charts with photos, illustrations and a warm peach palette.",
    image: ART.bridglyHomeProcess,
    imageContain: true,
    imageCaption: "Home: wireframe → mid-fi → V2 final",
    changes: [
      {
        area: "Entry screen",
        before: "Activity logs, progress charts and a shared task list",
        after: "Partner context leads the home screen",
        why: "Testers said V1 felt like “managing a project, not a relationship”",
      },
      {
        area: "Emotional hierarchy",
        before: "Information density dominated",
        after: "Warm daily contact and reunion anticipation are central",
        why: "Research pointed to everyday closeness",
      },
      {
        area: "Visual identity",
        before: "Charts, progress bars and generic cards",
        after: "Photos, illustrations and a warm peach palette",
        why: "The first screen should feel like your partner, not a dashboard",
      },
    ],
    steps: [
      {
        icon: "PenTool",
        title: "V1: Information dashboard",
        body: "V1 opened with activity logs, progress charts and a shared task list. Prototype sessions confirmed what research suggested: users described it as “managing a project, not a relationship.”",
      },
      {
        icon: "Heart",
        title: "V2: Warmth first",
        body: "Four tabs around a centre + button — Home, Moments, Blueprint, Profile. Peach leads actions and warmth, sage marks progress, midnight lavender carries text. Photos and illustrations replaced V1's charts, so the first screen feels personal.",
      },
      {
        icon: "Sparkles",
        title: "Cut after testing: Global leaderboard",
        body: "I removed a global leaderboard and reward store. Participants reacted to competitive ranking as anxiety-inducing, and it broke a core principle: intimacy and competition don't coexist. Trade-offs I accepted: context depends on accurate settings, and asynchronous signals add warmth but can't replace a timely conversation.",
      },
      {
        icon: "LayoutGrid",
        title: "After testing: three directions, V2 kept",
        body: "After the V2 test, three visual directions pushed the home screen further. Each had to show two cities at a glance. Outcome: V2 stayed the final design — it was tested with 8 users, and its warmth was the point.",
        image: ART.bridglyDirections,
        directions: [
          {
            label: "A",
            title: "Departure board",
            verdict:
              "A split-flap table of two cities. Strong, but it reads as a schedule, not a shared moment.",
          },
          {
            label: "B",
            title: "Airmail postcard",
            verdict:
              "Warm and personal. Hard to stretch to chat, calendar and plans.",
          },
          {
            label: "C",
            title: "GMT dial",
            verdict:
              "One scale for both cities. Precise, but the lists around it started to read like a planner again.",
            explored: true,
          },
        ],
      },
    ],
  },
  results: {
    title: "What testing showed: 8 users, 2 weeks, V1 vs V2.",
    body: "I recruited 8 target users (students and working professionals in long-distance relationships) for a 2-week Think-Aloud usability test comparing the V1 and V2 hi-fi prototypes. Tasks: find partner context, send a message or hug, and use the reunion countdown.",
    stats: [
      {
        value: "Emotional tone landed",
        label: "Participants described V2 as warmer and more personal than V1.",
      },
      {
        value: "Navigation was intuitive",
        label:
          "Most reached partner awareness and the countdown on the first attempt.",
      },
      {
        value: "Positive for all 8",
        label:
          "Post-test feedback on warmth, clarity and emotional fit was positive.",
      },
    ],
    quote: {
      text: "It feels like you're together.",
      source: "Recurring response in Think-Aloud sessions",
    },
    image: IMAGES.coupleHands,
    next: {
      title: "What I would test next",
      body: "V2 was tested with 8 users. The next round would check ideas borrowed from the GMT dial exploration, inside V2.",
      hypotheses: [
        "A highlighted shared window on Home helps people find a time to talk without opening the calendar.",
        "Dual timestamps in chat reduce “is it a good time?” messages.",
        "Mood tags make a short message feel warmer than text alone.",
      ],
      tasks: [
        { task: "Find the next time you can both talk", measure: "Time to answer", target: "< 10 s" },
        { task: "Send a hug with a mood tag", measure: "Completion", target: "≥ 90%" },
        { task: "Add a plan to Blueprint", measure: "Completion", target: "≥ 90%" },
      ],
      method:
        "5 participants across at least two time-zone pairs · moderated Think-Aloud · 3 tasks, ~20 min · SUS questionnaire",
    },
  },
  reflection: {
    title:
      "Emotional tone is an information-architecture decision, not just a visual one.",
    body: "Choosing what to surface first — a partner's world or a task list — defined the emotional contract of the app. Moving partner context to the first screen changed how people described it: “it feels like you're together” replaced “it feels like homework.”",
    points: [
      "The V1→V2 pivot wasn't a visual redesign — it was a product framing shift. What the first screen shows decides how the whole app feels.",
      "The leaderboard cut was backed by both testing and design values. Testing showed it triggered anxiety, and intimacy and competition don't coexist.",
      "Think-Aloud surfaced emotional misalignment that a satisfaction score would miss. Hearing people describe how the app made them feel was more useful than any post-test survey.",
    ],
  },
};

const greenpathCase: CaseStudy = {
  subtitle:
    "A sustainable living companion that replaces guilt-tripping with actionable low-carbon alternatives and habit-building micro-rewards.",
  chips: ["Mobile App", "Lifestyle", "UX UI"],
  intro:
    "GreenPath started as a carbon calculator — but research revealed guilt doesn't change behavior. I redesigned it from the ground up around convenience, quick daily logging, and impact you can read: kg of CO₂ saved against a daily goal.",
  heroImage: ART.greenpathScene,
  tldr: {
    problem:
      "People already knew the carbon problem. Slow logging and guilt-heavy warnings made them give up.",
    whatIDid:
      "Solo, 8 weeks. 10 interviews and 120 survey responses led me to a quick log and a nutrition-label format: every action shows kg of CO₂ and its percent of a daily goal.",
    outcome:
      "Testers logged actions with fewer hesitations than V1's form and described V2 as encouraging rather than guilt-inducing. The final label design has a validation plan ready.",
  },
  finalDesign: {
    intro:
      "The final design reads every number like a nutrition label: amount, then percent of a daily goal.",
    images: [
      {
        src: ART.greenpath01Welcome,
        caption: "Read your day like a label",
      },
      {
        src: ART.greenpath02Today,
        caption: "Today: Carbon Facts",
      },
      {
        src: ART.greenpath03QuickLog,
        caption: "Log an action: pick and confirm",
      },
      {
        src: ART.greenpath04Explore,
        caption: "Explore: Route Facts",
      },
      {
        src: ART.greenpath05Challenges,
        caption: "Challenges: active and available",
      },
      {
        src: ART.greenpath06ChallengeDetail,
        caption: "Bike to Work Week",
      },
      {
        src: ART.greenpath07Impact,
        caption: "Impact: the week in numbers",
      },
      {
        src: ART.greenpath08Profile,
        caption: "Profile: lifetime facts",
      },
    ],
  },
  overview: {
    title: "Guilt-tripping doesn't work. Convenience does.",
    body: "I originally assumed people avoided sustainable choices because they lacked knowledge about their carbon footprint. Research proved otherwise: users already knew the problem. What they lacked was a frictionless way to act on it. GreenPath pivoted from a warning dashboard to an actionable habit-building platform.",
    meta: [
      {
        icon: "Tag",
        label: "Type",
        value: "Personal Concept Project",
      },
      {
        icon: "Users",
        label: "Role",
        value: "UI/UX Designer (Solo)",
      },
      {
        icon: "CalendarDays",
        label: "Timeline",
        value: "Feb – Apr 2024 (8 Weeks)",
      },
      { icon: "Wrench", label: "Tools", value: "Figma" },
    ],
    problemSub: "People trying to live greener often face:",
    problems: [
      {
        icon: "Zap",
        label: "Conflicting advice",
        description:
          "Overwhelming, contradictory guidance makes the next useful action hard to find.",
      },
      {
        icon: "Clock",
        label: "Logging costs time",
        description:
          "Detailed manual entry for every purchase or trip becomes another obligation.",
      },
      {
        icon: "AlertTriangle",
        label: "Warnings backfire",
        description:
          "Carbon warnings without alternatives produce anxiety and avoidance, not habits.",
      },
    ],
    problemImage: IMAGES.volunteers,
    phoneImage: IMAGES.greenpath,
  },
  research: {
    title:
      "Users knew the problem. They needed a frictionless way to act.",
    body: "I conducted 10 user interviews and collected 120 survey responses from working adults interested in sustainability but struggling to build lasting habits. My initial assumption — that carbon knowledge was the gap — was disproven in the first three interviews. The same 10 interview participants later took part in usability testing; their prior context is a limitation worth noting.",
    image: IMAGES.volunteers,
    methods: [
      {
        icon: "Users",
        title: "User Interviews",
        body: "10 interviews with eco-conscious adults who had tried and abandoned sustainability apps, exploring motivation triggers and drop-off moments.",
      },
      {
        icon: "BarChart3",
        title: "Surveys",
        body: "120 responses measuring frequency of sustainable choices, barriers to adoption, and reactions to different feedback styles (guilt vs. reward).",
      },
      {
        icon: "Zap",
        title: "Competitive Analysis",
        body: "Reviewed 5 habit and sustainability apps, mapping how each handles data input complexity and motivational feedback loops.",
      },
    ],
    insights: [
      {
        icon: "AlertTriangle",
        body: "Guilt-tripping doesn't drive action — it drives anxiety and avoidance. Showing users their carbon output without alternatives caused disengagement, not behavior change.",
      },
      {
        icon: "Sparkles",
        body: "Convenience of alternatives was the #1 behavior driver. Users were willing to change habits when a low-carbon option was surfaced in the moment, not after logging.",
      },
      {
        icon: "Star",
        body: "Micro-rewards and visible cumulative impact sustained motivation, but only when the number had a reference point. A raw total meant little; progress toward a daily goal was easy to read.",
      },
    ],
  },
  process: {
    title: "From carbon calculator to quick, readable logging",
    body: "V1 required users to manually input every purchase and trip in detail across dense forms and pie charts. Drop-off was immediate. V2 replaced that with a quick log list and context-aware eco-routing suggestions — turning sustainable choices into the path of least resistance.",
    steps: [
      {
        icon: "PenTool",
        title: "V1: Warning Dashboard",
        body: "Initial lo-fi used full-screen carbon charts and manual data entry forms. Testing showed users felt overwhelmed and judged — drop-off happened within the first two screens.",
      },
      {
        icon: "LayoutGrid",
        title: "Directions Explored",
        body: "I explored three visual directions for the Today screen. Each had to make a number feel readable, not judgmental.",
        directions: [
          {
            label: "A",
            title: "Seed packet",
            verdict:
              "Warm and illustrative. Harder to extend to data-heavy screens.",
          },
          {
            label: "B",
            title: "Field notebook",
            verdict:
              "A strong hand-made feel. Dense tables get noisy.",
          },
          {
            label: "C",
            title: "Carbon label",
            verdict:
              "Turns every number into a format people already know.",
            chosen: true,
          },
        ],
      },
      {
        icon: "Boxes",
        title: "V2: Quick Log + Carbon Facts",
        body: "Logging became a short list: pick what you did, confirm. Every number borrows a format people already read: a nutrition label. Each action shows kg of CO₂ and its percent of a 2.5 kg daily goal; Route Facts compares walk, bike, and transit the same way.",
      },
      {
        icon: "Sparkles",
        title: "Cut: Barcode Supply-Chain Scanner",
        body: "Planned a product scanner to show full supply-chain carbon data. Removed after finding third-party databases were incomplete (damaging trust) and users wouldn't scan items mid-shopping.",
      },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title:
      "Tested with the same 10 participants across research and usability phases.",
    body: "The 10 participants who took part in research interviews also completed the usability evaluation over 2 weeks, using remote and in-person task-based sessions. This continuity enabled richer longitudinal observation but introduced familiarity bias — participants already understood the project's direction, which may have made V2 easier to navigate. V1 observations were from an earlier lo-fi prototype session; V2 sessions used the hi-fi prototype.",
    note: "The final Carbon label design has its own validation plan and has not been tested yet.",
    stats: [
      {
        value: "Quick logging worked",
        label:
          "Most participants completed the low-carbon logging task in V2 with noticeably fewer hesitations than V1's manual form — the contrast was visible in Think-Aloud sessions.",
      },
      {
        value: "Onboarding was immediate",
        label:
          "Most users set up their first eco challenge on first use without needing guidance — a clear improvement over the multi-step V1 onboarding.",
      },
      {
        value: "Tone shift was felt",
        label:
          "Post-test responses consistently described the experience as encouraging rather than guilt-inducing — the core goal of the redesign was confirmed.",
      },
    ],
    image: IMAGES.seedling,
  },
  reflection: {
    title: "Design for human behavior, not ideal behavior.",
    body: "The core lesson from GreenPath: you cannot design for the user you wish existed. Real people won't log 15 fields of data to feel virtuous. True UX craft means wrapping large societal values — sustainability — inside experiences so frictionless and instantly rewarding that behaviour change happens as a side effect of convenience.",
    points: [
      "Removing the warning dashboard wasn't a visual decision — it was a behaviour science decision. Anxiety reduces action; encouragement increases it.",
      "The barcode scanner cut was the right call. A feature that damages trust when it fails is worse than no feature at all. Scope discipline is a design skill.",
      "Carbon data motivates when it has a reference point. '14.2 kg saved' alone means little; '0.8 kg, 32% of today's goal' tells you where you stand and what is left.",
    ],
  },
};

const studyflowCase: CaseStudy = {
  subtitle:
    "A frictionless focus workspace that lowers the activation energy of starting — so students spend less time planning and more time in flow.",
  chips: ["Mobile App", "Productivity", "UX UI"],
  intro:
    "StudyFlow started as a strict scheduling tool. Research revealed that rigid time planning was the problem, not the solution. I redesigned it around one principle: make starting so easy that there's no excuse not to.",
  heroImage: ART.studyflowScene,
  tldr: {
    problem:
      "Students failed at starting, not studying. Detailed planning made them abandon sessions before the first minute.",
    whatIDid:
      "Solo, 9 weeks. 9 interviews and a 15-person diary study led me to replace calendar setup with a one-tap hourglass: turn the glass, and the sand shows time left.",
    outcome:
      'In testing with 8 users, more completed a full session in V2, and feedback described it as "less stressful to open." The final hourglass design has a validation plan ready.',
  },
  finalDesign: {
    intro:
      "The final design keeps one hero object on screen: an hourglass that shows time as sand.",
    images: [
      {
        src: ART.studyflow01Welcome,
        caption: "Begin with five minutes",
      },
      {
        src: ART.studyflow02Today,
        caption: "Today: turn the glass to start",
      },
      {
        src: ART.studyflow03TaskPicker,
        caption: "Choose a task without leaving Today",
      },
      {
        src: ART.studyflow04Duration,
        caption: "Pick 5, 15, 25, or 45 minutes",
      },
      {
        src: ART.studyflow05Focus,
        caption: "Focus: 18:42 remaining",
      },
      {
        src: ART.studyflow06Summary,
        caption: "Nice work: continue or take a break",
      },
      {
        src: ART.studyflow07Tasks,
        caption: "Tasks: start from the list",
      },
      {
        src: ART.studyflow08Progress,
        caption: "Progress: hours per day",
      },
      {
        src: ART.studyflow09Settings,
        caption: "Settings: a plain list",
      },
    ],
  },
  overview: {
    title:
      "The problem wasn't focus. It was the friction before focus.",
    body: "I originally assumed students failed to study because they lacked structured timers or detailed scheduling tools. Research proved the opposite: over-planning and strict schedules were causing analysis paralysis. StudyFlow was redesigned to remove every barrier between the user and their first focused minute. The final design turns time into an object you can see: an hourglass, where sand moves from waiting to done.",
    meta: [
      {
        icon: "Tag",
        label: "Type",
        value: "Personal Concept Project",
      },
      {
        icon: "Users",
        label: "Role",
        value: "UI/UX Designer (Solo)",
      },
      {
        icon: "CalendarDays",
        label: "Timeline",
        value: "Sep – Nov 2023 (9 Weeks)",
      },
      { icon: "Wrench", label: "Tools", value: "Figma" },
    ],
    problemSub: "Students trying to focus often struggle with:",
    problems: [
      {
        icon: "Zap",
        label: "Setup delays the first minute",
        description:
          "Choosing a subject, estimating time, and splitting subtasks all demand decisions before studying starts.",
      },
      {
        icon: "Clock",
        label: "Missed plans become all-or-nothing",
        description:
          "When a rigid plan slips, people abandon the session instead of adjusting it.",
      },
      {
        icon: "AlertTriangle",
        label: "Dense screens add pressure",
        description:
          "Feature-heavy productivity dashboards raise cognitive load before focus begins.",
      },
    ],
    problemImage: IMAGES.student,
    phoneImage: IMAGES.studyflow,
  },
  research: {
    title:
      "Strict schedules were making procrastination worse.",
    body: "I conducted 9 user interviews and a 1-week diary study with 15 students during high-pressure exam periods. My initial assumption — that students needed more precise time-planning tools — was challenged within the first few sessions. The real barrier was activation energy, not scheduling.",
    image: IMAGES.student,
    methods: [
      {
        icon: "Users",
        title: "User Interviews",
        body: "9 interviews with university students and working adults studying for certifications, focusing on where focus attempts broke down and what caused them to give up.",
      },
      {
        icon: "BarChart3",
        title: "Diary Study",
        body: "15 students logged study sessions for 1 week, capturing start times, interruptions, and emotional states. Revealed that missed sessions often followed over-ambitious planning the night before.",
      },
      {
        icon: "Zap",
        title: "Competitive Analysis",
        body: "Reviewed 6 focus and productivity tools including Forest, Notion, and Todoist — mapping how each handled session setup complexity and failure recovery.",
      },
    ],
    insights: [
      {
        icon: "AlertTriangle",
        body: "Activation energy was the #1 blocker. The more steps required to begin a session, the higher the likelihood of abandonment before starting.",
      },
      {
        icon: "Clock",
        body: "Strict time-boxing created anxiety, not structure. When users fell behind their plan, they gave up entirely rather than adjusting. Flexibility in timing reduced all-or-nothing thinking.",
      },
      {
        icon: "Sparkles",
        body: "Visual calm directly influenced perceived cognitive load. Low-contrast, minimal interfaces helped users stay in flow longer compared to feature-dense dashboards.",
      },
    ],
  },
  process: {
    title: "From calendar grid to one-tap focus card.",
    body: "The diary study predicted what prototype testing later confirmed: sessions that were planned in great detail the night before were the ones most likely to be skipped. V1's calendar-style setup required subjects, estimated durations, and sub-tasks before any session could begin — users dropped off before studying started. V2 reduced that to a single tap.",
    steps: [
      {
        icon: "PenTool",
        title: "V1: Calendar Grid Setup",
        body: "V1 required filling a detailed schedule before studying. The diary study had already shown that over-ambitious planning predicted abandonment; prototype testing confirmed drop-off happened during setup itself.",
      },
      {
        icon: "LayoutGrid",
        title: "Directions Explored",
        body: "I explored three visual directions for the Today screen. Each had to make starting feel smaller.",
        directions: [
          {
            label: "A",
            title: "Hourglass",
            verdict:
              "Time becomes a shape you can see, and the screen has one hero object.",
            chosen: true,
          },
          {
            label: "B",
            title: "Index cards",
            verdict:
              "Great for tasks, but the timer becomes secondary.",
          },
          {
            label: "C",
            title: "Punch card",
            verdict:
              "Clear and structured, but it reads like a table.",
          },
        ],
      },
      {
        icon: "Boxes",
        title: "V2: One-tap Hourglass",
        body: "V2 shows a single active task and one hero object: an hourglass. Turn the glass to start; the sand shows what is left at a glance. Task and duration are bottom sheets over Today, so context is never lost.",
      },
      {
        icon: "Sparkles",
        title: "Cut: App Blocking & Penalty System",
        body: "Originally planned a forced lock-out and score-deduction penalty for leaving mid-session. Removed after participants expressed strong resistance during testing — several stated they would delete such an app rather than accept being controlled by it.",
      },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title:
      "Validated by 8 users over 2 weeks of task-based testing.",
    body: "I tested with 8 target users (university students and certification-prep working adults) over 2 weeks using usability testing and task completion evaluation. Observations from V1 hi-fi sessions — conducted earlier during the design phase — are compared against V2 hi-fi testing. These were separate evaluation points taken at different stages of the project, not a controlled within-subjects study.",
    note: "These sessions used the earlier V2 prototype. The final hourglass design has its own validation plan (start in 2 taps or fewer, read time left from the sand) and has not been tested yet.",
    stats: [
      {
        value: "Session completion improved",
        label:
          "More participants completed a full focus session without abandoning in V2 vs V1, observed across 2 weeks of task-based testing with 8 users.",
      },
      {
        value: "Onboarding was frictionless",
        label:
          "Most users tapped into their first focus card and launched a timer on first use without reading any instructions or asking for help — setup felt immediate.",
      },
      {
        value: "Calm was clearly felt",
        label:
          "Post-test feedback consistently described V2 as 'less stressful to open' — the minimalist layout reduced perceived pressure before sessions.",
      },
    ],
    image: IMAGES.studyflow,
  },
  reflection: {
    title: "Design for cognitive flow, not cognitive load.",
    body: "The defining principle of StudyFlow: every decision point, every form field, every extra screen is a potential exit. Productivity tools fail when they demand mental effort before delivering mental reward. The job of the designer is to eliminate friction until starting feels easier than not starting.",
    points: [
      "The calendar setup cut was the most impactful design decision in the project. Removing complexity from the entry point had more effect than any visual or interaction refinement downstream.",
      "The penalty system removal was confirmed by testing and aligned with a core design value. Testing showed the feature triggered resistance; our values said focus should come from internal motivation, not fear. Evidence and values pointed the same direction — that made the cut easy to defend.",
      "Calm is a design feature, not a visual style. Low-contrast, single-task layouts actively reduced the cognitive load users reported feeling before a session began.",
    ],
  },
};

export const PROJECTS: Project[] = [
  {
    id: "bridgly",
    name: "Bridgly",
    tagline:
      "A long-distance relationship app that helps couples stay connected.",
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
    description:
      "A companion app that nudges you toward greener daily habits.",
    tags: ["Mobile", "Lifestyle", "UX UI"],
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
    tagline: "Focus & productivity mobile app.",
    description:
      "A focus timer and study planner for calmer, deeper work sessions.",
    tags: ["Mobile", "Productivity", "UX UI"],
    image: ART.studyflowScene,
    icon: "BookOpen",
    iconImage: ART.studyflowIcon,
    accent: "var(--hw-accent-studyflow)",
    hasCaseStudy: true,
    caseStudy: studyflowCase,
  },
];

export const VISIBLE_PROJECTS = PROJECTS.filter(
  (project) => project.id === "bridgly",
);

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

export type CaseTab = (typeof CASE_TABS)[number] | "Final Design";
