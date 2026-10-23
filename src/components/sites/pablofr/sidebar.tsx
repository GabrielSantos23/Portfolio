"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "./data";
import type { SearchItem } from "./content";
import { SearchBox } from "./search-box";

const avatar = "/sites/pablofr/profile-pic-small.webp";

function ActivePill({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute inset-0 -z-10 bg-tone-300 ${className}`} />;
}

export function Sidebar({ searchItems }: { searchItems: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <aside className="w-full shrink-0 px-4 pb-6 md:sticky md:top-0 md:w-40 md:self-start md:px-8 md:pt-10 md:pb-8 md:pl-0 lg:justify-self-end lg:px-0">
      <div className="mb-8 hidden min-h-[44px] md:block" aria-hidden="true" />
      <nav className="flex flex-col pt-4 md:h-full md:gap-6 md:pt-0">
        <div className="flex items-center gap-3 md:hidden">
          <Link aria-label="Início" className="shrink-0 rounded-full focus-ring" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="block size-11 shrink-0 rounded-full object-cover outline-subtle" src={avatar} alt="Foto de perfil de Pablo Fernandez" />
          </Link>
          <div className="min-w-0 flex-1">
            <SearchBox items={searchItems} compact />
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative ml-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full text-tone-1100 interactive pressable hover:bg-tone-300 hover:text-tone-1200 focus-ring"
            aria-label={open ? "Fechar navegação" : "Abrir navegação"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true" className={`absolute h-0.5 w-4 rounded-[2px] bg-current transition-transform duration-200 ease-out ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span aria-hidden="true" className={`absolute h-0.5 w-4 rounded-[2px] bg-current transition-transform duration-200 ease-out ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`-mx-3 grid overflow-hidden px-3 transition-[grid-template-rows,opacity,margin] duration-200 ease-out md:hidden ${open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          inert={!open}
        >
          <div className="min-h-0">
            <div className="border-t border-tone-300 pt-2 pb-4">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target={item.newTab ? "_blank" : undefined}
                      data-active={isActive(item.href)}
                      className="relative isolate -mx-3 flex h-12 items-center gap-2 rounded-[12px] px-3 text-xl font-medium text-tone-1200 focus-ring"
                    >
                      {isActive(item.href) && <ActivePill className="rounded-[12px]" />}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b border-tone-300" />
          </div>
        </div>

        <div className="hidden md:block">
          <Link aria-label="Início" className="mb-3 block w-fit rounded-full focus-ring" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="block size-11 rounded-full object-cover outline-subtle" src={avatar} alt="Foto de perfil de Pablo Fernandez" />
          </Link>
          <Link className="block w-fit rounded-[4px] text-base/[22px] font-medium text-tone-1200 focus-ring" href="/">
            pablofr.com
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target={item.newTab ? "_blank" : undefined}
                  data-active={isActive(item.href)}
                  className="relative isolate -mx-3 flex h-8 w-fit items-center gap-2 rounded-full px-3 text-sm font-medium text-tone-900 transition-colors duration-200 ease-out hover:text-tone-1200 focus-ring data-[active=true]:text-tone-1200"
                >
                  {isActive(item.href) && <ActivePill className="rounded-full" />}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
