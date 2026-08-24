import { useEffect } from "react";
import { motion } from "motion/react";
import { type Project } from "../data";

export function CaseStudyTransition({
  project,
  onDone,
}: {
  project: Project;
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${project.accent}40, ${project.accent}18)`,
      }}
    >
      <motion.img
        src={project.image}
        alt=""
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 0.5 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute h-[70%] w-[80%] object-contain blur-md"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.img
          src={project.iconImage ?? project.image}
          alt=""
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="size-16 rounded-2xl object-contain drop-shadow-xl"
        />
        <p className="mt-6 text-[15px] font-semibold text-[var(--hw-navy)]">
          Entering {project.name} World...
        </p>
        <div className="mt-4 h-1 w-40 overflow-hidden rounded-full bg-white/50">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: project.accent }}
          />
        </div>
      </div>
    </motion.div>
  );
}
