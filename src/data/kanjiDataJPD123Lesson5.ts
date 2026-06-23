import type { KanjiDetail, VocabExample } from './kanjiData';

export const kanjiLesson5JPD123: KanjiDetail[] = [
  {
    id: 'sen',
    char: '先',
    hanViet: 'TIÊN',
    meaning: 'Trước, đầu tiên',
    onyomi: ['セン'],
    kunyomi: ['さき'],
    strokes: 6,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Tiên (先) gồm phần trên giống bộ Ngưu (牛 - con trâu/bò) và phần dưới là bộ Nhân đi (儿 - hai chân). Tưởng tượng một con trâu (牛) mọc thêm hai chân người (儿) chạy vượt lên phía "trước tiên".',
    vocab: [
      { kanji: '先生', hiragana: 'せんせい', meaning: 'thầy/cô giáo' },
      { kanji: '先日', hiragana: 'せんじつ', meaning: 'vài ngày trước' },
      { kanji: '先月', hiragana: 'せんげつ', meaning: 'tháng trước' },
      { kanji: '先週', hiragana: 'せんしゅう', meaning: 'tuần trước' }
    ],
    radicalTree: {
      char: '先',
      name: 'TIÊN',
      meaning: 'Phía trước',
      children: [
        { char: '⺧', name: 'BỘ NGƯU', meaning: 'Con trâu' },
        { char: '儿', name: 'BỘ NHÂN ĐI', meaning: 'Người đi' }
      ]
    }
  },
  {
    id: 'shuu',
    char: '週',
    hanViet: 'CHU',
    meaning: 'Tuần lễ',
    onyomi: ['シュウ'],
    kunyomi: [],
    strokes: 11,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Chu (週) gồm bộ Quai xước (辶 - bước đi) và chữ Chu (周 - chu vi/vòng quanh). Một "tuần lễ" (週) là khoảng thời gian bước đi (辶) hết một vòng tuần hoàn (周) từ thứ Hai đến Chủ Nhật.',
    vocab: [
      { kanji: '先週', hiragana: 'せんしゅう', meaning: 'tuần trước' },
      { kanji: '一週間', hiragana: 'いっしゅうかん', meaning: '1 tuần' },
      { kanji: '毎週', hiragana: 'まいしゅう', meaning: 'mỗi tuần' }
    ],
    radicalTree: {
      char: '週',
      name: 'CHU',
      meaning: 'Tuần lễ',
      children: [
        { char: '辶', name: 'BỘ XƯỚC', meaning: 'Bước đi' },
        { char: '周', name: 'CHU', meaning: 'Vòng quanh' }
      ]
    }
  },
  {
    id: 'mai',
    char: '毎',
    hanViet: 'MỖI',
    meaning: 'Mỗi, mọi',
    onyomi: ['マイ'],
    kunyomi: ['ごと'],
    strokes: 6,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Mỗi (毎) nửa trên là bộ Nhân (người), nửa dưới là chữ Mẫu (母 - người mẹ). Tưởng tượng hình ảnh người mẹ (母) "mỗi" (毎) ngày đều phải chăm sóc lo toan cho tất cả mọi người trong gia đình.',
    vocab: [
      { kanji: '毎日', hiragana: 'まいにち', meaning: 'mỗi ngày' },
      { kanji: '毎週', hiragana: 'まいしゅう', meaning: 'mỗi tuần' },
      { kanji: '毎年', hiragana: 'まいとし', meaning: 'mỗi năm' },
      { kanji: '毎月', hiragana: 'まいつき', meaning: 'mỗi tháng' }
    ],
    radicalTree: {
      char: '毎',
      name: 'MỖI',
      meaning: 'Mỗi, mọi',
      children: [
        { char: '𠂉', name: 'BỘ NHÂN', meaning: 'Người' },
        { char: '母', name: 'BỘ MẪU', meaning: 'Người mẹ' }
      ]
    }
  },
  {
    id: 'go',
    char: '午',
    hanViet: 'NGỌ',
    meaning: 'Buổi trưa, giờ Ngọ',
    onyomi: ['ゴ'],
    kunyomi: [],
    strokes: 4,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Ngọ (午) có hình dáng gần giống chữ Thập (十 - cột cờ) và có nét phẩy ở trên. Giống như hình ảnh mặt trời lên cao nhất trên cột cờ vào đúng "giờ Ngọ" (giữa trưa).',
    vocab: [
      { kanji: '午前', hiragana: 'ごぜん', meaning: 'buổi sáng' },
      { kanji: '午後', hiragana: 'ごご', meaning: 'p.m' }
    ],
    radicalTree: {
      char: '午',
      name: 'NGỌ',
      meaning: 'Buổi trưa'
    }
  },
  {
    id: 'ato',
    char: '後',
    hanViet: 'HẬU',
    meaning: 'Phía sau, sau này',
    onyomi: ['ゴ', 'コウ'],
    kunyomi: ['あと', 'うしろ', 'のち'],
    strokes: 9,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Hậu (後) gồm bộ Xích (彳- bước đi), bộ Yêu (幺- nhỏ bé) và bộ Truy (夂- đi sau). Tưởng tượng một người bước đi (彳) bằng những bước nhỏ (幺), lững thững tụt lại ở "phía sau" (夂).',
    vocab: [
      { kanji: '後', hiragana: 'あと', meaning: 'sau đó' },
      { kanji: '午後', hiragana: 'ごご', meaning: 'p.m' },
      { kanji: '前後', hiragana: 'ぜんご', meaning: 'trước sau' }
    ],
    radicalTree: {
      char: '後',
      name: 'HẬU',
      meaning: 'Phía sau',
      children: [
        { char: '彳', name: 'BỘ XÍCH', meaning: 'Bước đi' },
        { char: '幺', name: 'BỘ YÊU', meaning: 'Nhỏ bé' },
        { char: '夂', name: 'BỘ TRUY', meaning: 'Theo sau' }
      ]
    }
  },
  {
    id: 'mi',
    char: '見',
    hanViet: 'KIẾN',
    meaning: 'Nhìn, thấy',
    onyomi: ['ケン'],
    kunyomi: ['み.る', 'み.える'],
    strokes: 7,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Kiến (見) gồm bộ Mục (目 - con mắt) ở trên và bộ Nhân đi (儿 - đôi chân) ở dưới. Một con người (儿) đang mở to đôi mắt (目) ra để "nhìn" (見) thế giới xung quanh.',
    vocab: [
      { kanji: '見ます', hiragana: 'みます', meaning: 'nhìn' },
      { kanji: '見学', hiragana: 'けんがく', meaning: 'tham quan kiến tập' },
      { kanji: '見物', hiragana: 'けんぶつ', meaning: 'tham quan' }
    ],
    radicalTree: {
      char: '見',
      name: 'KIẾN',
      meaning: 'Nhìn',
      children: [
        { char: '目', name: 'BỘ MỤC', meaning: 'Mắt' },
        { char: '儿', name: 'BỘ NHÂN ĐI', meaning: 'Người đi' }
      ]
    }
  },
  {
    id: 'ta',
    char: '食',
    hanViet: 'THỰC',
    meaning: 'Ăn, thức ăn',
    onyomi: ['ショク', 'ジキ'],
    kunyomi: ['た.べる'],
    strokes: 9,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Thực (食) có phần trên giống chiếc nón che (như cái vung nồi), phần dưới là chữ Lương (良 - tốt). Mở vung nồi ra thấy đồ "ăn" (食) rất ngon và tốt (良) cho sức khỏe.',
    vocab: [
      { kanji: '食べます', hiragana: 'たべます', meaning: 'ăn' },
      { kanji: '食事', hiragana: 'しょくじ', meaning: 'ăn, bữa ăn' },
      { kanji: '食べ物', hiragana: 'たべもの', meaning: 'đồ ăn' }
    ],
    radicalTree: {
      char: '食',
      name: 'THỰC',
      meaning: 'Ăn',
      children: [
        { char: '𠆢', name: 'BỘ NHÂN (NÓN)', meaning: 'Cái vung' },
        { char: '良', name: 'LƯƠNG', meaning: 'Tốt' }
      ]
    }
  },
  {
    id: 'no',
    char: '飲',
    hanViet: 'ẨM',
    meaning: 'Uống',
    onyomi: ['イン'],
    kunyomi: ['の.む'],
    strokes: 12,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Ẩm (飲) được ghép từ bộ Thực (食 - ăn uống) và chữ Khiếm (欠 - há miệng). Khi ăn (食) xong khát nước quá nên phải há miệng (欠) ra để "uống" (飲) nước.',
    vocab: [
      { kanji: '飲みます', hiragana: 'のみます', meaning: 'uống' },
      { kanji: '飲食', hiragana: 'いんしょく', meaning: 'ẩm thực' },
      { kanji: '飲み水', hiragana: 'のみみず', meaning: 'nước uống' },
      { kanji: '飲み物', hiragana: 'のみもの', meaning: 'đồ uống' }
    ],
    radicalTree: {
      char: '飲',
      name: 'ẨM',
      meaning: 'Uống',
      children: [
        { char: '食', name: 'BỘ THỰC', meaning: 'Ăn uống' },
        { char: '欠', name: 'BỘ KHIẾM', meaning: 'Há miệng' }
      ]
    }
  },
  {
    id: 'ka',
    char: '買',
    hanViet: 'MÃI',
    meaning: 'Mua',
    onyomi: ['バイ'],
    kunyomi: ['か.う'],
    strokes: 12,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Mãi (買) có nửa trên là bộ Võng (罒 - cái lưới), nửa dưới là bộ Bối (貝 - vỏ sò/tiền). Hãy tưởng tượng bạn mang tiền (貝) vào trong mạng lưới (罒) siêu thị để "mua" (買) sắm đồ đạc.',
    vocab: [
      { kanji: '買います', hiragana: 'かいます', meaning: 'mua' },
      { kanji: '買い物', hiragana: 'かいもの', meaning: 'mua sắm' }
    ],
    radicalTree: {
      char: '買',
      name: 'MÃI',
      meaning: 'Mua',
      children: [
        { char: '罒', name: 'BỘ VÕNG', meaning: 'Cái lưới' },
        { char: '貝', name: 'BỘ BỐI', meaning: 'Vỏ sò/tiền' }
      ]
    }
  },
  {
    id: 'mono',
    char: '物',
    hanViet: 'VẬT',
    meaning: 'Đồ vật',
    onyomi: ['ブツ', 'モツ'],
    kunyomi: ['もの'],
    strokes: 8,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Vật (物) gồm bộ Ngưu (牛 - con bò) và chữ Vật (勿 - không/chớ). Ở thời xưa, con bò (牛) không (勿) phải là "đồ vật" (物) tầm thường, mà là tài sản vô cùng quý giá của người nông dân.',
    vocab: [
      { kanji: '物', hiragana: 'もの', meaning: 'đồ vật' },
      { kanji: '買い物', hiragana: 'かいもの', meaning: 'mua sắm' },
      { kanji: '食べ物', hiragana: 'たべもの', meaning: 'đồ ăn' },
      { kanji: '飲み物', hiragana: 'のみもの', meaning: 'đồ uống' },
      { kanji: '人物', hiragana: 'じんぶつ', meaning: 'nhân vật' },
      { kanji: '見物', hiragana: 'けんぶつ', meaning: 'tham quan' }
    ],
    radicalTree: {
      char: '物',
      name: 'VẬT',
      meaning: 'Đồ vật',
      children: [
        { char: '牛', name: 'BỘ NGƯU', meaning: 'Con bò' },
        { char: '勿', name: 'VẬT', meaning: 'Không, chớ' }
      ]
    }
  },
  {
    id: 'i',
    char: '行',
    hanViet: 'HÀNH',
    meaning: 'Đi, thực hiện',
    onyomi: ['コウ', 'ギョウ'],
    kunyomi: ['い.く', 'ゆ.く', 'おこな.う'],
    strokes: 6,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Hành (行) là chữ tượng hình mô phỏng lại hình ảnh một ngã tư đường chéo nhau. Nó tượng trưng cho những con đường giao nhau mà người ta đang bước "đi" (行) qua.',
    vocab: [
      { kanji: '行きます', hiragana: 'いきます', meaning: 'đi' }
    ],
    radicalTree: {
      char: '行',
      name: 'BỘ HÀNH',
      meaning: 'Đi lại'
    }
  },
  {
    id: 'yasu',
    char: '休',
    hanViet: 'HƯU',
    meaning: 'Nghỉ ngơi',
    onyomi: ['キュウ'],
    kunyomi: ['やす.む'],
    strokes: 6,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Hưu (休) được ghép từ bộ Nhân đứng (亻 - con người) và bộ Mộc (木 - cái cây). Tưởng tượng hình ảnh người nông dân (亻) đang tựa lưng vào gốc cây (木) mát mẻ để "nghỉ ngơi" (休).',
    vocab: [
      { kanji: '休みます', hiragana: 'やすみます', meaning: 'nghỉ' },
      { kanji: '休みの日', hiragana: 'やすみのひ', meaning: 'ngày nghỉ' },
      { kanji: '休日', hiragana: 'きゅうじつ', meaning: 'ngày nghỉ' }
    ],
    radicalTree: {
      char: '休',
      name: 'HƯU',
      meaning: 'Nghỉ ngơi',
      children: [
        { char: '亻', name: 'BỘ NHÂN', meaning: 'Người' },
        { char: '木', name: 'BỘ MỘC', meaning: 'Cây' }
      ]
    }
  }
];

