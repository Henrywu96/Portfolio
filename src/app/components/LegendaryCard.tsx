import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/*
 * A legendary loot card, after the "badge unlock" idea: the card is a solid object that tilts toward the
 * cursor (fast and smooth, no bounce), a light glare follows the pointer, and the first time it scrolls
 * into view a shine sweeps across it and gold particles burst out. Hovering again replays a smaller burst,
 * at most every few seconds. With reduced motion the card stays still and nothing bursts.
 */

const GOLD = ["#e6a400", "#ffd166", "#ffe29a", "#fff4cf"];
const MAX_TILT = { x: 7, y: 9 }; // degrees
const SPRING = { stiffness: 280, damping: 30, mass: 0.6 };
const REPLAY_MS = 4500;

type Spark = {
  key: string;
  x: number;
  y: number;
  fall: number;
  size: number;
  color: string;
  star: boolean;
  spin: number;
  dur: number;
  delay: number;
};
type Burst = { id: number; big: boolean; sparks: Spark[] };

function makeSparks(id: number, n: number, spread: number): Spark[] {
  return Array.from({ length: n }, (_, i) => {
    // evenly round the card with a little jitter, wider than tall, leaning upward
    const a = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const d = spread * (0.55 + Math.random() * 0.6);
    return {
      key: `${id}-${i}`,
      x: Math.cos(a) * d * 1.45,
      y: Math.sin(a) * d * 0.8 - 18,
      fall: 18 + Math.random() * 30,
      size: 5 + Math.random() * 8,
      color: GOLD[i % GOLD.length],
      star: i % 3 === 0,
      spin: (Math.random() - 0.5) * 360,
      dur: 1.2 + Math.random() * 0.8,
      delay: Math.random() * 0.12,
    };
  });
}

const STAR = "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

export function LegendaryCard({
  children,
  className = "",
  style,
  label = "LEGENDARY",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // pointer position over the card, 0–1 on each axis; the card rests flat at the middle
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT.x, -MAX_TILT.x]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT.y, MAX_TILT.y]), SPRING);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,250,235,0.6), rgba(255,214,102,0.14) 32%, rgba(255,214,102,0) 60%)`;

  const [hover, setHover] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const last = useRef(-Infinity);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const burst = (big: boolean) => {
    if (reduce) return;
    const now = performance.now();
    if (now - last.current < REPLAY_MS) return;
    last.current = now;
    const id = Math.round(now);
    setBursts((b) => [...b, { id, big, sparks: makeSparks(id, big ? 38 : 16, big ? 165 : 115) }]);
    timers.current.push(setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 2400));
  };

  useEffect(() => {
    if (inView) burst(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const enter = () => {
    setHover(true);
    burst(false);
  };
  const leave = () => {
    setHover(false);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerEnter={enter}
      onPointerLeave={leave}
      style={{ position: "relative", perspective: 900 }}
    >
      <motion.div
        className={className}
        style={{
          ...style,
          position: "relative",
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hover
            ? "0 22px 44px -26px rgba(230,164,0,0.75), 0 0 0 2px rgba(230,164,0,0.55)"
            : "0 14px 34px -28px rgba(32,43,69,0.55), 0 0 0 1px rgba(230,164,0,0.18)",
          transition: "box-shadow 0.3s ease-out",
        }}
      >
        {children}

        {/* the rarity tag sits a little in front of the card */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            transform: "translateZ(36px)",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            borderRadius: 6,
            padding: "3px 7px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "var(--qu-rarity-legendary-text)",
            background: "linear-gradient(135deg, #f2b705, #e6a400 55%, #c98a00)",
            boxShadow: "0 6px 14px -8px rgba(201,138,0,0.9)",
          }}
        >
          ★ {label}
        </span>

        {/* glare that follows the pointer */}
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: glare,
            opacity: hover && !reduce ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        />

        {/* the shine that sweeps across once per burst */}
        <span
          aria-hidden
          style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden", pointerEvents: "none" }}
        >
          <AnimatePresence>
            {bursts.map((b) => (
              <motion.span
                key={`shine-${b.id}`}
                style={{
                  position: "absolute",
                  top: "-20%",
                  bottom: "-20%",
                  width: "45%",
                  background:
                    "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,236,170,0.28) 40%, rgba(255,255,255,0.6) 50%, rgba(255,236,170,0.28) 60%, rgba(255,255,255,0) 100%)",
                }}
                initial={{ left: "-50%", opacity: 0 }}
                animate={{ left: "110%", opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: b.big ? 0.95 : 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
            ))}
          </AnimatePresence>
        </span>
      </motion.div>

      {/* gold particles and a ring, bursting from the middle of the card (outside it, so they can fly past its edges) */}
      <div
        aria-hidden
        style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, pointerEvents: "none", zIndex: 2 }}
      >
        <AnimatePresence>
          {bursts.map((b) => (
            <motion.span
              key={`ring-${b.id}`}
              style={{
                position: "absolute",
                left: -70,
                top: -70,
                width: 140,
                height: 140,
                borderRadius: "50%",
                border: "2px solid rgba(230,164,0,0.8)",
                boxShadow: "0 0 18px rgba(255,209,102,0.7)",
              }}
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: b.big ? 2.4 : 1.7, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: b.big ? 0.9 : 0.7, ease: "easeOut" }}
            />
          ))}
          {bursts.flatMap((b) =>
            b.sparks.map((s) => (
              <motion.span
                key={s.key}
                style={{
                  position: "absolute",
                  left: -s.size / 2,
                  top: -s.size / 2,
                  width: s.size,
                  height: s.size,
                  background: s.color,
                  borderRadius: s.star ? 0 : "50%",
                  clipPath: s.star ? STAR : undefined,
                  boxShadow: s.star ? undefined : `0 0 ${s.size}px ${s.color}`,
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
                animate={{
                  x: [0, s.x * 0.85, s.x],
                  y: [0, s.y, s.y + s.fall],
                  scale: [0, 1.25, 0.5],
                  opacity: [0, 1, 0],
                  rotate: [0, s.spin * 0.6, s.spin],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: s.dur, delay: s.delay, times: [0, 0.35, 1], ease: "easeOut" }}
              />
            )),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
