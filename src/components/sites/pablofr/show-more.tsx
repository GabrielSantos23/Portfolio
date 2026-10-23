"use client";

import { useState, type ReactNode } from "react";

// Shows the first `limit` children and a "Ver mais" toggle for the rest.
export function ShowMore({ children, limit }: { children: ReactNode[]; limit: number }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = children.length - limit;
  return (
    <>
      <div className="flex flex-col gap-2">{expanded ? children : children.slice(0, limit)}</div>
      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 inline-flex h-7 select-none items-center rounded-full px-2.5 text-sm font-medium text-tone-1000 interactive pressable hover:bg-tone-300 hover:text-tone-1200 focus-ring"
        >
          {expanded ? "Ver menos" : `Ver mais (+${hidden})`}
        </button>
      )}
    </>
  );
}
