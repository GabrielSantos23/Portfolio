import type { ReactNode } from "react";
import { getSearchIndex, getSingleton } from "./content";
import { Footer } from "./footer";
import { SearchBox } from "./search-box";
import { Sidebar } from "./sidebar";

// Page frame shared by every pablofr.com route: left nav, centered column, footer, right TOC rail.
export async function SiteShell({ children, toc }: { children: ReactNode; toc?: ReactNode }) {
  const [searchItems, site] = await Promise.all([getSearchIndex(), getSingleton("site")]);
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col md:px-4 lg:max-w-6xl lg:px-0 xl:max-w-7xl">
      <div className="flex flex-1 flex-col md:flex-row lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)_minmax(0,1fr)] lg:gap-8">
        <Sidebar searchItems={searchItems} />
        <main className="flex w-full min-w-0 flex-col px-4 pb-10 md:flex-1 md:px-0 md:pt-10 md:pb-24">
          <div className="flex w-full flex-1 flex-col md:max-w-xl">
            <div className="mb-8 hidden md:block">
              <SearchBox items={searchItems} />
            </div>
            <div className="flex-1">{children}</div>
            <div className="mt-16 sm:mt-24">
              <Footer text={site} />
            </div>
          </div>
        </main>
        <aside className="hidden xl:sticky xl:top-0 xl:block xl:self-start xl:pt-10">
          <div className="mb-8 min-h-[44px]" aria-hidden="true" />
          <div className="mb-12 min-h-8" aria-hidden="true" />
          <div className="w-56">{toc}</div>
        </aside>
      </div>
    </div>
  );
}

// Title + subtitle + intro block used at the top of the section pages.
export function PageIntro({ title, subtitle, children }: { title: ReactNode; subtitle: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="font-[550] text-tone-1200">{title}</h1>
        <p className="text-tone-1100">{subtitle}</p>
      </div>
      <p className="text-base/[26px] text-tone-1100">{children}</p>
    </section>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[16px] border border-tone-400 bg-tone-100 px-4 py-3 text-base/[26px] text-tone-1100 sm:px-5 sm:py-4">
      {children}
    </section>
  );
}

export const inlineLink =
  "inline-flex items-baseline gap-1 rounded-[4px] font-[450] underline underline-offset-[3px] decoration-tone-600 text-tone-1200 hover:decoration-tone-1100 transition-[color,text-decoration-color] duration-200 ease-[ease] focus-ring";
