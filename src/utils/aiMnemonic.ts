// src/utils/aiMnemonic.ts

const keywordMap: Record<string, { keyword: string; meaning: string; phonetic?: string, emoji?: string }> = {
  a: { keyword: 'Apple', meaning: 'Quả táo', phonetic: "/'æ.pəl/", emoji: '🍎' },
  i: { keyword: 'Needle', meaning: 'Cây kim', phonetic: "/'ni:.dəl/", emoji: '🪡' },
  u: { keyword: 'UFO', meaning: 'Đĩa bay', phonetic: "/ˌjuː.ef'oʊ/", emoji: '🛸' },
  e: { keyword: 'Eagle', meaning: 'Đại bàng', phonetic: "/'i:.ɡəl/", emoji: '🦅' },
  o: { keyword: 'Orange', meaning: 'Quả cam', phonetic: "/'ɒr.ɪndʒ/", emoji: '🍊' },
  ka: { keyword: 'Kite', meaning: 'Cái diều', phonetic: "/kaɪt/", emoji: '🪁' },
  ki: { keyword: 'Key', meaning: 'Chìa khóa', phonetic: "/ki:/", emoji: '🔑' },
  ku: { keyword: 'Cuckoo', meaning: 'Chim cúc cu', phonetic: "/'kʊk.u:/", emoji: '🐦' },
  ke: { keyword: 'Keg', meaning: 'Thùng gỗ', phonetic: "/keɡ/", emoji: '🛢️' },
  ko: { keyword: 'Coin', meaning: 'Đồng xu', phonetic: "/kɔɪn/", emoji: '🪙' },
  sa: { keyword: 'Sun', meaning: 'Mặt trời', phonetic: "/sʌn/", emoji: '☀️' },
  shi: { keyword: 'Ship', meaning: 'Tàu thủy', phonetic: "/ʃɪp/", emoji: '🚢' },
  su: { keyword: 'Suit', meaning: 'Bộ vest', phonetic: "/su:t/", emoji: '👔' },
  se: { keyword: 'Seat', meaning: 'Chỗ ngồi', phonetic: "/si:t/", emoji: '💺' },
  so: { keyword: 'Socks', meaning: 'Đôi tất', phonetic: "/sɒks/", emoji: '🧦' },
  ta: { keyword: 'Tower', meaning: 'Tòa tháp', phonetic: "/'taʊ.ər/", emoji: '🗼' },
  chi: { keyword: 'Cheetah', meaning: 'Báo đốm', phonetic: "/'tʃi:.tə/", emoji: '🐆' },
  tsu: { keyword: 'Tsunami', meaning: 'Sóng thần', phonetic: "/tsu:'nɑ:.mi/", emoji: '🌊' },
  te: { keyword: 'Tent', meaning: 'Cái lều', phonetic: "/tent/", emoji: '⛺' },
  to: { keyword: 'Tomato', meaning: 'Cà chua', phonetic: "/tə'mɑ:.toʊ/", emoji: '🍅' },
  na: { keyword: 'Nail', meaning: 'Cây đinh', phonetic: "/neɪl/", emoji: '🔩' },
  ni: { keyword: 'Needle', meaning: 'Cây kim', phonetic: "/'ni:.dəl/", emoji: '🪡' },
  nu: { keyword: 'Noodle', meaning: 'Sợi mì', phonetic: "/'nu:.dəl/", emoji: '🍜' },
  ne: { keyword: 'Nest', meaning: 'Cái tổ', phonetic: "/nest/", emoji: '🪹' },
  no: { keyword: 'Nose', meaning: 'Cái mũi', phonetic: "/noʊz/", emoji: '👃' },
  ha: { keyword: 'Hat', meaning: 'Cái mũ', phonetic: "/hæt/", emoji: '🎩' },
  hi: { keyword: 'Hill', meaning: 'Ngọn đồi', phonetic: "/hɪl/", emoji: '⛰️' },
  fu: { keyword: 'Fuji', meaning: 'Núi Phú Sĩ', phonetic: "/'fu:.dʒi/", emoji: '🗻' },
  he: { keyword: 'Head', meaning: 'Cái đầu', phonetic: "/hed/", emoji: '🗣️' },
  ho: { keyword: 'Horse', meaning: 'Con ngựa', phonetic: "/hɔ:rs/", emoji: '🐎' },
  ma: { keyword: 'Mask', meaning: 'Mặt nạ', phonetic: "/mæsk/", emoji: '🎭' },
  mi: { keyword: 'Milk', meaning: 'Sữa', phonetic: "/mɪlk/", emoji: '🥛' },
  mu: { keyword: 'Mug', meaning: 'Cái cốc', phonetic: "/mʌɡ/", emoji: '☕' },
  me: { keyword: 'Melon', meaning: 'Dưa lưới', phonetic: "/'mel.ən/", emoji: '🍈' },
  mo: { keyword: 'Monkey', meaning: 'Con khỉ', phonetic: "/'mʌŋ.ki/", emoji: '🐒' },
  ya: { keyword: 'Yacht', meaning: 'Du thuyền', phonetic: "/jɒt/", emoji: '🛥️' },
  yu: { keyword: 'U-turn', meaning: 'Khúc cua U', phonetic: "/'ju:.tɜ:rn/", emoji: '↩️' },
  yo: { keyword: 'Yo-yo', meaning: 'Đồ chơi yoyo', phonetic: "/'joʊ.joʊ/", emoji: '🪀' },
  ra: { keyword: 'Rabbit', meaning: 'Con thỏ', phonetic: "/'ræb.ɪt/", emoji: '🐇' },
  ri: { keyword: 'Ribbon', meaning: 'Ruy băng', phonetic: "/'rɪb.ən/", emoji: '🎀' },
  ru: { keyword: 'Ruby', meaning: 'Đá ruby', phonetic: "/'ru:.bi/", emoji: '💎' },
  re: { keyword: 'Rest', meaning: 'Nghỉ ngơi', phonetic: "/rest/", emoji: '🛌' },
  ro: { keyword: 'Robot', meaning: 'Người máy', phonetic: "/'roʊ.bɒt/", emoji: '🤖' },
  wa: { keyword: 'Wand', meaning: 'Đũa phép', phonetic: "/wɒnd/", emoji: '🪄' },
  wo: { keyword: 'Wolf', meaning: 'Con sói', phonetic: "/wʊlf/", emoji: '🐺' },
  n: { keyword: 'End', meaning: 'Kết thúc', phonetic: "/end/", emoji: '🛑' }
};

