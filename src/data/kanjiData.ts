export interface VocabExample {
  kanji: string;
  hiragana: string;
  meaning: string;
}

export interface RadicalNode {
  char: string;
  name: string;
  meaning: string;
  children?: RadicalNode[];
}

export interface KanjiDetail {
  id: string; // usually romaji or meaning
  char: string;
  hanViet: string;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  strokes: number;
  jlpt: string;
  mnemonic: string;
  vocab: VocabExample[];
  radicalTree?: RadicalNode;
}

export const kanjiLesson1: KanjiDetail[] = [
  {
    id: 'watashi',
    char: '私',
    hanViet: 'TƯ',
    meaning: 'Tôi, riêng tư',
    onyomi: ['シ'],
    kunyomi: ['わたし', 'わたくし'],
    strokes: 7,
    jlpt: 'N5',
    mnemonic: 'Chữ Tư (私 - tôi, riêng tư) được ghép từ bộ Hòa (禾 - cây lúa) và bộ Khư (ム - riêng tư). Tưởng tượng hình ảnh người nông dân ôm bó lúa (禾) và nói: "Đây là phần lúa của riêng tôi (ム)".',
    vocab: [
      { kanji: '私', hiragana: 'わたし', meaning: 'Tôi' },
      { kanji: '私立', hiragana: 'しりつ', meaning: 'Tư lập' },
      { kanji: '私人', hiragana: 'しじん', meaning: 'Cá nhân' },
      { kanji: '私達', hiragana: 'わたしたち', meaning: 'Chúng tôi' }
    ],
    radicalTree: {
      char: '私',
      name: 'TƯ',
      meaning: 'Tôi',
      children: [
        { char: '禾', name: 'BỘ HÒA', meaning: 'Cây lúa' },
        { char: 'ム', name: 'BỘ KHƯ', meaning: 'Riêng tư' }
      ]
    }
  },
  {
    id: 'nichi',
    char: '日',
    hanViet: 'NHẬT',
    meaning: 'Mặt trời, ngày',
    onyomi: ['ニチ', 'ジツ'],
    kunyomi: ['ひ', 'か'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Bộ Nhật (日 - mặt trời, ngày) bắt nguồn từ chữ tượng hình. Hình vuông tượng trưng cho hình dáng mặt trời, còn nét gạch ngang ở giữa tượng trưng cho nguồn năng lượng, ánh sáng đang tỏa ra.',
    vocab: [
      { kanji: '日', hiragana: 'ひ', meaning: 'Mặt trời' },
      { kanji: '日本', hiragana: 'にほん', meaning: 'Nhật Bản' },
      { kanji: '日曜日', hiragana: 'にちようび', meaning: 'Chủ nhật' },
      { kanji: '今日', hiragana: 'きょう', meaning: 'Hôm nay' }
    ],
    radicalTree: {
      char: '日',
      name: 'BỘ NHẬT',
      meaning: 'Mặt trời',
    }
  },
  {
    id: 'hon',
    char: '本',
    hanViet: 'BẢN',
    meaning: 'Gốc, sách, căn bản',
    onyomi: ['ホン'],
    kunyomi: ['もと'],
    strokes: 5,
    jlpt: 'N5',
    mnemonic: 'Chữ Bản (本 - gốc rễ, cội nguồn) được tạo ra bằng cách thêm một nét gạch ngang (一) vào phần dưới của bộ Mộc (木 - cái cây). Nét gạch này dùng để đánh dấu và nhấn mạnh phần "gốc rễ" của cây.',
    vocab: [
      { kanji: '本', hiragana: 'ほん', meaning: 'Sách' },
      { kanji: '日本', hiragana: 'にほん', meaning: 'Nhật Bản' },
      { kanji: '本当', hiragana: 'ほんとう', meaning: 'Sự thật' }
    ],
    radicalTree: {
      char: '本',
      name: 'BẢN',
      meaning: 'Gốc rễ',
      children: [
        { char: '木', name: 'BỘ MỘC', meaning: 'Cây' },
        { char: '一', name: 'BỘ NHẤT', meaning: 'Gạch ngang ở gốc' }
      ]
    }
  },
  {
    id: 'dai',
    char: '大',
    hanViet: 'ĐẠI',
    meaning: 'To, lớn',
    onyomi: ['ダイ', 'タイ'],
    kunyomi: ['おおきい'],
    strokes: 3,
    jlpt: 'N5',
    mnemonic: 'Chữ Đại (大 - to lớn) là chữ tượng hình mô phỏng lại dáng điệu của một người (人) đang đứng dang rộng hai tay và hai chân ra hai bên để thể hiện sự to lớn, vĩ đại.',
    vocab: [
      { kanji: '大きい', hiragana: 'おおきい', meaning: 'To lớn' },
      { kanji: '大学', hiragana: 'だいがく', meaning: 'Đại học' },
      { kanji: '大人', hiragana: 'おとな', meaning: 'Người lớn' }
    ],
    radicalTree: {
      char: '大',
      name: 'BỘ ĐẠI',
      meaning: 'To lớn',
    }
  },
  {
    id: 'gaku',
    char: '学',
    hanViet: 'HỌC',
    meaning: 'Học tập',
    onyomi: ['ガク'],
    kunyomi: ['まな.ぶ'],
    strokes: 8,
    jlpt: 'N5',
    mnemonic: 'Chữ Học (学) có bộ Trảo (⺍ - bàn tay), bộ Mịch (冖 - mái nhà) và bộ Tử (子 - đứa trẻ). Tưởng tượng dưới mái nhà (冖) trường học, có bàn tay (⺍) của thầy cô ân cần dìu dắt đứa trẻ (子) học bài.',
    vocab: [
      { kanji: '学生', hiragana: 'がくせい', meaning: 'Học sinh' },
      { kanji: '学校', hiragana: 'がっこう', meaning: 'Trường học' },
      { kanji: '学ぶ', hiragana: 'まなぶ', meaning: 'Học' }
    ],
    radicalTree: {
      char: '学',
      name: 'HỌC',
      meaning: 'Học tập',
      children: [
        { char: '⺍', name: 'BỘ TRẢO', meaning: 'Móng vuốt' },
        { char: '冖', name: 'BỘ MỊCH', meaning: 'Mái nhà' },
        { char: '子', name: 'BỘ TỬ', meaning: 'Đứa trẻ' }
      ]
    }
  },
  {
    id: 'go',
    char: '語',
    hanViet: 'NGỮ',
    meaning: 'Ngôn ngữ, tiếng nói',
    onyomi: ['ゴ'],
    kunyomi: ['かた.る'],
    strokes: 14,
    jlpt: 'N5',
    mnemonic: 'Chữ Ngữ (語 - ngôn ngữ) được ghép từ bộ Ngôn (言 - lời nói) và chữ Ngô (吾 - tôi, chính mình). Ngôn ngữ (語) là những lời nói (言) được thốt ra từ chính bản thân mình (吾) để giao tiếp.',
    vocab: [
      { kanji: '日本語', hiragana: 'にほんご', meaning: 'Tiếng Nhật' },
      { kanji: '英語', hiragana: 'えいご', meaning: 'Tiếng Anh' },
      { kanji: '語る', hiragana: 'かたる', meaning: 'Kể lại' }
    ],
    radicalTree: {
      char: '語',
      name: 'NGỮ',
      meaning: 'Ngôn ngữ',
      children: [
        { char: '言', name: 'BỘ NGÔN', meaning: 'Nói' },
        { 
          char: '吾', name: 'NGÔ', meaning: 'Tôi',
          children: [
            { char: '五', name: 'BỘ NGŨ', meaning: 'Số 5' },
            { char: '口', name: 'BỘ KHẨU', meaning: 'Cái miệng' }
          ]
        }
      ]
    }
  },
  {
    id: 'kou',
    char: '校',
    hanViet: 'HIỆU',
    meaning: 'Trường học',
    onyomi: ['コウ'],
    kunyomi: [],
    strokes: 10,
    jlpt: 'N5',
    mnemonic: 'Chữ Hiệu (校 - trường học) gồm bộ Mộc (木 - cây cối) và chữ Giao (交 - giao lưu). Trường học (校) là nơi có những hàng cây (木) xanh mát, nơi học sinh đến học tập và giao lưu kết bạn (交).',
    vocab: [
      { kanji: '学校', hiragana: 'がっこう', meaning: 'Trường học' },
      { kanji: '校長', hiragana: 'こうちょう', meaning: 'Hiệu trưởng' },
      { kanji: '高校', hiragana: 'こうこう', meaning: 'Trường cấp 3' }
    ],
    radicalTree: {
      char: '校',
      name: 'HIỆU',
      meaning: 'Trường học',
      children: [
        { char: '木', name: 'BỘ MỘC', meaning: 'Cây cối' },
        { char: '交', name: 'GIAO', meaning: 'Giao lưu' }
      ]
    }
  },
  {
    id: 'sei',
    char: '生',
    hanViet: 'SINH',
    meaning: 'Sinh sống, sinh ra',
    onyomi: ['セイ', 'ショウ'],
    kunyomi: ['い.きる', 'う.まれる', 'なま'],
    strokes: 5,
    jlpt: 'N5',
    mnemonic: 'Bộ Sinh (生 - sinh ra) là chữ tượng hình mô phỏng một mầm non vừa đâm chồi vươn lên khỏi mặt đất. Nét gạch dưới cùng là mặt đất, các nét phía trên là mầm cây đang phát triển đầy sức sống.',
    vocab: [
      { kanji: '先生', hiragana: 'せんせい', meaning: 'Giáo viên' },
      { kanji: '学生', hiragana: 'がくせい', meaning: 'Học sinh' },
      { kanji: '生きる', hiragana: 'いきる', meaning: 'Sống' },
      { kanji: '誕生日', hiragana: 'たんじょうび', meaning: 'Sinh nhật' }
    ],
    radicalTree: {
      char: '生',
      name: 'BỘ SINH',
      meaning: 'Sinh ra',
    }
  },
  {
    id: 'hito',
    char: '人',
    hanViet: 'NHÂN',
    meaning: 'Người',
    onyomi: ['ジン', 'ニン'],
    kunyomi: ['ひと'],
    strokes: 2,
    jlpt: 'N5',
    mnemonic: 'Bộ Nhân (人 - con người) là chữ tượng hình khắc họa lại dáng đứng nghiêng của một người, với hai chân đang bước đi vững chãi trên mặt đất, tượng trưng cho bản lĩnh của con người.',
    vocab: [
      { kanji: '人', hiragana: 'ひと', meaning: 'Người' },
      { kanji: 'あの人', hiragana: 'あのひと', meaning: 'Người kia' },
      { kanji: '日本人', hiragana: 'にほんじん', meaning: 'Người Nhật' },
      { kanji: '三人', hiragana: 'さんにん', meaning: '3 người' }
    ],
    radicalTree: {
      char: '人',
      name: 'BỘ NHÂN',
      meaning: 'Con người',
    }
  },
  {
    id: 'sai',
    char: '才',
    hanViet: 'TÀI',
    meaning: 'Tuổi, tài năng',
    onyomi: ['サイ'],
    kunyomi: [],
    strokes: 3,
    jlpt: 'N5',
    mnemonic: 'Chữ Tài (才 - tuổi tác, tài năng) mượn hình ảnh một chồi non nhú lên khỏi mặt đất. Giống như một đứa trẻ ở "độ tuổi" mầm non (才) đang bắt đầu bộc lộ "tài năng" thiên bẩm của mình.',
    vocab: [
      { kanji: '二才', hiragana: 'にさい', meaning: '2 tuổi' },
      { kanji: '何才', hiragana: 'なんさい', meaning: 'Mấy tuổi' },
      { kanji: '天才', hiragana: 'てんさい', meaning: 'Thiên tài' }
    ],
    radicalTree: {
      char: '才',
      name: 'BỘ TÀI',
      meaning: 'Tài năng',
    }
  }
];

// Vocabulary list for the lesson (combined + some extra examples if needed)
export const lesson1Vocab: VocabExample[] = [
  { kanji: '私', hiragana: 'わたし', meaning: 'Tôi' },
  { kanji: '人', hiragana: 'ひと', meaning: 'Con người' },
  { kanji: 'あの人', hiragana: 'あのひと', meaning: 'Người kia' },
  { kanji: '2才', hiragana: 'にさい', meaning: '2 tuổi' },
  { kanji: '8才', hiragana: 'はっさい', meaning: '8 tuổi' },
  { kanji: '何才', hiragana: 'なんさい', meaning: 'Mấy tuổi' },
  { kanji: '大学', hiragana: 'だいがく', meaning: 'Đại học' },
  { kanji: '学生', hiragana: 'がくせい', meaning: 'Học sinh' },
  { kanji: '学校', hiragana: 'がっこう', meaning: 'Trường học' },
  { kanji: '先生', hiragana: 'せんせい', meaning: 'Giáo viên' },
  { kanji: '日本', hiragana: 'にほん', meaning: 'Nhật Bản' },
  { kanji: '日本語', hiragana: 'にほんご', meaning: 'Tiếng Nhật' },
];
