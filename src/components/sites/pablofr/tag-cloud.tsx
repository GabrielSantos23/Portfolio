"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const pill = "inline-flex h-7 shrink-0 select-none items-center rounded-full px-2.5 text-sm font-[450] interactive pressable focus-ring";
const GAP = 8;

// Collapses the tag list to the first row plus a "Show more" toggle, measured like the source does.
export function TagCloud({ tags }: { tags: { label: string; href: string; active: boolean }[] }) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const layer = measureRef.current;
    if (!layer) return;
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const pills = [...layer.querySelectorAll<HTMLElement>("[data-m-pill]")].map((el) => el.offsetWidth);
      const toggle = layer.querySelector<HTMLElement>("[data-m-toggle]")?.offsetWidth ?? 0;
      const width = layer.clientWidth;
      const total = pills.reduce((sum, w, i) => sum + w + (i ? GAP : 0), 0);
      if (total <= width) return setFit(pills.length);
      let used = toggle;
      let n = 0;
      while (n < pills.length && used + GAP + pills[n] <= width) used += GAP + pills[n++];
      setFit(n);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(layer);
    // Pill widths change once the web font loads.
    document.fonts.ready.then(measure);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [tags]);

  const hidden = fit === null ? 0 : tags.length - fit;
  const visible = expanded || fit === null ? tags : tags.slice(0, fit);

  return (
    <div className="relative">
      <div ref={measureRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex flex-wrap items-center gap-2 opacity-0">
        {tags.map((t) => (
          <span key={t.href} data-m-pill="" className={pill}>
            {t.label}
          </span>
        ))}
        <span data-m-toggle="" className={pill}>
          Mostrar mais (+00)
        </span>
      </div>
      <div className={`flex flex-wrap items-center gap-2 py-px ${!expanded ? "max-h-[30px] overflow-hidden" : ""}`}>
        {visible.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`${pill} ${t.active ? "bg-tone-300 text-tone-1200" : "bg-surface text-tone-1100 shadow-lift hover:bg-tone-200 hover:text-tone-1200"}`}
          >
            {t.label}
          </Link>
        ))}
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className={`${pill} font-medium text-tone-1000 hover:bg-tone-300 hover:text-tone-1200`}
          >
            {expanded ? "Mostrar menos" : `Mostrar mais (+${hidden})`}
          </button>
        )}
      </div>
    </div>
  );
}
