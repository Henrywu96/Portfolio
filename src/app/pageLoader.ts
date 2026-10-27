/*
 * The loading screen lives in index.html, so it is up before the app has even downloaded. Once the app has
 * rendered, this fills its bar as the pictures on the first screen and the fonts arrive, then opens the
 * screen like an iris and removes it. It never waits longer than a few seconds.
 */

const MAX_WAIT = 6000;

export function finishPageLoad() {
  const el = document.getElementById("hw-loader");
  if (!el || el.dataset.state) return;
  el.dataset.state = "tracking";

  const bar = el.querySelector<HTMLElement>("[data-hwl-bar]");
  const pct = el.querySelector<HTMLElement>("[data-hwl-pct]");
  // the first 30% was the app itself downloading; the rest is what the first screen needs
  const show = (f: number) => {
    const v = Math.round(30 + Math.min(1, f) * 70);
    if (bar) {
      bar.style.animation = "none";
      bar.style.width = `${v}%`;
    }
    if (pct) pct.textContent = `${v}%`;
  };

  const waits: Promise<unknown>[] = Array.from(document.images)
    .filter((img) => !img.complete && img.getBoundingClientRect().top < window.innerHeight)
    .map(
      (img) =>
        new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        }),
    );
  if (document.fonts?.ready) waits.push(document.fonts.ready);

  let done = 0;
  show(0);
  waits.forEach((w) => w.then(() => show(++done / waits.length)));

  const reveal = () => {
    if (el.dataset.state === "out") return;
    el.dataset.state = "out";
    show(1);
    el.classList.add("hwl-done");
    window.setTimeout(() => {
      el.classList.add("hwl-out");
      window.setTimeout(() => el.remove(), 900);
    }, 300);
  };
  Promise.all(waits).then(reveal);
  window.setTimeout(reveal, MAX_WAIT);
}
