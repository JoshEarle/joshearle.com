#!/usr/bin/env node

const readline = require('readline');
const querystring = require('querystring');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get Client ID from command line argument or ask for it
const clientId = process.argv[2];

if (!clientId) {
  console.log('Usage: node get-refresh-token.js YOUR_CLIENT_ID');
  console.log('\nOr I can ask you for it...\n');
  
  rl.question('Enter your Spotify Client ID: ', (id) => {
    rl.question('Enter your Spotify Client Secret: ', (secret) => {
      startProcess(id, secret);
    });
  });
} else {
  rl.question('Enter your Spotify Client Secret: ', (secret) => {
    startProcess(clientId, secret);
  });
}

function startProcess(clientId, clientSecret) {
  const redirectUri = 'http://localhost:3000/api/spotify/callback';
  const scopes = 'user-read-currently-playing user-read-playback-state';
  
  const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes,
  })}`;

  console.log('\n========================================');
  console.log('STEP 1: Authorize the app');
  console.log('========================================\n');
  console.log('Opening this URL in your browser...');
  console.log(authUrl);
  console.log('\n1. Click "Agree" to authorize');
  console.log('2. You\'ll be redirected (the page might show an error - that\'s OK!)');
  console.log('3. Copy the ENTIRE URL from your browser\'s address bar');
  console.log('\nWaiting for you to paste the redirect URL...\n');

  // Try to open browser (works on Mac/Linux)
  const { exec } = require('child_process');
  exec(`open "${authUrl}"` || `xdg-open "${authUrl}"` || `start "${authUrl}"`, (error) => {
    if (error) {
      console.log('Could not open browser automatically. Please copy and paste the URL above into your browser.\n');
    }
  });

  rl.question('Paste the redirect URL here: ', async (redirectUrl) => {
    try {
      // Extract code from URL
      const urlObj = new URL(redirectUrl);
      const code = urlObj.searchParams.get('code');
      
      if (!code) {
        console.error('\n❌ Could not find authorization code in URL.');
        console.log('Make sure you copied the entire URL including the "code=" part.');
        rl.close();
        return;
      }

      console.log('\n========================================');
      console.log('STEP 2: Exchanging code for refresh token');
      console.log('========================================\n');
      console.log('Please wait...\n');

      // Exchange code for refresh token
      const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${authString}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('❌ Error:', error);
        rl.close();
        return;
      }

      const data = await response.json();
      
      console.log('========================================');
      console.log('✅ SUCCESS!');
      console.log('========================================\n');
      console.log('Your Refresh Token:');
      console.log(data.refresh_token);
      console.log('\n========================================\n');
      console.log('Next steps:');
      console.log('1. Copy the refresh token above');
      console.log('2. Open the file: .env.local');
      console.log('3. Paste it as: SPOTIFY_REFRESH_TOKEN=paste_token_here');
      console.log('4. Also add:');
      console.log(`   SPOTIFY_CLIENT_ID=${clientId}`);
      console.log(`   SPOTIFY_CLIENT_SECRET=${clientSecret}`);
      console.log('5. Save the file and restart your server (npm run dev)\n');
      
      rl.close();
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      rl.close();
    }
  });
}

