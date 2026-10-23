"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { SearchItem } from "./content";

const kbdClass =
  "inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] border border-tone-400 bg-tone-200 px-1 font-sans text-[13px] font-medium leading-none text-tone-1000 transition-[background-color,border-color,color] duration-100 ease-out group-hover/kbd:border-tone-500 group-hover/kbd:bg-tone-300 group-hover/kbd:text-tone-1200";

// shortcut: matches titles and excerpts only; the source also searches article bodies.
export function SearchBox({ items, compact = false }: { items: SearchItem[]; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const q = query.trim().toLowerCase();
  const results = q
    ? items.filter((r) => `${r.title} ${r.text}`.toLowerCase().includes(q))
    : [];
  const expanded = open && results.length > 0;

  useEffect(() => {
    if (compact) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [compact]);

  const router = useRouter();
  const go = (href: string) => (href.startsWith("/") ? router.push(href) : window.open(href, "_blank", "noopener,noreferrer"));

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="relative w-full">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-tone-1000"
        />
        <input
          ref={inputRef}
          autoComplete="off"
          placeholder="Buscar..."
          className={`h-11 w-full rounded-full bg-surface pl-10 text-base text-tone-1200 shadow-lift outline-none transition-[box-shadow] duration-200 ease-out placeholder:text-tone-900 hover:shadow-lift-hover [&::-webkit-search-cancel-button]:appearance-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tone-1100 ${compact ? "pr-4" : "pr-4 md:pr-16"}`}
          role="combobox"
          aria-label="Buscar"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={expanded ? `${listId}-${active}` : undefined}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => {
            if (!expanded) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % results.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a - 1 + results.length) % results.length);
            } else if (e.key === "Enter") {
              go(results[active].href);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        {!compact && (
          <div className="absolute top-1/2 right-3 hidden -translate-y-1/2 items-center md:flex">
            <button
              type="button"
              tabIndex={-1}
              aria-label="Focar na busca"
              onClick={() => inputRef.current?.focus()}
              className="group/kbd grid cursor-pointer items-center justify-items-end rounded-[6px] pressable focus-ring"
            >
              <span aria-hidden="true" className={`col-start-1 row-start-1 flex gap-0.5 transition-[opacity,filter] duration-150 ease-out ${query ? "opacity-0 blur-[2px]" : ""}`}>
                <kbd className={kbdClass}>⌘</kbd>
                <kbd className={kbdClass}>K</kbd>
              </span>
            </button>
          </div>
        )}
      </div>
      {expanded && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 flex origin-top flex-col overflow-hidden rounded-card border border-tone-400 bg-surface shadow-[0_1px_2px_#0000000d,0_8px_24px_-8px_#00000014] dark:bg-tone-100">
          <div role="listbox" id={listId} aria-label="Resultados da busca" className="max-h-[350px] overflow-y-auto p-1.5">
            {results.map((r, i) => (
              <div
                key={r.href}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(r.href)}
                onMouseEnter={() => setActive(i)}
                className="flex cursor-pointer select-none items-center gap-3 rounded-[10px] px-2.5 py-2 aria-selected:bg-tone-300"
              >
                <span aria-hidden="true" className="flex size-9 shrink-0 rounded-[8px] bg-page p-[3px] shadow-lift">
                  <span className="flex size-full flex-col items-center justify-center gap-[3px] rounded-[5px] bg-surface text-tone-1000 shadow-lift">
                    <span className="h-[2px] w-3 rounded-full bg-tone-400" />
                    <span className="h-[2px] w-4 rounded-full bg-tone-400" />
                    <span className="h-[2px] w-3.5 rounded-full bg-tone-400" />
                  </span>
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h4 className="truncate text-base/6 font-medium text-tone-1200">{r.title}</h4>
                  <p className="line-clamp-1 text-sm text-tone-1000">{r.text}</p>
                </div>
                <span className="flex h-5 shrink-0 items-center rounded-[6px] bg-surface px-1.5 text-xs font-[450] capitalize text-tone-1100 shadow-lift">
                  {r.kind}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