export const vocabLesson5JPD123: VocabExample[] = [
  { kanji: '先生', hiragana: 'せんせい', meaning: 'thầy/cô giáo' },
  { kanji: '先日', hiragana: 'せんじつ', meaning: 'vài ngày trước' },
  { kanji: '先月', hiragana: 'せんげつ', meaning: 'tháng trước' },
  { kanji: '先週', hiragana: 'せんしゅう', meaning: 'tuần trước' },
  { kanji: '一週間', hiragana: 'いっしゅうかん', meaning: '1 tuần' },
  { kanji: '毎日', hiragana: 'まいにち', meaning: 'mỗi ngày' },
  { kanji: '毎週', hiragana: 'まいしゅう', meaning: 'mỗi tuần' },
  { kanji: '毎年', hiragana: 'まいとし', meaning: 'mỗi năm' },
  { kanji: '毎月', hiragana: 'まいつき', meaning: 'mỗi tháng' },
  { kanji: '後', hiragana: 'あと', meaning: 'sau đó' },
  { kanji: '午後', hiragana: 'ごご', meaning: 'p.m' },
  { kanji: '前後', hiragana: 'ぜんご', meaning: 'trước sau' },
  { kanji: '見ます', hiragana: 'みます', meaning: 'nhìn' },
  { kanji: '見学', hiragana: 'けんがく', meaning: 'tham quan kiến tập' },
  { kanji: '食べます', hiragana: 'たべます', meaning: 'ăn' },
  { kanji: '食事', hiragana: 'しょくじ', meaning: 'ăn, bữa ăn' },
  { kanji: '飲みます', hiragana: 'のみます', meaning: 'uống' },
  { kanji: '飲食', hiragana: 'いんしょく', meaning: 'ẩm thực' },
  { kanji: '飲み水', hiragana: 'のみみず', meaning: 'nước uống' },
  { kanji: '休みます', hiragana: 'やすみます', meaning: 'nghỉ' },
  { kanji: '休みの日', hiragana: 'やすみのひ', meaning: 'ngày nghỉ' },
  { kanji: '休日', hiragana: 'きゅうじつ', meaning: 'ngày nghỉ' },
  { kanji: '買います', hiragana: 'かいます', meaning: 'mua' },
  { kanji: '物', hiragana: 'もの', meaning: 'đồ vật' },
  { kanji: '買い物', hiragana: 'かいもの', meaning: 'mua sắm' },
  { kanji: '食べ物', hiragana: 'たべもの', meaning: 'đồ ăn' },
  { kanji: '飲み物', hiragana: 'のみもの', meaning: 'đồ uống' },
  { kanji: '人物', hiragana: 'じんぶつ', meaning: 'nhân vật' },
  { kanji: '見物', hiragana: 'けんぶつ', meaning: 'tham quan' },
  { kanji: '行きます', hiragana: 'いきます', meaning: 'đi' }
];
