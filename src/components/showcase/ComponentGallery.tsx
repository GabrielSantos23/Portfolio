"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type Item = { slug: string; title: string; description: string };

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/**
 * Filter box + count over server-rendered cards (one child per item, same order).
 * The query lives in ?q= so a filtered view can be shared or refreshed.
 */
export function ComponentGallery({ items, children }: { items: Item[]; children: ReactNode[] }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q") ?? "";
    // Sync from the URL once after mount; the server can't see ?q= on this static page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial) setQuery(initial);
  }, []);

  const update = (value: string) => {
    setQuery(value);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  };

  const q = normalize(query.trim());
  const matches = items.map((item) => !q || normalize(`${item.title} ${item.description}`).includes(q));
  const count = matches.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-tone-1000" />
          <input
            type="search"
            value={query}
            onChange={(e) => update(e.target.value)}
            placeholder="Filtrar componentes"
            aria-label="Filtrar componentes"
            autoComplete="off"
            className="h-10 w-full rounded-full bg-surface pr-10 pl-9 text-base text-tone-1200 shadow-lift outline-none transition-[box-shadow] duration-200 ease-out placeholder:text-tone-900 hover:shadow-lift-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tone-1100 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => update("")}
              aria-label="Limpar filtro"
              className="absolute top-1/2 right-0.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-tone-1000 interactive hover:bg-tone-300 hover:text-tone-1200 focus-ring"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
        <p className="shrink-0 text-sm text-tone-1000 tabular-nums" aria-live="polite">
          {count} {count === 1 ? "componente" : "componentes"}
        </p>
      </div>

      {count > 0 ? (
        <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          {children.map((card, i) => (
            <li key={items[i].slug} hidden={!matches[i]}>
              {card}
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-card border border-dashed border-tone-500 px-4 py-10 text-center">
          <p className="font-medium text-tone-1200">Nenhum componente encontrado para “{query.trim()}”.</p>
          <button type="button" onClick={() => update("")} className="mt-2 rounded-[4px] text-sm font-medium text-tone-1000 underline underline-offset-[3px] hover:text-tone-1200 focus-ring">
            Limpar filtro
          </button>
        </div>
      )}
    </div>
  );
}
