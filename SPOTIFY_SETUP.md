# Spotify API Setup Guide

This guide will help you set up the Spotify API to show your currently playing track on your website.

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create app"
4. Fill in the details:
   - **App name**: Your website name (e.g., "Josh Earle Website")
   - **App description**: "Personal website showing currently playing track"
   - **Redirect URI**: `http://localhost:3000/api/spotify/callback` (for local development)
   - **Website**: Your website URL
5. Accept the terms and click "Save"

## Step 2: Get Your Credentials

1. In your app dashboard, you'll see:
   - **Client ID** - Copy this
   - **Client Secret** - Click "View client secret" and copy it

## Step 3: Get Your Refresh Token

You need to authorize your app and get a refresh token. Here's how:

### Option A: Using a Script (Recommended)

1. Create a file called `get-refresh-token.js` in your project root:

```javascript
const querystring = require('querystring');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'http://localhost:3000/api/spotify/callback';

// Step 1: Get authorization URL
const scopes = 'user-read-currently-playing user-read-playback-state';
const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
  response_type: 'code',
  client_id: clientId,
  redirect_uri: redirectUri,
  scope: scopes,
})}`;

console.log('Visit this URL to authorize:');
console.log(authUrl);
console.log('\nAfter authorizing, you\'ll be redirected. Copy the "code" parameter from the URL.');
```

2. Run: `node get-refresh-token.js`
3. Visit the URL it prints
4. Authorize the app
5. You'll be redirected to a URL like: `http://localhost:3000/api/spotify/callback?code=...`
6. Copy the `code` parameter from the URL

### Option B: Manual Authorization

1. Visit this URL (replace YOUR_CLIENT_ID):
```
https://accounts.spotify.com/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/api/spotify/callback&scope=user-read-currently-playing%20user-read-playback-state
```

2. Authorize the app
3. You'll be redirected to a URL with a `code` parameter
4. Copy that code

### Exchange Code for Refresh Token

Once you have the authorization code, exchange it for a refresh token:

1. Create a file `exchange-token.js`:

```javascript
const querystring = require('querystring');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'http://localhost:3000/api/spotify/callback';
const code = 'PASTE_YOUR_CODE_HERE'; // From the redirect URL

const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${authString}`,
  },
  body: querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Refresh Token:', data.refresh_token);
    console.log('\nAdd this to your .env.local file as SPOTIFY_REFRESH_TOKEN');
  })
  .catch(error => console.error('Error:', error));
```

2. Run: `node exchange-token.js`
3. Copy the refresh token it prints

## Step 4: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   SPOTIFY_CLIENT_ID=your_actual_client_id
   SPOTIFY_CLIENT_SECRET=your_actual_client_secret
   SPOTIFY_REFRESH_TOKEN=your_actual_refresh_token
   ```

## Step 5: Test It Out

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Make sure Spotify is playing a song on your account
3. Visit your website - you should see the "Now Playing" section!

## Troubleshooting

- **"Failed to refresh token"**: Make sure your refresh token is correct and hasn't expired
- **"No track currently playing"**: Make sure Spotify is actively playing a song
- **CORS errors**: Make sure your redirect URI matches exactly what you set in the Spotify dashboard

## Production Setup

For production, you'll need to:

1. Add your production redirect URI to your Spotify app settings:
   - Go to your app in the Spotify dashboard
   - Add: `https://yourdomain.com/api/spotify/callback`
   - Update `NEXT_PUBLIC_BASE_URL` in your `.env.local` to your production URL

2. Make sure your environment variables are set in your hosting platform (Vercel, Netlify, etc.)


