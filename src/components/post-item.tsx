import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { SanityPostListItem } from "@/sanity/fetchers";

export function PostItem({
  post,
  shouldPreloadImage,
}: {
  post: SanityPostListItem;
  shouldPreloadImage?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group/post flex flex-col gap-2 p-2",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
    >
      {post.image && (
        <div className="relative select-none overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            quality={100}
            priority={shouldPreloadImage}
            className="aspect-1200/630 w-full rounded-xl object-cover"
            unoptimized
          />

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />

          {post.new && (
            <span className="absolute top-1.5 right-1.5 rounded-md bg-info px-1.5 font-mono text-sm font-medium text-white text-shadow-xs">
              New
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/post:underline">
          {post.title}
        </h3>

        <div>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={dayjs(post.createdAt).toISOString()}>
              {dayjs(post.createdAt).format("DD.MM.YYYY")}
            </time>
          </dd>
        </div>
      </div>
    </Link>
  );
}
