import type { Metadata } from "next";
import Link from "next/link";
import { PostList, tagHref } from "@/components/sites/pablofr/lists";
import { getPosts, getSingleton, type Post, type PostType } from "@/components/sites/pablofr/content";
import { SiteShell } from "@/components/sites/pablofr/shell";
import { TagCloud } from "@/components/sites/pablofr/tag-cloud";

export async function generateMetadata(): Promise<Metadata> {
  return { title: `${(await getSingleton("blogPage")).title} | Pablo Fernandez` };
}

const PAGE_SIZE = 25;
const types: { label: string; value?: PostType }[] = [
  { label: "Todos" },
  { label: "Artigos", value: "article" },
  { label: "Código", value: "code" },
  { label: "Arte", value: "art" },
  { label: "IA", value: "ai" },
  { label: "Scraping", value: "scraping" },
];

// Tags are matched case-insensitively; the newest post's spelling wins, as on the source.
const tagList = (posts: Post[]) => [...new Map(posts.flatMap((p) => p.tags).reverse().map((t) => [t.toLowerCase(), t])).values()].sort((a, b) =>
  a.localeCompare(b, "en", { sensitivity: "base" }),
);

const pageButton =
  "relative inline-flex size-9 shrink-0 select-none items-center justify-center rounded-full bg-surface font-medium text-tone-1100 shadow-lift cursor-pointer interactive pressable will-change-transform hover:bg-tone-200 hover:text-tone-1200 focus-ring";

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function blogHref(params: { tag?: string; type?: string; page?: number }) {
  const q = new URLSearchParams();
  if (params.tag) q.set("tag", params.tag);
  if (params.type) q.set("type", params.type);
  if (params.page && params.page > 1) q.set("page", String(params.page));
  const s = q.toString();
  return s ? `/blog?${s}` : "/blog";
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const [posts, copy] = await Promise.all([getPosts(), getSingleton("blogPage")]);
  const allTags = tagList(posts);
  const tag = first(sp.tag)?.toLowerCase();
  const type = types.find((t) => t.value && t.value === first(sp.type))?.value;
  const filtered = posts.filter((p) => (!tag || p.tags.some((t) => t.toLowerCase() === tag)) && (!type || p.type === type));
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(pageCount, Math.max(1, Number(first(sp.page)) || 1));
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeTag = allTags.find((t) => t.toLowerCase() === tag);
  const cloudTags = (activeTag ? [activeTag, ...allTags.filter((t) => t !== activeTag)] : allTags).map((t) => ({
    label: t,
    href: tagHref(t),
    active: t === activeTag,
  }));

  return (
    <SiteShell>
      <div className="space-y-10">
        <header className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-[550] text-tone-1200">{copy.title}</h1>
              <span className="flex h-6 min-w-7 items-center justify-center rounded-full bg-tone-300 px-2 text-sm font-medium text-tone-1100 tabular-nums">
                {filtered.length}
              </span>
            </div>
            <p className="text-base/[26px] text-tone-1100">{copy.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="min-w-0 rounded-full bg-surface px-1 py-[3px] shadow-lift">
                <div className="scrollbar-hide snap-x snap-proximity overflow-x-auto overscroll-x-contain rounded-full py-px">
                  <div className="flex h-7 w-max items-center gap-0.5">
                    {types.map((t) => {
                      const active = t.value === type;
                      return (
                        <Link
                          key={t.label}
                          data-active={active || undefined}
                          aria-current={active ? "page" : undefined}
                          href={t.value ? blogHref({ tag, type: t.value }) : "/blog"}
                          className={`relative flex h-7 shrink-0 snap-start select-none items-center rounded-full px-2.5 text-sm font-medium interactive focus-ring focus-visible:-outline-offset-2 ${active ? "bg-tone-200 text-tone-1200 shadow-lift" : "text-tone-1100 hover:text-tone-1200"}`}
                        >
                          {t.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              {tag && (
                <Link href="/blog" className="flex h-9 shrink-0 items-center rounded-full px-3 text-sm font-medium text-tone-1000 interactive pressable hover:bg-tone-300 hover:text-tone-1200 focus-ring">
                  Limpar
                </Link>
              )}
            </div>
            <TagCloud tags={cloudTags} />
          </div>
        </header>
        <section className="space-y-8">
          {items.length > 0 ? (
            <PostList items={items} />
          ) : (
            <p className="font-medium text-tone-1200">Nenhum post corresponde a estes filtros.</p>
          )}
          {pageCount > 1 && (
            <nav aria-label="Paginação" className="-mt-2 flex items-center justify-end">
              <div className="flex items-center gap-2">
                {page > 1 ? (
                  <Link aria-label="Página anterior" className={pageButton} href={blogHref({ tag, type, page: page - 1 })}>
                    <Chevron d="M10 12.5L5.5 8 10 3.5" />
                  </Link>
                ) : (
                  <span aria-hidden="true" className={`${pageButton} pointer-events-none opacity-50`}>
                    <Chevron d="M10 12.5L5.5 8 10 3.5" />
                  </span>
                )}
                {page < pageCount ? (
                  <Link aria-label="Próxima página" className={pageButton} href={blogHref({ tag, type, page: page + 1 })}>
                    <Chevron d="M6 3.5L10.5 8 6 12.5" />
                  </Link>
                ) : (
                  <span aria-hidden="true" className={`${pageButton} pointer-events-none opacity-50`}>
                    <Chevron d="M6 3.5L10.5 8 6 12.5" />
                  </span>
                )}
              </div>
            </nav>
          )}
        </section>
      </div>
    </SiteShell>
  );
}

function Chevron({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
