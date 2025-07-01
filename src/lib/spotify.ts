import { z } from "zod";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
  console.warn(
    "[spotify] Missing one or more required environment variables: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN"
  );
}

// Helper to refresh an access token using a long-lived refresh token
async function getAccessToken(): Promise<string | null> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN)
    return null;

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    // Do not cache token fetches
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    console.error("[spotify] Failed to refresh access token", await res.text());
    return null;
  }

  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

const nowPlayingSchema = z
  .object({
    is_playing: z.boolean(),
    item: z
      .object({
        external_urls: z.object({ spotify: z.string() }),
        name: z.string(),
        artists: z.array(z.object({ name: z.string() })),
        album: z.object({ images: z.array(z.object({ url: z.string() })) }),
      })
      .optional(),
  })
  .partial();

export type NowPlayingResponse =
  | {
      isPlaying: true;
      songUrl: string;
      title: string;
      artist: string;
      albumImageUrl?: string;
    }
  | { isPlaying: false };

export async function getNowPlaying(): Promise<NowPlayingResponse> {
  const accessToken = await getAccessToken();
  if (!accessToken) return { isPlaying: false };

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // Cache very briefly at the edge – 30s
      next: { revalidate: 30 },
    }
  );

  if (res.status === 204 || res.status >= 400) {
    return { isPlaying: false };
  }

  const json = await res.json();
  const parsed = nowPlayingSchema.safeParse(json);
  if (!parsed.success || !parsed.data.item) {
    return { isPlaying: false };
  }

  const track = parsed.data.item;
  const title = track.name;
  const artist = track.artists.map((a) => a.name).join(", ");
  const songUrl = track.external_urls.spotify;
  const albumImageUrl = track.album.images?.[0]?.url;

  return {
    isPlaying: true,
    title,
    artist,
    songUrl,
    albumImageUrl,
  };
}
