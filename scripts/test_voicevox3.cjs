const https = require('https');

const uniqueText = "おはようございます" + Math.random();

https.get(`https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(uniqueText)}&speaker=3`, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('API Response:', json);
    
    https.get(json.mp3DownloadUrl, (mp3Res) => {
      console.log('MP3 Download Status immediately:', mp3Res.statusCode);
      console.log('MP3 Headers:', mp3Res.headers);
    });
  });
});
