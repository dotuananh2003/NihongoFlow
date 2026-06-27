import type { KanjiDetail, VocabExample } from './kanjiData';

export const kanjiLesson3: KanjiDetail[] = [
  {
    id: 'getsu',
    char: '月',
    hanViet: 'NGUYỆT',
    meaning: 'Mặt trăng, tháng, thứ Hai',
    onyomi: ['ゲツ', 'ガツ'],
    kunyomi: ['つき'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Hình ảnh vầng trăng khuyết với hai đám mây mỏng trôi ngang qua. Nhìn là suy ra ngay ý nghĩa "MẶT TRĂNG" hoặc "THÁNG".',
    vocab: [
      { kanji: '月', hiragana: 'つき', meaning: 'mặt trăng' },
      { kanji: '一月', hiragana: 'いちがつ', meaning: 'Tháng 1' },
      { kanji: '十二月', hiragana: 'じゅうにがつ', meaning: 'Tháng 12' },
      { kanji: '月曜日', hiragana: 'げつようび', meaning: 'Thứ 2' }
    ],
    radicalTree: {
      char: '月',
      name: 'NGUYỆT',
      meaning: 'Mặt trăng',
      children: [
        { char: '月', name: 'BỘ NGUYỆT', meaning: 'Mặt trăng' }
      ]
    }
  },
  {
    id: 'hi',
    char: '火',
    hanViet: 'HỎA',
    meaning: 'Lửa, thứ Ba',
    onyomi: ['カ'],
    kunyomi: ['ひ', 'び', 'ほ'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Trông giống hình ảnh một đống lửa đang cháy rừng rực với những tia lửa bắn ra hai bên. Suy ra nghĩa "LỬA".',
    vocab: [
      { kanji: '火', hiragana: 'ひ', meaning: 'lửa' },
      { kanji: '花火', hiragana: 'はなび', meaning: 'pháo hoa' },
      { kanji: '火曜日', hiragana: 'かようび', meaning: 'Thứ 3' }
    ],
    radicalTree: {
      char: '火',
      name: 'HỎA',
      meaning: 'Lửa',
      children: [
        { char: '火', name: 'BỘ HỎA', meaning: 'Lửa' }
      ]
    }
  },
  {
    id: 'mizu',
    char: '水',
    hanViet: 'THỦY',
    meaning: 'Nước, thứ Tư',
    onyomi: ['スイ'],
    kunyomi: ['みず'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Hình ảnh một dòng nước chảy xiết ở giữa và những giọt nước văng tung tóe ra hai bên bờ. Suy ra nghĩa "NƯỚC".',
    vocab: [
      { kanji: '水', hiragana: 'みず', meaning: 'nước' },
      { kanji: '水曜日', hiragana: 'すいようび', meaning: 'Thứ 4' }
    ],
    radicalTree: {
      char: '水',
      name: 'THỦY',
      meaning: 'Nước',
      children: [
        { char: '水', name: 'BỘ THỦY', meaning: 'Nước' }
      ]
    }
  },
  {
    id: 'ki',
    char: '木',
    hanViet: 'MỘC',
    meaning: 'Cây, thứ Năm',
    onyomi: ['モク', 'ボク'],
    kunyomi: ['き', 'こ'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Rất dễ nhận ra hình ảnh một cái cây có thân gỗ thẳng đứng, cành lá vươn ra hai bên và rễ cắm sâu xuống đất. Suy ra nghĩa "CÂY".',
    vocab: [
      { kanji: '木', hiragana: 'き', meaning: 'Cây' },
      { kanji: '木曜日', hiragana: 'もくようび', meaning: 'Thứ 5' }
    ],
    radicalTree: {
      char: '木',
      name: 'MỘC',
      meaning: 'Cây',
      children: [
        { char: '木', name: 'BỘ MỘC', meaning: 'Cây' }
      ]
    }
  },
  {
    id: 'kane',
    char: '金',
    hanViet: 'KIM',
    meaning: 'Tiền, vàng, thứ Sáu',
    onyomi: ['キン', 'コン'],
    kunyomi: ['かね', 'かな'],
    strokes: 8,
    jlpt: 'N5',
    mnemonic: 'Dưới mái nhà (như một ngọn núi), lớp đất đai (土) đang che giấu hai cục vàng lấp lánh (hai dấu phẩy). Khai thác được nó là có rất nhiều tiền. Suy ra nghĩa "TIỀN" hoặc "VÀNG".',
    vocab: [
      { kanji: 'お金', hiragana: 'おかね', meaning: 'tiền' },
      { kanji: '金曜日', hiragana: 'きんようび', meaning: 'Thứ 6' }
    ],
    radicalTree: {
      char: '金',
      name: 'KIM',
      meaning: 'Tiền, vàng',
      children: [
        { char: '金', name: 'BỘ KIM', meaning: 'Vàng, kim loại' }
      ]
    }
  },
  {
    id: 'tsuchi',
    char: '土',
    hanViet: 'THỔ',
    meaning: 'Đất, thứ Bảy',
    onyomi: ['ド', 'ト'],
    kunyomi: ['つち'],
    strokes: 3,
    jlpt: 'N5',
    mnemonic: 'Hình ảnh một mầm cây đang đâm chồi nảy lộc từ một mô đất thấp vươn lên mặt đất bằng phẳng bên trên. Suy ra nghĩa "ĐẤT".',
    vocab: [
      { kanji: '土', hiragana: 'つち', meaning: 'Đất' },
      { kanji: '土曜日', hiragana: 'どようび', meaning: 'Thứ 7' }
    ],
    radicalTree: {
      char: '土',
      name: 'THỔ',
      meaning: 'Đất',
      children: [
        { char: '土', name: 'BỘ THỔ', meaning: 'Đất' }
      ]
    }
  },
  {
    id: 'nani',
    char: '何',
    hanViet: 'HÀ',
    meaning: 'Cái gì',
    onyomi: ['カ'],
    kunyomi: ['なに', 'なん'],
    strokes: 7,
    jlpt: 'N5',
    mnemonic: 'Một người (bộ Nhân 亻) đang gánh một cái hộp (khẩu 口) bằng một chiếc đòn gánh (亅). Mọi người tò mò không biết bên trong có cái gì. Suy ra nghĩa "CÁI GÌ".',
    vocab: [
      { kanji: '何', hiragana: 'なん／なに', meaning: 'Cái gì' },
      { kanji: '何月', hiragana: 'なんがつ', meaning: 'tháng mấy' },
      { kanji: '何人', hiragana: 'なんにん', meaning: 'mấy người' },
      { kanji: '何曜日', hiragana: 'なんようび', meaning: 'Thứ mấy' },
      { kanji: '何年', hiragana: 'なんねん', meaning: 'Năm bao nhiêu' },
      { kanji: '何時', hiragana: 'なんじ', meaning: 'Mấy giờ' },
      { kanji: '何時間', hiragana: 'なんじかん', meaning: 'Mấy tiếng' }
    ],
    radicalTree: {
      char: '何',
      name: 'HÀ',
      meaning: 'Cái gì',
      children: [
        { char: '亻', name: 'BỘ NHÂN', meaning: 'Người' },
        { char: '可', name: 'KHẢ', meaning: 'Có thể' }
      ]
    }
  },
  {
    id: 'toshi',
    char: '年',
    hanViet: 'NIÊN',
    meaning: 'Năm',
    onyomi: ['ネン'],
    kunyomi: ['とし'],
    strokes: 6,
    jlpt: 'N5',
    mnemonic: 'Trông giống hình ảnh một người nông dân đang cõng bó lúa trên lưng sau một vụ mùa thu hoạch. Cứ mỗi năm lại thu hoạch lúa một lần. Suy ra nghĩa "NĂM".',
    vocab: [
      { kanji: '今年', hiragana: 'ことし', meaning: 'Năm nay' },
      { kanji: '何年', hiragana: 'なんねん', meaning: 'Năm bao nhiêu' }
    ],
    radicalTree: {
      char: '年',
      name: 'NIÊN',
      meaning: 'Năm',
      children: [
        { char: '干', name: 'BỘ CAN', meaning: 'Cái khiên' },
        { char: '丿', name: 'BỘ PHIỆT', meaning: 'Nét phẩy' }
      ]
    }
  },
  {
    id: 'toki',
    char: '時',
    hanViet: 'THỜI',
    meaning: 'Thời gian, giờ',
    onyomi: ['ジ'],
    kunyomi: ['とき'],
    strokes: 10,
    jlpt: 'N5',
    mnemonic: 'Chữ này ghép từ chữ Nhật (日 - mặt trời) và chữ Tự (寺 - ngôi chùa). Thời xưa, người ta nhìn ánh nắng mặt trời chiếu xuống ngôi chùa để xác định thời gian trong ngày. Suy ra nghĩa "THỜI GIAN", "GIỜ".',
    vocab: [
      { kanji: '九時', hiragana: 'くじ', meaning: '9 giờ' },
      { kanji: '何時', hiragana: 'なんじ', meaning: 'Mấy giờ' },
      { kanji: '時間', hiragana: 'じかん', meaning: 'Thời gian' }
    ],
    radicalTree: {
      char: '時',
      name: 'THỜI',
      meaning: 'Thời gian, giờ',
      children: [
        { char: '日', name: 'BỘ NHẬT', meaning: 'Mặt trời, ngày' },
        { char: '寺', name: 'TỰ', meaning: 'Ngôi chùa' }
      ]
    }
  },
  {
    id: 'aida',
    char: '間',
    hanViet: 'GIAN',
    meaning: 'Khoảng trống, ở giữa, gian phòng',
    onyomi: ['カン', 'ケン'],
    kunyomi: ['あいだ', 'ま'],
    strokes: 12,
    jlpt: 'N5',
    mnemonic: 'Chữ này ghép từ chữ Môn (門 - cái cổng) và chữ Nhật (日 - mặt trời). Khoảng trống ở giữa hai cánh cổng cho phép ánh sáng mặt trời lọt qua. Suy ra nghĩa "KHOẢNG TRỐNG", "Ở GIỮA".',
    vocab: [
      { kanji: '時間', hiragana: 'じかん', meaning: 'Thời gian' },
      { kanji: '何時間', hiragana: 'なんじかん', meaning: 'Mấy tiếng' }
    ],
    radicalTree: {
      char: '間',
      name: 'GIAN',
      meaning: 'Ở giữa, thời gian',
      children: [
        { char: '門', name: 'BỘ MÔN', meaning: 'Cửa, cổng' },
        { char: '日', name: 'BỘ NHẬT', meaning: 'Mặt trời, ngày' }
      ]
    }
  },
  {
    id: 'fun',
    char: '分',
    hanViet: 'PHÂN',
    meaning: 'Phân chia, hiểu, phút',
    onyomi: ['ブン', 'フン', 'ブ'],
    kunyomi: ['わ.ける', 'わ.かる'],
    strokes: 4,
    jlpt: 'N5',
    mnemonic: 'Chữ Bát (八 - chia ra) nằm trên chữ Đao (刀 - con dao). Dùng con dao để phân chia mọi thứ ra làm hai. Phân chia rành mạch sẽ dễ hiểu, và một giờ cũng được phân chia nhỏ ra. Suy ra nghĩa "PHÂN CHIA", "HIỂU", "PHÚT".',
    vocab: [
      { kanji: '分かります', hiragana: 'わかります', meaning: 'Hiểu' },
      { kanji: '半分', hiragana: 'はんぶん', meaning: '1/2' },
      { kanji: '六分', hiragana: 'ろっぷん', meaning: '6 phút' }
    ],
    radicalTree: {
      char: '分',
      name: 'PHÂN',
      meaning: 'Phân chia, phút',
      children: [
        { char: '八', name: 'BỘ BÁT', meaning: 'Tám, chia ra' },
        { char: '刀', name: 'BỘ ĐAO', meaning: 'Con dao' }
      ]
    }
  }
];

export const vocabLesson3: VocabExample[] = [
  { kanji: '月', hiragana: 'つき', meaning: 'mặt trăng' },
  { kanji: '一月', hiragana: 'いちがつ', meaning: 'Tháng 1' },
  { kanji: '十二月', hiragana: 'じゅうにがつ', meaning: 'Tháng 12' },
  { kanji: '月曜日', hiragana: 'げつようび', meaning: 'Thứ 2' },
  { kanji: '花火', hiragana: 'はなび', meaning: 'pháo hoa' },
  { kanji: '火', hiragana: 'ひ', meaning: 'lửa' },
  { kanji: '火曜日', hiragana: 'かようび', meaning: 'Thứ 3' },
  { kanji: '水', hiragana: 'みず', meaning: 'nước' },
  { kanji: '水曜日', hiragana: 'すいようび', meaning: 'Thứ 4' },
  { kanji: '木', hiragana: 'き', meaning: 'Cây' },
  { kanji: '木曜日', hiragana: 'もくようび', meaning: 'Thứ 5' },
  { kanji: 'お金', hiragana: 'おかね', meaning: 'tiền' },
  { kanji: '金曜日', hiragana: 'きんようび', meaning: 'Thứ 6' },
  { kanji: '土', hiragana: 'つち', meaning: 'Đất' },
  { kanji: '土曜日', hiragana: 'どようび', meaning: 'Thứ 7' },
  { kanji: '何', hiragana: 'なん／なに', meaning: 'Cái gì' },
  { kanji: '何月', hiragana: 'なんがつ', meaning: 'tháng mấy' },
  { kanji: '何人', hiragana: 'なんにん', meaning: 'mấy người' },
  { kanji: '何曜日', hiragana: 'なんようび', meaning: 'Thứ mấy' },
  { kanji: '何年', hiragana: 'なんねん', meaning: 'Năm bao nhiêu' },
  { kanji: '今年', hiragana: 'ことし', meaning: 'Năm nay' },
  { kanji: '九時', hiragana: 'くじ', meaning: '9 giờ' },
  { kanji: '何時', hiragana: 'なんじ', meaning: 'Mấy giờ' },
  { kanji: '時間', hiragana: 'じかん', meaning: 'Thời gian' },
  { kanji: '何時間', hiragana: 'なんじかん', meaning: 'Mấy tiếng' },
  { kanji: '分かります', hiragana: 'わかります', meaning: 'Hiểu' },
  { kanji: '半分', hiragana: 'はんぶん', meaning: '1/2' },
  { kanji: '六分', hiragana: 'ろっぷん', meaning: '6 phút' }
];
