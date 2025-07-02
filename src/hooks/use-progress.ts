"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to simulate song progress
 * @param isPlaying Whether a song is currently playing
 * @param initialProgress Initial progress value (0-100)
 * @param duration Duration in seconds for full progress (defaults to 30 seconds)
 * @returns Current progress value (0-100)
 */
export function useProgress(
  isPlaying: boolean,
  initialProgress: number = 0,
  duration: number = 30
): number {
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (duration * 10); // Update every 100ms
        return next >= 100 ? initialProgress : next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, initialProgress, duration]);

  // Reset progress when not playing
  useEffect(() => {
    if (!isPlaying) {
      setProgress(initialProgress);
    }
  }, [isPlaying, initialProgress]);

  return progress;
} 