import {
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

/*
 * Scroll-linked effects in the spirit of Apple's product pages: things are tied to the scroll position
 * itself rather than played once, so scrolling back runs them backwards. They only move and scale things
 * (nothing fades out), and they run on Motion values, so scrolling never re-renders React.
 * With reduced motion everything is simply shown in place.
 */

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/** scroll progress (0–1) of an element through `offset` */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, offset: Offset): MotionValue<number> {
  return useScroll({ target: ref, offset }).scrollYProgress;
}

/** the whole page's progress as a thin XP bar along the top of the window */
export function ScrollXpBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        height: 3,
        zIndex: 60,
        transformOrigin: "0 50%",
        scaleX,
        background: "linear-gradient(90deg, var(--hw-coral), var(--hw-rarity-legendary))",
        boxShadow: "0 0 10px var(--hw-legendary-glow)",
      }}
    />
  );
}

/** rises into place as it scrolls into view */
export function ScrollReveal({
  children,
  className,
  style,
  lag = 0,
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** 0–0.3: starts a little later than its neighbours, for a staggered row */
  lag?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const p = useScrollProgress(ref, [`start ${1 - lag}`, `start ${0.7 - lag}`]);
  const y = useTransform(p, [0, 1], [distance, 0]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? style : { ...style, y }}>
      {children}
    </motion.div>
  );
}

/** shrinks back a little as it scrolls away off the top, like a product hero */
export function ScrollAway({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const p = useScrollProgress(ref, ["start start", "end start"]);
  const scale = useTransform(p, [0, 1], [1, 0.9]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}>
      {children}
    </motion.div>
  );
}

/** grows from a smaller card into full size as it comes up the screen; the picture inside zooms out at the same time */
export function useZoomIn(ref: RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const p = useScrollProgress(ref, ["start end", "start 0.5"]);
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const radius = useTransform(p, [0, 1], [44, 24]);
  const imageScale = useTransform(p, [0, 1], [1.12, 1]);
  return reduce
    ? { card: {}, image: {} }
    : { card: { scale, borderRadius: radius }, image: { scale: imageScale } };
}
