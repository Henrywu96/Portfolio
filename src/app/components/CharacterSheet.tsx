import { Fragment, useRef, type ComponentType } from "react";
import { motion, useInView, useReducedMotion, type Transition } from "motion/react";
import { Target, Wrench } from "lucide-react";

/*
 * The Character Sheet card, as it was, with a few touches:
 * - the first time it comes into view a light sweeps across it and the three titles are stamped in one by one
 *   (a little heart pops up beside "Hamster Lover.")
 * - hovering the picture makes Henry's laptop give off little code sparks
 * - the Focus and Tools boxes lift, and their icons hit the target and turn the wrench
 */

const TITLES = ["UI/UX Designer.", "Hamster Lover.", "Problem Solver."];
const stamp: Transition = { type: "spring", stiffness: 420, damping: 24 };

export function CharacterSheet({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const show = seen || !!reduce;

  return (
    <div
      ref={ref}
      className="relative mt-4 grid gap-6 overflow-hidden rounded-3xl border border-white/70 bg-white/70 backdrop-blur-md p-6 md:grid-cols-[220px_1fr]"
    >
      {/* a light sweeps across the card once, as it "loads" */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1/3"
          style={{ background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.75), transparent)" }}
          initial={{ left: "-40%" }}
          animate={seen ? { left: "130%" } : { left: "-40%" }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        />
      )}

      <Portrait image={image} />

      <div>
        <h3 className="text-[22px] text-[var(--qu-text-heading)]" aria-label={TITLES.join(" ")}>
          {TITLES.map((t, i) => (
            <Fragment key={t}>
            <span aria-hidden className="relative inline-block">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)", y: 10, scale: 1.12 }}
                animate={show ? { clipPath: "inset(0 0% 0 0)", y: 0, scale: 1 } : undefined}
                transition={{ clipPath: { duration: 0.45, delay: 0.25 + i * 0.32, ease: "easeOut" }, default: { ...stamp, delay: 0.25 + i * 0.32 } }}
              >
                {t}
              </motion.span>
              {i === 1 && (
                <motion.svg
                  viewBox="0 0 24 24"
                  className="absolute -right-3.5 -top-2.5 size-3.5 text-[var(--qu-text-accent)]"
                  initial={reduce ? false : { scale: 0, rotate: -20 }}
                  animate={show ? { scale: [0, 1.35, 1], rotate: 12 } : undefined}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <path
                    fill="currentColor"
                    d="M12 21s-7.5-4.6-9.6-9.1C.9 8.6 3 5 6.6 5c2.1 0 3.6 1.1 5.4 3 1.8-1.9 3.3-3 5.4-3C21 5 23.1 8.6 21.6 11.9 19.5 16.4 12 21 12 21z"
                  />
                </motion.svg>
              )}
            </span>
            {i < TITLES.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h3>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[var(--qu-text-body)]">
          I'm Henry Wu, a UI/UX designer who crafts meaningful digital experiences with empathy and curiosity. When I'm not designing, you'll find me hanging out with my hamster, gaming, or working out.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Fact icon={Target} kind="target" label="Focus" value="UI/UX Design, Web Design" />
          <Fact icon={Wrench} kind="wrench" label="Tools" value="Figma, Framer, FigJam, Maze, Notion, Spline, Lottie" />
        </div>
      </div>
    </div>
  );
}

/** the picture: on hover Henry leans in a touch and his laptop gives off code sparks */
const SPARKS = [
  { t: "</>", x: "26%", c: "var(--qu-coral-500)", d: 0 },
  { t: "{ }", x: "40%", c: "var(--qu-rare-600)", d: 0.45 },
  { t: "✦", x: "33%", c: "var(--qu-gold-500)", d: 0.9 },
];
function Portrait({ image }: { image: string }) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--qu-cream-100)] to-[var(--qu-peach-100)] p-2"
    >
      <motion.img
        src={image}
        alt="Henry Wu working at his desk"
        className="h-44 w-full object-contain"
        variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.04, y: -3, transition: { type: "spring", stiffness: 300, damping: 22 } } }}
      />
      {SPARKS.map((s) => (
        <motion.span
          key={s.t}
          aria-hidden
          className="pointer-events-none absolute top-[48%] text-[14px] font-bold"
          style={{ left: s.x, color: s.c, textShadow: "0 0 6px #fff, 0 0 2px #fff" }}
          variants={{
            rest: { opacity: 0, y: 0, x: 0 },
            hover: { opacity: [0, 1, 0], y: [0, -40], x: [0, -10], transition: { duration: 1.4, delay: s.d, repeat: Infinity, ease: "easeOut" } },
          }}
        >
          {s.t}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Fact({
  icon: Icon,
  kind,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  kind: "target" | "wrench";
  label: string;
  value: string;
}) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: -3, transition: { type: "spring", stiffness: 400, damping: 26 } } }}
      className="rounded-xl bg-[var(--qu-surface-inset)] p-3 transition-shadow hover:shadow-[0_12px_26px_-20px_rgba(236,106,78,0.8)]"
    >
      <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-[var(--qu-text-body)]">
        <span className="relative inline-grid place-items-center">
          {kind === "target" && (
            // a hit on the bullseye sends out a ring
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-[var(--qu-coral-500)]"
              variants={{ rest: { scale: 1, opacity: 0 }, hover: { scale: [1, 2.4], opacity: [0.8, 0], transition: { duration: 0.8, repeat: Infinity, ease: "easeOut" } } }}
            />
          )}
          <motion.span
            className="inline-grid"
            variants={
              kind === "target"
                ? { rest: { scale: 1 }, hover: { scale: [1, 1.3, 1], transition: { duration: 0.8, repeat: Infinity } } }
                : { rest: { rotate: 0 }, hover: { rotate: [0, -35, 20, 0], transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" } } }
            }
          >
            <Icon className="size-3.5 text-[var(--qu-text-accent)]" />
          </motion.span>
        </span>
        {label}
      </p>
      <p className="mt-1 text-[13px] font-medium text-[var(--qu-text-heading)]">{value}</p>
    </motion.div>
  );
}
