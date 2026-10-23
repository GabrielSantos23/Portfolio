import type { Metadata } from "next";
import Link from "next/link";
import { ComponentGallery } from "@/components/showcase/ComponentGallery";
import { ScaledPreview } from "@/components/showcase/ScaledPreview";
import { getSingleton } from "@/components/sites/pablofr/content";
import { PageIntro, SiteShell } from "@/components/sites/pablofr/shell";
import { sortedShowcase } from "@/showcase/components";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSingleton("componentsPage");
  return { title: `${page.title} | Pablo Fernandez`, description: page.intro };
}

export default async function ComponentesPage() {
  const page = await getSingleton("componentsPage");

  return (
    <SiteShell>
      <div className="flex flex-col gap-10">
        <PageIntro title={page.title} subtitle={page.subtitle}>
          {page.intro}
        </PageIntro>
        <ComponentGallery items={sortedShowcase.map(({ slug, title, description }) => ({ slug, title, description }))}>
          {sortedShowcase.map(({ slug, title, description, Demo }) => (
            <Link
              key={slug}
              href={`/componentes/${slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-lift transition-shadow duration-200 ease-out hover:shadow-lift-hover focus-ring"
            >
              <ScaledPreview>
                <Demo />
              </ScaledPreview>
              <span className="flex flex-col gap-0.5 border-t border-tone-300 px-3 py-2.5">
                <span className="font-[450] text-tone-1200">{title}</span>
                <span className="line-clamp-2 text-sm text-tone-1100">{description}</span>
              </span>
            </Link>
          ))}
        </ComponentGallery>
      </div>
    </SiteShell>
  );
}
