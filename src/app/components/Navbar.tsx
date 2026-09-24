import { ART, CONTACT_EMAIL, LINKEDIN_URL } from "../assets";

const NAV: { label: string; target: string }[] = [
  { label: "Home", target: "home" },
  { label: "Work", target: "work" },
  { label: "About", target: "about" },
  // { label: "Resume", target: "resume" },
  { label: "Contact", target: "contact" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el)
    el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = ART.resumePdf;
  a.download = "Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}


export function Navbar({
  onLogoClick,
  active = "Home",
}: {
  onLogoClick?: () => void;
  active?: string;
}) {
  const handleNav = (item: {
    label: string;
    target: string;
  }) => {
    if (item.label === "Resume") {
      downloadResume();
    } else if (item.label === "Contact") {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
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

        <div className="flex items-center gap-2 mr-2 md:mr-0">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="grid size-9 place-items-center rounded-lg overflow-hidden transition hover:opacity-80"
          >
            <svg viewBox="0 0 36 36" className="size-9" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="6" fill="#0A66C2" />
              <path fill="#fff" d="M13.2 14.4h-3.6V26h3.6V14.4zm-1.8-5.4a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zm12.9 5.1c-1.8 0-3 .9-3.6 1.8v-1.5H16.5V26h3.6v-6.3c0-1.5.3-3 1.95-3 1.65 0 1.65 1.8 1.65 3.15V26H27.5v-6.75c0-3.15-.6-5.1-3.2-5.1z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}