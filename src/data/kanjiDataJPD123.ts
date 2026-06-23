import type { KanjiDetail, VocabExample } from './kanjiData';

export const kanjiLessonJPD123: KanjiDetail[] = [
  {
    id: 'higashi',
    char: '東',
    hanViet: 'ĐÔNG',
    meaning: 'Phía Đông',
    onyomi: ['トウ'],
    kunyomi: ['ひがし'],
    strokes: 8,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Đông (東) được ghép từ bộ Mộc (木 - cái cây) và bộ Nhật (日 - mặt trời). Tưởng tượng hình ảnh mặt trời (日) đang dần nhô lên phía sau một cái cây (木) báo hiệu buổi sáng ở phía Đông (東).',
    vocab: [
      { kanji: '東', hiragana: 'ひがし', meaning: 'phía đông' },
      { kanji: '東京', hiragana: 'とうきょう', meaning: 'Tokyo' }
    ],
    radicalTree: {
      char: '東',
      name: 'ĐÔNG',
      meaning: 'Phía đông',
      children: [
        { char: '日', name: 'BỘ NHẬT', meaning: 'Mặt trời' },
        { char: '木', name: 'BỘ MỘC', meaning: 'Cây' }
      ]
    }
  },
  {
    id: 'kyou',
    char: '京',
    hanViet: 'KINH',
    meaning: 'Kinh đô, thủ đô',
    onyomi: ['キョウ', 'ケイ'],
    kunyomi: ['みやこ'],
    strokes: 8,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Kinh (京) tượng trưng cho kinh đô. Chữ này trông giống như một tòa lâu đài nguy nga, trên cùng có mái vòm (亠), ở giữa có ban công (口) và phía dưới là đôi trụ cổng lớn (小) mở rộng đón khách.',
    vocab: [
      { kanji: '東京', hiragana: 'とうきょう', meaning: 'Tokyo' },
      { kanji: '京都', hiragana: 'きょうと', meaning: 'Kyoto' }
    ],
    radicalTree: {
      char: '京',
      name: 'KINH',
      meaning: 'Kinh đô'
    }
  },
  {
    id: 'na',
    char: '名',
    hanViet: 'DANH',
    meaning: 'Tên gọi',
    onyomi: ['メイ', 'ミョウ'],
    kunyomi: ['な'],
    strokes: 6,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Danh (名) được ghép từ bộ Tịch (夕 - buổi tối) và bộ Khẩu (口 - cái miệng). Vào buổi tối (夕) trời tối đen không nhìn rõ mặt, người ta phải dùng miệng (口) gọi TÊN nhau để nhận biết.',
    vocab: [
      { kanji: '名前', hiragana: 'なまえ', meaning: 'tên' },
      { kanji: '有名', hiragana: 'ゆうめい', meaning: 'nổi tiếng' }
    ],
    radicalTree: {
      char: '名',
      name: 'DANH',
      meaning: 'Tên',
      children: [
        { char: '夕', name: 'BỘ TỊCH', meaning: 'Buổi tối' },
        { char: '口', name: 'BỘ KHẨU', meaning: 'Miệng' }
      ]
    }
  },
  {
    id: 'mae',
    char: '前',
    hanViet: 'TIỀN',
    meaning: 'Phía trước',
    onyomi: ['ゼン'],
    kunyomi: ['まえ'],
    strokes: 9,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Tiền (前) có bộ Nguyệt (Nhục - 肉/月 - miếng thịt) và bộ Đao (刂 - con dao). Hãy tưởng tượng bạn đang cầm dao (刂) thái miếng thịt (月) và đặt ngay "phía trước" mặt mình để chuẩn bị nấu ăn.',
    vocab: [
      { kanji: '前', hiragana: 'まえ', meaning: 'phía trước' },
      { kanji: '午前', hiragana: 'ごぜん', meaning: 'a.m' },
      { kanji: '前日', hiragana: 'ぜんじつ', meaning: 'ngày trước đó' },
      { kanji: '名前', hiragana: 'なまえ', meaning: 'tên' }
    ],
    radicalTree: {
      char: '前',
      name: 'TIỀN',
      meaning: 'Phía trước',
      children: [
        { char: '月', name: 'BỘ NGUYỆT', meaning: 'Mặt trăng / Nhục' },
        { char: '刂', name: 'BỘ ĐAO', meaning: 'Con dao' }
      ]
    }
  },
  {
    id: 'kuni',
    char: '国',
    hanViet: 'QUỐC',
    meaning: 'Quốc gia',
    onyomi: ['コク'],
    kunyomi: ['くに'],
    strokes: 8,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Quốc (国) gồm bộ Vi (囗 - đường bao quanh) ở ngoài và chữ Ngọc (玉 - viên ngọc/vị vua) ở trong. Một quốc gia (国) là nơi có ranh giới lãnh thổ bảo vệ (囗) vị vua (hoặc kho báu) (玉) ở bên trong.',
    vocab: [
      { kanji: '国', hiragana: 'くに', meaning: 'đất nước, quốc gia' },
      { kanji: '外国', hiragana: 'がいこく', meaning: 'nước ngoài' },
      { kanji: '外国人', hiragana: 'がいこくじん', meaning: 'người nước ngoài' }
    ],
    radicalTree: {
      char: '国',
      name: 'QUỐC',
      meaning: 'Quốc gia',
      children: [
        { char: '囗', name: 'BỘ VI', meaning: 'Bao quanh' },
        { char: '玉', name: 'BỘ NGỌC', meaning: 'Viên ngọc, Vua' }
      ]
    }
  },
  {
    id: 'minami',
    char: '南',
    hanViet: 'NAM',
    meaning: 'Phía Nam',
    onyomi: ['ナン'],
    kunyomi: ['みなみ'],
    strokes: 9,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Nam (南) có phần trên (十) giống kim chỉ nam, phần khung (冂) là vỏ la bàn, bên trong chỉ hướng Nam - nơi ấm áp mà cây cỏ phát triển tươi tốt.',
    vocab: [
      { kanji: '南', hiragana: 'みなみ', meaning: 'phía nam' },
      { kanji: '南口', hiragana: 'みなみぐち', meaning: 'cổng nam' }
    ],
    radicalTree: {
      char: '南',
      name: 'NAM',
      meaning: 'Phía Nam'
    }
  },
  {
    id: 'onna',
    char: '女',
    hanViet: 'NỮ',
    meaning: 'Phụ nữ',
    onyomi: ['ジョ', 'ニョ'],
    kunyomi: ['おんな'],
    strokes: 3,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Nữ (女) bắt nguồn từ chữ tượng hình mô phỏng lại hình dáng một người phụ nữ đang ngồi quỳ hai chân và chắp tay ngang ngực một cách e lệ, dịu dàng.',
    vocab: [
      { kanji: '女の人', hiragana: 'おんなのひと', meaning: 'người phụ nữ' },
      { kanji: '女の子', hiragana: 'おんなのこ', meaning: 'bé gái' },
      { kanji: '男女', hiragana: 'だんじょ', meaning: 'nam nữ' }
    ],
    radicalTree: {
      char: '女',
      name: 'BỘ NỮ',
      meaning: 'Phụ nữ'
    }
  },
  {
    id: 'otoko',
    char: '男',
    hanViet: 'NAM',
    meaning: 'Nam giới',
    onyomi: ['ダン', 'ナン'],
    kunyomi: ['おとこ'],
    strokes: 7,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Nam (男 - đàn ông) được ghép từ bộ Điền (田 - ruộng đồng) và bộ Lực (力 - sức mạnh). Người đàn ông (男) là trụ cột gia đình, phải dùng sức lực (力) để cày cấy trên ruộng đồng (田).',
    vocab: [
      { kanji: '男の人', hiragana: 'おとこのひと', meaning: 'người đàn ông' },
      { kanji: '男の子', hiragana: 'おとこのこ', meaning: 'bé trai' },
      { kanji: '男女', hiragana: 'だんじょ', meaning: 'nam nữ' }
    ],
    radicalTree: {
      char: '男',
      name: 'NAM',
      meaning: 'Nam giới',
      children: [
        { char: '田', name: 'BỘ ĐIỀN', meaning: 'Cánh đồng' },
        { char: '力', name: 'BỘ LỰC', meaning: 'Sức mạnh' }
      ]
    }
  },
  {
    id: 'ku',
    char: '区',
    hanViet: 'KHU',
    meaning: 'Khu vực',
    onyomi: ['ク'],
    kunyomi: [],
    strokes: 4,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Khu (区) gồm bộ Phương (匚 - cái hộp/khuôn viên) và chữ Ngải (乂 - dấu chéo). Tưởng tượng bạn đang khoanh vùng một khu đất (匚) và đánh dấu chéo (乂) để phân chia thành các "khu vực".',
    vocab: [
      { kanji: '区', hiragana: 'く', meaning: 'khu vực, quận' }
    ],
    radicalTree: {
      char: '区',
      name: 'KHU',
      meaning: 'Khu vực',
      children: [
        { char: '匚', name: 'BỘ PHƯƠNG', meaning: 'Cái hộp' },
        { char: '乂', name: 'NGẢI', meaning: 'Cắt cỏ' }
      ]
    }
  },
  {
    id: 'shi',
    char: '市',
    hanViet: 'THỊ',
    meaning: 'Thành phố / chợ',
    onyomi: ['シ'],
    kunyomi: ['いち'],
    strokes: 5,
    jlpt: 'JPD123',
    mnemonic: 'Chữ Thị (市 - thành phố, chợ) có phần trên (亠) như chiếc nón, phần dưới giống một dải khăn. Gợi nhớ đến hình ảnh những người phụ nữ đội nón, quấn khăn mang hàng hóa ra "chợ" để buôn bán.',
    vocab: [
      { kanji: '市', hiragana: 'し', meaning: 'thành phố' },
      { kanji: '市場', hiragana: 'いちば', meaning: 'chợ' }
    ],
    radicalTree: {
      char: '市',
      name: 'THỊ',
      meaning: 'Thành phố'
    }
  }
];

