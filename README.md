# Josh Earle - Personal Website

A simple, minimalist personal website inspired by clean design principles.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your website.

## Customization

Edit the following files to customize your website:

- `app/page.tsx` - Main page content (name, about section, blog posts)
- `app/globals.css` - Global styles and colors
- `app/layout.tsx` - Page metadata and layout structure

## Features

- Dark theme matching minimalist aesthetic
- Responsive design for mobile and desktop
- Clean typography and spacing
- Easy to customize content sections
- Spotify integration to show currently playing track

## Environment Variables

This project uses environment variables for Spotify API credentials. **Never commit your actual credentials to GitHub!**

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Fill in your Spotify credentials in `.env.local`

3. The `.env.local` file is already in `.gitignore` and will **never** be committed to version control

See `SPOTIFY_SETUP.md` for detailed instructions on setting up Spotify API credentials.

## Security Note

- ✅ `.env.local` is in `.gitignore` - your credentials are safe
- ✅ Only the example file (`env.example`) is shared publicly
- ✅ Each person using this project needs their own Spotify app credentials
- ⚠️ Never share your actual credentials publicly or commit them to Git

