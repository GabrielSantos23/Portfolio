"use client";

import { useId, useState } from "react";

type Tab = "preview" | "code";

/**
 * Alterna entre o demo e o código de um componente. Os dois painéis ficam
 * montados (o oculto com `hidden`) para o demo não perder o estado.
 */
export function PreviewTabs({ preview, code }: { preview: React.ReactNode; code: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>("preview");
  const id = useId();

  const tabButton = (value: Tab, label: string) => (
    <button
      type="button"
      role="tab"
      id={`${id}-${value}-tab`}
      aria-selected={tab === value}
      aria-controls={`${id}-${value}`}
      onClick={() => setTab(value)}
      className={`flex h-7 items-center rounded-full px-2.5 text-sm font-medium interactive focus-ring ${
        tab === value ? "bg-tone-200 text-tone-1200 shadow-lift" : "text-tone-1100 hover:text-tone-1200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mt-4">
      <div role="tablist" aria-label="Ver demo ou código" className="mb-3 flex w-fit gap-0.5 rounded-full bg-surface px-1 py-[3px] shadow-lift">
        {tabButton("preview", "Prévia")}
        {tabButton("code", "Código")}
      </div>
      <div role="tabpanel" id={`${id}-preview`} aria-labelledby={`${id}-preview-tab`} hidden={tab !== "preview"}>
        {preview}
      </div>
      <div role="tabpanel" id={`${id}-code`} aria-labelledby={`${id}-code-tab`} hidden={tab !== "code"}>
        {code}
      </div>
    </div>
  );
}
