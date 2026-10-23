"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import type { SiteText } from "./content";
import { GithubIcon, LinkedInIcon, MailIcon, RssIcon } from "./icons";

const footerLink =
  "inline-flex items-center gap-1.5 rounded-[4px] text-sm font-medium text-tone-900 transition-colors duration-200 ease-out hover:text-tone-1200 focus-ring";
const mutedLink = "rounded-[4px] transition-colors duration-200 ease-out hover:text-tone-1200 focus-ring";

const linkIcons: Record<SiteText["links"][number]["icon"], ReactNode> = {
  none: null,
  github: <GithubIcon />,
  mail: <MailIcon />,
  linkedin: <LinkedInIcon />,
  rss: <RssIcon />,
};

function Newsletter({ text }: { text: SiteText }) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="mb-3 font-medium text-tone-1200">{text.newsletterTitle}</h3>
      <p className="text-tone-1100">{text.newsletterText}</p>
      {/* shortcut: the source posts to its private newsletter API; this clone only validates the address. */}
      <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="newsletter-email" className="sr-only">
          Inscreva-se na newsletter
        </label>
        <div className="flex h-14 w-full items-stretch rounded-full bg-surface shadow-lift transition-shadow duration-200 ease-out has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-tone-1100 has-[input:user-invalid]:shadow-[0_0_0_1px_var(--color-red-500)]">
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder={text.emailPlaceholder}
            autoComplete="email"
            className="min-w-0 flex-1 rounded-l-full bg-transparent pl-5 text-base leading-none text-ellipsis text-tone-1200 outline-none placeholder:text-tone-1100"
          />
          <div className="shrink-0 p-1">
            <button
              type="submit"
              className="relative grid h-12 min-w-28 place-items-center rounded-full bg-tone-1200 px-4 text-base font-medium text-tone-100 interactive pressable will-change-transform focus-ring"
            >
              {/* Hidden success label reserves the button's width, as on the source. */}
              <span aria-hidden="true" className="invisible col-start-1 row-start-1 flex items-center gap-1.5">
                <svg className="size-4" viewBox="0 0 24 24" />
                Inscrito
              </span>
              <span className="col-start-1 row-start-1">{text.subscribeLabel}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

type Theme = "light" | "dark" | "system";

const noopSubscribe = () => () => {};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // next-themes only knows the saved choice after mount; render "system" until then so hydration matches.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const current = (mounted ? theme : "system") as Theme;
  const choose = (t: Theme) => setTheme(t);

  const options = [
    { value: "light" as const, label: "Claro", Icon: Sun },
    { value: "dark" as const, label: "Escuro", Icon: Moon },
    { value: "system" as const, label: "Sistema", Icon: Monitor },
  ];

  return (
    <div className="flex w-fit items-center gap-0.5 rounded-full bg-surface p-0.5 shadow-lift" role="radiogroup" aria-label="Tema">
      {options.map(({ value, label, Icon }, i) => {
        const checked = current === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={label}
            title={label}
            tabIndex={checked ? 0 : -1}
            onClick={() => choose(value)}
            onKeyDown={(e) => {
              const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
              if (!step) return;
              e.preventDefault();
              const next = options[(i + step + options.length) % options.length];
              choose(next.value);
              (e.currentTarget.parentElement?.children[options.indexOf(next)] as HTMLElement | undefined)?.focus();
            }}
            className={`relative isolate inline-flex size-7 items-center justify-center rounded-full transition-colors duration-150 ease-out pressable focus-ring ${checked ? "text-tone-1200" : "text-tone-800 hover:text-tone-1200"}`}
          >
            {checked && <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-tone-300" />}
            <Icon aria-hidden="true" className="size-4" />
          </button>
        );
      })}
    </div>
  );
}

// Offset of a time zone from UTC in minutes at the given instant.
function zoneOffset(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return (Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute")) - Math.floor(date.getTime() / 60000) * 60000) / 60000;
}

function LocalTime({ timeZone }: { timeZone: string }) {
  const [state, setState] = useState<{ time: string; diff: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat("pt-BR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now);
      const hours = Math.round((zoneOffset(now, timeZone) + now.getTimezoneOffset()) / 60);
      const there = new Date(now.getTime() + hours * 3600000);
      const day = hours === 0 || there.getDate() === now.getDate() ? "hoje" : hours > 0 ? "amanhã" : "ontem";
      setState({ time, diff: hours === 0 ? "mesmo horário" : `${day}, ${hours > 0 ? "+" : ""}${hours}h` });
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, [timeZone]);

  if (!state) return <span>00:00</span>;
  return (
    <span>
      {state.time} <span className="text-tone-900">({state.diff})</span>
    </span>
  );
}

export function Footer({ text }: { text: SiteText }) {
  return (
    <footer className="flex flex-col gap-12 border-t border-tone-300 pt-12">
      <Newsletter text={text} />
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {text.links.map((l) => (
            <a key={l.label} href={l.href} className={footerLink} target="_blank" rel="noopener noreferrer">
              {l.icon !== "none" && <span className="flex">{linkIcons[l.icon]}</span>}
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <ThemeToggle />
        </div>
        <div className="flex flex-col gap-1 text-sm text-tone-1000 tabular-nums sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <span>
            © {new Date().getFullYear()}{" "}
            <Link href="/" className={mutedLink}>
              {text.siteName}
            </Link>
          </span>
          <span className="flex flex-wrap items-center gap-x-2">
            <span>
              {text.locationPrefix}{" "}
              <a href={text.locationHref ?? undefined} target="_blank" rel="noopener noreferrer" className={mutedLink}>
                {text.location}
              </a>{" "}
              {text.locationSuffix}
            </span>
            <span aria-hidden="true" className="inline-block size-1 shrink-0 rotate-45 rounded-[1px] bg-tone-800" />
            <LocalTime timeZone={text.timeZone} />
          </span>
        </div>
      </div>
    </footer>
  );
}