export interface AiMnemonicData {
  keyword: string;
  meaning: string;
  phonetic: string;
  prompt: string;
  imageUrl: string;
  emoji?: string;
}

export function getAiMnemonic(system: string, kana: string, romaji: string): AiMnemonicData {
  let keyword = '';
  let meaning = '';
  let phonetic = '';
  let emoji = '🔮';

  const rLower = romaji.toLowerCase();
  
  if (keywordMap[rLower]) {
    keyword = keywordMap[rLower].keyword;
    meaning = keywordMap[rLower].meaning;
    phonetic = keywordMap[rLower].phonetic || '';
    emoji = keywordMap[rLower].emoji || emoji;
  } else {
    // Tự sinh keyword cho các chữ không có trong map (Ví dụ: ga -> Game)
    keyword = rLower.charAt(0).toUpperCase() + rLower.slice(1) + ' Object';
    meaning = `Đồ vật bắt đầu bằng ${rLower}`;
    phonetic = `/${rLower}/`;
  }

  // Prompt theo nguyên tắc yêu cầu
  const safePrompt = `A high-quality 3D rendered app icon style illustration of a ${keyword}. The Japanese kana character ${kana} is boldly integrated onto the object. Vibrant colors, smooth soft lighting, claymorphism style, white background`;
  
  // URL Pollinations sinh ảnh từ prompt
  const imageUrl = `/mnemonics/${system}/${rLower}.png`;

  return {
    keyword,
    meaning,
    phonetic,
    prompt: safePrompt,
    imageUrl,
    emoji,
  };
}
