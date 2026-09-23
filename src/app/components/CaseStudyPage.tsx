import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Heart,
  Sword,
  Trophy,
  Scroll,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { icon } from "./icons";
import { CASE_TABS, type CaseTab, type Project, type CaseStudy } from "../data";

const RARITY: Record<string, { label: string; color: string; level: number }> = {
  bridgly: { label: "LEGENDARY", color: "var(--hw-rarity-legendary)", level: 50 },
  greenpath: { label: "EPIC", color: "var(--hw-rarity-epic)", level: 38 },
  studyflow: { label: "RARE", color: "var(--hw-rarity-rare)", level: 27 },
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-white px-2.5 py-1 text-[12px] text-[var(--hw-slate)] ring-1 ring-[var(--hw-border)]">
      {children}
    </span>
  );
}

export function CaseStudyPage({
  project,
  onBack,
  onViewPrototype,
  initialTab = "Overview",
}: {
  project: Project;
  onBack: () => void;
  onViewPrototype?: () => void;
  initialTab?: CaseTab;
}) {
  const [tab, setTab] = useState<CaseTab>(initialTab);
  const [showProtoModal, setShowProtoModal] = useState(false);
  const cs = project.caseStudy!;
  const rarity = RARITY[project.id] ?? { label: "COMMON", color: "var(--hw-rarity-common)", level: 10 };
  const chapter = CASE_TABS.indexOf(tab) + 1;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--hw-cream)] text-[var(--hw-navy)]">
      <div className="border-b border-[var(--hw-border)] bg-[var(--hw-cream)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[14px] text-[var(--hw-slate)] transition hover:text-[var(--hw-navy)]"
          >
            <ArrowLeft className="size-4" /> Back to Quest Board
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-12 sm:pt-16">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.2em] text-[var(--hw-coral)]">
                <Scroll className="size-3.5" /> QUEST LOG
              </p>
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider text-white"
                style={{ backgroundColor: rarity.color }}
              >
                {rarity.label}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-[var(--hw-navy)] px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                <Sword className="size-3" /> LV.{rarity.level}
              </span>
            </div>
            <h1 className="mt-2 text-[36px] leading-none text-[var(--hw-navy)] sm:text-[48px] md:text-[52px]">
              {project.name}
            </h1>
            <p className="mt-3 max-w-md text-[17px] leading-relaxed text-[var(--hw-slate)]">
              {cs.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-[var(--hw-slate)]">
              {cs.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => setShowProtoModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--hw-coral)] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(236,106,78,0.9)] transition hover:brightness-105"
              >
                View Prototype <ArrowRight className="size-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.accent}26, ${project.accent}12)`,
              }}
            />
            <ImageWithFallback
              src={cs.heroImage}
              alt={`${project.name} hero`}
              className={`relative h-[220px] w-full sm:h-[300px] md:h-[360px] ${
                project.iconImage ? "object-contain p-4" : "object-cover"
              }`}
            />
            <Heart className="absolute right-6 top-6 z-10 size-8 fill-[var(--hw-coral)] text-[var(--hw-coral)] drop-shadow" />
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-30 mt-10 border-b border-[var(--hw-border)] bg-[var(--hw-cream)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5">
          <div className="flex gap-6 overflow-x-auto">
            {CASE_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative whitespace-nowrap py-4 text-[14px] transition-colors ${
                  tab === t
                    ? "text-[var(--hw-coral)]"
                    : "text-[var(--hw-slate)] hover:text-[var(--hw-navy)]"
                }`}
              >
                {t}
                {tab === t && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[var(--hw-coral)]" />
                )}
              </button>
            ))}
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--hw-slate)] sm:flex">
            CHAPTER {chapter}/{CASE_TABS.length}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-12 pb-28">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {tab === "Overview" && <Overview cs={cs} projectId={project.id} />}
          {tab === "Research" && <Research cs={cs} />}
          {tab === "Design Process" && <DesignProcess cs={cs} />}
          {tab === "Results" && <Results cs={cs} />}
          {tab === "Reflection" && <Reflection cs={cs} />}
        </motion.div>
      </div>

      {/* Prototype modal */}
      {showProtoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowProtoModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
            style={{ border: "1.5px solid var(--hw-border)" }}
          >
            {/* Icon */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--hw-peach)" }}>
              <Heart className="size-7" style={{ color: "var(--hw-coral)" }} />
            </div>
            <h3 className="text-center text-[20px] font-bold leading-snug" style={{ color: "var(--hw-navy)", fontFamily: "var(--font-display)" }}>
              Prototype Coming Soon
            </h3>
            <p className="mt-3 text-center text-[14px] leading-relaxed" style={{ color: "var(--hw-slate)", fontFamily: "var(--font-body)" }}>
              Full interactive prototype and end-to-end user flows are available for walkthrough during the interview stage.
            </p>
            <button
              onClick={() => setShowProtoModal(false)}
              className="mt-6 w-full rounded-xl py-3 text-[14px] font-semibold text-white transition hover:brightness-105"
              style={{ background: "var(--hw-coral)", fontFamily: "var(--font-body)" }}
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--hw-coral)]">
      {children}
    </p>
  );
}

/* ---------- Phone frame + screen helpers ---------- */
function PhoneFrame({ children, tall }: { children: React.ReactNode; tall?: boolean }) {
  const px = 8; /* right inset */
  const pxLeft = 12; /* left inset — slightly more breathing room for time */
  const pillW = tall ? 42 : 36;
  const pillH = tall ? 12 : 10;
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-[24px] border-[3px] border-[var(--hw-navy)] bg-white shadow-xl ${tall ? "h-72 w-40" : "h-60 w-[136px] opacity-90"}`}>
      {/* Status bar */}
      <div
        className="relative flex shrink-0 items-center justify-between bg-white"
        style={{ height: tall ? 24 : 20, paddingLeft: pxLeft, paddingRight: px }}
      >
        {/* Dynamic Island pill — absolute center */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
          style={{ width: pillW, height: pillH }}
        />
        {/* Time */}
        <span className="text-[6.5px] font-semibold leading-none text-black">9:41</span>
        {/* Status icons */}
        <div className="flex items-center gap-[2px]">
          {/* Signal bars */}
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
            <rect x="0"   y="3.5" width="1.8" height="2.5" rx="0.3" fill="black"/>
            <rect x="2.4" y="2"   width="1.8" height="4"   rx="0.3" fill="black"/>
            <rect x="4.8" y="0.8" width="1.8" height="5.2" rx="0.3" fill="black"/>
            <rect x="7.2" y="0"   width="1.8" height="6"   rx="0.3" fill="black" opacity="0.25"/>
          </svg>
          {/* WiFi */}
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M0.4 2.8 C1.5 0.9 2.6 0.5 4 0.5 C5.4 0.5 6.5 0.9 7.6 2.8" stroke="black" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
            <path d="M1.7 4.2 C2.4 3 3.1 2.6 4 2.6 C4.9 2.6 5.6 3 6.3 4.2" stroke="black" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
            <circle cx="4" cy="5.5" r="0.7" fill="black"/>
          </svg>
          {/* Battery */}
          <svg width="15" height="7" viewBox="0 0 15 7" fill="none">
            <rect x="0.4" y="0.4" width="11.5" height="6.2" rx="1.6" stroke="black" strokeWidth="0.75"/>
            <rect x="12.4" y="2.2" width="1.8"  height="2.6" rx="0.9" fill="black" opacity="0.4"/>
            <rect x="1.3"  y="1.3" width="8.8"  height="4.4" rx="1"   fill="black"/>
          </svg>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function PhoneTriple({ a, b, c }: { a: React.ReactNode; b: React.ReactNode; c: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden py-4">
      <div className="flex shrink-0 origin-center items-end gap-3 [transform:scale(0.58)] sm:[transform:scale(0.82)] md:[transform:scale(1)]">
        <PhoneFrame>{a}</PhoneFrame>
        <PhoneFrame tall>{b}</PhoneFrame>
        <PhoneFrame>{c}</PhoneFrame>
      </div>
    </div>
  );
}

/* Bridgly onboarding screens (image-12) */
function BridglyScreen1() {
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-coral)" }}>Bridgly</span>
        <span className="text-[7px]" style={{ color: "var(--hw-slate)" }}>Skip</span>
      </div>
      <div className="relative mx-auto mt-2 flex h-[72px] w-[72px] items-center justify-center rounded-full" style={{ background: "var(--hw-peach)" }}>
        <div className="flex gap-1">
          <div className="flex h-10 w-6 flex-col overflow-hidden rounded-[6px] shadow" style={{ background: "#fff8e1" }}>
            <div className="h-1" style={{ background: "#fbbf24" }} />
            <div className="flex-1" style={{ background: "linear-gradient(to bottom, #bae6fd, #fef9c3)" }} />
            <div className="py-0.5 text-center text-[5px] font-bold" style={{ color: "#92400e" }}>14:00</div>
          </div>
          <div className="flex h-10 w-6 flex-col overflow-hidden rounded-[6px] shadow" style={{ background: "var(--hw-navy)" }}>
            <div className="h-1" style={{ background: "var(--hw-navy)" }} />
            <div className="flex flex-1 items-center justify-center" style={{ background: "#1e1b4b" }}>
              <span className="text-[9px]">🌙</span>
            </div>
            <div className="py-0.5 text-center text-[5px] font-bold text-white">07:00</div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex-1 text-center">
        <p className="text-[8px] font-bold leading-tight" style={{ color: "var(--hw-navy)" }}>See Their World<br/>in Real Time</p>
        <p className="mt-1 text-[6px] leading-tight" style={{ color: "var(--hw-slate)" }}>Know your partner's local time, weather, and daily rhythm</p>
      </div>
      <div className="mb-1.5 flex justify-center gap-1">
        <div className="h-1 w-3 rounded-full" style={{ background: "var(--hw-coral)" }} />
        {[0,1,2].map(i => <div key={i} className="h-1 w-1 rounded-full" style={{ background: "var(--hw-border)" }} />)}
      </div>
      <div className="rounded-lg py-1.5 text-center" style={{ background: "var(--hw-coral)" }}>
        <span className="text-[8px] font-bold text-white">Next</span>
      </div>
    </div>
  );
}

