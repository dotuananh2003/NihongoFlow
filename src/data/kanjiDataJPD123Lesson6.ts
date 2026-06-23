import type { KanjiDetail, VocabExample } from './kanjiData';

export const kanjiLesson6JPD123: KanjiDetail[] = [
  {
    id: 'ima',
    char: '今',
    hanViet: 'KIM',
    meaning: 'Bây giờ, hiện tại',
    onyomi: ['コン', 'キン'],
    kunyomi: ['いま'],
    strokes: 4,
    jlpt: 'JPD123',
    mnemonic: 'Phần trên giống cái nón (nhân nón 𠆢), phần dưới giống một người đang gập mình. Tưởng tượng người đội nón đang cúi chào ngay "bây giờ" (今).',
    vocab: [
      { kanji: '今', hiragana: 'いま', meaning: 'bây giờ' },
      { kanji: '今年', hiragana: 'ことし', meaning: 'năm nay' },
      { kanji: '今日', hiragana: 'きょう', meaning: 'hôm nay' },
      { kanji: '今月', hiragana: 'こんげつ', meaning: 'tháng này' },
      { kanji: '今週', hiragana: 'こんしゅう', meaning: 'tuần này' },
      { kanji: '今晩', hiragana: 'こんばん', meaning: 'tối nay' },
      { kanji: '今朝', hiragana: 'けさ', meaning: 'sáng nay' }
    ],
    radicalTree: {
      char: '今',
      name: 'KIM',
      meaning: 'Hiện tại',
      children: [
        { char: '𠆢', name: 'BỘ NHÂN NÓN', meaning: 'Người, cái nón' },
        { char: '一', name: 'BỘ NHẤT', meaning: 'Số 1' },
        { char: 'フ', name: 'NÉT GẬP', meaning: 'Gập' }
      ]
    }
  },
  {
    id: 'rai',
    char: '来',
    hanViet: 'LAI',
    meaning: 'Đến',
    onyomi: ['ライ'],
    kunyomi: ['く.る', 'き.たる'],
    strokes: 7,
    jlpt: 'JPD123',
    mnemonic: 'Mang theo hai (丷) hạt giống đến (来) gộp thành một (一) đống dưới gốc cây (木).',
    vocab: [
      { kanji: '来', hiragana: 'く', meaning: 'đến' },
      { kanji: '来ます', hiragana: 'きます', meaning: 'đến' },
      { kanji: '来週', hiragana: 'らいしゅう', meaning: 'tuần sau' },
      { kanji: '来月', hiragana: 'らいげつ', meaning: 'tháng sau' },
      { kanji: '来年', hiragana: 'らいねん', meaning: 'năm sau' },
      { kanji: '来日', hiragana: 'らいにち', meaning: 'đến Nhật' }
    ],
    radicalTree: {
      char: '来',
      name: 'LAI',
      meaning: 'Đến',
      children: [
        { char: '丷', name: 'HAI CHẤM', meaning: 'Hạt giống' },
        { char: '一', name: 'BỘ NHẤT', meaning: 'Số 1, gộp' },
        { char: '木', name: 'BỘ MỘC', meaning: 'Cây' }
      ]
    }
  },
  {
    id: 'kae',
    char: '帰',
    hanViet: 'QUY',
    meaning: 'Trở về',
    onyomi: ['キ'],
    kunyomi: ['かえ.る'],
    strokes: 10,
    jlpt: 'JPD123',
    mnemonic: 'Người phụ nữ dùng đao (刂) cắt tấm vải (冖) làm khăn (巾) rồi "trở về" (帰) nhà dọn dẹp.',
    vocab: [
      { kanji: '帰', hiragana: 'かえ', meaning: 'về' },
      { kanji: '帰ります', hiragana: 'かえります', meaning: 'trở về' },
      { kanji: '帰国', hiragana: 'きこく', meaning: 'về nước' },
      { kanji: '日帰り', hiragana: 'ひがえり', meaning: 'đi về trong ngày' }
    ],
    radicalTree: {
      char: '帰',
      name: 'QUY',
      meaning: 'Trở về',
      children: [
        { char: '刂', name: 'BỘ ĐAO', meaning: 'Con dao' },
        { char: '冖', name: 'BỘ MỊCH', meaning: 'Trùm khăn' },
        { char: '巾', name: 'BỘ CÂN', meaning: 'Cái khăn' }
      ]
    }
  },
  {
    id: 'kai',
    char: '会',
    hanViet: 'HỘI',
    meaning: 'Gặp gỡ, hội họp',
    onyomi: ['カイ', 'エ'],
    kunyomi: ['あ.う'],
    strokes: 6,
    jlpt: 'JPD123',
    mnemonic: 'Bộ Nhân nón (𠆢 - con người) và bộ Vân (云 - nói/mây). Mọi người (𠆢) "gặp gỡ" (会) nhau để trò chuyện (云).',
    vocab: [
      { kanji: '会', hiragana: 'あ', meaning: 'gặp' },
      { kanji: '会います', hiragana: 'あいます', meaning: 'gặp gỡ' },
      { kanji: '会社', hiragana: 'かいしゃ', meaning: 'công ty' },
      { kanji: '会話', hiragana: 'かいわ', meaning: 'hội thoại' },
      { kanji: '会議', hiragana: 'かいぎ', meaning: 'cuộc họp' }
    ],
    radicalTree: {
      char: '会',
      name: 'HỘI',
      meaning: 'Hội họp',
      children: [
        { char: '𠆢', name: 'BỘ NHÂN NÓN', meaning: 'Người' },
        { char: '云', name: 'BỘ VÂN', meaning: 'Nói, mây' }
      ]
    }
  },
  {
    id: 'sha',
    char: '社',
    hanViet: 'XÃ',
    meaning: 'Xã hội, công ty, đền thờ',
    onyomi: ['シャ'],
    kunyomi: ['やしろ'],
    strokes: 7,
    jlpt: 'JPD123',
    mnemonic: 'Bộ Thị (礻 - thần đất/tế tự) và bộ Thổ (土 - đất). Thần đất (礻) cai quản vùng đất (土) của "xã hội" (社).',
    vocab: [
      { kanji: '社', hiragana: 'しゃ', meaning: 'công ty' },
      { kanji: '会社', hiragana: 'かいしゃ', meaning: 'công ty' },
      { kanji: '社会', hiragana: 'しゃかい', meaning: 'xã hội' },
      { kanji: '社長', hiragana: 'しゃちょう', meaning: 'giám đốc' },
      { kanji: '神社', hiragana: 'じんじゃ', meaning: 'đền Thần đạo' }
    ],
    radicalTree: {
      char: '社',
      name: 'XÃ',
      meaning: 'Xã hội, công ty',
      children: [
        { char: '礻', name: 'BỘ THỊ', meaning: 'Thần đất' },
        { char: '土', name: 'BỘ THỔ', meaning: 'Đất' }
      ]
    }
  },
  {
    id: 'kiku',
    char: '聞',
    hanViet: 'VĂN',
    meaning: 'Nghe, hỏi',
    onyomi: ['ブン', 'モン'],
    kunyomi: ['き.く', 'き.こえる'],
    strokes: 14,
    jlpt: 'JPD123',
    mnemonic: 'Bộ Môn (門 - cánh cửa) và bộ Nhĩ (耳 - cái tai). Áp tai (耳) vào cánh cửa (門) để "nghe" (聞) ngóng tin tức.',
    vocab: [
      { kanji: '聞', hiragana: 'き', meaning: 'nghe' },
      { kanji: '聞きます', hiragana: 'ききます', meaning: 'nghe, hỏi' },
      { kanji: '聞こえる', hiragana: 'きこえる', meaning: 'có thể nghe thấy' },
      { kanji: '新聞', hiragana: 'しんぶん', meaning: 'tờ báo' }
    ],
    radicalTree: {
      char: '聞',
      name: 'VĂN',
      meaning: 'Nghe',
      children: [
        { char: '門', name: 'BỘ MÔN', meaning: 'Cánh cửa' },
        { char: '耳', name: 'BỘ NHĨ', meaning: 'Cái tai' }
      ]
    }
  },
  {
    id: 'yomu',
    char: '読',
    hanViet: 'ĐỘC',
    meaning: 'Đọc',
    onyomi: ['ドク', 'トク'],
    kunyomi: ['よ.む'],
    strokes: 14,
    jlpt: 'JPD123',
    mnemonic: 'Bộ Ngôn (言 - lời nói) và chữ Mại (売 - bán). Dùng lời nói (言) để rao bán (売) hoặc "đọc" (読) to nội dung để mọi người cùng nghe.',
    vocab: [
      { kanji: '読', hiragana: 'よ', meaning: 'đọc' },
      { kanji: '読みます', hiragana: 'よみます', meaning: 'đọc' },
      { kanji: '読書', hiragana: 'どくしょ', meaning: 'đọc sách' },
      { kanji: '読者', hiragana: 'どくしゃ', meaning: 'độc giả' }
    ],
    radicalTree: {
      char: '読',
      name: 'ĐỘC',
      meaning: 'Đọc',
      children: [
        { char: '言', name: 'BỘ NGÔN', meaning: 'Lời nói' },
        { char: '売', name: 'MẠI', meaning: 'Bán' }
      ]
    }
  },
  {
    id: 'kaku',
    char: '書',
    hanViet: 'THƯ',
    meaning: 'Viết, sách',
    onyomi: ['ショ'],
    kunyomi: ['か.く'],
    strokes: 10,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Thư (書) gồm bộ Duật (聿 - cây bút) và bộ Nhật (日 - ban ngày). Tưởng tượng hình ảnh người học giả cầm bút (聿) "viết" (書) sách miệt mài suốt cả ban ngày (日).',
    vocab: [
      { kanji: '書', hiragana: 'か', meaning: 'viết' },
      { kanji: '書きます', hiragana: 'かきます', meaning: 'viết' },
      { kanji: '書き物', hiragana: 'かきもの', meaning: 'tài liệu viết' },
      { kanji: '辞書', hiragana: 'じしょ', meaning: 'từ điển' },
      { kanji: '図書館', hiragana: 'としょかん', meaning: 'thư viện' },
      { kanji: '下書き', hiragana: 'したがき', meaning: 'bản nháp' }
    ],
    radicalTree: {
      char: '書',
      name: 'THƯ',
      meaning: 'Viết, sách',
      children: [
        { char: '聿', name: 'BỘ DUẬT', meaning: 'Cây bút' },
        { char: '日', name: 'BỘ NHẬT', meaning: 'Mặt trời, ngày' }
      ]
    }
  },
  {
    id: 'hanasu',
    char: '話',
    hanViet: 'THOẠI',
    meaning: 'Trò chuyện, câu chuyện',
    onyomi: ['ワ'],
    kunyomi: ['はな.す', 'はなし'],
    strokes: 13,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Thoại (話) gồm bộ Ngôn (言 - lời nói) và chữ Thiệt (舌 - cái lưỡi). Người ta dùng lời nói (言) và uốn cái lưỡi (舌) để "trò chuyện" (話) với nhau.',
    vocab: [
      { kanji: '話', hiragana: 'はな', meaning: 'nói' },
      { kanji: '話します', hiragana: 'はなします', meaning: 'nói chuyện' },
      { kanji: '話', hiragana: 'はなし', meaning: 'câu chuyện' },
      { kanji: '電話', hiragana: 'でんわ', meaning: 'điện thoại' },
      { kanji: '会話', hiragana: 'かいわ', meaning: 'hội thoại' },
      { kanji: '世話', hiragana: 'せわ', meaning: 'chăm sóc' }
    ],
    radicalTree: {
      char: '話',
      name: 'THOẠI',
      meaning: 'Trò chuyện',
      children: [
        { char: '言', name: 'BỘ NGÔN', meaning: 'Lời nói' },
        { char: '舌', name: 'BỘ THIỆT', meaning: 'Cái lưỡi' }
      ]
    }
  }
];

