import type { KanjiDetail, VocabExample } from './kanjiData';

export const kanjiLesson2: KanjiDetail[] = [
  {
    id: 'ichi',
    char: '一',
    hanViet: 'NHẤT',
    meaning: 'Số một',
    onyomi: ['イチ', 'イツ'],
    kunyomi: ['ひと.つ'],
    strokes: 1,
    jlpt: 'N5',
    mnemonic: 'Hình ảnh một ngón tay đang chỉ ngang ra để đếm số lượng. Đếm ngón đầu tiên, suy ra ý nghĩa của chữ này chính là "SỐ 1".',
    vocab: [
      { kanji: '一日', hiragana: 'ついたち', meaning: 'Ngày mồng 1' },
      { kanji: '一月', hiragana: 'いちがつ', meaning: 'tháng 1' },
      { kanji: '一人', hiragana: 'ひとり', meaning: '1 người' },
      { kanji: '一つ', hiragana: 'ひとつ', meaning: '1 chiếc' },
      { kanji: '一', hiragana: 'いち', meaning: 'Số 1' },
      { kanji: '一万', hiragana: 'いちまん', meaning: '10.000' },
      { kanji: '一万円', hiragana: 'いちまんえん', meaning: '10.000Yên' }
    ],
    radicalTree: {
      char: '一',
      name: 'BỘ NHẤT',
      meaning: 'Số một'
    }
  },
  {
    id: 'ni',
    char: '二',
    hanViet: 'NHỊ',
    meaning: 'Số hai',
    onyomi: ['ニ'],
    kunyomi: ['ふた.つ'],
    strokes: 2,
    jlpt: 'N5',
    mnemonic: 'Hình ảnh hai chiếc đũa đang được xếp song song ngay ngắn trên bàn ăn, tạo thành một bộ gồm 2 chiếc. Suy ra ý nghĩa là "SỐ 2".',
    vocab: [
      { kanji: '二日', hiragana: 'ふつか', meaning: 'Ngày mồng 2' },
      { kanji: '二月', hiragana: 'にがつ', meaning: 'Tháng 2' },
      { kanji: '二つ', hiragana: 'ふたつ', meaning: '2 cái' },
      { kanji: '二', hiragana: 'に', meaning: 'Số 2' },
      { kanji: '二百', hiragana: 'にひゃく', meaning: '200' }
    ],
    radicalTree: {
      char: '二',
      name: 'BỘ NHỊ',
      meaning: 'Số hai'
    }
  },
  {
    id: 'san',
    char: '三',
    hanViet: 'TAM',
    meaning: 'Số ba',
    onyomi: ['サン'],
    kunyomi: ['みっ.つ'],
    strokes: 3,
    jlpt: 'N5',
    mnemonic: 'Hình dáng y hệt ba nấc thang (ngắn, vừa, dài) xếp chồng lên nhau. 3 nấc thang đếm từ dưới lên trên tương ứng với ý nghĩa "SỐ 3".',
    vocab: [
      { kanji: '三日', hiragana: 'みっか', meaning: 'Ngày mồng 3' },
      { kanji: '三月', hiragana: 'さんがつ', meaning: 'tháng 3' },
      { kanji: '三人', hiragana: 'さんにん', meaning: '3 người' },
      { kanji: '三', hiragana: 'さん', meaning: 'Số 3' },
      { kanji: '三百', hiragana: 'さんびゃく', meaning: '300' },
      { kanji: '三千', hiragana: 'さんぜん', meaning: '3000' }
    ],
    radicalTree: {
      char: '三',
      name: 'TAM',
      meaning: 'Số ba',
      children: [
        { char: '一', name: 'BỘ NHẤT', meaning: 'Số một' },
        { char: '二', name: 'BỘ NHỊ', meaning: 'Số hai' }
      ]
    }
  },
  {
    id: 'yon',
    char: '四',
    hanViet: 'TỨ',
    meaning: 'Số bốn',
    onyomi: ['シ'],
    kunyomi: ['よん', 'よっ.つ'],
    strokes: 5,
    jlpt: 'N5',
    mnemonic: 'Nhìn y chang một ô cửa sổ vuông, bên trong có người đang vén tấm rèm sang hai bên. Cửa sổ hình vuông luôn có 4 góc, do đó nó mang ý nghĩa là "SỐ 4".',
    vocab: [
      { kanji: '四日', hiragana: 'よっか', meaning: 'Ngày mồng 4' },
      { kanji: '四月', hiragana: 'しがつ', meaning: 'tháng 4' },
      { kanji: '四人', hiragana: 'よにん', meaning: '4 người' },
      { kanji: '四', hiragana: 'よん', meaning: 'Số 4' }
    ],
    radicalTree: {
      char: '四',
      name: 'TỨ',
      meaning: 'Số bốn',
      children: [
        { char: '囗', name: 'BỘ VI', meaning: 'Bao vây' },
        { char: '八', name: 'BỘ BÁT', meaning: 'Tám, chia ra' }
      ]
    }
  },
  {
    id: 'go',
    char: '五',
    hanViet: 'NGŨ',
    meaning: 'Số năm',
    onyomi: ['ゴ'],
    kunyomi: ['いつ.つ'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Trông nó giống hệt chữ số 5 trong toán học nhưng bị viết cách điệu bằng những đường nét vuông vức và cứng cáp. Nhìn vào là suy ra ngay ý nghĩa "SỐ 5".',
    vocab: [
      { kanji: '五日', hiragana: 'いつか', meaning: 'Ngày mồng 5' },
      { kanji: '五月', hiragana: 'ごがつ', meaning: 'tháng 5' },
      { kanji: '五つ', hiragana: 'いつつ', meaning: '5 cái' },
      { kanji: '五', hiragana: 'ご', meaning: 'Số 5' }
    ],
    radicalTree: {
      char: '五',
      name: 'NGŨ',
      meaning: 'Số năm',
      children: [
        { char: '二', name: 'BỘ NHỊ', meaning: 'Số hai' }
      ]
    }
  },
  {
    id: 'roku',
    char: '六',
    hanViet: 'LỤC',
    meaning: 'Số sáu',
    onyomi: ['ロク'],
    kunyomi: ['むっ.つ'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Hình ảnh một chiếc ô che mưa. Dưới chiếc ô đó có đúng 6 người đang đứng sát vào nhau để trú mưa. Thế nên chữ này mang ý nghĩa là "SỐ 6".',
    vocab: [
      { kanji: '六日', hiragana: 'むいか', meaning: 'Ngày mồng 6' },
      { kanji: '六月', hiragana: 'ろくがつ', meaning: 'tháng 6' },
      { kanji: '六つ', hiragana: 'むっつ', meaning: '6 cái' },
      { kanji: '六', hiragana: 'ろく', meaning: 'Số 6' },
      { kanji: '六百', hiragana: 'ろっぴゃく', meaning: '600' }
    ],
    radicalTree: {
      char: '六',
      name: 'LỤC',
      meaning: 'Số sáu',
      children: [
        { char: '亠', name: 'BỘ ĐẦU', meaning: 'Cái nắp' },
        { char: '八', name: 'BỘ BÁT', meaning: 'Số tám' }
      ]
    }
  },
  {
    id: 'nana',
    char: '七',
    hanViet: 'THẤT',
    meaning: 'Số bảy',
    onyomi: ['シチ'],
    kunyomi: ['なな', 'なな.つ'],
    strokes: 2,
    jlpt: 'N5',
    mnemonic: 'Chữ này nhìn cực kỳ giống chữ số 7 bình thường, chỉ là nó bị lật ngược và gãy gập đi một chút. Thế nên ý nghĩa của nó chính xác là "SỐ 7".',
    vocab: [
      { kanji: '七日', hiragana: 'なのか', meaning: 'Ngày mồng 7' },
      { kanji: '七月', hiragana: 'しちがつ', meaning: 'tháng 7' },
      { kanji: '七つ', hiragana: 'ななつ', meaning: '7 cái' },
      { kanji: '七', hiragana: 'なな', meaning: 'Số 7' }
    ],
    radicalTree: {
      char: '七',
      name: 'THẤT',
      meaning: 'Số bảy',
      children: [
        { char: '一', name: 'BỘ NHẤT', meaning: 'Số một' },
        { char: '乚', name: 'BỘ ẤT', meaning: 'Can Ất' }
      ]
    }
  },
  {
    id: 'hachi',
    char: '八',
    hanViet: 'BÁT',
    meaning: 'Số tám',
    onyomi: ['ハチ'],
    kunyomi: ['やっ.つ'],
    strokes: 2,
    jlpt: 'N5',
    mnemonic: 'Nhìn giống hệt đỉnh núi Phú Sĩ với hai sườn núi dốc thoai thoải. Núi Phú Sĩ là biểu tượng mang lại may mắn, và số 8 cũng là con số phát tài lộc. Do đó nó mang nghĩa "SỐ 8".',
    vocab: [
      { kanji: '八日', hiragana: 'ようか', meaning: 'Ngày mồng 8' },
      { kanji: '八月', hiragana: 'はちがつ', meaning: 'Tháng 8' },
      { kanji: '八つ', hiragana: 'やっつ', meaning: '8 cái' },
      { kanji: '八', hiragana: 'はち', meaning: 'Số 8' },
      { kanji: '八百', hiragana: 'はっぴゃく', meaning: '800' },
      { kanji: '八千', hiragana: 'はっせん', meaning: '8000' }
    ],
    radicalTree: {
      char: '八',
      name: 'BỘ BÁT',
      meaning: 'Số tám, chia ra'
    }
  },
  {
    id: 'kyuu',
    char: '九',
    hanViet: 'CỬU',
    meaning: 'Số chín',
    onyomi: ['キュウ', 'ク'],
    kunyomi: ['ここの.つ'],
    strokes: 2,
    jlpt: 'N5',
    mnemonic: 'Giống hệt một người đang cong lưng, gập khuỷu tay và chống một chân xuống đất hít đất. Người này hít được đúng 9 cái thì mệt lả. Nên chữ này mang ý nghĩa "SỐ 9".',
    vocab: [
      { kanji: '九日', hiragana: 'ここのか', meaning: 'Ngày mồng 9' },
      { kanji: '九月', hiragana: 'くがつ', meaning: 'tháng 9' },
      { kanji: '九つ', hiragana: 'ここのつ', meaning: '9 cái' },
      { kanji: '九', hiragana: 'きゅう', meaning: 'Số 9' }
    ],
    radicalTree: {
      char: '九',
      name: 'CỬU',
      meaning: 'Số chín',
      children: [
        { char: '丿', name: 'BỘ PHIỆT', meaning: 'Nét phẩy' },
        { char: '乙', name: 'BỘ ẤT', meaning: 'Can Ất' }
      ]
    }
  },
  {
    id: 'juu',
    char: '十',
    hanViet: 'THẬP',
    meaning: 'Số mười',
    onyomi: ['ジュウ'],
    kunyomi: ['とお'],
    strokes: 2,
    jlpt: 'N5',
    mnemonic: 'Quá dễ nhớ! Nó chính xác là một dấu cộng (+) khổng lồ. Trong toán học, lấy 5 cộng (+) với 5 sẽ ra kết quả là 10. Nên chữ này có nghĩa "SỐ 10".',
    vocab: [
      { kanji: '十日', hiragana: 'とおか', meaning: 'Ngày mồng 10' },
      { kanji: '十月', hiragana: 'じゅうがつ', meaning: 'tháng 10' },
      { kanji: '十', hiragana: 'じゅう', meaning: 'Số 10' }
    ],
    radicalTree: {
      char: '十',
      name: 'BỘ THẬP',
      meaning: 'Số mười'
    }
  },
  {
    id: 'hyaku',
    char: '百',
    hanViet: 'BÁCH',
    meaning: 'Một trăm',
    onyomi: ['ヒャク'],
    kunyomi: [],
    strokes: 6,
    jlpt: 'N5',
    mnemonic: 'Hãy tưởng tượng con số 100 bị lật dọc lại: Nét ngang trên cùng là số 1, còn hình hộp bên dưới chính là hai số 0 bị ép méo lại với nhau. Ghép lại ta suy ra ngay nghĩa "100" (MỘT TRĂM).',
    vocab: [
      { kanji: '二百', hiragana: 'にひゃく', meaning: '200' },
      { kanji: '三百', hiragana: 'さんびゃく', meaning: '300' },
      { kanji: '六百', hiragana: 'ろっぴゃく', meaning: '600' },
      { kanji: '八百', hiragana: 'はっぴゃく', meaning: '800' },
      { kanji: '百円', hiragana: 'ひゃくえん', meaning: '100Yên' }
    ],
    radicalTree: {
      char: '百',
      name: 'BÁCH',
      meaning: 'Một trăm',
      children: [
        { char: '一', name: 'BỘ NHẤT', meaning: 'Số 1' },
        { char: '白', name: 'BỘ BẠCH', meaning: 'Màu trắng' }
      ]
    }
  },
  {
    id: 'sen',
    char: '千',
    hanViet: 'THIÊN',
    meaning: 'Một nghìn',
    onyomi: ['セン'],
    kunyomi: ['ち'],
    strokes: 3,
    jlpt: 'N5',
    mnemonic: 'Nhìn giống như một cây thánh giá (十) khổng lồ được đội thêm chiếc mũ (丿) trên đầu. Thánh giá này có thể ban phước lành cho hàng ngàn người. Suy ra nghĩa "MỘT NGHÌN".',
    vocab: [
      { kanji: '千', hiragana: 'せん', meaning: '1000' },
      { kanji: '三千', hiragana: 'さんぜん', meaning: '3000' },
      { kanji: '八千', hiragana: 'はっせん', meaning: '8000' }
    ],
    radicalTree: {
      char: '十',
      name: 'BỘ THẬP',
      meaning: 'Số mười'
    }
  },
  {
    id: 'man',
    char: '万',
    hanViet: 'VẠN',
    meaning: 'Mười nghìn',
    onyomi: ['マン', 'バン'],
    kunyomi: [],
    strokes: 3,
    jlpt: 'N5',
    mnemonic: 'Hình dáng trông giống như con số 5 đang bay vút lên bầu trời. Vì số tiền 1 vạn (10.000) lớn gấp rất nhiều lần con số 5 bé nhỏ nên nó được chắp cánh bay lên. Suy ra nghĩa "MƯỜI NGHÌN".',
    vocab: [
      { kanji: '一万', hiragana: 'いちまん', meaning: '10.000' },
      { kanji: '一万円', hiragana: 'いちまんえん', meaning: '10.000Yên' }
    ],
    radicalTree: {
      char: '万',
      name: 'VẠN',
      meaning: 'Mười nghìn',
      children: [
        { char: '一', name: 'BỘ NHẤT', meaning: 'Số một' },
        { char: '勹', name: 'BỘ BAO', meaning: 'Bao bọc' }
      ]
    }
  },
  {
    id: 'en',
    char: '円',
    hanViet: 'VIÊN',
    meaning: 'Hình tròn, đồng Yên',
    onyomi: ['エン'],
    kunyomi: ['まる.い'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Hãy tưởng tượng đây là khe nhả tiền của chiếc máy ATM. Máy đang liên tục tuôn ra những đồng xu hình tròn lấp lánh. Vì thế nó mang ý nghĩa là "HÌNH TRÒN" hoặc "ĐỒNG YÊN".',
    vocab: [
      { kanji: '百円', hiragana: 'ひゃくえん', meaning: '100Yên' },
      { kanji: '一万円', hiragana: 'いちまんえん', meaning: '10.000Yên' }
    ],
    radicalTree: {
      char: '円',
      name: 'VIÊN',
      meaning: 'Đồng Yên',
      children: [
        { char: '冂', name: 'BỘ QUYNH', meaning: 'Biên giới' }
      ]
    }
  }
];

export const vocabLesson2: VocabExample[] = [
  { kanji: '一日', hiragana: 'ついたち', meaning: 'Ngày mồng 1' },
  { kanji: '一月', hiragana: 'いちがつ', meaning: 'tháng 1' },
  { kanji: '一人', hiragana: 'ひとり', meaning: '1 người' },
  { kanji: '一つ', hiragana: 'ひとつ', meaning: '1 chiếc' },
  { kanji: '一', hiragana: 'いち', meaning: 'Số 1' },
  { kanji: '二日', hiragana: 'ふつか', meaning: 'Ngày mồng 2' },
  { kanji: '二月', hiragana: 'にがつ', meaning: 'Tháng 2' },
  { kanji: '二つ', hiragana: 'ふたつ', meaning: '2 cái' },
  { kanji: '二', hiragana: 'に', meaning: 'Số 2' },
  { kanji: '三日', hiragana: 'みっか', meaning: 'Ngày mồng 3' },
  { kanji: '三月', hiragana: 'さんがつ', meaning: 'tháng 3' },
  { kanji: '三人', hiragana: 'さんにん', meaning: '3 người' },
  { kanji: '三', hiragana: 'さん', meaning: 'Số 3' },
  { kanji: '四日', hiragana: 'よっか', meaning: 'Ngày mồng 4' },
  { kanji: '四月', hiragana: 'しがつ', meaning: 'tháng 4' },
  { kanji: '四人', hiragana: 'よにん', meaning: '4 người' },
  { kanji: '四', hiragana: 'よん', meaning: 'Số 4' },
  { kanji: '五日', hiragana: 'いつか', meaning: 'Ngày mồng 5' },
  { kanji: '五月', hiragana: 'ごがつ', meaning: 'tháng 5' },
  { kanji: '五つ', hiragana: 'いつつ', meaning: '5 cái' },
  { kanji: '五', hiragana: 'ご', meaning: 'Số 5' },
  { kanji: '六日', hiragana: 'むいか', meaning: 'Ngày mồng 6' },
  { kanji: '六月', hiragana: 'ろくがつ', meaning: 'tháng 6' },
  { kanji: '六つ', hiragana: 'むっつ', meaning: '6 cái' },
  { kanji: '六', hiragana: 'ろく', meaning: 'Số 6' },
  { kanji: '七日', hiragana: 'なのか', meaning: 'Ngày mồng 7' },
  { kanji: '七月', hiragana: 'しちがつ', meaning: 'tháng 7' },
  { kanji: '七つ', hiragana: 'ななつ', meaning: '7 cái' },
  { kanji: '七', hiragana: 'なな', meaning: 'Số 7' },
  { kanji: '八日', hiragana: 'ようか', meaning: 'Ngày mồng 8' },
  { kanji: '八月', hiragana: 'はちがつ', meaning: 'Tháng 8' },
  { kanji: '八つ', hiragana: 'やっつ', meaning: '8 cái' },
  { kanji: '八', hiragana: 'はち', meaning: 'Số 8' },
  { kanji: '九日', hiragana: 'ここのか', meaning: 'Ngày mồng 9' },
  { kanji: '九月', hiragana: 'くがつ', meaning: 'tháng 9' },
  { kanji: '九つ', hiragana: 'ここのつ', meaning: '9 cái' },
  { kanji: '九', hiragana: 'きゅう', meaning: 'Số 9' },
  { kanji: '十日', hiragana: 'とおか', meaning: 'Ngày mồng 10' },
  { kanji: '十月', hiragana: 'じゅうがつ', meaning: 'tháng 10' },
  { kanji: '十', hiragana: 'じゅう', meaning: 'Số 10' },
  { kanji: '二百', hiragana: 'にひゃく', meaning: '200' },
  { kanji: '三百', hiragana: 'さんびゃく', meaning: '300' },
  { kanji: '六百', hiragana: 'ろっぴゃく', meaning: '600' },
  { kanji: '八百', hiragana: 'はっぴゃく', meaning: '800' },
  { kanji: '千', hiragana: 'せん', meaning: '1000' },
  { kanji: '三千', hiragana: 'さんぜん', meaning: '3000' },
  { kanji: '八千', hiragana: 'はっせん', meaning: '8000' },
  { kanji: '一万', hiragana: 'いちまん', meaning: '10.000' },
  { kanji: '百円', hiragana: 'ひゃくえん', meaning: '100Yên' },
  { kanji: '一万円', hiragana: 'いちまんえん', meaning: '10.000Yên' }
];
