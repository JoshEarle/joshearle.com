# Simple Spotify Setup Guide - Step by Step

Follow these steps exactly, and you'll have your Spotify integration working in about 10 minutes!

## Step 1: Create Your Spotify App (5 minutes)

1. **Go to this website**: https://developer.spotify.com/dashboard
2. **Click "Log In"** (use your regular Spotify account)
3. **Click the green "Create app" button**
4. **Fill in the form**:
   - **App name**: `Josh Earle Website` (or whatever you want)
   - **App description**: `Personal website`
   - **Redirect URI**: Copy and paste this exactly: `http://localhost:3000/api/spotify/callback`
   - **Website**: Your website URL (or `http://localhost:3000` for now)
   - Check the box that says you agree to the terms
5. **Click "Save"**

✅ **Done!** You should now see your app with a **Client ID** and **Client Secret**

---

## Step 2: Copy Your Credentials (1 minute)

1. On your app page, you'll see:
   - **Client ID** - Click the copy button next to it, or select and copy it
   - **Client Secret** - Click "View client secret", then copy it

2. **Save these somewhere** (like a text file) - you'll need them in Step 4

---

## Step 3: Get Your Refresh Token (3 minutes)

This is the trickiest part, but I'll make it easy!

### Option A: Use the Helper Script (Easiest!)

1. **Open your terminal** (the black window where you run commands)
2. **Make sure you're in your project folder**: `/Users/joshearle/Josh Website`
3. **Run this command**:
   ```bash
   node get-refresh-token.js YOUR_CLIENT_ID
   ```
   (Replace `YOUR_CLIENT_ID` with the Client ID you copied in Step 2)

4. **A website will open** - Click "Agree" to authorize
5. **You'll be redirected** - Copy the ENTIRE URL from your browser's address bar
6. **Paste it when the script asks** - It will give you your refresh token!

### Option B: Manual Method (If script doesn't work)

1. **Open this URL in your browser** (replace `YOUR_CLIENT_ID` with your actual Client ID):
   ```
   https://accounts.spotify.com/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/api/spotify/callback&scope=user-read-currently-playing%20user-read-playback-state
   ```

2. **Click "Agree"** to authorize the app

3. **You'll be redirected** to a page that says "Invalid redirect URI" - that's OK! Look at the URL in your browser's address bar. It will look like:
   ```
   http://localhost:3000/api/spotify/callback?code=ABC123XYZ...
   ```

4. **Copy the code part** - It's everything after `code=` and before `&` (if there is one)

5. **Run this command** (replace the values):
   ```bash
   node exchange-token.js YOUR_CLIENT_ID YOUR_CLIENT_SECRET YOUR_CODE
   ```

6. **Copy the refresh token** it gives you

---

## Step 4: Add Credentials to Your Website (2 minutes)

1. **In your project folder**, look for a file called `env.example`
2. **Copy it** and rename the copy to `.env.local`
   - On Mac: Right-click → Duplicate, then rename to `.env.local`
   - Or in terminal: `cp env.example .env.local`

3. **Open `.env.local`** in a text editor

4. **Replace the placeholder text** with your actual values:
   ```
   SPOTIFY_CLIENT_ID=paste_your_client_id_here
   SPOTIFY_CLIENT_SECRET=paste_your_client_secret_here
   SPOTIFY_REFRESH_TOKEN=paste_your_refresh_token_here
   ```

5. **Save the file**

---

## Step 5: Test It! (1 minute)

1. **Make sure Spotify is playing a song** on your computer/phone
2. **Restart your website**:
   - Stop the server (press `Ctrl+C` in terminal)
   - Start it again: `npm run dev`
3. **Visit your website** - You should see a "Now Playing" section with your song!

---

## Troubleshooting

**"Failed to refresh token"**
- Double-check your credentials in `.env.local` - no extra spaces or quotes
- Make sure you copied the refresh token correctly

**"No track currently playing"**
- Make sure Spotify is actually playing music (not paused)
- Try refreshing the page

**Can't find `.env.local`**
- Make sure you created it in the root folder (same folder as `package.json`)
- The file name starts with a dot (`.env.local`)

**Need help?** Just ask! I can help you through any step.

