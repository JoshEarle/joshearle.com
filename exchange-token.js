#!/usr/bin/env node

const querystring = require('querystring');

// Get values from command line arguments
const clientId = process.argv[2];
const clientSecret = process.argv[3];
const code = process.argv[4];

if (!clientId || !clientSecret || !code) {
  console.log('Usage: node exchange-token.js CLIENT_ID CLIENT_SECRET AUTHORIZATION_CODE');
  console.log('\nExample:');
  console.log('node exchange-token.js abc123 xyz789 AQAbc123...');
  process.exit(1);
}

const redirectUri = 'http://localhost:3000/api/spotify/callback';
const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

console.log('Exchanging authorization code for refresh token...\n');

fetch('https://accounts.spotify.com/api/token', {
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
})
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`HTTP ${response.status}: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
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
  })
  .catch(error => {
    console.error('\n❌ Error:', error.message);
    console.log('\nMake sure:');
    console.log('- Your Client ID and Secret are correct');
    console.log('- Your authorization code is correct');
    console.log('- You copied the entire code (it can be long)');
  });

