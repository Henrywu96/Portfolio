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
  onViewPrototype: () => void;
  initialTab?: CaseTab;
}) {
  const [tab, setTab] = useState<CaseTab>(initialTab);
  const cs = project.caseStudy!;
  const rarity = RARITY[project.id] ?? { label: "COMMON", color: "var(--hw-rarity-common)", level: 10 };
  const chapter = CASE_TABS.indexOf(tab) + 1;

  return (
    <div className="min-h-screen bg-[var(--hw-cream)] text-[var(--hw-navy)]">
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
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
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
            <h1 className="mt-2 text-[52px] leading-none text-[var(--hw-navy)]">
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
                onClick={onViewPrototype}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--hw-coral)] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(236,106,78,0.9)] transition hover:brightness-105"
              >
                View Prototype <ArrowRight className="size-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--hw-border-btn)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--hw-navy)] transition hover:bg-[var(--hw-cream-2)]">
                Download Case Study <Download className="size-4" />
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
              className={`relative h-[360px] w-full ${
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

      <div className="mx-auto max-w-6xl px-5 py-12">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {tab === "Overview" && <Overview cs={cs} />}
          {tab === "Research" && <Research cs={cs} />}
          {tab === "Design Process" && <DesignProcess cs={cs} />}
          {tab === "Results" && <Results cs={cs} />}
          {tab === "Reflection" && <Reflection cs={cs} />}
        </motion.div>
      </div>
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

/* ---------- Overview ---------- */
function Overview({ cs }: { cs: CaseStudy }) {
  const o = cs.overview;
  return (
    <div className="space-y-12">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Kicker>OVERVIEW</Kicker>
          <h2 className="mt-2 text-[34px] leading-tight text-[var(--hw-navy)]">
            {o.title}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--hw-slate)]">
            {o.body}
          </p>
        </div>
        {o.phoneMockup ? (
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
                className={`overflow-hidden rounded-[26px] border-4 border-[var(--hw-navy)] bg-black shadow-xl ${
                  i === 1 ? "h-72 w-40" : "h-60 w-36 opacity-90"
                }`}
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

      <div className="grid items-center gap-8 rounded-3xl border border-[var(--hw-border)] bg-white p-6 md:grid-cols-[1fr_240px]">
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
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Kicker>RESEARCH</Kicker>
          <h2 className="mt-2 text-[32px] leading-tight text-[var(--hw-navy)]">
            {r.title}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--hw-slate)]">
            {r.body}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--hw-rose-from)] to-[var(--hw-rose-to)]">
          {r.illustration ? (
            <img
              src={r.image}
              alt="Research"
              className="h-56 w-full object-contain p-3"
            />
          ) : (
            <ImageWithFallback
              src={r.image}
              alt="Research"
              className="h-56 w-full object-cover"
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
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Kicker>DESIGN PROCESS</Kicker>
          <h2 className="mt-2 text-[32px] leading-tight text-[var(--hw-navy)]">
            {p.title}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--hw-slate)]">
            {p.body}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--hw-rose-from)]/60 to-[var(--hw-rose-to)]/60 mix-blend-multiply" />
          <ImageWithFallback
            src={p.image}
            alt="Design process"
            className="h-56 w-full object-cover"
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
        <h2 className="mt-2 text-[32px] leading-tight text-[var(--hw-navy)]">
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
        <h2 className="mt-2 text-[32px] leading-tight text-[var(--hw-navy)]">
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
