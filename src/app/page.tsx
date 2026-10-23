import { getSingleton } from "@/components/sites/pablofr/content";
import { Certifications, ProjectList, RecentThoughts } from "@/components/sites/pablofr/lists";
import { NowPlaying } from "@/components/sites/pablofr/now-playing";
import { RichText } from "@/components/sites/pablofr/rich-text";
import { SiteShell } from "@/components/sites/pablofr/shell";

export default async function Home() {
  const [home, site] = await Promise.all([getSingleton("home"), getSingleton("site")]);
  return (
    <SiteShell>
      <div className="flex flex-col">
        <section>
          <div className="mb-6 flex flex-col">
            <h1 className="text-base/[22px] font-medium text-tone-1200">{home.name}</h1>
            <p className="text-base/[22px] font-[450] text-tone-1100">{home.role}</p>
          </div>
          <div className="flex flex-col gap-4 text-base/[26px] text-tone-1100">
            <RichText document={home.bio} linkIcons />
          </div>
          <div className="mt-8">
            <NowPlaying labels={{ playing: site.musicPlayingLabel, lastPlayed: site.musicLastPlayedLabel, idle: site.musicIdleText }} />
          </div>
        </section>
        <div className="mt-12 sm:mt-16">
          <Certifications />
        </div>
        <div className="mt-16 sm:mt-24">
          <ProjectList title={home.projectsTitle} />
        </div>
        <div className="mt-16 sm:mt-24">
          <RecentThoughts title={home.thoughtsTitle} viewAllLabel={home.viewAllLabel} />
        </div>
      </div>
    </SiteShell>
  );
}
