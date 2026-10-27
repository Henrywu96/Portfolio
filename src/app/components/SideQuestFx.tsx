import { motion, type Transition, type Variants } from "motion/react";

/*
 * A different hover effect for each side quest, drawn behind the card's text. The card is a motion
 * element with initial="rest" and whileHover="hover", so everything here just declares those two states.
 */

export type QuestFxKind = "island" | "lrt" | "subway" | "car" | "warehouse" | "coffee" | "jobs";

const spring: Transition = { type: "spring", stiffness: 260, damping: 22 };
const loop = (duration: number, delay = 0): Transition => ({ duration, delay, repeat: Infinity, ease: "linear" });

/** fades the whole illustration in on hover */
const layer: Variants = {
  rest: { opacity: 0, transition: { duration: 0.25 } },
  hover: { opacity: 1, transition: { duration: 0.25 } },
};

function Art({ children, className = "", c }: { children: React.ReactNode; className?: string; c?: string }) {
  return (
    <motion.svg
      aria-hidden
      variants={layer}
      viewBox="0 0 160 100"
      className={`pointer-events-none absolute ${className}`}
      style={{ zIndex: -1, overflow: "visible", color: c }}
    >
      {children}
    </motion.svg>
  );
}

/** Mini Island: a little island rises out of the waves and bobs */
function Island({ c }: { c: string }) {
  return (
    <Art c={c} className="bottom-2 right-3 h-[72px] w-[115px]">
      <motion.circle cx="128" cy="22" r="9" fill="#ffd166" variants={{ rest: { scale: 0 }, hover: { scale: 1, transition: { ...spring, delay: 0.15 } } }} />
      <motion.g variants={{ rest: { y: 34 }, hover: { y: 0, transition: spring } }}>
        <motion.g variants={{ rest: { y: 0 }, hover: { y: [0, -3, 0], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } } }}>
          <ellipse cx="80" cy="78" rx="40" ry="9" fill="#f4d9a8" />
          <path d="M48 76 Q80 50 112 76 Z" fill="currentColor" />
          <path d="M84 62 Q86 44 92 34" stroke="#a8724a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M92 34 q-14 -4 -22 6 M92 34 q12 -6 22 2 M92 34 q-4 -10 -14 -12 M92 34 q8 -10 18 -8" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </motion.g>
      </motion.g>
      {[0, 1].map((i) => (
        // the group places the wave; the path inside slides along it (Motion owns the path's transform)
        <g key={i} transform={`translate(0 ${88 + i * 7})`}>
          <motion.path
            d="M-40 0 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"
            stroke="#7cc4e8"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity={0.8 - i * 0.3}
            variants={{ rest: { x: 0 }, hover: { x: [0, 40], transition: loop(1.6 + i * 0.6) } }}
          />
        </g>
      ))}
    </Art>
  );
}

/** Edmonton LRT: a two-car train runs along the card's coloured top bar */
function Lrt({ c }: { c: string }) {
  return (
    <motion.div aria-hidden variants={layer} className="pointer-events-none absolute inset-x-0 top-1 h-4" style={{ zIndex: -1, color: c }}>
      <motion.svg
        viewBox="0 0 60 16"
        className="absolute top-0 h-4 w-[60px]"
        variants={{ rest: { left: "-20%" }, hover: { left: ["-20%", "108%"], transition: loop(2.6) } }}
      >
        {[0, 31].map((x) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <rect x="0" y="2" width="28" height="11" rx="3" fill="currentColor" />
            <rect x="3" y="4.5" width="6" height="3.5" rx="1" fill="#e7f1ff" />
            <rect x="11" y="4.5" width="6" height="3.5" rx="1" fill="#e7f1ff" />
            <rect x="19" y="4.5" width="6" height="3.5" rx="1" fill="#e7f1ff" />
          </g>
        ))}
        <rect x="56" y="9" width="3" height="2" rx="1" fill="#ffe08a" />
      </motion.svg>
    </motion.div>
  );
}

