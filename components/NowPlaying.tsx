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

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 text-muted">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
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

function useAlbumColors(imageUrl?: string): [string | null, string | null] {
  const [colors, setColors] = useState<[string | null, string | null]>([null, null]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current!;
      const size = 16;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      const pixels: [number, number, number][] = [];
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const brightness = r + g + b;
        if (brightness > 80) pixels.push([r, g, b]);
      }

      if (pixels.length < 2) {
        setColors([null, null]);
        return;
      }

      pixels.sort((a, b) => {
        const satA = Math.max(...a) - Math.min(...a);
        const satB = Math.max(...b) - Math.min(...b);
        return satB - satA;
      });

      const c1 = pixels[0];
      const c2 = pixels[Math.floor(pixels.length / 2)];

      setColors([`${c1[0]}, ${c1[1]}, ${c1[2]}`, `${c2[0]}, ${c2[1]}, ${c2[2]}`]);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  return colors;
}

export default function NowPlaying({ initialData }: { initialData?: NowPlayingData }) {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(initialData || null);
  const [lastPlayed, setLastPlayed] = useState<NowPlayingData | null>(
    initialData?.title ? initialData : null
  );
  const [isLoading, setIsLoading] = useState(!initialData);
  const [progress, setProgress] = useState(0);
  const fetchState = useRef({ time: 0, progressMs: 0 });
  const playbackRef = useRef({ isPlaying: false, durationMs: 0 });

  const isPlaying = nowPlaying?.isPlaying && nowPlaying?.title;
  const track = isPlaying ? nowPlaying : lastPlayed;
  const [color1, color2] = useAlbumColors(track?.albumImageUrl);

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

      if (data.isPlaying && data.title) {
        setLastPlayed(data);
        try { localStorage.setItem("lastPlayedTrack", JSON.stringify(data)); } catch {}
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

  if (!track?.title) {
    return null;
  }

  const hasColors = color1 && color2;
  const label = isPlaying ? "what i'm listening to right now" : "recently played";

  const content = (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-themed max-w-md mx-auto">
      {track.albumImageUrl && (
        <img
          src={track.albumImageUrl}
          alt={track.album || "album cover"}
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
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
          {isPlaying ? <Equalizer /> : <PauseIcon />}
        </div>
        <div className="mt-2 w-full h-[3px] rounded-full" style={{ backgroundColor: "var(--border)" }}>
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-linear"
            style={{
              width: isPlaying ? `${progress * 100}%` : "100%",
              background: isPlaying && hasColors
                ? `linear-gradient(90deg, rgb(${color1}), rgb(${color2}))`
                : "var(--border)",
              backgroundSize: isPlaying ? "200% 100%" : "100% 100%",
              animation: isPlaying && hasColors ? "gradientShift 3s ease-in-out infinite" : "none",
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-10 mt-4">
      <p className="text-regular text-muted mb-4 text-center">{label}</p>
      {track.songUrl ? (
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
