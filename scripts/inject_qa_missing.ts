import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const grammarFile = path.join(__dirname, '../src/data/grammarData.ts');
let content = fs.readFileSync(grammarFile, 'utf8');

const qaData: Record<string, any[]> = {
  // BÀI 4 - Missing
  'g3': [
    {
      questionFormat: 'N1 に なに が ありますか',
      answerFormat: 'N2 や N3 (など) が あります',
      identifier: 'なに (Cái gì)',
      tip: 'Câu hỏi dùng để hỏi về những thứ đang có. Trả lời liệt kê tiêu biểu vài thứ bằng trợ từ や thay vì liệt kê toàn bộ bằng trợ từ と.',
      examples: [
        {
          japanese: 'かばんの中に何がありますか。\n本やペンがあります。',
          reading: 'かばんのなかになにがありますか。\nほんやペンがあります。',
          romaji: 'kaban no naka ni nani ga arimasu ka.\nhon ya pen ga arimasu.',
          vietnamese: 'Trong cặp có cái gì vậy?\nCó những thứ như sách và bút.'
        },
        {
          japanese: '部屋に何がありますか。\n机やベッドなどがあります。',
          reading: 'へやになにがありますか。\nつくえやベッドなどがあります。',
          romaji: 'heya ni nani ga arimasu ka.\ntsukue ya beddo nado ga arimasu.',
          vietnamese: 'Trong phòng có gì vậy?\nCó những thứ như bàn và giường.'
        }
      ]
    },
    {
      questionFormat: 'N1 や N2 が ありますか',
      answerFormat: 'はい、あります / いいえ、ありません',
      identifier: '〜か (Có... không)',
      tip: 'Xác nhận xem có những vật đó tồn tại ở đó không.',
      examples: [
        {
          japanese: '箱の中に時計や眼鏡がありますか。\nはい、あります。',
          reading: 'はこのなかにとけいやめがねがありますか。\nはい、あります。',
          romaji: 'hako no naka ni tokei ya megane ga arimasu ka.\nhai, arimasu.',
          vietnamese: 'Trong hộp có những thứ như đồng hồ và mắt kính không?\nVâng, có.'
        }
      ]
    }
  ],

  // BÀI 5 - Missing
  'g8': [
    {
      questionFormat: 'きのう、なに を しましたか',
      answerFormat: 'Vました',
      identifier: 'なにを しましたか (Đã làm gì)',
      tip: 'Câu hỏi về hành động trong quá khứ. Động từ trả lời bắt buộc phải chia ở thể quá khứ (〜ました).',
      examples: [
        {
          japanese: '昨日、何をしましたか。\n映画を見ました。',
          reading: 'きのう、なにをしましたか。\nえいがをみました。',
          romaji: 'kinou, nani o shimashita ka.\neiga o mimashita.',
          vietnamese: 'Hôm qua bạn đã làm gì?\nTôi đã xem phim.'
        },
        {
          japanese: '先週の週末、何をしましたか。\nテニスをしました。',
          reading: 'せんしゅうのしゅうまつ、なにをしましたか。\nテニスをしました。',
          romaji: 'senshuu no shuumatsu, nani o shimashita ka.\ntenisu o shimashita.',
          vietnamese: 'Cuối tuần trước bạn đã làm gì?\nTôi đã chơi tennis.'
        }
      ]
    },
    {
      questionFormat: '〜でしたか / 〜ましたか',
      answerFormat: 'はい、〜でした(ました) / いいえ、〜じゃありませんでした(ませんでした)',
      identifier: '〜か (Đã... phải không)',
      tip: 'Xác nhận thông tin về một việc đã xảy ra hoặc một trạng thái trong quá khứ.',
      examples: [
        {
          japanese: '昨日は休みでしたか。\nはい、休みでした。',
          reading: 'きのうはやすみでしたか。\nはい、やすみでした。',
          romaji: 'kinou wa yasumi deshita ka.\nhai, yasumi deshita.',
          vietnamese: 'Hôm qua có phải là ngày nghỉ không?\nVâng, đã là ngày nghỉ.'
        },
        {
          japanese: '昨日の晩、勉強しましたか。\nいいえ、勉強しませんでした。',
          reading: 'きのうのばん、べんきょうしましたか。\nいいえ、べんきょうしませんでした。',
          romaji: 'kinou no ban, benkyou shimashita ka.\niie, benkyou shimasen deshita.',
          vietnamese: 'Tối hôm qua bạn có học bài không?\nKhông, tôi đã không học.'
        }
      ]
    }
  ],
  'g11': [
    {
      questionFormat: 'N が 下手ですか',
      answerFormat: 'はい、下手です / いいえ、上手です',
      identifier: '下手ですか (Có kém không)',
      tip: 'Tuyệt đối tránh hỏi trực tiếp "Bạn có dở cái này không?" vì nghe rất thô lỗ trong văn hóa Nhật. Thường dùng để tự hạ mình hoặc hỏi bạn bè cực kỳ thân thiết.',
      examples: [
        {
          japanese: '私は歌が下手です。山田さんも下手ですか。\nはい、私も下手です。',
          reading: 'わたしはうたがへたです。やまださんもへたですか。\nはい、わたしもへたです。',
          romaji: 'watashi wa uta ga heta desu. yamada san mo heta desu ka.\nhai, watashi mo heta desu.',
          vietnamese: 'Tôi hát dở lắm. Anh Yamada cũng hát dở à?\nVâng, tôi cũng hát dở.'
        },
        {
          japanese: '料理が下手ですか。\nいいえ、少し上手です。',
          reading: 'りょうりがへたですか。\nいいえ、すこしじょうずです。',
          romaji: 'ryouri ga heta desu ka.\niie, sukoshi jouzu desu.',
          vietnamese: 'Bạn nấu ăn tệ lắm à?\nKhông, tôi nấu cũng được một chút.'
        }
      ]
    },
    {
      questionFormat: 'N1 と N2 と どちら が 下手ですか',
      answerFormat: 'N1 の ほう が 下手です',
      identifier: 'どちら (Cái nào... kém hơn)',
      tip: 'Câu hỏi so sánh, yêu cầu lựa chọn xem trong 2 thứ thì cái nào mình làm tệ hơn.',
      examples: [
        {
          japanese: '漢字とひらがなとどちらが下手ですか。\n漢字のほうが下手です。',
          reading: 'かんじとひらがなとどちらがへたですか。\nかんじのほうがへたです。',
          romaji: 'kanji to hiragana to dochira ga heta desu ka.\nkanji no hou ga heta desu.',
          vietnamese: 'Kanji và Hiragana, bạn kém cái nào hơn?\nTôi kém Kanji hơn.'
        }
      ]
    }
  ]
};

for (const [id, qaArray] of Object.entries(qaData)) {
  const targetStr = `id: '${id}',`;
  const index = content.indexOf(targetStr);
  if (index !== -1) {
    // Determine if qa: block already exists
    const qaRegex = /qa:\s*\[[\s\S]*?\]\s*,/;
    const substr = content.substring(index, index + 2000); // look ahead a bit to avoid replacing next grammar point
    const match = substr.match(qaRegex);
    
    if (match) {
      const qaString = `qa: ${JSON.stringify(qaArray, null, 2).split('\n').join('\n        ')},`;
      content = content.slice(0, index + match.index!) + qaString + content.slice(index + match.index! + match[0].length);
    } else {
      // Need to insert it
      const insertPos = content.indexOf('\n', index) + 1;
      const qaString = `        qa: ${JSON.stringify(qaArray, null, 2).split('\n').join('\n        ')},\n`;
      content = content.slice(0, insertPos) + qaString + content.slice(insertPos);
    }
  }
}

fs.writeFileSync(grammarFile, content);
console.log('Injected missing QA sections successfully!');
