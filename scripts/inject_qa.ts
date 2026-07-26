import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const grammarFile = path.join(__dirname, '../src/data/grammarData.ts');
let content = fs.readFileSync(grammarFile, 'utf8');

const qaData: Record<string, any[]> = {
  // BÀI 4
  'g1': [
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
        },
        {
          japanese: '庭に何がありますか。\n桜の木があります。',
          reading: 'にわになにがありますか。\nさくらのきがあります。',
          romaji: 'niwa ni nani ga arimasu ka.\nsakura no ki ga arimasu.',
          vietnamese: 'Ngoài vườn có gì vậy?\nCó cây hoa anh đào.'
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
        },
        {
          japanese: '公園に誰がいますか。\n子供がいます。',
          reading: 'こうえんにだれがいますか。\nこどもがいます。',
          romaji: 'kouen ni dare ga imasu ka.\nkodomo ga imasu.',
          vietnamese: 'Ở công viên có ai vậy?\nCó bọn trẻ con.'
        }
      ]
    }
  ],
  'g2': [
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
          japanese: '猫はどこにいますか。\n机の下にいます。',
          reading: 'ねこはどこにいますか。\nつくえのしたにいます。',
          romaji: 'neko wa doko ni imasu ka.\ntsukue no shita ni imasu.',
          vietnamese: 'Con mèo ở đâu thế?\nNó ở dưới gầm bàn.'
        },
        {
          japanese: '田中さんはどこにいますか。\n会議室にいます。',
          reading: 'たなかさんはどこにいますか。\nかいぎしつにいます。',
          romaji: 'tanaka san wa doko ni imasu ka.\nkaigishitsu ni imasu.',
          vietnamese: 'Anh Tanaka đang ở đâu vậy?\nAnh ấy đang ở phòng họp.'
        }
      ]
    }
  ],
  'g4': [
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
        },
        {
          japanese: '今からどこへ来ますか。\nあなたの家へ来ます。',
          reading: 'いまからどこへきますか。\nあなたのうちへきます。',
          romaji: 'ima kara doko he kimasu ka.\nanata no uchi he kimasu.',
          vietnamese: 'Từ bây giờ bạn sẽ đến đâu?\nTôi sẽ đến nhà bạn.'
        }
      ]
    }
  ],
  'g5': [
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
        },
        {
          japanese: '何で駅へ行きますか。\n歩いて行きます。',
          reading: 'なんでえきへいきますか。\nあるいていきます。',
          romaji: 'nan de eki he ikimasu ka.\naruite ikimasu.',
          vietnamese: 'Bạn đi đến nhà ga bằng gì?\nTôi đi bộ.'
        }
      ]
    }
  ],
  'g6': [
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
        },
        {
          japanese: '誰とスーパーへ行きますか。\n一人で行きます。',
          reading: 'だれとスーパーへいきますか。\nひとりでいきます。',
          romaji: 'dare to suupaa he ikimasu ka.\nhitori de ikimasu.',
          vietnamese: 'Bạn đi siêu thị với ai?\nTôi đi một mình.'
        }
      ]
    }
  ],
  'g7': [
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
        },
        {
          japanese: '誕生日はいつですか。\n9月10日です。',
          reading: 'たんじょうびはいつですか。\n9がつ10かです。',
          romaji: 'tanjoubi wa itsu desu ka.\nkugatsu tooka desu.',
          vietnamese: 'Sinh nhật của bạn là khi nào?\nLà ngày 10 tháng 9.'
        }
      ]
    }
  ],

  // BÀI 5
  'g9': [
    {
      questionFormat: 'どんな N が 好きですか',
      answerFormat: 'N(Cụ thể) が 好きです',
      identifier: 'どんな (Như thế nào / Loại nào)',
      tip: 'Dùng để hỏi cụ thể về thể loại của một thứ gì đó. Ví dụ: Thích loại thể thao nào? Thích loại phim nào?',
      examples: [
        {
          japanese: 'どんなスポーツが好きですか。\nサッカーが好きです。',
          reading: 'どんなスポーツがすきですか。\nサッカーがすきです。',
          romaji: 'donna supootsu ga suki desu ka.\nsakkaa ga suki desu.',
          vietnamese: 'Bạn thích môn thể thao nào?\nTôi thích bóng đá.'
        },
        {
          japanese: 'どんな映画が好きですか。\nアクション映画が好きです。',
          reading: 'どんなえいががすきですか。\nアクションえいががすきです。',
          romaji: 'donna eiga ga suki desu ka.\nakushon eiga ga suki desu.',
          vietnamese: 'Bạn thích thể loại phim nào?\nTôi thích phim hành động.'
        },
        {
          japanese: 'どんな料理が好きですか。\n日本の料理が好きです。',
          reading: 'どんなりょうりがすきですか。\nにほんのりょうりがすきです。',
          romaji: 'donna ryouri ga suki desu ka.\nnihon no ryouri ga suki desu.',
          vietnamese: 'Bạn thích đồ ăn nước nào?\nTôi thích đồ ăn Nhật Bản.'
        }
      ]
    }
  ],
  'g10': [
    {
      questionFormat: 'N が 上手ですか',
      answerFormat: 'はい、上手です / いいえ、下手です',
      identifier: '上手ですか (Có giỏi không)',
      tip: 'Khiêm tốn: Người Nhật ít khi tự nhận mình giỏi. Thường họ sẽ đáp lại là いいえ、下手です (Không, tôi kém lắm) hoặc まだまだです (Vẫn còn kém).',
      examples: [
        {
          japanese: '日本語が上手ですか。\nいいえ、まだまだです。',
          reading: 'にほんごがじょうずですか。\nいいえ、まだまだです。',
          romaji: 'nihongo ga jouzu desu ka.\niie, madamada desu.',
          vietnamese: 'Bạn tiếng Nhật có giỏi không?\nKhông, tôi vẫn còn kém lắm.'
        },
        {
          japanese: '歌が上手ですか。\nはい、少し上手です。',
          reading: 'うたがじょうずですか。\nはい、すこしじょうずです。',
          romaji: 'uta ga jouzu desu ka.\nhai, sukoshi jouzu desu.',
          vietnamese: 'Bạn hát có hay không?\nVâng, tôi hát được một chút.'
        },
        {
          japanese: '料理が上手ですか。\nいいえ、下手です。',
          reading: 'りょうりがじょうずですか。\nいいえ、へたです。',
          romaji: 'ryouri ga jouzu desu ka.\niie, heta desu.',
          vietnamese: 'Bạn nấu ăn có giỏi không?\nKhông, tôi nấu tệ lắm.'
        }
      ]
    }
  ],
  'g12': [
    {
      questionFormat: '今、なに が いちばん 欲しいですか',
      answerFormat: 'N が 欲しいです',
      identifier: 'なに (Cái gì)',
      tip: 'Thêm いちばん (Nhất) để nhấn mạnh khát khao muốn có nhất lúc này.',
      examples: [
        {
          japanese: '今、何がいちばん欲しいですか。\n新しい車が欲しいです。',
          reading: 'いま、なにがいちばんほしいですか。\nあたらしいくるまがほしいです。',
          romaji: 'ima, nani ga ichiban hoshii desu ka.\natarashii kuruma ga hoshii desu.',
          vietnamese: 'Bây giờ bạn muốn có cái gì nhất?\nTôi muốn có một chiếc ô tô mới.'
        },
        {
          japanese: '誕生日に何が欲しいですか。\nパソコンが欲しいです。',
          reading: 'たんじょうびになにがほしいですか。\nパソコンがほしいです。',
          romaji: 'tanjoubi ni nani ga hoshii desu ka.\npasokon ga hoshii desu.',
          vietnamese: 'Bạn muốn có quà gì vào ngày sinh nhật?\nTôi muốn có máy tính.'
        },
        {
          japanese: '今、何が欲しいですか。\nお金が欲しいです。',
          reading: 'いま、なにがほしいですか。\nおかねがほしいです。',
          romaji: 'ima, nani ga hoshii desu ka.\nokane ga hoshii desu.',
          vietnamese: 'Bây giờ bạn muốn có cái gì?\nTôi muốn có tiền.'
        }
      ]
    }
  ],
  'g13': [
    {
      questionFormat: 'なに を したいですか',
      answerFormat: 'N を Vたいです',
      identifier: 'なにを したい (Muốn làm gì)',
      tip: 'Thường dùng với cụm từ なにを したいですか để hỏi về mong muốn hành động.',
      examples: [
        {
          japanese: '週末、何をしたいですか。\n友達と遊びたいです。',
          reading: 'しゅうまつ、なにをしたいですか。\nともだちとあそびたいです。',
          romaji: 'shuumatsu, nani o shitai desu ka.\ntomodachi to asobitai desu.',
          vietnamese: 'Cuối tuần bạn muốn làm gì?\nTôi muốn đi chơi với bạn.'
        },
        {
          japanese: '日本で何をしたいですか。\n富士山に登りたいです。',
          reading: 'にほんでなにをしたいですか。\nふじさんにのぼりたいです。',
          romaji: 'nihon de nani o shitai desu ka.\nfujisan ni noboritai desu.',
          vietnamese: 'Bạn muốn làm gì ở Nhật Bản?\nTôi muốn leo núi Phú Sĩ.'
        },
        {
          japanese: '今、何をしたいですか。\n水を飲みたいです。',
          reading: 'いま、なにをしたいですか。\nみずをのみたいです。',
          romaji: 'ima, nani o shitai desu ka.\nmizu o nomitai desu.',
          vietnamese: 'Bây giờ bạn muốn làm gì?\nTôi muốn uống nước.'
        }
      ]
    },
    {
      questionFormat: 'どこ へ 行きたいですか',
      answerFormat: 'N(Địa điểm) へ 行きたいです',
      identifier: 'どこへ 行きたい (Muốn đi đâu)',
      tip: 'Kết hợp từ để hỏi địa điểm với động từ Vたい để hỏi về nơi muốn đến.',
      examples: [
        {
          japanese: '夏休みにどこへ行きたいですか。\n海へ行きたいです。',
          reading: 'なつやすみにどこへいきたいですか。\nうみへいきたいです。',
          romaji: 'natsuyasumi ni doko he ikitai desu ka.\numi he ikitai desu.',
          vietnamese: 'Kỳ nghỉ hè bạn muốn đi đâu?\nTôi muốn đi biển.'
        },
        {
          japanese: '今、どこへ行きたいですか。\nどこも行きたくないです。',
          reading: 'いま、どこへいきたいですか。\nどこもいきたくないです。',
          romaji: 'ima, doko he ikitai desu ka.\ndokomo ikitakunai desu.',
          vietnamese: 'Bây giờ bạn muốn đi đâu?\nTôi không muốn đi đâu cả.'
        },
        {
          japanese: '外国でどこへ行きたいですか。\nアメリカへ行きたいです。',
          reading: 'がいこくでどこへいきたいですか。\nアメリカへいきたいです。',
          romaji: 'gaikoku de doko he ikitai desu ka.\namerika he ikitai desu.',
          vietnamese: 'Ở nước ngoài bạn muốn đi đâu?\nTôi muốn đi Mỹ.'
        }
      ]
    }
  ]
};

for (const [id, qaArray] of Object.entries(qaData)) {
  const targetStr = `id: '${id}',`;
  const index = content.indexOf(targetStr);
  if (index !== -1) {
    // Find the end of this grammar point (before "examples:" usually, or just before "isLearned:")
    // Actually, just inserting after `id: '${id}',` is completely fine.
    
    // Let's insert `qa: [...],` right after `id: '${id}',\n`
    const insertPos = content.indexOf('\n', index) + 1;
    
    const qaString = `        qa: ${JSON.stringify(qaArray, null, 2).split('\n').join('\n        ')},\n`;
    
    content = content.slice(0, insertPos) + qaString + content.slice(insertPos);
  }
}

fs.writeFileSync(grammarFile, content);
console.log('Injected QA sections successfully!');
