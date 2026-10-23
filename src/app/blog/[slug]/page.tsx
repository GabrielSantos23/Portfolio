import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOURCE } from "@/components/sites/pablofr/data";
import { PostList, tagHref } from "@/components/sites/pablofr/lists";
import { GoToBottom, PostToolbar, Reactions } from "@/components/sites/pablofr/post-actions";
import { getPosts } from "@/components/sites/pablofr/content";
import { SiteShell, inlineLink } from "@/components/sites/pablofr/shell";

type Props = { params: Promise<{ slug: string }> };

const getBySlug = async () => new Map((await getPosts()).map((p) => [p.slug, p]));

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = (await getBySlug()).get((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

const diamond = <span className="inline-block size-1 shrink-0 rotate-45 rounded-[1px] bg-tone-800" aria-hidden="true" />;

export default async function PostPage({ params }: Props) {
  const bySlug = await getBySlug();
  const post = bySlug.get((await params).slug);
  if (!post) notFound();
  const original = `${SOURCE}/blog/${post.slug}`;
  const related = post.related.flatMap((s) => bySlug.get(s) ?? []);
  const prev = post.prev ? bySlug.get(post.prev) : undefined;
  const next = post.next ? bySlug.get(post.next) : undefined;

  const toc = post.headings.length > 0 && (
    <div className="flow-root">
      <nav aria-label="Nesta página">
        <h3 className="mb-6 font-mono text-xs tracking-widest text-neutral-600 uppercase dark:text-neutral-300">Nesta página</h3>
        <div className="scrollbar-hide relative max-h-[580px] overflow-y-auto overscroll-contain">
          <div className="relative">
            <div className="absolute top-1 bottom-1 left-0 w-0.75 rounded-full bg-tone-400" />
            <ul>
              {post.headings.map((h) => (
                <li key={h.id}>
                  <div className={h.level === 3 ? "py-1 pl-7" : "py-1 pl-4"}>
                    <a
                      href={`${original}#${h.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[4px] py-1 text-sm/5 font-[450] text-tone-1000 transition-colors duration-200 ease-out hover:text-tone-1200 focus-visible:ring-2 focus-visible:ring-tone-1100 focus-visible:outline-none focus-visible:ring-inset"
                    >
                      {h.text}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <GoToBottom
        label
        className="mt-6 inline-flex h-9 cursor-pointer select-none items-center gap-1.5 rounded-full bg-surface pr-3.5 pl-2.5 text-sm font-medium text-tone-1200 shadow-lift interactive pressable hover:bg-tone-200 focus-ring"
      />
    </div>
  );

  return (
    <SiteShell toc={toc}>
      <article className="relative">
        <div className="mb-11 flex items-center justify-between gap-2">
          <Link
            aria-label="Voltar para os pensamentos"
            href="/blog"
            className="relative inline-flex h-9 shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 rounded-full bg-surface pr-3.5 pl-2 text-sm font-medium text-tone-1200 shadow-lift interactive pressable will-change-transform hover:bg-tone-200 focus-ring"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-tone-1000" aria-hidden="true">
              <path d="M10 12.5L5.5 8 10 3.5" />
            </svg>
            Voltar
          </Link>
          <PostToolbar title={post.title} excerpt={post.excerpt} url={original} />
        </div>
        <div className="relative">
          <header className="mb-10" id="article-header">
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={tagHref(t)}
                  className="inline-flex h-7 shrink-0 select-none items-center rounded-full bg-surface px-2.5 text-sm font-[450] text-tone-1100 shadow-lift interactive pressable hover:bg-tone-200 hover:text-tone-1200 focus-ring"
                >
                  {t}
                </Link>
              ))}
            </div>
            <h1 className="mb-3 w-fit text-2xl/8 font-[550] tracking-[-0.0125em] text-balance text-tone-1200">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-tone-1000 tabular-nums">
              <time dateTime={post.dateTime}>{post.dateLabel}</time>
              {diamond}
              <span>Por Pablo Fernandez</span>
              {diamond}
              <span>{post.readTime} min de leitura</span>
            </div>
          </header>
          {/* The article text isn't copied into the clone; the page keeps the post's frame and points to the original. */}
          <div className="mdx-content">
            <p className="text-base/[26px] text-pretty text-paragraph">{post.excerpt}</p>
            <p className="mt-[26px] text-base/[26px] text-pretty text-paragraph">
              O artigo completo está em{" "}
              <a className={inlineLink} href={original} target="_blank" rel="noopener noreferrer">
                pablofr.com
              </a>
              .
            </p>
          </div>
        </div>
        <Reactions slug={post.slug} />
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-5 flex items-center gap-3 text-base/[26px] font-[550] text-tone-1200">
              Artigos relacionados
              <span aria-hidden="true" className="h-px flex-1 bg-tone-400" />
            </h2>
            <PostList items={related} />
          </section>
        )}
        <nav aria-label="Mais artigos" className="mt-16 flex w-full items-start justify-between gap-6 border-t border-tone-300 pt-12">
          {prev ? (
            <Link rel="prev" href={`/blog/${prev.slug}`} className="group flex max-w-40 select-none flex-col gap-1 rounded-[4px] text-sm font-medium focus-ring sm:max-w-80">
              <span className="text-tone-900 transition-colors duration-200 ease-out group-hover:text-tone-1100">Anterior</span>
              <span className="w-full text-pretty text-tone-1100 transition-colors duration-200 ease-out group-hover:text-tone-1200">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link rel="next" href={`/blog/${next.slug}`} className="group flex max-w-40 select-none flex-col items-end gap-1 rounded-[4px] text-right text-sm font-medium focus-ring sm:max-w-80">
              <span className="text-tone-900 transition-colors duration-200 ease-out group-hover:text-tone-1100">Próximo</span>
              <span className="w-full text-pretty text-tone-1100 transition-colors duration-200 ease-out group-hover:text-tone-1200">{next.title}</span>
            </Link>
          )}
        </nav>
        <GoToBottom className="fixed right-6 bottom-3 z-40 inline-flex size-11 shrink-0 cursor-pointer select-none items-center justify-center rounded-full bg-surface text-tone-1100 shadow-[var(--sh-lift),0_4px_12px_-2px_#00000014] interactive pressable will-change-transform hover:bg-tone-200 hover:text-tone-1200 focus-ring xl:hidden" />
      </article>
    </SiteShell>
  );
}
