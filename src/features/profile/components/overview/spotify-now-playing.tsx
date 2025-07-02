"use client";

import { Music2Icon } from "lucide-react";
import React from "react";
import { AiOutlineSpotify } from "react-icons/ai";
import useSWR from "swr";

import { USER } from "@/data/user";

import { IntroItem } from "./intro-item";
import { SpotifyHoverCard } from "./spotify-hover-card";

type ApiResponse =
  | {
      isPlaying: false;
    }
  | {
      isPlaying: true;
      title: string;
      artist: string;
      songUrl: string;
      albumImageUrl?: string;
    };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SpotifyNowPlaying() {
  const { data } = useSWR<ApiResponse>("/api/now-playing", fetcher, {
    suspense: false,
    refreshInterval: 30000, // refetch every 30s
  });

  if (!data) {
    return <IntroItem icon={Music2Icon} content="Carregando música atual…" />;
  }

  // Animated Spotify icon with pulsing animation when playing
  const SpotifyIcon = () => (
    <div className="relative">
      <AiOutlineSpotify 
        className={`${
          data.isPlaying ? "text-green-500" : "text-gray-500"
        } pointer-events-none size-4 ${
          data.isPlaying ? "animate-pulse" : ""
        }`} 
      />
   
    </div>
  );

  if (data.isPlaying) {
    const songContent = (
      <div className="flex gap-2">
        <span className="text-green-500 font-medium">{data.title}</span>
        <span className="text-sm text-gray-400">por {data.artist}</span>
      </div>
    );

    return (
      <IntroItem
        icon={SpotifyIcon}
        content={
          <SpotifyHoverCard
            isPlaying={data.isPlaying}
            title={data.title}
            artist={data.artist}
            songUrl={data.songUrl}
            albumImageUrl={data.albumImageUrl}
          >
            {songContent}
          </SpotifyHoverCard>
        }
        href={data.songUrl}
      />
    );
  } else {
    return (
      <IntroItem
        icon={SpotifyIcon}
        content={
          <div className="flex gap-2">
            <span className="text-xs text-muted-foreground ">🎧 </span>
            <span>Não está tocando • Ver perfil</span>
          </div>
        }
        href={USER.spotifyUrl}
      />
    );
  }
}