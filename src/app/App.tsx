import { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { ProjectPreview } from "./components/ProjectPreview";
import { CaseStudyTransition } from "./components/CaseStudyTransition";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { JourneyPage } from "./components/JourneyPage";
import { MMORPGIntro } from "./components/MMORPGIntro";
import { PROJECTS, type Project, type CaseTab } from "./data";

type Route = "home" | "preview" | "transition" | "case-study" | "journey";

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [caseTab, setCaseTab] = useState<CaseTab>("Overview");
  const [selected, setSelected] = useState<Project>(PROJECTS[0]);
  const [introPlayed, setIntroPlayed] = useState(false);

  useEffect(() => {
    document.title = "Henry's Portfolio";
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

  const openProject = (p: Project) => {
    if (p.hasCaseStudy) {
      setSelected(p);
      setCaseTab("Overview");
      setRoute("case-study");
      window.scrollTo(0, 0);
    }
  };

  const go = (r: Route) => {
    setRoute(r);
    window.scrollTo(0, 0);
  };

  return (
    <div className="size-full">
      {!introPlayed && <MMORPGIntro onDone={() => setIntroPlayed(true)} />}
      {route === "home" && (
        <HomePage onOpenProject={openProject} onLogo={() => go("home")} />
      )}
      {route === "preview" && (
        <ProjectPreview
          project={selected}
          onBack={() => go("home")}
          onViewCaseStudy={() => go("transition")}
        />
      )}
      {route === "transition" && (
        <CaseStudyTransition
          project={selected}
          onDone={() => {
            setCaseTab("Overview");
            go("case-study");
          }}
        />
      )}
      {route === "case-study" && (
        <CaseStudyPage
          project={selected}
          initialTab={caseTab}
          onBack={() => go("home")}
          onViewPrototype={() => go("journey")}
        />
      )}
      {route === "journey" && (
        <JourneyPage
          onBack={() => go("case-study")}
          onExplore={() => {
            setCaseTab("Overview");
            go("case-study");
          }}
        />
      )}
    </div>
  );
}
