import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Track = { title: string; artist: string; album: string; image: string | null; url: string };
export type NowPlaying =
  | { status: "playing"; track: Track }
  | { status: "last"; track: Track; playedAt: string }
  | { status: "idle" };

const CACHE_FILE = path.join(process.cwd(), ".cache", "spotify-last-played.json");
const POLL_MS = 15_000;

export const spotifyScopes = "user-read-currently-playing user-read-recently-played";

export function spotifyCredentials() {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refreshToken } = process.env;
  return { id, secret, refreshToken };
}

export function basicAuth(id: string, secret: string) {
  return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
}

let token: { value: string; expiresAt: number } | null = null;

async function accessToken() {
  const { id, secret, refreshToken } = spotifyCredentials();
  if (!id || !secret || !refreshToken) return null;
  if (token && token.expiresAt > Date.now() + 30_000) return token.value;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { Authorization: basicAuth(id, secret), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Spotify token refresh failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  token = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return token.value;
}

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string; width: number }[] };
  external_urls: { spotify: string };
};

function toTrack(t: SpotifyTrack): Track {
  // Smallest image at least 64px wide; the widget shows it at 40px.
  const images = [...t.album.images].sort((a, b) => a.width - b.width);
  return {
    title: t.name,
    artist: t.artists.map((a) => a.name).join(", "),
    album: t.album.name,
    image: (images.find((i) => i.width >= 64) ?? images.at(-1))?.url ?? null,
    url: t.external_urls.spotify,
  };
}

async function api<T>(pathname: string, bearer: string): Promise<T | null> {
  const res = await fetch(`https://api.spotify.com/v1${pathname}`, { headers: { Authorization: `Bearer ${bearer}` }, cache: "no-store" });
  if (res.status === 204) return null;
  if (!res.ok) throw new Error(`Spotify ${pathname} failed: ${res.status}`);
  return (await res.json()) as T;
}

// The last played track survives restarts in .cache/; on read-only hosts it falls back to memory only.
let lastPlayed: { track: Track; playedAt: string } | null = null;

async function readLastPlayed() {
  if (lastPlayed) return lastPlayed;
  try {
    lastPlayed = JSON.parse(await readFile(CACHE_FILE, "utf8"));
  } catch {}
  return lastPlayed;
}

async function saveLastPlayed(entry: { track: Track; playedAt: string }) {
  if (lastPlayed?.track.url === entry.track.url && lastPlayed.playedAt === entry.playedAt) return;
  lastPlayed = entry;
  try {
    await mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await writeFile(CACHE_FILE, JSON.stringify(entry));
  } catch {}
}

async function fetchNowPlaying(): Promise<NowPlaying> {
  const bearer = await accessToken();
  if (!bearer) {
    const cached = await readLastPlayed();
    return cached ? { status: "last", ...cached } : { status: "idle" };
  }
  const current = await api<{ is_playing: boolean; item: SpotifyTrack | null; currently_playing_type: string }>(
    "/me/player/currently-playing",
    bearer,
  );
  if (current?.is_playing && current.item && current.currently_playing_type === "track") {
    const track = toTrack(current.item);
    if ((await readLastPlayed())?.track.url !== track.url) await saveLastPlayed({ track, playedAt: new Date().toISOString() });
    return { status: "playing", track };
  }
  const recent = await api<{ items: { track: SpotifyTrack; played_at: string }[] }>("/me/player/recently-played?limit=1", bearer);
  const item = recent?.items[0];
  if (item) await saveLastPlayed({ track: toTrack(item.track), playedAt: item.played_at });
  const cached = await readLastPlayed();
  return cached ? { status: "last", ...cached } : { status: "idle" };
}

// One Spotify round trip per POLL_MS no matter how many visitors poll.
let memo: { at: number; value: Promise<NowPlaying> } | null = null;

export function getNowPlaying(): Promise<NowPlaying> {
  if (!memo || Date.now() - memo.at > POLL_MS) {
    const value = fetchNowPlaying().catch(async (error) => {
      console.error(error);
      const cached = await readLastPlayed();
      return cached ? ({ status: "last", ...cached } as const) : ({ status: "idle" } as const);
    });
    memo = { at: Date.now(), value };
  }
  return memo.value;
}
