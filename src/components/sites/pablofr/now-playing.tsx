"use client";

import { useEffect, useState } from "react";
import type { NowPlaying as NowPlayingData } from "@/lib/spotify";

const POLL_MS = 30_000;

function ago(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  for (const [unit, size] of [["day", 86400], ["hour", 3600], ["minute", 60]] as const) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "agora";
}

export function NowPlaying({ labels }: { labels: { playing: string; lastPlayed: string; idle: string } }) {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/spotify/now-playing", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : { status: "idle" }))
        .catch(() => ({ status: "idle" }))
        .then((d: NowPlayingData) => alive && setData(d));
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (!data || data.status === "idle") {
    return (
      <div className="flex items-center gap-2 text-sm text-tone-1100" aria-live="polite">
        <div className={`size-1.5 rounded-full bg-tone-700 ${data ? "" : "animate-pulse"}`} />
        <span>{data ? labels.idle : "Conectando..."}</span>
      </div>
    );
  }

  const { track } = data;
  const playing = data.status === "playing";
  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-live="polite"
      className="group -m-1 flex w-fit max-w-full items-center gap-3 rounded-[10px] p-1 transition-colors duration-200 ease-out hover:bg-tone-300 focus-ring"
    >
      {track.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={track.image} alt="" className="size-10 shrink-0 rounded-[6px] object-cover outline-subtle" />
      ) : (
        <span aria-hidden="true" className="size-10 shrink-0 rounded-[6px] bg-tone-300" />
      )}
      <span className="flex min-w-0 flex-col text-sm">
        <span className="flex items-center gap-1.5 text-tone-1000">
          <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${playing ? "animate-pulse bg-[#1db954]" : "bg-tone-700"}`} />
          {playing ? labels.playing : `${labels.lastPlayed} · ${ago(data.playedAt)}`}
        </span>
        <span className="truncate font-[450] text-tone-1200">
          {track.title} <span className="font-normal text-tone-1100">· {track.artist}</span>
        </span>
      </span>
    </a>
  );
}
