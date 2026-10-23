import "server-only";
import { createReader } from "@keystatic/core/reader";
import { cache } from "react";
import keystaticConfig from "../../../../keystatic.config";

// Content lives in /content and is edited at /keystatic.
const reader = createReader(process.cwd(), keystaticConfig);

export type PostType = "article" | "code" | "art" | "ai" | "scraping";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateTime: string;
  dateLabel: string;
  readTime: number;
  type: PostType;
  tags: string[];
  headings: { level: number; id: string; text: string }[];
  related: string[];
  prev: string | null;
  next: string | null;
};

export type Project = {
  name: string;
  description: string;
  icon: "npm" | "github";
  href: string;
  secondary: { href: string; kind: "Github" | "Website" };
};

const longDate = (day: string) =>
  new Date(`${day}T00:00:00Z`).toLocaleDateString("pt-BR", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

// Newest first; prev points to the older post and next to the newer one, as on the source.
export const getPosts = cache(async (): Promise<Post[]> => {
  const entries = await reader.collections.posts.all();
  entries.sort((a, b) => b.entry.publishedAt!.localeCompare(a.entry.publishedAt!));
  return entries.map(({ slug, entry }, i) => {
    const published = entry.publishedAt!.slice(0, 10);
    const updated = entry.updatedAt && entry.updatedAt !== published ? entry.updatedAt : null;
    const [y, m, d] = published.split("-");
    return {
      slug,
      title: entry.title,
      excerpt: entry.excerpt,
      date: `${d}/${m}/${y}`,
      dateTime: updated ?? published,
      dateLabel: updated ? `Atualizado em ${longDate(updated)}` : longDate(published),
      readTime: entry.readTime,
      type: entry.type,
      tags: [...entry.tags],
      headings: entry.headings.map((h) => ({ level: Number(h.level), id: h.id, text: h.text })),
      related: entry.related.filter((r): r is string => !!r),
      prev: entries[i + 1]?.slug ?? null,
      next: entries[i - 1]?.slug ?? null,
    };
  });
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const data = await reader.singletons.projects.read();
  return (data?.items ?? []).map((p) => ({
    name: p.name,
    description: p.description,
    icon: p.icon,
    href: p.href ?? "",
    secondary: { href: p.secondaryHref, kind: p.secondaryKind },
  }));
});

// What the client-side search needs: titles and excerpts only.
export const getSearchIndex = cache(async () => [
  ...(await getPosts()).map((p) => ({ title: p.title, text: p.excerpt, href: `/blog/${p.slug}`, kind: "pensamentos" })),
  ...(await getProjects()).map((p) => ({ title: p.name, text: p.description, href: p.href, kind: "projetos" })),
]);

export type SearchItem = Awaited<ReturnType<typeof getSearchIndex>>[number];

type Singletons = (typeof keystaticConfig)["singletons"];
// Page copy and footer text; rich-text fields come back as document nodes.
export const getSingleton = cache(<K extends Exclude<keyof Singletons, "projects">>(key: K) =>
  reader.singletons[key].readOrThrow({ resolveLinkedFiles: true }),
);

export type SiteText = Awaited<ReturnType<typeof getSingleton<"site">>>;
