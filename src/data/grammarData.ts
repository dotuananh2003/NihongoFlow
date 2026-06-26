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
  memoryTip?: string;
  commonWords?: string;
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
            memoryTip: 'Chữ "い" (i) ở cuối tính từ giống như cái đuôi của con mèo vậy. Đừng bao giờ vứt bỏ đuôi này khi đứng trước "です" nhé!',
            commonWords: 'Thường đi kèm với các phó từ chỉ mức độ: とても (rất), 少し (một chút), あまり (không lắm)...',
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
            memoryTip: 'Phủ định của tính từ đuôi い thì vứt đuôi "い" đi và gắn thêm đuôi mới là "くない" (kunai). Cứ nhớ thần chú: Không "i" thì "kunai"!',
            commonWords: 'Thường đi kèm với từ chỉ mức độ phủ định: あまり (không ... lắm), ぜんぜん (hoàn toàn không ...).',
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
            memoryTip: 'Tính từ đuôi な rất "đỏng đảnh", khi đứng ngay trước "です" thì cái đuôi "な" sẽ bị rớt mất. Tuyệt đối đừng viết là "なです" nhé!',
            commonWords: 'Các tính từ đuôi な quốc dân hay gặp: 好き (thích), きれい (đẹp/sạch), 有名 (nổi tiếng), 静か (yên tĩnh), 暇 (rảnh rỗi)...',
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
            examples: [
              { japanese: '私の部屋はきれいじゃありません。', reading: 'わたしのへやはきれいじゃありません。', romaji: 'watashi no heya wa kirei ja arimasen.', vietnamese: 'Phòng của tôi không sạch đẹp.' },
              { japanese: 'この町は静かじゃありません。', reading: 'このまちはしずかじゃありません。', romaji: 'kono machi wa shizuka ja arimasen.', vietnamese: 'Thành phố này không yên tĩnh.' },
              { japanese: '私は暇じゃありません。', reading: 'わたしはひまじゃありません。', romaji: 'watashi wa hima ja arimasen.', vietnamese: 'Tôi không rảnh rỗi.' },
              { japanese: 'あのレストランは有名じゃありません。', reading: 'あのレストランはゆうめいじゃありません。', romaji: 'ano resutoran wa yuumei ja arimasen.', vietnamese: 'Nhà hàng đó không nổi tiếng.' },
              { japanese: '今日の仕事は大変じゃありません。', reading: 'きょうのしごとはたいへんじゃありません。', romaji: 'kyou no shigoto wa taihen ja arimasen.', vietnamese: 'Công việc hôm nay không vất vả.' }
            ], isLearned: false
          },
          {
            id: 'g5', title: 'とても / すこし + A', meaning: 'Rất / Một chút', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: '✨', iconBg: 'bg-pink-50 dark:bg-pink-900/30', iconColor: 'text-pink-500',
            examples: [
              { japanese: 'この町はとても静かです。', reading: 'このまちはとてもしずかです。', romaji: 'kono machi wa totemo shizuka desu.', vietnamese: 'Thị trấn này rất yên tĩnh.' },
              { japanese: '今日は少し暑いです。', reading: 'きょうはすこしあついです。', romaji: 'kyou wa sukoshi atsui desu.', vietnamese: 'Hôm nay hơi nóng.' },
              { japanese: 'このケーキはとても美味しいです。', reading: 'このケーキはとてもおいしいです。', romaji: 'kono keeki wa totemo oishii desu.', vietnamese: 'Cái bánh này rất ngon.' },
              { japanese: '日本の物価は少し高いです。', reading: 'にほんのぶっかはすこしたかいです。', romaji: 'nihon no bukka wa sukoshi takai desu.', vietnamese: 'Vật giá ở Nhật Bản hơi đắt.' },
              { japanese: '彼女はとても親切です。', reading: 'かのじょはとてもしんせつです。', romaji: 'kanojo wa totemo shinsetsu desu.', vietnamese: 'Cô ấy rất tốt bụng.' }
            ], isLearned: false
          },
          {
            id: 'g6', title: 'あまり + Aくない', meaning: 'Không ... lắm', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'あ', iconBg: 'bg-orange-50 dark:bg-orange-900/30', iconColor: 'text-orange-500',
            examples: [
              { japanese: '私はあまり暇じゃありません。', reading: 'わたしはあまりひまじゃありません。', romaji: 'watashi wa amari hima ja arimasen.', vietnamese: 'Tôi không rảnh rỗi lắm.' },
              { japanese: 'この試験はあまり難しくないです。', reading: 'このしけんはあまりむずかしくないです。', romaji: 'kono shiken wa amari muzukashikunai desu.', vietnamese: 'Bài thi này không khó lắm.' },
              { japanese: '今日はあまり寒くないです。', reading: 'きょうはあまりさむくないです。', romaji: 'kyou wa amari samukunai desu.', vietnamese: 'Hôm nay không lạnh lắm.' },
              { japanese: 'その映画はあまり面白くないです。', reading: 'そのえいがはあまりおもしろくないです。', romaji: 'sono eiga wa amari omoshirokunai desu.', vietnamese: 'Bộ phim đó không thú vị lắm.' },
              { japanese: 'ここはあまり静かじゃありません。', reading: 'ここはあまりしずかじゃありません。', romaji: 'koko wa amari shizuka ja arimasen.', vietnamese: 'Chỗ này không yên tĩnh lắm.' }
            ], isLearned: false
          },
          {
            id: 'g7', title: 'N1 に N2 が あります。', meaning: 'Ở N1 có N2', type: 'Phó từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: '📦', iconBg: 'bg-blue-50 dark:bg-blue-900/30', iconColor: 'text-blue-600', barColor: 'bg-emerald-500',
            examples: [
              { japanese: '公園に木があります。', reading: 'こうえんにきがあります。', romaji: 'kouen ni ki ga arimasu.', vietnamese: 'Ở công viên có cây.' },
              { japanese: '部屋に机があります。', reading: 'へやにつくえがあります。', romaji: 'heya ni tsukue ga arimasu.', vietnamese: 'Trong phòng có cái bàn.' },
              { japanese: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', romaji: 'tsukue no ue ni hon ga arimasu.', vietnamese: 'Trên bàn có quyển sách.' },
              { japanese: '箱の中に時計があります。', reading: 'はこのなかにとけいがあります。', romaji: 'hako no naka ni tokei ga arimasu.', vietnamese: 'Trong hộp có cái đồng hồ.' },
              { japanese: 'あそこにコンビニがあります。', reading: 'あそこにコンビニがあります。', romaji: 'asoko ni konbini ga arimasu.', vietnamese: 'Ở đằng kia có cửa hàng tiện lợi.' }
            ], isLearned: false
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
        description: 'Học cách mời rủ, đề nghị cùng làm, và so sánh giữa các đối tượng.',
        grammarPoints: [
          { 
            id: 'g15', 
            title: 'Vませんか', 
            meaning: 'Cùng làm V nhé?', 
            type: 'Rủ rê', 
            jlpt: 'N5', 
            difficulty: 'Cơ bản',
            icon: 'か',
            iconBg: 'bg-pink-50 dark:bg-pink-900/30',
            iconColor: 'text-pink-500',
            barColor: 'bg-pink-400',
            structure: 'V ませんか',
            structureDetails: 'Động từ chia thể phủ định + か',
            explanationTitle: 'Cùng làm V nhé?',
            explanationDetails: 'Lời mời / Rủ rê',
            usage: 'Dùng để mời mọc đối phương làm gì đó một cách lịch sự.',
            note: 'Thường trả lời bằng いいですね (Được đấy).',
            memoryTip: 'Đuôi ませんか (masen ka) mang ý nghĩa rủ rê rất nhẹ nhàng và lịch sự, dịch sát nghĩa là "Không làm V cùng tớ à?". Hãy nhớ công thức: Phủ định (masen) + Câu hỏi (ka).',
            commonWords: 'Thường đi kèm với từ chỉ sự cùng nhau hoặc thời gian: 一緒に (cùng nhau), 明日 (ngày mai), 今晩 (tối nay), ちょっと (một chút)...',
            examples: [
              { japanese: '晩ごはんを一緒に食べに行きませんか。', reading: 'ばんごはんをいっしょにたべにいきませんか。', romaji: 'bangohan o issho ni tabe ni ikimasen ka.', vietnamese: 'Tối nay cùng đi ăn tối không?' },
              { japanese: 'テニスをしませんか。', reading: 'テニスをしませんか。', romaji: 'tenisu o shimasen ka.', vietnamese: 'Cùng chơi tennis không?' },
              { japanese: '明日、映画を見に行きませんか。', reading: 'あした、えいがをみにいきませんか。', romaji: 'ashita, eiga o mi ni ikimasen ka.', vietnamese: 'Ngày mai cùng đi xem phim không?' },
              { japanese: 'ちょっと休みませんか。', reading: 'ちょっとやすみませんか。', romaji: 'chotto yasumimasen ka.', vietnamese: 'Nghỉ ngơi một lát không?' },
              { japanese: 'お茶を飲みませんか。', reading: 'おちゃをのみませんか。', romaji: 'ocha o nomimasen ka.', vietnamese: 'Uống trà nhé?' }
            ],
            isLearned: false 
          },
          { 
            id: 'g14', 
            title: 'Vましょう', 
            meaning: "Cùng làm V nào! (Let's...)", 
            type: 'Rủ rê', 
            jlpt: 'N5', 
            difficulty: 'Cơ bản',
            icon: 'ま',
            iconBg: 'bg-yellow-50 dark:bg-yellow-900/30',
            iconColor: 'text-yellow-500',
            barColor: 'bg-yellow-400',
            structure: 'V ましょう',
            structureDetails: 'Bỏ ます thêm ましょう',
            explanationTitle: "Cùng làm V nào! (Let's...)",
            explanationDetails: 'Lời đề nghị / Cùng làm',
            usage: 'Dùng để kêu gọi hoặc đồng ý với lời mời.',
            note: 'Mạnh mẽ hơn ませんか。',
            memoryTip: 'Đuôi ましょう (mashou) nghe rất vang và dứt khoát, giống như tiếng hô "Nào!" hay "Đi thôi!". Hãy dùng nó khi bạn tràn đầy năng lượng muốn rủ ai đó làm gì.',
            commonWords: 'Hay đi kèm với 一緒に (cùng nhau), さあ (nào, thôi nào)...',
            examples: [
              { japanese: '行きましょう。', reading: 'いきましょう。', romaji: 'ikimashou.', vietnamese: 'Cùng đi nào!' },
              { japanese: 'ちょっと休みましょう。', reading: 'ちょっとやすみましょう。', romaji: 'chotto yasumimashou.', vietnamese: 'Chúng ta cùng nghỉ một lát nhé.' },
              { japanese: '食べましょう。', reading: 'たべましょう。', romaji: 'tabemashou.', vietnamese: 'Cùng ăn nào!' },
              { japanese: '始めましょう。', reading: 'はじめましょう。', romaji: 'hajimemashou.', vietnamese: 'Cùng bắt đầu nào!' },
              { japanese: '明日も会いましょう。', reading: 'あしたもあいましょう。', romaji: 'ashita mo aimashou.', vietnamese: 'Ngày mai lại gặp nhé.' }
            ],
            isLearned: false
          },
          { 
            id: 'g18', 
            title: 'N1 で N2 が いちばん A です', 
            meaning: 'Trong phạm vi N1 thì N2 là [tính chất] A nhất', 
            type: 'So sánh nhất', 
            jlpt: 'N5', 
            difficulty: 'Trung bình',
            icon: '一',
            iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
            iconColor: 'text-emerald-500',
            barColor: 'bg-emerald-400',
            examples: [{ japanese: '果物の中でりんごが一番好きです。', vietnamese: 'Trong các loại trái cây, tôi thích táo nhất.' }] 
          },
          { 
            id: 'g16', 
            title: 'N1 は N2 より A です', 
            meaning: 'N1 thì [tính chất] A hơn N2', 
            type: 'So sánh hơn', 
            jlpt: 'N5', 
            difficulty: 'Trung bình',
            icon: '比',
            iconBg: 'bg-purple-50 dark:bg-purple-900/30',
            iconColor: 'text-purple-500',
            barColor: 'bg-purple-400',
            examples: [{ japanese: '東京は大阪より大きいです。', vietnamese: 'Tokyo lớn hơn Osaka.' }] 
          },
          { 
            id: 'g17', 
            title: 'N1 と N2 と どちらが A ですか', 
            meaning: 'N1 và N2, cái nào [tính chất] A hơn?', 
            type: 'So sánh lựa chọn', 
            jlpt: 'N5', 
            difficulty: 'Trung bình',
            icon: 'ど',
            iconBg: 'bg-pink-50 dark:bg-pink-900/30',
            iconColor: 'text-pink-500',
            barColor: 'bg-pink-400',
            examples: [{ japanese: 'サッカーと野球とどちらが好きですか。', vietnamese: 'Bóng đá và bóng chày, bạn thích cái nào hơn?' }] 
          }
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
