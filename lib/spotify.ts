export interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function getNowPlaying(): Promise<NowPlayingData> {
  try {
    const access_token = await getAccessToken();

    const nowPlayingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status === 404) {
      return { isPlaying: false };
    }

    if (!nowPlayingResponse.ok) {
      return { isPlaying: false };
    }

    const data = await nowPlayingResponse.json();

    return {
      isPlaying: data.is_playing,
      title: data.item?.name,
      artist: data.item?.artists?.map((artist: any) => artist.name).join(", "),
      album: data.item?.album?.name,
      albumImageUrl: data.item?.album?.images?.[0]?.url,
      songUrl: data.item?.external_urls?.spotify,
      progressMs: data.progress_ms,
      durationMs: data.item?.duration_ms,
    };
  } catch {
    return { isPlaying: false };
  }
}
