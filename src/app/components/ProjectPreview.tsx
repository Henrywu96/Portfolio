import { ArrowLeft, ArrowRight, Maximize2, Sword, Scroll } from "lucide-react";
import { motion } from "motion/react";
import { type Project } from "../data";

const RARITY: Record<string, { label: string; color: string; level: number }> = {
  bridgly: { label: "LEGENDARY", color: "var(--hw-rarity-legendary)", level: 50 },
  greenpath: { label: "EPIC", color: "var(--hw-rarity-epic)", level: 38 },
  studyflow: { label: "RARE", color: "var(--hw-rarity-rare)", level: 27 },
};

export function ProjectPreview({
  project,
  onBack,
  onViewCaseStudy,
}: {
  project: Project;
  onBack: () => void;
  onViewCaseStudy: () => void;
}) {
  const subtitle = project.caseStudy?.subtitle ?? project.description;
  const rarity = RARITY[project.id] ?? { label: "COMMON", color: "var(--hw-rarity-common)", level: 10 };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--hw-cream)] px-5 py-10">
      <div className="w-full max-w-lg">
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-[14px] text-[var(--hw-slate)] transition hover:text-[var(--hw-navy)]"
        >
          <ArrowLeft className="size-4" /> Back to Quest Board
        </button>

        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.28em] text-[var(--hw-coral)]">
          <Scroll className="size-3.5" /> QUEST BRIEFING
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[28px] border border-white/60 shadow-[0_30px_70px_-40px_rgba(32,43,69,0.7)]"
        >
          {/* Hero visual */}
          <div
            className="relative flex h-[420px] items-center justify-center"
            style={{
              background: `linear-gradient(160deg, ${project.accent}33, ${project.accent}14)`,
            }}
          >
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="h-[70%] w-[86%] object-contain drop-shadow-2xl"
            />

            {/* Top info panel */}
            <div className="absolute left-4 top-4 max-w-[70%] rounded-2xl bg-white/70 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {project.iconImage ? (
                  <img
                    src={project.iconImage}
                    alt=""
                    className="size-11 rounded-xl object-contain"
                  />
                ) : (
                  <span
                    className="grid size-11 place-items-center rounded-xl text-white"
                    style={{ backgroundColor: project.accent }}
                  >
                    {project.name[0]}
                  </span>
                )}
                <div>
                  <h2 className="text-[24px] leading-none text-[var(--hw-navy)]">
                    {project.name}
                  </h2>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white"
                      style={{ backgroundColor: rarity.color }}
                    >
                      {rarity.label}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-[var(--hw-navy)] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white">
                      <Sword className="size-2.5" /> LV.{rarity.level}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[12px] leading-snug text-[var(--hw-slate)]">
                {subtitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/80 px-2 py-0.5 text-[11px] text-[var(--hw-slate)] ring-1 ring-black/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom actions */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <button
                onClick={onViewCaseStudy}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold text-white shadow-lg transition hover:brightness-105"
                style={{ backgroundColor: project.accent }}
              >
                Accept Quest <ArrowRight className="size-4" />
              </button>
              <button
                onClick={onViewCaseStudy}
                className="grid size-10 place-items-center rounded-full bg-white/80 text-[var(--hw-navy)] backdrop-blur transition hover:bg-white"
                aria-label="Open case study"
              >
                <Maximize2 className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