function BridglyScreen2() {
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-coral)" }}>Bridgly</span>
        <span className="text-[7px]" style={{ color: "var(--hw-slate)" }}>Skip</span>
      </div>
      <div className="relative mx-auto mt-2 flex h-[72px] w-[72px] items-center justify-center rounded-full" style={{ background: "var(--hw-peach)" }}>
        <div className="relative flex h-12 w-14 items-center justify-center rounded-xl shadow-lg" style={{ background: "var(--hw-coral)" }}>
          <span className="text-[22px]">❤️</span>
          <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2" width="28" height="10" viewBox="0 0 28 10">
            <path d="M0 5 L4 5 L7 1 L10 9 L13 5 L17 5 L20 2 L23 8 L26 5 L28 5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <div className="mt-3 flex-1 text-center">
        <p className="text-[8px] font-bold leading-tight" style={{ color: "var(--hw-navy)" }}>Chat with Emotion,<br/>Not Just Words</p>
        <p className="mt-1 text-[6px] leading-tight" style={{ color: "var(--hw-slate)" }}>Send haptic hugs, emotional context tags, and voice capsules</p>
      </div>
      <div className="mb-1.5 flex justify-center gap-1">
        <div className="h-1 w-1 rounded-full" style={{ background: "var(--hw-border)" }} />
        <div className="h-1 w-3 rounded-full" style={{ background: "var(--hw-coral)" }} />
        {[0,1].map(i => <div key={i} className="h-1 w-1 rounded-full" style={{ background: "var(--hw-border)" }} />)}
      </div>
      <div className="rounded-lg py-1.5 text-center" style={{ background: "var(--hw-coral)" }}>
        <span className="text-[8px] font-bold text-white">Next</span>
      </div>
    </div>
  );
}

