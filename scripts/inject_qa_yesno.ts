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
        }
      ]
    },
    // NEW YES/NO FOR g1
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
          japanese: '田中さんはどこにいますか。\n会議室にいます。',
          reading: 'たなかさんはどこにいますか。\nかいぎしつにいます。',
          romaji: 'tanaka san wa doko ni imasu ka.\nkaigishitsu ni imasu.',
          vietnamese: 'Anh Tanaka đang ở đâu vậy?\nAnh ấy đang ở phòng họp.'
        }
      ]
    },
    // NEW YES/NO FOR g2
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
        }
      ]
    },
    // NEW YES/NO FOR g4
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
        }
      ]
    },
    // NEW YES/NO FOR g5
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
        }
      ]
    },
    // NEW YES/NO FOR g6
    {
      questionFormat: 'N と 行きますか',
      answerFormat: 'はい、そうです / いいえ、一人で 行きます',
      identifier: '〜か (Cùng với... phải không)',
      tip: 'Hỏi xác nhận đối tượng đi cùng.',
      examples: [
        {
          japanese: '明日、彼女とデートに行きますか。\nはい、そうです。',
          reading: 'あした、かのじょとデートにいきますか。\nはい、そうです。',
          romaji: 'ashita, kanojo to deeto ni ikimasu ka.\nhai, sou desu.',
          vietnamese: 'Ngày mai bạn đi hẹn hò với bạn gái à?\nVâng, đúng vậy.'
        },
        {
          japanese: 'お母さんと買い物に行きますか。\nいいえ、一人で行きます。',
          reading: 'おかあさんとかいものにいきますか。\nいいえ、ひとりでいきます。',
          romaji: 'okaasan to kaimono ni ikimasu ka.\niie, hitori de ikimasu.',
          vietnamese: 'Bạn đi mua sắm với mẹ à?\nKhông, tôi đi một mình.'
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
        }
      ]
    },
    // NEW YES/NO FOR g9
    {
      questionFormat: 'N が 好きですか',
      answerFormat: 'はい、好きです / いいえ、好きじゃありません',
      identifier: '〜か (Có thích... không)',
      tip: 'Dùng để hỏi xem ai đó có thích một vật/việc cụ thể nào không.',
      examples: [
        {
          japanese: '日本のアニメが好きですか。\nはい、とても好きです。',
          reading: 'にほんのアニメがすきですか。\nはい、とてもすきです。',
          romaji: 'nihon no anime ga suki desu ka.\nhai, totemo suki desu.',
          vietnamese: 'Bạn có thích Anime Nhật Bản không?\nVâng, rất thích.'
        },
        {
          japanese: '辛い料理が好きですか。\nいいえ、あまり好きじゃありません。',
          reading: 'からいりょうりがすきですか。\nいいえ、あまりすきじゃありません。',
          romaji: 'karai ryouri ga suki desu ka.\niie, amari suki ja arimasen.',
          vietnamese: 'Bạn có thích đồ ăn cay không?\nKhông, không thích lắm.'
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
          japanese: '料理が上手ですか。\nいいえ、下手です。',
          reading: 'りょうりがじょうずですか。\nいいえ、へたです。',
          romaji: 'ryouri ga jouzu desu ka.\niie, heta desu.',
          vietnamese: 'Bạn nấu ăn có giỏi không?\nKhông, tôi nấu tệ lắm.'
        }
      ]
    },
    // NEW ALTERNATIVE FOR g10
    {
      questionFormat: 'N1 と N2 と どちら が 上手ですか',
      answerFormat: 'N1 の ほう が 上手です',
      identifier: 'どちら (Cái nào... hơn)',
      tip: 'Câu hỏi so sánh, yêu cầu lựa chọn xem trong 2 thứ thì giỏi cái nào hơn.',
      examples: [
        {
          japanese: 'テニスとサッカーとどちらが上手ですか。\nサッカーのほうが上手です。',
          reading: 'テニスとサッカーとどちらがじょうずですか。\nサッカーのほうがじょうずです。',
          romaji: 'tenisu to sakkaa to dochira ga jouzu desu ka.\nsakkaa no hou ga jouzu desu.',
          vietnamese: 'Tennis và bóng đá, bạn giỏi cái nào hơn?\nTôi giỏi bóng đá hơn.'
        },
        {
          japanese: '英語と日本語とどちらが上手ですか。\n英語のほうが上手です。',
          reading: 'えいごとにほんごとどちらがじょうずですか。\nえいごのほうがじょうずです。',
          romaji: 'eigo to nihongo to dochira ga jouzu desu ka.\neigo no hou ga jouzu desu.',
          vietnamese: 'Tiếng Anh và tiếng Nhật, bạn giỏi cái nào hơn?\nTôi giỏi tiếng Anh hơn.'
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
          japanese: '今、何が欲しいですか。\nお金が欲しいです。',
          reading: 'いま、なにがほしいですか。\nおかねがほしいです。',
          romaji: 'ima, nani ga hoshii desu ka.\nokane ga hoshii desu.',
          vietnamese: 'Bây giờ bạn muốn có cái gì?\nTôi muốn có tiền.'
        }
      ]
    },
    // NEW YES/NO FOR g12
    {
      questionFormat: 'N が 欲しいですか',
      answerFormat: 'はい、欲しいです / いいえ、欲しくないです',
      identifier: '〜か (Có muốn... không)',
      tip: 'Dùng để hỏi xem ai đó có muốn một thứ cụ thể nào đó không.',
      examples: [
        {
          japanese: '新しいパソコンが欲しいですか。\nはい、とても欲しいです。',
          reading: 'あたらしいパソコンがほしいですか。\nはい、とてもほしいです。',
          romaji: 'atarashii pasokon ga hoshii desu ka.\nhai, totemo hoshii desu.',
          vietnamese: 'Bạn có muốn máy tính mới không?\nVâng, tôi rất muốn.'
        },
        {
          japanese: 'コーヒーが欲しいですか。\nいいえ、欲しくないです。',
          reading: 'コーヒーがほしいですか。\nいいえ、ほしくないです。',
          romaji: 'koohii ga hoshii desu ka.\niie, hoshikunai desu.',
          vietnamese: 'Bạn có muốn cà phê không?\nKhông, tôi không muốn.'
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
          japanese: '今、何をしたいですか。\n水を飲みたいです。',
          reading: 'いま、なにをしたいですか。\nみずをのみたいです。',
          romaji: 'ima, nani o shitai desu ka.\nmizu o nomitai desu.',
          vietnamese: 'Bây giờ bạn muốn làm gì?\nTôi muốn uống nước.'
        }
      ]
    },
    // NEW YES/NO FOR g13
    {
      questionFormat: 'Vたいですか',
      answerFormat: 'はい、Vたいです / いいえ、Vたくないです',
      identifier: '〜か (Có muốn làm... không)',
      tip: 'Hỏi xác nhận xem ai đó có muốn thực hiện một hành động không.',
      examples: [
        {
          japanese: '今、ご飯を食べたいですか。\nはい、食べたいです。',
          reading: 'いま、ごはんをたべたいですか。\nはい、たべたいです。',
          romaji: 'ima, gohan o tabetai desu ka.\nhai, tabetai desu.',
          vietnamese: 'Bây giờ bạn có muốn ăn cơm không?\nVâng, tôi muốn ăn.'
        },
        {
          japanese: '日曜日、仕事に行きたいですか。\nいいえ、行きたくないです。',
          reading: 'にちようび、しごとにいきたいですか。\nいいえ、いきたくないです。',
          romaji: 'nichiyoubi, shigoto ni ikitai desu ka.\niie, ikitakunai desu.',
          vietnamese: 'Chủ nhật bạn có muốn đi làm không?\nKhông, tôi không muốn đi đâu.'
        }
      ]
    }
  ]
};

// We will use a regex to replace the existing `qa: [...]` block for each grammar point
// To do this reliably, we match `id: 'g1',` and then find the subsequent `qa: [\s\S]*?],`

for (const [id, qaArray] of Object.entries(qaData)) {
  const targetStr = `id: '${id}',`;
  const index = content.indexOf(targetStr);
  if (index !== -1) {
    const qaRegex = /qa:\s*\[[\s\S]*?\]\s*,/;
    // We only want to search starting from `index`
    const substr = content.substring(index);
    const match = substr.match(qaRegex);
    if (match) {
      const qaString = `qa: ${JSON.stringify(qaArray, null, 2).split('\n').join('\n        ')},`;
      content = content.slice(0, index + match.index!) + qaString + content.slice(index + match.index! + match[0].length);
    }
  }
}

fs.writeFileSync(grammarFile, content);
console.log('Injected multi-type QA sections successfully!');
