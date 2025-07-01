"use client";

import { Music2Icon } from "lucide-react";
import React from "react";
import useSWR from "swr";

import { USER } from "@/data/user";

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
    return <IntroItem icon={Music2Icon} content="Loading current track…" />;
  }

  if (data.isPlaying) {
    return (
      <IntroItem
        icon={Music2Icon}
        content={`${data.title} – ${data.artist}`}
        href={data.songUrl}
      />
    );
  }

  return (
    <IntroItem
      icon={Music2Icon}
      content="Listen on Spotify"
      href={USER.spotifyUrl ?? "https://open.spotify.com/"}
    />
  );
} 