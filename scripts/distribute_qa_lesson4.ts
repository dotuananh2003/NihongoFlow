import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const grammarFile = path.join(__dirname, '../src/data/grammarData.ts');
let content = fs.readFileSync(grammarFile, 'utf8');

const qaData: Record<string, any[]> = {
  // G1: N は Aい です
  'g1': [
    {
      questionFormat: 'N は どんな N ですか',
      answerFormat: 'Aい N です',
      identifier: 'どんな (Như thế nào)',
      tip: 'Dùng để hỏi về tính chất, trạng thái của một sự vật. Câu trả lời thường dùng tính từ bổ nghĩa trực tiếp cho danh từ.',
      examples: [
        {
          japanese: '東京はどんな町ですか。\n大きい町です。',
          reading: 'とうきょうはどんなまちですか。\nおおきいまちです。',
          romaji: 'toukyou wa donna machi desu ka.\nookii machi desu.',
          vietnamese: 'Tokyo là một thành phố như thế nào?\nLà một thành phố lớn.'
        },
        {
          japanese: '富士山はどんな山ですか。\n高い山です。',
          reading: 'ふじさんはどんなやまですか。\nたかいやまです。',
          romaji: 'fujisan wa donna yama desu ka.\ntakai yama desu.',
          vietnamese: 'Núi Phú Sĩ là ngọn núi thế nào?\nLà ngọn núi cao.'
        }
      ]
    },
    {
      questionFormat: 'Aい ですか',
      answerFormat: 'はい、Aい です',
      identifier: '〜か (Có [tính chất] không)',
      tip: 'Xác nhận xem một vật có mang tính chất đó không.',
      examples: [
        {
          japanese: '日本のカメラは高いですか。\nはい、高いです。',
          reading: 'にほんのカメラはたかいですか。\nはい、たかいです。',
          romaji: 'nihon no kamera wa takai desu ka.\nhai, takai desu.',
          vietnamese: 'Máy ảnh Nhật Bản có đắt không?\nVâng, đắt.'
        }
      ]
    }
  ],
  // G2: N は Aくない です
  'g2': [
    {
      questionFormat: 'Aい ですか',
      answerFormat: 'いいえ、Aくない です',
      identifier: 'いいえ (Không, không...)',
      tip: 'Khi trả lời phủ định cho tính từ đuôi い, ta bỏ い và thêm くない.',
      examples: [
        {
          japanese: 'このカレーは辛いですか。\nいいえ、辛くないです。',
          reading: 'このカレーはからいですか。\nいいえ、からくないです。',
          romaji: 'kono karee wa karai desu ka.\niie, karakunai desu.',
          vietnamese: 'Món cà ri này có cay không?\nKhông, không cay.'
        },
        {
          japanese: 'その本は新しいですか。\nいいえ、新しくないです。',
          reading: 'そのほんはあたらしいですか。\nいいえ、あたらしくないです。',
          romaji: 'sono hon wa atarashii desu ka.\niie, atarashikunai desu.',
          vietnamese: 'Cuốn sách đó có mới không?\nKhông, không mới.'
        }
      ]
    }
  ],
  // G3: N は Aな です
  'g3': [
    {
      questionFormat: 'N は どんな N ですか',
      answerFormat: 'Aな N です',
      identifier: 'どんな (Như thế nào)',
      tip: 'Khi trả lời bằng tính từ đuôi な bổ nghĩa cho danh từ, phải giữ nguyên chữ な.',
      examples: [
        {
          japanese: '田中さんはどんな人ですか。\n親切な人です。',
          reading: 'たなかさんはどんなひとですか。\nしんせつなひとです。',
          romaji: 'tanaka san wa donna hito desu ka.\nshinsetsu na hito desu.',
          vietnamese: 'Anh Tanaka là người thế nào?\nLà một người tốt bụng.'
        },
        {
          japanese: '京都はどんな町ですか。\n静かな町です。',
          reading: 'きょうとはどんなまちですか。\nしずかなまちです。',
          romaji: 'kyouto wa donna machi desu ka.\nshizuka na machi desu.',
          vietnamese: 'Kyoto là một thành phố như thế nào?\nLà một thành phố yên tĩnh.'
        }
      ]
    },
    {
      questionFormat: 'A ですか',
      answerFormat: 'はい、A です',
      identifier: '〜か (Có [tính chất] không)',
      tip: 'Lưu ý khi hỏi và trả lời ở dạng vị ngữ, tính từ đuôi な sẽ bỏ な và đi thẳng với です.',
      examples: [
        {
          japanese: 'あなたの部屋はきれいですか。\nはい、きれいです。',
          reading: 'あなたのへやはきれいですか。\nはい、きれいです。',
          romaji: 'anata no heya wa kirei desu ka.\nhai, kirei desu.',
          vietnamese: 'Phòng của bạn có sạch đẹp không?\nVâng, sạch đẹp.'
        }
      ]
    }
  ],
  // G4: N は Aじゃありません
  'g4': [
    {
      questionFormat: 'A ですか',
      answerFormat: 'いいえ、Aじゃありません',
      identifier: 'じゃありません (Không phải là...)',
      tip: 'Khi phủ định tính từ đuôi な, ta dùng じゃありません (tương tự như phủ định danh từ).',
      examples: [
        {
          japanese: 'そのパソコンは便利ですか。\nいいえ、便利じゃありません。',
          reading: 'そのパソコンはべんりですか。\nいいえ、べんりじゃありません。',
          romaji: 'sono pasokon wa benri desu ka.\niie, benri ja arimasen.',
          vietnamese: 'Máy tính đó có tiện lợi không?\nKhông, không tiện lợi.'
        },
        {
          japanese: '駅は静かですか。\nいいえ、静かじゃありません。',
          reading: 'えきはしずかですか。\nいいえ、しずかじゃありません。',
          romaji: 'eki wa shizuka desu ka.\niie, shizuka ja arimasen.',
          vietnamese: 'Nhà ga có yên tĩnh không?\nKhông, không yên tĩnh.'
        }
      ]
    }
  ],
  // G5: とても / すこし + A
  'g5': [
    {
      questionFormat: 'N は どう ですか',
      answerFormat: 'とても / すこし A です',
      identifier: 'どう (Thế nào)',
      tip: 'Câu hỏi どうですか dùng để hỏi cảm nhận, ý kiến về một sự vật/sự việc. Có thể dùng phó từ để làm rõ mức độ.',
      examples: [
        {
          japanese: '日本の生活はどうですか。\nとても楽しいです。',
          reading: 'にほんのせいかつはどうですか。\nとてもたのしいです。',
          romaji: 'nihon no seikatsu wa dou desu ka.\ntotemo tanoshii desu.',
          vietnamese: 'Cuộc sống ở Nhật thế nào?\nRất vui.'
        },
        {
          japanese: '日本語の勉強はどうですか。\n少し難しいです。',
          reading: 'にほんごのべんきょうはどうですか。\nすこしむずかしいです。',
          romaji: 'nihongo no benkyou wa dou desu ka.\nsukoshi muzukashii desu.',
          vietnamese: 'Việc học tiếng Nhật thế nào?\nHơi khó một chút.'
        }
      ]
    }
  ],
  // G6: あまり + Aくない
  'g6': [
    {
      questionFormat: 'Aい/Aな ですか',
      answerFormat: 'いいえ、あまり Aくない/じゃありません',
      identifier: 'あまり (Không... lắm)',
      tip: 'あまり luôn đi với thể phủ định để diễn đạt mức độ "không... lắm".',
      examples: [
        {
          japanese: 'このスープは熱いですか。\nいいえ、あまり熱くないです。',
          reading: 'このスープはあついですか。\nいいえ、あまりあつくないです。',
          romaji: 'kono suupu wa atsui desu ka.\niie, amari atsukunai desu.',
          vietnamese: 'Súp này có nóng không?\nKhông, không nóng lắm.'
        },
        {
          japanese: '英語の試験は簡単でしたか。\nいいえ、あまり簡単じゃありませんでした。',
          reading: 'えいごのしけんはかんたんでしたか。\nいいえ、あまりかんたんじゃありませんでした。',
          romaji: 'eigo no shiken wa kantan deshita ka.\niie, amari kantan ja arimasen deshita.',
          vietnamese: 'Bài thi tiếng Anh có dễ không?\nKhông, không dễ lắm.'
        }
      ]
    }
  ],
  // G7: N1 に N2 が あります
  'g7': [
    {
      questionFormat: 'N1 に なに/だれ が あります/います か',
      answerFormat: 'N1 に N2 が あります/います',
      identifier: 'なに/だれ (Cái gì/Ai)',
      tip: 'Dùng để hỏi xem có cái gì/ai ở một địa điểm nào đó.',
      examples: [
        {
          japanese: '机の上に何がありますか。\nかばんがあります。',
          reading: 'つくえのうえになにがありますか。\nかばんがあります。',
          romaji: 'tsukue no ue ni nani ga arimasu ka.\nkaban ga arimasu.',
          vietnamese: 'Trên bàn có cái gì vậy?\nCó cái cặp sách.'
        },
        {
          japanese: '教室に誰がいますか。\n先生がいます。',
          reading: 'きょうしつにだれがいますか。\nせんせいがいます。',
          romaji: 'kyoushitsu ni dare ga imasu ka.\nsensei ga imasu.',
          vietnamese: 'Trong phòng học có ai vậy?\nCó giáo viên.'
        }
      ]
    },
    {
      questionFormat: 'N1 に N2 が ありますか',
      answerFormat: 'はい、あります / いいえ、ありません',
      identifier: '〜か (Có... không)',
      tip: 'Câu hỏi xác nhận sự tồn tại.',
      examples: [
        {
          japanese: '部屋にテレビがありますか。\nはい、あります。',
          reading: 'へやにテレビがありますか。\nはい、あります。',
          romaji: 'heya ni terebi ga arimasu ka.\nhai, arimasu.',
          vietnamese: 'Trong phòng có tivi không?\nVâng, có.'
        }
      ]
    }
  ],
  // G24: N1 は N2 の N3 です (Vị trí)
  'g24': [
    {
      questionFormat: 'N は どこ に ありますか',
      answerFormat: 'N は N2 の N3 に あります',
      identifier: 'どこ (Ở đâu)',
      tip: 'Câu hỏi về vị trí. Câu trả lời thường kèm theo các từ chỉ vị trí (trên, dưới, trong, ngoài...).',
      examples: [
        {
          japanese: 'トイレはどこにありますか。\n教室の隣にあります。',
          reading: 'トイレはどこにありますか。\nきょうしつのとなりにあります。',
          romaji: 'toire wa doko ni arimasu ka.\nkyoushitsu no tonari ni arimasu.',
          vietnamese: 'Nhà vệ sinh ở đâu vậy?\nỞ bên cạnh phòng học.'
        },
        {
          japanese: '田中さんはどこにいますか。\n木村さんの後ろにいます。',
          reading: 'たなかさんはどこにいますか。\nきむらさんのうしろにいます。',
          romaji: 'tanaka san wa doko ni imasu ka.\nkimura san no ushiro ni imasu.',
          vietnamese: 'Anh Tanaka đang ở đâu vậy?\nĐang ở phía sau anh Kimura.'
        }
      ]
    }
  ],
  // G25: N1 から N2 まで どのくらい ですか
  'g25': [
    {
      questionFormat: 'どのくらい ですか / かかりますか',
      answerFormat: '〜Time です / かかります',
      identifier: 'どのくらい (Bao lâu)',
      tip: 'Hỏi về khoảng thời gian di chuyển. Có thể dùng です hoặc かかります đều được.',
      examples: [
        {
          japanese: 'うちから学校までどのくらいですか。\n15分です。',
          reading: 'うちからがっこうまでどのくらいですか。\n15ふんです。',
          romaji: 'uchi kara gakkou made dono kurai desu ka.\njuugofun desu.',
          vietnamese: 'Từ nhà đến trường mất bao lâu?\nMất 15 phút.'
        },
        {
          japanese: 'ハノイからホーチミンまでどのくらいかかりますか。\n2時間かかります。',
          reading: 'ハノイからホーチミンまでどのくらいかかりますか。\n2じかんかかります。',
          romaji: 'hanoi kara hoochimin made dono kurai kakarimasu ka.\nnijikan kakarimasu.',
          vietnamese: 'Từ Hà Nội đến Hồ Chí Minh mất bao lâu?\nMất 2 tiếng.'
        }
      ]
    }
  ],
  // G26: N1 から N2 まで Time です
  'g26': [
    {
      questionFormat: 'N(Phương tiện) で どのくらい ですか',
      answerFormat: 'N で 〜Time(くらい) です',
      identifier: 'Nで どのくらい (Bằng N mất bao lâu)',
      tip: 'Kết hợp hỏi thời gian với phương tiện cụ thể.',
      examples: [
        {
          japanese: '東京から大阪まで新幹線でどのくらいですか。\n2時間半くらいです。',
          reading: 'とうきょうからおおさかまでしんかんせんでどのくらいですか。\n2じかんはんくらいです。',
          romaji: 'toukyou kara oosaka made shinkansen de dono kurai desu ka.\nnijikanhan kurai desu.',
          vietnamese: 'Từ Tokyo đến Osaka bằng Shinkansen mất bao lâu?\nMất khoảng 2 tiếng rưỡi.'
        }
      ]
    }
  ],
  // G27: N で ~Time です
  'g27': [
    {
      questionFormat: 'どうやって 行きますか',
      answerFormat: 'N で 行きます。〜Time です',
      identifier: 'どうやって (Bằng cách nào)',
      tip: 'Hỏi cách thức đi lại, người trả lời thường nêu cả phương tiện và thời gian.',
      examples: [
        {
          japanese: '会社へどうやって行きますか。\nバスで行きます。1時間です。',
          reading: 'かいしゃへどうやっていきますか。\nバスでいきます。1じかんです。',
          romaji: 'kaisha e douyatte ikimasu ka.\nbasu de ikimasu. ichijikan desu.',
          vietnamese: 'Đến công ty bằng cách nào vậy?\nTôi đi bằng xe buýt. Mất 1 tiếng.'
        }
      ]
    }
  ],
  // G28: N で 行きます
  'g28': [
    {
      questionFormat: 'なん で 行きますか',
      answerFormat: 'N(Phương tiện) で 行きます',
      identifier: 'なんで (Bằng gì)',
      tip: 'Hỏi về phương tiện di chuyển thuần túy.',
      examples: [
        {
          japanese: '何で会社へ行きますか。\n電車で行きます。',
          reading: 'なんでかいしゃへいきますか。\nでんしゃでいきます。',
          romaji: 'nan de kaisha he ikimasu ka.\ndensha de ikimasu.',
          vietnamese: 'Bạn đi đến công ty bằng gì?\nTôi đi bằng tàu điện.'
        },
        {
          japanese: '毎日バスで学校へ行きますか。\nはい、そうです。',
          reading: 'まいにちバスでがっこうへいきますか。\nはい、そうです。',
          romaji: 'mainichi basu de gakkou he ikimasu ka.\nhai, sou desu.',
          vietnamese: 'Mỗi ngày bạn đi học bằng xe buýt phải không?\nVâng, đúng vậy.'
        }
      ]
    },
    {
      questionFormat: 'どこ へ 行きますか',
      answerFormat: 'N(Địa điểm) へ 行きます',
      identifier: 'どこ (Đi đâu)',
      tip: 'Hỏi về địa điểm đến.',
      examples: [
        {
          japanese: '明日、どこへ行きますか。\n京都へ行きます。',
          reading: 'あした、どこへいきますか。\nきょうとへいきます。',
          romaji: 'ashita, doko he ikimasu ka.\nkyouto he ikimasu.',
          vietnamese: 'Ngày mai bạn đi đâu vậy?\nTôi đi Kyoto.'
        }
      ]
    },
    {
      questionFormat: 'だれ と 行きますか',
      answerFormat: 'N(Người) と 行きます',
      identifier: 'だれと (Với ai)',
      tip: 'Hỏi về người đồng hành.',
      examples: [
        {
          japanese: '誰と映画を見に行きますか。\n友達と行きます。',
          reading: 'だれとえいがをみにいきますか。\nともだちといきます。',
          romaji: 'dare to eiga o mi ni ikimasu ka.\ntomodachi to ikimasu.',
          vietnamese: 'Bạn đi xem phim với ai vậy?\nTôi đi với bạn.'
        }
      ]
    },
    {
      questionFormat: 'いつ 行きますか',
      answerFormat: 'N(Thời gian) に 行きます',
      identifier: 'いつ (Khi nào)',
      tip: 'Hỏi về thời điểm thực hiện hành động di chuyển.',
      examples: [
        {
          japanese: 'いつ日本へ行きますか。\n来年の3月に行きます。',
          reading: 'いつにほんへいきますか。\nらいねんの3がつにいきます。',
          romaji: 'itsu nihon he ikimasu ka.\nrainen no sangatsu ni ikimasu.',
          vietnamese: 'Khi nào bạn đi Nhật?\nTôi sẽ đi vào tháng 3 năm sau.'
        }
      ]
    }
  ]
};

