import { motion, type Transition, type Variants } from "motion/react";
import type { ComponentType } from "react";

/*
 * A skill in the Skill Tree. Each one answers the pointer in its own way: the magnifier scans, the pen
 * draws, the boxes tumble, the grid snaps round, the cursor clicks and the clipboard gets its tick.
 */

type Kind = "research" | "ui" | "proto" | "system" | "interaction" | "testing";
const KIND: Record<string, Kind> = {
  "UX Research": "research",
  "UI Design": "ui",
  Prototyping: "proto",
  "Design Systems": "system",
  "Interaction Design": "interaction",
  "Usability Testing": "testing",
};

const spring: Transition = { type: "spring", stiffness: 320, damping: 18 };
const repeat = (duration: number): Transition => ({ duration, repeat: Infinity, ease: "easeInOut" });

const ICON: Record<Kind, Variants> = {
  research: { rest: { x: 0, rotate: 0 }, hover: { x: [0, 5, -5, 0], rotate: [0, -12, 12, 0], transition: repeat(1.4) } },
  ui: { rest: { rotate: 0, y: 0 }, hover: { rotate: [0, -22, 0], y: [0, -2, 0], transition: repeat(0.9) } },
  proto: { rest: { rotate: 0, scale: 1 }, hover: { rotate: [0, -12, 12, 0], scale: [1, 1.18, 1], transition: repeat(1.1) } },
  system: { rest: { rotate: 0, color: "var(--hw-coral)" }, hover: { rotate: 90, color: "#ffffff", transition: spring } },
  interaction: { rest: { scale: 1 }, hover: { scale: [1, 0.78, 1], transition: repeat(0.9) } },
  testing: { rest: { rotate: 0 }, hover: { rotate: [0, -10, 8, 0], transition: { duration: 0.6 } } },
};

/** the little extra each skill draws around its icon */
function Extra({ kind }: { kind: Kind }) {
  switch (kind) {
    case "research":
      // a light sweeps across the tile, like a scan
      return (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-2 rounded-full"
          style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.9), transparent)" }}
          variants={{ rest: { left: "-20%", opacity: 0 }, hover: { left: ["-20%", "110%"], opacity: 1, transition: { left: repeat(1.4) } } }}
        />
      );
    case "ui":
      // the pen leaves a stroke under the tile
      return (
        <svg aria-hidden viewBox="0 0 40 10" className="pointer-events-none absolute -bottom-3 left-1/2 h-2.5 w-10 -translate-x-1/2 overflow-visible">
          <motion.path
            d="M2 6 Q10 0 18 5 T38 4"
            fill="none"
            stroke="var(--hw-coral)"
            strokeWidth="2.5"
            strokeLinecap="round"
            variants={{ rest: { pathLength: 0 }, hover: { pathLength: 1, transition: { duration: 0.6, ease: "easeOut" } } }}
          />
        </svg>
      );
    case "proto":
      // three connection dots orbit the tile
      return (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-2"
          variants={{ rest: { rotate: 0, opacity: 0 }, hover: { rotate: 360, opacity: 1, transition: { rotate: { duration: 2.4, repeat: Infinity, ease: "linear" } } } }}
        >
          {[0, 120, 240].map((a) => (
            <span
              key={a}
              className="absolute left-1/2 top-1/2 size-1.5 rounded-full bg-[var(--hw-coral)]"
              style={{ transform: `rotate(${a}deg) translateY(-28px)` }}
            />
          ))}
        </motion.span>
      );
    case "system":
      // the tile fills with colour as the grid snaps round
      return (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-[var(--hw-coral)]"
          variants={{ rest: { scale: 0.3, opacity: 0 }, hover: { scale: 1, opacity: 1, transition: spring } }}
        />
      );
    case "interaction":
      // every click sends out a ripple
      return (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl border-2 border-[var(--hw-coral)]"
          variants={{ rest: { scale: 1, opacity: 0 }, hover: { scale: [1, 1.7], opacity: [0.7, 0], transition: { duration: 0.9, repeat: Infinity, ease: "easeOut" } } }}
        />
      );
    case "testing":
      // a green tick pops onto the corner
      return (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#2fb67c] text-[10px] font-bold text-white shadow"
          variants={{ rest: { scale: 0 }, hover: { scale: 1, transition: { ...spring, delay: 0.2 } } }}
        >
          ✓
        </motion.span>
      );
  }
}

export function SkillCard({ label, icon: Icon }: { label: string; icon: ComponentType<{ className?: string }> }) {
  const kind = KIND[label] ?? "proto";
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: -4, transition: { type: "spring", stiffness: 400, damping: 26 } } }}
      className="flex h-full flex-col items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3 py-5 text-center backdrop-blur-md transition-shadow hover:shadow-[0_16px_32px_-24px_rgba(32,43,69,0.6)]"
    >
      <span className="relative isolate grid size-10 place-items-center rounded-xl bg-[var(--hw-peach)] text-[var(--hw-coral)]">
        <Extra kind={kind} />
        <motion.span variants={ICON[kind]} className="relative grid place-items-center">
          <Icon className="size-5" />
        </motion.span>
      </span>
      <span className="text-[12px] font-medium text-[var(--hw-navy)]">{label}</span>
    </motion.div>
  );
}
