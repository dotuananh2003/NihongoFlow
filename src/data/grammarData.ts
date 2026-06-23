export interface GrammarExample {
  japanese: string;
  reading?: string;
  romaji?: string;
  vietnamese: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  meaning: string;
  type: string;
  jlpt: string;
  difficulty: string;
  examples: GrammarExample[];
  isLearned?: boolean;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
  barColor?: string;
  structure?: React.ReactNode | string;
  structureDetails?: string;
  explanationTitle?: string;
  explanationDetails?: string;
  usage?: string;
  note?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  description: string;
  grammarPoints: GrammarPoint[];
}

export interface GrammarCourse {
  id: string;
  title: string;
  description: string;
  lessons: GrammarLesson[];
}

export const grammarCourses: GrammarCourse[] = [
  {
    id: 'jpd113',
    title: 'Ngữ pháp JPD113',
    description: 'N5 sơ cấp - Japanese 1',
    lessons: []
  },
  {
    id: 'jpd123',
    title: 'Ngữ pháp JPD123',
    description: 'N5 nâng cao - Japanese 2',
    lessons: [
      {
        id: 'lesson-4',
        title: 'Tính từ và Sự tồn tại',
        description: 'Tính từ đuôi い và ある・いる',
        grammarPoints: [
          {
            id: 'g1', title: 'N は Aい です。', meaning: 'N thì [tính chất] A', type: 'Cấu trúc tồn tại', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'い', iconBg: 'bg-blue-50 dark:bg-blue-900/30', iconColor: 'text-blue-500',
            structure: 'N は A い です', 
            structureDetails: 'Danh từ + は + Tính từ đuôi い + です',
            explanationTitle: 'N thì [tính chất] A',
            explanationDetails: 'Tính từ đuôi い (Khẳng định)',
            usage: 'Miêu tả tính chất của sự vật hiện tượng.',
            note: 'Giữ nguyên い khi đi với です.',
            examples: [
              { japanese: 'この料理は辛いです。', reading: 'このりょうりはからいです。', romaji: 'kono ryouri wa karai desu.', vietnamese: 'Món ăn này cay.' },
              { japanese: 'この本はおもしろいです。', reading: 'このほんはおもしろいです。', romaji: 'kono hon wa omoshiroi desu.', vietnamese: 'Quyển sách này thú vị.' },
              { japanese: '日本の冬は寒いです。', reading: 'にほんのふゆはさむいです。', romaji: 'nihon no fuyu wa samui desu.', vietnamese: 'Mùa đông ở Nhật Bản lạnh.' },
              { japanese: '富士山は高いです。', reading: 'ふじさんはたかいです。', romaji: 'fujisan wa takai desu.', vietnamese: 'Núi Phú Sĩ cao.' },
              { japanese: 'この林檎は甘いです。', reading: 'このりんごはあまいです。', romaji: 'kono ringo wa amai desu.', vietnamese: 'Quả táo này ngọt.' }
            ], isLearned: true
          },
          {
            id: 'g2', title: 'N は Aくない です。', meaning: 'N không [tính chất] A', type: 'Cấu trúc tồn tại', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'くない', iconBg: 'bg-blue-50 dark:bg-blue-900/30', iconColor: 'text-blue-500',
            structure: 'N は A くない です',
            structureDetails: 'Bỏ い thêm くない',
            explanationTitle: 'N không [tính chất] A',
            explanationDetails: 'Tính từ đuôi い (Phủ định)',
            usage: 'Phủ định tính chất của sự vật.',
            note: 'Ngoại lệ: いい (tốt) -> よく ない。',
            examples: [
              { japanese: 'このレモンは酸っぱくないです。', reading: 'このレモンはすっぱくないです。', romaji: 'kono remon wa suppakunai desu.', vietnamese: 'Quả chanh này không chua.' },
              { japanese: 'このお茶は熱くないです。', reading: 'このおちゃはあつくないです。', romaji: 'kono ocha wa atsukunai desu.', vietnamese: 'Trà này không nóng.' },
              { japanese: '今日は忙しくないです。', reading: 'きょうはいそがしくないです。', romaji: 'kyou wa isogashikunai desu.', vietnamese: 'Hôm nay tôi không bận.' },
              { japanese: 'この試験は難しくないです。', reading: 'このしけんはむずかしくないです。', romaji: 'kono shiken wa muzukashikunai desu.', vietnamese: 'Kỳ thi này không khó.' },
              { japanese: '天気はよくないです。', reading: 'てんきはよくないです。', romaji: 'tenki wa yokunai desu.', vietnamese: 'Thời tiết không tốt.' }
            ], isLearned: false
          },
          {
            id: 'g3', title: 'N は Aな です。', meaning: 'N thì [tính chất] A', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'な', iconBg: 'bg-emerald-50 dark:bg-emerald-900/30', iconColor: 'text-emerald-500', barColor: 'bg-emerald-500',
            structure: 'N は A な (bỏ na) です',
            structureDetails: 'Danh từ + は + Tính từ đuôi な (không có な) + です',
            explanationTitle: 'N thì [tính chất] A',
            explanationDetails: 'Tính từ đuôi な (Khẳng định)',
            usage: 'Miêu tả tính chất bằng tính từ đuôi な.',
            note: 'Cần lưu ý các từ như きれい, ゆうめい là tính từ đuôi な.',
            examples: [
              { japanese: '佐藤先生は有名です。', reading: 'さとうせんせいはゆうめいです。', romaji: 'satou sensei wa yuumei desu.', vietnamese: 'Thầy Sato nổi tiếng.' },
              { japanese: 'この公園は静かです。', reading: 'このこうえんはしずかです。', romaji: 'kono kouen wa shizuka desu.', vietnamese: 'Công viên này yên tĩnh.' },
              { japanese: 'この部屋はきれいです。', reading: 'このへやはきれいです。', romaji: 'kono heya wa kirei desu.', vietnamese: 'Căn phòng này sạch đẹp.' },
              { japanese: 'ハノイは賑やかです。', reading: 'ハノイはにぎやかです。', romaji: 'hanoi wa nigiyaka desu.', vietnamese: 'Hà Nội thì nhộn nhịp.' },
              { japanese: '彼は親切です。', reading: 'かれはしんせつです。', romaji: 'kare wa shinsetsu desu.', vietnamese: 'Anh ấy rất tốt bụng.' }
            ], isLearned: false
          },
          {
            id: 'g4', title: 'N は Aじゃありません。', meaning: 'N không [tính chất] A', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'じゃ', iconBg: 'bg-purple-50 dark:bg-purple-900/30', iconColor: 'text-purple-500',
            examples: [{ japanese: 'あの映画は面白くないです。', vietnamese: 'Bộ phim đó không thú vị.' }], isLearned: false
          },
          {
            id: 'g5', title: 'とても / すこし + A', meaning: 'Rất / Một chút', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: '✨', iconBg: 'bg-pink-50 dark:bg-pink-900/30', iconColor: 'text-pink-500',
            examples: [{ japanese: 'この町は静かです。', vietnamese: 'Thị trấn này yên tĩnh.' }], isLearned: false
          },
          {
            id: 'g6', title: 'あまり + Aくない', meaning: 'Không ... lắm', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'あ', iconBg: 'bg-orange-50 dark:bg-orange-900/30', iconColor: 'text-orange-500',
            examples: [{ japanese: '私は暇じゃありません。', vietnamese: 'Tôi không rảnh rỗi.' }], isLearned: false
          },
          {
            id: 'g7', title: 'N1 に N2 が あります。', meaning: 'Ở N1 có N2', type: 'Phó từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: '📦', iconBg: 'bg-blue-50 dark:bg-blue-900/30', iconColor: 'text-blue-600', barColor: 'bg-emerald-500',
            examples: [{ japanese: 'この料理はとても美味しいです。', vietnamese: 'Món ăn này rất ngon.' }], isLearned: false
          }
        ]
      },
      {
        id: 'lesson-5',
        title: 'Quá khứ, Sở thích và Mong muốn',
        description: 'Diễn tả quá khứ, sở thích và mong muốn',
        grammarPoints: [
          {
            id: 'g8',
            title: '〜でした / 〜ました',
            meaning: 'Đã (Quá khứ)',
            type: 'Thì quá khứ',
            jlpt: 'N5',
            difficulty: 'Cơ bản',
            examples: [
              {
                japanese: '昨日は雨でした。',
                vietnamese: 'Hôm qua trời đã mưa.'
              }
            ],
            isLearned: false
          },
          { id: 'g9', title: '〜が好きです', meaning: 'Thích...', type: 'Sở thích', jlpt: 'N5', difficulty: 'Cơ bản', examples: [{ japanese: '私はスポーツが好きです。', vietnamese: 'Tôi thích thể thao.' }] },
          { id: 'g10', title: '〜が上手です', meaning: 'Giỏi...', type: 'Kỹ năng', jlpt: 'N5', difficulty: 'Cơ bản', examples: [{ japanese: '彼女は歌が上手です。', vietnamese: 'Cô ấy hát giỏi.' }] },
          { id: 'g11', title: '〜が下手です', meaning: 'Kém...', type: 'Kỹ năng', jlpt: 'N5', difficulty: 'Cơ bản', examples: [{ japanese: '私は料理が下手です。', vietnamese: 'Tôi nấu ăn kém.' }] },
          { id: 'g12', title: '〜が欲しいです', meaning: 'Muốn có...', type: 'Mong muốn', jlpt: 'N5', difficulty: 'Trung bình', examples: [{ japanese: '新しい車が欲しいです。', vietnamese: 'Tôi muốn có một chiếc xe hơi mới.' }] },
          { id: 'g13', title: '〜たいです', meaning: 'Muốn làm...', type: 'Mong muốn', jlpt: 'N5', difficulty: 'Trung bình', examples: [{ japanese: '日本へ行きたいです。', vietnamese: 'Tôi muốn đi Nhật Bản.' }] }
        ]
      },
      {
        id: 'lesson-6',
        title: 'Rủ rê và So sánh',
        description: 'Mẫu câu rủ rê và so sánh hơn - nhất',
        grammarPoints: [
          { id: 'g14', title: '〜ましょう', meaning: 'Cùng làm... nhé', type: 'Rủ rê', jlpt: 'N5', difficulty: 'Cơ bản', examples: [{ japanese: '一緒に食べましょう。', vietnamese: 'Cùng ăn nhé.' }] },
          { id: 'g15', title: '〜ませんか', meaning: 'Làm... không?', type: 'Rủ rê', jlpt: 'N5', difficulty: 'Cơ bản', examples: [{ japanese: '映画を見に行きませんか。', vietnamese: 'Đi xem phim không?' }] },
          { id: 'g16', title: 'A は B より〜', meaning: 'A ... hơn B', type: 'So sánh hơn', jlpt: 'N5', difficulty: 'Trung bình', examples: [{ japanese: '東京は大阪より大きいです。', vietnamese: 'Tokyo lớn hơn Osaka.' }] },
          { id: 'g17', title: 'A と B とどちらが〜', meaning: 'Giữa A và B thì cái nào...', type: 'So sánh lựa chọn', jlpt: 'N5', difficulty: 'Trung bình', examples: [{ japanese: 'サッカーと野球とどちらが好きですか。', vietnamese: 'Bóng đá và bóng chày, bạn thích cái nào hơn?' }] },
          { id: 'g18', title: '〜の中で一番〜', meaning: '... nhất trong...', type: 'So sánh nhất', jlpt: 'N5', difficulty: 'Trung bình', examples: [{ japanese: '果物の中でりんごが一番好きです。', vietnamese: 'Trong các loại trái cây, tôi thích táo nhất.' }] }
        ]
      },
      {
        id: 'lesson-7',
        title: 'Sự hiện diện và Đang thực hiện',
        description: 'Diễn tả trạng thái hiện tại và hành động đang diễn ra',
        grammarPoints: [
          { id: 'g19', title: '〜ています（Hành động）', meaning: 'Đang làm...', type: 'Tiếp diễn', jlpt: 'N5', difficulty: 'Nâng cao', examples: [{ japanese: '今、本を読んでいます。', vietnamese: 'Bây giờ tôi đang đọc sách.' }] },
          { id: 'g20', title: '〜ています（Trạng thái）', meaning: 'Đang (trong trạng thái)...', type: 'Trạng thái', jlpt: 'N5', difficulty: 'Nâng cao', examples: [{ japanese: '私は結婚しています。', vietnamese: 'Tôi đã kết hôn (và đang trong tình trạng hôn nhân).' }] },
          { id: 'g21', title: '〜に〜があります/います', meaning: 'Ở... có...', type: 'Vị trí', jlpt: 'N5', difficulty: 'Trung bình', examples: [{ japanese: '部屋に机があります。', vietnamese: 'Trong phòng có cái bàn.' }] },
          { id: 'g22', title: '〜は〜にあります/います', meaning: '... thì ở...', type: 'Vị trí', jlpt: 'N5', difficulty: 'Trung bình', examples: [{ japanese: '山田さんは会議室にいます。', vietnamese: 'Anh Yamada thì ở phòng họp.' }] },
          { id: 'g23', title: 'や / など', meaning: 'Và / Vân vân...', type: 'Liệt kê', jlpt: 'N5', difficulty: 'Trung bình', examples: [{ japanese: '箱の中にペンやノートなどがあります。', vietnamese: 'Trong hộp có bút và vở, v.v.' }] }
        ]
      }
    ]
  }
];
