import type { CaseStudy } from "../data";

export function FinalDesign({
  finalDesign,
}: {
  finalDesign: NonNullable<CaseStudy["finalDesign"]>;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--hw-coral)]">
        FINAL DESIGN
      </p>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[var(--hw-slate)]">
        {finalDesign.intro}
      </p>
      {finalDesign.prototype && (
        <div className="mt-8 grid items-center gap-6 overflow-hidden rounded-3xl border border-[var(--hw-border)] bg-[#FFF0ED] p-5 sm:p-8 md:grid-cols-[minmax(0,300px)_1fr]">
          <video
            className="mx-auto block w-full max-w-[300px] rounded-[28px]"
            src={finalDesign.prototype.video}
            poster={finalDesign.prototype.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={finalDesign.prototype.caption}
          />
          <div>
            <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--hw-coral)]">
              PROTOTYPE
            </p>
            <h3 className="mt-2 text-[22px] leading-tight text-[var(--hw-navy)]">
              Tap through the V2 screens
            </h3>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[var(--hw-slate)]">
              {finalDesign.prototype.caption} The clickable version runs in
              Figma: start at onboarding, open Chat from the partner card and
              switch tabs.
            </p>
            <a
              href={finalDesign.prototype.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--hw-coral)] px-5 py-3 text-[14px] font-semibold text-white transition hover:brightness-105"
            >
              Open the prototype in Figma ↗
            </a>
          </div>
        </div>
      )}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {finalDesign.images.map((image) => (
          <figure key={image.caption} className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-[var(--hw-border)] bg-white">
              <img
                src={image.src}
                alt={image.caption}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-[14px] font-medium leading-snug text-[var(--hw-navy)]">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      {finalDesign.interactionDetails &&
        finalDesign.interactionDetails.length > 0 && (
          <>
            <h3 className="mt-12 text-[16px] font-semibold text-[var(--hw-navy)]">
              Interaction details
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {finalDesign.interactionDetails.map((image) => (
                <figure key={image.caption} className="min-w-0">
                  <div className="overflow-hidden rounded-2xl border border-[var(--hw-border)] bg-white">
                    <img
                      src={image.src}
                      alt={image.caption}
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 text-[14px] font-medium leading-snug text-[var(--hw-navy)]">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
      {finalDesign.styleGuide && (
        <div className="mt-14">
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--hw-coral)]">
            STYLE GUIDE
          </p>
          <h3 className="mt-2 text-[22px] leading-tight text-[var(--hw-navy)]">
            A visual system with clear roles
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {finalDesign.styleGuide.colors.map((c) => (
              <div key={c.hex} className="min-w-0">
                <div
                  className="h-20 rounded-2xl border border-[var(--hw-border)]"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="mt-2 text-[14px] font-semibold text-[var(--hw-navy)]">
                  {c.name}
                </p>
                <p className="text-[12px] text-[var(--hw-slate)]">{c.hex}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-[var(--hw-slate)]">
                  {c.role}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-5 rounded-2xl border border-[var(--hw-border)] bg-white p-5">
              <span
                className="text-[44px] leading-none text-[#2B2D42]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 800 }}
              >
                Aa
              </span>
              <p className="text-[13px] leading-relaxed text-[var(--hw-slate)]">
                {finalDesign.styleGuide.type}
              </p>
            </div>
            <ul className="space-y-2 rounded-2xl border border-[var(--hw-border)] bg-white p-5">
              {finalDesign.styleGuide.rules.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--hw-navy)]"
                >
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[var(--hw-coral)]" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div aria-hidden className="h-24 sm:h-32" />
    </div>
  );
}
