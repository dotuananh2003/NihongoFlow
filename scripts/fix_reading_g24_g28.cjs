const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../src/data/grammarData.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

const grammars = [
  {
    id: 'g24',
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
    id: 'g25',
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
    id: 'g26',
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
    id: 'g27',
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
    id: 'g28',
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
];

grammars.forEach(g => {
  // Replace examples array
  const exRegex = new RegExp(`(id:\\s*'${g.id}'[\\s\\S]*?examples:\\s*\\[)[\\s\\S]*?(\\]\\s*,\\s*relatedGrammars:)`);
  const newExs = g.examples.map(ex => `              { japanese: '${ex.japanese}', reading: '${ex.reading}', romaji: '${ex.romaji}', vietnamese: '${ex.vietnamese}' }`).join(',\n');
  content = content.replace(exRegex, `$1\n${newExs}\n            $2`);

  // Replace relatedGrammars array
  const rgRegex = new RegExp(`(id:\\s*'${g.id}'[\\s\\S]*?relatedGrammars:\\s*\\[)[\\s\\S]*?(\\]\\s*\\})`);
  const newRgs = g.relatedGrammars.map(rg => `              { name: '${rg.name}', meaning: '${rg.meaning}', example: { japanese: '${rg.example.japanese}', reading: '${rg.example.reading}', romaji: '${rg.example.romaji}', vietnamese: '${rg.example.vietnamese}' } }`).join(',\n');
  content = content.replace(rgRegex, `$1\n${newRgs}\n            $2`);
});

fs.writeFileSync(dataPath, content, 'utf-8');
console.log('Successfully added reading property to examples and related grammars for g24-g28!');