export const vocabLesson6JPD123: VocabExample[] = [
  { kanji: '今', hiragana: 'いま', meaning: 'bây giờ' },
  { kanji: '今年', hiragana: 'ことし', meaning: 'năm nay' },
  { kanji: '今日', hiragana: 'きょう', meaning: 'hôm nay' },
  { kanji: '今月', hiragana: 'こんげつ', meaning: 'tháng này' },
  { kanji: '今週', hiragana: 'こんしゅう', meaning: 'tuần này' },
  { kanji: '今晩', hiragana: 'こんばん', meaning: 'tối nay' },
  { kanji: '今朝', hiragana: 'けさ', meaning: 'sáng nay' },
  { kanji: '来', hiragana: 'く', meaning: 'đến' },
  { kanji: '来ます', hiragana: 'きます', meaning: 'đến' },
  { kanji: '来週', hiragana: 'らいしゅう', meaning: 'tuần sau' },
  { kanji: '来月', hiragana: 'らいげつ', meaning: 'tháng sau' },
  { kanji: '来年', hiragana: 'らいねん', meaning: 'năm sau' },
  { kanji: '来日', hiragana: 'らいにち', meaning: 'đến Nhật' },
  { kanji: '帰', hiragana: 'かえ', meaning: 'về' },
  { kanji: '帰ります', hiragana: 'かえります', meaning: 'trở về' },
  { kanji: '帰国', hiragana: 'きこく', meaning: 'về nước' },
  { kanji: '日帰り', hiragana: 'ひがえり', meaning: 'đi về trong ngày' },
  { kanji: '会', hiragana: 'あ', meaning: 'gặp' },
  { kanji: '会います', hiragana: 'あいます', meaning: 'gặp gỡ' },
  { kanji: '会社', hiragana: 'かいしゃ', meaning: 'công ty' },
  { kanji: '会話', hiragana: 'かいわ', meaning: 'hội thoại' },
  { kanji: '会議', hiragana: 'かいぎ', meaning: 'cuộc họp' },
  { kanji: '社', hiragana: 'しゃ', meaning: 'công ty' },
  { kanji: '社会', hiragana: 'しゃかい', meaning: 'xã hội' },
  { kanji: '社長', hiragana: 'しゃちょう', meaning: 'giám đốc' },
  { kanji: '神社', hiragana: 'じんじゃ', meaning: 'đền Thần đạo' },
  { kanji: '聞', hiragana: 'き', meaning: 'nghe' },
  { kanji: '聞きます', hiragana: 'ききます', meaning: 'nghe, hỏi' },
  { kanji: '聞こえる', hiragana: 'きこえる', meaning: 'có thể nghe thấy' },
  { kanji: '新聞', hiragana: 'しんぶん', meaning: 'tờ báo' },
  { kanji: '読', hiragana: 'よ', meaning: 'đọc' },
  { kanji: '読みます', hiragana: 'よみます', meaning: 'đọc' },
  { kanji: '読書', hiragana: 'どくしょ', meaning: 'đọc sách' },
  { kanji: '読者', hiragana: 'どくしゃ', meaning: 'độc giả' },
  { kanji: '書', hiragana: 'か', meaning: 'viết' },
  { kanji: '書きます', hiragana: 'かきます', meaning: 'viết' },
  { kanji: '辞書', hiragana: 'じしょ', meaning: 'từ điển' },
  { kanji: '図書館', hiragana: 'としょかん', meaning: 'thư viện' },
  { kanji: '下書き', hiragana: 'したがき', meaning: 'bản nháp' },
  { kanji: '話', hiragana: 'はな', meaning: 'nói' },
  { kanji: '話します', hiragana: 'はなします', meaning: 'nói chuyện' },
  { kanji: '話', hiragana: 'はなし', meaning: 'câu chuyện' },
  { kanji: '電話', hiragana: 'でんわ', meaning: 'điện thoại' },
  { kanji: '世話', hiragana: 'せわ', meaning: 'chăm sóc' },
  { kanji: '書き物', hiragana: 'かきもの', meaning: 'tài liệu viết' },
  { kanji: 'お寺', hiragana: 'おてら', meaning: 'chùa' },
  { kanji: '言います', hiragana: 'いいます', meaning: 'nói' },
  { kanji: '言語', hiragana: 'げんご', meaning: 'ngôn ngữ' },
  { kanji: '言葉', hiragana: 'ことば', meaning: 'từ vựng' },
  { kanji: '貝', hiragana: 'かい', meaning: 'con sò' },
  { kanji: '田んぼ', hiragana: 'たんぼ', meaning: 'cánh đồng' },
  { kanji: '水田', hiragana: 'すいでん', meaning: 'cánh đồng lúa nước' },
  { kanji: '力', hiragana: 'ちから', meaning: 'sức lực' },
  { kanji: '水力', hiragana: 'すいりょく', meaning: 'sức nước' },
  { kanji: '火力', hiragana: 'かりょく', meaning: 'công suất nhiệt, hỏa lực' },
  { kanji: '門', hiragana: 'もん', meaning: 'cổng, cửa' }
];
