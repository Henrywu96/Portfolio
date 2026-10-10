import { useState, useEffect } from "react";
import { MotionConfig } from "motion/react";
import { HomePage } from "./components/HomePage";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { MMORPGIntro } from "./components/MMORPGIntro";
import { PROJECTS, type Project, type CaseTab } from "./data";

type Route = "home" | "case-study";

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [caseTab, setCaseTab] = useState<CaseTab>("Overview");
  const [selected, setSelected] = useState<Project>(PROJECTS[0]);
  const [introPlayed, setIntroPlayed] = useState(() => {
    let prefersReducedMotion = false;
    let playedThisSession = false;

    try {
      prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    } catch {
      prefersReducedMotion = false;
    }

    try {
      playedThisSession = sessionStorage.getItem("hw-intro-played") === "1";
    } catch {
      playedThisSession = false;
    }

    return prefersReducedMotion || playedThisSession;
  });

  useEffect(() => {
    document.title = "Henry Wu — UI/UX Designer Portfolio";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="7" fill="#202b45"/>
      <path d="M7 6 L25 6 L25 19 Q24.5 24.5 16 28 Q7.5 24.5 7 19 Z" fill="#ec6a4e"/>
      <rect x="10" y="10" width="3" height="13" fill="white"/>
      <rect x="19" y="10" width="3" height="13" fill="white"/>
      <rect x="10" y="16" width="12" height="3" fill="white"/>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("link"), {
      rel: "icon",
      type: "image/svg+xml",
      href: url,
    });
    document.head.appendChild(link);
    return () => {
      URL.revokeObjectURL(url);
      link.remove();
    };
  }, []);

  const goHomeToWork = () => {
    setRoute("home");
    setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ block: "start" });
    }, 0);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const project = PROJECTS.find(
        (p) =>
          p.id === event.state?.id &&
          event.state?.hwRoute === "case-study" &&
          p.hasCaseStudy,
      );

      if (project) {
        setSelected(project);
        setCaseTab("Overview");
        setRoute("case-study");
        window.scrollTo(0, 0);
      } else {
        goHomeToWork();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openProject = (p: Project, replace = false) => {
    if (!p.hasCaseStudy) return;

    setSelected(p);
    setCaseTab("Overview");
    setRoute("case-study");
    window.scrollTo(0, 0);

    try {
      const state = { hwRoute: "case-study", id: p.id };
      if (replace) {
        window.history.replaceState(state, "");
      } else {
        window.history.pushState(state, "");
      }
    } catch {
      // History access can fail in sandboxed iframes.
    }
  };

  const handleIntroDone = () => {
    try {
      sessionStorage.setItem("hw-intro-played", "1");
    } catch {
      // Session storage can fail in sandboxed iframes.
    }
    setIntroPlayed(true);
  };

  const handleCaseStudyBack = () => {
    try {
      if (window.history.state?.hwRoute === "case-study") {
        window.history.back();
      } else {
        goHomeToWork();
      }
    } catch {
      goHomeToWork();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="size-full">
        {!introPlayed && <MMORPGIntro onDone={handleIntroDone} />}
        {route === "home" && (
          <HomePage
            onOpenProject={openProject}
            onLogo={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        )}
        {route === "case-study" && (
          <CaseStudyPage
            key={selected.id}
            project={selected}
            initialTab={caseTab}
            onBack={handleCaseStudyBack}
            onNextProject={(p) => openProject(p, true)}
          />
        )}
      </div>
    </MotionConfig>
  );
}
