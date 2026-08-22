import { client } from "@/sanity/client";
import type { QueryParams } from "next-sanity";

const DEFAULT_REVALIDATE = 60;
const isDevelopment = process.env.NODE_ENV === "development";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: isDevelopment ? 0 : DEFAULT_REVALIDATE,
      tags,
    },
    ...(isDevelopment && { cache: "no-store" }),
  });
}
