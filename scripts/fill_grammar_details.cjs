const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/grammarData.ts');
let dataContent = fs.readFileSync(dataPath, 'utf-8');

const additions = {
  g4: {
    barColor: 'bg-purple-500',
    structure: 'N は A じゃありません',
    structureDetails: 'Danh từ + は + Tính từ đuôi な (bỏ な) + じゃありません',
    explanationTitle: 'N không [tính chất] A',
    explanationDetails: 'Tính từ đuôi な (Phủ định)',
    usage: 'Phủ định tính chất của sự vật bằng tính từ đuôi na.',
    note: 'Dùng trong hội thoại thông thường. Trang trọng hơn dùng では ありません.',
    memoryTip: 'Tính từ đuôi な cũng giống Danh từ, khi phủ định cứ thêm "じゃありません" vào sau là xong.',
    commonWords: 'Tương tự khẳng định: 好き, きれい, 有名, 静か, 暇...'
  },
  g5: {
    barColor: 'bg-pink-500',
    structure: 'とても / すこし + A',
    structureDetails: 'Trạng từ + Tính từ',
    explanationTitle: 'Rất / Một chút',
    explanationDetails: 'Trạng từ chỉ mức độ',
    usage: 'Nhấn mạnh mức độ của tính từ. Dùng với câu khẳng định.',
    note: 'とても (rất) chỉ mức độ cao, すこし (một chút) chỉ mức độ thấp.',
    memoryTip: 'Hai từ này luôn đứng trước tính từ và luôn đi với câu mang nghĩa Khẳng định (です).',
    commonWords: 'Thường đi với các tính từ chỉ cảm xúc, cảm giác, tính chất.'
  },
  g6: {
    barColor: 'bg-orange-500',
    structure: 'あまり + A (phủ định)',
    structureDetails: 'あまり + Tính từ chia ở dạng phủ định (くない / じゃありません)',
    explanationTitle: 'Không ... lắm',
    explanationDetails: 'Trạng từ chỉ mức độ phủ định',
    usage: 'Phủ định một phần mức độ của tính chất.',
    note: 'Luôn luôn đi kèm với thể phủ định ở cuối câu.',
    memoryTip: 'Cứ thấy あまり (amari) thì nhắm mắt cũng biết đuôi câu phải là phủ định (nai / masen).',
    commonWords: 'Thường gặp trong câu đánh giá: không ngon lắm, không đắt lắm, không khó lắm...'
  },
  g7: {
    barColor: 'bg-blue-500',
    structure: 'N1 に N2 が あります/います',
    structureDetails: 'Địa điểm + に + Danh từ + が + あります/います',
    explanationTitle: 'Ở N1 có N2',
    explanationDetails: 'Sự tồn tại / Hiện diện',
    usage: 'Diễn tả sự tồn tại của sự vật (があります) hoặc con người/động vật (がいます) ở một địa điểm cụ thể.',
    note: 'があります dùng cho vật vô tri vô giác, thực vật. がいます dùng cho sinh vật (người, động vật).',
    memoryTip: 'Nhớ cặp bài trùng: "Địa điểm" đi với trợ từ "に", "Chủ thể" đi với trợ từ "が".',
    commonWords: 'Từ chỉ vị trí: 上 (trên), 下 (dưới), 前 (trước), 後ろ (sau), 中 (trong), 外 (ngoài)...'
  }
};

for (const [gId, details] of Object.entries(additions)) {
  const gIdPattern = new RegExp(`(id:\\s*'${gId}'.*?iconColor:\\s*'[^']+',)(\\s*relatedGrammars:)`, 's');
  
  dataContent = dataContent.replace(gIdPattern, (match, p1, p2) => {
    const fields = `
            barColor: '${details.barColor}',
            structure: '${details.structure}',
            structureDetails: '${details.structureDetails}',
            explanationTitle: '${details.explanationTitle}',
            explanationDetails: '${details.explanationDetails}',
            usage: '${details.usage}',
            note: '${details.note}',
            memoryTip: '${details.memoryTip}',
            commonWords: '${details.commonWords}',`;
    return p1 + fields + p2;
  });
}

fs.writeFileSync(dataPath, dataContent, 'utf-8');
console.log('Successfully injected grammar details!');
