import type { GrammarLesson } from './grammarData';

export const grammarLesson7JPD123: GrammarLesson = {
  id: 'lesson-7',
  title: 'Bài 7',
  description: 'Sự tồn tại, Yêu cầu, Cách làm và Hành động đang diễn ra',
  grammarPoints: [
    {
      id: 'g19',
      title: 'N1 に N2 が います。',
      meaning: 'Có người/động vật ở đâu',
      type: 'Tồn tại',
      jlpt: 'N5',
      difficulty: 'Cơ bản',
      icon: 'い',
      iconBg: 'bg-blue-50 dark:bg-blue-900/30',
      iconColor: 'text-blue-500',
      barColor: 'bg-blue-500',
      structure: 'N1 (Địa điểm) に N2 (Người/Động vật) が います',
      structureDetails: 'Danh từ chỉ địa điểm + に + Danh từ chỉ người/động vật + が + います',
      explanationTitle: 'Ở N1 có N2 (Người/Động vật)',
      explanationDetails: 'Sự tồn tại của sinh vật',
      usage: 'Dùng để diễn tả sự tồn tại, hiện diện của con người hoặc động vật (những vật có thể tự di chuyển được) ở một địa điểm nào đó.',
      note: 'Tuyệt đối không dùng います cho đồ vật vô tri vô giác hay thực vật (cây cối).',
      memoryTip: 'Chữ い trong います giống như con người đang đứng thẳng (viết tắt là I). Con người và động vật thì dùng います!',
      commonWords: 'Các từ chỉ vị trí: 上 (trên), 下 (dưới), 前 (trước), 後ろ (sau), 中 (trong)...',
      qa: [
        {
          questionFormat: 'N1 に だれ/なに が いますか',
          answerFormat: 'N2 が います',
          identifier: 'だれ/なに (Ai/Con gì)',
          tip: 'Dùng だれ để hỏi về người và なに để hỏi về động vật.',
          examples: [
            {
              japanese: 'あそこに誰がいますか。\n田中さんがいます。',
              reading: 'あそこにだれがいますか。\nたなかさんがいます。',
              romaji: 'asoko ni dare ga imasu ka.\ntanaka san ga imasu.',
              vietnamese: 'Ở đằng kia có ai vậy?\nCó anh Tanaka.'
            },
            {
              japanese: '箱の中に何がいますか。\n猫がいます。',
              reading: 'はこのなかになにがいますか。\nねこがいます。',
              romaji: 'hako no naka ni nani ga imasu ka.\nneko ga imasu.',
              vietnamese: 'Trong hộp có con gì vậy?\nCó con mèo.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'N1 に N2 が あります (Ở N1 có N2)',
          meaning: 'Sự tồn tại của đồ vật',
          example: { japanese: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', romaji: 'tsukue no ue ni hon ga arimasu.', vietnamese: 'Trên bàn có cuốn sách.' }
        },
        {
          name: 'N2 は N1 に います (N2 thì ở N1)',
          meaning: 'Nhấn mạnh chủ thể đang ở đâu',
          example: { japanese: '田中さんはあそこにいます。', reading: 'たなかさんはあそこにいます。', romaji: 'tanaka san wa asoko ni imasu.', vietnamese: 'Anh Tanaka thì ở đằng kia.' }
        }
      ],
      examples: [
        { japanese: 'あそこに人がいます。', reading: 'あそこにひとがいます。', romaji: 'asoko ni hito ga imasu.', vietnamese: 'Ở đằng kia có người.' },
        { japanese: '教室に先生がいます。', reading: 'きょうしつにせんせいがいます。', romaji: 'kyoushitsu ni sensei ga imasu.', vietnamese: 'Trong phòng học có giáo viên.' },
        { japanese: '庭に犬がいます。', reading: 'にわにいぬがいます。', romaji: 'niwa ni inu ga imasu.', vietnamese: 'Ngoài vườn có con chó.' },
        { japanese: '公園に子供がいます。', reading: 'こうえんにこどもがいます。', romaji: 'kouen ni kodomo ga imasu.', vietnamese: 'Trong công viên có trẻ em.' },
        { japanese: '部屋の中に猫がいます。', reading: 'へやのなかにねこがいます。', romaji: 'heya no naka ni neko ga imasu.', vietnamese: 'Trong phòng có con mèo.' },
        { japanese: '木の下に男の人がいます。', reading: 'きのしたにおとこのひとがいます。', romaji: 'ki no shita ni otoko no hito ga imasu.', vietnamese: 'Dưới gốc cây có người đàn ông.' },
        { japanese: 'ドアの前に女の人がいます。', reading: 'ドアのまえにおんなのひとがいます。', romaji: 'doa no mae ni onna no hito ga imasu.', vietnamese: 'Trước cửa có người phụ nữ.' },
        { japanese: '車の中に赤ちゃんがいます。', reading: 'くるまのなかにあかちゃんがいます。', romaji: 'kuruma no naka ni akachan ga imasu.', vietnamese: 'Trong xe có em bé.' },
        { japanese: 'あそこに佐藤さんがいます。', reading: 'あそこにさとうさんがいます。', romaji: 'asoko ni satou san ga imasu.', vietnamese: 'Ở đằng kia có chị Sato.' },
        { japanese: '屋上に鳥がいます。', reading: 'おくじょうにとりがいます。', romaji: 'okujou ni tori ga imasu.', vietnamese: 'Trên sân thượng có con chim.' },
        { japanese: '池に魚がいます。', reading: 'いけにさかながいます。', romaji: 'ike ni sakana ga imasu.', vietnamese: 'Trong ao có cá.' },
        { japanese: 'あそこに友達がいます。', reading: 'あそこにともだちがいます。', romaji: 'asoko ni tomodachi ga imasu.', vietnamese: 'Ở đằng kia có bạn tôi.' },
        { japanese: '会社の前に社長がいます。', reading: 'かいしゃのまえにしゃちょうがいます。', romaji: 'kaisha no mae ni shachou ga imasu.', vietnamese: 'Trước công ty có giám đốc.' },
        { japanese: 'ベッドの下に虫がいます。', reading: 'ベッドのしたにむしがいます。', romaji: 'beddo no shita ni mushi ga imasu.', vietnamese: 'Dưới giường có con côn trùng.' },
        { japanese: '私の隣に山田さんがいます。', reading: 'わたしのとなりにやまださんがいます。', romaji: 'watashi no tonari ni yamada san ga imasu.', vietnamese: 'Bên cạnh tôi có anh Yamada.' }
      ]
    },
    {
      id: 'g20',
      title: 'N1 に N2 が あります。',
      meaning: 'Có vật ở đâu',
      type: 'Tồn tại',
      jlpt: 'N5',
      difficulty: 'Cơ bản',
      icon: 'あ',
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-500',
      barColor: 'bg-emerald-500',
      structure: 'N1 (Địa điểm) に N2 (Đồ vật) が あります',
      structureDetails: 'Danh từ chỉ địa điểm + に + Danh từ chỉ đồ vật/thực vật + が + あります',
      explanationTitle: 'Ở N1 có N2 (Đồ vật/Sự việc)',
      explanationDetails: 'Sự tồn tại của vật vô tri vô giác',
      usage: 'Dùng để diễn tả sự tồn tại của đồ vật, cây cối, hoặc một sự kiện/hiện tượng ở một địa điểm nào đó.',
      note: 'Có thể dùng cho các sự kiện như: Lễ hội, Kỳ thi, Trận đấu (Ở địa điểm N1 diễn ra sự kiện N2).',
      memoryTip: 'Cây cỏ (thực vật) không tự di chuyển được nên cũng được xếp vào nhóm "đồ vật" và dùng あります nhé!',
      commonWords: 'Các từ chỉ vị trí và các danh từ chỉ đồ vật, sự kiện.',
      qa: [
        {
          questionFormat: 'N1 に なに が ありますか',
          answerFormat: 'N2 が あります',
          identifier: 'なに (Cái gì)',
          tip: 'Dùng để hỏi xem ở một địa điểm có vật gì.',
          examples: [
            {
              japanese: '机の上に何がありますか。\nパソコンがあります。',
              reading: 'つくえのうえになにがありますか。\nパソコンがあります。',
              romaji: 'tsukue no ue ni nani ga arimasu ka.\npasokon ga arimasu.',
              vietnamese: 'Trên bàn có cái gì vậy?\nCó cái máy tính.'
            }
          ]
        },
        {
          questionFormat: 'N1 に N2 が ありますか',
          answerFormat: 'はい、あります / いいえ、ありません',
          identifier: '〜か (Có... không)',
          tip: 'Dùng để xác nhận xem có vật đó ở địa điểm đó không.',
          examples: [
            {
              japanese: '近くにコンビニがありますか。\nはい、あります。',
              reading: 'ちかくにコンビニがありますか。\nはい、あります。',
              romaji: 'chikaku ni konbini ga arimasu ka.\nhai, arimasu.',
              vietnamese: 'Ở gần đây có cửa hàng tiện lợi không?\nVâng, có.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'N1 に N2 や N3 が あります (Ở N1 có N2 và N3...)',
          meaning: 'Liệt kê một vài vật tiêu biểu',
          example: { japanese: '机の上に本やペンがあります。', reading: 'つくえのうえにほんやペンがあります。', romaji: 'tsukue no ue ni hon ya pen ga arimasu.', vietnamese: 'Trên bàn có sách và bút...' }
        },
        {
          name: 'N2 は N1 に あります (N2 thì ở N1)',
          meaning: 'Nhấn mạnh vị trí của vật',
          example: { japanese: '本は机の上にあります。', reading: 'ほんはつくえのうえにあります。', romaji: 'hon wa tsukue no ue ni arimasu.', vietnamese: 'Cuốn sách thì ở trên bàn.' }
        }
      ],
      examples: [
        { japanese: '駅の前に本屋があります。', reading: 'えきのまえにほんやがあります。', romaji: 'eki no mae ni honya ga arimasu.', vietnamese: 'Trước nhà ga có hiệu sách.' },
        { japanese: '机の上に鞄があります。', reading: 'つくえのうえにかばんがあります。', romaji: 'tsukue no ue ni kaban ga arimasu.', vietnamese: 'Trên bàn có cái cặp.' },
        { japanese: '部屋にテレビがあります。', reading: 'へやにテレビがあります。', romaji: 'heya ni terebi ga arimasu.', vietnamese: 'Trong phòng có tivi.' },
        { japanese: '冷蔵庫の中にりんごがあります。', reading: 'れいぞうこのなかにりんごがあります。', romaji: 'reizouko no naka ni ringo ga arimasu.', vietnamese: 'Trong tủ lạnh có quả táo.' },
        { japanese: '庭に桜の木があります。', reading: 'にわにさくらのきがあります。', romaji: 'niwa ni sakura no ki ga arimasu.', vietnamese: 'Trong vườn có cây hoa anh đào.' },
        { japanese: 'あそこにビルがあります。', reading: 'あそこにビルがあります。', romaji: 'asoko ni biru ga arimasu.', vietnamese: 'Ở đằng kia có tòa nhà.' },
        { japanese: '椅子の下に靴があります。', reading: 'いすのしたにくつがあります。', romaji: 'isu no shita ni kutsu ga arimasu.', vietnamese: 'Dưới ghế có đôi giày.' },
        { japanese: '棚の中に本があります。', reading: 'たなのなかにほんがあります。', romaji: 'tana no naka ni hon ga arimasu.', vietnamese: 'Trong kệ có sách.' },
        { japanese: '病院の隣に薬局があります。', reading: 'びょういんのとなりにやっきょくがあります。', romaji: 'byouin no tonari ni yakkyoku ga arimasu.', vietnamese: 'Bên cạnh bệnh viện có hiệu thuốc.' },
        { japanese: '学校の近くに公園があります。', reading: 'がっこうのちかくにこうえんがあります。', romaji: 'gakkou no chikaku ni kouen ga arimasu.', vietnamese: 'Gần trường học có công viên.' },
        { japanese: '箱の中に写真があります。', reading: 'はこのなかにしゃしんがあります。', romaji: 'hako no naka ni shashin ga arimasu.', vietnamese: 'Trong hộp có bức ảnh.' },
        { japanese: '机の右に電話があります。', reading: 'つくえのみぎにでんわがあります。', romaji: 'tsukue no migi ni denwa ga arimasu.', vietnamese: 'Bên phải cái bàn có điện thoại.' },
        { japanese: '家の後ろに山があります。', reading: 'いえとうしろにやまがあります。', romaji: 'ie no ushiro ni yama ga arimasu.', vietnamese: 'Phía sau nhà có ngọn núi.' },
        { japanese: 'カバンの中に鍵があります。', reading: 'カバンのなかにかぎがあります。', romaji: 'kaban no naka ni kagi ga arimasu.', vietnamese: 'Trong cặp có chìa khóa.' },
        { japanese: 'あした、学校で試験があります。', reading: 'あした、がっこうでしけんがあります。', romaji: 'ashita, gakkou de shiken ga arimasu.', vietnamese: 'Ngày mai, ở trường có kỳ thi.' }
      ]
    },
    {
      id: 'g21',
      title: 'Vて ください',
      meaning: 'Xin hãy V',
      type: 'Yêu cầu',
      jlpt: 'N5',
      difficulty: 'Trung bình',
      icon: 'て',
      iconBg: 'bg-purple-50 dark:bg-purple-900/30',
      iconColor: 'text-purple-500',
      barColor: 'bg-purple-500',
      structure: 'Vて + ください',
      structureDetails: 'Động từ chia thể て + ください',
      explanationTitle: 'Xin hãy làm V',
      explanationDetails: 'Nhờ vả, yêu cầu lịch sự',
      usage: 'Dùng để nhờ vả, yêu cầu hoặc sai khiến người khác làm một việc gì đó một cách lịch sự.',
      note: 'Dù là câu lịch sự nhưng bản chất vẫn mang ý nghĩa sai khiến, nên hạn chế dùng với cấp trên. Với cấp trên nên dùng Vて いただけませんか。',
      memoryTip: 'ください có nghĩa là "cho tôi". Động từ chia thể て ghép với ください mang nghĩa "Hãy làm việc đó cho tôi".',
      commonWords: 'すみませんが (Xin lỗi nhưng...), ちょっと (một chút)...',
      qa: [
        {
          questionFormat: 'すみませんが、Vて ください',
          answerFormat: 'はい、わかりました',
          identifier: 'すみませんが (Xin lỗi...)',
          tip: 'Khi nhờ vả, người Nhật thường thêm すみませんが vào trước để làm mềm câu văn.',
          examples: [
            {
              japanese: 'すみませんが、ドアを閉めてください。\nはい、わかりました。',
              reading: 'すみませんが、ドアをしめてください。\nはい、わかりました。',
              romaji: 'sumimasen ga, doa o shimete kudasai.\nhai, wakarimashita.',
              vietnamese: 'Xin lỗi, xin hãy đóng cửa lại giúp tôi.\nVâng, tôi hiểu rồi.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'Vないで ください (Xin đừng V)',
          meaning: 'Yêu cầu người khác KHÔNG làm gì',
          example: { japanese: 'ここに写真を撮らないでください。', reading: 'ここにしゃしんをとらないでください。', romaji: 'koko ni shashin o toranaide kudasai.', vietnamese: 'Xin đừng chụp ảnh ở đây.' }
        },
        {
          name: 'Vて いただけませんか (Bạn có thể V giúp tôi được không?)',
          meaning: 'Nhờ vả lịch sự hơn, dùng cho cấp trên',
          example: { japanese: 'これを教えていただけませんか。', reading: 'これをおしえていただけませんか。', romaji: 'kore o oshiete itadakemasen ka.', vietnamese: 'Bạn có thể chỉ cho tôi cái này được không?' }
        }
      ],
      examples: [
        { japanese: 'とってください。', reading: 'とってください。', romaji: 'totte kudasai.', vietnamese: 'Xin hãy lấy.' },
        { japanese: 'ちょっと待ってください。', reading: 'ちょっとまってください。', romaji: 'chotto matte kudasai.', vietnamese: 'Xin hãy đợi một chút.' },
        { japanese: 'ここに名前を書いてください。', reading: 'ここになまえをかいてください。', romaji: 'koko ni namae o kaite kudasai.', vietnamese: 'Xin hãy viết tên vào đây.' },
        { japanese: 'あの辞書を見せてください。', reading: 'あのじしょをみせてください。', romaji: 'ano jisho o misete kudasai.', vietnamese: 'Xin hãy cho tôi xem quyển từ điển kia.' },
        { japanese: 'ゆっくり話してください。', reading: 'ゆっくりはなしてください。', romaji: 'yukkuri hanashite kudasai.', vietnamese: 'Xin hãy nói chậm lại.' },
        { japanese: 'もう一度言ってください。', reading: 'もういちどいってください。', romaji: 'mou ichido itte kudasai.', vietnamese: 'Xin hãy nói lại một lần nữa.' },
        { japanese: 'ドアを開けてください。', reading: 'ドアをあけてください。', romaji: 'doa o akete kudasai.', vietnamese: 'Xin hãy mở cửa.' },
        { japanese: '窓を閉めてください。', reading: 'まどをしめてください。', romaji: 'mado o shimete kudasai.', vietnamese: 'Xin hãy đóng cửa sổ.' },
        { japanese: '電気をつけてください。', reading: 'でんきをつけてください。', romaji: 'denki o tsukete kudasai.', vietnamese: 'Xin hãy bật điện.' },
        { japanese: 'エアコンを消してください。', reading: 'エアコンをけしてください。', romaji: 'eakon o keshite kudasai.', vietnamese: 'Xin hãy tắt điều hòa.' },
        { japanese: '急いでください。', reading: 'いそいでください。', romaji: 'isoide kudasai.', vietnamese: 'Xin hãy nhanh lên.' },
        { japanese: '右へ曲がってください。', reading: 'みぎへまがってください。', romaji: 'migi e magatte kudasai.', vietnamese: 'Xin hãy rẽ phải.' },
        { japanese: 'まっすぐ行ってください。', reading: 'まっすぐいってください。', romaji: 'massugu itte kudasai.', vietnamese: 'Xin hãy đi thẳng.' },
        { japanese: 'この本を読んでください。', reading: 'このほんをよんでください。', romaji: 'kono hon o yonde kudasai.', vietnamese: 'Xin hãy đọc cuốn sách này.' },
        { japanese: '明日、電話をかけてください。', reading: 'あした、でんわをかけてください。', romaji: 'ashita, denwa o kakete kudasai.', vietnamese: 'Ngày mai xin hãy gọi điện thoại.' }
      ]
    },
    {
      id: 'g22',
      title: '(Nの) Vます かた',
      meaning: 'Cách làm',
      type: 'Phương pháp',
      jlpt: 'N5',
      difficulty: 'Trung bình',
      icon: 'か',
      iconBg: 'bg-yellow-50 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-500',
      barColor: 'bg-yellow-500',
      structure: '(Danh từ の) + V ます (bỏ ます) + かた',
      structureDetails: 'Động từ bỏ ます thêm かた để biến thành danh từ mang nghĩa "cách làm". Nếu có tân ngữ đi kèm thì dùng trợ từ の.',
      explanationTitle: 'Cách làm việc gì đó',
      explanationDetails: 'Phương pháp, cách thức',
      usage: 'Dùng để diễn đạt phương pháp, cách thức thực hiện một hành động nào đó.',
      note: 'Vますかた sẽ đóng vai trò như một danh từ trong câu.',
      memoryTip: 'Chữ かた (phương/cách) ghép thẳng vào đuôi động từ (sau khi vứt bỏ ます).',
      commonWords: '作り方 (cách làm/chế biến), 読み方 (cách đọc), 使い方 (cách dùng)...',
      qa: [
        {
          questionFormat: 'Vますかた を 教えてください',
          answerFormat: 'はい、...',
          identifier: '教えてください (Xin hãy chỉ cho tôi)',
          tip: 'Thường dùng cấu trúc này để nhờ người khác chỉ cho cách làm việc gì đó.',
          examples: [
            {
              japanese: '漢字の読み方を教えてください。\nはい、わかりました。',
              reading: 'かんじのよみかたをおしえてください。\nはい、わかりました。',
              romaji: 'kanji no yomikata o oshiete kudasai.\nhai, wakarimashita.',
              vietnamese: 'Xin hãy chỉ cho tôi cách đọc chữ Kanji này.\nVâng, tôi hiểu rồi.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'N の Vますかた (Cách làm N)',
          meaning: 'Tân ngữ đi kèm biến thành sở hữu cách',
          example: { japanese: '美味しいコーヒーの作り方', reading: 'おいしいコーヒーのつくりかた', romaji: 'oishii koohii no tsukurikata', vietnamese: 'Cách pha cà phê ngon' }
        }
      ],
      examples: [
        { japanese: 'つくりかたをおしえてください。', reading: 'つくりかたをおしえてください。', romaji: 'tsukurikata o oshiete kudasai.', vietnamese: 'Xin chỉ cách làm.' },
        { japanese: 'この漢字の読み方がわかりません。', reading: 'このかんじのよみかたがわかりません。', romaji: 'kono kanji no yomikata ga wakarimasen.', vietnamese: 'Tôi không biết cách đọc chữ Kanji này.' },
        { japanese: 'ATMの使い方を教えてください。', reading: 'ATMのつかいかたをおしえてください。', romaji: 'ATM no tsukaikata o oshiete kudasai.', vietnamese: 'Xin hãy chỉ cho tôi cách dùng máy ATM.' },
        { japanese: '美味しいケーキの作り方を知っていますか。', reading: 'おいしいケーキのつくりかたをしっていますか。', romaji: 'oishii keeki no tsukurikata o shitte imasu ka.', vietnamese: 'Bạn có biết cách làm bánh ngọt ngon không?' },
        { japanese: 'このパソコンの使い方は簡単です。', reading: 'このパソコンのつかいかたはかんたんです。', romaji: 'kono pasokon no tsukaikata wa kantan desu.', vietnamese: 'Cách dùng máy tính này rất đơn giản.' },
        { japanese: 'すき焼きの作り方を教えてください。', reading: 'すきやきのつくりかたをおしえてください。', romaji: 'sukiyaki no tsukurikata o oshiete kudasai.', vietnamese: 'Xin hãy chỉ cho tôi cách nấu Sukiyaki.' },
        { japanese: 'この携帯電話の使い方がわかりません。', reading: 'このけいたいでんわのつかいかたがわかりません。', romaji: 'kono keitaidenwa no tsukaikata ga wakarimasen.', vietnamese: 'Tôi không biết cách dùng điện thoại di động này.' },
        { japanese: 'その言葉の言い方が少し違います。', reading: 'そのことばのいいかたがすこしちがいます。', romaji: 'sono kotoba no iikata ga sukoshi chigaimasu.', vietnamese: 'Cách nói từ đó hơi sai một chút.' },
        { japanese: '美味しいお茶の入れ方を習いたいです。', reading: 'おいしいおちゃのいれかたをならいたいです。', romaji: 'oishii ocha no irekata o naraitai desu.', vietnamese: 'Tôi muốn học cách pha trà ngon.' },
        { japanese: '辞書の引き方を教えてください。', reading: 'じしょのひきかたをおしえてください。', romaji: 'jisho no hikikata o oshiete kudasai.', vietnamese: 'Xin hãy chỉ tôi cách tra từ điển.' },
        { japanese: 'レポートの書き方がわかりません。', reading: 'レポートのかきかたがわかりません。', romaji: 'repooto no kakikata ga wakarimasen.', vietnamese: 'Tôi không biết cách viết báo cáo.' }
      ]
    },
    {
      id: 'g23',
      title: 'どの N ですか',
      meaning: 'N nào (chưa xác định)',
      type: 'Nghi vấn từ',
      jlpt: 'N5',
      difficulty: 'Cơ bản',
      icon: 'ど',
      iconBg: 'bg-orange-50 dark:bg-orange-900/30',
      iconColor: 'text-orange-500',
      barColor: 'bg-orange-500',
      structure: 'どの + N',
      structureDetails: 'どの luôn phải đi kèm với một danh từ theo sau.',
      explanationTitle: '[Danh từ] nào?',
      explanationDetails: 'Hỏi về một vật/người trong nhóm từ 3 trở lên',
      usage: 'Dùng để xác định một vật hoặc một người cụ thể trong một nhóm có từ 3 đối tượng trở lên.',
      note: 'Tuyệt đối không dùng どの đứng một mình, phải luôn có danh từ theo sau (vd: どの人, どの車).',
      memoryTip: 'Cấu trúc: この (này), その (đó), あの (kia), どの (nào). Tất cả đều bắt buộc phải có Danh từ theo sau!',
      commonWords: 'どの人 (người nào), どの車 (xe nào), どの傘 (ô nào)...',
      qa: [
        {
          questionFormat: 'N1 は どの N2 ですか',
          answerFormat: 'あの/この/その N2 です',
          identifier: 'どの (Nào)',
          tip: 'Khi trả lời, ta dùng các từ chỉ định vị trí như この, その, あの kèm với danh từ.',
          examples: [
            {
              japanese: '田中さんの傘はどの傘ですか。\nあの赤い傘です。',
              reading: 'たなかさんのかさはどのかさですか。\nあのあかいかさです。',
              romaji: 'tanaka san no kasa wa dono kasa desu ka.\nano akai kasa desu.',
              vietnamese: 'Ô của anh Tanaka là cái ô nào?\nLà cái ô màu đỏ kia.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'N は どれですか (Cái nào?)',
          meaning: 'Hỏi về đồ vật (đứng một mình, không cần danh từ sau nó)',
          example: { japanese: '田中さんの傘はどれですか。', reading: 'たなかさんのかさはどれですか。', romaji: 'tanaka san no kasa wa dore desu ka.', vietnamese: 'Ô của anh Tanaka là cái nào?' }
        }
      ],
      examples: [
        { japanese: 'どのおさらですか。', reading: 'どのおさらですか。', romaji: 'dono osara desu ka.', vietnamese: 'Cái đĩa nào?' },
        { japanese: '山田さんの車はどの車ですか。', reading: 'やまださんのくるまはどのくるまですか。', romaji: 'yamada san no kuruma wa dono kuruma desu ka.', vietnamese: 'Xe ô tô của anh Yamada là xe nào?' },
        { japanese: '木村さんはどの人ですか。', reading: 'きむらさんはどのひとですか。', romaji: 'kimura san wa dono hito desu ka.', vietnamese: 'Chị Kimura là người nào?' },
        { japanese: '私のカバンはどのカバンですか。', reading: 'わたしのカバンはどのカバンですか。', romaji: 'watashi no kaban wa dono kaban desu ka.', vietnamese: 'Cái cặp của tôi là cái cặp nào?' },
        { japanese: 'あなたの辞書はどの辞書ですか。', reading: 'あなたのじしょはどのじしょですか。', romaji: 'anata no jisho wa dono jisho desu ka.', vietnamese: 'Từ điển của bạn là quyển từ điển nào?' },
        { japanese: '田中さんの家はどの家ですか。', reading: 'たなかさんのいえはどのいえですか。', romaji: 'tanaka san no ie wa dono ie desu ka.', vietnamese: 'Nhà của anh Tanaka là ngôi nhà nào?' },
        { japanese: '佐藤さんのカメラはどのカメラですか。', reading: 'さとうさんのカメラはどのカメラですか。', romaji: 'satou san no kamera wa dono kamera desu ka.', vietnamese: 'Máy ảnh của chị Sato là máy ảnh nào?' },
        { japanese: 'あなたのパソコンはどのパソコンですか。', reading: 'あなたのパソコンはどのパソコンですか。', romaji: 'anata no pasokon wa dono pasokon desu ka.', vietnamese: 'Máy tính của bạn là máy nào?' },
        { japanese: 'ミラーさんの時計はどの時計ですか。', reading: 'ミラーさんのとけいはどのとけいですか。', romaji: 'miraa san no tokei wa dono tokei desu ka.', vietnamese: 'Đồng hồ của anh Miller là cái nào?' },
        { japanese: '私の靴はどの靴ですか。', reading: 'わたしのくつはどのくつですか。', romaji: 'watashi no kutsu wa dono kutsu desu ka.', vietnamese: 'Giày của tôi là đôi nào?' }
      ]
    },
    {
      id: 'g24',
      title: 'N は どれですか',
      meaning: 'Cái nào',
      type: 'Nghi vấn từ',
      jlpt: 'N5',
      difficulty: 'Cơ bản',
      icon: 'ど',
      iconBg: 'bg-red-50 dark:bg-red-900/30',
      iconColor: 'text-red-500',
      barColor: 'bg-red-500',
      structure: 'N は どれ ですか',
      structureDetails: 'どれ đóng vai trò như một đại từ nghi vấn độc lập.',
      explanationTitle: 'Cái nào (trong số từ 3 cái trở lên)?',
      explanationDetails: 'Hỏi về đồ vật',
      usage: 'Dùng để yêu cầu người nghe chỉ ra một vật cụ thể trong một nhóm có từ 3 vật trở lên.',
      note: 'Khác với どの (phải có danh từ đi kèm), どれ đứng một mình. Lưu ý: どれ chỉ dùng cho ĐỒ VẬT, không dùng cho người.',
      memoryTip: 'Cấu trúc: これ (cái này), それ (cái đó), あれ (cái kia), どれ (cái nào). Đều có đuôi れ và đứng độc lập!',
      commonWords: 'どれ (cái nào)',
      qa: [
        {
          questionFormat: 'N は どれ ですか',
          answerFormat: 'これ / それ / あれ です',
          identifier: 'どれ (Cái nào)',
          tip: 'Khi trả lời, ta dùng đại từ chỉ thị đồ vật (これ, それ, あれ).',
          examples: [
            {
              japanese: '山田さんのカメラはどれですか。\nあれです。',
              reading: 'やまださんのカメラはどれですか。\nあれです。',
              romaji: 'yamada san no kamera wa dore desu ka.\nare desu.',
              vietnamese: 'Máy ảnh của anh Yamada là cái nào?\nLà cái kia.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'N は どちら/どっちですか (Cái nào trong 2 cái?)',
          meaning: 'Dùng khi chỉ có 2 sự lựa chọn',
          example: { japanese: '田中さんの傘はどちらですか。', reading: 'たなかさんのかさはどちらですか。', romaji: 'tanaka san no kasa wa dochira desu ka.', vietnamese: 'Ô của anh Tanaka là cái nào (trong 2 cái)?' }
        }
      ],
      examples: [
        { japanese: 'しおはどれですか。', reading: 'しおはどれですか。', romaji: 'shio wa dore desu ka.', vietnamese: 'Muối là cái nào?' },
        { japanese: 'あなたのカバンはどれですか。', reading: 'あなたのカバンはどれですか。', romaji: 'anata no kaban wa dore desu ka.', vietnamese: 'Cặp của bạn là cái nào?' },
        { japanese: 'ミラーさんの傘はどれですか。', reading: 'ミラーさんのかさはどれですか。', romaji: 'miraa san no kasa wa dore desu ka.', vietnamese: 'Ô của anh Miller là cái nào?' },
        { japanese: '私の鍵はどれですか。', reading: 'わたしのかぎはどれですか。', romaji: 'watashi no kagi wa dore desu ka.', vietnamese: 'Chìa khóa của tôi là cái nào?' },
        { japanese: '一番美味しいケーキはどれですか。', reading: 'いちばんおいしいケーキはどれですか。', romaji: 'ichiban oishii keeki wa dore desu ka.', vietnamese: 'Cái bánh ngon nhất là cái nào?' },
        { japanese: '新しい車はどれですか。', reading: 'あたらしいくるまはどれですか。', romaji: 'atarashii kuruma wa dore desu ka.', vietnamese: 'Chiếc xe mới là cái nào?' },
        { japanese: 'あなたの辞書はどれですか。', reading: 'あなたのじしょはどれですか。', romaji: 'anata no jisho wa dore desu ka.', vietnamese: 'Từ điển của bạn là cái nào?' },
        { japanese: '田中さんの携帯電話はどれですか。', reading: 'たなかさんのけいたいでんわはどれですか。', romaji: 'tanaka san no keitaidenwa wa dore desu ka.', vietnamese: 'Điện thoại của anh Tanaka là cái nào?' },
        { japanese: '私の机はどれですか。', reading: 'わたしのつくえはどれですか。', romaji: 'watashi no tsukue wa dore desu ka.', vietnamese: 'Bàn của tôi là cái nào?' },
        { japanese: 'お茶はどれですか。', reading: 'おちゃはどれですか。', romaji: 'ocha wa dore desu ka.', vietnamese: 'Trà là cái nào?' }
      ]
    },
    {
      id: 'g25',
      title: 'N で Vます',
      meaning: 'V bằng dụng cụ',
      type: 'Phương tiện/Dụng cụ',
      jlpt: 'N5',
      difficulty: 'Cơ bản',
      icon: 'で',
      iconBg: 'bg-teal-50 dark:bg-teal-900/30',
      iconColor: 'text-teal-500',
      barColor: 'bg-teal-500',
      structure: 'N (Phương tiện/Dụng cụ) + で + V',
      structureDetails: 'Danh từ chỉ phương tiện, công cụ, hoặc ngôn ngữ + Trợ từ で + Động từ.',
      explanationTitle: 'Làm việc gì đó bằng công cụ/phương tiện gì',
      explanationDetails: 'Trợ từ で chỉ phương tiện',
      usage: 'Dùng để diễn tả phương tiện, dụng cụ, hoặc ngôn ngữ được sử dụng để thực hiện một hành động.',
      note: 'Đừng nhầm lẫn với trợ từ で chỉ địa điểm xảy ra hành động (vd: 食堂で食べる).',
      memoryTip: 'Trợ từ で vô cùng đa năng, khi đi với đồ vật/ngôn ngữ thì nó mang nghĩa "Bằng" (bằng xe máy, bằng tiếng Nhật, bằng đũa...).',
      commonWords: '箸 (đũa), 車 (ô tô), 自転車 (xe đạp), 日本語 (tiếng Nhật)...',
      qa: [
        {
          questionFormat: '何で Vますか',
          answerFormat: 'N で Vます',
          identifier: '何で (Bằng gì)',
          tip: 'Chú ý: 何で (nande) có thể hiểu là "bằng gì" hoặc "tại sao" tùy ngữ cảnh. Để tránh nhầm lẫn, đôi khi người Nhật nói là なにで (nani de).',
          examples: [
            {
              japanese: '何でご飯を食べますか。\n箸で食べます。',
              reading: 'なにでごはんをたべますか。\nはしでたべます。',
              romaji: 'nani de gohan o tabemasu ka.\nhashi de tabemasu.',
              vietnamese: 'Bạn ăn cơm bằng gì?\nTôi ăn bằng đũa.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'N で (Địa điểm)',
          meaning: 'Làm gì ở đâu',
          example: { japanese: '食堂でご飯を食べます。', reading: 'しょくどうでごはんをたべます。', romaji: 'shokudou de gohan o tabemasu.', vietnamese: 'Ăn cơm ở nhà ăn.' }
        }
      ],
      examples: [
        { japanese: 'はしで食べます。', reading: 'はしでたべます。', romaji: 'hashi de tabemasu.', vietnamese: 'Ăn bằng đũa.' },
        { japanese: 'スプーンでスープを飲みます。', reading: 'スプーンでスープをのみます。', romaji: 'supuun de suupu o nomimasu.', vietnamese: 'Uống súp bằng thìa.' },
        { japanese: '日本語でレポートを書きます。', reading: 'にほんごでレポートをかきます。', romaji: 'nihongo de repooto o kakimasu.', vietnamese: 'Viết báo cáo bằng tiếng Nhật.' },
        { japanese: 'ハサミで紙を切ります。', reading: 'ハサミでかみをきります。', romaji: 'hasami de kami o kirimasu.', vietnamese: 'Cắt giấy bằng kéo.' },
        { japanese: 'パソコンで映画を見ます。', reading: 'パソコンでえいがをみます。', romaji: 'pasokon de eiga o mimasu.', vietnamese: 'Xem phim bằng máy tính.' },
        { japanese: '自転車で学校へ行きます。', reading: 'じてんしゃでがっこうへいきます。', romaji: 'jitensha de gakkou e ikimasu.', vietnamese: 'Đi đến trường bằng xe đạp.' },
        { japanese: '新幹線で東京へ行きます。', reading: 'しんかんせんでとうきょうへいきます。', romaji: 'shinkansen de toukyou e ikimasu.', vietnamese: 'Đi Tokyo bằng tàu Shinkansen.' },
        { japanese: '鉛筆で手紙を書きます。', reading: 'えんぴつでてがみをかきます。', romaji: 'enpitsu de tegami o kakimasu.', vietnamese: 'Viết thư bằng bút chì.' },
        { japanese: 'ケータイで写真を撮ります。', reading: 'ケータイでしゃしんをとります。', romaji: 'keetai de shashin o torimasu.', vietnamese: 'Chụp ảnh bằng điện thoại.' },
        { japanese: 'ナイフで肉を切ります。', reading: 'ナイフでにくをきります。', romaji: 'naifu de niku o kirimasu.', vietnamese: 'Cắt thịt bằng dao.' }
      ]
    },
    {
      id: 'g26',
      title: 'Vて います',
      meaning: 'Đang V',
      type: 'Tiếp diễn',
      jlpt: 'N5',
      difficulty: 'Trung bình',
      icon: 'て',
      iconBg: 'bg-indigo-50 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-500',
      barColor: 'bg-indigo-500',
      structure: 'Vて + います',
      structureDetails: 'Động từ chia về thể て + います.',
      explanationTitle: 'Đang làm việc gì đó',
      explanationDetails: 'Hành động đang tiếp diễn',
      usage: 'Dùng để diễn tả một hành động đang xảy ra tại thời điểm nói.',
      note: 'Khi kết hợp với những động từ khoảnh khắc (như kết hôn, biết, có...), nó mang nghĩa là Trạng thái (đã kết hôn, đang biết).',
      memoryTip: 'ています giống y hệt như V-ing trong tiếng Anh.',
      commonWords: '今 (bây giờ)...',
      qa: [
        {
          questionFormat: '今、なに を していますか',
          answerFormat: 'Vて います',
          identifier: 'なにを (Đang làm gì)',
          tip: 'Dùng để hỏi xem ai đó đang làm gì tại thời điểm hiện tại.',
          examples: [
            {
              japanese: '今、何をしていますか。\n日本語を勉強しています。',
              reading: 'いま、なにをしていますか。\nにほんごをべんきょうしています。',
              romaji: 'ima, nani o shite imasu ka.\nnihongo o benkyou shite imasu.',
              vietnamese: 'Bây giờ bạn đang làm gì vậy?\nTôi đang học tiếng Nhật.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'Vて いません (Đang không V)',
          meaning: 'Phủ định của thể tiếp diễn',
          example: { japanese: '今は雨が降っていません。', reading: 'いまはあめがふっていません。', romaji: 'ima wa ame ga futte imasen.', vietnamese: 'Bây giờ trời không (đang) mưa.' }
        }
      ],
      examples: [
        { japanese: '電話をかけています。', reading: 'でんわをかけています。', romaji: 'denwa o kakete imasu.', vietnamese: 'Tôi đang gọi điện thoại.' },
        { japanese: '今、本を読んでいます。', reading: 'いま、ほんをよんでいます。', romaji: 'ima, hon o yonde imasu.', vietnamese: 'Bây giờ tôi đang đọc sách.' },
        { japanese: '雨が降っています。', reading: 'あめがふっています。', romaji: 'ame ga futte imasu.', vietnamese: 'Trời đang mưa.' },
        { japanese: '子供たちは公園で遊んでいます。', reading: 'こどもたちはこうえんであそんでいます。', romaji: 'kodomotachi wa kouen de asonde imasu.', vietnamese: 'Bọn trẻ đang chơi ở công viên.' },
        { japanese: '母は台所で料理を作っています。', reading: 'はははだいどころでりょうりをつくっています。', romaji: 'haha wa daidokoro de ryouri o tsukutte imasu.', vietnamese: 'Mẹ tôi đang nấu ăn ở nhà bếp.' },
        { japanese: '父は新聞を読んでいます。', reading: 'ちちはしんぶんをよんでいます。', romaji: 'chichi wa shinbun o yonde imasu.', vietnamese: 'Bố tôi đang đọc báo.' },
        { japanese: '妹はテレビを見ています。', reading: 'いもうとはテレビをみています。', romaji: 'imouto wa terebi o mite imasu.', vietnamese: 'Em gái tôi đang xem tivi.' },
        { japanese: '彼は音楽を聞いています。', reading: 'かれはおんがくをきいています。', romaji: 'kare wa ongaku o kiite imasu.', vietnamese: 'Anh ấy đang nghe nhạc.' },
        { japanese: '彼女は手紙を書いています。', reading: 'かのじょはてがみをかいています。', romaji: 'kanojo wa tegami o kaite imasu.', vietnamese: 'Cô ấy đang viết thư.' },
        { japanese: '田中さんはコーヒーを飲んでいます。', reading: 'たなかさんはコーヒーをのんでいます。', romaji: 'tanaka san wa koohii o nonde imasu.', vietnamese: 'Anh Tanaka đang uống cà phê.' }
      ]
    },
    {
      id: 'g27',
      title: 'V ましょうか',
      meaning: 'Đề nghị giúp',
      type: 'Đề nghị',
      jlpt: 'N5',
      difficulty: 'Trung bình',
      icon: 'ま',
      iconBg: 'bg-pink-50 dark:bg-pink-900/30',
      iconColor: 'text-pink-500',
      barColor: 'bg-pink-500',
      structure: 'V ます (bỏ ます) + ましょうか',
      structureDetails: 'Động từ bỏ ます thêm ましょうか',
      explanationTitle: 'Tôi làm ~ giúp bạn nhé?',
      explanationDetails: 'Đề nghị giúp đỡ ai đó',
      usage: 'Dùng khi người nói chủ động đề nghị làm một việc gì đó để giúp đỡ người nghe.',
      note: 'Câu trả lời thường là "Xin nhờ bạn" (お願いします) nếu đồng ý, hoặc "Không sao đâu" (いいえ、けっこうです / 大丈夫です) nếu từ chối.',
      memoryTip: 'ましょう có nghĩa là "cùng làm nhé", thêm か vào mang nghĩa "tôi làm điều đó cho bạn nhé?".',
      commonWords: '手伝いましょうか (tôi giúp một tay nhé), 持ちましょうか (tôi mang giúp nhé)...',
      qa: [
        {
          questionFormat: 'Vましょうか',
          answerFormat: 'ええ、お願いします',
          identifier: 'ましょうか (Giúp nhé)',
          tip: 'Khi đồng ý nhận sự giúp đỡ, hãy dùng ええ、お願いします (Vâng, xin nhờ bạn) hoặc すみません、お願いします (Xin lỗi đã phiền bạn, xin nhờ bạn).',
          examples: [
            {
              japanese: '荷物を持ちましょうか。\nええ、お願いします。',
              reading: 'にもつをもちましょうか。\nええ、おねがいします。',
              romaji: 'nimotsu o mochimashou ka.\nee, onegaishimasu.',
              vietnamese: 'Tôi mang hành lý giúp bạn nhé?\nVâng, xin nhờ bạn.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'V ましょう (Cùng làm nhé)',
          meaning: 'Rủ rê, kêu gọi cùng làm',
          example: { japanese: '一緒に帰りましょう。', reading: 'いっしょにかえりましょう。', romaji: 'issho ni kaerimashou.', vietnamese: 'Cùng về thôi.' }
        }
      ],
      examples: [
        { japanese: 'てつだいましょうか。', reading: 'てつだいましょうか。', romaji: 'tetsudaimashou ka.', vietnamese: 'Tôi giúp nhé?' },
        { japanese: '窓を開けましょうか。', reading: 'まどをあけましょうか。', romaji: 'mado o akemashou ka.', vietnamese: 'Tôi mở cửa sổ giúp bạn nhé?' },
        { japanese: 'エアコンをつけましょうか。', reading: 'エアコンをつけましょうか。', romaji: 'eakon o tsukemashou ka.', vietnamese: 'Tôi bật điều hòa giúp bạn nhé?' },
        { japanese: '写真を撮りましょうか。', reading: 'しゃしんをとりましょうか。', romaji: 'shashin o torimashou ka.', vietnamese: 'Tôi chụp ảnh giúp bạn nhé?' },
        { japanese: 'タクシーを呼びましょうか。', reading: 'タクシーをよびましょうか。', romaji: 'takushii o yobimashou ka.', vietnamese: 'Tôi gọi taxi giúp bạn nhé?' },
        { japanese: 'お茶を入れましょうか。', reading: 'おちゃをいれましょうか。', romaji: 'ocha o iremashou ka.', vietnamese: 'Tôi pha trà cho bạn nhé?' },
        { japanese: '明日の朝、電話をかけましょうか。', reading: 'あしたのあさ、でんわをかけましょうか。', romaji: 'ashita no asa, denwa o kakemashou ka.', vietnamese: 'Sáng mai tôi gọi điện thoại cho bạn nhé?' },
        { japanese: '私が迎えに行きましょうか。', reading: 'わたしがむかえにいきましょうか。', romaji: 'watashi ga mukae ni ikimashou ka.', vietnamese: 'Để tôi đi đón bạn nhé?' },
        { japanese: '辞書を貸しましょうか。', reading: 'じしょをかしましょうか。', romaji: 'jisho o kashimashou ka.', vietnamese: 'Tôi cho bạn mượn từ điển nhé?' },
        { japanese: 'ノートをコピーしましょうか。', reading: 'ノートをコピーしましょうか。', romaji: 'nooto o kopii shimashou ka.', vietnamese: 'Tôi copy vở giúp bạn nhé?' }
      ]
    },
    {
      id: 'g28',
      title: 'もう / まだ',
      meaning: 'Đã / Vẫn (chưa)',
      type: 'Phó từ',
      jlpt: 'N5',
      difficulty: 'Trung bình',
      icon: 'も',
      iconBg: 'bg-lime-50 dark:bg-lime-900/30',
      iconColor: 'text-lime-500',
      barColor: 'bg-lime-500',
      structure: 'もう + Vました / まだ + Vて いません',
      structureDetails: 'もう đi với Vました (Đã làm rồi). まだ thường đi với Vていません (Vẫn chưa làm).',
      explanationTitle: 'Đã làm chưa? / Vẫn chưa làm',
      explanationDetails: 'Hỏi và trả lời về trạng thái hoàn thành',
      usage: 'Dùng để hỏi xem một việc gì đó đã hoàn thành chưa, và cách trả lời tương ứng.',
      note: 'Câu trả lời phủ định cho câu hỏi "もう ~ ましたか" KHÔNG PHẢI là "Vませんでした" (không làm) mà phải là "まだです" (vẫn chưa).',
      memoryTip: 'もう (mou) = đã rồi. まだ (mada) = vẫn chưa.',
      commonWords: 'もう (đã), まだ (vẫn).',
      qa: [
        {
          questionFormat: 'もう Vました か',
          answerFormat: 'はい、もう Vました / いいえ、まだです',
          identifier: 'もう (Đã... chưa)',
          tip: 'Khi trả lời chưa làm, CHỈ NÓI いいえ、まだです hoặc いいえ、まだVていません. TUYỆT ĐỐI không dùng Vませんでした.',
          examples: [
            {
              japanese: 'もう昼ごはんを食べましたか。\nいいえ、まだです。',
              reading: 'もうひるごはんをたべましたか。\nいいえ、まだです。',
              romaji: 'mou hirugohan o tabemashita ka.\niie, mada desu.',
              vietnamese: 'Bạn đã ăn trưa chưa?\nChưa, vẫn chưa.'
            },
            {
              japanese: 'もう荷物を送りましたか。\nはい、もう送りました。',
              reading: 'もうにもつをおくりましたか。\nはい、もうおくりました。',
              romaji: 'mou nimotsu o okurimashita ka.\nhai, mou okurimashita.',
              vietnamese: 'Bạn đã gửi hành lý chưa?\nVâng, tôi đã gửi rồi.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'もう N です (Đã là/đến N rồi)',
          meaning: 'Nhấn mạnh sự việc đã đạt đến mốc đó',
          example: { japanese: 'もう１２時です。', reading: 'もうじゅうにじです。', romaji: 'mou juuniji desu.', vietnamese: 'Đã 12 giờ rồi.' }
        }
      ],
      examples: [
        { japanese: 'もうありません。', reading: 'もうありません。', romaji: 'mou arimasen.', vietnamese: 'Đã hết rồi / Không còn nữa.' },
        { japanese: 'もう宿題をしました。', reading: 'もうしゅくだいをしました。', romaji: 'mou shukudai o shimashita.', vietnamese: 'Tôi đã làm bài tập rồi.' },
        { japanese: 'いいえ、まだです。', reading: 'いいえ、まだです。', romaji: 'iie, mada desu.', vietnamese: 'Chưa, tôi vẫn chưa làm.' },
        { japanese: 'まだ雨が降っています。', reading: 'まだあめがふっています。', romaji: 'mada ame ga futte imasu.', vietnamese: 'Trời vẫn đang mưa.' },
        { japanese: 'もう切符を買いました。', reading: 'もうきっぷをかいました。', romaji: 'mou kippu o kaimashita.', vietnamese: 'Tôi đã mua vé rồi.' },
        { japanese: 'いいえ、まだ買っていません。', reading: 'いいえ、まだかっていません。', romaji: 'iie, mada katte imasen.', vietnamese: 'Chưa, tôi vẫn chưa mua.' },
        { japanese: 'もう京都へ行きましたか。', reading: 'もうきょうとへいきましたか。', romaji: 'mou kyouto e ikimashita ka.', vietnamese: 'Bạn đã đi Kyoto chưa?' },
        { japanese: 'もう晩ごはんを食べました。', reading: 'もうばんごはんをたべました。', romaji: 'mou bangohan o tabemashita.', vietnamese: 'Tôi đã ăn tối rồi.' },
        { japanese: 'まだ手紙を書いていません。', reading: 'まだてがみをかいていません。', romaji: 'mada tegami o kaite imasen.', vietnamese: 'Tôi vẫn chưa viết thư.' },
        { japanese: 'もう仕事を終わりました。', reading: 'もうしごとをおわりました。', romaji: 'mou shigoto o owarimashita.', vietnamese: 'Tôi đã làm xong việc rồi.' }
      ]
    },
    {
      id: 'g29',
      title: 'だれが 〜',
      meaning: 'Ai làm',
      type: 'Nghi vấn từ',
      jlpt: 'N5',
      difficulty: 'Trung bình',
      icon: 'だ',
      iconBg: 'bg-cyan-50 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-500',
      barColor: 'bg-cyan-500',
      structure: 'だれが + V',
      structureDetails: 'Đại từ nghi vấn だれ (Ai) làm chủ ngữ, bắt buộc phải đi với trợ từ が, không đi với は.',
      explanationTitle: 'AI là người đã làm?',
      explanationDetails: 'Hỏi về chủ thể hành động',
      usage: 'Dùng khi muốn hỏi xem chủ thể thực hiện một hành động cụ thể nào đó là ai. Vì bản thân từ để hỏi là thông tin mới, nên phải dùng trợ từ が.',
      note: 'Trong câu trả lời, người thực hiện hành động đó cũng bắt buộc phải đi với trợ từ が (Ví dụ: 田中さんが作りました - Anh Tanaka ĐÃ LÀM).',
      memoryTip: 'Cứ nhớ quy tắc: Từ để hỏi (だれ、なに、どこ) đứng làm chủ ngữ thì BẮT BUỘC dùng が, không bao giờ dùng は.',
      commonWords: 'だれが (ai...)',
      qa: [
        {
          questionFormat: 'だれが Vました か',
          answerFormat: 'N(người) が Vました',
          identifier: 'だれが (Ai đã)',
          tip: 'Nhớ dùng が cho cả câu hỏi và câu trả lời nhé.',
          examples: [
            {
              japanese: '誰がこのケーキを作りましたか。\n妻が作りました。',
              reading: 'だれがこのケーキをつくりましたか。\nつまがつまくりました。',
              romaji: 'dare ga kono keeki o tsukurimashita ka.\ntsuma ga tsukurimashita.',
              vietnamese: 'Ai đã làm cái bánh này vậy?\nVợ tôi đã làm.'
            }
          ]
        }
      ],
      relatedGrammars: [
        {
          name: 'なにが 〜 (Cái gì...)',
          meaning: 'Hỏi sự vật đóng vai trò chủ ngữ',
          example: { japanese: '何が落ちましたか。', reading: 'なにがおちましたか。', romaji: 'nani ga ochimashita ka.', vietnamese: 'Cái gì đã rơi vậy?' }
        }
      ],
      examples: [
        { japanese: 'だれがつくりましたか。', reading: 'だれがつくりましたか。', romaji: 'dare ga tsukurimashita ka.', vietnamese: 'Ai đã làm vậy?' },
        { japanese: '誰が手伝いますか。', reading: 'だれがてつだいますか。', romaji: 'dare ga tetsudaimasu ka.', vietnamese: 'Ai sẽ giúp một tay?' },
        { japanese: '私が手伝います。', reading: 'わたしがてつだいます。', romaji: 'watashi ga tetsudaimasu.', vietnamese: 'Tôi sẽ giúp.' },
        { japanese: '誰が窓を開けましたか。', reading: 'だれがまどをあけましたか。', romaji: 'dare ga mado o akemashita ka.', vietnamese: 'Ai đã mở cửa sổ vậy?' },
        { japanese: '誰がこの絵を描きましたか。', reading: 'だれがこのえをかきましたか。', romaji: 'dare ga kono e o kakimashita ka.', vietnamese: 'Ai đã vẽ bức tranh này?' },
        { japanese: '山田さんが描きました。', reading: 'やまださんがかきました。', romaji: 'yamada san ga kakimashita.', vietnamese: 'Anh Yamada đã vẽ.' },
        { japanese: '誰が日本へ行きますか。', reading: 'だれがにほんへいきますか。', romaji: 'dare ga nihon e ikimasu ka.', vietnamese: 'Ai sẽ đi Nhật Bản?' },
        { japanese: '佐藤さんが行きます。', reading: 'さとうさんがいきます。', romaji: 'satou san ga ikimasu.', vietnamese: 'Chị Sato sẽ đi.' },
        { japanese: '誰がこのカメラを買いましたか。', reading: 'だれがこのカメラをかいましたか。', romaji: 'dare ga kono kamera o kaimashita ka.', vietnamese: 'Ai đã mua cái máy ảnh này?' },
        { japanese: '誰が部屋を掃除しましたか。', reading: 'だれがへやをそうじしましたか。', romaji: 'dare ga heya o souji shimashita ka.', vietnamese: 'Ai đã dọn dẹp phòng vậy?' }
      ]
    }
  ]
};
