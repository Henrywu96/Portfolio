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
      <div aria-hidden className="h-24 sm:h-32" />
    </div>
  );
}
