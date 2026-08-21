export interface MockQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  attachedPassage?: string;
}

export const JPD123_SP26_C1FE: MockQuestion[] = [
  {
    id: 1,
    questionText: "Các chữ Hán trong ngoặc [ ] có cách đọc tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D\nとしょかんの【休み】は　何曜日ですか。",
    options: ["やすみ", "はなみ", "かきみ", "やずみ"],
    correctAnswerIndex: 0
  },
  {
    id: 2,
    questionText: "Các chữ Hán trong ngoặc [ ] có cách đọc tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D\nNamさんは　【東京】へ　いきます。",
    options: ["ときょう", "とうきょう", "ときょ", "とうきょ"],
    correctAnswerIndex: 1
  },
  {
    id: 3,
    questionText: "Các chữ Hán trong ngoặc [ ] có cách đọc tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D\n午前【十時半】ともだちと　レストランで　しょくじします。",
    options: ["じゅうじはん", "しちじはん", "じゅうじばん", "しちじばん"],
    correctAnswerIndex: 0
  },
  {
    id: 4,
    questionText: "Các chữ Hán trong ngoặc [ ] có cách đọc tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D\n【先週】、ほっかいどうへ　いきました。",
    options: ["せんしゅう", "あさって", "あした", "きょう"],
    correctAnswerIndex: 0
  },
  {
    id: 5,
    questionText: "Các từ trong ngoặc [ ] dưới đây có chữ Hán tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D:\nゆうびんきょくの【やすみ】は　何曜日ですか。",
    options: ["休み", "休", "体み", "体"],
    correctAnswerIndex: 0
  },
  {
    id: 6,
    questionText: "Các từ trong ngoặc [ ] dưới đây có chữ Hán tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D:\nまいにち、本を【よみます】。",
    options: ["読みます", "見みます", "飲みます", "休みます"],
    correctAnswerIndex: 0
  },
  {
    id: 7,
    questionText: "Các từ trong ngoặc [ ] dưới đây có chữ Hán tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D:\n来年、くにへ　【かえります】。",
    options: ["帰ります", "話ります", "尋ります", "語ります"],
    correctAnswerIndex: 0
  },
  {
    id: 8,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nラーメンは　いちばん（　　　）たべものです。",
    options: ["きらいな", "きらい", "きらく", "きらいい"],
    correctAnswerIndex: 0
  },
  {
    id: 9,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nA: カレーと　すしと　どちらが　すきですか。\nB: _________ すきです。",
    options: ["どちら", "どちらも", "どちらは", "どちらが"],
    correctAnswerIndex: 1
  },
  {
    id: 10,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nA: マルコさん、やさいを（　　　）。\nB: はい、わかりました。",
    options: ["あらいますか", "あらってください", "あらいませんか", "あらいましたか"],
    correctAnswerIndex: 1
  },
  {
    id: 11,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nにちようび、やま（　　　）のぼります。",
    options: ["へ", "を", "で", "に"],
    correctAnswerIndex: 3
  },
  {
    id: 12,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nともだち（　　　）おかね（　　　）かりました。",
    options: ["を／に", "に／を", "に／で", "で／に"],
    correctAnswerIndex: 1
  },
  {
    id: 13,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nあついですから、まどを　（　　　）。",
    options: ["あらてください", "とってください", "あけてください", "かしてください"],
    correctAnswerIndex: 2
  },
  {
    id: 14,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nきれいな　しゃしんですね。だれ（　　　）とりましたか。",
    options: ["に", "は", "が", "の"],
    correctAnswerIndex: 2
  },
  {
    id: 15,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nしゅうまつ、いっしょに　サッカーを（　　　）か。",
    options: ["しましょう", "しません", "しました", "します"],
    correctAnswerIndex: 1
  },
  {
    id: 16,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nなつやすみ、日本で　アルバイトを　しますから、_________。",
    options: ["食べません", "国(くに)へ　かえりません", "どこへも　行きませんでした", "こんばん、うちで　べんきょうします"],
    correctAnswerIndex: 1
  },
  {
    id: 17,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nあの町(まち)は　あまり　（　　　）。",
    options: ["ゆうめいです", "ゆうめいじゃありません", "ゆうめくないです", "ゆうめじゃありません"],
    correctAnswerIndex: 1
  },
  {
    id: 18,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n私は　あたらしい　カメラ＿＿＿ほしいです。",
    options: ["が", "を", "に", "で"],
    correctAnswerIndex: 0
  },
  {
    id: 19,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nテーブルのうえ（　　　）、くだもの（　　　）おいてください。",
    options: ["を／が", "から／を", "で／を", "に／を"],
    correctAnswerIndex: 3
  },
  {
    id: 20,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nA: 田中: 明日(あした)、いっしょに　えいがを　見に　行きませんか。\nB: ミラー: ________________。",
    options: ["いいえ、行きません", "すみません、あしたは　行きます", "すみません、あしたは　ちょっと…", "はい、行きません"],
    correctAnswerIndex: 2
  },
  {
    id: 21,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n私の　くに　は1月、とても　さむいです。パクさんの　くには__________。",
    options: ["どうですか", "どんなですか", "なんですか", "だれですか"],
    correctAnswerIndex: 0
  },
  {
    id: 22,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nA: いっしょに　おまつりに　いきませんか。\nB: ぜひ________",
    options: ["いきたいです。", "あついです。", "かいます。", "いきました。"],
    correctAnswerIndex: 0
  },
  {
    id: 23,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nロサンゼルス（Los angeles）は　アメリカの（　　　）です。",
    options: ["ひと", "にし", "みどり", "くるま"],
    correctAnswerIndex: 1
  },
  {
    id: 24,
    questionText: "Chọn nghĩa tiếng Việt tương ứng của từ sau:\n“きょうかい”",
    options: ["Suối nước nóng", "Nhà thờ", "Lâu đài", "Đền thờ"],
    correctAnswerIndex: 1
  },
  {
    id: 25,
    questionText: "Chọn nghĩa tiếng Việt tương ứng của từ sau:\n“じんじゃ”",
    options: ["Tòa nhà", "Nhà thờ", "Lâu đài", "Đền thờ"],
    correctAnswerIndex: 3
  },
  {
    id: 26,
    questionText: "Chọn từ khác loại trong những từ sau:\n① たいへん\n② ひま\n③ きれい\n④ やすい",
    options: ["たいへん", "ひま", "きれい", "やすい"],
    correctAnswerIndex: 3
  },
  {
    id: 27,
    questionText: "Hãy chọn từ khác loại trong các từ sau:\n① おもしろい\n② むずかしい\n③ いそがしい\n④ きらい",
    options: ["おもしろい", "むずかしい", "いそがしい", "きらい"],
    correctAnswerIndex: 3
  },
  {
    id: 28,
    questionText: "Chọn từ thích hợp điền vào _______①_______",
    options: ["します", "あらいます", "ききます", "しめます"],
    correctAnswerIndex: 0,
    attachedPassage: "みなさん、来週の　日曜日、私の　いえで　パーティーを＿＿＿①＿＿＿。私は　国の　料理を　つくります。いっしょに　つくりませんか。それから、みなさんの　くにの　料理の　つくりかたも　おしえてください。いっしょに　つくって　食べましょう。おいしい　おさけも　＿＿＿②＿＿＿。私の　アパートは　えきの　ちかくに　あります。コンビニの　となりの　あたらしい　アパートです。ぜひ、来てください。\n\n*つくって　食べます : nấu (món ăn) và ăn"
  },
  {
    id: 29,
    questionText: "Chọn từ thích hợp điền vào _______②_______",
    options: ["はなしましょう", "いれましょう", "すいましょう", "のみましょう"],
    correctAnswerIndex: 3,
    attachedPassage: "みなさん、来週の　日曜日、私の　いえで　パーティーを＿＿＿①＿＿＿。私は　国の　料理を　つくります。いっしょに　つくりませんか。それから、みなさんの　くにの　料理の　つくりかたも　おしえてください。いっしょに　つくって　食べましょう。おいしい　おさけも　＿＿＿②＿＿＿。私の　アパートは　えきの　ちかくに　あります。コンビニの　となりの　あたらしい　アパートです。ぜひ、来てください。\n\n*つくって　食べます : nấu (món ăn) và ăn"
  },
  {
    id: 30,
    questionText: "Chọn đáp án đúng cho câu hỏi sau:\n「私」の　いえは　どこに　ありますか。",
    options: ["えきの　ちかくに　あります。", "アパートの　ちかくに　あります。", "アパートの　となりに　あります。", "こうえんの　ちかくに　あります"],
    correctAnswerIndex: 0,
    attachedPassage: "みなさん、来週の　日曜日、私の　いえで　パーティーを＿＿＿①＿＿＿。私は　国の　料理を　つくります。いっしょに　つくりませんか。それから、みなさんの　くにの　料理の　つくりかたも　おしえてください。いっしょに　つくって　食べましょう。おいしい　おさけも　＿＿＿②＿＿＿。私の　アパートは　えきの　ちかくに　あります。コンビニの　となりの　あたらしい　アパートです。ぜひ、来てください。\n\n*つくって　食べます : nấu (món ăn) và ăn"
  }
];
