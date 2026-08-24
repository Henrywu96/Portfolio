import { useState } from "react";
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

  const openProject = (p: Project) => {
    if (p.hasCaseStudy) {
      setSelected(p);
      setCaseTab("Overview");
      setRoute("preview");
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
