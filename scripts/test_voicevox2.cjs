const https = require('https');

https.get('https://api.tts.quest/v3/voicevox/synthesis?text=こんにちは&speaker=3', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('mp3DownloadUrl:', json.mp3DownloadUrl);
    console.log('wavDownloadUrl:', json.wavDownloadUrl);
    
    // Check if mp3DownloadUrl returns 404 immediately
    https.get(json.mp3DownloadUrl, (mp3Res) => {
      console.log('MP3 Status:', mp3Res.statusCode);
      
      // Also check status JSON
      https.get(json.audioStatusUrl, (statusRes) => {
        let sData = '';
        statusRes.on('data', c => sData += c);
        statusRes.on('end', () => {
          console.log('Status JSON:', sData);
        });
      });
    });
  });
});
