const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../src/data/grammarData.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

const grammars = [
  {
    id: 'g24',
    examples: [
      { japanese: 'おきなわは 日本の みなみです。', romaji: 'okinawa wa nihon no minami desu.', vietnamese: 'Okinawa ở phía nam Nhật Bản.' },
      { japanese: '本は 机の 上です。', romaji: 'hon wa tsukue no ue desu.', vietnamese: 'Sách ở trên bàn.' },
      { japanese: '銀行は 郵便局の 隣です。', romaji: 'ginkou wa yuubinkyoku no tonari desu.', vietnamese: 'Ngân hàng ở bên cạnh bưu điện.' },
      { japanese: '猫は 椅子の上です。', romaji: 'neko wa isu no ue desu.', vietnamese: 'Con mèo ở trên ghế.' },
      { japanese: '犬は 机の下です。', romaji: 'inu wa tsukue no shita desu.', vietnamese: 'Con chó ở dưới bàn.' },
      { japanese: '車は 家の前です。', romaji: 'kuruma wa ie no mae desu.', vietnamese: 'Ô tô ở trước nhà.' },
      { japanese: '自転車は 庭の後ろです。', romaji: 'jitensha wa niwa no ushiro desu.', vietnamese: 'Xe đạp ở sau vườn.' },
      { japanese: 'トイレは 教室の隣です。', romaji: 'toire wa kyoushitsu no tonari desu.', vietnamese: 'Nhà vệ sinh ở bên cạnh phòng học.' },
      { japanese: '駅は 会社の近くです。', romaji: 'eki wa kaisha no chikaku desu.', vietnamese: 'Nhà ga ở gần công ty.' },
      { japanese: '本屋は スーパーの右です。', romaji: 'honya wa suupaa no migi desu.', vietnamese: 'Hiệu sách ở bên phải siêu thị.' },
      { japanese: '病院は 銀行の左です。', romaji: 'byouin wa ginkou no hidari desu.', vietnamese: 'Bệnh viện ở bên trái ngân hàng.' },
      { japanese: '写真は 箱の中です。', romaji: 'shashin wa hako no naka desu.', vietnamese: 'Bức ảnh ở trong hộp.' },
      { japanese: '子供は ドアの外です。', romaji: 'kodomo wa doa no soto desu.', vietnamese: 'Đứa trẻ ở ngoài cửa.' },
      { japanese: '郵便局は 銀行とスーパーの間です。', romaji: 'yuubinkyoku wa ginkou to suupaa no aida desu.', vietnamese: 'Bưu điện ở giữa ngân hàng và siêu thị.' },
      { japanese: '先生は 学生の前です。', romaji: 'sensei wa gakusei no mae desu.', vietnamese: 'Giáo viên ở trước học sinh.' }
    ],
    relatedGrammars: [
      { name: 'N1 に N2 が あります (Ở N1 có N2)', meaning: 'Tồn tại vật vô tri', example: { japanese: '机の上に本があります。', romaji: 'tsukue no ue ni hon ga arimasu.', vietnamese: 'Trên bàn có sách.' } },
      { name: 'N2 は N1 に あります (N2 thì ở N1)', meaning: 'Nhấn mạnh chủ thể', example: { japanese: '本は机の上にあります。', romaji: 'hon wa tsukue no ue ni arimasu.', vietnamese: 'Sách thì ở trên bàn.' } },
      { name: 'N1 に N2 や N3 が あります (Ở N1 có N2 và N3)', meaning: 'Liệt kê đại diện', example: { japanese: '部屋に机や椅子があります。', romaji: 'heya ni tsukue ya isu ga arimasu.', vietnamese: 'Trong phòng có bàn và ghế.' } },
      { name: 'N1 と N2 (N1 và N2)', meaning: 'Liệt kê toàn bộ', example: { japanese: '机と椅子です。', romaji: 'tsukue to isu desu.', vietnamese: 'Bàn và ghế.' } },
      { name: 'N1 は どこ ですか (N1 ở đâu?)', meaning: 'Hỏi vị trí', example: { japanese: '本はどこですか。', romaji: 'hon wa doko desu ka.', vietnamese: 'Sách ở đâu?' } }
    ]
  },
  {
    id: 'g25',
    examples: [
      { japanese: 'うちから 学校まで どのくらいですか。', romaji: 'uchi kara gakkou made dono kurai desu ka.', vietnamese: 'Từ nhà đến trường mất bao lâu?' },
      { japanese: 'ハノイから ホーチミンまで どのくらいですか。', romaji: 'hanoi kara hoochimin made dono kurai desu ka.', vietnamese: 'Từ Hà Nội đến Hồ Chí Minh mất bao lâu?' },
      { japanese: '駅から 会社まで どのくらいですか。', romaji: 'eki kara kaisha made dono kurai desu ka.', vietnamese: 'Từ ga đến công ty mất bao lâu?' },
      { japanese: '東京から 大阪まで どのくらいですか。', romaji: 'toukyou kara oosaka made dono kurai desu ka.', vietnamese: 'Từ Tokyo đến Osaka mất bao lâu?' },
      { japanese: '空港から ホテルまで どのくらいですか。', romaji: 'kuukou kara hoteru made dono kurai desu ka.', vietnamese: 'Từ sân bay đến khách sạn mất bao lâu?' },
      { japanese: '日本から ベトナムまで どのくらいですか。', romaji: 'nihon kara betonamu made dono kurai desu ka.', vietnamese: 'Từ Nhật Bản đến Việt Nam mất bao lâu?' },
      { japanese: '郵便局から 銀行まで どのくらいですか。', romaji: 'yuubinkyoku kara ginkou made dono kurai desu ka.', vietnamese: 'Từ bưu điện đến ngân hàng mất bao lâu?' },
      { japanese: 'スーパーから 家まで どのくらいですか。', romaji: 'suupaa kara ie made dono kurai desu ka.', vietnamese: 'Từ siêu thị về nhà mất bao lâu?' },
      { japanese: '会社から 駅まで どのくらいですか。', romaji: 'kaisha kara eki made dono kurai desu ka.', vietnamese: 'Từ công ty ra ga mất bao lâu?' },
      { japanese: '病院から ここまで どのくらいですか。', romaji: 'byouin kara koko made dono kurai desu ka.', vietnamese: 'Từ bệnh viện đến đây mất bao lâu?' },
      { japanese: 'ここから そこまで どのくらいですか。', romaji: 'koko kara soko made dono kurai desu ka.', vietnamese: 'Từ đây đến đó mất bao lâu?' },
      { japanese: '大阪から 京都まで どのくらいですか。', romaji: 'oosaka kara kyouto made dono kurai desu ka.', vietnamese: 'Từ Osaka đến Kyoto mất bao lâu?' },
      { japanese: '大学から 寮まで どのくらいですか。', romaji: 'daigaku kara ryou made dono kurai desu ka.', vietnamese: 'Từ trường đại học đến ký túc xá mất bao lâu?' },
      { japanese: '図書館から 公園まで どのくらいですか。', romaji: 'toshokan kara kouen made dono kurai desu ka.', vietnamese: 'Từ thư viện đến công viên mất bao lâu?' },
      { japanese: 'うちから 空港まで どのくらいですか。', romaji: 'uchi kara kuukou made dono kurai desu ka.', vietnamese: 'Từ nhà đến sân bay mất bao lâu?' }
    ],
    relatedGrammars: [
      { name: 'N1 から N2 まで ~Time です (Từ N1 đến N2 mất ~Time)', meaning: 'Khoảng thời gian', example: { japanese: 'うちから学校まで10分です。', romaji: 'uchi kara gakkou made juppun desu.', vietnamese: 'Từ nhà đến trường mất 10 phút.' } },
      { name: 'N で 行きます (Đi bằng N)', meaning: 'Phương tiện di chuyển', example: { japanese: 'バスで行きます。', romaji: 'basu de ikimasu.', vietnamese: 'Đi bằng xe buýt.' } },
      { name: 'N1 から N2 まで (Từ N1 đến N2)', meaning: 'Điểm bắt đầu và kết thúc', example: { japanese: 'ハノイからホーチミンまで。', romaji: 'hanoi kara hoochimin made.', vietnamese: 'Từ Hà Nội đến Hồ Chí Minh.' } },
      { name: 'どうやって 行きますか (Đi bằng cách nào?)', meaning: 'Hỏi phương tiện', example: { japanese: 'どうやって行きますか。', romaji: 'douyatte ikimasu ka.', vietnamese: 'Đi bằng cách nào?' } },
      { name: 'どれくらい かかりますか (Mất bao lâu?)', meaning: 'Hỏi khoảng thời gian', example: { japanese: 'どれくらいかかりますか。', romaji: 'dorekura ikakarimasu ka.', vietnamese: 'Mất bao lâu?' } }
    ]
  },
  {
    id: 'g26',
    examples: [
      { japanese: 'えきから うちまで 10分です。', romaji: 'eki kara uchi made juppun desu.', vietnamese: 'Từ ga đến nhà mất 10 phút.' },
      { japanese: 'ハノイから ホーチミンまで 飛行機で 2時間くらいです。', romaji: 'hanoi kara hoochimin made hikouki de nijikan kurai desu.', vietnamese: 'Từ Hà Nội đến Hồ Chí Minh bằng máy bay mất khoảng 2 tiếng.' },
      { japanese: 'うちから 学校まで 自転車で 15分です。', romaji: 'uchi kara gakkou made jitensha de juugofun desu.', vietnamese: 'Từ nhà đến trường bằng xe đạp mất 15 phút.' },
      { japanese: '東京から 大阪まで 新幹線で 2時間半です。', romaji: 'toukyou kara oosaka made shinkansen de nijikanhan desu.', vietnamese: 'Từ Tokyo đến Osaka bằng Shinkansen mất 2 tiếng rưỡi.' },
      { japanese: '日本から ベトナムまで 飛行機で 6時間くらいです。', romaji: 'nihon kara betonamu made hikouki de rokujikan kurai desu.', vietnamese: 'Từ Nhật Bản đến Việt Nam bằng máy bay mất khoảng 6 tiếng.' },
      { japanese: '会社から 駅まで 歩いて 5分です。', romaji: 'kaisha kara eki made aruite gofun desu.', vietnamese: 'Từ công ty ra ga đi bộ mất 5 phút.' },
      { japanese: 'うちから 空港まで バスで 1時間くらいです。', romaji: 'uchi kara kuukou made basu de ichijikan kurai desu.', vietnamese: 'Từ nhà đến sân bay bằng xe buýt mất khoảng 1 tiếng.' },
      { japanese: 'スーパーから 家まで 車で 10分です。', romaji: 'suupaa kara ie made kuruma de juppun desu.', vietnamese: 'Từ siêu thị về nhà bằng ô tô mất 10 phút.' },
      { japanese: '郵便局から 銀行まで 3分くらいです。', romaji: 'yuubinkyoku kara ginkou made sanpun kurai desu.', vietnamese: 'Từ bưu điện đến ngân hàng mất khoảng 3 phút.' },
      { japanese: 'ここから そこまで 歩いて 20分です。', romaji: 'koko kara soko made aruite nijuppun desu.', vietnamese: 'Từ đây đến đó đi bộ mất 20 phút.' },
      { japanese: '大阪から 京都まで 電車で 30分です。', romaji: 'oosaka kara kyouto made densha de sanjuppun desu.', vietnamese: 'Từ Osaka đến Kyoto bằng tàu điện mất 30 phút.' },
      { japanese: '寮から 大学まで 10分くらいです。', romaji: 'ryou kara daigaku made juppun kurai desu.', vietnamese: 'Từ ký túc xá đến trường mất khoảng 10 phút.' },
      { japanese: '図書館から 公園まで 5分です。', romaji: 'toshokan kara kouen made gofun desu.', vietnamese: 'Từ thư viện đến công viên mất 5 phút.' },
      { japanese: 'ホテルから 駅まで タクシーで 15分くらいです。', romaji: 'hoteru kara eki made takushii de juugofun kurai desu.', vietnamese: 'Từ khách sạn đến ga bằng taxi mất khoảng 15 phút.' },
      { japanese: 'ホーチミンから ダラットまで 車で 6時間です。', romaji: 'hoochimin kara daratto made kuruma de rokujikan desu.', vietnamese: 'Từ Hồ Chí Minh đến Đà Lạt bằng ô tô mất 6 tiếng.' }
    ],
    relatedGrammars: [
      { name: 'N で ~Time です (Đi bằng N mất ~Time)', meaning: 'Thời gian đi lại bằng phương tiện', example: { japanese: 'バスで1時間です。', romaji: 'basu de ichijikan desu.', vietnamese: 'Đi bằng xe buýt mất 1 tiếng.' } },
      { name: 'N1 から N2 まで どのくらい ですか (Từ N1 đến N2 mất bao lâu?)', meaning: 'Hỏi khoảng thời gian', example: { japanese: 'ハノイからホーチミンまでどのくらいですか。', romaji: 'hanoi kara hoochimin made dono kurai desu ka.', vietnamese: 'Từ Hà Nội đến Hồ Chí Minh mất bao lâu?' } },
      { name: '歩いて ~Time です (Đi bộ mất ~Time)', meaning: 'Thời gian đi bộ', example: { japanese: '歩いて10分です。', romaji: 'aruite juppun desu.', vietnamese: 'Đi bộ mất 10 phút.' } },
      { name: 'Time かかります (Mất Time)', meaning: 'Tốn bao nhiêu thời gian', example: { japanese: '1時間かかります。', romaji: 'ichijikan kakarimasu.', vietnamese: 'Mất 1 tiếng.' } },
      { name: 'A から B まで (Từ A đến B)', meaning: 'Điểm bắt đầu và kết thúc', example: { japanese: '東京から大阪まで。', romaji: 'toukyou kara oosaka made.', vietnamese: 'Từ Tokyo đến Osaka.' } }
    ]
  },
  {
    id: 'g27',
    examples: [
      { japanese: 'バスで 1時間です。', romaji: 'basu de ichijikan desu.', vietnamese: 'Đi bằng xe buýt mất 1 tiếng.' },
      { japanese: '自転車で 15分です。', romaji: 'jitensha de juugofun desu.', vietnamese: 'Đi bằng xe đạp mất 15 phút.' },
      { japanese: '飛行機で 2時間くらいです。', romaji: 'hikouki de nijikan kurai desu.', vietnamese: 'Đi bằng máy bay mất khoảng 2 tiếng.' },
      { japanese: '電車で 30分です。', romaji: 'densha de sanjuppun desu.', vietnamese: 'Đi bằng tàu điện mất 30 phút.' },
      { japanese: '新幹線で 2時間半です。', romaji: 'shinkansen de nijikanhan desu.', vietnamese: 'Đi bằng Shinkansen mất 2 tiếng rưỡi.' },
      { japanese: '車で 10分です。', romaji: 'kuruma de juppun desu.', vietnamese: 'Đi bằng ô tô mất 10 phút.' },
      { japanese: 'タクシーで 20分くらいです。', romaji: 'takushii de nijuppun kurai desu.', vietnamese: 'Đi bằng taxi mất khoảng 20 phút.' },
      { japanese: 'バイクで 45分です。', romaji: 'baiku de yonjuugofun desu.', vietnamese: 'Đi bằng xe máy mất 45 phút.' },
      { japanese: '船で 3時間くらいです。', romaji: 'fune de sanjikan kurai desu.', vietnamese: 'Đi bằng tàu thủy mất khoảng 3 tiếng.' },
      { japanese: '地下鉄で 15分です。', romaji: 'chikatetsu de juugofun desu.', vietnamese: 'Đi bằng tàu điện ngầm mất 15 phút.' },
      { japanese: '新幹線で 3時間です。', romaji: 'shinkansen de sanjikan desu.', vietnamese: 'Đi bằng Shinkansen mất 3 tiếng.' },
      { japanese: 'バスで 40分くらいです。', romaji: 'basu de yonjuppun kurai desu.', vietnamese: 'Đi bằng xe buýt mất khoảng 40 phút.' },
      { japanese: '自転車で 25分です。', romaji: 'jitensha de nijugo fun desu.', vietnamese: 'Đi bằng xe đạp mất 25 phút.' },
      { japanese: '車で 5時間くらいです。', romaji: 'kuruma de gojikan kurai desu.', vietnamese: 'Đi bằng ô tô mất khoảng 5 tiếng.' },
      { japanese: '電車で 1時間半です。', romaji: 'densha de ichijikanhan desu.', vietnamese: 'Đi bằng tàu điện mất 1 tiếng rưỡi.' }
    ],
    relatedGrammars: [
      { name: 'N で 行きます (Đi bằng N)', meaning: 'Hành động di chuyển bằng phương tiện', example: { japanese: 'バスで学校へ行きます。', romaji: 'basu de gakkou e ikimasu.', vietnamese: 'Đến trường bằng xe buýt.' } },
      { name: '歩いて 行きます (Đi bộ)', meaning: 'Hành động đi bộ (không dùng de)', example: { japanese: '歩いて行きます。', romaji: 'aruite ikimasu.', vietnamese: 'Tôi đi bộ.' } },
      { name: 'どうやって 行きますか (Đi bằng cách nào?)', meaning: 'Hỏi phương tiện', example: { japanese: 'どうやって行きますか。', romaji: 'douyatte ikimasu ka.', vietnamese: 'Đi bằng cách nào?' } },
      { name: 'N1 から N2 まで Time (くらい) です (Từ N1 đến N2 mất ~Time)', meaning: 'Khoảng thời gian di chuyển', example: { japanese: 'うちから駅まで10分です。', romaji: 'uchi kara eki made juppun desu.', vietnamese: 'Từ nhà đến ga mất 10 phút.' } },
      { name: 'N で きます (Đến bằng N)', meaning: 'Hành động đến bằng phương tiện', example: { japanese: 'バスできました。', romaji: 'basu de kimashita.', vietnamese: 'Tôi đã đến bằng xe buýt.' } }
    ]
  },
  {
    id: 'g28',
    examples: [
      { japanese: 'ひこうきで 行きます。', romaji: 'hikouki de ikimasu.', vietnamese: 'Đi bằng máy bay.' },
      { japanese: '電車で うちへ 帰ります。', romaji: 'densha de uchi e kaerimasu.', vietnamese: 'Về nhà bằng tàu điện.' },
      { japanese: '歩いて 学校へ 行きます。', romaji: 'aruite gakkou e ikimasu.', vietnamese: 'Đi bộ đến trường.' },
      { japanese: 'バスで 会社へ 行きます。', romaji: 'basu de kaisha e ikimasu.', vietnamese: 'Đi đến công ty bằng xe buýt.' },
      { japanese: '自転車で スーパーへ 行きます。', romaji: 'jitensha de suupaa e ikimasu.', vietnamese: 'Đi đến siêu thị bằng xe đạp.' },
      { japanese: '新幹線で 東京へ 行きます。', romaji: 'shinkansen de toukyou e ikimasu.', vietnamese: 'Đi đến Tokyo bằng Shinkansen.' },
      { japanese: '車で デパートへ 行きます。', romaji: 'kuruma de depaato e ikimasu.', vietnamese: 'Đi đến trung tâm thương mại bằng ô tô.' },
      { japanese: 'タクシーで ホテルへ 帰ります。', romaji: 'takushii de hoteru e kaerimasu.', vietnamese: 'Về khách sạn bằng taxi.' },
      { japanese: 'バイクで 友達の家へ 行きます。', romaji: 'baiku de tomodachi no ie e ikimasu.', vietnamese: 'Đi đến nhà bạn bằng xe máy.' },
      { japanese: '船で 島へ 行きます。', romaji: 'fune de shima e ikimasu.', vietnamese: 'Đi ra đảo bằng tàu thủy.' },
      { japanese: '地下鉄で 駅へ 来ます。', romaji: 'chikatetsu de eki e kimasu.', vietnamese: 'Đến nhà ga bằng tàu điện ngầm.' },
      { japanese: '歩いて うちへ 帰ります。', romaji: 'aruite uchi e kaerimasu.', vietnamese: 'Đi bộ về nhà.' },
      { japanese: '車で 空港へ 行きます。', romaji: 'kuruma de kuukou e ikimasu.', vietnamese: 'Đi đến sân bay bằng ô tô.' },
      { japanese: 'バスで 病院へ 来ました。', romaji: 'basu de byouin e kimashita.', vietnamese: 'Đã đến bệnh viện bằng xe buýt.' },
      { japanese: '電車で 寮へ 帰ります。', romaji: 'densha de ryou e kaerimasu.', vietnamese: 'Về ký túc xá bằng tàu điện.' }
    ],
    relatedGrammars: [
      { name: 'N へ 行きます (Đi đến N)', meaning: 'Chỉ phương hướng di chuyển', example: { japanese: '日本へ行きます。', romaji: 'nihon e ikimasu.', vietnamese: 'Tôi đi Nhật Bản.' } },
      { name: 'だれと 行きますか (Đi với ai?)', meaning: 'Hỏi người cùng đi', example: { japanese: 'だれと行きますか。', romaji: 'dare to ikimasu ka.', vietnamese: 'Bạn đi với ai?' } },
      { name: 'いつ 行きますか (Khi nào đi?)', meaning: 'Hỏi thời gian', example: { japanese: 'いつ行きますか。', romaji: 'itsu ikimasu ka.', vietnamese: 'Khi nào bạn đi?' } },
      { name: '歩いて 行きます (Đi bộ)', meaning: 'Hành động đi bộ', example: { japanese: '歩いて行きます。', romaji: 'aruite ikimasu.', vietnamese: 'Tôi đi bộ.' } },
      { name: '何で 行きますか (Đi bằng gì?)', meaning: 'Hỏi phương tiện', example: { japanese: '何で行きますか。', romaji: 'nan de ikimasu ka.', vietnamese: 'Bạn đi bằng gì?' } }
    ]
  }
];

