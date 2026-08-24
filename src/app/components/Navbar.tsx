import { Mail, Download, Menu } from "lucide-react";
import { ART, CONTACT_EMAIL } from "../assets";

const NAV: { label: string; target: string }[] = [
  { label: "Home", target: "home" },
  { label: "Work", target: "work" },
  { label: "About", target: "about" },
  { label: "Resume", target: "resume" },
  { label: "Contact", target: "contact" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = ART.resumePdf;
  a.download = "Henry-Wu-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function getInTouch() {
  window.location.href = `mailto:${CONTACT_EMAIL}`;
}

export function Navbar({
  onLogoClick,
  active = "Home",
}: {
  onLogoClick?: () => void;
  active?: string;
}) {
  const handleNav = (item: { label: string; target: string }) => {
    if (item.label === "Resume") {
      downloadResume();
    } else if (item.label === "Contact") {
      getInTouch();
    } else {
      scrollToSection(item.target);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-3 text-left"
        >
          <img
            src={ART.shield}
            alt="Henry Wu crest"
            className="size-10 object-contain drop-shadow-sm"
          />
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-wide text-[var(--hw-navy)]">
              HENRY WU
            </span>
            <span className="block text-[11px] tracking-[0.18em] text-[var(--hw-slate)]">
              UI/UX DESIGNER
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="group relative text-[14px] text-[var(--hw-slate)] transition-colors hover:text-[var(--hw-coral)]"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[var(--hw-coral)] transition-transform duration-200 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={getInTouch}
            aria-label="Get in touch"
            title="Get in touch"
            className="grid size-9 place-items-center rounded-lg border border-[var(--hw-border)] bg-white text-[var(--hw-slate)] transition hover:text-[var(--hw-coral)]"
          >
            <Mail className="size-4" />
          </button>
          <button
            onClick={downloadResume}
            aria-label="Download resume"
            title="Download resume"
            className="grid size-9 place-items-center rounded-lg border border-[var(--hw-border)] bg-white text-[var(--hw-slate)] transition hover:text-[var(--hw-coral)]"
          >
            <Download className="size-4" />
          </button>
          <button
            aria-label="Open menu"
            className="grid size-9 place-items-center rounded-lg border border-[var(--hw-border)] bg-white text-[var(--hw-slate)] md:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
