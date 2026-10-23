import { basicAuth, spotifyCredentials } from "@/lib/spotify";

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const page = (body: string, status = 200) =>
  new Response(`<!doctype html><meta charset="utf-8"><title>Configuração do Spotify</title><body style="font:16px/1.5 system-ui;max-width:40rem;margin:4rem auto;padding:0 1rem">${body}`, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Set-Cookie": "spotify_state=; Path=/api/spotify; Max-Age=0" },
  });

// Exchanges the approval code for a refresh token and shows it once so it can go into .env.local.
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") return new Response("Não encontrado", { status: 404 });
  const url = new URL(request.url);
  url.host = request.headers.get("host") ?? url.host;
  const cookieState = request.headers.get("cookie")?.match(/(?:^|;\s*)spotify_state=([^;]+)/)?.[1];
  const error = url.searchParams.get("error");
  if (error) return page(`<p>O Spotify retornou: ${escape(error)}</p>`, 400);
  const code = url.searchParams.get("code");
  if (!code || !cookieState || url.searchParams.get("state") !== cookieState) {
    return page("<p>O estado do login não confere. Comece de novo em <a href='/api/spotify/login'>/api/spotify/login</a>.</p>", 400);
  }
  const { id, secret } = spotifyCredentials();
  if (!id || !secret) return page("<p>Defina SPOTIFY_CLIENT_ID e SPOTIFY_CLIENT_SECRET no .env.local, reinicie o servidor de desenvolvimento e tente de novo.</p>", 500);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { Authorization: basicAuth(id, secret), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: `${url.origin}/api/spotify/callback` }),
    cache: "no-store",
  });
  if (!res.ok) return page(`<p>A troca do token falhou (${res.status}): ${escape(await res.text())}</p>`, 502);
  const { refresh_token } = (await res.json()) as { refresh_token: string };
  return page(
    `<h1 style="font-size:1.25rem">Spotify conectado</h1><p>Adicione esta linha ao <code>.env.local</code> e reinicie o servidor de desenvolvimento:</p><pre style="white-space:pre-wrap;word-break:break-all;background:#f0f0f0;padding:1rem;border-radius:8px">SPOTIFY_REFRESH_TOKEN=${escape(refresh_token)}</pre><p>Não compartilhe nem faça commit dela.</p>`,
  );
}
