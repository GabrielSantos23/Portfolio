"use client";

import { Check, ChevronDown, FileText } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const surfaceButton =
  "inline-flex h-9 cursor-pointer select-none items-center text-tone-1200 interactive pressable will-change-transform focus-ring hover:bg-tone-200";
const menuClass =
  "absolute top-full right-0 z-30 mt-2 w-72 origin-top-right rounded-inset border border-tone-400 bg-surface p-1 shadow-[0_1px_2px_#0000000d] transition-[opacity,scale] duration-150 ease-out starting:scale-95 starting:opacity-0";
const itemClass =
  "group flex w-full cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-100 ease-out hover:bg-tone-300 focus-visible:bg-tone-300 focus-visible:outline-none";
const itemIcon = "mt-0.5 size-4 shrink-0 text-tone-1000 group-hover:text-tone-1200 group-focus-visible:text-tone-1200";

function useMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return [open, setOpen, ref] as const;
}

function MenuItem({ href, icon, title, hint, onClick }: { href?: string; icon: ReactNode; title: string; hint: string; onClick?: () => void }) {
  const body = (
    <>
      {icon}
      <span className="flex flex-col">
        <span className="text-sm font-medium text-tone-1200">{title}</span>
        <span className="text-sm text-tone-1000">{hint}</span>
      </span>
    </>
  );
  return href ? (
    <a role="menuitem" href={href} target="_blank" rel="noopener noreferrer" className={itemClass}>
      {body}
    </a>
  ) : (
    <button type="button" role="menuitem" onClick={onClick} className={itemClass}>
      {body}
    </button>
  );
}

const copyIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
    <rect x="5.75" y="5.75" width="7.5" height="7.5" rx="1.75" />
    <path d="M10.25 3.75v-.5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1.5 1.5h.5" />
  </svg>
);

function useCopied() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return { copied, copy };
}

export function PostToolbar({ title, excerpt, url }: { title: string; excerpt: string; url: string }) {
  const [mdOpen, setMdOpen, mdRef] = useMenu();
  const [shareOpen, setShareOpen, shareRef] = useMenu();
  const page = useCopied();
  const link = useCopied();
  const enc = encodeURIComponent;

  return (
    <div className="flex items-center gap-2">
      <div ref={mdRef} className="relative flex items-center">
        <div className="flex items-center rounded-full bg-surface shadow-lift">
          <button
            type="button"
            onClick={() => page.copy(`# ${title}\n\n${excerpt}\n\n${url}`)}
            className={`${surfaceButton} gap-1.5 rounded-l-full pr-2.5 pl-3 text-sm font-medium`}
            aria-label="Copiar página como texto"
            title="Copiar página como texto"
          >
            <span className="grid size-4 place-items-center text-tone-1000">{page.copied ? <Check aria-hidden="true" className="size-4" /> : copyIcon}</span>
            <span className="tabular-nums">{page.copied ? "Copiado" : "Copiar página"}</span>
          </button>
          <span className="h-4 w-px bg-tone-400" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setMdOpen((o) => !o)}
            className={`${surfaceButton} justify-center rounded-r-full pr-2.5 pl-2 text-tone-1000 hover:text-tone-1200`}
            aria-label="Mais opções da página"
            aria-haspopup="menu"
            aria-expanded={mdOpen}
          >
            <ChevronDown aria-hidden="true" className={`size-4 transition-[rotate] duration-200 ease-out ${mdOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        {mdOpen && (
          <div role="menu" className={menuClass}>
            <MenuItem href={`${url}.md`} icon={<FileText aria-hidden="true" className={itemIcon} />} title="Ver como Markdown" hint="Abrir esta página em Markdown" />
          </div>
        )}
      </div>
      <div ref={shareRef} className="relative flex items-center">
        <button
          type="button"
          onClick={() => setShareOpen((o) => !o)}
          className="relative inline-flex size-9 shrink-0 cursor-pointer select-none items-center justify-center rounded-full bg-surface font-medium text-tone-1100 shadow-lift interactive pressable will-change-transform hover:bg-tone-200 hover:text-tone-1200 focus-ring"
          aria-label="Compartilhar este post"
          aria-haspopup="menu"
          aria-expanded={shareOpen}
          title="Compartilhar"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4 overflow-visible">
            <path d="M5.5 7.25H4.75a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h6.5a1 1 0 0 0 1-1v-4.5a1 1 0 0 0-1-1h-.75" />
            <path d="M8 2.25v7.5M5.25 5 8 2.25 10.75 5" />
          </svg>
        </button>
        {shareOpen && (
          <div role="menu" className={menuClass}>
            <MenuItem
              href={`https://x.com/intent/post?text=${enc(title)}&url=${enc(url)}`}
              icon={
                <svg viewBox="0 0 1200 1227" fill="currentColor" className={itemIcon} aria-hidden="true">
                  <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
                </svg>
              }
              title="Compartilhar no X"
              hint="Publique com o título"
            />
            <MenuItem
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className={itemIcon} aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              }
              title="Compartilhar no LinkedIn"
              hint="Compartilhe com sua rede"
            />
            <MenuItem
              href={`mailto:?subject=${enc(title)}&body=${enc(`${excerpt}\n\n${url}`)}`}
              icon={
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={itemIcon}>
                  <rect x="2" y="3.5" width="12" height="9" rx="1.75" />
                  <path d="M2.75 5.25 8 8.75l5.25-3.5" />
                </svg>
              }
              title="Compartilhar por e-mail"
              hint="Envie o link por e-mail"
            />
            <MenuItem
              onClick={() => link.copy(url)}
              icon={
                link.copied ? (
                  <Check aria-hidden="true" className={itemIcon} />
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={itemIcon}>
                    <path d="M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.53.53" />
                    <path d="M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.53-.53" />
                  </svg>
                )
              }
              title={link.copied ? "Copiado" : "Copiar link"}
              hint="Copie o endereço do post"
            />
          </div>
        )}
      </div>
    </div>
  );
}

