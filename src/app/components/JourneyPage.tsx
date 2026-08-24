import { ArrowRight, ChevronDown, ArrowLeft, Sparkles, Compass } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { IMAGES } from "../data";

const QUEST_SPARKS = [
  { id: 1, left: "12%", top: "24%", size: 6, duration: 6, delay: 0 },
  { id: 2, left: "82%", top: "18%", size: 5, duration: 7, delay: 1 },
  { id: 3, left: "68%", top: "40%", size: 7, duration: 6.5, delay: 0.5 },
  { id: 4, left: "24%", top: "60%", size: 5, duration: 8, delay: 2 },
  { id: 5, left: "48%", top: "30%", size: 6, duration: 7.5, delay: 1.5 },
  { id: 6, left: "88%", top: "62%", size: 5, duration: 6.8, delay: 0.8 },
];

export function JourneyPage({
  onExplore,
  onBack,
}: {
  onExplore: () => void;
  onBack: () => void;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--hw-navy)] text-white">
      <ImageWithFallback
        src={IMAGES.cloudsSky}
        alt="Dreamy sky with floating islands"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--hw-night-from)]/60 via-[var(--hw-night-via)]/40 to-[var(--hw-night-to)]/80" />

      {/* Floating quest sparkles */}
      <div className="pointer-events-none absolute inset-0">
        {QUEST_SPARKS.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: s.duration,
              delay: s.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6">
        <div className="pt-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-[13px] backdrop-blur transition hover:bg-white/25"
          >
            <ArrowLeft className="size-4" /> Back to Projects
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-1 flex-col justify-center py-16"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.28em] text-white backdrop-blur">
            <Sparkles className="size-3.5" /> NEW QUEST AVAILABLE
          </span>
          <h1 className="mt-4 max-w-2xl text-[44px] leading-[1.05] text-white md:text-[60px]">
            Every great project starts with a journey.
          </h1>
          <p className="mt-5 max-w-md text-[16px] text-white/80">
            Explore selected works and the process behind meaningful designs.
          </p>
          <div className="mt-8">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--hw-coral)] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_40px_-16px_rgba(236,106,78,0.9)] transition hover:brightness-105"
            >
              <Compass className="size-4" /> Begin Adventure <ArrowRight className="size-4" />
            </button>
          </div>
        </motion.div>

        <div className="flex justify-center pb-8">
          <motion.button
            onClick={onExplore}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="grid size-11 place-items-center rounded-full bg-white/20 backdrop-blur transition hover:bg-white/30"
          >
            <ChevronDown className="size-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
