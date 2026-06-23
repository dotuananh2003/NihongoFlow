const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'YOUR_API_KEY_HERE';

const keywordMap = {
  a: 'Apple', i: 'Needle', u: 'UFO', e: 'Eagle', o: 'Orange',
  ka: 'Kite', ki: 'Key', ku: 'Cuckoo', ke: 'Keg', ko: 'Coin',
  sa: 'Sun', shi: 'Ship', su: 'Suit', se: 'Seat', so: 'Socks',
  ta: 'Tower', chi: 'Cheetah', tsu: 'Tsunami', te: 'Tent', to: 'Tomato',
  na: 'Nail', ni: 'Needle', nu: 'Noodle', ne: 'Nest', no: 'Nose',
  ha: 'Hat', hi: 'Hill', fu: 'Fuji', he: 'Head', ho: 'Horse',
  ma: 'Mask', mi: 'Milk', mu: 'Mug', me: 'Melon', mo: 'Monkey',
  ya: 'Yacht', yu: 'U-turn', yo: 'Yo-yo',
  ra: 'Rabbit', ri: 'Ribbon', ru: 'Ruby', re: 'Rest', ro: 'Robot',
  wa: 'Wand', wo: 'Wolf', n: 'End'
};

const hiraganaChars = [
  { jp: 'あ', r: 'a' }, { jp: 'い', r: 'i' }, { jp: 'う', r: 'u' }, { jp: 'え', r: 'e' }, { jp: 'お', r: 'o' },
  { jp: 'か', r: 'ka' }, { jp: 'き', r: 'ki' }, { jp: 'く', r: 'ku' }, { jp: 'け', r: 'ke' }, { jp: 'こ', r: 'ko' },
  { jp: 'さ', r: 'sa' }, { jp: 'し', r: 'shi' }, { jp: 'す', r: 'su' }, { jp: 'せ', r: 'se' }, { jp: 'そ', r: 'so' },
  { jp: 'た', r: 'ta' }, { jp: 'ち', r: 'chi' }, { jp: 'つ', r: 'tsu' }, { jp: 'て', r: 'te' }, { jp: 'と', r: 'to' },
  { jp: 'な', r: 'na' }, { jp: 'に', r: 'ni' }, { jp: 'ぬ', r: 'nu' }, { jp: 'ね', r: 'ne' }, { jp: 'の', r: 'no' },
  { jp: 'は', r: 'ha' }, { jp: 'ひ', r: 'hi' }, { jp: 'ふ', r: 'fu' }, { jp: 'へ', r: 'he' }, { jp: 'ほ', r: 'ho' },
  { jp: 'ま', r: 'ma' }, { jp: 'み', r: 'mi' }, { jp: 'む', r: 'mu' }, { jp: 'め', r: 'me' }, { jp: 'も', r: 'mo' },
  { jp: 'や', r: 'ya' }, { jp: 'ゆ', r: 'yu' }, { jp: 'よ', r: 'yo' },
  { jp: 'ら', r: 'ra' }, { jp: 'り', r: 'ri' }, { jp: 'る', r: 'ru' }, { jp: 'れ', r: 're' }, { jp: 'ろ', r: 'ro' },
  { jp: 'わ', r: 'wa' }, { jp: 'を', r: 'wo' }, { jp: 'ん', r: 'n' }
];

const katakanaChars = [
  { jp: 'ア', r: 'a' }, { jp: 'イ', r: 'i' }, { jp: 'ウ', r: 'u' }, { jp: 'エ', r: 'e' }, { jp: 'オ', r: 'o' },
  { jp: 'カ', r: 'ka' }, { jp: 'キ', r: 'ki' }, { jp: 'ク', r: 'ku' }, { jp: 'ケ', r: 'ke' }, { jp: 'コ', r: 'ko' },
  { jp: 'サ', r: 'sa' }, { jp: 'シ', r: 'shi' }, { jp: 'ス', r: 'su' }, { jp: 'セ', r: 'se' }, { jp: 'ソ', r: 'so' },
  { jp: 'タ', r: 'ta' }, { jp: 'チ', r: 'chi' }, { jp: 'ツ', r: 'tsu' }, { jp: 'テ', r: 'te' }, { jp: 'ト', r: 'to' },
  { jp: 'ナ', r: 'na' }, { jp: 'ニ', r: 'ni' }, { jp: 'ヌ', r: 'nu' }, { jp: 'ネ', r: 'ne' }, { jp: 'ノ', r: 'no' },
  { jp: 'ハ', r: 'ha' }, { jp: 'ヒ', r: 'hi' }, { jp: 'フ', r: 'fu' }, { jp: 'ヘ', r: 'he' }, { jp: 'ホ', r: 'ho' },
  { jp: 'マ', r: 'ma' }, { jp: 'ミ', r: 'mi' }, { jp: 'ム', r: 'mu' }, { jp: 'メ', r: 'me' }, { jp: 'モ', r: 'mo' },
  { jp: 'ヤ', r: 'ya' }, { jp: 'ユ', r: 'yu' }, { jp: 'ヨ', r: 'yo' },
  { jp: 'ラ', r: 'ra' }, { jp: 'リ', r: 'ri' }, { jp: 'ル', r: 'ru' }, { jp: 'レ', r: 're' }, { jp: 'ロ', r: 'ro' },
  { jp: 'ワ', r: 'wa' }, { jp: 'ヲ', r: 'wo' }, { jp: 'ン', r: 'n' }
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function generateDalleImage(prompt) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    })
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.data[0].url;
}

async function run() {
  const systems = [
    { name: 'hiragana', chars: hiraganaChars },
    { name: 'katakana', chars: katakanaChars }
  ];

  for (const sys of systems) {
    const dir = path.join(__dirname, 'public', 'mnemonics', sys.name);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    for (const char of sys.chars) {
      const dest = path.join(dir, `${char.r}.png`);
      if (fs.existsSync(dest)) {
        console.log(`Skipping ${sys.name} ${char.r}, already exists.`);
        continue;
      }

      const keyword = keywordMap[char.r] || 'Object';
      const prompt = `A high-quality 3D rendered app icon style illustration of a ${keyword}. The Japanese kana character ${char.jp} is boldly integrated onto the object. Vibrant colors, smooth soft lighting, claymorphism style, white background`;

      console.log(`Generating ${sys.name} ${char.r}...`);
      try {
        const url = await generateDalleImage(prompt);
        console.log(`Downloading ${url}...`);
        await downloadImage(url, dest);
        console.log(`Saved ${dest}`);
        // Wait 12 seconds to avoid rate limits (Tier 1 is 5 images/min)
        console.log("Waiting 12 seconds for rate limit...");
        await delay(12000);
      } catch (err) {
        console.error(`Error generating ${char.r}:`, err.message);
        console.log("Waiting 30 seconds before retrying...");
        await delay(30000); // Wait longer on error
      }
    }
  }
  console.log("ALL DONE!");
}

run();
