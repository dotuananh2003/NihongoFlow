const https = require('https');

https.get('https://api.tts.quest/v3/voicevox/synthesis?text=こんにちは&speaker=3', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', data);
  });
}).on('error', err => console.log('Error:', err.message));
