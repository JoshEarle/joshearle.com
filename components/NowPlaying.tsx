"use client";

import { useState, useEffect } from "react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify/now-playing");
        const data = await response.json();
        setNowPlaying(data);
      } catch (error) {
        console.error("Error fetching now playing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchNowPlaying();

    // Poll every 10 seconds
    const interval = setInterval(fetchNowPlaying, 10000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!nowPlaying?.isPlaying || !nowPlaying.title) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 className="text-medium mb-4">Now Playing</h2>
      <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        {nowPlaying.albumImageUrl && (
          <img
            src={nowPlaying.albumImageUrl}
            alt={nowPlaying.album || "Album cover"}
            className="w-16 h-16 rounded object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-regular text-gray-600 dark:text-gray-400">Live on Spotify</p>
          </div>
          {nowPlaying.songUrl ? (
            <a
              href={nowPlaying.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:underline"
            >
              <p className="text-regular text-gray-900 dark:text-white truncate">
                {nowPlaying.title}
              </p>
            </a>
          ) : (
            <p className="text-regular text-gray-900 dark:text-white truncate">
              {nowPlaying.title}
            </p>
          )}
          <p className="text-regular text-gray-600 dark:text-gray-400 truncate">
            {nowPlaying.artist}
          </p>
        </div>
      </div>
    </div>
  );
}


