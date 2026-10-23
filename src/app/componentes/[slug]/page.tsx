import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { CodeBlock } from "@/components/showcase/CodeBlock";
import { PreviewTabs } from "@/components/showcase/PreviewTabs";
import { SiteShell } from "@/components/sites/pablofr/shell";
import { sortedShowcase } from "@/showcase/components";
import { getShowcaseSource } from "@/showcase/source";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => sortedShowcase.findIndex((c) => c.slug === slug);

export function generateStaticParams() {
  return sortedShowcase.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = sortedShowcase[find((await params).slug)];
  return c ? { title: `${c.title} | Componentes`, description: c.description } : {};
}

export default async function ComponentPage({ params }: Props) {
  const i = find((await params).slug);
  if (i === -1) notFound();
  const { title, description, demo, Demo } = sortedShowcase[i];
  const files = await getShowcaseSource(demo);
  const prev = sortedShowcase[i - 1];
  const next = sortedShowcase[i + 1];

  return (
    <SiteShell>
      <article>
        <div className="mb-11 flex items-center justify-between gap-2">
          <Link
            href="/componentes"
            aria-label="Voltar para os componentes"
            className="relative inline-flex h-9 shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 rounded-full bg-surface pr-3.5 pl-2 text-sm font-medium text-tone-1200 shadow-lift interactive pressable will-change-transform hover:bg-tone-200 focus-ring"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-tone-1000" aria-hidden="true">
              <path d="M10 12.5L5.5 8 10 3.5" />
            </svg>
            Componentes
          </Link>
          <span className="text-sm text-tone-1000 tabular-nums">
            {i + 1} de {sortedShowcase.length}
          </span>
        </div>

        <header className="mb-6">
          <h1 className="mb-1 text-2xl/8 font-[550] tracking-[-0.0125em] text-balance text-tone-1200">{title}</h1>
          <p className="text-base/[26px] text-tone-1100">{description}</p>
        </header>

        <PreviewTabs
          preview={
            <div className="rounded-card bg-surface p-2 shadow-lift">
              <div className="flex min-h-96 items-center justify-center overflow-hidden rounded-[10px] bg-background font-sans">
                <Demo />
              </div>
            </div>
          }
          code={
            // Long files scroll inside the block instead of stretching the page.
            <div className="flex flex-col gap-4 [&_.code-block]:my-0 [&_.code-block>div]:max-h-[32rem] [&_.code-block>div]:overflow-y-auto">
              {files.map((file) => (
                <CodeBlock key={file.path} content={file.code} language="tsx" title={file.path} />
              ))}
            </div>
          }
        />

        <nav aria-label="Outros componentes" className="mt-16 flex w-full items-start justify-between gap-6 border-t border-tone-300 pt-12">
          {prev ? (
            <Link href={`/componentes/${prev.slug}`} className="group flex max-w-40 select-none flex-col gap-1 rounded-[4px] text-sm font-medium focus-ring sm:max-w-80">
              <span className="text-tone-900 transition-colors duration-200 ease-out group-hover:text-tone-1100">Anterior</span>
              <span className="text-pretty text-tone-1100 transition-colors duration-200 ease-out group-hover:text-tone-1200">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/componentes/${next.slug}`} className="group flex max-w-40 select-none flex-col items-end gap-1 rounded-[4px] text-right text-sm font-medium focus-ring sm:max-w-80">
              <span className="text-tone-900 transition-colors duration-200 ease-out group-hover:text-tone-1100">Próximo</span>
              <span className="text-pretty text-tone-1100 transition-colors duration-200 ease-out group-hover:text-tone-1200">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>
      {/* Some demos (Slide to Unlock) confirm with a toast. */}
      <Toaster position="bottom-center" />
    </SiteShell>
  );
}