const EMOJIS = ["❤️", "💻", "🥰", "👍️", "👏", "🔥"];
const DEFAULT_SHOWN = ["❤️", "💻", "🥰"];

// shortcut: reactions are kept in this browser only; the source stores shared counts on its API.
function readReactions(slug: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(`reactions:${slug}`) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
const subscribe = (cb: () => void) => {
  window.addEventListener("reactionschange", cb);
  return () => window.removeEventListener("reactionschange", cb);
};
const EMPTY: string[] = [];

export function Reactions({ slug }: { slug: string }) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(`reactions:${slug}`) ?? "",
    () => "",
  );
  const mine = raw ? readReactions(slug) : EMPTY;
  const [pickerOpen, setPickerOpen, pickerRef] = useMenu();

  const toggle = (emoji: string) => {
    const next = mine.includes(emoji) ? mine.filter((e) => e !== emoji) : [...mine, emoji];
    try {
      localStorage.setItem(`reactions:${slug}`, JSON.stringify(next));
    } catch {}
    window.dispatchEvent(new Event("reactionschange"));
  };
  const shown = [...DEFAULT_SHOWN, ...mine.filter((e) => !DEFAULT_SHOWN.includes(e))];

  return (
    <div className="mt-16 flex flex-wrap items-center gap-2">
      <div ref={pickerRef} className="relative order-first">
        <button
          type="button"
          onClick={() => setPickerOpen((o) => !o)}
          aria-label="Adicionar uma reação"
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          className="group relative inline-flex h-9 shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-tone-1200 pr-4 pl-3 text-sm font-medium text-tone-100 interactive pressable will-change-transform focus-ring"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true" className="-ml-0.5 size-4 transition-[rotate] duration-200 ease-out group-active:rotate-6">
            <path d="M9 1.07A7 7 0 1 0 14.93 7" />
            <path d="M5.5 9.5S6.25 11 8 11s2.5-1.5 2.5-1.5M6 6h0" />
            <circle cx="6" cy="6" r=".25" />
            <path d="M10 6h0" />
            <circle cx="10" cy="6" r=".25" />
            <path d="M11 3h4m-2-2v4" />
          </svg>
          Adicionar reação
        </button>
        {pickerOpen && (
          <div role="dialog" aria-label="Escolha uma reação" className="absolute bottom-full left-0 z-30 mb-2 flex gap-1 rounded-inset border border-tone-400 bg-surface p-1 shadow-[0_1px_2px_#0000000d]">
            {EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                aria-label={`Reagir com ${e}`}
                onClick={() => {
                  toggle(e);
                  setPickerOpen(false);
                }}
                className="grid size-9 place-items-center rounded-lg text-base hover:bg-tone-300 focus-ring"
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>
      {shown.map((e) => {
        const pressed = mine.includes(e);
        const count = pressed ? 1 : 0;
        return (
          <button
            key={e}
            type="button"
            aria-pressed={pressed}
            aria-label={`${count} ${count === 1 ? "reação" : "reações"} com ${e}`}
            onClick={() => toggle(e)}
            className={`group relative inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-medium tabular-nums transition-[color,background-color,box-shadow] duration-200 ease-out focus-ring active:scale-[0.97] ${pressed ? "bg-tone-300 text-tone-1200" : "bg-surface text-tone-1100 shadow-lift hover:bg-tone-200 hover:text-tone-1200"}`}
          >
            <span className="relative text-sm leading-none">{e}</span>
            <span>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

export function GoToBottom({ className, label = false }: { className: string; label?: boolean }) {
  return (
    <button
      type="button"
      aria-label="Ir para o fim"
      title="Ir para o fim"
      onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
      className={className}
    >
      <ChevronDown aria-hidden="true" className={label ? "size-4 text-tone-1000" : "size-5"} />
      {label && "Ir para o fim"}
    </button>
  );
}
