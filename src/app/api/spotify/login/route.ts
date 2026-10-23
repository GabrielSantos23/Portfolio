import { randomBytes } from "node:crypto";
import { spotifyCredentials, spotifyScopes } from "@/lib/spotify";

// One-time setup, dev only: sends you to Spotify to approve the app, then to /api/spotify/callback.
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") return new Response("Não encontrado", { status: 404 });
  // request.url can report the dev server's own hostname, so trust the Host header the browser sent.
  const url = new URL(request.url);
  url.host = request.headers.get("host") ?? url.host;
  // Spotify only accepts loopback redirect URIs as 127.0.0.1, so move there before setting the state cookie.
  if (url.hostname === "localhost") {
    url.hostname = "127.0.0.1";
    return Response.redirect(url, 307);
  }
  const { id } = spotifyCredentials();
  if (!id) return new Response("Defina SPOTIFY_CLIENT_ID no .env.local primeiro.", { status: 500 });
  const state = randomBytes(16).toString("hex");
  const authorize = new URL("https://accounts.spotify.com/authorize");
  authorize.search = new URLSearchParams({
    response_type: "code",
    client_id: id,
    scope: spotifyScopes,
    redirect_uri: `${url.origin}/api/spotify/callback`,
    state,
  }).toString();
  return new Response(null, {
    status: 307,
    headers: { Location: authorize.toString(), "Set-Cookie": `spotify_state=${state}; Path=/api/spotify; HttpOnly; SameSite=Lax; Max-Age=600` },
  });
}
