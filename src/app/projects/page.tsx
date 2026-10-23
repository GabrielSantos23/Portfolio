import type { Metadata } from "next";
import { getSingleton } from "@/components/sites/pablofr/content";
import { ProjectList } from "@/components/sites/pablofr/lists";
import { RichText } from "@/components/sites/pablofr/rich-text";
import { Callout, PageIntro, SiteShell } from "@/components/sites/pablofr/shell";

export async function generateMetadata(): Promise<Metadata> {
  return { title: `${(await getSingleton("projectsPage")).title} | Pablo Fernandez` };
}

export default async function ProjectsPage() {
  const page = await getSingleton("projectsPage");
  return (
    <SiteShell>
      <div className="flex flex-col gap-12 sm:gap-16">
        <PageIntro title={page.title} subtitle={page.subtitle}>
          {page.intro}
        </PageIntro>
        <div className="flex flex-col gap-16">
          <ProjectList title={page.listTitle} />
        </div>
        <Callout>
          <RichText document={page.callout} />
        </Callout>
      </div>
    </SiteShell>
  );
}