// Remove qa blocks ONLY for g1-g7 and g24-g28 to avoid touching Lesson 5
const targetIds = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g24', 'g25', 'g26', 'g27', 'g28'];
for (const id of targetIds) {
  // Find id: 'gx',
  const idRegex = new RegExp(`id:\\s*'${id}'\\s*,`);
  const idMatch = content.match(idRegex);
  if (idMatch) {
    const startIndex = idMatch.index! + idMatch[0].length;
    // Look ahead to find the next qa: [...] block before the next id: 'gx' or relatedGrammars
    // Since qa: [] is directly after id in our previous structure, this regex works cleanly
    const blockRegex = /^\s*qa:\s*\[[\s\S]*?\]\s*,/;
    const substr = content.slice(startIndex, startIndex + 5000);
    const blockMatch = substr.match(blockRegex);
    if (blockMatch) {
      content = content.slice(0, startIndex + blockMatch.index!) + content.slice(startIndex + blockMatch.index! + blockMatch[0].length);
    }
  }
}

// Now inject the new Q&A data
for (const id of targetIds) {
  if (qaData[id]) {
    const targetRegex = new RegExp(`id:\\s*'${id}'\\s*,`);
    const match = content.match(targetRegex);
    if (match) {
      const insertPos = match.index! + match[0].length;
      const qaString = `\n        qa: ${JSON.stringify(qaData[id], null, 2).split('\n').join('\n        ')},`;
      content = content.slice(0, insertPos) + qaString + content.slice(insertPos);
    }
  }
}

fs.writeFileSync(grammarFile, content);
console.log('Distributed QA for Lesson 4 successfully!');
