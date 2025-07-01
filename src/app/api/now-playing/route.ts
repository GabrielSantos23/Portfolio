import { getNowPlaying } from "@/lib/spotify";

export const revalidate = 30; // Revalidate at most every 30 seconds

export async function GET() {
  const data = await getNowPlaying();
  return Response.json(data, {
    headers: {
      // Allow the response to be cached by Vercel's edge for a short time
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
