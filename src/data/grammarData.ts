export interface RelatedGrammar {
  name: string;
  meaning: string;
  example: GrammarExample;
}

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
  relatedGrammars?: RelatedGrammar[];
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
            relatedGrammars: [
      {
        name: 'N は Aい N です (N2 là N1 A)',
        meaning: 'Tính từ i bổ nghĩa cho danh từ',
        example: { japanese: 'これは新しい本です。', reading: 'これはあたらしいほんです。', romaji: 'kore wa atarashii hon desu.', vietnamese: 'Đây là cuốn sách mới.' }
      },
      {
        name: 'N は Aかった です (N đã A)',
        meaning: 'Khẳng định trong quá khứ',
        example: { japanese: '昨日は寒かったです。', reading: 'きのうはさむかったです。', romaji: 'kinou wa samukatta desu.', vietnamese: 'Hôm qua trời lạnh.' }
      },
      {
        name: 'N は N です (N1 là N2)',
        meaning: 'Miêu tả bản chất sự vật bằng Danh từ',
        example: { japanese: '彼は学生です。', reading: 'かれはがくせいです。', romaji: 'kare wa gakusei desu.', vietnamese: 'Anh ấy là học sinh.' }
      },
      {
        name: 'N は Aな です (N thì A)',
        meaning: 'Miêu tả tính chất bằng tính từ đuôi na',
        example: { japanese: 'その町は静かです。', reading: 'そのまちはしずかです。', romaji: 'sono machi wa shizuka desu.', vietnamese: 'Thị trấn đó yên tĩnh.' }
      }
    ],
    examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },
              { japanese: 'この料理は辛いです。', reading: 'このりょうりはからいです。', romaji: 'kono ryouri wa karai desu.', vietnamese: 'Món ăn này cay.' },
              { japanese: 'この本はおもしろいです。', reading: 'このほんはおもしろいです。', romaji: 'kono hon wa omoshiroi desu.', vietnamese: 'Quyển sách này thú vị.' },
              { japanese: '日本の冬は寒いです。', reading: 'にほんのふゆはさむいです。', romaji: 'nihon no fuyu wa samui desu.', vietnamese: 'Mùa đông ở Nhật Bản lạnh.' },
              { japanese: '富士山は高いです。', reading: 'ふじさんはたかいです。', romaji: 'fujisan wa takai desu.', vietnamese: 'Núi Phú Sĩ cao.' },
              { japanese: 'この林檎は甘いです。', reading: 'このりんごはあまいです。', romaji: 'kono ringo wa amai desu.', vietnamese: 'Quả táo này ngọt.' }
            ,
              { japanese: 'その車は新しいです。', reading: 'そのくるまはあたらしいです。', romaji: 'sono kuruma wa atarashii desu.', vietnamese: 'Chiếc ô tô đó mới.' },
              { japanese: 'このカメラは古いです。', reading: 'このカメラはふるいです。', romaji: 'kono kamera wa furui desu.', vietnamese: 'Chiếc máy ảnh này cũ.' },
              { japanese: 'このパソコンは高いです。', reading: 'このパソコンはたかいです。', romaji: 'kono pasokon wa takai desu.', vietnamese: 'Cái máy tính này đắt.' },
              { japanese: '東京は大きいです。', reading: 'とうきょうはおおきいです。', romaji: 'toukyou wa ookii desu.', vietnamese: 'Tokyo thì lớn.' },
              { japanese: '私の部屋は小さいです。', reading: 'わたしのへやはちいさいです。', romaji: 'watashi no heya wa chiisai desu.', vietnamese: 'Phòng của tôi nhỏ.' },
              { japanese: 'この時計は安いです。', reading: 'このとけいはやすいです。', romaji: 'kono tokei wa yasui desu.', vietnamese: 'Cái đồng hồ này rẻ.' },
              { japanese: '今日の天気はいいです。', reading: 'きょうのてんきはいいです。', romaji: 'kyou no tenki wa ii desu.', vietnamese: 'Thời tiết hôm nay tốt.' },
              { japanese: 'あの山は高いです。', reading: 'あのやまはたかいです。', romaji: 'ano yama wa takai desu.', vietnamese: 'Ngọn núi kia cao.' },
              { japanese: '日本の夏は暑いです。', reading: 'にほんのなつはあついです。', romaji: 'nihon no natsu wa atsui desu.', vietnamese: 'Mùa hè ở Nhật Bản nóng.' },
              { japanese: '今日は涼しいです。', reading: 'きょうはすずしいです。', romaji: 'kyou wa suzushii desu.', vietnamese: 'Hôm nay mát mẻ.' },
              { japanese: 'このコーヒーは熱いです。', reading: 'このコーヒーはあついです。', romaji: 'kono koohii wa atsui desu.', vietnamese: 'Cà phê này nóng.' },
              { japanese: 'このお茶は冷たいです。', reading: 'このおちゃはつめたいです。', romaji: 'kono ocha wa tsumetai desu.', vietnamese: 'Trà này lạnh.' },
              { japanese: 'このメロンは甘いです。', reading: 'このメロンはあまいです。', romaji: 'kono meron wa amai desu.', vietnamese: 'Quả dưa lưới này ngọt.' },
              { japanese: 'この薬は苦いです。', reading: 'このくすりはにがいです。', romaji: 'kono kusuri wa nigai desu.', vietnamese: 'Thuốc này đắng.' },
              { japanese: 'あの店は美味しいです。', reading: 'あのみせはおいしいです。', romaji: 'ano mise wa oishii desu.', vietnamese: 'Cửa hàng kia ngon.' }
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
            relatedGrammars: [
      {
        name: 'N は Aくありません (N không A)',
        meaning: 'Cách nói lịch sự, trang trọng hơn',
        example: { japanese: 'このお茶は熱くありません。', reading: 'このおちゃはあつくありません。', romaji: 'kono ocha wa atsuku arimasen.', vietnamese: 'Trà này không nóng.' }
      },
      {
        name: 'N は Aくなかった です (N đã không A)',
        meaning: 'Phủ định trong quá khứ',
        example: { japanese: '昨日は寒くなかったです。', reading: 'きのうはさむくなかったです。', romaji: 'kinou wa samukunakatta desu.', vietnamese: 'Hôm qua trời không lạnh.' }
      },
      {
        name: 'N は N じゃありません (N1 không phải là N2)',
        meaning: 'Phủ định bản chất sự vật (Danh từ)',
        example: { japanese: '私は医者じゃありません。', reading: 'わたしはいしゃじゃありません。', romaji: 'watashi wa isha ja arimasen.', vietnamese: 'Tôi không phải là bác sĩ.' }
      },
      {
        name: 'N は Aな じゃありません (N không A)',
        meaning: 'Phủ định tính chất (Tính từ đuôi na)',
        example: { japanese: 'その町は静かじゃありません。', reading: 'そのまちはしずかじゃありません。', romaji: 'sono machi wa shizuka ja arimasen.', vietnamese: 'Thị trấn đó không yên tĩnh.' }
      }
    ],
    examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },
              { japanese: 'このレモンは酸っぱくないです。', reading: 'このレモンはすっぱくないです。', romaji: 'kono remon wa suppakunai desu.', vietnamese: 'Quả chanh này không chua.' },
              { japanese: 'このお茶は熱くないです。', reading: 'このおちゃはあつくないです。', romaji: 'kono ocha wa atsukunai desu.', vietnamese: 'Trà này không nóng.' },
              { japanese: '今日は忙しくないです。', reading: 'きょうはいそがしくないです。', romaji: 'kyou wa isogashikunai desu.', vietnamese: 'Hôm nay tôi không bận.' },
              { japanese: 'この試験は難しくないです。', reading: 'このしけんはむずかしくないです。', romaji: 'kono shiken wa muzukashikunai desu.', vietnamese: 'Kỳ thi này không khó.' },
              { japanese: '天気はよくないです。', reading: 'てんきはよくないです。', romaji: 'tenki wa yokunai desu.', vietnamese: 'Thời tiết không tốt.' }
            ,
              { japanese: 'この車は新しくないです。', reading: 'このくるまはあたらしくないです。', romaji: 'kono kuruma wa atarashikunai desu.', vietnamese: 'Chiếc ô tô này không mới.' },
              { japanese: 'あのビルは古くないです。', reading: 'あのビルはふるくないです。', romaji: 'ano biru wa furukunai desu.', vietnamese: 'Tòa nhà kia không cũ.' },
              { japanese: 'この本は高くないです。', reading: 'このほんはたかくないです。', romaji: 'kono hon wa takakunai desu.', vietnamese: 'Cuốn sách này không đắt.' },
              { japanese: '私の町は大きくないです。', reading: 'わたしのまちはおおきくないです。', romaji: 'watashi no machi wa ookikunai desu.', vietnamese: 'Thị trấn của tôi không lớn.' },
              { japanese: 'このかばんは小さくないです。', reading: 'このかばんはちいさくないです。', romaji: 'kono kaban wa chiisakunai desu.', vietnamese: 'Cái túi này không nhỏ.' },
              { japanese: 'このパソコンは安くないです。', reading: 'このパソコンはやすくないです。', romaji: 'kono pasokon wa yasukunai desu.', vietnamese: 'Cái máy tính này không rẻ.' },
              { japanese: '明日の天気はよくないです。', reading: 'あしたのてんきはよくないです。', romaji: 'ashita no tenki wa yokunai desu.', vietnamese: 'Thời tiết ngày mai không tốt.' },
              { japanese: 'あの山は高くないです。', reading: 'あのやまはたかくないです。', romaji: 'ano yama wa takakunai desu.', vietnamese: 'Ngọn núi kia không cao.' },
              { japanese: '今日は暑くないです。', reading: 'きょうはあつくないです。', romaji: 'kyou wa atsukunai desu.', vietnamese: 'Hôm nay không nóng.' },
              { japanese: 'この部屋は涼しくないです。', reading: 'このへやはすずしくないです。', romaji: 'kono heya wa suzushikunai desu.', vietnamese: 'Phòng này không mát mẻ.' },
              { japanese: 'そのお茶は熱くないです。', reading: 'そのおちゃはあつくないです。', romaji: 'sono ocha wa atsukunai desu.', vietnamese: 'Trà đó không nóng.' },
              { japanese: 'この水は冷たくないです。', reading: 'このみずはつめたくないです。', romaji: 'kono mizu wa tsumetakunai desu.', vietnamese: 'Nước này không lạnh.' },
              { japanese: 'このレモンは甘くないです。', reading: 'このレモンはあまくないです。', romaji: 'kono remon wa amakunai desu.', vietnamese: 'Quả chanh này không ngọt.' },
              { japanese: 'そのコーヒーは苦くないです。', reading: 'そのコーヒーはにがくないです。', romaji: 'sono koohii wa nigakunai desu.', vietnamese: 'Cà phê đó không đắng.' },
              { japanese: 'あのラーメンは美味しくないです。', reading: 'あのラーメンはおいしくないです。', romaji: 'ano raamen wa oishikunai desu.', vietnamese: 'Món mì ramen kia không ngon.' }
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
            relatedGrammars: [
      {
        name: 'N は Aな N です (N2 là N1 A)',
        meaning: 'Tính từ na bổ nghĩa danh từ',
        example: { japanese: '彼女はきれいな人です。', reading: 'かのじょはきれいなひとです。', romaji: 'kanojo wa kireina hito desu.', vietnamese: 'Cô ấy là người đẹp.' }
      },
      {
        name: 'N は Aでした (N đã A)',
        meaning: 'Khẳng định trong quá khứ',
        example: { japanese: '昔はこの町は静かでした。', reading: 'むかしはこのまちはしずかでした。', romaji: 'mukashi wa kono machi wa shizuka deshita.', vietnamese: 'Ngày xưa thị trấn này yên tĩnh.' }
      },
      {
        name: 'N は Aい です (N thì A)',
        meaning: 'Miêu tả tính chất bằng tính từ đuôi i',
        example: { japanese: 'この本は新しいです。', reading: 'このほんはあたらしいです。', romaji: 'kono hon wa atarashii desu.', vietnamese: 'Cuốn sách này mới.' }
      }
    ],
    examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },
              { japanese: '佐藤先生は有名です。', reading: 'さとうせんせいはゆうめいです。', romaji: 'satou sensei wa yuumei desu.', vietnamese: 'Thầy Sato nổi tiếng.' },
              { japanese: 'この公園は静かです。', reading: 'このこうえんはしずかです。', romaji: 'kono kouen wa shizuka desu.', vietnamese: 'Công viên này yên tĩnh.' },
              { japanese: 'この部屋はきれいです。', reading: 'このへやはきれいです。', romaji: 'kono heya wa kirei desu.', vietnamese: 'Căn phòng này sạch đẹp.' },
              { japanese: 'ハノイは賑やかです。', reading: 'ハノイはにぎやかです。', romaji: 'hanoi wa nigiyaka desu.', vietnamese: 'Hà Nội thì nhộn nhịp.' },
              { japanese: '彼は親切です。', reading: 'かれはしんせつです。', romaji: 'kare wa shinsetsu desu.', vietnamese: 'Anh ấy rất tốt bụng.' }
            ,
              { japanese: 'この町はきれいです。', reading: 'このまちはきれいです。', romaji: 'kono machi wa kirei desu.', vietnamese: 'Thị trấn này sạch đẹp.' },
              { japanese: '私の部屋は静かです。', reading: 'わたしのへやはしずかです。', romaji: 'watashi no heya wa shizuka desu.', vietnamese: 'Phòng của tôi yên tĩnh.' },
              { japanese: 'ハノイはにぎやかです。', reading: 'ハノイはにぎやかです。', romaji: 'hanoi wa nigiyaka desu.', vietnamese: 'Hà Nội thì náo nhiệt.' },
              { japanese: '富士山は有名です。', reading: 'ふじさんはゆうめいです。', romaji: 'fujisan wa yuumei desu.', vietnamese: 'Núi Phú Sĩ thì nổi tiếng.' },
              { japanese: 'あの教会はきれいです。', reading: 'あのきょうかいはきれいです。', romaji: 'ano kyoukai wa kirei desu.', vietnamese: 'Nhà thờ kia đẹp.' },
              { japanese: 'この図書館は静かです。', reading: 'このとしょかんはしずかです。', romaji: 'kono toshokan wa shizuka desu.', vietnamese: 'Thư viện này yên tĩnh.' },
              { japanese: '東京はにぎやかです。', reading: 'とうきょうはにぎやかです。', romaji: 'toukyou wa nigiyaka desu.', vietnamese: 'Tokyo thì náo nhiệt.' },
              { japanese: 'あの温泉は有名です。', reading: 'あのおんせんはゆうめいです。', romaji: 'ano onsen wa yuumei desu.', vietnamese: 'Suối nước nóng kia nổi tiếng.' },
              { japanese: 'このお寺はきれいです。', reading: 'このおてらはきれいです。', romaji: 'kono otera wa kirei desu.', vietnamese: 'Ngôi chùa này đẹp.' },
              { japanese: '私の村は静かです。', reading: 'わたしのむらはしずかです。', romaji: 'watashi no mura wa shizuka desu.', vietnamese: 'Ngôi làng của tôi yên tĩnh.' },
              { japanese: '大阪はにぎやかです。', reading: 'おおさかはにぎやかです。', romaji: 'oosaka wa nigiyaka desu.', vietnamese: 'Osaka thì náo nhiệt.' },
              { japanese: 'そのお城は有名です。', reading: 'そのおしろはゆうめいです。', romaji: 'sono oshiro wa yuumei desu.', vietnamese: 'Lâu đài đó nổi tiếng.' },
              { japanese: 'この川はきれいです。', reading: 'このかわはきれいです。', romaji: 'kono kawa wa kirei desu.', vietnamese: 'Con sông này sạch.' },
              { japanese: 'あの神社は静かです。', reading: 'あのじんじゃはしずかです。', romaji: 'ano jinja wa shizuka desu.', vietnamese: 'Ngôi đền kia yên tĩnh.' },
              { japanese: 'この店は有名です。', reading: 'このみせはゆうめいです。', romaji: 'kono mise wa yuumei desu.', vietnamese: 'Cửa hàng này nổi tiếng.' }
            ], isLearned: false
          },
          {
            id: 'g4', title: 'N は Aじゃありません。', meaning: 'N không [tính chất] A', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'じゃ', iconBg: 'bg-purple-50 dark:bg-purple-900/30', iconColor: 'text-purple-500',
            barColor: 'bg-purple-500',
            structure: 'N は A じゃありません',
            structureDetails: 'Danh từ + は + Tính từ đuôi な (bỏ な) + じゃありません',
            explanationTitle: 'N không [tính chất] A',
            explanationDetails: 'Tính từ đuôi な (Phủ định)',
            usage: 'Phủ định tính chất của sự vật bằng tính từ đuôi na.',
            note: 'Dùng trong hội thoại thông thường. Trang trọng hơn dùng では ありません.',
            memoryTip: 'Tính từ đuôi な cũng giống Danh từ, khi phủ định cứ thêm "じゃありません" vào sau là xong.',
            commonWords: 'Tương tự khẳng định: 好き, きれい, 有名, 静か, 暇...',
            relatedGrammars: [
      {
        name: 'N は Aではありません (N không A)',
        meaning: 'Văn viết, trang trọng hơn',
        example: { japanese: '彼は有名ではありません。', reading: 'かれはゆうめいではありません。', romaji: 'kare wa yuumei dewa arimasen.', vietnamese: 'Anh ấy không nổi tiếng.' }
      },
      {
        name: 'N は Aじゃありませんでした (N đã không A)',
        meaning: 'Phủ định trong quá khứ',
        example: { japanese: '昔はこの町は静かじゃありませんでした。', reading: 'むかしはこのまちはしずかじゃありませんでした。', romaji: 'mukashi wa kono machi wa shizuka ja arimasen deshita.', vietnamese: 'Ngày xưa thị trấn này không yên tĩnh.' }
      },
      {
        name: 'N は Aくない です (N không A)',
        meaning: 'Phủ định tính chất (Tính từ đuôi i)',
        example: { japanese: 'この本は新しくないです。', reading: 'このほんはあたらしくないです。', romaji: 'kono hon wa atarashikunai desu.', vietnamese: 'Cuốn sách này không mới.' }
      }
    ],
    examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },
              { japanese: '私の部屋はきれいじゃありません。', reading: 'わたしのへやはきれいじゃありません。', romaji: 'watashi no heya wa kirei ja arimasen.', vietnamese: 'Phòng của tôi không sạch đẹp.' },
              { japanese: 'この町は静かじゃありません。', reading: 'このまちはしずかじゃありません。', romaji: 'kono machi wa shizuka ja arimasen.', vietnamese: 'Thành phố này không yên tĩnh.' },
              { japanese: '私は暇じゃありません。', reading: 'わたしはひまじゃありません。', romaji: 'watashi wa hima ja arimasen.', vietnamese: 'Tôi không rảnh rỗi.' },
              { japanese: 'あのレストランは有名じゃありません。', reading: 'あのレストランはゆうめいじゃありません。', romaji: 'ano resutoran wa yuumei ja arimasen.', vietnamese: 'Nhà hàng đó không nổi tiếng.' },
              { japanese: '今日の仕事は大変じゃありません。', reading: 'きょうのしごとはたいへんじゃありません。', romaji: 'kyou no shigoto wa taihen ja arimasen.', vietnamese: 'Công việc hôm nay không vất vả.' }
            ,
              { japanese: 'この町はきれいじゃありません。', reading: 'このまちはきれいじゃありません。', romaji: 'kono machi wa kirei ja arimasen.', vietnamese: 'Thị trấn này không sạch đẹp.' },
              { japanese: '私の部屋は静かじゃありません。', reading: 'わたしのへやはしずかじゃありません。', romaji: 'watashi no heya wa shizuka ja arimasen.', vietnamese: 'Phòng của tôi không yên tĩnh.' },
              { japanese: 'ここはにぎやかじゃありません。', reading: 'ここはにぎやかじゃありません。', romaji: 'koko wa nigiyaka ja arimasen.', vietnamese: 'Nơi này không náo nhiệt.' },
              { japanese: 'あの山は有名じゃありません。', reading: 'あのやまはゆうめいじゃありません。', romaji: 'ano yama wa yuumei ja arimasen.', vietnamese: 'Ngọn núi kia không nổi tiếng.' },
              { japanese: 'このビルはきれいじゃありません。', reading: 'このビルはきれいじゃありません。', romaji: 'kono biru wa kirei ja arimasen.', vietnamese: 'Tòa nhà này không đẹp.' },
              { japanese: 'あの公園は静かじゃありません。', reading: 'あのこうえんはしずかじゃありません。', romaji: 'ano kouen wa shizuka ja arimasen.', vietnamese: 'Công viên kia không yên tĩnh.' },
              { japanese: 'この町はにぎやかじゃありません。', reading: 'このまちはにぎやかじゃありません。', romaji: 'kono machi wa nigiyaka ja arimasen.', vietnamese: 'Thị trấn này không náo nhiệt.' },
              { japanese: 'あの教会は有名じゃありません。', reading: 'あのきょうかいはゆうめいじゃありません。', romaji: 'ano kyoukai wa yuumei ja arimasen.', vietnamese: 'Nhà thờ kia không nổi tiếng.' },
              { japanese: 'そのお寺はきれいじゃありません。', reading: 'そのおてらはきれいじゃありません。', romaji: 'sono otera wa kirei ja arimasen.', vietnamese: 'Ngôi chùa đó không đẹp.' },
              { japanese: 'この図書館は静かじゃありません。', reading: 'このとしょかんはしずかじゃありません。', romaji: 'kono toshokan wa shizuka ja arimasen.', vietnamese: 'Thư viện này không yên tĩnh.' },
              { japanese: 'あの温泉はにぎやかじゃありません。', reading: 'あのおんせんはにぎやかじゃありません。', romaji: 'ano onsen wa nigiyaka ja arimasen.', vietnamese: 'Suối nước nóng kia không náo nhiệt.' },
              { japanese: 'このお城は有名じゃありません。', reading: 'このおしろはゆうめいじゃありません。', romaji: 'kono oshiro wa yuumei ja arimasen.', vietnamese: 'Lâu đài này không nổi tiếng.' },
              { japanese: 'あの川はきれいじゃありません。', reading: 'あのかわはきれいじゃありません。', romaji: 'ano kawa wa kirei ja arimasen.', vietnamese: 'Con sông kia không sạch.' },
              { japanese: 'この神社は静かじゃありません。', reading: 'このじんじゃはしずかじゃありません。', romaji: 'kono jinja wa shizuka ja arimasen.', vietnamese: 'Ngôi đền này không yên tĩnh.' },
              { japanese: 'あの店は有名じゃありません。', reading: 'あのみせはゆうめいじゃありません。', romaji: 'ano mise wa yuumei ja arimasen.', vietnamese: 'Cửa hàng kia không nổi tiếng.' }
            ], isLearned: false
          },
          {
            id: 'g5', title: 'とても / すこし + A', meaning: 'Rất / Một chút', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'と', iconBg: 'bg-pink-50 dark:bg-pink-900/30', iconColor: 'text-pink-500',
            barColor: 'bg-pink-500',
            structure: 'とても / すこし + A',
            structureDetails: 'Trạng từ + Tính từ',
            explanationTitle: 'Rất / Một chút',
            explanationDetails: 'Trạng từ chỉ mức độ',
            usage: 'Nhấn mạnh mức độ của tính từ. Dùng với câu khẳng định.',
            note: 'とても (rất) chỉ mức độ cao, すこし (một chút) chỉ mức độ thấp.',
            memoryTip: 'Hai từ này luôn đứng trước tính từ và luôn đi với câu mang nghĩa Khẳng định (です).',
            commonWords: 'Thường đi với các tính từ chỉ cảm xúc, cảm giác, tính chất.',
            relatedGrammars: [
      {
        name: 'ぜんぜん + A (phủ định)',
        meaning: 'Mức độ phủ định tuyệt đối (Hoàn toàn không)',
        example: { japanese: 'この映画はぜんぜん面白くないです。', reading: 'このえいがはぜんぜんおもしろくないです。', romaji: 'kono eiga wa zenzen omoshirokunai desu.', vietnamese: 'Bộ phim này hoàn toàn không thú vị.' }
      },
      {
        name: 'あまり + Aくない / じゃありません',
        meaning: 'Phủ định một phần mức độ (Không ... lắm)',
        example: { japanese: 'この本はあまり高くないです。', reading: 'このほんはあまりたかくないです。', romaji: 'kono hon wa amari takakunai desu.', vietnamese: 'Cuốn sách này không đắt lắm.' }
      }
    ],
    examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },
              { japanese: 'この町はとても静かです。', reading: 'このまちはとてもしずかです。', romaji: 'kono machi wa totemo shizuka desu.', vietnamese: 'Thị trấn này rất yên tĩnh.' },
              { japanese: '今日は少し暑いです。', reading: 'きょうはすこしあついです。', romaji: 'kyou wa sukoshi atsui desu.', vietnamese: 'Hôm nay hơi nóng.' },
              { japanese: 'このケーキはとても美味しいです。', reading: 'このケーキはとてもおいしいです。', romaji: 'kono keeki wa totemo oishii desu.', vietnamese: 'Cái bánh này rất ngon.' },
              { japanese: '日本の物価は少し高いです。', reading: 'にほんのぶっかはすこしたかいです。', romaji: 'nihon no bukka wa sukoshi takai desu.', vietnamese: 'Vật giá ở Nhật Bản hơi đắt.' },
              { japanese: '彼女はとても親切です。', reading: 'かのじょはとてもしんせつです。', romaji: 'kanojo wa totemo shinsetsu desu.', vietnamese: 'Cô ấy rất tốt bụng.' }
            ,
              { japanese: 'この車はとても高いです。', reading: 'このくるまはとてもたかいです。', romaji: 'kono kuruma wa totemo takai desu.', vietnamese: 'Chiếc ô tô này rất đắt.' },
              { japanese: 'あの山は少し高いです。', reading: 'あのやまはすこしたかいです。', romaji: 'ano yama wa sukoshi takai desu.', vietnamese: 'Ngọn núi kia hơi cao.' },
              { japanese: 'この町はとてもにぎやかです。', reading: 'このまちはとてもにぎやかです。', romaji: 'kono machi wa totemo nigiyaka desu.', vietnamese: 'Thị trấn này rất náo nhiệt.' },
              { japanese: '今日の天気は少し悪いです。', reading: 'きょうのてんきはすこしわるいです。', romaji: 'kyou no tenki wa sukoshi warui desu.', vietnamese: 'Thời tiết hôm nay hơi xấu.' },
              { japanese: 'このメロンはとても甘いです。', reading: 'このメロンはとてもあまいです。', romaji: 'kono meron wa totemo amai desu.', vietnamese: 'Quả dưa lưới này rất ngọt.' },
              { japanese: 'そのお茶は少し苦いです。', reading: 'そのおちゃはすこしにがいです。', romaji: 'sono ocha wa sukoshi nigai desu.', vietnamese: 'Trà đó hơi đắng.' },
              { japanese: 'この温泉はとても有名です。', reading: 'このおんせんはとてもゆうめいです。', romaji: 'kono onsen wa totemo yuumei desu.', vietnamese: 'Suối nước nóng này rất nổi tiếng.' },
              { japanese: 'あの川は少しきれいです。', reading: 'あのかわはすこしきれいです。', romaji: 'ano kawa wa sukoshi kirei desu.', vietnamese: 'Con sông kia hơi sạch.' },
              { japanese: '日本の冬はとても寒いです。', reading: 'にほんのふゆはとてもさむいです。', romaji: 'nihon no fuyu wa totemo samui desu.', vietnamese: 'Mùa đông ở Nhật Bản rất lạnh.' },
              { japanese: '今日は少し涼しいです。', reading: 'きょうはすこしすずしいです。', romaji: 'kyou wa sukoshi suzushii desu.', vietnamese: 'Hôm nay hơi mát mẻ.' },
              { japanese: 'あの教会はとても古いです。', reading: 'あのきょうかいはとてもふるいです。', romaji: 'ano kyoukai wa totemo furui desu.', vietnamese: 'Nhà thờ kia rất cũ.' },
              { japanese: 'この荷物は少し重いです。', reading: 'このにもつはすこしおもいです。', romaji: 'kono nimotsu wa sukoshi omoi desu.', vietnamese: 'Hành lý này hơi nặng.' },
              { japanese: 'そのラーメンはとても美味しいです。', reading: 'そのラーメンはとてもおいしいです。', romaji: 'sono raamen wa totemo oishii desu.', vietnamese: 'Món mì ramen đó rất ngon.' },
              { japanese: 'この部屋は少し静かです。', reading: 'このへやはすこししずかです。', romaji: 'kono heya wa sukoshi shizuka desu.', vietnamese: 'Phòng này hơi yên tĩnh.' },
              { japanese: 'あのビルはとても高いです。', reading: 'あのビルはとてもたかいです。', romaji: 'ano biru wa totemo takai desu.', vietnamese: 'Tòa nhà kia rất cao.' }
            ], isLearned: false
          },
          {
            id: 'g6', title: 'あまり + Aくない', meaning: 'Không ... lắm', type: 'Tính từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'あ', iconBg: 'bg-orange-50 dark:bg-orange-900/30', iconColor: 'text-orange-500',
            barColor: 'bg-orange-500',
            structure: 'あまり + A (phủ định)',
            structureDetails: 'あまり + Tính từ chia ở dạng phủ định (くない / じゃありません)',
            explanationTitle: 'Không ... lắm',
            explanationDetails: 'Trạng từ chỉ mức độ phủ định',
            usage: 'Phủ định một phần mức độ của tính chất.',
            note: 'Luôn luôn đi kèm với thể phủ định ở cuối câu.',
            memoryTip: 'Cứ thấy あまり (amari) thì nhắm mắt cũng biết đuôi câu phải là phủ định (nai / masen).',
            commonWords: 'Thường gặp trong câu đánh giá: không ngon lắm, không đắt lắm, không khó lắm...',
            relatedGrammars: [
      {
        name: 'ぜんぜん + A (phủ định)',
        meaning: 'Mức độ phủ định tuyệt đối',
        example: { japanese: 'このテストはぜんぜん難しくないです。', reading: 'このテストはぜんぜんむずかしくないです。', romaji: 'kono tesuto wa zenzen muzukashikunai desu.', vietnamese: 'Bài kiểm tra này hoàn toàn không khó.' }
      },
      {
        name: 'とても + Aい / Aな',
        meaning: 'Khẳng định mức độ cao (Rất ...)',
        example: { japanese: 'このケーキはとても美味しいです。', reading: 'このケーキはとてもおいしいです。', romaji: 'kono keeki wa totemo oishii desu.', vietnamese: 'Cái bánh này rất ngon.' }
      },
      {
        name: '少し + Aい / Aな',
        meaning: 'Khẳng định mức độ thấp (Một chút / Hơi ...)',
        example: { japanese: '今日は少し暑いです。', reading: 'きょうはすこしあついです。', romaji: 'kyou wa sukoshi atsui desu.', vietnamese: 'Hôm nay hơi nóng.' }
      }
    ],
    examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },
              { japanese: '私はあまり暇じゃありません。', reading: 'わたしはあまりひまじゃありません。', romaji: 'watashi wa amari hima ja arimasen.', vietnamese: 'Tôi không rảnh rỗi lắm.' },
              { japanese: 'この試験はあまり難しくないです。', reading: 'このしけんはあまりむずかしくないです。', romaji: 'kono shiken wa amari muzukashikunai desu.', vietnamese: 'Bài thi này không khó lắm.' },
              { japanese: '今日はあまり寒くないです。', reading: 'きょうはあまりさむくないです。', romaji: 'kyou wa amari samukunai desu.', vietnamese: 'Hôm nay không lạnh lắm.' },
              { japanese: 'その映画はあまり面白くないです。', reading: 'そのえいがはあまりおもしろくないです。', romaji: 'sono eiga wa amari omoshirokunai desu.', vietnamese: 'Bộ phim đó không thú vị lắm.' },
              { japanese: 'ここはあまり静かじゃありません。', reading: 'ここはあまりしずかじゃありません。', romaji: 'koko wa amari shizuka ja arimasen.', vietnamese: 'Chỗ này không yên tĩnh lắm.' }
            ,
              { japanese: 'この車はあまり高くないです。', reading: 'このくるまはあまりたかくないです。', romaji: 'kono kuruma wa amari takakunai desu.', vietnamese: 'Chiếc ô tô này không đắt lắm.' },
              { japanese: 'あの山はあまり高くないです。', reading: 'あのやまはあまりたかくないです。', romaji: 'ano yama wa amari takakunai desu.', vietnamese: 'Ngọn núi kia không cao lắm.' },
              { japanese: 'この町はあまりにぎやかじゃありません。', reading: 'このまちはあまりにぎやかじゃありません。', romaji: 'kono machi wa amari nigiyaka ja arimasen.', vietnamese: 'Thị trấn này không náo nhiệt lắm.' },
              { japanese: '今日の天気はあまりよくないです。', reading: 'きょうのてんきはあまりよくないです。', romaji: 'kyou no tenki wa amari yokunai desu.', vietnamese: 'Thời tiết hôm nay không tốt lắm.' },
              { japanese: 'このメロンはあまり甘くないです。', reading: 'このメロンはあまりあまくないです。', romaji: 'kono meron wa amari amakunai desu.', vietnamese: 'Quả dưa lưới này không ngọt lắm.' },
              { japanese: 'そのお茶はあまり苦くないです。', reading: 'そのおちゃはあまりにがくないです。', romaji: 'sono ocha wa amari nigakunai desu.', vietnamese: 'Trà đó không đắng lắm.' },
              { japanese: 'この温泉はあまり有名じゃありません。', reading: 'このおんせんはあまりゆうめいじゃありません。', romaji: 'kono onsen wa amari yuumei ja arimasen.', vietnamese: 'Suối nước nóng này không nổi tiếng lắm.' },
              { japanese: 'あの川はあまりきれいじゃありません。', reading: 'あのかわはあまりきれいじゃありません。', romaji: 'ano kawa wa amari kirei ja arimasen.', vietnamese: 'Con sông kia không sạch lắm.' },
              { japanese: '今年の冬はあまり寒くないです。', reading: 'ことしのふゆはあまりさむくないです。', romaji: 'kotoshi no fuyu wa amari samukunai desu.', vietnamese: 'Mùa đông năm nay không lạnh lắm.' },
              { japanese: '今日はあまり涼しくないです。', reading: 'きょうはあまりすずしくないです。', romaji: 'kyou wa amari suzushikunai desu.', vietnamese: 'Hôm nay không mát mẻ lắm.' },
              { japanese: 'あの教会はあまり古くないです。', reading: 'あのきょうかいはあまりふるくないです。', romaji: 'ano kyoukai wa amari furukunai desu.', vietnamese: 'Nhà thờ kia không cũ lắm.' },
              { japanese: 'このパソコンはあまり大きくないです。', reading: 'このパソコンはあまりおおきくないです。', romaji: 'kono pasokon wa amari ookikunai desu.', vietnamese: 'Cái máy tính này không lớn lắm.' },
              { japanese: 'そのラーメンはあまり美味しくないです。', reading: 'そのラーメンはあまりおいしくないです。', romaji: 'sono raamen wa amari oishikunai desu.', vietnamese: 'Món mì ramen đó không ngon lắm.' },
              { japanese: 'この部屋はあまり静かじゃありません。', reading: 'このへやはあまりしずかじゃありません。', romaji: 'kono heya wa amari shizuka ja arimasen.', vietnamese: 'Phòng này không yên tĩnh lắm.' },
              { japanese: 'あのビルはあまり高くないです。', reading: 'あのビルはあまりたかくないです。', romaji: 'ano biru wa amari takakunai desu.', vietnamese: 'Tòa nhà kia không cao lắm.' }
            ], isLearned: false
          },
          {
            id: 'g7', title: 'N1 に N2 が あります。', meaning: 'Ở N1 có N2', type: 'Phó từ', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'あ', iconBg: 'bg-blue-50 dark:bg-blue-900/30', iconColor: 'text-blue-600', barColor: 'bg-blue-500',
            structure: 'N1 に N2 が あります/います',
            structureDetails: 'Địa điểm + に + Danh từ + が + あります/います',
            explanationTitle: 'Ở N1 có N2',
            explanationDetails: 'Sự tồn tại / Hiện diện',
            usage: 'Diễn tả sự tồn tại của sự vật (があります) hoặc con người/động vật (がいます) ở một địa điểm cụ thể.',
            note: 'があります dùng cho vật vô tri vô giác, thực vật. がいます dùng cho sinh vật (người, động vật).',
            memoryTip: 'Nhớ cặp bài trùng: "Địa điểm" đi với trợ từ "に", "Chủ thể" đi với trợ từ "が".',
            commonWords: 'Từ chỉ vị trí: 上 (trên), 下 (dưới), 前 (trước), 後ろ (sau), 中 (trong), 外 (ngoài)...',
            relatedGrammars: [
      {
        name: 'N1 に なに が ありますか (Ở N1 có gì?)',
        meaning: 'Cấu trúc đặt câu hỏi',
        example: { japanese: '箱の中に何がありますか。', reading: 'はこのなかに何がありますか。', romaji: 'hako no naka ni nani ga arimasu ka.', vietnamese: 'Trong hộp có cái gì vậy?' }
      },
      {
        name: 'N1 に N2 や N3 が あります (Ở N1 có N2 và N3)',
        meaning: 'Liệt kê một phần',
        example: { japanese: '机の上に本やペンがあります。', reading: 'つくえのうえにほんやペンがあります。', romaji: 'tsukue no ue ni hon ya pen ga arimasu.', vietnamese: 'Trên bàn có sách và bút (và v.v).' }
      },
      {
        name: 'N1 に N2 が います (Ở N1 có N2)',
        meaning: 'Sự tồn tại của người hoặc động vật',
        example: { japanese: '公園に犬がいます。', reading: 'こうえんにいぬがいます。', romaji: 'kouen ni inu ga imasu.', vietnamese: 'Ở công viên có con chó.' }
      },
      {
        name: 'N2 は N1 に あります (N2 thì ở N1)',
        meaning: 'Nhấn mạnh vị trí của một vật thể đã xác định',
        example: { japanese: 'トイレはあそこにあります。', reading: 'トイレはあそこにあります。', romaji: 'toire wa asoko ni arimasu.', vietnamese: 'Nhà vệ sinh ở đằng kia.' }
      }
    ],
    examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },
              { japanese: '公園に木があります。', reading: 'こうえんにきがあります。', romaji: 'kouen ni ki ga arimasu.', vietnamese: 'Ở công viên có cây.' },
              { japanese: '部屋に机があります。', reading: 'へやにつくえがあります。', romaji: 'heya ni tsukue ga arimasu.', vietnamese: 'Trong phòng có cái bàn.' },
              { japanese: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', romaji: 'tsukue no ue ni hon ga arimasu.', vietnamese: 'Trên bàn có quyển sách.' },
              { japanese: '箱の中に時計があります。', reading: 'はこのなかにとけいがあります。', romaji: 'hako no naka ni tokei ga arimasu.', vietnamese: 'Trong hộp có cái đồng hồ.' },
              { japanese: 'あそこにコンビニがあります。', reading: 'あそこにコンビニがあります。', romaji: 'asoko ni konbini ga arimasu.', vietnamese: 'Ở đằng kia có cửa hàng tiện lợi.' }
            ,
              { japanese: '町に温泉があります。', reading: 'まちにおんせんがあります。', romaji: 'machi ni onsen ga arimasu.', vietnamese: 'Ở thị trấn có suối nước nóng.' },
              { japanese: '山に神社があります。', reading: 'やまにじんじゃがあります。', romaji: 'yama ni jinja ga arimasu.', vietnamese: 'Trên núi có đền thờ.' },
              { japanese: 'ここに川があります。', reading: 'ここにかわがあります。', romaji: 'koko ni kawa ga arimasu.', vietnamese: 'Ở đây có dòng sông.' },
              { japanese: 'あそこに教会があります。', reading: 'あそこにきょうかいがあります。', romaji: 'asoko ni kyoukai ga arimasu.', vietnamese: 'Ở đằng kia có nhà thờ.' },
              { japanese: '町の真ん中にビルがあります。', reading: 'まちのまんなかにビルがあります。', romaji: 'machi no mannaka ni biru ga arimasu.', vietnamese: 'Ở giữa thành phố có tòa nhà.' },
              { japanese: '北にお城があります。', reading: 'きたにおしろがあります。', romaji: 'kita ni oshiro ga arimasu.', vietnamese: 'Ở phía bắc có lâu đài.' },
              { japanese: '南にお寺があります。', reading: 'みなみにおてらががあります。', romaji: 'minami ni otera ga arimasu.', vietnamese: 'Ở phía nam có chùa.' },
              { japanese: '東に駅があります。', reading: 'ひがしにえきがあります。', romaji: 'higashi ni eki ga arimasu.', vietnamese: 'Ở phía đông có nhà ga.' },
              { japanese: '西に山があります。', reading: 'にしにやまがあります。', romaji: 'nishi ni yama ga arimasu.', vietnamese: 'Ở phía tây có ngọn núi.' },
              { japanese: '公園に緑があります。', reading: 'こうえんにみどりがあります。', romaji: 'kouen ni midori ga arimasu.', vietnamese: 'Ở công viên có cây xanh.' },
              { japanese: 'ここに車があります。', reading: 'ここにくるまがあります。', romaji: 'koko ni kuruma ga arimasu.', vietnamese: 'Ở đây có ô tô.' },
              { japanese: '駅の近くにデパートがあります。', reading: 'えきのちかくにデパートがあります。', romaji: 'eki no chikaku ni depaato ga arimasu.', vietnamese: 'Ở gần nhà ga có trung tâm thương mại.' },
              { japanese: '部屋の中にベッドがあります。', reading: 'へやのなかにベッドがあります。', romaji: 'heya no naka ni beddo ga arimasu.', vietnamese: 'Trong phòng có giường.' },
              { japanese: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', romaji: 'tsukue no ue ni hon ga arimasu.', vietnamese: 'Trên bàn có sách.' },
              { japanese: 'かばんの中に時計があります。', reading: 'かばんのなかにとけいがあります。', romaji: 'kaban no naka ni tokei ga arimasu.', vietnamese: 'Trong cặp có đồng hồ.' }
            ], isLearned: false
          },
          {
            id: 'g24', title: 'N1 は N2 の N3 です。', meaning: 'N1 ở vị trí N3 của N2', type: 'Vị trí', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'の', iconBg: 'bg-pink-50 dark:bg-pink-900/30', iconColor: 'text-pink-500', barColor: 'bg-pink-500',
            structure: 'N1 は N2 の N3 です',
            structureDetails: 'Danh từ 1 + は + Danh từ 2 + の + Danh từ vị trí + です',
            explanationTitle: 'N1 ở vị trí N3 của N2',
            explanationDetails: 'Chỉ định vị trí tương đối',
            usage: 'Dùng để xác định vị trí của một vật (N1) dựa trên một vật khác làm mốc (N2). N3 là từ chỉ vị trí (trên, dưới, trong, ngoài...).',
            note: 'Từ chỉ vị trí luôn đứng sau trợ từ の.',
            memoryTip: 'Nhớ cụm "N2 の N3" như một khối danh từ thống nhất mang nghĩa "Phía N3 của N2".',
            commonWords: '上 (trên), 下 (dưới), 前 (trước), 後ろ (sau), 右 (phải), 左 (trái), 中 (trong), 外 (ngoài), 隣 (bên cạnh), 近く (gần)',
            examples: [
              { japanese: 'おきなわは 日本の みなみです。', reading: 'おきなわは にほんの みなみです。', romaji: 'okinawa wa nihon no minami desu.', vietnamese: 'Okinawa ở phía nam Nhật Bản.' },
              { japanese: '本は 机の 上です。', reading: 'ほんは つくえの うえです。', romaji: 'hon wa tsukue no ue desu.', vietnamese: 'Sách ở trên bàn.' },
              { japanese: '銀行は 郵便局の 隣です。', reading: 'ぎんこうは ゆうびんきょくの となりです。', romaji: 'ginkou wa yuubinkyoku no tonari desu.', vietnamese: 'Ngân hàng ở bên cạnh bưu điện.' },
              { japanese: '猫は 椅子の上です。', reading: 'ねこは いすのうえです。', romaji: 'neko wa isu no ue desu.', vietnamese: 'Con mèo ở trên ghế.' },
              { japanese: '犬は 机の下です。', reading: 'いぬは つくえのしたです。', romaji: 'inu wa tsukue no shita desu.', vietnamese: 'Con chó ở dưới bàn.' },
              { japanese: '車は 家の前です。', reading: 'くるまは いえのまえです。', romaji: 'kuruma wa ie no mae desu.', vietnamese: 'Ô tô ở trước nhà.' },
              { japanese: '自転車は 庭の後ろです。', reading: 'じてんしゃは にわのうしろです。', romaji: 'jitensha wa niwa no ushiro desu.', vietnamese: 'Xe đạp ở sau vườn.' },
              { japanese: 'トイレは 教室の隣です。', reading: 'といれは きょうしつのとなりです。', romaji: 'toire wa kyoushitsu no tonari desu.', vietnamese: 'Nhà vệ sinh ở bên cạnh phòng học.' },
              { japanese: '駅は 会社の近くです。', reading: 'えきは かいしゃのちかくです。', romaji: 'eki wa kaisha no chikaku desu.', vietnamese: 'Nhà ga ở gần công ty.' },
              { japanese: '本屋は スーパーの右です。', reading: 'ほんやは すーぱーのみぎです。', romaji: 'honya wa suupaa no migi desu.', vietnamese: 'Hiệu sách ở bên phải siêu thị.' },
              { japanese: '病院は 銀行の左です。', reading: 'びょういんは ぎんこうのひだりです。', romaji: 'byouin wa ginkou no hidari desu.', vietnamese: 'Bệnh viện ở bên trái ngân hàng.' },
              { japanese: '写真は 箱の中です。', reading: 'しゃしんは はこのなかです。', romaji: 'shashin wa hako no naka desu.', vietnamese: 'Bức ảnh ở trong hộp.' },
              { japanese: '子供は ドアの外です。', reading: 'こどもは どあのそとです。', romaji: 'kodomo wa doa no soto desu.', vietnamese: 'Đứa trẻ ở ngoài cửa.' },
              { japanese: '郵便局は 銀行とスーパーの間です。', reading: 'ゆうびんきょくは ぎんこうとすーぱーのあいだです。', romaji: 'yuubinkyoku wa ginkou to suupaa no aida desu.', vietnamese: 'Bưu điện ở giữa ngân hàng và siêu thị.' },
              { japanese: '先生は 学生の前です。', reading: 'せんせいは がくせいのまえです。', romaji: 'sensei wa gakusei no mae desu.', vietnamese: 'Giáo viên ở trước học sinh.' }
            ],
            relatedGrammars: [
              { name: 'N1 に N2 が あります (Ở N1 có N2)', meaning: 'Tồn tại vật vô tri', example: { japanese: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', romaji: 'tsukue no ue ni hon ga arimasu.', vietnamese: 'Trên bàn có sách.' } },
              { name: 'N2 は N1 に あります (N2 thì ở N1)', meaning: 'Nhấn mạnh chủ thể', example: { japanese: '本は机の上にあります。', reading: 'ほんはつくえのうえにあります。', romaji: 'hon wa tsukue no ue ni arimasu.', vietnamese: 'Sách thì ở trên bàn.' } },
              { name: 'N1 に N2 や N3 が あります (Ở N1 có N2 và N3)', meaning: 'Liệt kê đại diện', example: { japanese: '部屋に机や椅子があります。', reading: 'へやにつくえやいすががあります。', romaji: 'heya ni tsukue ya isu ga arimasu.', vietnamese: 'Trong phòng có bàn và ghế.' } },
              { name: 'N1 と N2 (N1 và N2)', meaning: 'Liệt kê toàn bộ', example: { japanese: '机と椅子です。', reading: 'つくえといすです。', romaji: 'tsukue to isu desu.', vietnamese: 'Bàn và ghế.' } },
              { name: 'N1 は どこ ですか (N1 ở đâu?)', meaning: 'Hỏi vị trí', example: { japanese: '本はどこですか。', reading: 'ほんはどこですか。', romaji: 'hon wa doko desu ka.', vietnamese: 'Sách ở đâu?' } }
            ]
          },
          {
            id: 'g25', title: 'N1 から N2 まで どのくらい ですか。', meaning: 'Từ N1 đến N2 mất bao lâu?', type: 'Khoảng thời gian', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'か', iconBg: 'bg-indigo-50 dark:bg-indigo-900/30', iconColor: 'text-indigo-500', barColor: 'bg-indigo-500',
            structure: 'N1 から N2 まで どのくらい ですか',
            structureDetails: 'Danh từ (Địa điểm) + から + Danh từ (Địa điểm) + まで + どのくらい + ですか',
            explanationTitle: 'Từ N1 đến N2 mất bao lâu?',
            explanationDetails: 'Hỏi về khoảng thời gian di chuyển',
            usage: 'Dùng để hỏi về khoảng thời gian cần thiết để đi từ địa điểm N1 đến địa điểm N2.',
            note: 'どのくらい (Dono kurai) có nghĩa là "khoảng bao lâu", dùng để hỏi lượng thời gian.',
            memoryTip: 'から (từ) - まで (đến) giống như một đoạn đường nối 2 điểm. どのくらい (bao lâu) là câu hỏi cho đoạn đường đó.',
            commonWords: 'どのくらい (bao lâu), 時間 (thời gian), かかりますか (mất bao nhiêu)',
            examples: [
              { japanese: 'うちから 学校まで どのくらいですか。', reading: 'うちから がっこうまで どのくらいですか。', romaji: 'uchi kara gakkou made dono kurai desu ka.', vietnamese: 'Từ nhà đến trường mất bao lâu?' },
              { japanese: 'ハノイから ホーチミンまで どのくらいですか。', reading: 'ハノイから ホーチミンまで どのくらいですか。', romaji: 'hanoi kara hoochimin made dono kurai desu ka.', vietnamese: 'Từ Hà Nội đến Hồ Chí Minh mất bao lâu?' },
              { japanese: '駅から 会社まで どのくらいですか。', reading: 'えきから かいしゃまで どのくらいですか。', romaji: 'eki kara kaisha made dono kurai desu ka.', vietnamese: 'Từ ga đến công ty mất bao lâu?' },
              { japanese: '東京から 大阪まで どのくらいですか。', reading: 'とうきょうから おおさかまで どのくらいですか。', romaji: 'toukyou kara oosaka made dono kurai desu ka.', vietnamese: 'Từ Tokyo đến Osaka mất bao lâu?' },
              { japanese: '空港から ホテルまで どのくらいですか。', reading: 'くうこうから ほてるまで どのくらいですか。', romaji: 'kuukou kara hoteru made dono kurai desu ka.', vietnamese: 'Từ sân bay đến khách sạn mất bao lâu?' },
              { japanese: '日本から ベトナムまで どのくらいですか。', reading: 'にほんから べとなむまで どのくらいですか。', romaji: 'nihon kara betonamu made dono kurai desu ka.', vietnamese: 'Từ Nhật Bản đến Việt Nam mất bao lâu?' },
              { japanese: '郵便局から 銀行まで どのくらいですか。', reading: 'ゆうびんきょくから ぎんこうまで どのくらいですか。', romaji: 'yuubinkyoku kara ginkou made dono kurai desu ka.', vietnamese: 'Từ bưu điện đến ngân hàng mất bao lâu?' },
              { japanese: 'スーパーから 家まで どのくらいですか。', reading: 'すーぱーから いえまで どのくらいですか。', romaji: 'suupaa kara ie made dono kurai desu ka.', vietnamese: 'Từ siêu thị về nhà mất bao lâu?' },
              { japanese: '会社から 駅まで どのくらいですか。', reading: 'かいしゃから えきまで どのくらいですか。', romaji: 'kaisha kara eki made dono kurai desu ka.', vietnamese: 'Từ công ty ra ga mất bao lâu?' },
              { japanese: '病院から ここまで どのくらいですか。', reading: 'びょういんから ここまで どのくらいですか。', romaji: 'byouin kara koko made dono kurai desu ka.', vietnamese: 'Từ bệnh viện đến đây mất bao lâu?' },
              { japanese: 'ここから そこまで どのくらいですか。', reading: 'ここから そこまで どのくらいですか。', romaji: 'koko kara soko made dono kurai desu ka.', vietnamese: 'Từ đây đến đó mất bao lâu?' },
              { japanese: '大阪から 京都まで どのくらいですか。', reading: 'おおさかから きょうとまで どのくらいですか。', romaji: 'oosaka kara kyouto made dono kurai desu ka.', vietnamese: 'Từ Osaka đến Kyoto mất bao lâu?' },
              { japanese: '大学から 寮まで どのくらいですか。', reading: 'だいがくから りょうまで どのくらいですか。', romaji: 'daigaku kara ryou made dono kurai desu ka.', vietnamese: 'Từ trường đại học đến ký túc xá mất bao lâu?' },
              { japanese: '図書館から 公園まで どのくらいですか。', reading: 'としょかんから こうえんまで どのくらいですか。', romaji: 'toshokan kara kouen made dono kurai desu ka.', vietnamese: 'Từ thư viện đến công viên mất bao lâu?' },
              { japanese: 'うちから 空港まで どのくらいですか。', reading: 'うちから くうこうまで どのくらいですか。', romaji: 'uchi kara kuukou made dono kurai desu ka.', vietnamese: 'Từ nhà đến sân bay mất bao lâu?' }
            ],
            relatedGrammars: [
              { name: 'N1 から N2 まで ~Time です (Từ N1 đến N2 mất ~Time)', meaning: 'Khoảng thời gian', example: { japanese: 'うちから学校まで10分です。', reading: 'うちからがっこうまでじゅっぷんです。', romaji: 'uchi kara gakkou made juppun desu.', vietnamese: 'Từ nhà đến trường mất 10 phút.' } },
              { name: 'N で 行きます (Đi bằng N)', meaning: 'Phương tiện di chuyển', example: { japanese: 'バスで行きます。', reading: 'ばすでいきます。', romaji: 'basu de ikimasu.', vietnamese: 'Đi bằng xe buýt.' } },
              { name: 'N1 から N2 まで (Từ N1 đến N2)', meaning: 'Điểm bắt đầu và kết thúc', example: { japanese: 'ハノイからホーチミンまで。', reading: 'ハノイからホーチミンまで。', romaji: 'hanoi kara hoochimin made.', vietnamese: 'Từ Hà Nội đến Hồ Chí Minh.' } },
              { name: 'どうやって 行きますか (Đi bằng cách nào?)', meaning: 'Hỏi phương tiện', example: { japanese: 'どうやって行きますか。', reading: 'どうやっていきますか。', romaji: 'douyatte ikimasu ka.', vietnamese: 'Đi bằng cách nào?' } },
              { name: 'どれくらい かかりますか (Mất bao lâu?)', meaning: 'Hỏi khoảng thời gian', example: { japanese: 'どれくらいかかりますか。', reading: 'どれくらいかかりますか。', romaji: 'dorekura ikakarimasu ka.', vietnamese: 'Mất bao lâu?' } }
            ]
          },
          {
            id: 'g26', title: 'N1 から N2 まで Time (くらい) です。', meaning: 'Từ N1 đến N2 mất ~Time', type: 'Khoảng thời gian', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'ま', iconBg: 'bg-teal-50 dark:bg-teal-900/30', iconColor: 'text-teal-500', barColor: 'bg-teal-500',
            structure: 'N1 から N2 まで Time (くらい) です',
            structureDetails: 'Danh từ (Địa điểm) + から + Danh từ (Địa điểm) + まで + Lượng thời gian + (くらい) + です',
            explanationTitle: 'Từ N1 đến N2 mất ~Time',
            explanationDetails: 'Trích dẫn khoảng thời gian di chuyển',
            usage: 'Dùng để trả lời cho câu hỏi どのくらい, biểu thị khoảng thời gian cần thiết để đi từ N1 đến N2.',
            note: 'くらい (kurai) mang nghĩa "khoảng", dùng khi lượng thời gian là ước lượng, không chính xác tuyệt đối.',
            memoryTip: 'Thêm くらい vào sau thời gian để câu nói tự nhiên hơn khi bạn không chắc chắn 100% thời gian chạy xe.',
            commonWords: '分 (phút), 時間 (tiếng), 日 (ngày), 週間 (tuần), ヶ月 (tháng), 年 (năm)',
            examples: [
              { japanese: 'えきから うちまで 10分です。', reading: 'えきから うちまで じゅっぷんです。', romaji: 'eki kara uchi made juppun desu.', vietnamese: 'Từ ga đến nhà mất 10 phút.' },
              { japanese: 'ハノイから ホーチミンまで 飛行機で 2時間くらいです。', reading: 'ハノイから ホーチミンまで ひこうきで にじかんくらいです。', romaji: 'hanoi kara hoochimin made hikouki de nijikan kurai desu.', vietnamese: 'Từ Hà Nội đến Hồ Chí Minh bằng máy bay mất khoảng 2 tiếng.' },
              { japanese: 'うちから 学校まで 自転車で 15分です。', reading: 'うちから がっこうまで じてんしゃで じゅうごふんです。', romaji: 'uchi kara gakkou made jitensha de juugofun desu.', vietnamese: 'Từ nhà đến trường bằng xe đạp mất 15 phút.' },
              { japanese: '東京から 大阪まで 新幹線で 2時間半です。', reading: 'とうきょうから おおさかまで しんかんせんで にじかんはんです。', romaji: 'toukyou kara oosaka made shinkansen de nijikanhan desu.', vietnamese: 'Từ Tokyo đến Osaka bằng Shinkansen mất 2 tiếng rưỡi.' },
              { japanese: '日本から ベトナムまで 飛行機で 6時間くらいです。', reading: 'にほんから べとなむまで ひこうきで ろくじかんくらいです。', romaji: 'nihon kara betonamu made hikouki de rokujikan kurai desu.', vietnamese: 'Từ Nhật Bản đến Việt Nam bằng máy bay mất khoảng 6 tiếng.' },
              { japanese: '会社から 駅まで 歩いて 5分です。', reading: 'かいしゃから えきまで あるいて ごふんです。', romaji: 'kaisha kara eki made aruite gofun desu.', vietnamese: 'Từ công ty ra ga đi bộ mất 5 phút.' },
              { japanese: 'うちから 空港まで バスで 1時間くらいです。', reading: 'うちから くうこうまで ばすで いちじかんくらいです。', romaji: 'uchi kara kuukou made basu de ichijikan kurai desu.', vietnamese: 'Từ nhà đến sân bay bằng xe buýt mất khoảng 1 tiếng.' },
              { japanese: 'スーパーから 家まで 車で 10分です。', reading: 'すーぱーから いえまで くるまで じゅっぷんです。', romaji: 'suupaa kara ie made kuruma de juppun desu.', vietnamese: 'Từ siêu thị về nhà bằng ô tô mất 10 phút.' },
              { japanese: '郵便局から 銀行まで 3分くらいです。', reading: 'ゆうびんきょくから ぎんこうまで さんぷんくらいです。', romaji: 'yuubinkyoku kara ginkou made sanpun kurai desu.', vietnamese: 'Từ bưu điện đến ngân hàng mất khoảng 3 phút.' },
              { japanese: 'ここから そこまで 歩いて 20分です。', reading: 'ここから そこまで あるいて にじゅっぷんです。', romaji: 'koko kara soko made aruite nijuppun desu.', vietnamese: 'Từ đây đến đó đi bộ mất 20 phút.' },
              { japanese: '大阪から 京都まで 電車で 30分です。', reading: 'おおさかから きょうとまで でんしゃで さんじゅっぷんです。', romaji: 'oosaka kara kyouto made densha de sanjuppun desu.', vietnamese: 'Từ Osaka đến Kyoto bằng tàu điện mất 30 phút.' },
              { japanese: '寮から 大学まで 10分くらいです。', reading: 'りょうから だいがくまで じゅっぷんくらいです。', romaji: 'ryou kara daigaku made juppun kurai desu.', vietnamese: 'Từ ký túc xá đến trường mất khoảng 10 phút.' },
              { japanese: '図書館から 公園まで 5分です。', reading: 'としょかんから こうえんまで ごふんです。', romaji: 'toshokan kara kouen made gofun desu.', vietnamese: 'Từ thư viện đến công viên mất 5 phút.' },
              { japanese: 'ホテルから 駅まで タクシーで 15分くらいです。', reading: 'ほてるから えきまで たくしーで じゅうごふんくらいです。', romaji: 'hoteru kara eki made takushii de juugofun kurai desu.', vietnamese: 'Từ khách sạn đến ga bằng taxi mất khoảng 15 phút.' },
              { japanese: 'ホーチミンから ダラットまで 車で 6時間です。', reading: 'ほーちみんから だらっとまで くるまで ろくじかんです。', romaji: 'hoochimin kara daratto made kuruma de rokujikan desu.', vietnamese: 'Từ Hồ Chí Minh đến Đà Lạt bằng ô tô mất 6 tiếng.' }
            ],
            relatedGrammars: [
              { name: 'N で ~Time です (Đi bằng N mất ~Time)', meaning: 'Thời gian đi lại bằng phương tiện', example: { japanese: 'バスで1時間です。', reading: 'ばすでいちじかんです。', romaji: 'basu de ichijikan desu.', vietnamese: 'Đi bằng xe buýt mất 1 tiếng.' } },
              { name: 'N1 から N2 まで どのくらい ですか (Từ N1 đến N2 mất bao lâu?)', meaning: 'Hỏi khoảng thời gian', example: { japanese: 'ハノイからホーチミンまでどのくらいですか。', reading: 'ハノイからホーチミンまでどのくらいですか。', romaji: 'hanoi kara hoochimin made dono kurai desu ka.', vietnamese: 'Từ Hà Nội đến Hồ Chí Minh mất bao lâu?' } },
              { name: '歩いて ~Time です (Đi bộ mất ~Time)', meaning: 'Thời gian đi bộ', example: { japanese: '歩いて10分です。', reading: 'あるいてじゅっぷんです。', romaji: 'aruite juppun desu.', vietnamese: 'Đi bộ mất 10 phút.' } },
              { name: 'Time かかります (Mất Time)', meaning: 'Tốn bao nhiêu thời gian', example: { japanese: '1時間かかります。', reading: 'いちじかんかかります。', romaji: 'ichijikan kakarimasu.', vietnamese: 'Mất 1 tiếng.' } },
              { name: 'A から B まで (Từ A đến B)', meaning: 'Điểm bắt đầu và kết thúc', example: { japanese: '東京から大阪まで。', reading: 'とうきょうからおおさかまで。', romaji: 'toukyou kara oosaka made.', vietnamese: 'Từ Tokyo đến Osaka.' } }
            ]
          },
          {
            id: 'g27', title: 'N で ~Time です。', meaning: 'Đi bằng N mất ~Time', type: 'Phương tiện & Thời gian', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: 'で', iconBg: 'bg-yellow-50 dark:bg-yellow-900/30', iconColor: 'text-yellow-600', barColor: 'bg-yellow-500',
            structure: 'N で ~Time です',
            structureDetails: 'Danh từ (Phương tiện) + で + Lượng thời gian + です',
            explanationTitle: 'Đi bằng N mất ~Time',
            explanationDetails: 'Thời gian di chuyển bằng phương tiện',
            usage: 'Dùng để biểu thị khoảng thời gian cần thiết để di chuyển bằng một phương tiện giao thông cụ thể.',
            note: 'Trợ từ で (de) ở đây mang nghĩa là "bằng (phương tiện gì)".',
            memoryTip: 'Chữ で đọc là "đe", giống như "đe" xe ra đi vậy. Đi bằng cái gì thì thêm で vào sau cái đó!',
            commonWords: '自転車 (xe đạp), バイク (xe máy), 車 (ô tô), タクシー (taxi), バス (xe buýt), 電車 (tàu điện), 飛行機 (máy bay)',
            examples: [
              { japanese: 'バスで 1時間です。', reading: 'ばすで いちじかんです。', romaji: 'basu de ichijikan desu.', vietnamese: 'Đi bằng xe buýt mất 1 tiếng.' },
              { japanese: '自転車で 15分です。', reading: 'じてんしゃで じゅうごふんです。', romaji: 'jitensha de juugofun desu.', vietnamese: 'Đi bằng xe đạp mất 15 phút.' },
              { japanese: '飛行機で 2時間くらいです。', reading: 'ひこうきで にじかんくらいです。', romaji: 'hikouki de nijikan kurai desu.', vietnamese: 'Đi bằng máy bay mất khoảng 2 tiếng.' },
              { japanese: '電車で 30分です。', reading: 'でんしゃで さんじゅっぷんです。', romaji: 'densha de sanjuppun desu.', vietnamese: 'Đi bằng tàu điện mất 30 phút.' },
              { japanese: '新幹線で 2時間半です。', reading: 'しんかんせんで にじかんはんです。', romaji: 'shinkansen de nijikanhan desu.', vietnamese: 'Đi bằng Shinkansen mất 2 tiếng rưỡi.' },
              { japanese: '車で 10分です。', reading: 'くるまで じゅっぷんです。', romaji: 'kuruma de juppun desu.', vietnamese: 'Đi bằng ô tô mất 10 phút.' },
              { japanese: 'タクシーで 20分くらいです。', reading: 'たくしーで にじゅっぷんくらいです。', romaji: 'takushii de nijuppun kurai desu.', vietnamese: 'Đi bằng taxi mất khoảng 20 phút.' },
              { japanese: 'バイクで 45分です。', reading: 'ばいくで よんじゅうごふんです。', romaji: 'baiku de yonjuugofun desu.', vietnamese: 'Đi bằng xe máy mất 45 phút.' },
              { japanese: '船で 3時間くらいです。', reading: 'ふねで さんじかんくらいです。', romaji: 'fune de sanjikan kurai desu.', vietnamese: 'Đi bằng tàu thủy mất khoảng 3 tiếng.' },
              { japanese: '地下鉄で 15分です。', reading: 'ちかてつで じゅうごふんです。', romaji: 'chikatetsu de juugofun desu.', vietnamese: 'Đi bằng tàu điện ngầm mất 15 phút.' },
              { japanese: '新幹線で 3時間です。', reading: 'しんかんせんで さんじかんです。', romaji: 'shinkansen de sanjikan desu.', vietnamese: 'Đi bằng Shinkansen mất 3 tiếng.' },
              { japanese: 'バスで 40分くらいです。', reading: 'ばすで よんじゅっぷんくらいです。', romaji: 'basu de yonjuppun kurai desu.', vietnamese: 'Đi bằng xe buýt mất khoảng 40 phút.' },
              { japanese: '自転車で 25分です。', reading: 'じてんしゃで にじゅうごふんです。', romaji: 'jitensha de nijugo fun desu.', vietnamese: 'Đi bằng xe đạp mất 25 phút.' },
              { japanese: '車で 5時間くらいです。', reading: 'くるまで ごじかんくらいです。', romaji: 'kuruma de gojikan kurai desu.', vietnamese: 'Đi bằng ô tô mất khoảng 5 tiếng.' },
              { japanese: '電車で 1時間半です。', reading: 'でんしゃで いちじかんはんです。', romaji: 'densha de ichijikanhan desu.', vietnamese: 'Đi bằng tàu điện mất 1 tiếng rưỡi.' }
            ],
            relatedGrammars: [
              { name: 'N で 行きます (Đi bằng N)', meaning: 'Hành động di chuyển bằng phương tiện', example: { japanese: 'バスで学校へ行きます。', reading: 'ばすでがっこうへいきます。', romaji: 'basu de gakkou e ikimasu.', vietnamese: 'Đến trường bằng xe buýt.' } },
              { name: '歩いて 行きます (Đi bộ)', meaning: 'Hành động đi bộ (không dùng de)', example: { japanese: '歩いて行きます。', reading: 'あるいていきます。', romaji: 'aruite ikimasu.', vietnamese: 'Tôi đi bộ.' } },
              { name: 'どうやって 行きますか (Đi bằng cách nào?)', meaning: 'Hỏi phương tiện', example: { japanese: 'どうやって行きますか。', reading: 'どうやっていきますか。', romaji: 'douyatte ikimasu ka.', vietnamese: 'Đi bằng cách nào?' } },
              { name: 'N1 から N2 まで Time (くらい) です (Từ N1 đến N2 mất ~Time)', meaning: 'Khoảng thời gian di chuyển', example: { japanese: 'うちから駅まで10分です。', reading: 'うちからえきまでじゅっぷんです。', romaji: 'uchi kara eki made juppun desu.', vietnamese: 'Từ nhà đến ga mất 10 phút.' } },
              { name: 'N で きます (Đến bằng N)', meaning: 'Hành động đến bằng phương tiện', example: { japanese: 'バスできました。', reading: 'ばすできました。', romaji: 'basu de kimashita.', vietnamese: 'Tôi đã đến bằng xe buýt.' } }
            ]
          },
          {
            id: 'g28', title: 'N で 行きます／来ます／帰ります。', meaning: 'Đi/đến/về bằng phương tiện N', type: 'Động từ di chuyển', jlpt: 'N5', difficulty: 'Cơ bản',
            icon: '行', iconBg: 'bg-red-50 dark:bg-red-900/30', iconColor: 'text-red-500', barColor: 'bg-red-500',
            structure: 'N で 行きます / 来ます / 帰ります',
            structureDetails: 'Danh từ (Phương tiện) + で + Động từ di chuyển (行きます/来ます/帰ります)',
            explanationTitle: 'Đi/đến/về bằng phương tiện N',
            explanationDetails: 'Cách thức di chuyển',
            usage: 'Dùng để diễn tả hành động đi đến, đi tới hoặc trở về một địa điểm nào đó bằng phương tiện giao thông N.',
            note: 'Nếu đi bộ thì dùng 歩いて (aruite) KHÔNG đi kèm với trợ từ で.',
            memoryTip: 'Gắn phương tiện với chữ で để tạo thành "bộ máy" di chuyển cho động từ 行きます.',
            commonWords: '行きます (đi), 来ます (đến), 帰ります (về), 歩いて (đi bộ)',
            examples: [
              { japanese: 'ひこうきで 行きます。', reading: 'ひこうきで いきます。', romaji: 'hikouki de ikimasu.', vietnamese: 'Đi bằng máy bay.' },
              { japanese: '電車で うちへ 帰ります。', reading: 'でんしゃで うちへ かえります。', romaji: 'densha de uchi e kaerimasu.', vietnamese: 'Về nhà bằng tàu điện.' },
              { japanese: '歩いて 学校へ 行きます。', reading: 'あるいて がっこうへ いきます。', romaji: 'aruite gakkou e ikimasu.', vietnamese: 'Đi bộ đến trường.' },
              { japanese: 'バスで 会社へ 行きます。', reading: 'ばすで かいしゃへ いきます。', romaji: 'basu de kaisha e ikimasu.', vietnamese: 'Đi đến công ty bằng xe buýt.' },
              { japanese: '自転車で スーパーへ 行きます。', reading: 'じてんしゃで すーぱーへ いきます。', romaji: 'jitensha de suupaa e ikimasu.', vietnamese: 'Đi đến siêu thị bằng xe đạp.' },
              { japanese: '新幹線で 東京へ 行きます。', reading: 'しんかんせんで とうきょうへ いきます。', romaji: 'shinkansen de toukyou e ikimasu.', vietnamese: 'Đi đến Tokyo bằng Shinkansen.' },
              { japanese: '車で デパートへ 行きます。', reading: 'くるまで でぱーとへ いきます。', romaji: 'kuruma de depaato e ikimasu.', vietnamese: 'Đi đến trung tâm thương mại bằng ô tô.' },
              { japanese: 'タクシーで ホテルへ 帰ります。', reading: 'たくしーで ほてるへ かえります。', romaji: 'takushii de hoteru e kaerimasu.', vietnamese: 'Về khách sạn bằng taxi.' },
              { japanese: 'バイクで 友達の家へ 行きます。', reading: 'ばいくで ともだちのいえへ いきます。', romaji: 'baiku de tomodachi no ie e ikimasu.', vietnamese: 'Đi đến nhà bạn bằng xe máy.' },
              { japanese: '船で 島へ 行きます。', reading: 'ふねで しまへ いきます。', romaji: 'fune de shima e ikimasu.', vietnamese: 'Đi ra đảo bằng tàu thủy.' },
              { japanese: '地下鉄で 駅へ 来ます。', reading: 'ちかてつで えきへ きます。', romaji: 'chikatetsu de eki e kimasu.', vietnamese: 'Đến nhà ga bằng tàu điện ngầm.' },
              { japanese: '歩いて うちへ 帰ります。', reading: 'あるいて うちへ かえります。', romaji: 'aruite uchi e kaerimasu.', vietnamese: 'Đi bộ về nhà.' },
              { japanese: '車で 空港へ 行きます。', reading: 'くるまで くうこうへ いきます。', romaji: 'kuruma de kuukou e ikimasu.', vietnamese: 'Đi đến sân bay bằng ô tô.' },
              { japanese: 'バスで 病院へ 来ました。', reading: 'ばすで びょういんへ きました。', romaji: 'basu de byouin e kimashita.', vietnamese: 'Đã đến bệnh viện bằng xe buýt.' },
              { japanese: '電車で 寮へ 帰ります。', reading: 'でんしゃで りょうへ かえります。', romaji: 'densha de ryou e kaerimasu.', vietnamese: 'Về ký túc xá bằng tàu điện.' }
            ],
            relatedGrammars: [
              { name: 'N へ 行きます (Đi đến N)', meaning: 'Chỉ phương hướng di chuyển', example: { japanese: '日本へ行きます。', reading: 'にほんへいきます。', romaji: 'nihon e ikimasu.', vietnamese: 'Tôi đi Nhật Bản.' } },
              { name: 'だれと 行きますか (Đi với ai?)', meaning: 'Hỏi người cùng đi', example: { japanese: 'だれと行きますか。', reading: 'だれといきますか。', romaji: 'dare to ikimasu ka.', vietnamese: 'Bạn đi với ai?' } },
              { name: 'いつ 行きますか (Khi nào đi?)', meaning: 'Hỏi thời gian', example: { japanese: 'いつ行きますか。', reading: 'いついきますか。', romaji: 'itsu ikimasu ka.', vietnamese: 'Khi nào bạn đi?' } },
              { name: '歩いて 行きます (Đi bộ)', meaning: 'Hành động đi bộ', example: { japanese: '歩いて行きます。', reading: 'あるいていきます。', romaji: 'aruite ikimasu.', vietnamese: 'Tôi đi bộ.' } },
              { name: '何で 行きますか (Đi bằng gì?)', meaning: 'Hỏi phương tiện', example: { japanese: '何で行きますか。', reading: 'なんでいきますか。', romaji: 'nan de ikimasu ka.', vietnamese: 'Bạn đi bằng gì?' } }
            ]
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
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },
              {
                japanese: '昨日は雨でした。',
                vietnamese: 'Hôm qua trời đã mưa.'
              }
            ],
            isLearned: false
          },
          { id: 'g9', title: '〜が好きです', meaning: 'Thích...', type: 'Sở thích', jlpt: 'N5', difficulty: 'Cơ bản', examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },{ japanese: '私はスポーツが好きです。', vietnamese: 'Tôi thích thể thao.' }] },
          { id: 'g10', title: '〜が上手です', meaning: 'Giỏi...', type: 'Kỹ năng', jlpt: 'N5', difficulty: 'Cơ bản', examples: [
          {
            japanese: 'わたしはがくせいです。',
            vietnamese: 'Tôi là học sinh.',
            romaji: 'watashi wa gakusei desu.',
            sortBlocks: [
              { id: 'sb1', text: 'わたし' },
              { id: 'sb2', text: 'は' },
              { id: 'sb3', text: 'がくせい' },
              { id: 'sb4', text: 'です' },
              { id: 'sb5', text: '。' }
            ]
          },{ japanese: '彼女は歌が上手です。', vietnamese: 'Cô ấy hát giỏi.' }] },
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
