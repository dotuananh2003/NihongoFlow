import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const grammarFile = path.join(__dirname, '../src/data/grammarData.ts');
let content = fs.readFileSync(grammarFile, 'utf8');

// The QA data we wrongly assigned to g1, g2, g4, g5, g6, g7(old)
const qaData: Record<string, any[]> = {
  // G7: TỒN TẠI (combine old g1 and g2)
  'g7': [
    {
      questionFormat: 'N1 に なに が ありますか',
      answerFormat: 'N1 に N2 が あります',
      identifier: 'なに (Cái gì)',
      tip: 'Câu hỏi dùng cho vật/sự việc. Khi trả lời, chỉ cần thay chữ なに bằng tên đồ vật.',
      examples: [
        {
          japanese: '机の上に何がありますか。\nかばんがあります。',
          reading: 'つくえのうえになにがありますか。\nかばんがあります。',
          romaji: 'tsukue no ue ni nani ga arimasu ka.\nkaban ga arimasu.',
          vietnamese: 'Trên bàn có cái gì vậy?\nCó cái cặp sách.'
        },
        {
          japanese: '部屋に何がありますか。\nベッドと机があります。',
          reading: 'へやになにがありますか。\nベッドとつくえがあります。',
          romaji: 'heya ni nani ga arimasu ka.\nbeddo to tsukue ga arimasu.',
          vietnamese: 'Trong phòng có gì vậy?\nCó giường và bàn.'
        }
      ]
    },
    {
      questionFormat: 'N1 に だれ が いますか',
      answerFormat: 'N1 に N2 が います',
      identifier: 'だれ (Ai)',
      tip: 'Câu hỏi dùng cho người. Chú ý động từ phải là います (không dùng あります).',
      examples: [
        {
          japanese: '教室に誰がいますか。\n先生がいます。',
          reading: 'きょうしつにだれがいますか。\nせんせいがいます。',
          romaji: 'kyoushitsu ni dare ga imasu ka.\nsensei ga imasu.',
          vietnamese: 'Trong phòng học có ai vậy?\nCó giáo viên.'
        },
        {
          japanese: 'あそこに誰がいますか。\n木村さんがいます。',
          reading: 'あそこにだれがいますか。\nきむらさんがいます。',
          romaji: 'asoko ni dare ga imasu ka.\nkimura san ga imasu.',
          vietnamese: 'Ở đằng kia có ai vậy?\nCó anh Kimura.'
        }
      ]
    },
    {
      questionFormat: 'N1 に N2 が ありますか',
      answerFormat: 'はい、あります / いいえ、ありません',
      identifier: '〜か (Có... không)',
      tip: 'Câu hỏi xác nhận thông tin (Yes/No). Trả lời bằng はい (Có) hoặc いいえ (Không) kèm theo động từ tương ứng.',
      examples: [
        {
          japanese: '部屋にテレビがありますか。\nはい、あります。',
          reading: 'へやにテレビがありますか。\nはい、あります。',
          romaji: 'heya ni terebi ga arimasu ka.\nhai, arimasu.',
          vietnamese: 'Trong phòng có tivi không?\nVâng, có.'
        },
        {
          japanese: '庭に犬がいますか。\nいいえ、いません。猫がいます。',
          reading: 'にわにいぬがいますか。\nいいえ、いません。ねこがいます。',
          romaji: 'niwa ni inu ga imasu ka.\niie, imasen. neko ga imasu.',
          vietnamese: 'Ngoài vườn có con chó nào không?\nKhông, không có. Có con mèo.'
        }
      ]
    },
    {
      questionFormat: 'N は どこ に ありますか/いますか',
      answerFormat: 'N は N(Địa điểm) に あります/います',
      identifier: 'どこ (Ở đâu)',
      tip: 'Câu hỏi vị trí của một vật hay người đã xác định. Khi trả lời có thể bỏ bớt chủ ngữ N は.',
      examples: [
        {
          japanese: 'トイレはどこにありますか。\nあそこにあります。',
          reading: 'トイレはどこにありますか。\nあそこにあります。',
          romaji: 'toire wa doko ni arimasu ka.\nasoko ni arimasu.',
          vietnamese: 'Nhà vệ sinh ở đâu vậy?\nỞ đằng kia.'
        },
        {
          japanese: '田中さんはどこにいますか。\n会議室にいます。',
          reading: 'たなかさんはどこにいますか。\nかいぎしつにいます。',
          romaji: 'tanaka san wa doko ni imasu ka.\nkaigishitsu ni imasu.',
          vietnamese: 'Anh Tanaka đang ở đâu vậy?\nAnh ấy đang ở phòng họp.'
        }
      ]
    },
    {
      questionFormat: 'N は N(Địa điểm) に ありますか',
      answerFormat: 'はい、あります / いいえ、ありません',
      identifier: '〜か (Có ở... không)',
      tip: 'Hỏi xác nhận xem một vật/người có đang ở vị trí đó hay không.',
      examples: [
        {
          japanese: '山田さんは会議室にいますか。\nはい、います。',
          reading: 'やまださんはかいぎしつにいますか。\nはい、います。',
          romaji: 'yamada san wa kaigishitsu ni imasu ka.\nhai, imasu.',
          vietnamese: 'Anh Yamada có ở phòng họp không?\nVâng, có ở đó.'
        },
        {
          japanese: '私の携帯は机の上にありますか。\nいいえ、ありませんよ。',
          reading: 'わたしのけいたいはつくえのうえにありますか。\nいいえ、ありませんよ。',
          romaji: 'watashi no keitai wa tsukue no ue ni arimasu ka.\niie, arimasen yo.',
          vietnamese: 'Điện thoại của tôi có ở trên bàn không?\nKhông, không có đâu.'
        }
      ]
    }
  ],
  // G28: DI CHUYỂN (combine old g4, g5, g6, old g7)
  'g28': [
    {
      questionFormat: 'どこ へ 行きますか',
      answerFormat: 'N(Địa điểm) へ 行きます',
      identifier: 'どこ (Đi đâu)',
      tip: 'Hỏi về địa điểm di chuyển đến. Có thể trả lời là どこも 行きません nếu không đi đâu cả.',
      examples: [
        {
          japanese: '明日、どこへ行きますか。\n京都へ行きます。',
          reading: 'あした、どこへいきますか。\nきょうとへいきます。',
          romaji: 'ashita, doko he ikimasu ka.\nkyouto he ikimasu.',
          vietnamese: 'Ngày mai bạn đi đâu vậy?\nTôi đi Kyoto.'
        },
        {
          japanese: '日曜日どこへ行きましたか。\nどこも行きませんでした。',
          reading: 'にちようびどこへいきましたか。\nどこもいきませんでした。',
          romaji: 'nichiyoubi doko he ikimashita ka.\ndokomo ikimasen deshita.',
          vietnamese: 'Chủ nhật bạn đã đi đâu vậy?\nTôi đã không đi đâu cả.'
        }
      ]
    },
    {
      questionFormat: 'N へ 行きますか',
      answerFormat: 'はい、行きます / いいえ、行きません',
      identifier: '〜か (Có đi... không)',
      tip: 'Xác nhận xem đối phương có dự định đi đến một địa điểm cụ thể hay không.',
      examples: [
        {
          japanese: '明日、学校へ行きますか。\nはい、行きます。',
          reading: 'あした、がっこうへいきますか。\nはい、いきます。',
          romaji: 'ashita, gakkou he ikimasu ka.\nhai, ikimasu.',
          vietnamese: 'Ngày mai bạn có đi học không?\nVâng, tôi có đi.'
        },
        {
          japanese: '週末、スーパーへ行きましたか。\nいいえ、行きませんでした。',
          reading: 'しゅうまつ、スーパーへいきましたか。\nいいえ、いきませんでした。',
          romaji: 'shuumatsu, suupaa he ikimashita ka.\niie, ikimasen deshita.',
          vietnamese: 'Cuối tuần bạn có đi siêu thị không?\nKhông, tôi đã không đi.'
        }
      ]
    },
    {
      questionFormat: 'なん で 行きますか',
      answerFormat: 'N(Phương tiện) で 行きます',
      identifier: 'なん (Bằng gì)',
      tip: 'Hỏi về phương tiện di chuyển. Đọc là "Nan de" (không phải nani). Nếu đi bộ thì dùng 歩いて (không có で).',
      examples: [
        {
          japanese: '何で会社へ行きますか。\n電車で行きます。',
          reading: 'なんでかいしゃへいきますか。\nでんしゃでいきます。',
          romaji: 'nan de kaisha he ikimasu ka.\ndensha de ikimasu.',
          vietnamese: 'Bạn đi đến công ty bằng gì?\nTôi đi bằng tàu điện.'
        },
        {
          japanese: '何で日本へ来ましたか。\n飛行機で来ました。',
          reading: 'なんでにほんへきましたか。\nひこうきできました。',
          romaji: 'nan de nihon he kimashita ka.\nhikouki de kimashita.',
          vietnamese: 'Bạn đã đến Nhật Bản bằng gì?\nTôi đã đến bằng máy bay.'
        }
      ]
    },
    {
      questionFormat: 'N(Phương tiện) で 行きますか',
      answerFormat: 'はい、そうです / いいえ、N で 行きます',
      identifier: '〜か (Đi bằng... phải không)',
      tip: 'Xác nhận loại phương tiện. Có thể phủ định và đính chính bằng một phương tiện khác.',
      examples: [
        {
          japanese: '毎日バスで学校へ行きますか。\nはい、そうです。',
          reading: 'まいにちバスでがっこうへいきますか。\nはい、そうです。',
          romaji: 'mainichi basu de gakkou he ikimasu ka.\nhai, sou desu.',
          vietnamese: 'Mỗi ngày bạn đi học bằng xe buýt phải không?\nVâng, đúng vậy.'
        },
        {
          japanese: 'タクシーで帰りましたか。\nいいえ、電車で帰りました。',
          reading: 'タクシーでかえりましたか。\nいいえ、でんしゃでかえりました。',
          romaji: 'takushii de kaerimashita ka.\niie, densha de kaerimashita.',
          vietnamese: 'Bạn đã về bằng taxi à?\nKhông, tôi về bằng tàu điện.'
        }
      ]
    },
    {
      questionFormat: 'だれ と 行きますか',
      answerFormat: 'N(Người) と 行きます',
      identifier: 'だれ (Với ai)',
      tip: 'Hỏi về người cùng thực hiện hành động. Nếu đi một mình thì dùng ひとりで (không có と).',
      examples: [
        {
          japanese: '誰と映画を見に行きますか。\n友達と行きます。',
          reading: 'だれとえいがをみにいきますか。\nともだちといきます。',
          romaji: 'dare to eiga o mi ni ikimasu ka.\ntomodachi to ikimasu.',
          vietnamese: 'Bạn đi xem phim với ai vậy?\nTôi đi với bạn.'
        },
        {
          japanese: '誰と日本へ来ましたか。\n家族と来ました。',
          reading: 'だれとにほんへきましたか。\nかぞくときました。',
          romaji: 'dare to nihon he kimashita ka.\nkazoku to kimashita.',
          vietnamese: 'Bạn đã đến Nhật với ai vậy?\nTôi đã đến cùng gia đình.'
        }
      ]
    },
    {
      questionFormat: 'いつ Vますか',
      answerFormat: 'N(Thời gian) に Vます',
      identifier: 'いつ (Khi nào)',
      tip: 'Hỏi về thời điểm diễn ra hành động. Chú ý: Các từ chỉ thời gian tương đối (như hôm qua, ngày mai, tuần sau) thì KHÔNG đi kèm trợ từ に.',
      examples: [
        {
          japanese: 'いつ日本へ行きますか。\n来年の3月に行きます。',
          reading: 'いつにほんへいきますか。\nらいねんの3がつにいきます。',
          romaji: 'itsu nihon he ikimasu ka.\nrainen no sangatsu ni ikimasu.',
          vietnamese: 'Khi nào bạn đi Nhật?\nTôi sẽ đi vào tháng 3 năm sau.'
        },
        {
          japanese: 'いつ国へ帰りますか。\n来週帰ります。',
          reading: 'いつくにへかえりますか。\nらいしゅうかえります。',
          romaji: 'itsu kuni he kaerimasu ka.\nraishuu kaerimasu.',
          vietnamese: 'Khi nào bạn về nước?\nTuần sau tôi sẽ về. (Lưu ý: Không dùng に)'
        }
      ]
    }
  ]
};

// Remove qa blocks from g1, g2, g4, g5, g6
const idsToRemove = ['g1', 'g2', 'g4', 'g5', 'g6'];
for (const id of idsToRemove) {
  const targetStr = `id: '${id}',`;
  const index = content.indexOf(targetStr);
  if (index !== -1) {
    const qaRegex = /qa:\s*\[[\s\S]*?\]\s*,/;
    const substr = content.substring(index, index + 20000); // large enough
    const match = substr.match(qaRegex);
    if (match) {
      content = content.slice(0, index + match.index!) + content.slice(index + match.index! + match[0].length);
    }
  }
}

// Write new qa blocks to g7 and g28
for (const [id, qaArray] of Object.entries(qaData)) {
  const targetStr = `id: '${id}',`;
  const index = content.indexOf(targetStr);
  if (index !== -1) {
    const qaRegex = /qa:\s*\[[\s\S]*?\]\s*,/;
    const substr = content.substring(index, index + 20000); 
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
console.log('Fixed Lesson 4 QA sections successfully!');
