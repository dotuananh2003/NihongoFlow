import type { MockQuestion } from "../../types/exam";

const passageText = "日曜日、ともだちと　ちかくの　やまに　①　。てんきが　よかったですから、とても　きもちが　よかったです。やまで、おべんとうを　②　。やまからの　けしきが　とても　きれいでした。それから、ふるいお寺を　見に　行きました。とてもおもしろかったです。とても　たのしい1日でした。また(lại) 行きたいです。";

export const JPD123_SU26_FE: MockQuestion[] = [
  {
    id: 1,
    questionText: "Các chữ Hán trong ngoặc [ ] có cách đọc tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D\n日本に【半年】います。",
    options: ["はんとし", "はんどし", "ばんねん", "ばんどし"],
    correctAnswerIndex: 0
  },
  {
    id: 2,
    questionText: "Các chữ Hán trong ngoặc [ ] có cách đọc tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D\n【毎月】バーベキューをします。",
    options: ["まいがつ", "まいづき", "まいつき", "めいつき"],
    correctAnswerIndex: 2
  },
  {
    id: 3,
    questionText: "Các chữ Hán trong ngoặc [ ] có cách đọc tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D\n大学の【休日】はいつですか。",
    options: ["きゅうじつ", "きゅじつ", "やすみひ", "やすみび"],
    correctAnswerIndex: 0
  },
  {
    id: 4,
    questionText: "Các từ trong ngoặc [ ] dưới đây có chữ Hán tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D:\nぎんこうは　【ごぜん】　9時からです。",
    options: ["午前", "午見", "午後", "午先"],
    correctAnswerIndex: 0
  },
  {
    id: 5,
    questionText: "Các từ trong ngoặc [ ] dưới đây có chữ Hán tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D:\nお【くに】は　どちらですか。",
    options: ["肉", "内", "国", "向"],
    correctAnswerIndex: 2
  },
  {
    id: 6,
    questionText: "Các từ trong ngoặc [ ] dưới đây có chữ Hán tương ứng như thế nào? Hãy chọn đáp án đúng trong A, B, C, D:\nどんな【りょうり】が　すきですか",
    options: ["料理", "料野", "科理", "科野"],
    correctAnswerIndex: 0
  },
  {
    id: 7,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n今　ギターを（　　　）います。",
    options: ["ひきて", "ひいて", "ひって", "ひいで"],
    correctAnswerIndex: 1
  },
  {
    id: 8,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n先週　ともだちの　いえへ（　　　）。",
    options: ["いきます", "いきました", "いきませんでしたです", "いきましたです"],
    correctAnswerIndex: 1
  },
  {
    id: 9,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n日本の　食べ物で　すしが　（　　　）すきです。",
    options: ["いちばん", "ぜんぜん", "たいへん", "とても"],
    correctAnswerIndex: 0
  },
  {
    id: 10,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nこのケーキは　あまいです。（　　　）、おいしいです。",
    options: ["が", "それから", "いまから", "そして"],
    correctAnswerIndex: 3
  },
  {
    id: 11,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n今　うちの　なかに　女の人が（　　　）。",
    options: ["あります", "ありました", "いました", "います"],
    correctAnswerIndex: 3
  },
  {
    id: 12,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nA:　ビールは　まだ　ありますか。\nB:　いいえ、（　　　）ありません。",
    options: ["もう", "まだ", "いちばん", "より"],
    correctAnswerIndex: 0
  },
  {
    id: 13,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nA:　いっしょに　バーベキューを　しませんか。\nB:　ええ、いいですね。（　　　）。",
    options: ["しましょう", "しません", "しました", "しましょうか"],
    correctAnswerIndex: 0
  },
  {
    id: 14,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nカレーの（　　　）をおしえます。",
    options: ["つくり", "つくかた", "つくりたかた", "つくりかた"],
    correctAnswerIndex: 3
  },
  {
    id: 15,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nけさ、10時に　おきましたから、（　　　）。",
    options: ["うちで　たべます", "たべません", "何も　たべませんでした", "何も　たべません"],
    correctAnswerIndex: 2
  },
  {
    id: 16,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nリンさん「パクさんは　どこに　いますか。」\nキムさん「となりの　へやで　ワンさんと（　　　）。」",
    options: ["はなしました", "はなしましょう", "はなしてください", "はなしています"],
    correctAnswerIndex: 3
  },
  {
    id: 17,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nA:　日本で（　　　）が　いちばん　さむいですか。\nB:　北海道(ほっかいどう)が　いちばん　さむいです。",
    options: ["いつ", "なに", "どこ", "だれ"],
    correctAnswerIndex: 2
  },
  {
    id: 18,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nA:　先週の　週末(しゅうまつ)、（　　　）行きましたか。\nB:　いいえ、どこも　行きませんでした。",
    options: ["どこかへ", "どこへ", "なにか", "なにを"],
    correctAnswerIndex: 0
  },
  {
    id: 19,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nきょうは（　　　）あついです。",
    options: ["すこし", "あまり", "いちねんじゅう", "そして"],
    correctAnswerIndex: 0
  },
  {
    id: 20,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n私は　まいばん、ともだちに　でんわを（　　　）。",
    options: ["かいます", "かきます", "うたいます", "かけます"],
    correctAnswerIndex: 3
  },
  {
    id: 21,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nスープに（　　　）をいれます。",
    options: ["いす", "しお", "れいぞうこ", "だいどころ"],
    correctAnswerIndex: 1
  },
  {
    id: 22,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n（　　　）が　ありませんから、うみへ　行きません。",
    options: ["たべもの", "やきゅう", "みずぎ", "きせつ"],
    correctAnswerIndex: 2
  },
  {
    id: 23,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\nあしたは（　　　）ですから、ひるまで　ねたいです。",
    options: ["きらい", "ひま", "やすい", "たのしい"],
    correctAnswerIndex: 1
  },
  {
    id: 24,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống\n毎日（　　　）を　あらいます。",
    options: ["コース", "コップ", "ポスト", "ゲーム"],
    correctAnswerIndex: 1
  },
  {
    id: 25,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống:\nなに（　　　）ほしくないです。",
    options: ["が", "も", "に", "を"],
    correctAnswerIndex: 1
  },
  {
    id: 26,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống:\n日曜日　かぞく（　　　）スーパーへ　行きます。",
    options: ["が", "か", "に", "と"],
    correctAnswerIndex: 3
  },
  {
    id: 27,
    questionText: "Chọn trong A, B, C, D đáp án thích hợp để điền vào chỗ trống:\nA:　土曜日　どこ（　　　）行きますか。\nB:　はい、こうえんへ　行きます。",
    options: ["へ", "か", "に", "も"],
    correctAnswerIndex: 1
  },
  {
    id: 28,
    questionText: "Hãy chọn từ thích hợp điền vào ___①___",
    options: ["つくりました", "あいました", "のぼりました", "はいりました"],
    correctAnswerIndex: 2,
    attachedPassage: passageText
  },
  {
    id: 29,
    questionText: "Hãy chọn từ thích hợp điền vào ___②___",
    options: ["たべました", "しょくじしました", "とりました", "かりました"],
    correctAnswerIndex: 0,
    attachedPassage: passageText
  },
  {
    id: 30,
    questionText: "やまからの　けしきは　どうでしたか。",
    options: ["きれいでした", "たかかったです", "よくなかったです", "きれいじゃありませんでした"],
    correctAnswerIndex: 0,
    attachedPassage: passageText
  }
];
