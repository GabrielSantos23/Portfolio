import { Award, Code, Globe, GraduationCap, Palette, Sparkles } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { GithubIcon, NpmIcon } from "./icons";
import { getPosts, getProjects, getSingleton, type Post, type PostType } from "./content";
import { ShowMore } from "./show-more";

const revealArrow =
  "inline-block size-[13.5px] -translate-x-0.5 scale-75 align-[-1px] text-tone-1000 opacity-0 transition-[opacity,translate,scale] duration-200 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-has-[[data-row-link]:focus-visible]:translate-x-0 group-has-[[data-row-link]:focus-visible]:scale-100 group-has-[[data-row-link]:focus-visible]:opacity-100";

export const tagHref = (tag: string) => `/blog?${new URLSearchParams({ tag: tag.toLowerCase() })}`;

export async function ProjectList({ title }: { title: string }) {
  const projects = await getProjects();
  return (
    <section>
      <h2 className="mb-3 font-medium text-tone-1200">{title}</h2>
      <div className="flex flex-col gap-2">
        {projects.map((p) => (
          <div key={p.name} className="group relative -mx-2 flex items-start gap-3 rounded-card p-2">
            <span aria-hidden="true" className="flex h-[54px] w-[46px] shrink-0 select-none rounded-[8px] bg-page p-[3px] shadow-lift">
              <span className="flex h-12 w-10 items-center justify-center rounded-[5px] bg-surface text-tone-1200 shadow-lift">
                {p.icon === "npm" ? <NpmIcon /> : <GithubIcon className="size-5" />}
              </span>
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-pretty font-[450] text-tone-1200">
                {p.name}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`ml-1 ${revealArrow}`}>
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </span>
              <span className="line-clamp-1 text-tone-1100">{p.description}</span>
            </div>
            <a
              href={p.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full text-tone-1000 interactive pressable hover:bg-tone-300 hover:text-tone-1200 focus-ring"
              aria-label={p.secondary.kind === "Github" ? "Ver no GitHub" : "Ver no site"}
            >
              {p.secondary.kind === "Github" ? <GithubIcon /> : <Globe aria-hidden="true" className="size-4" />}
            </a>
            <a href={p.href} target="_blank" rel="noopener noreferrer" data-row-link="" className="absolute inset-0 z-10 rounded-card focus-ring" aria-label={`Abrir ${p.name}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CredentialRow({ icon, title, detail, url }: { icon: React.ReactNode; title: string; detail: string; url: string | null }) {
  return (
    <div className="group relative -mx-2 flex items-start gap-3 rounded-card p-2">
      <span aria-hidden="true" className="flex h-[54px] w-[46px] shrink-0 select-none rounded-[8px] bg-page p-[3px] shadow-lift">
        <span className="flex h-12 w-10 items-center justify-center rounded-[5px] bg-surface text-tone-1200 shadow-lift">{icon}</span>
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-pretty font-[450] text-tone-1200">
          {title}
          {url && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`ml-1 ${revealArrow}`}>
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          )}
        </span>
        <span className="line-clamp-1 text-tone-1100">{detail}</span>
      </div>
      {url && <a href={url} target="_blank" rel="noopener noreferrer" data-row-link="" className="absolute inset-0 z-10 rounded-card focus-ring" aria-label={`Abrir ${title}`} />}
    </div>
  );
}

// Courses beyond this many hide behind "Ver mais".
const COURSE_LIMIT = 5;

// Colleges first, then courses, as two groups of one "Certificações" section.
export async function Certifications() {
  const data = await getSingleton("certifications");
  const groups = [
    {
      title: data.collegesTitle,
      limit: Infinity,
      rows: data.colleges.map((c) => ({ title: c.name, detail: [c.institution, c.period].filter(Boolean).join(" · "), url: c.url, icon: <GraduationCap aria-hidden="true" className="size-5" /> })),
    },
    {
      title: data.coursesTitle,
      limit: COURSE_LIMIT,
      rows: data.courses.map((c) => ({ title: c.name, detail: [c.issuer, c.date].filter(Boolean).join(" · "), url: c.url, icon: <Award aria-hidden="true" className="size-5" /> })),
    },
  ].filter((g) => g.rows.length > 0);
  if (groups.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 font-medium text-tone-1200">{data.title}</h2>
      <div className="flex flex-col gap-6">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-2 text-sm font-medium text-tone-900">{g.title}</h3>
            <ShowMore limit={g.limit}>
              {g.rows.map((r, i) => (
                <CredentialRow key={i} {...r} />
              ))}
            </ShowMore>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScrapingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16V8C21 6.895 20.105 6 19 6H5C3.895 6 3 6.895 3 8V16C3 17.105 3.895 18 5 18H19C20.105 18 21 17.105 21 16Z" />
      <path d="M7 10L9 12L7 14" />
      <path d="M12 14H15" />
    </svg>
  );
}

const typeIcons: Record<Exclude<PostType, "article">, React.ReactNode> = {
  code: <Code aria-hidden="true" size={16} />,
  ai: <Sparkles aria-hidden="true" size={16} />,
  art: <Palette aria-hidden="true" size={16} />,
  scraping: <ScrapingIcon />,
};

export function PostThumb({ type }: { type: PostType }) {
  return (
    <span aria-hidden="true" className="flex h-[72px] w-[46px] shrink-0 select-none items-start self-start rounded-lg bg-page p-[3px] shadow-lift">
      <span className="flex h-12 w-10 flex-col gap-1 overflow-hidden rounded-[5px] bg-surface p-1 shadow-lift">
        {type === "article" ? (
          <>
            <span className="mt-0.5 h-[3px] w-4 rounded-full bg-tone-700" />
            <span className="mt-0.5 h-[3px] w-7 rounded-full bg-tone-400" />
            <span className="h-[3px] w-6 rounded-full bg-tone-400" />
            <span className="mt-0.5 h-[3px] w-5 rounded-full bg-tone-400" />
            <span className="h-[3px] w-3 rounded-full bg-tone-400" />
          </>
        ) : (
          <>
            <span className="flex h-7 items-center justify-center rounded-[3px] bg-tone-200 text-tone-1000">{typeIcons[type]}</span>
            <span className="h-[3px] w-5 rounded-full bg-tone-400" />
          </>
        )}
      </span>
    </span>
  );
}

export function PostRow({ post }: { post: Post }) {
  return (
    <div className="group relative -mx-2 flex gap-3 rounded-card p-2">
      <PostThumb type={post.type} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <span className="min-w-0 text-pretty font-[450] text-tone-1200">
            {post.title}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`ml-0.5 ${revealArrow}`}>
              <path d="M6 3.5L10.5 8 6 12.5" />
            </svg>
          </span>
          <time className="shrink-0 whitespace-nowrap text-sm text-tone-1000 tabular-nums">{post.date}</time>
        </div>
        <p className="line-clamp-1 text-tone-1100">{post.excerpt}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
          {post.tags.map((tag, i) => (
            <Fragment key={tag}>
              {i > 0 && <span aria-hidden="true" className="inline-block size-1 shrink-0 rotate-45 rounded-[1px] bg-tone-800" />}
              <Link
                className="relative z-20 rounded-[4px] text-tone-1000 transition-colors duration-200 ease-out before:absolute before:-inset-x-1 before:-inset-y-1.5 before:content-[''] hover:text-tone-1200 focus-ring"
                href={tagHref(tag)}
              >
                {tag}
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
      <Link data-row-link="" className="absolute inset-0 z-10 rounded-card focus-ring" aria-label={post.title} href={`/blog/${post.slug}`} />
    </div>
  );
}

export function PostList({ items }: { items: Post[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((p) => (
        <PostRow key={p.slug} post={p} />
      ))}
    </div>
  );
}

export async function RecentThoughts({ title, viewAllLabel }: { title: string; viewAllLabel: string }) {
  const posts = await getPosts();
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="font-medium text-tone-1200">{title}</h2>
        <Link className="rounded-[4px] text-sm font-medium text-tone-900 transition-colors duration-200 ease-out hover:text-tone-1200 focus-ring" href="/blog">
          {viewAllLabel}
        </Link>
      </div>
      <PostList items={posts.slice(0, 3)} />
    </section>
  );
}