export const vocabLessonJPD123: VocabExample[] = [
  { kanji: '東', hiragana: 'ひがし', meaning: 'phía đông' },
  { kanji: '東京', hiragana: 'とうきょう', meaning: 'Tokyo' },
  { kanji: '京都', hiragana: 'きょうと', meaning: 'Kyoto' },
  { kanji: '前', hiragana: 'まえ', meaning: 'phía trước' },
  { kanji: '午前', hiragana: 'ごぜん', meaning: 'a.m' },
  { kanji: '前日', hiragana: 'ぜんじつ', meaning: 'ngày trước đó' },
  { kanji: '名前', hiragana: 'なまえ', meaning: 'tên' },
  { kanji: '国', hiragana: 'くに', meaning: 'đất nước, quốc gia' },
  { kanji: '外国', hiragana: 'がいこく', meaning: 'nước ngoài' },
  { kanji: '外国人', hiragana: 'がいこくじん', meaning: 'người nước ngoài' },
  { kanji: '男の人', hiragana: 'おとこのひと', meaning: 'người đàn ông' },
  { kanji: '女の人', hiragana: 'おんなのひと', meaning: 'người phụ nữ' },
  { kanji: '男女', hiragana: 'だんじょ', meaning: 'nam nữ' },
  { kanji: '南', hiragana: 'みなみ', meaning: 'phía nam' },
  { kanji: '区', hiragana: 'く', meaning: 'khu vực, quận' },
  { kanji: '市', hiragana: 'し', meaning: 'thành phố' }
];
