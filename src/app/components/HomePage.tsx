import {
  ArrowRight,
  Mail,
  Star,
  Heart,
  Leaf,
  BookOpen,
  Search,
  PenTool,
  Boxes,
  LayoutGrid,
  MousePointerClick,
  ClipboardCheck,
  MapPin,
  Target,
  Wrench,
  Sparkles,
  Sword,
  Shield,
  Zap,
  ScrollText,
  Mouse,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Navbar } from "./Navbar";
import { ART, CONTACT_EMAIL } from "../assets";
import { IMAGES, PROJECTS, SKILLS, type Project } from "../data";

const ICONS: Record<string, any> = {
  Heart,
  Leaf,
  BookOpen,
  Search,
  PenTool,
  Boxes,
  LayoutGrid,
  MousePointerClick,
  ClipboardCheck,
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-white px-2 py-0.5 text-[11px] text-[var(--hw-slate)] ring-1 ring-[var(--hw-border)]">
      {children}
    </span>
  );
}

function ProjectRow({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const Icon = ICONS[project.icon] ?? Heart;
  const rarity = RARITY[project.id] ?? { label: "COMMON", color: "var(--hw-rarity-common)" };
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/70 bg-white/70 backdrop-blur-md p-3 text-left"
      style={{ boxShadow: `inset 3px 0 0 ${rarity.color}` }}
    >
      {/* Single border overlay — clip-path sweeps from left to right so all four corners always connect */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          border: `2px solid ${rarity.color}`,
          clipPath: hovered
            ? "inset(0 0% 0 0 round 1rem)"
            : "inset(0 100% 0 0 round 1rem)",
          transition: "clip-path 0.38s ease-out",
        }}
      />
      {project.iconImage ? (
        <img
          src={project.iconImage}
          alt={`${project.name} icon`}
          className="size-14 shrink-0 rounded-xl object-contain"
        />
      ) : (
        <span
          className="grid size-14 shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: `${project.accent}1a`, color: project.accent }}
        >
          <Icon className="size-6" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-[var(--hw-navy)]">
            {project.name}
          </span>
          <span
            className="rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white"
            style={{ backgroundColor: rarity.color }}
          >
            {rarity.label}
          </span>
        </span>
        <span className="mt-0.5 block truncate text-[12px] text-[var(--hw-slate)]">
          {project.tagline}
        </span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </span>
        <span className="mt-2 flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[var(--hw-coral)] opacity-0 transition group-hover:opacity-100">
          <Sword className="size-3" /> ACCEPT QUEST
        </span>
      </span>
      <ImageWithFallback
        src={project.image}
        alt={project.name}
        className={`hidden h-20 w-28 shrink-0 rounded-xl sm:block ${
          project.iconImage
            ? "bg-gradient-to-br from-[var(--hw-rose-from)] to-[var(--hw-rose-to)] object-contain p-1"
            : "object-cover"
        }`}
      />
    </button>
  );
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function HomePage({
  onOpenProject,
  onLogo,
}: {
  onOpenProject: (p: Project) => void;
  onLogo: () => void;
}) {
  const bridgly = PROJECTS[0];

  // Parallax scroll — manual listener avoids framer-motion peer dependency
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lerp = (sy: number, inMax: number, outMax: number) =>
    Math.min(sy / inMax, 1) * outMax;

  const sunY = lerp(scrollY, 600, 140);
  const farCloudsY = lerp(scrollY, 600, -50);
  const midCloudsY = lerp(scrollY, 600, -110);
  const sparkY = lerp(scrollY, 800, 220);
  const birdsY = lerp(scrollY, 600, 90);
  const heroFiguresY = lerp(scrollY, 600, 90);
  const heroTextY = lerp(scrollY, 600, -40);
  const foreCloudLeftY = lerp(scrollY, 600, -170);
  const foreCloudRightY = lerp(scrollY, 600, -210);
  const particlesY = lerp(scrollY, 900, -260);

  const [questRef, questInView] = useInView();
  const [skillRef, skillInView] = useInView();
  const [profileRef, profileInView] = useInView();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[var(--hw-sky-top)] via-[var(--hw-sky-mid)] to-[var(--hw-sky-bottom)] text-[var(--hw-navy)]">
      {/* Lively sky backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Glowing sun halo */}
        <motion.div
          style={{ y: sunY }}
          className="absolute -right-10 top-16 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,214,150,0.85),rgba(255,214,150,0)_70%)]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        />
        {/* Solid sun disc */}
        <motion.div
          style={{ y: sunY }}
          className="absolute right-10 top-32 size-24 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff2cf,var(--hw-sun-light)_55%,var(--hw-sun-dark))] shadow-[0_0_40px_rgba(255,193,87,0.75)] ring-2 ring-white/40"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        {/* Sun godrays */}
        <motion.div
          style={{ y: sunY }}
          className="absolute -right-24 top-4 size-[420px] opacity-40 mix-blend-screen"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        >
          <div className="size-full bg-[conic-gradient(from_0deg,rgba(255,214,150,0)_0deg,rgba(255,224,170,0.55)_12deg,rgba(255,214,150,0)_24deg,rgba(255,214,150,0)_45deg,rgba(255,224,170,0.5)_57deg,rgba(255,214,150,0)_69deg,rgba(255,214,150,0)_90deg,rgba(255,224,170,0.55)_102deg,rgba(255,214,150,0)_114deg,rgba(255,214,150,0)_180deg,rgba(255,224,170,0.5)_192deg,rgba(255,214,150,0)_204deg,rgba(255,214,150,0)_270deg,rgba(255,224,170,0.55)_282deg,rgba(255,214,150,0)_294deg)] [mask-image:radial-gradient(circle,black_0%,transparent_70%)]" />
        </motion.div>

        {/* Soft coral glow bottom-left */}
        <div className="absolute -bottom-24 -left-16 size-80 rounded-full bg-[radial-gradient(circle,rgba(255,171,145,0.28),rgba(255,171,145,0)_70%)]" />

        {/* Far clouds (slowest parallax) */}
        <motion.div style={{ y: farCloudsY }} className="absolute inset-0">
          <Cloud className="left-[-4%] top-[12%] w-64 opacity-90" duration={26} />
          <Cloud className="right-[-3%] top-[24%] w-72 opacity-80" duration={32} />
        </motion.div>

        {/* Mid clouds (medium parallax) */}
        <motion.div style={{ y: midCloudsY }} className="absolute inset-0">
          <Cloud className="left-[8%] top-[52%] w-56 opacity-70" duration={30} />
          <Cloud className="right-[6%] top-[68%] w-64 opacity-75" duration={28} />
        </motion.div>

        {/* Drifting birds (parallax) */}
        <motion.div style={{ y: birdsY }} className="absolute inset-0">
          <Bird className="top-[16%]" delay={0} duration={22} scale={1} />
          <Bird className="top-[30%]" delay={6} duration={28} scale={0.7} />
          <Bird className="top-[22%]" delay={12} duration={25} scale={0.85} />
        </motion.div>

        {/* Floating sparkles / bubbles (parallax) */}
        <motion.div style={{ y: sparkY }} className="absolute inset-0">
          {SPARKLES.map((s) => (
            <motion.span
              key={s.id}
              className="absolute rounded-full"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                background: s.color,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: s.duration,
                delay: s.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Rising magic particles (parallax) */}
        <motion.div style={{ y: particlesY }} className="absolute inset-0">
          {PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{ left: p.left, bottom: "-5%", width: p.size, height: p.size }}
              animate={{ y: [0, -p.rise], opacity: [0, 0.9, 0] }}
              transition={{
                repeat: Infinity,
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>

        {/* Foreground cloud — left, lower (fast parallax) */}
        <motion.div style={{ y: foreCloudLeftY }} className="absolute inset-0">
          <Cloud className="left-[-6%] bottom-[-4%] w-[28rem] opacity-95" duration={33} />
        </motion.div>

        {/* Foreground cloud — right, higher (fastest parallax) */}
        <motion.div style={{ y: foreCloudRightY }} className="absolute inset-0">
          <Cloud className="right-[-7%] bottom-[4%] w-[24rem] opacity-90" duration={38} />
        </motion.div>

        {/* Soft vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(120,150,190,0.14)_100%)]" />
      </div>

      <div className="relative z-10">
        <Navbar onLogoClick={onLogo} active="Home" />

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-5 pt-10 md:pt-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div style={{ y: heroTextY }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-[var(--hw-coral)] backdrop-blur-md">
              <Sparkles className="size-3.5" /> PLAYER SELECT
            </p>
            <h1 className="mt-3 text-[52px] leading-[0.95] text-[var(--hw-navy)] md:text-[64px]">
              HENRY WU
            </h1>
            <h2 className="mt-1 flex flex-wrap items-center gap-2 text-[28px] text-[var(--hw-coral-soft)] md:text-[34px]">UI/UX DESIGNER<span className="inline-flex items-center gap-1 rounded-md bg-[var(--hw-navy)] px-2 py-1 text-[12px] font-bold tracking-wider text-white"> LV. 4<Sword className="size-3.5" /></span></h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[var(--hw-slate)]">
              I turn complex problems into simple, delightful experiences.
            </p>

            {/* Character stat HUD */}
            <div className="mt-6 max-w-md rounded-2xl border border-white/70 bg-white/60 p-4 shadow-[0_18px_40px_-30px_rgba(32,43,69,0.7)] backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-[var(--hw-navy)]">
                  <Shield className="size-3.5 text-[var(--hw-coral)]" /> CHARACTER STATS
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-[var(--hw-slate)]">
                  CLASS · DESIGNER
                </span>
              </div>
              <div className="space-y-2">
                <StatBar label="HP" value={95} color="var(--hw-coral)" glow="var(--hw-coral-glow)" />
                <StatBar label="MP" value={88} color="var(--hw-rarity-rare)" glow="var(--hw-rare-glow)" />
                <StatBar label="XP" value={72} color="var(--hw-rarity-legendary)" glow="var(--hw-legendary-glow)" />
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenProject(bridgly)}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--hw-coral)] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(236,106,78,0.9)] transition hover:brightness-105"
              >
                View My Work <ArrowRight className="size-4" />
              </button>
              <button
                onClick={() => {
                  window.location.href = `mailto:${CONTACT_EMAIL}`;
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--hw-border-btn)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--hw-navy)] transition hover:bg-[var(--hw-cream-2)]"
              >
                Get in Touch <Mail className="size-4" />
              </button>
            </div>
          </motion.div>
          </motion.div>

          <motion.div
            style={{ y: heroFiguresY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-[420px] md:h-[560px]"
          >
            <div className="absolute left-1/2 top-1/2 h-full w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2">

              {/* Floating figures — rendered first so badges paint above */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Paintbrush wand held by Henry */}
                <motion.div
                  className="absolute"
                  style={{ left: "57%", top: "22%" }}
                  animate={{ rotate: [-6, 2, -6] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 28 90" className="w-7 drop-shadow-lg" fill="none">
                    <rect x="10" y="22" width="8" height="58" rx="4" fill="var(--hw-cream-2)" stroke="var(--hw-border-btn)" strokeWidth="1"/>
                    <rect x="8" y="20" width="12" height="5" rx="2.5" fill="var(--hw-slate)"/>
                    <ellipse cx="14" cy="12" rx="7" ry="10" fill="var(--hw-coral)"/>
                    <ellipse cx="14" cy="10" rx="5" ry="7" fill="var(--hw-coral-soft)"/>
                    <circle cx="14" cy="4" r="4" fill="white" opacity="0.9"/>
                    <circle cx="14" cy="4" r="6" fill="var(--hw-rarity-legendary)" opacity="0.4"/>
                  </svg>
                </motion.div>
                {/* Henry — larger, no island base */}
                <img
                  src={ART.henry}
                  alt="Henry Wu character"
                  className="absolute bottom-[8%] left-[42%] h-[82%] -translate-x-1/2 object-contain drop-shadow-2xl"
                />
                {/* Hamster companion — larger */}
                <img
                  src={ART.hamster}
                  alt="Hamster companion"
                  className="absolute bottom-[6%] right-[4%] h-[36%] object-contain drop-shadow-xl"
                />
              </motion.div>

              {/* Spell sparkle particles — above figures */}
              {BRUSH_SPARKS.map((sp) => (
                <motion.span
                  key={sp.id}
                  className="absolute z-10 rounded-full"
                  style={{
                    left: sp.x,
                    top: sp.y,
                    width: sp.size,
                    height: sp.size,
                    background: sp.color,
                    boxShadow: `0 0 6px ${sp.color}`,
                  }}
                  animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: sp.duration,
                    delay: sp.delay,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Tool spell badges — topmost layer, never occluded */}
              {TOOL_SPELLS.map((spell) => (
                <motion.div
                  key={spell.label}
                  className="absolute z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold text-white"
                  style={{
                    left: spell.x,
                    top: spell.y,
                    background: spell.color,
                    boxShadow: `0 4px 18px ${spell.color}70, 0 0 0 2px ${spell.color}40`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [spell.rot, -spell.rot, spell.rot],
                    opacity: [0.88, 1, 0.88],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: spell.duration,
                    ease: "easeInOut",
                    delay: spell.delay,
                  }}
                >
                  <span aria-hidden className="text-[13px]">{spell.emoji}</span>
                  {spell.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll-down indicator */}
        <div className="mt-8 flex flex-col items-center gap-2 text-[var(--hw-slate)]">
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="grid place-items-center rounded-full border border-white/70 bg-white/60 p-2 text-[var(--hw-coral)] shadow-[0_8px_20px_-12px_rgba(32,43,69,0.6)] backdrop-blur-md"
          >
            <Mouse className="size-5" />
          </motion.span>
          <span className="text-[11px] font-semibold tracking-[0.2em]">
            SCROLL TO EXPLORE
          </span>
        </div>

        {/* Featured project */}
        <div className="mt-10 rounded-3xl border border-white/70 bg-white/70 backdrop-blur-md p-5 shadow-[0_20px_50px_-40px_rgba(32,43,69,0.6)] md:p-6">
          <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] text-[var(--hw-coral)]">
            <Star className="size-3.5 fill-[var(--hw-coral)]" /> FEATURED QUEST · BOSS BATTLE
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={ART.bridglyIcon2}
                  alt="Bridgly icon"
                  className="size-12 rounded-xl object-contain"
                />
                <h3 className="text-[26px] text-[var(--hw-navy)]">Bridgly</h3>
              </div>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[var(--hw-slate)]">
                A long-distance relationship app that helps couples stay
                connected and feel closer.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {bridgly.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <button
                onClick={() => onOpenProject(bridgly)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--hw-coral)] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:brightness-105"
              >
                View Case Study <ArrowRight className="size-4" />
              </button>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--hw-rose-from)] to-[var(--hw-rose-to)] p-3">
              <img
                src={ART.bridglyScene2}
                alt="Bridgly – couple connected across floating islands"
                className="h-48 w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="mx-auto mt-14 max-w-6xl px-5 scroll-mt-20">
        <GameHeading
          eyebrow="CHOOSE YOUR ADVENTURE"
          title="Quest Log"
          icon={<ScrollText className="size-5" />}
        />
        <div ref={questRef} className="mt-4 space-y-3">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -40 }}
              animate={questInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.18, ease: "easeOut" }}
            >
              <ProjectRow project={p} onOpen={onOpenProject} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto mt-14 max-w-6xl px-5">
        <GameHeading
          eyebrow="ABILITIES UNLOCKED"
          title="Skill Tree"
          icon={<Zap className="size-5" />}
        />
        <div ref={skillRef} className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {SKILLS.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Star;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -30 }}
                animate={skillInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/70 bg-white/70 backdrop-blur-md px-3 py-5 text-center"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-[var(--hw-peach)] text-[var(--hw-coral)]">
                  <Icon className="size-5" />
                </span>
                <span className="text-[12px] font-medium text-[var(--hw-navy)]">
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto mt-14 max-w-6xl px-5 pb-20 scroll-mt-20">
        <GameHeading
          eyebrow="PLAYER PROFILE"
          title="Character Sheet"
          icon={<Shield className="size-5" />}
        />
        <motion.div
          ref={profileRef}
          initial={{ opacity: 0, y: 24 }}
          animate={profileInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="mt-4 grid gap-6 rounded-3xl border border-white/70 bg-white/70 backdrop-blur-md p-6 md:grid-cols-[220px_1fr]"
        >
          <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--hw-cream-2)] to-[var(--hw-peach)] p-2">
            <img
              src={ART.aboutHenry}
              alt="Henry Wu working at his desk"
              className="h-44 w-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-[22px] text-[var(--hw-navy)]">
              Designer. Problem Solver. Adventurer.
            </h3>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[var(--hw-slate)]">
              I'm Henry Wu, a UI/UX designer based in Toronto, Canada. I design
              meaningful experiences with empathy and curiosity.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Fact icon={MapPin} label="Location" value="Toronto, Canada" />
              <Fact icon={Target} label="Focus" value="UI/UX Design, Web Design" />
              <Fact
                icon={Wrench}
                label="Tools"
                value="Figma, Framer, FigJam, Maze, Notion"
              />
            </div>
          </div>
        </motion.div>
      </section>
      </div>
    </div>
  );
}

const TOOL_SPELLS = [
  { label: "Figma",   emoji: "🎨", color: "#a259ff", x: "66%", y: "8%",  duration: 3.4, delay: 0,    rot: 3 },
  { label: "Framer",  emoji: "⚡", color: "#0055ff", x: "78%", y: "22%", duration: 3.9, delay: 0.6,  rot: 2 },
  { label: "Notion",  emoji: "📝", color: "#374151", x: "70%", y: "38%", duration: 4.2, delay: 1.1,  rot: 4 },
  { label: "FigJam",  emoji: "✏️", color: "#ec6a4e", x: "55%", y: "4%",  duration: 3.7, delay: 0.3,  rot: 2 },
  { label: "Maze",    emoji: "🧩", color: "#ff4f00", x: "82%", y: "44%", duration: 3.6, delay: 1.7,  rot: 3 },
  { label: "Lottie",  emoji: "✨", color: "#00c8c8", x: "76%", y: "58%", duration: 4.0, delay: 0.9,  rot: 2 },
];

const BRUSH_SPARKS = [
  { id: 1, x: "58%", y: "19%", size: "6px", color: "var(--hw-rarity-legendary)", duration: 1.2, delay: 0 },
  { id: 2, x: "61%", y: "16%", size: "4px", color: "var(--hw-coral-soft)",        duration: 1.5, delay: 0.3 },
  { id: 3, x: "55%", y: "18%", size: "5px", color: "var(--hw-rarity-epic)",       duration: 1.3, delay: 0.6 },
  { id: 4, x: "63%", y: "21%", size: "4px", color: "var(--hw-sun-light)",         duration: 1.6, delay: 0.9 },
  { id: 5, x: "57%", y: "14%", size: "5px", color: "var(--hw-rarity-rare)",       duration: 1.4, delay: 0.2 },
  { id: 6, x: "60%", y: "12%", size: "6px", color: "var(--hw-coral)",             duration: 1.7, delay: 0.5 },
];

const SPARKLES = [
  { id: 1, left: "12%", top: "22%", size: 10, color: "rgba(255,255,255,0.9)", duration: 5, delay: 0 },
  { id: 2, left: "28%", top: "40%", size: 7, color: "rgba(255,214,150,0.9)", duration: 6, delay: 1 },
  { id: 3, left: "62%", top: "18%", size: 8, color: "rgba(255,255,255,0.85)", duration: 5.5, delay: 0.5 },
  { id: 4, left: "78%", top: "44%", size: 6, color: "rgba(255,171,145,0.9)", duration: 7, delay: 2 },
  { id: 5, left: "48%", top: "60%", size: 9, color: "rgba(255,255,255,0.8)", duration: 6.5, delay: 1.5 },
  { id: 6, left: "88%", top: "62%", size: 7, color: "rgba(255,214,150,0.85)", duration: 5.8, delay: 0.8 },
  { id: 7, left: "20%", top: "72%", size: 8, color: "rgba(255,255,255,0.85)", duration: 6.2, delay: 2.4 },
  { id: 8, left: "70%", top: "80%", size: 6, color: "rgba(255,171,145,0.8)", duration: 7.2, delay: 1.2 },
];

const PARTICLES = [
  { id: 1, left: "8%", size: 5, rise: 520, duration: 9, delay: 0 },
  { id: 2, left: "18%", size: 4, rise: 460, duration: 11, delay: 2 },
  { id: 3, left: "30%", size: 6, rise: 560, duration: 10, delay: 1 },
  { id: 4, left: "44%", size: 4, rise: 500, duration: 12, delay: 3 },
  { id: 5, left: "56%", size: 5, rise: 540, duration: 9.5, delay: 0.5 },
  { id: 6, left: "68%", size: 4, rise: 480, duration: 11.5, delay: 2.5 },
  { id: 7, left: "80%", size: 6, rise: 560, duration: 10.5, delay: 1.5 },
  { id: 8, left: "92%", size: 4, rise: 500, duration: 12.5, delay: 3.5 },
];

function Bird({
  className = "",
  delay = 0,
  duration = 24,
  scale = 1,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ x: "-15vw" }}
      animate={{ x: "115vw", y: [0, -14, 0] }}
      transition={{
        x: { repeat: Infinity, duration, ease: "linear", delay },
        y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
      }}
      style={{ scale }}
    >
      <svg viewBox="0 0 40 20" className="w-10 opacity-70">
        <path
          d="M2 12 Q10 2 20 11 Q30 2 38 12"
          fill="none"
          stroke="var(--hw-slate)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

function Cloud({
  className = "",
  duration = 28,
}: {
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{ x: [0, 24, 0] }}
      transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
      className={`absolute ${className}`}
    >
      <svg viewBox="0 0 200 90" className="w-full drop-shadow-sm">
        <g fill="#ffffff">
          <ellipse cx="60" cy="55" rx="45" ry="30" />
          <ellipse cx="105" cy="45" rx="42" ry="34" />
          <ellipse cx="145" cy="58" rx="38" ry="26" />
          <rect x="50" y="60" width="110" height="24" rx="12" />
        </g>
      </svg>
    </motion.div>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[var(--hw-cream-2)] p-3">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-[var(--hw-slate)]">
        <Icon className="size-3.5 text-[var(--hw-coral)]" /> {label}
      </p>
      <p className="mt-1 text-[13px] font-medium text-[var(--hw-navy)]">{value}</p>
    </div>
  );
}

/* ---------- MMORPG game-UI helpers ---------- */

function StatBar({
  label,
  value,
  color,
  glow,
}: {
  label: string;
  value: number;
  color: string;
  glow: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-[10px] font-bold tracking-wider text-[var(--hw-slate)]">
        {label}
      </span>
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-black/10 ring-1 ring-white/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${glow}` }}
        />
      </div>
      <span className="w-9 text-right text-[10px] font-semibold tabular-nums text-[var(--hw-navy)]">
        {value}
      </span>
    </div>
  );
}

function GameHeading({
  eyebrow,
  title,
  icon,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl border border-white/70 bg-white/70 text-[var(--hw-coral)] shadow-[0_0_16px_-4px_rgba(236,106,78,0.6)] backdrop-blur-md">
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-bold tracking-[0.28em] text-[var(--hw-coral)]">
          {eyebrow}
        </p>
        <h3 className="text-[20px] leading-none text-[var(--hw-navy)]">{title}</h3>
      </div>
    </div>
  );
}

const RARITY: Record<string, { label: string; color: string }> = {
  bridgly: { label: "LEGENDARY", color: "var(--hw-rarity-legendary)" },
  greenpath: { label: "EPIC", color: "var(--hw-rarity-epic)" },
  studyflow: { label: "RARE", color: "var(--hw-rarity-rare)" },
};