function BridglyScreen3() {
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-coral)" }}>Bridgly</span>
        <span className="text-[7px]" style={{ color: "var(--hw-slate)" }}>Skip</span>
      </div>
      <div className="relative mx-auto mt-2 flex h-[72px] w-[72px] items-center justify-center rounded-full" style={{ background: "var(--hw-peach)" }}>
        <div className="text-center">
          <div className="rounded-xl px-2.5 py-1.5 shadow-lg" style={{ background: "var(--hw-navy)" }}>
            <div className="text-[5px] font-semibold text-white/60">TOGETHER</div>
            <div className="text-[18px] font-bold leading-none text-white">23</div>
            <div className="text-[5px] text-white/60">DAYS</div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex-1 text-center">
        <p className="text-[8px] font-bold leading-tight" style={{ color: "var(--hw-navy)" }}>Build Your Future<br/>Together</p>
        <p className="mt-1 text-[6px] leading-tight" style={{ color: "var(--hw-slate)" }}>Set reunion countdowns, milestone goals, and track your shared journey</p>
      </div>
      <div className="mb-1.5 flex justify-center gap-1">
        {[0,1].map(i => <div key={i} className="h-1 w-1 rounded-full" style={{ background: "var(--hw-border)" }} />)}
        <div className="h-1 w-3 rounded-full" style={{ background: "var(--hw-coral)" }} />
        <div className="h-1 w-1 rounded-full" style={{ background: "var(--hw-border)" }} />
      </div>
      <div className="rounded-lg py-1.5 text-center" style={{ background: "var(--hw-coral)" }}>
        <span className="text-[8px] font-bold text-white">Next</span>
      </div>
    </div>
  );
}

