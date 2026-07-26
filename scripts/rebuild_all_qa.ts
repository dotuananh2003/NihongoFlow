import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const grammarFile = path.join(__dirname, '../src/data/grammarData.ts');
let content = fs.readFileSync(grammarFile, 'utf8');

// 1. Dọn dẹp SẠCH SẼ mọi block `qa:` hiện có để tránh trùng lặp
content = content.replace(/\s*qa:\s*\[[\s\S]*?\]\s*,/g, '');

const qaData: Record<string, any[]> = {
  // G7: TỒN TẠI & VỊ TRÍ
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
  // G28: DI CHUYỂN
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
  ],
  // G23: LIỆT KÊ (や)
  'g23': [
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

  // BÀI 5
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

// Insert correct QA blocks
for (const [id, qaArray] of Object.entries(qaData)) {
  const targetRegex = new RegExp(`id:\\s*'${id}'\\s*,`);
  const match = content.match(targetRegex);
  if (match) {
    const insertPos = match.index! + match[0].length;
    const qaString = `\n        qa: ${JSON.stringify(qaArray, null, 2).split('\n').join('\n        ')},`;
    content = content.slice(0, insertPos) + qaString + content.slice(insertPos);
  }
}

fs.writeFileSync(grammarFile, content);
console.log('Rebuilt all QA sections successfully! Clean and precise mapping.');
