"use client";

import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";

type State = "idle" | "copied" | "failed";

const LABELS: Record<State, string> = { idle: "Copiar", copied: "Copiado", failed: "Falhou" };

/** Clipboard API; sem permissão (HTTP fora de localhost, webviews) cai no execCommand antigo. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;opacity:0";
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    if (!ok) throw new Error("copy failed");
  }
}

/** Copia o texto e confirma no próprio botão; volta ao normal depois de 1,6 s. */
export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 1600);
    return () => clearTimeout(timer);
  }, [state]);

  const Icon = state === "copied" ? Check : state === "failed" ? X : Copy;

  return (
    <button
      type="button"
      onClick={() =>
        copyText(text).then(
          () => setState("copied"),
          () => setState("failed"),
        )
      }
      className="-my-1.5 -mr-1.5 flex items-center gap-1.5 rounded-[5px] px-2 py-1.5 text-[12px] font-medium text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-500 active:scale-[0.97] dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
    >
      <Icon aria-hidden="true" className={`size-3.5 ${state === "copied" ? "text-emerald-600 dark:text-emerald-400" : ""}`} />
      {/* Todos os rótulos na mesma célula: o botão tem sempre a largura do maior e nada ao lado se move. */}
      <span className="grid" aria-live="polite">
        {(Object.keys(LABELS) as State[]).map((key) => (
          <span key={key} aria-hidden={key !== state} className={`col-start-1 row-start-1 ${key === state ? "" : "invisible"}`}>
            {LABELS[key]}
          </span>
        ))}
      </span>
    </button>
  );
}
