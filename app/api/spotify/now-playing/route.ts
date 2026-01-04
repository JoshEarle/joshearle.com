import { NextResponse } from "next/server";

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
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

export async function GET() {
  try {
    // Get access token
    const access_token = await getAccessToken();

    // Get currently playing track
    const nowPlayingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status === 404) {
      // No track currently playing
      return NextResponse.json({ isPlaying: false });
    }

    if (!nowPlayingResponse.ok) {
      throw new Error("Failed to fetch now playing");
    }

    const data = await nowPlayingResponse.json();

    return NextResponse.json({
      isPlaying: data.is_playing,
      title: data.item?.name,
      artist: data.item?.artists?.map((artist: any) => artist.name).join(", "),
      album: data.item?.album?.name,
      albumImageUrl: data.item?.album?.images?.[0]?.url,
      songUrl: data.item?.external_urls?.spotify,
    });
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return NextResponse.json(
      { error: "Failed to fetch now playing" },
      { status: 500 }
    );
  }
}