// points along the U of Line 1, for the little train (sampled from the path below)
const TX = [56,56,56,56,56,56,56,57,59.8,64.6,71.4,80,88.6,95.4,100.2,103,104,104,104,104,104,104,104];
const TY = [14,21.3,28.7,36,43.3,50.7,58,66.6,73.4,78.2,81,82,81,78.2,73.4,66.6,58,50.7,43.3,36,28.7,21.3,14];

/** Toronto Transit Live: the subway map draws itself, with a train running round the U */
function Subway() {
  const draw = (delay: number): Variants => ({
    rest: { pathLength: 0 },
    hover: { pathLength: 1, transition: { duration: 0.7, delay, ease: "easeOut" } },
  });
  const U = "M56 14 V58 Q56 82 80 82 Q104 82 104 58 V14";
  return (
    <Art className="bottom-2 right-3 h-[72px] w-[115px]">
      <motion.path d="M10 40 H150" stroke="#00923f" strokeWidth="5" strokeLinecap="round" fill="none" variants={draw(0.15)} />
      <motion.path d="M104 22 H140" stroke="#a21a68" strokeWidth="5" strokeLinecap="round" fill="none" variants={draw(0.35)} />
      <motion.path d="M24 26 H150" stroke="#ff8000" strokeWidth="5" strokeLinecap="round" fill="none" opacity={0.75} variants={draw(0.25)} />
      <motion.path d={U} stroke="#f8c300" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" variants={draw(0)} />
      {[[56, 40], [104, 40], [80, 82], [104, 22]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="4.5" fill="#fff" stroke="#1d2230" strokeWidth="2" variants={{ rest: { scale: 0 }, hover: { scale: 1, transition: { ...spring, delay: 0.5 + i * 0.08 } } }} />
      ))}
      <motion.circle
        r="4"
        fill="#1d2230"
        stroke="#fff"
        strokeWidth="1.5"
        variants={{
          rest: { cx: TX[0], cy: TY[0], opacity: 0 },
          hover: { cx: TX, cy: TY, opacity: 1, transition: { duration: 2.4, delay: 0.7, repeat: Infinity, repeatType: "reverse", ease: "linear" } },
        }}
      />
    </Art>
  );
}

/** Arcline: the car slides in on speed lines, and a headlight beam sweeps the card */
function Car({ c }: { c: string }) {
  return (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/3"
        style={{ zIndex: -1, background: "linear-gradient(100deg, transparent, rgba(255,241,214,0.9), transparent)" }}
        variants={{ rest: { left: "-40%", opacity: 0 }, hover: { left: ["-40%", "120%"], opacity: 1, transition: { left: { duration: 1.1, ease: "easeInOut" } } } }}
      />
      <Art c={c} className="bottom-2 right-3 h-[72px] w-[115px]">
        {[30, 44, 58].map((y, i) => (
          <motion.line
            key={y}
            x1="70"
            x2="110"
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{ rest: { x: 0, opacity: 0 }, hover: { x: [30, -60], opacity: [0, 0.8, 0], transition: loop(0.7, i * 0.18) } }}
          />
        ))}
        <motion.g variants={{ rest: { x: 70 }, hover: { x: 0, transition: spring } }}>
          <path d="M96 62 L102 48 Q106 40 116 40 L136 40 Q146 40 150 50 L156 52 Q160 53 160 58 L160 62 Z" fill="currentColor" />
          <path d="M108 48 L112 43 L124 43 L124 48 Z M128 48 L128 43 L136 43 Q142 43 145 48 Z" fill="#e8eef6" />
          <circle cx="110" cy="63" r="6" fill="#2a3656" />
          <circle cx="148" cy="63" r="6" fill="#2a3656" />
          <circle cx="158" cy="55" r="2" fill="#ffe08a" />
        </motion.g>
      </Art>
    </>
  );
}

