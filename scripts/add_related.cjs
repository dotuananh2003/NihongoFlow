const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/grammarData.ts');
let dataContent = fs.readFileSync(dataPath, 'utf-8');

const newRelatedData = {
  g1: [
    {
      name: 'N は N です',
      meaning: 'Miêu tả bản chất sự vật bằng Danh từ',
      example: {
        japanese: '彼は学生です。',
        reading: 'かれはがくせいです。',
        romaji: 'kare wa gakusei desu.',
        vietnamese: 'Anh ấy là học sinh.'
      }
    },
    {
      name: 'N は Aな です',
      meaning: 'Miêu tả tính chất bằng tính từ đuôi na',
      example: {
        japanese: 'その町は静かです。',
        reading: 'そのまちはしずかです。',
        romaji: 'sono machi wa shizuka desu.',
        vietnamese: 'Thị trấn đó yên tĩnh.'
      }
    }
  ],
  g2: [
    {
      name: 'N は N じゃありません',
      meaning: 'Phủ định bản chất sự vật (Danh từ)',
      example: {
        japanese: '私は医者じゃありません。',
        reading: 'わたしはいしゃじゃありません。',
        romaji: 'watashi wa isha ja arimasen.',
        vietnamese: 'Tôi không phải là bác sĩ.'
      }
    },
    {
      name: 'N は Aな じゃありません',
      meaning: 'Phủ định tính chất (Tính từ đuôi na)',
      example: {
        japanese: 'その町は静かじゃありません。',
        reading: 'そのまちはしずかじゃありません。',
        romaji: 'sono machi wa shizuka ja arimasen.',
        vietnamese: 'Thị trấn đó không yên tĩnh.'
      }
    }
  ],
  g3: [
    {
      name: 'N は Aい です',
      meaning: 'Miêu tả tính chất bằng tính từ đuôi i',
      example: {
        japanese: 'この本は新しいです。',
        reading: 'このほんはあたらしいです。',
        romaji: 'kono hon wa atarashii desu.',
        vietnamese: 'Cuốn sách này mới.'
      }
    }
  ],
  g4: [
    {
      name: 'N は Aくない です',
      meaning: 'Phủ định tính chất (Tính từ đuôi i)',
      example: {
        japanese: 'この本は新しくないです。',
        reading: 'このほんはあたらしくないです。',
        romaji: 'kono hon wa atarashikunai desu.',
        vietnamese: 'Cuốn sách này không mới.'
      }
    }
  ],
  g5: [
    {
      name: 'あまり + Aくない / じゃありません',
      meaning: 'Phủ định một phần mức độ (Không ... lắm)',
      example: {
        japanese: 'この本はあまり高くないです。',
        reading: 'このほんはあまりたかくないです。',
        romaji: 'kono hon wa amari takakunai desu.',
        vietnamese: 'Cuốn sách này không đắt lắm.'
      }
    }
  ],
  g6: [
    {
      name: 'とても + Aい / Aな',
      meaning: 'Khẳng định mức độ cao (Rất ...)',
      example: {
        japanese: 'このケーキはとても美味しいです。',
        reading: 'このケーキはとてもおいしいです。',
        romaji: 'kono keeki wa totemo oishii desu.',
        vietnamese: 'Cái bánh này rất ngon.'
      }
    },
    {
      name: '少し + Aい / Aな',
      meaning: 'Khẳng định mức độ thấp (Một chút / Hơi ...)',
      example: {
        japanese: '今日は少し暑いです。',
        reading: 'きょうはすこしあついです。',
        romaji: 'kyou wa sukoshi atsui desu.',
        vietnamese: 'Hôm nay hơi nóng.'
      }
    }
  ],
  g7: [
    {
      name: 'N1 に N2 が います',
      meaning: 'Sự tồn tại của người hoặc động vật',
      example: {
        japanese: '公園に犬がいます。',
        reading: 'こうえんにいぬがいます。',
        romaji: 'kouen ni inu ga imasu.',
        vietnamese: 'Ở công viên có con chó.'
      }
    },
    {
      name: 'N2 は N1 に あります',
      meaning: 'Nhấn mạnh vị trí của một vật thể đã xác định',
      example: {
        japanese: 'トイレはあそこにあります。',
        reading: 'トイレはあそこにあります。',
        romaji: 'toire wa asoko ni arimasu.',
        vietnamese: 'Nhà vệ sinh ở đằng kia.'
      }
    }
  ]
};

for (const [gId, relatedList] of Object.entries(newRelatedData)) {
  const gIdPattern = new RegExp(`(id:\\s*'${gId}'.*?)(examples:\\s*\\[)`, 's');
  
  dataContent = dataContent.replace(gIdPattern, (match, p1, p2) => {
    if (p1.includes('relatedGrammars:')) return match;

    const relatedStr = relatedList.map(rg => {
      return `
      {
        name: '${rg.name}',
        meaning: '${rg.meaning}',
        example: { japanese: '${rg.example.japanese}', reading: '${rg.example.reading}', romaji: '${rg.example.romaji}', vietnamese: '${rg.example.vietnamese}' }
      }`;
    }).join(',');

    return `${p1}relatedGrammars: [${relatedStr}\n    ],\n    ${p2}`;
  });
}

fs.writeFileSync(dataPath, dataContent, 'utf-8');
console.log('Successfully injected related grammars!');