/* GreenPath screens */
function GreenScreen1() {
  const actions = [
    { done: true, label: "Bring reusable bag" },
    { done: true, label: "Meatless meal" },
    { done: false, label: "Walk or bike" },
    { done: false, label: "Short shower" },
  ];
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-accent-greenpath)" }}>GreenPath</span>
        <div className="flex items-center gap-0.5 rounded-full bg-green-100 px-1.5 py-0.5">
          <span className="text-[7px]">🔥</span>
          <span className="text-[7px] font-bold text-green-700">12</span>
        </div>
      </div>
      <p className="mt-1.5 text-[6.5px] font-bold tracking-wide" style={{ color: "var(--hw-slate)" }}>TODAY'S ACTIONS</p>
      <div className="mt-1 flex-1 space-y-1.5">
        {actions.map((a) => (
          <div key={a.label} className="flex items-center gap-1.5 rounded-lg bg-green-50 px-2 py-1.5">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full" style={{ background: a.done ? "var(--hw-accent-greenpath)" : "white", border: a.done ? "none" : "1.5px solid #d1fae5" }}>
              {a.done && <span className="text-[7px] text-white">✓</span>}
            </div>
            <span className="text-[7px]" style={{ color: a.done ? "var(--hw-slate)" : "var(--hw-navy)", textDecoration: a.done ? "line-through" : "none" }}>{a.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 rounded-lg py-1.5 text-center" style={{ background: "var(--hw-accent-greenpath)" }}>
        <span className="text-[7.5px] font-bold text-white">Log Action</span>
      </div>
    </div>
  );
}

function GreenScreen2() {
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-accent-greenpath)" }}>GreenPath</span>
        <span className="text-[7px]" style={{ color: "var(--hw-slate)" }}>May 2024</span>
      </div>
      <div className="mx-auto mt-2 flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full border-[4px] bg-green-50" style={{ borderColor: "var(--hw-accent-greenpath)" }}>
        <span className="text-[18px] font-bold" style={{ color: "var(--hw-accent-greenpath)" }}>12</span>
        <span className="text-[6px] text-green-600">day streak</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1">
        {[["3.2 kg", "CO₂ saved"], ["24 L", "Water saved"]].map(([v, l]) => (
          <div key={l} className="rounded-lg bg-green-50 p-1.5 text-center">
            <p className="text-[10px] font-bold" style={{ color: "var(--hw-accent-greenpath)" }}>{v}</p>
            <p className="text-[6px]" style={{ color: "var(--hw-slate)" }}>{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-lg py-1.5 text-center" style={{ background: "var(--hw-accent-greenpath)" }}>
        <span className="text-[7.5px] font-bold text-white">View Full Impact</span>
      </div>
    </div>
  );
}

function GreenScreen3() {
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-accent-greenpath)" }}>GreenPath</span>
        <div className="rounded-full bg-green-100 px-1.5 py-0.5 text-[6px] font-bold text-green-700">LEVEL 3</div>
      </div>
      <p className="mt-1.5 text-[6.5px] font-bold tracking-wide" style={{ color: "var(--hw-slate)" }}>WEEKLY CHALLENGE</p>
      <div className="mt-1 rounded-xl p-2.5 text-white" style={{ background: "linear-gradient(135deg, #4c9a63, #22c55e)" }}>
        <span className="text-[13px]">🌱</span>
        <p className="mt-0.5 text-[8px] font-bold leading-tight">Zero Waste Week</p>
        <p className="mt-0.5 text-[6px] text-white/80">Avoid single-use plastics for 7 days</p>
        <div className="mt-1.5 h-1 w-full rounded-full bg-white/30">
          <div className="h-full w-3/5 rounded-full bg-white" />
        </div>
        <p className="mt-0.5 text-[5.5px] text-white/70">4 of 7 days completed</p>
      </div>
      <div className="mt-1.5 space-y-1">
        {[["🚴", "Bike to work", "+50 pts"], ["🥗", "Plant-based meal", "+30 pts"]].map(([e, l, p]) => (
          <div key={l} className="flex items-center gap-1.5 rounded-lg bg-green-50 px-2 py-1.5">
            <span className="text-[8px]">{e}</span>
            <span className="text-[7px]" style={{ color: "var(--hw-navy)" }}>{l}</span>
            <span className="ml-auto text-[6px]" style={{ color: "var(--hw-slate)" }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* StudyFlow screens */
function StudyScreen1() {
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-accent-studyflow)" }}>StudyFlow</span>
        <div className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[6px] font-bold text-amber-700">FOCUS</div>
      </div>
      <p className="mt-0.5 text-center text-[6px]" style={{ color: "var(--hw-slate)" }}>Chapter 4 · Research Methods</p>
      <div className="relative mx-auto mt-2 flex h-[72px] w-[72px] items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="30" fill="none" stroke="var(--hw-border)" strokeWidth="5"/>
          <circle cx="36" cy="36" r="30" fill="none" stroke="var(--hw-accent-studyflow)" strokeWidth="5" strokeDasharray="188" strokeDashoffset="47" strokeLinecap="round"/>
        </svg>
        <div className="text-center">
          <p className="text-[15px] font-bold" style={{ color: "var(--hw-navy)" }}>18:42</p>
          <p className="text-[5.5px]" style={{ color: "var(--hw-slate)" }}>remaining</p>
        </div>
      </div>
      <div className="mt-1 flex justify-center gap-1.5">
        <div className="rounded bg-amber-50 px-1.5 py-0.5 text-[5.5px] text-amber-700">Pomodoro 3/4</div>
        <div className="rounded bg-blue-50 px-1.5 py-0.5 text-[5.5px] text-blue-700">Break in 18m</div>
      </div>
      <div className="mt-auto rounded-lg py-1.5 text-center" style={{ background: "var(--hw-accent-studyflow)" }}>
        <span className="text-[7.5px] font-bold text-white">Pause Session</span>
      </div>
    </div>
  );
}

function StudyScreen2() {
  const tasks = [
    { done: true, e: "📚", label: "Read Ch.3" },
    { done: true, e: "✏️", label: "Take notes" },
    { done: false, e: "🧮", label: "Practice problems", hi: true },
    { done: false, e: "🃏", label: "Review flashcards" },
  ];
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-accent-studyflow)" }}>StudyFlow</span>
        <span className="text-[7px]" style={{ color: "var(--hw-slate)" }}>Mon, Oct 14</span>
      </div>
      <div className="mt-1 flex items-center gap-1">
        <div className="h-1 flex-1 rounded-full" style={{ background: "var(--hw-border)" }}>
          <div className="h-full w-1/2 rounded-full" style={{ background: "var(--hw-accent-studyflow)" }} />
        </div>
        <span className="text-[6px]" style={{ color: "var(--hw-slate)" }}>2/4</span>
      </div>
      <div className="mt-1.5 flex-1 space-y-1.5">
        {tasks.map((t) => (
          <div key={t.label} className="flex items-center gap-1.5 rounded-lg px-2 py-1.5" style={{ background: t.hi ? "#fffbeb" : "var(--hw-cream)", outline: t.hi ? "1px solid #fde68a" : "none" }}>
            <div className="flex size-4 shrink-0 items-center justify-center rounded" style={{ background: t.done ? "var(--hw-accent-studyflow)" : "white", border: t.done ? "none" : "1.5px solid var(--hw-border)" }}>
              {t.done && <span className="text-[7px] text-white">✓</span>}
            </div>
            <span className="text-[7px]">{t.e}</span>
            <span className="text-[7px]" style={{ color: t.done ? "var(--hw-slate)" : "var(--hw-navy)", textDecoration: t.done ? "line-through" : "none" }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudyScreen3() {
  const days = ["M","T","W","T","F","S","S"];
  const hrs =  [2.5, 3, 1.5, 4, 3.5, 1, 0];
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold" style={{ color: "var(--hw-accent-studyflow)" }}>StudyFlow</span>
        <span className="text-[7px]" style={{ color: "var(--hw-slate)" }}>This week</span>
      </div>
      <div className="mt-1 grid grid-cols-3 gap-1">
        {[["15.5h","studied"],["24","sessions"],["6🔥","streak"]].map(([v,l]) => (
          <div key={l} className="rounded-lg bg-amber-50 p-1 text-center">
            <p className="text-[9px] font-bold" style={{ color: "var(--hw-accent-studyflow)" }}>{v}</p>
            <p className="text-[5.5px]" style={{ color: "var(--hw-slate)" }}>{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-[6px] font-semibold tracking-wide" style={{ color: "var(--hw-slate)" }}>DAILY HOURS</p>
      <div className="mt-1 flex flex-1 items-end justify-between gap-0.5">
        {days.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
            <div className="w-full rounded-t" style={{ height: `${(hrs[i] / 4) * 36}px`, background: i === 3 ? "var(--hw-accent-studyflow)" : "var(--hw-border)" }} />
            <span className="text-[5.5px]" style={{ color: "var(--hw-slate)" }}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Overview ---------- */
function Overview({ cs, projectId }: { cs: CaseStudy; projectId: string }) {
  const o = cs.overview;
  return (
    <div className="space-y-12">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <Kicker>OVERVIEW</Kicker>
          <h2 className="mt-2 break-words text-[26px] leading-tight text-[var(--hw-navy)] sm:text-[34px]">
            {o.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--hw-slate)]">
            {o.body}
          </p>
        </div>
        <div className="min-w-0">
        {projectId === "bridgly" ? (
          <PhoneTriple
            a={<BridglyScreen1 />}
            b={<BridglyScreen2 />}
            c={<BridglyScreen3 />}
          />
        ) : projectId === "greenpath" ? (
          <PhoneTriple
            a={<GreenScreen1 />}
            b={<GreenScreen2 />}
            c={<GreenScreen3 />}
          />
        ) : projectId === "studyflow" ? (
          <PhoneTriple
            a={<StudyScreen1 />}
            b={<StudyScreen2 />}
            c={<StudyScreen3 />}
          />
        ) : o.phoneMockup ? (
          <img src={o.phoneMockup} alt="App screens" className="mx-auto h-72 w-full object-contain md:h-80" />
        ) : (
          <div className="flex items-end justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`overflow-hidden rounded-[26px] border-4 border-[var(--hw-navy)] bg-black shadow-xl ${i === 1 ? "h-72 w-40" : "h-60 w-36 opacity-90"}`}>
                <ImageWithFallback src={o.phoneImage} alt="App screen" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {o.meta.map((m) => {
          const Icon = icon(m.icon);
          return (
            <div key={m.label} className="rounded-2xl border border-[var(--hw-border)] bg-white p-4">
              <p className="flex items-center gap-2 text-[12px] font-semibold tracking-wide text-[var(--hw-coral)]">
                <Icon className="size-4" /> {m.label}
              </p>
              <p className="mt-1 text-[14px] font-medium text-[var(--hw-navy)]">
                {m.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid items-center gap-8 rounded-3xl border border-[var(--hw-border)] bg-white p-6 md:grid-cols-[1fr_200px]">
        <div>
          <h3 className="text-[22px] text-[var(--hw-navy)]">The Problem</h3>
          <p className="mt-1 text-[14px] text-[var(--hw-slate)]">{o.problemSub}</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {o.problems.map((p) => {
              const Icon = icon(p.icon);
              return (
                <div key={p.label} className="text-center">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      className="mx-auto size-16 object-contain"
                    />
                  ) : (
                    <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[var(--hw-peach)] text-[var(--hw-coral)]">
                      <Icon className="size-5" />
                    </span>
                  )}
                  <p className="mt-2 text-[12px] leading-snug text-[var(--hw-slate)]">
                    {p.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <ImageWithFallback
          src={o.problemImage}
          alt="Problem framing"
          className="h-44 w-full rounded-2xl object-cover"
        />
      </div>
    </div>
  );
}

/* ---------- Research ---------- */
function Research({ cs }: { cs: CaseStudy }) {
  const r = cs.research;
  return (
    <div className="space-y-12">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <Kicker>RESEARCH</Kicker>
          <h2 className="mt-2 break-words text-[24px] leading-tight text-[var(--hw-navy)] sm:text-[32px]">
            {r.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--hw-slate)]">
            {r.body}
          </p>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--hw-rose-from)] to-[var(--hw-rose-to)]" style={{ minHeight: 200 }}>
          {r.illustration ? (
            <img
              src={r.image}
              alt="Research"
              className="h-52 w-full object-contain p-3"
            />
          ) : (
            <ImageWithFallback
              src={r.image}
              alt="Research"
              className="h-52 w-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {r.methods.map((m) => {
          const Icon = icon(m.icon);
          return (
            <div key={m.title} className="rounded-2xl border border-[var(--hw-border)] bg-white p-5">
              {m.image ? (
                <img src={m.image} alt="" className="size-14 object-contain" />
              ) : (
                <span className="grid size-10 place-items-center rounded-xl bg-[var(--hw-peach)] text-[var(--hw-coral)]">
                  <Icon className="size-5" />
                </span>
              )}
              <h3 className="mt-3 text-[16px] text-[var(--hw-navy)]">{m.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--hw-slate)]">
                {m.body}
              </p>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="text-[20px] text-[var(--hw-navy)]">Key Insights</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {r.insights.map((ins, i) => {
            const Icon = icon(ins.icon);
            return (
              <div key={i} className="rounded-2xl border border-[var(--hw-border)] bg-white p-6 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--hw-peach)] text-[var(--hw-coral)]">
                  <Icon className="size-6" />
                </span>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--hw-navy)]">
                  {ins.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Design Process ---------- */
function DesignProcess({ cs }: { cs: CaseStudy }) {
  const p = cs.process;
  return (
    <div className="space-y-12">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <Kicker>DESIGN PROCESS</Kicker>
          <h2 className="mt-2 break-words text-[24px] leading-tight text-[var(--hw-navy)] sm:text-[32px]">
            {p.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--hw-slate)]">
            {p.body}
          </p>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden rounded-3xl" style={{ minHeight: 200 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--hw-rose-from)]/60 to-[var(--hw-rose-to)]/60 mix-blend-multiply" />
          <ImageWithFallback
            src={p.image}
            alt="Design process"
            className="h-52 w-full object-cover"
          />
        </div>
      </div>

      <div className="relative grid gap-4 sm:grid-cols-3">
        {p.steps.map((s, i) => {
          const Icon = icon(s.icon);
          return (
            <div key={s.title} className="rounded-2xl border border-[var(--hw-border)] bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[var(--hw-peach)] text-[var(--hw-coral)]">
                  <Icon className="size-5" />
                </span>
                <span className="text-[13px] font-semibold text-[var(--hw-coral)]">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-3 text-[16px] text-[var(--hw-navy)]">{s.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--hw-slate)]">
                {s.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Results ---------- */
function Results({ cs }: { cs: CaseStudy }) {
  const r = cs.results;
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <Kicker>RESULTS</Kicker>
        <h2 className="mt-2 text-[24px] leading-tight text-[var(--hw-navy)] sm:text-[32px]">
          {r.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--hw-slate)]">
          {r.body}
        </p>
      </div>

      <div>
        <p className="mb-3 flex items-center gap-1.5 text-[12px] font-bold tracking-[0.2em] text-[var(--hw-coral)]">
          <Trophy className="size-4" /> REWARDS UNLOCKED
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {r.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-[var(--hw-coral)]/30 bg-white p-6 text-center shadow-[0_0_24px_-14px_rgba(236,106,78,0.9)]"
            >
              <span className="absolute right-3 top-3 text-[var(--hw-coral)]/40">
                <Trophy className="size-4" />
              </span>
              <p className="text-[40px] leading-none text-[var(--hw-coral)]">{s.value}</p>
              <p className="mt-2 text-[13px] text-[var(--hw-slate)]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl">
        <ImageWithFallback
          src={r.image}
          alt="Results"
          className="h-64 w-full object-cover"
        />
      </div>
    </div>
  );
}

/* ---------- Reflection ---------- */
function Reflection({ cs }: { cs: CaseStudy }) {
  const r = cs.reflection;
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Kicker>REFLECTION</Kicker>
        <h2 className="mt-2 text-[24px] leading-tight text-[var(--hw-navy)] sm:text-[32px]">
          {r.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--hw-slate)]">
          {r.body}
        </p>
      </div>
      <div className="space-y-3">
        {r.points.map((pt, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-[var(--hw-border)] bg-white p-4"
          >
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--hw-peach)] text-[12px] font-semibold text-[var(--hw-coral)]">
              {i + 1}
            </span>
            <p className="text-[14px] leading-relaxed text-[var(--hw-navy)]">{pt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
