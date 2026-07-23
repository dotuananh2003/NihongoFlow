const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/grammarData.ts');
let dataContent = fs.readFileSync(dataPath, 'utf-8');

const additions = {
  g1: [
    { name: 'N は Aい N です', meaning: 'Tính từ i bổ nghĩa cho danh từ', example: { japanese: 'これは新しい本です。', reading: 'これはあたらしいほんです。', romaji: 'kore wa atarashii hon desu.', vietnamese: 'Đây là cuốn sách mới.' } },
    { name: 'N は Aかった です', meaning: 'Khẳng định trong quá khứ', example: { japanese: '昨日は寒かったです。', reading: 'きのうはさむかったです。', romaji: 'kinou wa samukatta desu.', vietnamese: 'Hôm qua trời lạnh.' } }
  ],
  g2: [
    { name: 'N は Aくありません', meaning: 'Cách nói lịch sự, trang trọng hơn', example: { japanese: 'このお茶は熱くありません。', reading: 'このおちゃはあつくありません。', romaji: 'kono ocha wa atsuku arimasen.', vietnamese: 'Trà này không nóng.' } },
    { name: 'N は Aくなかった です', meaning: 'Phủ định trong quá khứ', example: { japanese: '昨日は寒くなかったです。', reading: 'きのうはさむくなかったです。', romaji: 'kinou wa samukunakatta desu.', vietnamese: 'Hôm qua trời không lạnh.' } }
  ],
  g3: [
    { name: 'N は Aな N です', meaning: 'Tính từ na bổ nghĩa danh từ', example: { japanese: '彼女はきれいな人です。', reading: 'かのじょはきれいなひとです。', romaji: 'kanojo wa kireina hito desu.', vietnamese: 'Cô ấy là người đẹp.' } },
    { name: 'N は Aでした', meaning: 'Khẳng định trong quá khứ', example: { japanese: '昔はこの町は静かでした。', reading: 'むかしはこのまちはしずかでした。', romaji: 'mukashi wa kono machi wa shizuka deshita.', vietnamese: 'Ngày xưa thị trấn này yên tĩnh.' } }
  ],
  g4: [
    { name: 'N は Aではありません', meaning: 'Văn viết, trang trọng hơn', example: { japanese: '彼は有名ではありません。', reading: 'かれはゆうめいではありません。', romaji: 'kare wa yuumei dewa arimasen.', vietnamese: 'Anh ấy không nổi tiếng.' } },
    { name: 'N は Aじゃありませんでした', meaning: 'Phủ định trong quá khứ', example: { japanese: '昔はこの町は静かじゃありませんでした。', reading: 'むかしはこのまちはしずかじゃありませんでした。', romaji: 'mukashi wa kono machi wa shizuka ja arimasen deshita.', vietnamese: 'Ngày xưa thị trấn này không yên tĩnh.' } }
  ],
  g5: [
    { name: 'ぜんぜん + A (phủ định)', meaning: 'Mức độ phủ định tuyệt đối (Hoàn toàn không)', example: { japanese: 'この映画はぜんぜん面白くないです。', reading: 'このえいがはぜんぜんおもしろくないです。', romaji: 'kono eiga wa zenzen omoshirokunai desu.', vietnamese: 'Bộ phim này hoàn toàn không thú vị.' } }
  ],
  g6: [
    { name: 'ぜんぜん + A (phủ định)', meaning: 'Mức độ phủ định tuyệt đối', example: { japanese: 'このテストはぜんぜん難しくないです。', reading: 'このテストはぜんぜんむずかしくないです。', romaji: 'kono tesuto wa zenzen muzukashikunai desu.', vietnamese: 'Bài kiểm tra này hoàn toàn không khó.' } }
  ],
  g7: [
    { name: 'N1 に なに が ありますか', meaning: 'Cấu trúc đặt câu hỏi', example: { japanese: '箱の中に何がありますか。', reading: 'はこのなかに何がありますか。', romaji: 'hako no naka ni nani ga arimasu ka.', vietnamese: 'Trong hộp có cái gì vậy?' } },
    { name: 'N1 に N2 や N3 が あります', meaning: 'Liệt kê một phần', example: { japanese: '机の上に本やペンがあります。', reading: 'つくえのうえにほんやペンがあります。', romaji: 'tsukue no ue ni hon ya pen ga arimasu.', vietnamese: 'Trên bàn có sách và bút (và v.v).' } }
  ]
};

for (const [gId, relatedList] of Object.entries(additions)) {
  const gIdPattern = new RegExp(`(id:\\s*'${gId}'.*?relatedGrammars:\\s*\\[)`, 's');
  
  dataContent = dataContent.replace(gIdPattern, (match, p1) => {
    const relatedStr = relatedList.map(rg => {
      return `
      {
        name: '${rg.name}',
        meaning: '${rg.meaning}',
        example: { japanese: '${rg.example.japanese}', reading: '${rg.example.reading}', romaji: '${rg.example.romaji}', vietnamese: '${rg.example.vietnamese}' }
      },`;
    }).join('');

    return p1 + relatedStr;
  });
}

fs.writeFileSync(dataPath, dataContent, 'utf-8');
console.log('Successfully injected MORE related grammars!');
