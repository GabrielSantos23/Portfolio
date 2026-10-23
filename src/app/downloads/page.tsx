import type { Metadata } from "next";
import { getSingleton } from "@/components/sites/pablofr/content";
import { RichText } from "@/components/sites/pablofr/rich-text";
import { Callout, PageIntro, SiteShell } from "@/components/sites/pablofr/shell";

export async function generateMetadata(): Promise<Metadata> {
  return { title: `${(await getSingleton("downloadsPage")).title} | Pablo Fernandez` };
}

export default async function DownloadsPage() {
  const page = await getSingleton("downloadsPage");
  return (
    <SiteShell>
      <div className="flex flex-col gap-12 sm:gap-16">
        <PageIntro title={page.title} subtitle={page.subtitle}>
          {page.intro}
        </PageIntro>
        <section>
          <h2 className="mb-3 font-medium text-tone-1200">{page.resourcesTitle}</h2>
          <div className="flex flex-col gap-3">
            <p className="font-medium text-tone-1200">{page.emptyText}</p>
          </div>
        </section>
        <Callout>
          <RichText document={page.callout} />
        </Callout>
      </div>
    </SiteShell>
  );
}
