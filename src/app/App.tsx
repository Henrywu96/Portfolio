import { useState, useEffect } from "react";
import { MotionConfig } from "motion/react";
import { HomePage } from "./components/HomePage";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { VISIBLE_PROJECTS, type Project, type CaseTab } from "./data";
import { finishPageLoad } from "./pageLoader";

type Route = "home" | "case-study";

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [caseTab, setCaseTab] = useState<CaseTab>("Overview");
  const [selected, setSelected] = useState<Project>(VISIBLE_PROJECTS[0]);
  // the loading screen in index.html opens once the first screen's pictures are in
  useEffect(() => {
    finishPageLoad();
  }, []);

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
      const project = VISIBLE_PROJECTS.find(
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
            onNextProject={
              VISIBLE_PROJECTS.length > 1
                ? (p) => openProject(p, true)
                : undefined
            }
          />
        )}
      </div>
    </MotionConfig>
  );
}