/** Stackyard: boxes drop onto a pallet one by one while the conveyor runs */
function Warehouse({ c }: { c: string }) {
  const box = (x: number, y: number, i: number, w = 24) => (
    <motion.g
      key={i}
      variants={{ rest: { y: -70, opacity: 0 }, hover: { y: 0, opacity: 1, transition: { ...spring, delay: 0.08 + i * 0.14 } } }}
    >
      <rect x={x} y={y} width={w} height="20" rx="2" fill={i % 2 ? "#d9b38c" : "#c99a6b"} />
      <path d={`M${x + w / 2 - 3} ${y} h6 v6 h-6 z`} fill="#f4e5da" opacity="0.8" />
    </motion.g>
  );
  return (
    <Art c={c} className="bottom-2 right-3 h-[72px] w-[115px]">
      <motion.path
        d="M14 92 H150"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="6 6"
        strokeLinecap="round"
        variants={{ rest: { strokeDashoffset: 0 }, hover: { strokeDashoffset: [0, -24], transition: loop(0.6) } }}
      />
      <rect x="82" y="80" width="62" height="6" rx="1.5" fill="#8a6a4a" />
      {box(84, 60, 0)}
      {box(112, 60, 1, 30)}
      {box(96, 40, 2)}
    </Art>
  );
}

/** Emberline Coffee: a warm cup with steam curling up */
function Coffee({ c }: { c: string }) {
  return (
    <Art c={c} className="bottom-2 right-3 h-[72px] w-[115px]">
      <motion.circle cx="112" cy="66" r="34" fill="currentColor" opacity={0.12} variants={{ rest: { scale: 0.6 }, hover: { scale: 1, transition: spring } }} />
      <motion.g variants={{ rest: { y: 12 }, hover: { y: 0, transition: spring } }}>
        <path d="M90 56 H130 V74 Q130 88 116 88 H104 Q90 88 90 74 Z" fill="currentColor" />
        <path d="M130 62 Q142 62 142 70 Q142 78 130 78" stroke="currentColor" strokeWidth="4" fill="none" />
        <ellipse cx="110" cy="56" rx="20" ry="3.5" fill="#6b3f1f" />
        <ellipse cx="110" cy="92" rx="30" ry="3" fill="#e8d6c4" />
      </motion.g>
      {[100, 110, 120].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 48 q-5 -7 0 -14 t0 -14`}
          stroke="#a98a70"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          variants={{
            rest: { opacity: 0, y: 0 },
            hover: { opacity: [0, 0.9, 0], y: [4, -14], transition: { duration: 1.8, delay: i * 0.4, repeat: Infinity, ease: "easeOut" } },
          }}
        />
      ))}
    </Art>
  );
}

/** Job Tracker: a job card moves across the board, To apply → Applied → Offer, and gets a tick */
function Jobs({ c }: { c: string }) {
  const cols = [20, 66, 112];
  return (
    <Art c={c} className="bottom-2 right-3 h-[72px] w-[115px]">
      {cols.map((x) => (
        <rect key={x} x={x} y="20" width="38" height="70" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 4" />
      ))}
      <rect x="24" y="64" width="30" height="10" rx="3" fill="currentColor" opacity="0.25" />
      <rect x="116" y="64" width="30" height="10" rx="3" fill="currentColor" opacity="0.25" />
      <motion.g
        variants={{
          rest: { x: 0 },
          hover: { x: [0, 0, 46, 46, 92, 92], transition: { duration: 2.4, times: [0, 0.15, 0.35, 0.5, 0.7, 1], repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" } },
        }}
      >
        <rect x="24" y="28" width="30" height="26" rx="4" fill="#fff" stroke="currentColor" strokeWidth="2" />
        <rect x="29" y="34" width="16" height="3" rx="1.5" fill="currentColor" />
        <rect x="29" y="41" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
      </motion.g>
      <motion.path
        d="M122 46 l6 6 l12 -12"
        stroke="#2fb67c"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ rest: { pathLength: 0 }, hover: { pathLength: [0, 0, 1, 1], transition: { duration: 2.4, times: [0, 0.72, 0.85, 1], repeat: Infinity, repeatDelay: 0.4 } } }}
      />
    </Art>
  );
}

export function QuestFx({ kind, accent }: { kind: QuestFxKind; accent: string }) {
  switch (kind) {
    case "island":
      return <Island c={accent} />;
    case "lrt":
      return <Lrt c={accent} />;
    case "subway":
      return <Subway />;
    case "car":
      return <Car c={accent} />;
    case "warehouse":
      return <Warehouse c={accent} />;
    case "coffee":
      return <Coffee c={accent} />;
    case "jobs":
      return <Jobs c={accent} />;
  }
}
