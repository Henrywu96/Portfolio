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
import { FinalDesign } from "./FinalDesign";
import { icon } from "./icons";
import { openContact } from "../assets";
import {
  CASE_TABS,
  PROJECTS,
  type CaseTab,
  type Project,
  type CaseStudy,
  type Level,
} from "../data";

const RARITY: Record<
  string,
  { label: string; badge: string; level: number }
> = {
  bridgly: {
    label: "LEGENDARY",
    badge: "qu-badge qu-badge--legendary",
    level: 50,
  },
  greenpath: {
    label: "EPIC",
    badge: "qu-badge qu-badge--epic",
    level: 38,
  },
  studyflow: {
    label: "RARE",
    badge: "qu-badge qu-badge--rare",
    level: 27,
  },
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-white px-2.5 py-1 text-[12px] text-[var(--qu-text-body)] ring-1 ring-[var(--qu-border-default)]">
      {children}
    </span>
  );
}

export function CaseStudyPage({
  project,
  onBack,
  onNextProject,
  initialTab = "Overview",
}: {
  project: Project;
  onBack: () => void;
  onNextProject?: (p: Project) => void;
  initialTab?: CaseTab;
}) {
  const [tab, setTab] = useState<CaseTab>(initialTab);
  const [showProtoModal, setShowProtoModal] = useState(false);
  const cs = project.caseStudy!;
  const tabs: readonly CaseTab[] =
    cs.finalDesign
      ? [
          "Overview",
          "Research",
          "Design Process",
          "Final Design",
          "Results",
          "Reflection",
        ]
      : CASE_TABS;
  const rarity = RARITY[project.id] ?? {
    label: "COMMON",
    badge: "qu-badge",
    level: 10,
  };
  const chapter = tabs.indexOf(tab) + 1;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--qu-surface-page)] text-[var(--qu-text-heading)]">
      <div className="border-b border-[var(--qu-border-default)] bg-[var(--qu-surface-page)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[14px] text-[var(--qu-text-body)] transition hover:text-[var(--qu-text-heading)]"
          >
            <ArrowLeft className="size-4" /> Back to Quest Log
          </button>
        </div>
      </div>

      {/* Hero */}
      {(() => {
        const proto = cs.finalDesign?.prototype;
        const heading = (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.2em] text-[var(--qu-text-accent)]">
                <Scroll className="size-3.5" /> QUEST LOG
              </p>
              <span className={rarity.badge}>{rarity.label}</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-[var(--qu-surface-dark)] px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                <Sword className="size-3" /> LV.{rarity.level}
              </span>
            </div>
            <h1 className="mt-2 text-[36px] leading-none text-[var(--qu-text-heading)] sm:text-[48px] md:text-[52px]">
              {project.name}
            </h1>
            <p className="mt-3 max-w-md text-[17px] leading-relaxed text-[var(--qu-text-body)]">
              {cs.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </>
        );
        const intro = (
          <>
            <p className="max-w-md text-[14px] leading-relaxed text-[var(--qu-text-body)]">
              {cs.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {proto ? (
                <>
                  <a
                    href={proto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--qu-action-primary)] px-5 py-3 text-[14px] font-semibold text-[var(--qu-text-on-accent)] shadow-[var(--qu-shadow-glow-coral)] transition hover:brightness-105"
                  >
                    View Prototype <ArrowRight className="size-4" />
                  </a>
                  <button
                    onClick={() => setShowProtoModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--qu-border-default)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--qu-text-heading)] transition hover:bg-[var(--qu-surface-inset)]"
                  >
                    Request a walkthrough
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowProtoModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--qu-action-primary)] px-5 py-3 text-[14px] font-semibold text-[var(--qu-text-on-accent)] shadow-[var(--qu-shadow-glow-coral)] transition hover:brightness-105"
                >
                  Request Prototype <ArrowRight className="size-4" />
                </button>
              )}
            </div>
          </>
        );
        if (cs.coverImage) {
          return (
            <section className="mx-auto max-w-6xl px-5 pt-8 sm:pt-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-3xl border border-[var(--qu-border-default)] bg-[var(--qu-surface-inset)]"
              >
                <img
                  src={cs.coverImage}
                  alt={`${project.name}: final V2 screens`}
                  className="block aspect-[4/3] w-full object-cover sm:aspect-[16/8] md:aspect-[12/5]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8 grid gap-6 md:grid-cols-2 md:items-end"
              >
                <div className="min-w-0">{heading}</div>
                <div className="min-w-0">{intro}</div>
              </motion.div>
            </section>
          );
        }
        return (
          <section className="mx-auto max-w-6xl px-5 pt-12 sm:pt-16">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {heading}
                <div className="mt-5">{intro}</div>
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
                    project.iconImage
                      ? "object-contain p-4"
                      : "object-cover"
                  }`}
                />
                {project.id === "bridgly" && (
                  <Heart className="absolute right-6 top-6 z-10 size-8 fill-[var(--qu-coral-500)] text-[var(--qu-text-accent)] drop-shadow" />
                )}
              </motion.div>
            </div>
          </section>
        );
      })()}

      {/* TL;DR */}
      <section className="mx-auto mt-8 max-w-6xl px-5">
        <div className="rounded-2xl border border-[var(--qu-border-default)] bg-white/70 p-5">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--qu-text-accent)]">
            TL;DR
          </p>
          <div className="mt-3 divide-y divide-[var(--qu-border-default)]">
            {[
              ["Problem", cs.tldr.problem],
              ["What I did", cs.tldr.whatIDid],
              ["Outcome", cs.tldr.outcome],
            ].map(([label, body]) => (
              <div
                key={label}
                className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[110px_1fr] sm:gap-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--qu-text-body)]">
                  {label}
                </p>
                <p className="text-[16px] leading-relaxed text-[var(--qu-text-heading)]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-30 mt-10 border-b border-[var(--qu-border-default)] bg-[var(--qu-surface-page)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5">
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative whitespace-nowrap py-4 text-[14px] transition-colors ${
                  tab === t
                    ? "text-[var(--qu-text-accent)]"
                    : "text-[var(--qu-text-body)] hover:text-[var(--qu-text-heading)]"
                }`}
              >
                {t}
                {tab === t && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[var(--qu-coral-500)]" />
                )}
              </button>
            ))}
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--qu-text-body)] sm:flex">
            CHAPTER {chapter}/{tabs.length}
          </span>
        </div>
      </div>

      <div className="px-5 pt-12 pb-28">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {tab === "Overview" && (
            <Overview cs={cs} projectId={project.id} />
          )}
          {tab === "Research" && <Research cs={cs} />}
          {tab === "Design Process" && (
            <DesignProcess
              cs={cs}
              projectId={project.id}
              projectAccent={project.accent}
            />
          )}
          {tab === "Final Design" && cs.finalDesign && (
            <FinalDesign finalDesign={cs.finalDesign} />
          )}
          {tab === "Results" && <Results cs={cs} />}
          {tab === "Reflection" && <Reflection cs={cs} projectName={project.name} />}
        </motion.div>
        {onNextProject &&
          (() => {
            const idx = PROJECTS.findIndex((p) => p.id === project.id);
            const next = PROJECTS[(idx + 1) % PROJECTS.length];
            return (
              <div className="mx-auto mt-16 max-w-6xl border-t border-[var(--qu-border-default)] pt-8">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--qu-text-body)]">
                  NEXT QUEST
                </p>
                <button
                  onClick={() => onNextProject(next)}
                  className="group mt-3 flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--qu-border-default)] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(32,43,69,0.65)]"
                >
                  <span className="flex items-center gap-4">
                    {next.iconImage && (
                      <img
                        src={next.iconImage}
                        alt=""
                        className="size-12 rounded-xl object-contain"
                      />
                    )}
                    <span>
                      <span className="block text-[16px] font-semibold text-[var(--qu-text-heading)]">
                        {next.name}
                      </span>
                      <span className="block text-[13px] text-[var(--qu-text-body)]">
                        {next.tagline}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-[var(--qu-text-accent)] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })()}
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
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
            style={{ border: "1.5px solid var(--qu-border-default)" }}
          >
            {/* Icon */}
            <div
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: "var(--qu-peach-100)" }}
            >
              <Heart
                className="size-7"
                style={{ color: "var(--qu-coral-500)" }}
              />
            </div>
            <h3
              className="text-center text-[20px] font-bold leading-snug"
              style={{
                color: "var(--qu-text-heading)",
                fontFamily: "var(--font-display)",
              }}
            >
              Prototype Walkthrough
            </h3>
            <p
              className="mt-3 text-center text-[14px] leading-relaxed"
              style={{
                color: "var(--qu-text-body)",
                fontFamily: "var(--font-body)",
              }}
            >
              The full interactive prototype and end-to-end flows are best
              shown live. I'd be happy to walk you through {project.name} in
              an interview, or share access on request.
            </p>
            <button
              onClick={() => {
                openContact(`Prototype request: ${project.name}`);
                setShowProtoModal(false);
              }}
              className="mt-6 w-full rounded-xl py-3 text-[14px] font-semibold text-white transition hover:brightness-105"
              style={{
                background: "var(--qu-action-primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Request Access
            </button>
            <button
              onClick={() => setShowProtoModal(false)}
              className="w-full rounded-xl py-3 text-[14px] font-semibold text-[var(--qu-text-body)] transition hover:bg-black/5"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--qu-text-accent)]">
      {children}
    </p>
  );
}

