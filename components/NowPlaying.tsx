"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
}

function Equalizer() {
  return (
    <div className="flex items-end gap-[2px] h-3 flex-shrink-0">
      <span className="w-[2px] bg-green-500 rounded-full animate-[eq1_0.8s_ease-in-out_infinite]" />
      <span className="w-[2px] bg-green-500 rounded-full animate-[eq2_0.6s_ease-in-out_infinite]" />
      <span className="w-[2px] bg-green-500 rounded-full animate-[eq3_0.7s_ease-in-out_infinite]" />
    </div>
  );
}

export default function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [lastPlayed, setLastPlayed] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const fetchState = useRef({ time: 0, progressMs: 0 });
  const playbackRef = useRef({ isPlaying: false, durationMs: 0 });

  const fetchNowPlaying = useCallback(async () => {
    try {
      const response = await fetch("/api/spotify/now-playing", {
        cache: "no-store",
      });
      const data = await response.json();

      setNowPlaying((prev) => {
        if (prev?.title === data.title && prev?.isPlaying === data.isPlaying) return prev;
        return data;
      });

      // Remember the last song that was playing
      if (data.isPlaying && data.title) {
        setLastPlayed(data);
      }

      playbackRef.current = {
        isPlaying: data.isPlaying ?? false,
        durationMs: data.durationMs ?? 0,
      };

      if (data.progressMs && data.durationMs) {
        fetchState.current = { time: Date.now(), progressMs: data.progressMs };
        setProgress(data.progressMs / data.durationMs);
      }
    } catch (error) {
      console.error("Error fetching now playing:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const pollInterval = setInterval(fetchNowPlaying, 5000);

    const progressInterval = setInterval(() => {
      const { isPlaying, durationMs } = playbackRef.current;
      if (!isPlaying || !durationMs) return;

      const elapsed = Date.now() - fetchState.current.time;
      const currentMs = fetchState.current.progressMs + elapsed;
      setProgress(Math.min(currentMs / durationMs, 1));
    }, 500);

    return () => {
      clearInterval(pollInterval);
      clearInterval(progressInterval);
    };
  }, [fetchNowPlaying]);

  const isPlaying = nowPlaying?.isPlaying && nowPlaying?.title;
  const track = isPlaying ? nowPlaying : lastPlayed;

  if (isLoading || !track?.title) {
    return null;
  }

  const content = (
    <div className={`flex items-center gap-4 p-4 rounded-xl border border-themed max-w-md mx-auto transition-opacity ${
      !isPlaying ? "opacity-40" : ""
    }`}>
      {track.albumImageUrl && (
        <img
          src={track.albumImageUrl}
          alt={track.album || "album cover"}
          className={`w-12 h-12 rounded-lg object-cover flex-shrink-0 ${!isPlaying ? "grayscale" : ""}`}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-regular text-foreground truncate">
              {track.title}
            </p>
            <p className="text-regular text-muted truncate">
              {track.artist}
            </p>
          </div>
          {isPlaying && <Equalizer />}
        </div>
        <div className="mt-2 w-full h-[3px] rounded-full" style={{ backgroundColor: "var(--border)" }}>
          {isPlaying && (
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-linear"
              style={{
                width: `${progress * 100}%`,
                backgroundColor: "var(--foreground)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  const label = isPlaying ? "listening to..." : "recently played";

  return (
    <div className="mb-10 mt-4">
      <p className="text-regular text-muted mb-4 text-center">{label}</p>
      {track.songUrl ? (
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