grammars.forEach(g => {
  // Use regex to find the examples array for this grammar id
  const exRegex = new RegExp(`(id:\\s*'${g.id}'[\\s\\S]*?examples:\\s*\\[)[\\s\\S]*?(\\]\\s*,\\s*relatedGrammars:)`);
  const newExs = g.examples.map(ex => `              { japanese: '${ex.japanese}', romaji: '${ex.romaji}', vietnamese: '${ex.vietnamese}' }`).join(',\n');
  content = content.replace(exRegex, `$1\n${newExs}\n            $2`);

  // Use regex to find the relatedGrammars array for this grammar id
  const rgRegex = new RegExp(`(id:\\s*'${g.id}'[\\s\\S]*?relatedGrammars:\\s*\\[)[\\s\\S]*?(\\]\\s*\\})`);
  const newRgs = g.relatedGrammars.map(rg => `              { name: '${rg.name}', meaning: '${rg.meaning}', example: { japanese: '${rg.example.japanese}', romaji: '${rg.example.romaji}', vietnamese: '${rg.example.vietnamese}' } }`).join(',\n');
  content = content.replace(rgRegex, `$1\n${newRgs}\n            $2`);
});

fs.writeFileSync(dataPath, content, 'utf-8');
console.log('Successfully updated examples and related grammars for g24-g28!');