/* ---------- Phone frame + screen helpers ---------- */
function PhoneFrame({
  children,
  tall,
}: {
  children: React.ReactNode;
  tall?: boolean;
}) {
  const px = 8; /* right inset */
  const pxLeft = 12; /* left inset — slightly more breathing room for time */
  const pillW = tall ? 42 : 36;
  const pillH = tall ? 12 : 10;
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[24px] border-[3px] border-[var(--qu-navy-900)] bg-white shadow-xl ${tall ? "h-72 w-40" : "h-60 w-[136px] opacity-90"}`}
    >
      {/* Status bar */}
      <div
        className="relative flex shrink-0 items-center justify-between bg-white"
        style={{
          height: tall ? 24 : 20,
          paddingLeft: pxLeft,
          paddingRight: px,
        }}
      >
        {/* Dynamic Island pill — absolute center */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
          style={{ width: pillW, height: pillH }}
        />
        {/* Time */}
        <span className="text-[6.5px] font-semibold leading-none text-black">
          9:41
        </span>
        {/* Status icons */}
        <div className="flex items-center gap-[2px]">
          {/* Signal bars */}
          <svg
            width="9"
            height="6"
            viewBox="0 0 9 6"
            fill="none"
          >
            <rect
              x="0"
              y="3.5"
              width="1.8"
              height="2.5"
              rx="0.3"
              fill="black"
            />
            <rect
              x="2.4"
              y="2"
              width="1.8"
              height="4"
              rx="0.3"
              fill="black"
            />
            <rect
              x="4.8"
              y="0.8"
              width="1.8"
              height="5.2"
              rx="0.3"
              fill="black"
            />
            <rect
              x="7.2"
              y="0"
              width="1.8"
              height="6"
              rx="0.3"
              fill="black"
              opacity="0.25"
            />
          </svg>
          {/* WiFi */}
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
          >
            <path
              d="M0.4 2.8 C1.5 0.9 2.6 0.5 4 0.5 C5.4 0.5 6.5 0.9 7.6 2.8"
              stroke="black"
              strokeWidth="0.85"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M1.7 4.2 C2.4 3 3.1 2.6 4 2.6 C4.9 2.6 5.6 3 6.3 4.2"
              stroke="black"
              strokeWidth="0.85"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="4" cy="5.5" r="0.7" fill="black" />
          </svg>
          {/* Battery */}
          <svg
            width="15"
            height="7"
            viewBox="0 0 15 7"
            fill="none"
          >
            <rect
              x="0.4"
              y="0.4"
              width="11.5"
              height="6.2"
              rx="1.6"
              stroke="black"
              strokeWidth="0.75"
            />
            <rect
              x="12.4"
              y="2.2"
              width="1.8"
              height="2.6"
              rx="0.9"
              fill="black"
              opacity="0.4"
            />
            <rect
              x="1.3"
              y="1.3"
              width="8.8"
              height="4.4"
              rx="1"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function PhoneTriple({
  a,
  b,
  c,
}: {
  a: React.ReactNode;
  b: React.ReactNode;
  c: React.ReactNode;
}) {
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

/* Real app screens (PNG exports) in simple phone frames */
function ScreenTriple({ screens }: { screens: [string, string, string] }) {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden py-4">
      <div className="flex shrink-0 items-end gap-3">
        {screens.map((src, i) => (
          <div
            key={src}
            className={`overflow-hidden rounded-[22px] border-[3px] border-[var(--qu-navy-900)] bg-white shadow-xl ${
              i === 1 ? "w-[124px] sm:w-40" : "w-[104px] opacity-90 sm:w-[136px]"
            }`}
          >
            <img
              src={src}
              alt=""
              className="block aspect-[390/844] w-full object-cover object-top"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* GreenPath screens */
function GreenScreen1() {
  const actions = [
    ["Bring reusable bag", "0.3 kg", "12%"],
    ["Compost organic waste", "0.5 kg", "20%"],
  ];

  return (
    <div className="flex h-full flex-col bg-[#FDF6F1] px-3 pb-3 pt-1 text-[#1F2A44]">
      <p className="border-b-[4px] border-[#1F2A44] pb-1 text-[13px] font-black leading-none tracking-tight">
        Carbon Facts
      </p>
      <div className="flex items-end justify-between border-b border-[#1F2A44] py-1.5">
        <span className="text-[6px] font-bold">CO₂ saved</span>
        <span className="text-[13px] font-black leading-none">0.8 kg</span>
      </div>
      <div className="flex items-center justify-between border-b-[3px] border-[#1F2A44] py-1">
        <span className="text-[6px] font-bold">% Daily Goal</span>
        <span className="text-[8px] font-black">32%</span>
      </div>
      <div className="border-b border-[#1F2A44] py-1 text-right text-[4.5px] font-bold uppercase">
        Amount · Daily Goal
      </div>
      <div className="flex-1">
        {actions.map(([label, amount, percent]) => (
          <div key={label} className="grid grid-cols-[1fr_auto_auto] gap-1 border-b border-[#1F2A44] py-1.5 text-[5.5px]">
            <span className="font-bold leading-tight">{label}</span>
            <span>{amount}</span>
            <span className="font-black">{percent}</span>
          </div>
        ))}
      </div>
      <div className="bg-[#3A7A4D] py-1.5 text-center text-[6.5px] font-bold text-[#FDF6F1]">
        Log an action
      </div>
    </div>
  );
}

function GreenScreen2() {
  return (
    <div className="flex h-full flex-col bg-[#FDF6F1] px-3 pb-3 pt-1 text-[#1F2A44]">
      <p className="border-b-[5px] border-[#1F2A44] pb-1 text-[15px] font-black leading-none tracking-tight">
        Impact Facts
      </p>
      <p className="border-b border-[#1F2A44] py-1 text-right text-[5px] font-bold uppercase">
        This week
      </p>
      <div className="border-b-[4px] border-[#1F2A44] py-2">
        <p className="text-[6px] font-bold">Total CO₂ saved</p>
        <p className="mt-0.5 text-[18px] font-black leading-none">12.4 kg</p>
        <p className="mt-1 text-[7px] font-bold">71% of weekly goal</p>
      </div>
      <div className="flex items-end justify-between border-b border-[#1F2A44] py-2">
        <span className="text-[7px] font-bold">Actions logged</span>
        <span className="text-[17px] font-black leading-none">42</span>
      </div>
      <div className="flex items-end justify-between border-b-[4px] border-[#1F2A44] py-2">
        <span className="text-[7px] font-bold">Current streak</span>
        <span className="text-[12px] font-black leading-none">5 days</span>
      </div>
      <div className="mt-auto border-t border-[#1F2A44] pt-1 text-[5px] leading-tight">
        Based on your logged actions and a 17.5 kg weekly goal.
      </div>
    </div>
  );
}

function GreenScreen3() {
  const challenges = [
    ["Bike to Work Week", "4.9 kg"],
    ["Meatless Monday", "1.0 kg"],
    ["Zero-Waste Weekend", "2.2 kg"],
  ];

  return (
    <div className="flex h-full flex-col bg-[#FDF6F1] px-3 pb-3 pt-1 text-[#1F2A44]">
      <div className="bg-[#3A7A4D] p-2 text-[#FDF6F1]">
        <p className="text-[5px] font-black tracking-wider">ACTIVE</p>
        <p className="mt-0.5 text-[9px] font-black leading-tight">Plastic-Free Week</p>
        <p className="mt-1 text-[6px] font-bold">3 of 7 days</p>
      </div>
      <p className="mt-2 border-b-[4px] border-[#1F2A44] pb-1 text-[12px] font-black leading-none tracking-tight">
        Challenge Facts
      </p>
      <div className="border-b border-[#1F2A44] py-1 text-right text-[4.5px] font-bold uppercase">
        CO₂ saved
      </div>
      <div className="flex-1">
        {challenges.map(([label, amount]) => (
          <div key={label} className="flex items-center justify-between gap-2 border-b border-[#1F2A44] py-1.5">
            <span className="text-[5.5px] font-bold leading-tight">{label}</span>
            <span className="shrink-0 text-[6px] font-black">{amount}</span>
          </div>
        ))}
      </div>
      <div className="border-t-[3px] border-[#1F2A44] pt-1 text-[5px] font-bold">
        Total challenge impact · 8.1 kg
      </div>
    </div>
  );
}

/* StudyFlow screens */
function StudyHourglass({ state = "ready" }: { state?: "ready" | "active" | "done" }) {
  return (
    <svg viewBox="0 0 64 84" className="h-full w-full" aria-hidden>
      <path d="M12 8 H52 M12 76 H52" stroke="#C07A3A" strokeWidth="6" strokeLinecap="round" />
      <path d="M16 12 C17 28 24 34 32 42 C24 50 17 56 16 72 M48 12 C47 28 40 34 32 42 C40 50 47 56 48 72" fill="none" stroke="#F4EFE6" strokeWidth="2" />
      <path d="M13 10 L18 13 M51 10 L46 13 M13 74 L18 71 M51 74 L46 71" stroke="#C07A3A" strokeWidth="3" strokeLinecap="round" />
      {state !== "done" && (
        <path d={state === "active" ? "M20 17 H44 L34 36 H30 Z" : "M18 15 H46 L34 38 H30 Z"} fill="#E6B85C" />
      )}
      {state === "active" && <path d="M32 37 V55" stroke="#E6B85C" strokeWidth="2" strokeLinecap="round" />}
      <path d={state === "done" ? "M18 68 H46 L35 46 H29 Z" : state === "active" ? "M22 68 H42 L34 56 H30 Z" : "M27 68 H37 L33 62 H31 Z"} fill="#E6B85C" />
      <path d="M10 5 H54 M10 79 H54" stroke="#C07A3A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function StudyScreen1() {
  const durations = ["5m", "15m", "25m", "45m"];

  return (
    <div className="flex h-full flex-col bg-[#202C46] px-3 pb-3 pt-1">
      <div className="flex items-center justify-between font-mono text-[5.5px] uppercase tracking-wider text-[#E6B85C]">
        <span>StudyFlow</span>
        <span>Today</span>
      </div>
      <p className="mt-2 font-mono text-[5.5px] font-bold tracking-[0.18em] text-[#E6B85C]">
        NOW FOCUSING
      </p>
      <p className="mt-1 font-serif text-[9px] font-semibold leading-tight text-[#F4EFE6]">
        Read Chapter 3
      </p>
      <div className="mx-auto mt-1 h-[68px] w-[52px]">
        <StudyHourglass />
      </div>
      <p className="text-center font-serif text-[14px] font-bold leading-none text-[#F4EFE6]">
        25:00
      </p>
      <div className="mt-2 grid grid-cols-4 gap-1">
        {durations.map((duration) => (
          <span
            key={duration}
            className={`rounded-full border py-0.5 text-center font-mono text-[5px] uppercase ${
              duration === "25m"
                ? "border-[#E6B85C] bg-[#E6B85C] text-[#202C46]"
                : "border-[#E6B85C] text-[#F4EFE6]"
            }`}
          >
            {duration}
          </span>
        ))}
      </div>
      <div className="mt-auto rounded-lg bg-[#E6B85C] py-1.5 text-center">
        <span className="font-serif text-[6.5px] font-bold tracking-wide text-[#202C46]">
          Turn the glass
        </span>
      </div>
    </div>
  );
}

function StudyScreen2() {
  return (
    <div className="flex h-full flex-col bg-[#202C46] px-3 pb-3 pt-1">
      <div className="flex items-center justify-between font-mono text-[5.5px] uppercase tracking-wider text-[#E6B85C]">
        <span>StudyFlow</span>
        <span>Focus</span>
      </div>
      <p className="mt-3 text-center font-mono text-[6px] font-bold tracking-[0.2em] text-[#E6B85C]">
        IN SESSION
      </p>
      <p className="mt-1 text-center font-serif text-[10px] font-semibold text-[#F4EFE6]">
        Read Chapter 3
      </p>
      <div className="mx-auto mt-3 h-[90px] w-[68px]">
        <StudyHourglass state="active" />
      </div>
      <p className="mt-2 text-center font-serif text-[19px] font-bold leading-none text-[#F4EFE6]">
        18:42
      </p>
      <p className="mt-1 text-center font-mono text-[5.5px] font-bold tracking-[0.2em] text-[#E6B85C]">
        REMAINING
      </p>
      <div className="mt-auto rounded-lg border border-[#E6B85C] py-1.5 text-center">
        <span className="font-serif text-[7px] font-bold tracking-wide text-[#F4EFE6]">
          Pause
        </span>
      </div>
    </div>
  );
}

function StudyScreen3() {
  return (
    <div className="flex h-full flex-col items-center bg-[#202C46] px-3 pb-3 pt-1 text-center">
      <div className="h-[66px] w-[50px]">
        <StudyHourglass state="done" />
      </div>
      <p className="mt-1 font-serif text-[13px] font-semibold text-[#F4EFE6]">
        Nice work.
      </p>
      <p className="mt-1 font-mono text-[5.5px] font-bold tracking-[0.15em] text-[#E6B85C]">
        25 MINUTES OF FOCUS
      </p>
      <div className="mt-auto w-full space-y-1.5">
        <div className="rounded-lg bg-[#E6B85C] py-1.5 text-center">
          <span className="font-serif text-[5.5px] font-bold tracking-wide text-[#202C46]">
            Continue studying
          </span>
        </div>
        <div className="rounded-lg border border-[#E6B85C] py-1.5 text-center">
          <span className="font-serif text-[5.5px] font-bold tracking-wide text-[#F4EFE6]">
            Take a break
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Overview ---------- */
function Overview({
  cs,
  projectId,
}: {
  cs: CaseStudy;
  projectId: string;
}) {
  const o = cs.overview;
  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <Kicker>OVERVIEW</Kicker>
          <h2 className="mt-2 break-words text-[26px] leading-tight text-[var(--qu-text-heading)] sm:text-[34px]">
            {o.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--qu-text-body)]">
            {o.body}
          </p>
        </div>
        <div className="min-w-0">
          {o.phoneScreens ? (
            <ScreenTriple screens={o.phoneScreens} />
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
            <img
              src={o.phoneMockup}
              alt="App screens"
              className="mx-auto h-72 w-full object-contain md:h-80"
            />
          ) : (
            <div className="flex items-end justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-[26px] border-4 border-[var(--qu-navy-900)] bg-black shadow-xl ${i === 1 ? "h-72 w-40" : "h-60 w-36 opacity-90"}`}
                >
                  <ImageWithFallback
                    src={o.phoneImage}
                    alt="App screen"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {o.meta.map((m) => {
          const Icon = icon(m.icon);
          return (
            <div
              key={m.label}
              className="rounded-2xl border border-[var(--qu-border-default)] bg-white p-4"
            >
              <p className="flex items-center gap-2 text-[12px] font-semibold tracking-wide text-[var(--qu-text-accent)]">
                <Icon className="size-4" /> {m.label}
              </p>
              <p className="mt-1 text-[14px] font-medium text-[var(--qu-text-heading)]">
                {m.value}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className={`grid items-center gap-8 rounded-3xl border border-[var(--qu-border-default)] bg-white p-6 ${
          o.problemVisual ? "" : "md:grid-cols-[1fr_200px]"
        }`}
      >
        <div>
          <h3 className="text-[22px] text-[var(--qu-text-heading)]">
            The Problem
          </h3>
          <p className="mt-1 text-[14px] text-[var(--qu-text-body)]">
            {o.problemSub}
          </p>
          <div
            className={`mt-5 grid gap-4 ${
              o.problems.length === 3
                ? "sm:grid-cols-3"
                : "grid-cols-2 sm:grid-cols-4"
            }`}
          >
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
                    <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[var(--qu-peach-100)] text-[var(--qu-text-accent)]">
                      <Icon className="size-5" />
                    </span>
                  )}
                  {p.description ? (
                    <>
                      <p className="mt-2 text-[13px] font-semibold leading-snug text-[var(--qu-text-heading)]">
                        {p.label}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-[var(--qu-text-body)]">
                        {p.description}
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-[12px] leading-snug text-[var(--qu-text-body)]">
                      {p.label}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {o.problemVisual ? (
          <img
            src={o.problemVisual.src}
            alt={o.problemVisual.alt}
            className="mx-auto block h-auto w-full max-w-3xl rounded-2xl"
          />
        ) : (
          <ImageWithFallback
            src={o.problemImage}
            alt="Problem framing"
            className="h-44 w-full rounded-2xl object-cover"
          />
        )}
      </div>

      {o.solutions && (
        <div>
          <Kicker>BREAKDOWN OF THE SOLUTION</Kicker>
          {o.solutionsTitle && (
            <h3 className="mt-2 text-[22px] leading-tight text-[var(--qu-text-heading)]">
              {o.solutionsTitle}
            </h3>
          )}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {o.solutions.map((sol) => (
              <div
                key={sol.title}
                className="flex flex-col rounded-2xl border border-[var(--qu-border-default)] bg-white p-4"
              >
                <div className="rounded-xl bg-[var(--qu-surface-page)] px-6 pt-5">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="mx-auto block aspect-[390/600] w-full max-w-[180px] rounded-t-[18px] border-[3px] border-b-0 border-[var(--qu-navy-900)] object-cover object-top"
                  />
                </div>
                <h4 className="mt-4 text-[16px] font-semibold text-[var(--qu-text-heading)]">
                  {sol.title}
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--qu-text-body)]">
                  {sol.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Research ---------- */
function Research({ cs }: { cs: CaseStudy }) {
  const r = cs.research;
  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <Kicker>RESEARCH</Kicker>
          <h2 className="mt-2 break-words text-[24px] leading-tight text-[var(--qu-text-heading)] sm:text-[32px]">
            {r.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--qu-text-body)]">
            {r.body}
          </p>
        </div>
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--hw-rose-from)] to-[var(--hw-rose-to)]"
          style={{ minHeight: 200 }}
        >
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

      <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {r.methods.map((m) => {
          const Icon = icon(m.icon);
          return (
            <div
              key={m.title}
              className="rounded-2xl border border-[var(--qu-border-default)] bg-white p-5"
            >
              {m.image ? (
                <img
                  src={m.image}
                  alt=""
                  className="size-14 object-contain"
                />
              ) : (
                <span className="grid size-10 place-items-center rounded-xl bg-[var(--qu-peach-100)] text-[var(--qu-text-accent)]">
                  <Icon className="size-5" />
                </span>
              )}
              <h3 className="mt-3 text-[16px] text-[var(--qu-text-heading)]">
                {m.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--qu-text-body)]">
                {m.body}
              </p>
            </div>
          );
        })}
      </div>

      {r.competitors && <Competitors c={r.competitors} />}

      <div className="mx-auto max-w-6xl">
        <h3 className="text-[20px] text-[var(--qu-text-heading)]">
          Key Insights
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {r.insights.map((ins, i) => {
            const Icon = icon(ins.icon);
            return (
              <div
                key={i}
                className="rounded-2xl border border-[var(--qu-border-default)] bg-white p-6 text-center"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--qu-peach-100)] text-[var(--qu-text-accent)]">
                  <Icon className="size-6" />
                </span>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--qu-text-heading)]">
                  {ins.body}
                </p>
                {ins.means && (
                  <div className="mt-4 space-y-3 border-t border-[var(--qu-border-default)] pt-4 text-left">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.16em] text-[var(--qu-text-body)]">
                        WHAT IT MEANS
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--qu-text-body)]">
                        {ins.means}
                      </p>
                    </div>
                    {ins.built && (
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.16em] text-[var(--qu-text-accent)]">
                          WHAT I BUILT
                        </p>
                        <p className="mt-1 text-[13px] font-medium leading-relaxed text-[var(--qu-text-heading)]">
                          {ins.built}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {r.hmw && (
        <div className="rounded-3xl bg-[var(--qu-surface-dark)] p-6 text-white sm:p-8">
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--qu-text-accent-on-dark)]">
            HOW MIGHT WE
          </p>
          <p className="mt-3 max-w-3xl text-[20px] font-semibold leading-snug sm:text-[24px]">
            {r.hmw.question}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {r.hmw.items.map((item, i) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4">
                <p className="text-[10px] font-bold tracking-[0.16em] text-[var(--qu-text-accent-on-dark)]">
                  HMW 0{i + 1}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-white/90">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Design Process ---------- */
function DirectionMockup({
  projectId,
  direction,
}: {
  projectId: string;
  direction: "A" | "B" | "C";
}) {
  const shell =
    "mx-auto flex aspect-[9/16] w-full max-w-[76px] flex-col overflow-hidden rounded-[12px] border-2 border-[var(--qu-navy-900)]";

  if (projectId === "bridgly" && direction === "A") {
    return (
      <div className={`${shell} bg-black p-2 text-[#f5b942]`}>
        <span className="text-[5px] font-bold tracking-widest">WORLD TIME</span>
        <div className="mt-3 border-y border-[#f5b942] py-1.5">
          <p className="text-[5px]">TAIPEI</p>
          <p className="font-mono text-[11px] font-bold">14:00</p>
        </div>
        <div className="border-b border-[#f5b942] py-1.5">
          <p className="text-[5px]">LONDON</p>
          <p className="font-mono text-[11px] font-bold">07:00</p>
        </div>
      </div>
    );
  }

  if (projectId === "bridgly" && direction === "B") {
    return (
      <div className={`${shell} bg-[#eee0c5] p-2 text-[#594a42]`}>
        <div className="ml-auto grid size-5 place-items-center border border-[#c96f61] text-[5px] text-[#c96f61]">
          AIR
        </div>
        <p className="mt-2 font-serif text-[8px] italic leading-tight">
          Wish you were here.
        </p>
        <div className="mt-3 border-t border-dashed border-[#8d796d] pt-2">
          <p className="font-serif text-[6px] italic">Taipei · 14:00</p>
          <p className="mt-1 font-serif text-[6px] italic">London · 07:00</p>
        </div>
        <div className="mt-auto h-5 border-b border-[#8d796d]" />
      </div>
    );
  }

  if (projectId === "bridgly") {
    return (
      <div className={`${shell} items-center bg-[#2B2D42] p-2 text-white`}>
        <span className="text-[5px] tracking-wider">BOTH CITIES</span>
        <div className="relative mt-3 size-12 rounded-full border-[5px] border-[#FFB5A7]">
          <div className="absolute inset-1 rounded-full border-[3px] border-[#65b8b1]" />
          <div className="absolute inset-0 grid place-items-center text-center">
            <span className="text-[6px] font-bold leading-none">14:00</span>
            <span className="text-[4px] leading-none">07:00</span>
          </div>
        </div>
        <div className="mt-auto h-1.5 w-full bg-[#FFB5A7]" />
      </div>
    );
  }

  if (projectId === "studyflow" && direction === "A") {
    return (
      <div className={`${shell} items-center bg-[#202C46] p-2 text-[#F4EFE6]`}>
        <span className="font-mono text-[5px] tracking-widest text-[#E6B85C]">
          NOW FOCUSING
        </span>
        <div className="mt-2 h-14 w-10">
          <StudyHourglass />
        </div>
        <span className="mt-1 font-serif text-[10px] font-bold">25:00</span>
      </div>
    );
  }

  if (projectId === "studyflow" && direction === "B") {
    return (
      <div className={`${shell} bg-[#f7f0df] p-2 text-[#493f35]`}>
        <span className="font-serif text-[6px] italic">Today</span>
        <div className="mt-2 -rotate-2 border border-[#bda98b] bg-[#fffaf0] p-1.5">
          <p className="font-serif text-[6px] italic">Read Chapter 3</p>
          <p className="mt-2 font-serif text-[9px] font-bold">25 min</p>
        </div>
        <div className="mt-2 rotate-1 border border-[#bda98b] bg-[#fffaf0] p-1.5 font-serif text-[5px] italic">
          Review notes
        </div>
      </div>
    );
  }

  if (projectId === "studyflow") {
    return (
      <div className={`${shell} bg-[#ead9bd] p-2 text-[#40382f]`}>
        <span className="text-[6px] font-black tracking-wider">TIME CARD</span>
        <div className="mt-2 border-y-2 border-[#40382f]">
          {["TASK", "START", "LENGTH"].map((label) => (
            <div
              key={label}
              className="flex justify-between border-b border-[#40382f] py-1 text-[4.5px] last:border-b-0"
            >
              <span>{label}</span>
              <span>—</span>
            </div>
          ))}
        </div>
        <div className="mt-auto border-2 border-[#40382f] py-1 text-center text-[5px] font-black">
          PUNCH IN
        </div>
      </div>
    );
  }

  if (projectId === "greenpath" && direction === "A") {
    return (
      <div className={`${shell} items-center bg-[#d8b986] p-2 text-[#294b32]`}>
        <span className="text-[5px] font-black tracking-widest">DAILY SEEDS</span>
        <div className="relative mt-4 h-12 w-10">
          <span className="absolute bottom-0 left-1/2 h-9 w-0.5 -translate-x-1/2 bg-[#3A7A4D]" />
          <span className="absolute left-1/2 top-2 h-3 w-5 -translate-x-full -rotate-12 rounded-[100%_0] bg-[#3A7A4D]" />
          <span className="absolute right-1/2 top-5 h-3 w-5 translate-x-full rotate-12 rounded-[0_100%] bg-[#3A7A4D]" />
        </div>
        <span className="mt-auto border-y border-[#294b32] py-1 text-center text-[5px] font-bold">
          SMALL ACTIONS
        </span>
      </div>
    );
  }

  if (projectId === "greenpath" && direction === "B") {
    return (
      <div
        className={`${shell} bg-[#f3df91] p-2 text-[#344152]`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(52,65,82,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(52,65,82,0.12) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      >
        <span className="bg-[#f3df91] text-[6px] font-black">FIELD SURVEY</span>
        <div className="mt-3 bg-[#f3df91]">
          {["ACTION", "CO₂", "GOAL"].map((label) => (
            <div
              key={label}
              className="flex justify-between border-b border-[#344152] py-1 text-[5px]"
            >
              <span>{label}</span>
              <span>—</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${shell} bg-[#FDF6F1] p-2 text-[#1F2A44]`}>
      <span className="border-b-[3px] border-[#1F2A44] pb-1 text-[8px] font-black">
        Carbon Facts
      </span>
      <div className="flex items-end justify-between border-b border-[#1F2A44] py-1.5">
        <span className="text-[4.5px] font-bold">CO₂ saved</span>
        <span className="text-[9px] font-black">0.8 kg</span>
      </div>
      <div className="flex justify-between border-b-[3px] border-[#1F2A44] py-1 text-[4.5px] font-bold">
        <span>Daily Goal</span>
        <span>32%</span>
      </div>
      <div className="mt-1 border-b border-[#1F2A44] py-1 text-[4.5px]">
        Reusable bag
      </div>
    </div>
  );
}

function DesignProcess({
  cs,
  projectId,
  projectAccent,
}: {
  cs: CaseStudy;
  projectId: string;
  projectAccent: string;
}) {
  const p = cs.process;
  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <Kicker>DESIGN PROCESS</Kicker>
          <h2 className="mt-2 break-words text-[24px] leading-tight text-[var(--qu-text-heading)] sm:text-[32px]">
            {p.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--qu-text-body)]">
            {p.body}
          </p>
        </div>
        {p.imageContain ? (
          <figure className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-[var(--qu-border-default)] bg-white p-3">
              <img
                src={p.image}
                alt={p.imageCaption ?? "Design process"}
                className="block h-auto w-full"
              />
            </div>
            {p.imageCaption && (
              <figcaption className="mt-2 text-[13px] text-[var(--qu-text-body)]">
                {p.imageCaption}
              </figcaption>
            )}
          </figure>
        ) : (
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-3xl"
            style={{ minHeight: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--hw-rose-from)]/60 to-[var(--hw-rose-to)]/60 mix-blend-multiply" />
            <ImageWithFallback
              src={p.image}
              alt="Design process"
              className="h-52 w-full object-cover"
            />
          </div>
        )}
      </div>

      {p.ideation && <Ideation d={p.ideation} />}

      {p.changes && (
        <div>
          <Kicker>ITERATIONS</Kicker>
          <h3 className="mt-2 text-[20px] text-[var(--qu-text-heading)]">
            What changed between versions, and why
          </h3>
          <div className="mt-4 space-y-3">
            <div className="hidden grid-cols-[1fr_1.3fr_1.3fr_1.3fr] gap-4 px-5 text-[10px] font-bold tracking-[0.16em] text-[var(--qu-text-accent)] md:grid">
              <span>AREA</span>
              <span>BEFORE (V1)</span>
              <span>AFTER (V2)</span>
              <span>WHY</span>
            </div>
            {p.changes.map((c) => (
              <div
                key={c.area}
                className="grid gap-2 rounded-2xl border border-[var(--qu-border-default)] bg-white p-5 md:grid-cols-[1fr_1.3fr_1.3fr_1.3fr] md:items-center md:gap-4"
              >
                <p className="text-[15px] font-semibold text-[var(--qu-text-heading)]">
                  {c.area}
                </p>
                <p className="text-[13px] leading-relaxed text-[var(--qu-text-body)]">
                  <span className="mr-1 font-bold text-[var(--qu-text-body)] md:hidden">Before:</span>
                  {c.before}
                </p>
                <p className="text-[13px] font-semibold leading-relaxed text-[var(--qu-text-heading)]">
                  <span className="mr-1 font-bold text-[var(--qu-text-accent)] md:hidden">After:</span>
                  {c.after}
                </p>
                <p className="text-[13px] leading-relaxed text-[var(--qu-text-body)]">
                  <span className="mr-1 font-bold md:hidden">Why:</span>
                  {c.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative grid gap-4 sm:grid-cols-2">
        {p.steps.map((s, i) => {
          const Icon = icon(s.icon);
          return (
            <div
              key={s.title}
              className="rounded-2xl border border-[var(--qu-border-default)] bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[var(--qu-peach-100)] text-[var(--qu-text-accent)]">
                  <Icon className="size-5" />
                </span>
                <span className="text-[13px] font-semibold text-[var(--qu-text-accent)]">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-3 text-[16px] text-[var(--qu-text-heading)]">
                {s.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--qu-text-body)]">
                {s.body}
              </p>
              {s.image && (
                <div className="mt-5 overflow-hidden rounded-xl border border-[var(--qu-border-default)] bg-[var(--qu-surface-page)]">
                  <img
                    src={s.image}
                    alt={`${s.title}: directions A, B and C`}
                    className="block h-auto w-full"
                  />
                </div>
              )}
              {s.directions && (
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {s.directions.map((direction) => (
                    <div key={direction.label} className="min-w-0">
                      <div className="mb-2 flex min-h-5 items-center justify-between gap-1">
                        <span className="text-[10px] font-bold tracking-[0.18em] text-[var(--qu-text-body)]">
                          {direction.label}
                        </span>
                        {direction.chosen && (
                          <span
                            className="rounded px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-white"
                            style={{ backgroundColor: projectAccent }}
                          >
                            CHOSEN
                          </span>
                        )}
                        {direction.explored && (
                          <span className="rounded bg-[var(--qu-surface-dark)] px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-white">
                            EXPLORED
                          </span>
                        )}
                      </div>
                      {!s.image && (
                        <DirectionMockup
                          projectId={projectId}
                          direction={direction.label}
                        />
                      )}
                      <p className="mt-2 text-[11px] font-semibold leading-tight text-[var(--qu-text-heading)]">
                        {direction.title}
                      </p>
                      <p className="mt-1 text-[10px] leading-relaxed text-[var(--qu-text-body)]">
                        {direction.verdict}
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
    <div className="mx-auto max-w-6xl space-y-12">
      <div className="max-w-2xl">
        <Kicker>RESULTS</Kicker>
        <h2 className="mt-2 text-[24px] leading-tight text-[var(--qu-text-heading)] sm:text-[32px]">
          {r.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--qu-text-body)]">
          {r.body}
        </p>
        {r.note && (
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--qu-text-body)]">
            {r.note}
          </p>
        )}
      </div>

      <div className="mx-auto max-w-6xl">
        <p className="mb-3 flex items-center gap-1.5 text-[12px] font-bold tracking-[0.2em] text-[var(--qu-text-accent)]">
          <Trophy className="size-4" /> TESTING FINDINGS
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {r.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-[var(--qu-border-default)] bg-white p-5"
            >
              <span className="mb-3 grid size-9 place-items-center rounded-xl bg-[var(--qu-peach-100)] text-[var(--qu-text-accent)]">
                <Trophy className="size-4" />
              </span>
              <p className="text-[15px] font-semibold leading-snug text-[var(--qu-text-heading)]">
                {s.value}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--qu-text-body)]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {r.quote ? (
        <div className="grid overflow-hidden rounded-3xl md:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col justify-between gap-6 bg-[var(--qu-surface-dark)] p-6 text-white sm:p-8">
            <p className="text-[26px] font-semibold leading-tight sm:text-[30px]">
              “{r.quote.text}”
            </p>
            <p className="text-[13px] text-white/70">{r.quote.source}</p>
          </div>
          <ImageWithFallback
            src={r.image}
            alt="Results"
            className="h-64 w-full object-cover md:h-full"
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl">
          <ImageWithFallback
            src={r.image}
            alt="Results"
            className="h-64 w-full object-cover"
          />
        </div>
      )}

      {r.next && (
        <div className="rounded-3xl border border-[var(--qu-border-default)] bg-white p-6 sm:p-8">
          <Kicker>NEXT VALIDATION</Kicker>
          <h3 className="mt-2 text-[22px] leading-tight text-[var(--qu-text-heading)]">
            {r.next.title}
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--qu-text-body)]">
            {r.next.body}
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              {r.next.hypotheses.map((h, i) => (
                <div key={h} className="flex gap-3">
                  <span className="shrink-0 text-[15px] font-bold text-[var(--hw-accent-greenpath)]">
                    H{i + 1}
                  </span>
                  <p className="text-[14px] leading-relaxed text-[var(--qu-text-heading)]">
                    {h}
                  </p>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--qu-border-default)]">
              <div className="grid grid-cols-[1.6fr_1fr_auto] gap-3 bg-[var(--qu-surface-dark)] px-4 py-3 text-[12px] font-semibold text-white">
                <span>Task</span>
                <span>Measure</span>
                <span>Target</span>
              </div>
              {r.next.tasks.map((t) => (
                <div
                  key={t.task}
                  className="grid grid-cols-[1.6fr_1fr_auto] gap-3 border-t border-[var(--qu-border-default)] px-4 py-3 text-[13px] text-[var(--qu-text-heading)]"
                >
                  <span>{t.task}</span>
                  <span className="text-[var(--qu-text-body)]">{t.measure}</span>
                  <span className="font-bold text-[var(--qu-text-accent)]">{t.target}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 text-[12px] leading-relaxed text-[var(--qu-text-body)]">
            <span className="font-bold tracking-[0.12em]">METHOD</span> · {r.next.method}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------- Reflection ---------- */
function Reflection({ cs, projectName }: { cs: CaseStudy; projectName: string }) {
  const r = cs.reflection;
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <Kicker>REFLECTION</Kicker>
        <h2 className="mt-2 text-[24px] leading-tight text-[var(--qu-text-heading)] sm:text-[32px]">
          {r.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--qu-text-body)]">
          {r.body}
        </p>
      </div>
      <div className="space-y-3">
        {r.points.map((pt, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-[var(--qu-border-default)] bg-white p-4"
          >
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--qu-peach-100)] text-[12px] font-semibold text-[var(--qu-text-accent)]">
              {i + 1}
            </span>
            <p className="text-[14px] leading-relaxed text-[var(--qu-text-heading)]">
              {pt}
            </p>
          </div>
        ))}
      </div>
      {cs.resources && (
        <div className="pt-6">
          <Kicker>RESOURCES</Kicker>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {cs.resources.map((res) => {
              const cls =
                "block rounded-2xl border border-[var(--qu-border-default)] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(32,43,69,0.65)]";
              const inner = (
                <>
                  <span className="block text-[15px] font-semibold text-[var(--qu-text-heading)]">
                    {res.label}
                  </span>
                  <span
                    className={`mt-0.5 inline-flex items-center gap-1 text-[13px] ${
                      res.href
                        ? "font-medium text-[var(--qu-text-accent)]"
                        : "text-[var(--qu-text-body)]"
                    }`}
                  >
                    {res.value}
                    {res.href && <ArrowRight className="size-3.5" />}
                  </span>
                  {res.request && (
                    <span className="mt-1 block text-[11px] text-[var(--qu-text-body)]">
                      Email me to request it
                    </span>
                  )}
                </>
              );
              return res.href ? (
                <a
                  key={res.label}
                  href={res.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <button
                  key={res.label}
                  onClick={() => openContact(`${res.label} request: ${projectName}`)}
                  className={cls}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Competitive analysis ---------- */
function LevelMark({ level }: { level: Level }) {
  if (level === "none")
    return (
      <span
        aria-hidden
        className="inline-block h-[3px] w-4 shrink-0 rounded bg-[#ADB5BD]"
      />
    );
  return (
    <span
      aria-hidden
      className={`inline-block size-3.5 shrink-0 rounded-full ${
        level === "full" ? "bg-[#81B29A]" : "border-[2.5px] border-[#81B29A]"
      }`}
    />
  );
}

const LEVEL_LABEL: Record<Level, string> = {
  full: "Core feature",
  partly: "Partly",
  none: "Not offered",
};

function Competitors({
  c,
}: {
  c: NonNullable<CaseStudy["research"]["competitors"]>;
}) {
  const cols = `minmax(170px,1.3fr) repeat(${c.apps.length}, minmax(140px,1fr))`;
  return (
    <div className="mx-auto max-w-6xl">
      <Kicker>COMPETITIVE ANALYSIS</Kicker>
      <h3 className="mt-2 text-[22px] leading-tight text-[var(--qu-text-heading)]">
        {c.title}
      </h3>
      <p className="mt-1 text-[14px] text-[var(--qu-text-body)]">{c.body}</p>
      <div className="relative mt-5 overflow-x-auto rounded-2xl border border-[var(--qu-border-default)] bg-white">
        <div className="min-w-[760px]">
          <div className="grid" style={{ gridTemplateColumns: cols }}>
            <div className="self-end px-4 py-4 text-[10px] font-bold tracking-[0.16em] text-[var(--qu-text-accent)]">
              WHAT COUPLES NEED
            </div>
            {c.apps.map((a) => (
              <div
                key={a.name}
                className={`px-4 py-4 ${a.me ? "bg-[var(--qu-peach-100)]/60" : ""}`}
              >
                <p
                  className={`text-[16px] font-semibold ${
                    a.me ? "text-[var(--qu-text-accent)]" : "text-[var(--qu-text-heading)]"
                  }`}
                >
                  {a.name}
                </p>
                <p className="text-[12px] text-[var(--qu-text-body)]">{a.desc}</p>
              </div>
            ))}
          </div>
          {c.rows.map((row) => (
            <div
              key={row.need}
              className="grid border-t border-[var(--qu-border-default)]"
              style={{ gridTemplateColumns: cols }}
            >
              <div className="px-4 py-3 text-[13px] font-semibold text-[var(--qu-text-heading)]">
                {row.need}
              </div>
              {row.cells.map((cell, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-4 py-3 text-[13px] text-[var(--qu-text-heading)] ${
                    c.apps[i]?.me ? "bg-[var(--qu-peach-100)]/60 font-medium" : ""
                  }`}
                >
                  <LevelMark level={cell.level} />
                  <span className="sr-only">{LEVEL_LABEL[cell.level]}</span>
                  {cell.text && <span>{cell.text}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-[12px] text-[var(--qu-text-body)]">
        {(["full", "partly", "none"] as Level[]).map((l) => (
          <span key={l} className="inline-flex items-center gap-1.5">
            <LevelMark level={l} /> {LEVEL_LABEL[l]}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-[var(--qu-surface-dark)] p-5 text-white sm:flex-row sm:items-center sm:gap-5">
        <span className="shrink-0 text-[11px] font-bold tracking-[0.18em] text-[var(--qu-text-accent-on-dark)]">
          THE GAP
        </span>
        <p className="text-[15px] font-medium leading-relaxed">{c.gap}</p>
      </div>
    </div>
  );
}

/* ---------- Ideating ---------- */
function Ideation({
  d,
}: {
  d: NonNullable<CaseStudy["process"]["ideation"]>;
}) {
  return (
    <div className="space-y-10">
      <div>
        <Kicker>IDEATING</Kicker>
        <h3 className="mt-2 text-[22px] leading-tight text-[var(--qu-text-heading)]">
          {d.title}
        </h3>
        <p className="mt-1 text-[14px] text-[var(--qu-text-body)]">{d.body}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {d.groups.map((g) => (
            <div
              key={g.hmw}
              className="flex flex-col rounded-2xl border border-[var(--qu-border-default)] bg-white p-5"
            >
              <p className="text-[10px] font-bold tracking-[0.16em] text-[var(--qu-text-accent)]">
                {g.hmw}
              </p>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-[var(--qu-text-heading)]">
                {g.question}
              </p>
              <p className="mt-4 border-t border-[var(--qu-border-default)] pt-4 text-[10px] font-bold tracking-[0.16em] text-[var(--qu-text-body)]">
                IDEAS
              </p>
              <ul className="mt-2 mb-5 space-y-2">
                {g.ideas.map((idea) => (
                  <li
                    key={idea}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--qu-text-heading)]"
                  >
                    <span className="mt-[7px] size-2 shrink-0 rounded-full bg-[#81B29A]" />
                    {idea}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--qu-peach-100)] px-3 py-1.5 text-[12px] font-semibold text-[var(--qu-text-heading)]">
                <ArrowRight className="size-3.5 text-[var(--qu-text-accent)]" /> {g.area}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[20px] text-[var(--qu-text-heading)]">{d.structureTitle}</h3>
        <p className="mt-1 text-[14px] text-[var(--qu-text-body)]">
          {d.structureBody}
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-[180px_1fr]">
          <div className="rounded-2xl bg-[var(--qu-surface-dark)] p-4 text-white">
            <p className="text-[10px] font-bold tracking-[0.16em] text-[var(--qu-text-accent-on-dark)]">
              START
            </p>
            <p className="mt-1 text-[16px] font-semibold">Onboarding</p>
            <p className="mt-1 text-[12px] leading-relaxed text-white/70">
              {d.onboarding}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {d.tabs.map((t, i) => (
              <div
                key={t.name}
                className={`rounded-2xl border border-[var(--qu-border-default)] p-4 ${
                  i === 0 ? "bg-[var(--qu-peach-100)]/60" : "bg-white"
                }`}
              >
                <p
                  className={`text-[15px] font-semibold ${
                    i === 0 ? "text-[var(--qu-text-accent)]" : "text-[var(--qu-text-heading)]"
                  }`}
                >
                  {t.name}
                </p>
                <ul className="mt-2 space-y-1">
                  {t.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-[12px] leading-relaxed text-[var(--qu-text-heading)]"
                    >
                      <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#81B29A]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <figure className="mt-5">
          <div className="overflow-x-auto rounded-2xl border border-[var(--qu-border-default)] bg-[#F8F9FA]">
            <img
              src={d.wireframes.src}
              alt={d.wireframes.caption}
              className="block h-auto w-full min-w-[720px]"
            />
          </div>
          <figcaption className="mt-2 text-[13px] text-[var(--qu-text-body)]">
            {d.wireframes.caption}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
