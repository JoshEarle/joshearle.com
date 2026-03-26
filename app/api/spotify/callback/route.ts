import { NextRequest, NextResponse } from "next/server";

const REDIRECT_URI = "http://127.0.0.1:3000/api/spotify/callback";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    // Step 1: Redirect to Spotify auth
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json(
        { error: "Set SPOTIFY_CLIENT_ID in .env.local first" },
        { status: 500 }
      );
    }

    const scopes = "user-read-currently-playing user-read-playback-state";
    const redirectUri = REDIRECT_URI;

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scopes);

    return NextResponse.redirect(authUrl.toString());
  }

  // Step 2: Exchange code for tokens
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local" },
      { status: 500 }
    );
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: "Token exchange failed", details: err }, { status: 500 });
  }

  const data = await response.json();

  return new NextResponse(
    `<html><body style="font-family:monospace;padding:40px;background:#0a0a0a;color:#e5e5e5">
      <h2>Got it! Add this to your .env.local:</h2>
      <pre style="background:#1a1a1a;padding:20px;border-radius:8px;margin-top:16px">SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</pre>
      <p style="margin-top:16px;color:#71717a">Then restart your dev server. You can delete this callback route after.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
