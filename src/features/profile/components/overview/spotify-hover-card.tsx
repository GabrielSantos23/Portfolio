"use client";

import Image from "next/image";
import React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type SpotifyHoverCardProps = {
  children: React.ReactNode;
  isPlaying: boolean;
  songUrl: string;
  title: string;
  artist: string;
  albumImageUrl?: string;
};

export function SpotifyHoverCard({
  children,
  isPlaying,
  songUrl,
  title,
  artist,
  albumImageUrl,
}: SpotifyHoverCardProps) {
  if (!isPlaying) {
    return children;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="min-w-0 cursor-pointer truncate">{children}</div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div>
          <div className="mt-1 text-center text-xs text-muted-foreground">
            <span>Reproduzindo agora</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            {albumImageUrl && (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={albumImageUrl}
                  alt={`${title} album cover`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex min-w-0 flex-col justify-center">
              <h4 className="truncate text-sm font-semibold text-foreground">
                {title}
              </h4>
              <p className="truncate text-xs text-muted-foreground">{artist}</p>
            </div>
          </div>

          <a
            href={songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-green-500 hover:underline"
          >
            <span className="bg-opacity-10 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M16.7459 11.1245C16.6058 10.9228 16.4841 10.7117 16.3325 10.5209C15.3716 9.16175 13.9832 8.68103 12.4478 8.34929C11.5152 8.13634 10.5781 8.01578 9.63649 7.90514C8.99337 7.82881 8.75599 8.0648 8.73571 8.71485C8.71364 9.42356 8.71886 10.1331 8.73035 10.8426C8.73571 11.2147 8.92543 11.4236 9.27582 11.4949C9.45194 11.5313 9.63321 11.5581 9.81528 11.5692C10.9104 11.632 12.0063 11.685 13.097 11.7739C13.8708 11.8357 14.6352 11.9486 15.3983 12.073C15.9249 12.1599 16.2155 12.5992 16.0999 13.1263C16.0269 13.4612 15.8494 13.7667 15.6104 14.0279C14.8212 14.8857 13.8252 15.3792 12.7128 15.6909C11.9655 15.9061 11.1873 15.9345 10.4229 15.8134C9.75804 15.7057 9.15052 15.4207 8.60557 15.0374C8.1508 14.7128 7.95264 14.2634 8.01947 13.6632C8.11267 12.8288 8.16783 11.9887 8.22003 11.1487C8.24832 10.7055 8.28141 10.2623 8.30261 9.81839C8.33106 9.22324 8.36057 8.62784 8.37821 8.03245C8.41273 7.00444 9.02605 6.41908 10.0614 6.30605C11.3247 6.16898 12.5671 6.36701 13.7946 6.68294C14.7385 6.92623 15.6257 7.31361 16.3449 7.98593C16.7011 8.32173 16.9999 8.71802 17.2179 9.16199C17.5886 9.91934 17.8983 10.7018 17.9975 11.5542C18.0331 11.8407 17.9488 12.0649 17.6969 12.2205C17.4075 12.3971 17.2021 12.3273 16.9946 12.1316C16.9004 12.0435 16.8181 11.9431 16.7459 11.1245Z"
                  fill="white"
                />
              </svg>
            </span>
            Ouça no Spotify
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
