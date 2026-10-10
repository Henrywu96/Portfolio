import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ART } from "../assets";

// Deterministic warm sparkle positions
const SPARKLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100).toFixed(2),
  y: ((i * 97.328) % 100).toFixed(2),
  size: (((i * 53) % 4) + 2).toFixed(0),
  delay: ((i * 0.19) % 4).toFixed(2),
  dur: (2.2 + ((i * 0.27) % 2.5)).toFixed(2),
  color:
    i % 5 === 0
      ? "var(--hw-coral-soft)"
      : i % 5 === 1
      ? "var(--hw-sun-light)"
      : i % 5 === 2
      ? "var(--hw-peach)"
      : i % 5 === 3
      ? "rgba(255,255,255,0.9)"
      : "var(--hw-border)",
}));

const INNER_MARKS = [0, 60, 120, 180, 240, 300];
const OUTER_MARKS = [30, 90, 150, 210, 270, 330];

const toXY = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

export function MMORPGIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const finishingRef = useRef(false);
  const onDoneRef = useRef(onDone);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const finishIntro = () => {
    if (finishingRef.current) return;
    finishingRef.current = true;

    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
    clearTimers();
    setLeaving(true);
    timersRef.current.push(setTimeout(() => onDoneRef.current(), 700));
  };

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const schedule: [number, () => void][] = [
      [60, () => setPhase(1)],
      [380, () => setPhase(2)],
      [800, () => setPhase(3)],
      [1200, () => setPhase(4)],
      [1500, () => setPhase(5)],
    ];
    timersRef.current.push(
      ...schedule.map(([ms, fn]) => setTimeout(fn, ms)),
    );
  }, []);

  useEffect(() => {
    if (phase < 5) return;
    let start: number | null = null;
    const duration = 1000;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(((ts - start) / duration) * 100, 100);
      setProgress(p);
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timersRef.current.push(setTimeout(finishIntro, 150));
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };
  }, [phase]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishIntro();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      clearTimers();
    },
    [],
  );

  return (
    <>
      <style>{`
        @keyframes hw-sparkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.85; transform: scale(1.5); }
        }
        @keyframes hw-drift {
          0%   { transform: translateY(0px) translateX(0px); }
          33%  { transform: translateY(-14px) translateX(6px); }
          66%  { transform: translateY(-6px) translateX(-5px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes hw-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes hw-sun-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        .hw-sparkle {
          animation: hw-sparkle var(--dur) var(--delay) infinite ease-in-out,
                     hw-drift calc(var(--dur) * 1.8) var(--delay) infinite ease-in-out;
        }
        .hw-shimmer { animation: hw-shimmer 1.4s 0.2s infinite linear; }
        .hw-sun-pulse { animation: hw-sun-pulse 4s infinite ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .hw-sparkle, .hw-shimmer, .hw-sun-pulse { animation: none; }
        }
      `}</style>

      <motion.div
        className="fixed inset-0 z-[100] overflow-hidden"
        animate={leaving ? { y: "-100%" } : { y: "0%" }}
        transition={
          leaving
            ? { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
      >
        {/* Sky gradient — mirrors the homepage background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, var(--hw-sky-top) 0%, var(--hw-sky-mid) 55%, var(--hw-sky-bottom) 100%)",
          }}
        />

        {/* Warm sparkles */}
        {phase >= 1 &&
          SPARKLES.map((s) => (
            <div
              key={s.id}
              className="hw-sparkle absolute rounded-full"
              style={
                {
                  left: s.x + "%",
                  top: s.y + "%",
                  width: s.size + "px",
                  height: s.size + "px",
                  background: s.color,
                  "--dur": s.dur + "s",
                  "--delay": s.delay + "s",
                } as React.CSSProperties
              }
            />
          ))}

        {/* Soft coral glow at bottom */}
        <div
          className="absolute bottom-0 left-1/2 h-48 w-[60%] -translate-x-1/2 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--hw-coral) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />

        {/* Center stage */}
        <div className="relative flex h-full flex-col items-center justify-center">

          {/* Outer rotating ring */}
          <motion.div
            className="absolute"
            style={{ width: 380, height: 380 }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={phase >= 2 ? { opacity: 1, rotate: -360 } : {}}
            transition={{
              opacity: { duration: 1.2 },
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            }}
          >
            <svg viewBox="0 0 380 380" className="h-full w-full">
              <circle
                cx="190" cy="190" r="178"
                fill="none"
                stroke="rgba(236,106,78,0.25)"
                strokeWidth="1"
                strokeDasharray="2 22"
              />
              {OUTER_MARKS.map((deg) => {
                const p = toXY(190, 190, 178, deg);
                return (
                  <polygon
                    key={deg}
                    points={`${p.x},${p.y - 5} ${p.x + 4},${p.y + 4} ${p.x - 4},${p.y + 4}`}
                    fill="var(--hw-coral-soft)"
                    opacity="0.6"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Inner rotating ring */}
          <motion.div
            className="absolute"
            style={{ width: 290, height: 290 }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={phase >= 2 ? { opacity: 1, rotate: 360 } : {}}
            transition={{
              opacity: { duration: 1 },
              rotate: { duration: 22, repeat: Infinity, ease: "linear" },
            }}
          >
            <svg viewBox="0 0 290 290" className="h-full w-full">
              <circle
                cx="145" cy="145" r="135"
                fill="none"
                stroke="rgba(236,106,78,0.3)"
                strokeWidth="1"
                strokeDasharray="5 10"
              />
              <circle
                cx="145" cy="145" r="118"
                fill="none"
                stroke="rgba(255,209,102,0.35)"
                strokeWidth="0.7"
                strokeDasharray="1 14"
              />
              {INNER_MARKS.map((deg) => {
                const p = toXY(145, 145, 135, deg);
                return (
                  <circle
                    key={deg}
                    cx={p.x} cy={p.y} r="3.5"
                    fill="var(--hw-coral)"
                    opacity="0.7"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Shield emblem */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full hw-sun-pulse"
              style={{
                width: 120,
                height: 120,
                background:
                  "radial-gradient(circle, rgba(255,193,87,0.45) 0%, transparent 70%)",
                filter: "blur(18px)",
              }}
            />
            <img
              src={ART.shield}
              alt=""
              className="relative size-24 object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 14px rgba(236,106,78,0.7)) drop-shadow(0 0 32px rgba(255,193,87,0.4))",
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.7em", y: 16 }}
            animate={phase >= 3 ? { opacity: 1, letterSpacing: "0.2em", y: 0 } : {}}
            transition={{ duration: 0.85, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--hw-navy)",
              fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
              textShadow:
                "0 2px 12px rgba(236,106,78,0.25), 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            HENRY WU
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase >= 3 ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 flex items-center gap-3"
          >
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--hw-coral-soft))",
              }}
            />
            <div
              className="size-1.5 rotate-45 rounded-[1px]"
              style={{ background: "var(--hw-coral)" }}
            />
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, var(--hw-coral-soft))",
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mt-3 text-xs uppercase tracking-[0.45em]"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--hw-slate)",
            }}
          >
            UI/UX Designer · Portfolio
          </motion.p>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="absolute bottom-14 w-72 space-y-2.5 px-1"
          >
            <div
              className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span style={{ color: "var(--hw-slate)" }}>Entering World…</span>
              <span
                style={{
                  color: "var(--hw-coral)",
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                }}
              >
                {Math.round(progress)}%
              </span>
            </div>

            {/* Track */}
            <div
              className="relative h-[5px] w-full overflow-hidden rounded-full"
              style={{ background: "var(--hw-border)" }}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, var(--hw-coral-soft) 0%, var(--hw-coral) 100%)",
                  boxShadow: "0 0 8px rgba(236,106,78,0.5)",
                  transition: "width 0.05s linear",
                }}
              >
                <div
                  className="hw-shimmer absolute inset-y-0 w-1/3 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                  }}
                />
              </div>
            </div>

            <p
              className="text-center text-[10px] tracking-[0.3em] uppercase"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--hw-slate)",
                opacity: 0.7,
              }}
            >
              Loading portfolio assets
            </p>
          </motion.div>
        </div>
        <button
          type="button"
          onClick={finishIntro}
          aria-label="Skip intro"
          className="absolute bottom-6 right-6 z-10 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-[var(--hw-slate)] backdrop-blur-md transition hover:bg-white hover:text-[var(--hw-coral)]"
        >
          SKIP ›
        </button>
      </motion.div>
    </>
  );
}
