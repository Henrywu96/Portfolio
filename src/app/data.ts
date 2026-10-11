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
    note?: string;
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
  subtitle:
    "A long-distance relationship app designed around emotional presence — helping couples feel in each other's world through shared moments, daily connection, and meaningful milestones.",
  chips: ["Mobile App", "Relationship", "UX UI"],
  intro:
    "Bridgly started as a goal-tracking app, but research revealed couples didn't need another task manager — they needed to feel present in each other's daily lives. The design shifted entirely toward warmth, awareness, and emotional closeness.",
  heroImage: ART.bridglyScene2,
  tldr: {
    problem:
      "Long-distance couples could message all day but still couldn't tell when the other was awake or free.",
    whatIDid:
      "Solo, 10 weeks. 12 interviews and 87 survey responses led me to pivot from a goal tracker to a dual-time dial that shows both cities and the window when you are both free.",
    outcome:
      "In Think-Aloud tests with 8 users, V2 felt warmer than V1 and most found partner context and the reunion countdown on the first try. The final dial design has a validation plan ready.",
  },
  overview: {
    title:
      "Couples don't need a task manager. They need to feel each other's presence.",
    body: "I originally designed Bridgly as a shared goal tracker for long-distance couples. Research showed the real problem was different: couples felt emotionally out of sync — not because they lacked tools, but because existing apps treated relationships like productivity tasks. Bridgly was redesigned around emotional presence: knowing each other's world, staying connected daily, and marking the moments that matter.",
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
        value: "May – Jul 2024 (10 Weeks)",
      },
      { icon: "Wrench", label: "Tools", value: "Figma" },
    ],
    problemSub: "Long-distance couples often struggle with:",
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
          "Without seeing the overlap, it is hard to know a partner's status or find a good time to call.",
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
    phoneMockup: ART.bridglyPhones,
  },
  research: {
    title:
      "The gap wasn't missing tools — it was missing presence.",
    body: "I conducted 12 user interviews and collected 87 survey responses from couples in long-distance relationships across 6 countries. My original hypothesis was that couples struggled because they lacked shared goal-tracking tools. The interviews revealed something different entirely.",
    image: ART.bridglyCoupleCloud,
    illustration: true,
    methods: [
      {
        icon: "Users",
        title: "User Interviews",
        body: "12 in-depth interviews with long-distance couples, exploring what made them feel connected or disconnected on a daily basis — and what existing apps got wrong.",
        image: ART.iconInterview,
      },
      {
        icon: "BarChart3",
        title: "Surveys",
        body: "87 responses from users across 6 countries, exploring emotional patterns, communication frequency, and what moments made couples feel 'in sync'.",
        image: ART.iconSurvey,
      },
      {
        icon: "Zap",
        title: "Competitive Analysis",
        body: "Reviewed 6 relationship and communication apps, identifying a common gap: most focused on messaging or task-tracking, few addressed emotional presence.",
        image: ART.iconCompetitive,
      },
    ],
    insights: [
      {
        icon: "Heart",
        body: "Couples didn't want another task manager — they wanted to feel part of each other's day. Knowing a partner's weather, time zone, or current mood mattered more than shared to-do lists.",
      },
      {
        icon: "Sparkles",
        body: 'Small, ambient moments of connection sustained relationships more than milestone events. A quick "thinking of you" beat a weekly review call.',
      },
      {
        icon: "Repeat",
        body: "Shared countdowns and rituals gave couples something to look forward to together. Anticipation of reunion was itself a form of emotional connection.",
      },
    ],
  },
  process: {
    title:
      "V1 felt like project management. V2 felt like being close.",
    body: "Research established the product direction: couples needed presence, not a productivity layer. Prototype testing then confirmed how that direction should be implemented — the information-dense V1 felt clinical and impersonal. V2 translated the research insight into one object on the home screen: a dual-time dial that shows both cities and the window when you are both free.",
    steps: [
      {
        icon: "PenTool",
        title: "V1: Information Dashboard",
        body: "V1 opened with activity logs, progress charts, and a shared task list. Prototype sessions confirmed what research suggested: users described it as 'managing a project, not a relationship.'",
      },
      {
        icon: "LayoutGrid",
        title: "Directions Explored",
        body: "I explored three visual directions for the home screen. Each had to show two cities at a glance.",
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
              "Warm and personal. Hard to stretch to chat, calendar, and plans.",
          },
          {
            label: "C",
            title: "GMT dial",
            verdict:
              "One scale for both cities. The shared window becomes a shape you can see.",
            chosen: true,
          },
        ],
      },
      {
        icon: "Boxes",
        title: "V2: One Dial for Two Cities",
        body: "V2 is built on one object: a GMT dual-time dial. Both cities sit on one 24-hour scale, so the window when you are both awake and free becomes a shape you can see.",
      },
      {
        icon: "Sparkles",
        title: "Cut: Global Leaderboard",
        body: "Originally planned a gamified leaderboard and reward store. During testing, participants reacted negatively to competitive ranking — describing it as anxiety-inducing and misaligned with how they wanted to feel in the app. This also conflicted with a core design principle: intimacy and competition don't coexist.",
      },
    ],
    image: IMAGES.stickyNotes,
  },
  results: {
    title:
      "Tested with 8 users over 2 weeks — V1 hi-fi vs V2 hi-fi.",
    body: "I recruited 8 target users (students and working professionals in long-distance relationships) for a 2-week usability test using Think-Aloud Protocol. Sessions covered key flows: exploring partner context, sending a message, and interacting with the reunion countdown. All observations compared V1 against V2.",
    note: "These sessions used the earlier V2 prototype. The final GMT dial design has a validation plan of its own and has not been tested yet.",
    stats: [
      {
        value: "Emotional tone landed",
        label:
          "Participants consistently described V2 as feeling warmer and more personal than V1 during Think-Aloud walkthroughs — 'it feels like you're together' was a recurring response.",
      },
      {
        value: "Navigation was intuitive",
        label:
          "Most users reached the partner awareness screen and reunion countdown on first attempt without instruction. Key flows required little to no guidance.",
      },
      {
        value: "Visual satisfaction was high",
        label:
          "Post-test questionnaire on interface warmth, clarity, and emotional appropriateness returned consistently positive responses across all 8 participants.",
      },
    ],
    image: IMAGES.coupleHands,
  },
  reflection: {
    title:
      "Emotional tone is an IA decision, not just a visual one.",
    body: "The biggest lesson from Bridgly came from watching users react to V1. The data dashboard wasn't wrong because it was ugly — it was wrong because it framed the relationship as a project to manage. Moving partner context to the first screen and leading with warmth rather than metrics completely changed how users described the app. 'It feels like you're together' replaced 'it feels like homework.'",
    points: [
      "The V1→V2 pivot wasn't a visual redesign — it was a product framing shift. Choosing what to surface first (partner's world vs. your task list) defines the emotional contract of the entire app.",
      "The leaderboard cut was grounded in both testing observations and design values — they happened to align. Testing showed it triggered anxiety; our core principle said intimacy and competition don't coexist. When evidence and values point the same direction, the decision is straightforward.",
      "Think-Aloud testing revealed emotional misalignment that satisfaction scores would have missed. Watching users navigate and hearing them describe how the app made them feel was more useful than any post-test survey.",
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
