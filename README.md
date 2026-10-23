# portfolio-v2

Personal site: home, blog ("Pensamentos"), projects, component gallery and downloads, with a Spotify now-playing widget. Content is edited with Keystatic.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit content at http://localhost:3000/keystatic (saves files under `content/`).

## Spotify (optional)

1. Copy `.env.example` to `.env.local` and fill in `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` from your Spotify app.
2. Add `http://127.0.0.1:3000/api/spotify/callback` as a redirect URI in the Spotify dashboard.
3. Open http://127.0.0.1:3000/api/spotify/login, approve, and put the shown `SPOTIFY_REFRESH_TOKEN` in `.env.local`.

## Checks

```bash
npm run check
```

Runs lint, typecheck and the production build.
"# Portfolio" 
