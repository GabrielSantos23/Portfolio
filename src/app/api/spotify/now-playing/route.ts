import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getNowPlaying(), { headers: { "Cache-Control": "no-store" } });
}
