"use client";

import { Music2Icon } from "lucide-react";
import React from "react";
import useSWR from "swr";
import { USER } from "@/data/user";
import { AiOutlineSpotify } from "react-icons/ai";
import { IntroItem } from "./intro-item";

type ApiResponse =
  | {
      isPlaying: false;
    }
  | {
      isPlaying: true;
      title: string;
      artist: string;
      songUrl: string;
    };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SpotifyNowPlaying() {
  const { data } = useSWR<ApiResponse>("/api/now-playing", fetcher, {
    suspense: false,
    refreshInterval: 30000, // refetch every 30s
  });

  if (!data) {
    return <IntroItem icon={Music2Icon} content="Carregando faixa atual…" />;
  }

  const SpotifyIcon = () => (
    <AiOutlineSpotify className={`${data.isPlaying ? "text-green-500" : "text-gray-500"} pointer-events-none size-4`} />
  );

  if (data.isPlaying) {
    return (
      <IntroItem
        icon={SpotifyIcon}
        content={<span className="text-green-500">{`${data.title} – ${data.artist}`}</span>}
        href={data.songUrl}
      />
    );
  } else {
    return (
      <IntroItem
        icon={SpotifyIcon}
        content={
          <>
            <span className="">Acesse meu Spotify</span>
          </>
        }
        href={USER.spotifyUrl}
      />
    );
  }
}