import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Mic,
  Play,
  Pause,
  Square,
  Volume2,
  Sparkles,
  Award,
  ArrowRight,
  Headphones,
  AlertCircle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Crown,
  Lock,
  Radio,
  Check
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

// ==========================================
// 1. LESSON DATA & TOKEN DEFINITIONS (5 LESSONS)
// ==========================================
interface SentenceData {
  jp: string;
  romaji: string;
  vi: string;
  tokens: string[];
}

const lessonData: Record<string, { title: string; titleVi: string; desc: string; sentences: SentenceData[] }> = {
  'lesson-1': {
    title: 'ワットさんと さくら大学',
    titleVi: 'Thầy Watt và Đại học Sakura',
    desc: 'Giới thiệu trường học, thời gian biểu làm việc giảng dạy và bữa trưa ở căn tin.',
    sentences: [
      {
        jp: 'おはようございます。私はワットです。',
        romaji: 'Ohayou gozaimasu. Watashi wa Watto desu.',
        vi: 'Chào buổi sáng. Tôi là Watt.',
        tokens: ['おはようございます', '私', 'は', 'ワット', 'です']
      },
      {
        jp: 'さくら大学の教師です。',
        romaji: 'Sakura daigaku no kyoushi desu.',
        vi: 'Tôi là giáo viên của Đại học Sakura.',
        tokens: ['さくら大学', 'の', '教師', 'です']
      },
      {
        jp: 'さくら大学は大きい大学です。',
        romaji: 'Sakura daigaku wa ookii daigaku desu.',
        vi: 'Đại học Sakura là một trường đại học lớn.',
        tokens: ['さくら大学', 'は', '大きい', '大学', 'です']
      },
      {
        jp: '毎日、九時から五時まで働きます。',
        romaji: 'Mainichi, kuji kara goji made hatarakimasu.',
        vi: 'Mỗi ngày, tôi làm việc từ 9 giờ đến 5 giờ.',
        tokens: ['毎日', '九時', 'から', '五時', 'まで', '働きます']
      },
      {
        jp: '私の専門はコンピューターです。',
        romaji: 'Watashi no senmon wa konpyuutaa desu.',
        vi: 'Chuyên môn của tôi là máy tính.',
        tokens: ['私', 'の', '専門', 'は', 'コンピューター', 'です']
      },
      {
        jp: '昼休みは十二時から一時までです。',
        romaji: 'Hiruyasumi wa juuniji kara ichiji made desu.',
        vi: 'Giờ nghỉ trưa là từ 12 giờ đến 1 giờ.',
        tokens: ['昼休み', 'は', '十二時', 'から', '一時', 'まで', 'です']
      },
      {
        jp: '食堂で昼ごはんを食べます。',
        romaji: 'Shokudou de hirugohan o tabemasu.',
        vi: 'Tôi ăn trưa ở nhà ăn.',
        tokens: ['食堂', 'で', '昼ごはん', 'を', '食べます']
      },
      {
        jp: '食堂のカレーは安くておいしいです。',
        romaji: 'Shokudou no karee wa yasukute oishii desu.',
        vi: 'Món cà ri ở nhà ăn vừa rẻ vừa ngon.',
        tokens: ['食堂', 'の', 'カレー', 'は', '安くて', 'おいしい', 'です']
      },
      {
        jp: '午後も授業があります。',
        romaji: 'Gogo mo jugyou ga arimasu.',
        vi: 'Buổi chiều tôi cũng có tiết học.',
        tokens: ['午後', 'も', '授業', 'が', 'あります']
      },
      {
        jp: '今日は忙しい一日です。',
        romaji: 'Kyou wa isogashii ichinichi desu.',
        vi: 'Hôm nay là một ngày bận rộn.',
        tokens: ['今日', 'は', '忙しい', '一日', 'です']
      }
    ]
  },
  'lesson-2': {
    title: '土曜日と日曜日',
    titleVi: 'Thứ Bảy và Chủ Nhật',
    desc: 'Lịch cuối tuần thư thái, chuẩn bị sách du lịch Kyoto và mua quà lưu niệm.',
    sentences: [
      {
        jp: '土曜日と日曜日、私は休みです。',
        romaji: 'Doyoubi to nichiyoubi, watashi wa yasumi desu.',
        vi: 'Thứ Bảy và Chủ Nhật, tôi được nghỉ.',
        tokens: ['土曜日', 'と', '日曜日', '私', 'は', '休み', 'です']
      },
      {
        jp: '土曜日の朝、図書館へ行きます。',
        romaji: 'Doyoubi no asa, toshokan e ikimasu.',
        vi: 'Sáng thứ Bảy, tôi đi đến thư viện.',
        tokens: ['土曜日', 'の', '朝', '図書館', 'へ', '行きます']
      },
      {
        jp: '図書館で旅行の本を借ります。',
        romaji: 'Toshokan de ryokou no hon o karimasu.',
        vi: 'Tôi mượn sách du lịch ở thư viện.',
        tokens: ['図書館', 'で', '旅行', 'の', '本', 'を', '借ります']
      },
      {
        jp: '来月、京都へ旅行に行きますから。',
        romaji: 'Raigetsu, Kyouto e ryokou ni ikimasu kara.',
        vi: 'Bởi vì tháng sau tôi sẽ đi du lịch Kyoto.',
        tokens: ['来月', '京都', 'へ', '旅行', 'に', '行きます', 'から']
      },
      {
        jp: '午後はデパートで買い物をします。',
        romaji: 'Gogo wa depaato de kaimono o shimasu.',
        vi: 'Buổi chiều tôi đi mua sắm ở trung tâm thương mại.',
        tokens: ['午後', 'は', 'デパート', 'で', '買い物', 'を', 'します']
      },
      {
        jp: '友達のお土産を買いたいです。',
        romaji: 'Tomodachi no omiyage o kaitai desu.',
        vi: 'Tôi muốn mua quà lưu niệm cho bạn bè.',
        tokens: ['友達', 'の', 'お土産', 'を', '買いたいです']
      },
      {
        jp: '綺麗な扇子を買いました。',
        romaji: 'Kirei na sensu o kaimashita.',
        vi: 'Tôi đã mua một chiếc quạt xếp rất đẹp.',
        tokens: ['綺麗', 'な', '扇子', 'を', '買いました']
      },
      {
        jp: '日曜日はうちでのんびりします。',
        romaji: 'Nichiyoubi wa uchi de nonbiri shimasu.',
        vi: 'Chủ Nhật tôi thong thả ở nhà.',
        tokens: ['日曜日', 'は', 'うち', 'で', 'のんびり', 'します']
      },
      {
        jp: '家族と一緒にテレビを見ます。',
        romaji: 'Kazoku to issho ni terebi o mimasu.',
        vi: 'Tôi xem tivi cùng với gia đình.',
        tokens: ['家族', 'と', '一緒', 'に', 'テレビ', 'を', '見ます']
      },
      {
        jp: '週末はいつも楽しいです。',
        romaji: 'Shuumatsu wa itsumo tanoshii desu.',
        vi: 'Cuối tuần lúc nào cũng vui vẻ.',
        tokens: ['週末', 'は', 'いつも', '楽しい', 'です']
      }
    ]
  },
  'lesson-3': {
    title: 'ミラーさんの一日',
    titleVi: 'Sinh hoạt hằng ngày',
    desc: 'Thói quen đi làm trong tuần và nghỉ ngơi.',
    sentences: [
      {
        jp: '毎朝七時に起きます。',
        romaji: 'Maiasa shichiji ni okimasu.',
        vi: 'Mỗi sáng tôi thức dậy lúc 7 giờ.',
        tokens: ['毎朝', '七時', 'に', '起きます']
      },
      {
        jp: '朝ごはんを食べて、会社へ行きます。',
        romaji: 'Asagohan o tabete, kaisha e ikimasu.',
        vi: 'Tôi ăn sáng rồi đi đến công ty.',
        tokens: ['朝ごはん', 'を', '食べて', '会社', 'へ', '行きます']
      },
      {
        jp: '会社は八時半から五時半までです。',
        romaji: 'Kaisha wa hachijihan kara gojihan made desu.',
        vi: 'Công ty làm việc từ 8 rưỡi đến 5 rưỡi.',
        tokens: ['会社', 'は', '八時半', 'から', '五時半', 'まで', 'です']
      },
      {
        jp: '昼休みは十二時からです。',
        romaji: 'Hiruyasumi wa juuniji kara desu.',
        vi: 'Giờ nghỉ trưa bắt đầu từ 12 giờ.',
        tokens: ['昼休み', 'は', '十二時', 'から', 'です']
      },
      {
        jp: 'いつも会社の食堂で昼ごはんを食べます。',
        romaji: 'Itsumo kaisha no shokudou de hirugohan o tabemasu.',
        vi: 'Tôi luôn ăn trưa ở nhà ăn của công ty.',
        tokens: ['いつも', '会社', 'の', '食堂', 'で', '昼ごはん', 'を', '食べます']
      },
      {
        jp: '仕事のあと、スーパーへ行きます。',
        romaji: 'Shigoto no ato, suupaa e ikimasu.',
        vi: 'Sau khi làm việc, tôi đi siêu thị.',
        tokens: ['仕事', 'の', 'あと', 'スーパー', 'へ', '行きます']
      },
      {
        jp: 'うちで晩ごはんを作ります。',
        romaji: 'Uchi de bangohan o tsukurimasu.',
        vi: 'Tôi nấu bữa tối ở nhà.',
        tokens: ['うち', 'で', '晩ごはん', 'を', '作ります']
      },
      {
        jp: '時々友達と一緒にビールを飲みます。',
        romaji: 'Tokidoki tomodachi to issho ni biiru o nomimasu.',
        vi: 'Thỉnh thoảng tôi uống bia cùng với bạn bè.',
        tokens: ['時々', '友達', 'と', '一緒', 'に', 'ビール', 'を', '飲みます']
      },
      {
        jp: '夜、少し日本語を勉強します。',
        romaji: 'Yoru, sukoshi nihongo o benkyou shimasu.',
        vi: 'Buổi tối, tôi học tiếng Nhật một chút.',
        tokens: ['夜', '少し', '日本語', 'を', '勉強します']
      },
      {
        jp: '十一時半に寝ます。',
        romaji: 'Juuichijihan ni nemasu.',
        vi: 'Tôi đi ngủ lúc 11 giờ rưỡi.',
        tokens: ['十一時半', 'に', '寝ます']
      }
    ]
  },
  'lesson-4': {
    title: 'あたらしい うち',
    titleVi: 'Nhà ở',
    desc: 'Khu phố yên tĩnh với công viên, thư viện và quán cà phê.',
    sentences: [
      {
        jp: '私の新しい家は静かな町にあります。',
        romaji: 'Watashi no atarashii ie wa shizuka na machi ni arimasu.',
        vi: 'Nhà mới của tôi nằm ở một khu phố yên tĩnh.',
        tokens: ['私', 'の', '新しい', '家', 'は', '静か', 'な', '町', 'に', 'あります']
      },
      {
        jp: '家の近くに広い公園があります。',
        romaji: 'Ie no chikaku ni hiroi kouen ga arimasu.',
        vi: 'Gần nhà có một công viên rộng.',
        tokens: ['家', 'の', '近く', 'に', '広い', '公園', 'が', 'あります']
      },
      {
        jp: '公園の隣に図書館があります。',
        romaji: 'Kouen no tonari ni toshokan ga arimasu.',
        vi: 'Cạnh công viên là thư viện.',
        tokens: ['公園', 'の', '隣', 'に', '図書館', 'が', 'あります']
      },
      {
        jp: '私はよく図書館で本を読みます。',
        romaji: 'Watashi wa yoku toshokan de hon o yomimasu.',
        vi: 'Tôi thường xuyên đọc sách ở thư viện.',
        tokens: ['私', 'は', 'よく', '図書館', 'で', '本', 'を', '読みます']
      },
      {
        jp: '駅の前に便利なスーパーがあります。',
        romaji: 'Eki no mae ni benri na suupaa ga arimasu.',
        vi: 'Trước nhà ga có một siêu thị tiện lợi.',
        tokens: ['駅', 'の', '前', 'に', '便利', 'な', 'スーパー', 'が', 'あります']
      },
      {
        jp: 'おしゃれなカフェもたくさんあります。',
        romaji: 'Oshare na kafe mo takusan arimasu.',
        vi: 'Cũng có rất nhiều quán cà phê phong cách.',
        tokens: ['おしゃれ', 'な', 'カフェ', 'も', 'たくさん', 'あります']
      },
      {
        jp: '週末, カフェでコーヒーを飲みます。',
        romaji: 'Shuumatsu, kafe de koohii o nomimasu.',
        vi: 'Cuối tuần, tôi uống cà phê ở quán.',
        tokens: ['週末', 'カフェ', 'で', 'コーヒー', 'を', '飲みます']
      },
      {
        jp: 'この町はとても便利で綺麗です。',
        romaji: 'Kono machi wa totemo benri de kirei desu.',
        vi: 'Khu phố này rất tiện lợi và sạch đẹp.',
        tokens: ['この', '町', 'は', 'とても', '便利', 'で', '綺麗', 'です']
      },
      {
        jp: '新しい生活がとても楽しいです。',
        romaji: 'Atarashii seikatsu ga totemo tanoshii desu.',
        vi: 'Cuộc sống mới rất là vui vẻ.',
        tokens: ['新しい', '生活', 'が', 'とても', '楽しい', 'です']
      },
      {
        jp: 'みなさん、ぜひ遊びに来てください。',
        romaji: 'Minasan, zehi asobi ni kite kudasai.',
        vi: 'Mọi người nhất định hãy đến chơi nhé.',
        tokens: ['みなさん', 'ぜひ', '遊び', 'に', '来て', 'ください']
      }
    ]
  },
  'lesson-5': {
    title: 'スーパーを くらべる',
    titleVi: 'Mua sắm',
    desc: 'So sánh ba siêu thị gần nhà về giá cả và hàng hóa.',
    sentences: [
      {
        jp: '私の家の近くにスーパーが三つあります。',
        romaji: 'Watashi no ie no chikaku ni suupaa ga mittsu arimasu.',
        vi: 'Gần nhà tôi có ba siêu thị.',
        tokens: ['私', 'の', '家', 'の', '近く', 'に', 'スーパー', 'が', '三つ', 'あります']
      },
      {
        jp: 'Aスーパーは一番大きくて安いです。',
        romaji: 'Ee suupaa wa ichiban ookikute yasui desu.',
        vi: 'Siêu thị A lớn nhất và rẻ nhất.',
        tokens: ['Aスーパー', 'は', '一番', '大きくて', '安い', 'です']
      },
      {
        jp: 'でも、駅から少し遠いです。',
        romaji: 'Demo, eki kara sukoshi tooi desu.',
        vi: 'Nhưng mà hơi xa nhà ga một chút.',
        tokens: ['でも', '駅', 'から', '少し', '遠い', 'です']
      },
      {
        jp: 'Bスーパーは駅のすぐ隣にあります。',
        romaji: 'Bii suupaa wa eki no sugu tonari ni arimasu.',
        vi: 'Siêu thị B nằm ngay cạnh nhà ga.',
        tokens: ['Bスーパー', 'は', '駅', 'の', 'すぐ', '隣', 'に', 'あります']
      },
      {
        jp: '値段は少し高いですが、とても便利です。',
        romaji: 'Nedan wa sukoshi takai desu ga, totemo benri desu.',
        vi: 'Giá cả hơi cao một chút nhưng rất tiện lợi.',
        tokens: ['値段', 'は', '少し', '高い', 'です', 'が', 'とても', '便利', 'です']
      },
      {
        jp: 'Cスーパーは野菜と果物が新鮮です。',
        romaji: 'Shii suupaa wa yasai to kudamono ga shinsen desu.',
        vi: 'Siêu thị C có rau và hoa quả tươi.',
        tokens: ['Cスーパー', 'は', '野菜', 'と', '果物', 'が', '新鮮', 'です']
      },
      {
        jp: '私はよくCスーパーで野菜を買います。',
        romaji: 'Watashi wa yoku shii suupaa de yasai o kaimasu.',
        vi: 'Tôi thường mua rau ở siêu thị C.',
        tokens: ['私', 'は', 'よく', 'Cスーパー', 'で', '野菜', 'を', '買います']
      },
      {
        jp: 'お肉はいつもAスーパーで買います。',
        romaji: 'Oniku wa itsumo ee suupaa de kaimasu.',
        vi: 'Thịt thì tôi luôn mua ở siêu thị A.',
        tokens: ['お肉', 'は', 'いつも', 'Aスーパー', 'で', '買います']
      },
      {
        jp: 'Bスーパーは仕事の帰りに寄ります。',
        romaji: 'Bii suupaa wa shigoto no kaeri ni yorimasu.',
        vi: 'Tôi ghé siêu thị B trên đường đi làm về.',
        tokens: ['Bスーパー', 'は', '仕事', 'の', '帰り', 'に', '寄ります']
      },
      {
        jp: '買い物の時間は楽しいですね。',
        romaji: 'Kaimono no jikan wa tanoshii desu ne.',
        vi: 'Thời gian mua sắm thật là vui nhỉ.',
        tokens: ['買い物', 'の', '時間', 'は', '楽しい', 'ですね']
      }
    ]
  }
};

// Map chuẩn phiên âm Hiragana cho từng token/từ vựng đơn lẻ để Web Speech Synthesis phát âm chính xác
const tokenReadingMap: Record<string, string> = {
  '町': 'まち',
  '私': 'わたし',
  '家': 'いえ',
  '新しい': 'あたらしい',
  '静か': 'しずか',
  '公園': 'こうえん',
  '広い': 'ひろい',
  '隣': 'となり',
  '図書館': 'としょかん',
  '本': 'ほん',
  '読みます': 'よみます',
  '駅': 'えき',
  '前': 'まえ',
  '便利': 'べんり',
  '綺麗': 'きれい',
  '生活': 'せいかつ',
  '楽しい': 'たのしい',
  '遊び': 'あそび',
  '来て': 'きて',
  '今日': 'きょう',
  '忙しい': 'いそがしい',
  '一日': 'いちにち',
  '土曜日': 'どようび',
  '日曜日': 'にちようび',
  '休み': 'やすみ',
  '朝': 'あさ',
  '旅行': 'りょこう',
  '借ります': 'かります',
  '来月': 'らいげつ',
  '京都': 'きょうと',
  '行きます': 'いきます',
  '午後': 'ごご',
  '買い物': 'かいもの',
  '友達': 'ともだち',
  'お土産': 'おみやげ',
  '買いたいです': 'かいたいです',
  '扇子': 'せんす',
  '買いました': 'かいました',
  '家族': 'かぞく',
  '一緒': 'いっしょ',
  '見ます': 'みます',
  '週末': 'しゅうまつ',
  '毎朝': 'まいあさ',
  '七時': 'しちじ',
  '起きます': 'おきます',
  '朝ごはん': 'あさごはん',
  '食べて': 'たべて',
  '会社': 'かいしゃ',
  '八時半': 'はちじはん',
  '五時半': 'ごじはん',
  '昼休み': 'ひるやすみ',
  '十二時': 'じゅうにじ',
  '食堂': 'しょくどう',
  '昼ごはん': 'ひるごはん',
  '食べます': 'たべます',
  '仕事': 'しごと',
  '晩ごはん': 'ばんごはん',
  '作ります': 'つくります',
  '時々': 'ときどき',
  '飲みます': 'のみます',
  '夜': 'よる',
  '少し': 'すこし',
  '日本語': 'にほんご',
  '勉強します': 'べんきょうします',
  '十一時半': 'じゅういちじはん',
  '寝ます': 'ねます',
  '近く': 'ちかく',
  '三つ': 'みっつ',
  '一番': 'いちばん',
  '大きくて': 'おおきくて',
  '安い': 'やすい',
  '遠い': 'とおい',
  '値段': 'ねだん',
  '高い': 'たかい',
  '野菜': 'やさい',
  '果物': 'くだもの',
  '新鮮': 'しんせん',
  '買います': 'かいます',
  'お肉': 'おにく',
  '帰り': 'かえり',
  '寄ります': 'よります',
  '時間': 'じかん',
  'さくら大学': 'さくらだいがく',
  '教師': 'きょうし',
  '大きい': 'おおきい',
  '大学': 'だいがく',
  '毎日': 'まいにち',
  '九時': 'くじ',
  '五時': 'ごじ',
  '働きます': 'はたらきます',
  '専門': 'せんもん',
  '一時': 'いちじ',
  '安くて': 'やすくて',
  '授業': 'じゅぎょう',

  // --- CÁC BIẾN THỂ TỪ ĐỒNG ÂM HOẶC CHỮ SỐ (Dành riêng cho STT) ---
  // STT đôi khi trả về Kanji khác hoặc chữ số thay vì Kanji chuẩn trong câu mẫu
  '街': 'まち',         // Đồng âm với 町
  '買物': 'かいもの',      // Thay cho 買い物
  '友だち': 'ともだち',    // Thay cho 友達
  '観ます': 'みます',      // Thay cho 見ます
  '視ます': 'みます',      // Thay cho 見ます
  '7時': 'しちじ',        // Thay cho 七時
  '8時半': 'はちじはん',   // Thay cho 八時半
  '5時半': 'ごじはん',     // Thay cho 五時半
  '12時': 'じゅうにじ',    // Thay cho 十二時
  '9時': 'くじ',          // Thay cho 九時
  '5時': 'ごじ',          // Thay cho 五時
  '1時': 'いちじ',        // Thay cho 一時
  '3つ': 'みっつ',        // Thay cho 三つ
  '1番': 'いちばん',      // Thay cho 一番
  '昼ご飯': 'ひるごはん',   // Thay cho 昼ごはん
  '晩ご飯': 'ばんごはん',   // Thay cho 晩ごはん
  '朝ご飯': 'あさごはん',   // Thay cho 朝ごはん
  '良く': 'よく',         // Thay cho よく
};

// ==========================================
// 2. SOUNDWAVE ANIMATION COMPONENT (COMPACT)
// ==========================================
const SoundWaveBars = () => {
  const bars = [
    { min: 4, max: 13, dur: 0.45, delay: 0 },
    { min: 6, max: 19, dur: 0.38, delay: 0.1 },
    { min: 8, max: 25, dur: 0.52, delay: 0.2 },
    { min: 10, max: 29, dur: 0.36, delay: 0.05 },
    { min: 8, max: 25, dur: 0.48, delay: 0.22 },
    { min: 6, max: 19, dur: 0.4, delay: 0.12 },
    { min: 4, max: 13, dur: 0.44, delay: 0.18 },
  ];

  return (
    <div className="flex items-center justify-center gap-[3.5px] h-8 px-1">
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-white shadow-xs"
          animate={{
            height: [bar.min, bar.max, bar.min],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: bar.dur,
            delay: bar.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// 3. ERROR & TOKEN ANALYSIS ALGORITHMS
// ==========================================
export interface TokenFeedback {
  text: string;
  status: 'correct' | 'mispronounced' | 'missing';
  advice?: string;
}

export interface AnalysisResult {
  score: number;
  spokenText: string;
  tokenFeedbacks: TokenFeedback[];
  errorTips: string[];
}

function cleanText(text: string): string {
  return text.replace(/[、。？！\s.,?!]/g, '').trim().toLowerCase();
}

function calculateSimilarity(str1: string, str2: string): number {
  const s1 = cleanText(str1);
  const s2 = cleanText(str2);

  if (!s1 || !s2) return 0;
  if (s1 === s2) return 100;

  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator,
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  const similarity = Math.max(0, (1 - distance / maxLength) * 100);
  return Math.min(100, Math.round(similarity * 1.12));
}

function analyzeSentence(expectedTokens: string[], spokenText: string, fullExpectedText: string): AnalysisResult {
  // Chuẩn hoá cả text thu âm và text gốc sang Hiragana (với các từ đã biết) để so sánh chính xác hơn (tránh lỗi nhận diện Kanji/Hiragana)
  let normalizedSpoken = spokenText;
  let normalizedExpected = fullExpectedText;

  const sortedTokens = Object.keys(tokenReadingMap).sort((a, b) => b.length - a.length);
  sortedTokens.forEach(t => {
    normalizedSpoken = normalizedSpoken.split(t).join(tokenReadingMap[t]);
    normalizedExpected = normalizedExpected.split(t).join(tokenReadingMap[t]);
  });

  const cleanedSpoken = cleanText(normalizedSpoken);
  const cleanedFullExpected = cleanText(normalizedExpected);

  if (cleanedSpoken === cleanedFullExpected) {
    return {
      score: 100,
      spokenText,
      tokenFeedbacks: expectedTokens.map(t => ({ text: t, status: 'correct' })),
      errorTips: ['Tuyệt vời! Bạn đã phát âm chuẩn xác 100% tất cả các từ và ngữ điệu.']
    };
  }

  const tokenFeedbacks: TokenFeedback[] = [];
  const errorTips: string[] = [];

  let searchIndex = 0;
  let correctCount = 0;

  expectedTokens.forEach((token) => {
    const hiraganaToken = tokenReadingMap[token] ? cleanText(tokenReadingMap[token]) : cleanText(token);
    const pos = cleanedSpoken.indexOf(hiraganaToken, searchIndex);

    if (pos !== -1) {
      tokenFeedbacks.push({ text: token, status: 'correct' });
      searchIndex = pos + hiraganaToken.length;
      correctCount++;
    } else {
      const isSubInSpoken = cleanedSpoken.includes(hiraganaToken);
      if (isSubInSpoken) {
        tokenFeedbacks.push({
          text: token,
          status: 'mispronounced',
          advice: `Vấp vị trí: 「${token}」 xuất hiện sai thứ tự trong câu.`
        });
        errorTips.push(`Vấp trật tự từ ở 「${token}」. Hãy giữ nhịp đọc liền mạch theo câu mẫu.`);
      } else {
        const hasSmallTsu = token.includes('っ') || token.includes('ッ');
        const hasLongVowel = token.includes('ー') || token.includes('おう') || token.includes('えい');
        const isParticleWa = token === 'は';
        const isParticleE = token === 'へ';
        const isParticleO = token === 'を';

        let advice = `Phát âm chưa chuẩn hoặc bị nuốt âm ở từ 「${token}」.`;
        if (hasSmallTsu) {
          advice = `Từ 「${token}」 có âm ngắt 'っ' - hãy ngắt hơi 1 nhịp trước khi bật âm tiếp theo.`;
          errorTips.push(`Lưu ý âm ngắt: Trong từ 「${token}」, cần giữ hơi 1 nhịp trước khi đọc âm tiếp theo.`);
        } else if (hasLongVowel) {
          advice = `Từ 「${token}」 có trường âm - hãy kéo dài nguyên âm 2 nhịp.`;
          errorTips.push(`Lưu ý trường âm: Kéo dài nguyên âm trong từ 「${token}」 đủ 2 nhịp.`);
        } else if (isParticleWa) {
          advice = `Trợ từ 「は」 đọc là 'wa', tránh đọc nhầm thành 'ha'.`;
          errorTips.push(`Trợ từ 「は」: Cần phát âm là 'wa', không phải 'ha'.`);
        } else if (isParticleE) {
          advice = `Trợ từ chỉ hướng 「へ」 đọc là 'e', không đọc là 'he'.`;
          errorTips.push(`Trợ từ chỉ hướng 「へ」: Phát âm là 'e'.`);
        } else if (isParticleO) {
          advice = `Trợ từ 「を」 đọc là 'o'.`;
          errorTips.push(`Trợ từ 「を」: Phát âm chuẩn là 'o'.`);
        } else {
          errorTips.push(`Chưa nhận diện rõ từ 「${token}」 (có thể bị vấp hoặc đọc thiếu). Bấm vào từ để nghe lại.`);
        }

        tokenFeedbacks.push({
          text: token,
          status: 'mispronounced',
          advice
        });
      }
    }
  });

  const baseSim = calculateSimilarity(normalizedSpoken, normalizedExpected);
  const tokenSim = Math.round((correctCount / expectedTokens.length) * 100);
  const score = Math.max(30, Math.round((baseSim * 0.6) + (tokenSim * 0.4)));

  if (errorTips.length === 0 && score < 90) {
    errorTips.push('Ngữ điệu tổng thể chưa đủ tự nhiên. Hãy bấm nghe lại câu mẫu để bắt chước độ luyến âm.');
  }

  return {
    score,
    spokenText,
    tokenFeedbacks,
    errorTips
  };
}

interface SentenceRecord {
  score?: number;
  spokenText?: string;
  userAudioUrl?: string;
  attempts: number;
  analysis?: AnalysisResult;
}

export const ShadowingPractice = () => {
  const { user } = useAuth();
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();

  const currentLessonId = lessonId || 'lesson-1';
  const lesson = lessonData[currentLessonId] || lessonData['lesson-1'];

  // Current active sentence index
  const [activeSentence, setActiveSentence] = useState<number>(0);

  // Practice state
  const [speed, setSpeed] = useState<number>(1.0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);

  // Recording states
  const [recordingIndex, setRecordingIndex] = useState<number | null>(null);
  const [results, setResults] = useState<Record<number, SentenceRecord>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userPlayingAudioIndex, setUserPlayingAudioIndex] = useState<number | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [activeWordSpeech, setActiveWordSpeech] = useState<string | null>(null);

  // Helper: Sentences 6 to 10 (index >= 5) are locked for Premium
  const isPremiumSentence = (idx: number) => !user?.hasPremium && idx >= 5;

  const openUpgradeModal = () => {
    window.dispatchEvent(new CustomEvent('jp-forus:open-upgrade'));
  };

  // Refs for audio handling
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Speech Recognition on mount
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ja-JP';
      recognitionRef.current = recognition;
    }

    return () => {
      window.speechSynthesis?.cancel();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const completedCount = Object.keys(results).filter(k => (results[Number(k)]?.score || 0) > 0).length;
  const averageScore = completedCount > 0
    ? Math.round(Object.values(results).reduce((acc, curr) => acc + (curr.score || 0), 0) / completedCount)
    : 0;

  useEffect(() => {
    if (completedCount === lesson.sentences.length && completedCount > 0) {
      setShowCompletionModal(true);
    }
  }, [completedCount, lesson.sentences.length]);

  // -------------------------------------------------------------
  // TTS PRONUNCIATION
  // -------------------------------------------------------------
  const speakSentence = (index: number, onEnd?: () => void) => {
    if (!('speechSynthesis' in window)) {
      setErrorMessage('Trình duyệt không hỗ trợ phát âm tự động.');
      return;
    }

    window.speechSynthesis.cancel();
    setPlayingIndex(index);
    setActiveSentence(index);

    const sentence = lesson.sentences[index];
    
    // Thay thế các Hán tự bằng Hiragana để ép bộ đọc TTS phát âm chuẩn xác ngữ cảnh (vd: 町 -> まち)
    let textToSpeak = sentence.jp;
    const sortedTokens = Object.keys(tokenReadingMap).sort((a, b) => b.length - a.length);
    sortedTokens.forEach(token => {
      textToSpeak = textToSpeak.split(token).join(tokenReadingMap[token]);
    });

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ja-JP';
    utterance.rate = speed;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.name.includes('Japanese'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onend = () => {
      setPlayingIndex(null);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      setPlayingIndex(null);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  };

  const speakSingleWord = (word: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setActiveWordSpeech(word);

    const cleanWord = word.trim();
    const textToSpeak = tokenReadingMap[cleanWord] || cleanWord;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.7;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.name.includes('Japanese'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onend = () => setActiveWordSpeech(null);
    utterance.onerror = () => setActiveWordSpeech(null);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      window.speechSynthesis.cancel();
      setIsPlayingAll(false);
      setPlayingIndex(null);
      return;
    }

    setIsPlayingAll(true);
    let idx = 0;

    const playNext = () => {
      if (idx < lesson.sentences.length) {
        speakSentence(idx, () => {
          idx += 1;
          playNext();
        });
      } else {
        setIsPlayingAll(false);
        setPlayingIndex(null);
      }
    };

    playNext();
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setPlayingIndex(null);
    setIsPlayingAll(false);
  };

  // -------------------------------------------------------------
  // RECORDING & SPEECH RECOGNITION (MIC)
  // -------------------------------------------------------------
  const startRecording = async (index: number) => {
    if (isPremiumSentence(index)) {
      openUpgradeModal();
      return;
    }

    setErrorMessage(null);
    window.speechSynthesis.cancel();
    setPlayingIndex(null);
    setIsPlayingAll(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());

        setResults(prev => ({
          ...prev,
          [index]: {
            ...prev[index],
            userAudioUrl: audioUrl,
            attempts: (prev[index]?.attempts || 0) + 1
          }
        }));
      };

      mediaRecorder.start();
      setRecordingIndex(index);
      setActiveSentence(index);

      if (recognitionRef.current) {
        const recognition = recognitionRef.current;
        recognition.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          const currentSentenceObj = lesson.sentences[index];
          const analysis = analyzeSentence(currentSentenceObj.tokens, spokenText, currentSentenceObj.jp);

          setResults(prev => ({
            ...prev,
            [index]: {
              ...prev[index],
              spokenText,
              score: Math.max(analysis.score, prev[index]?.score || 0),
              analysis,
              attempts: (prev[index]?.attempts || 0) + 1
            }
          }));
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          if (event.error === 'no-speech') {
            const currentSentenceObj = lesson.sentences[index];
            const fallbackAnalysis = analyzeSentence(currentSentenceObj.tokens, '', currentSentenceObj.jp);
            setResults(prev => ({
              ...prev,
              [index]: {
                ...prev[index],
                spokenText: '(Chưa nhận diện rõ âm thanh)',
                score: 50,
                analysis: fallbackAnalysis,
                attempts: (prev[index]?.attempts || 0) + 1
              }
            }));
          }
        };

        recognition.onend = () => {
          stopRecording();
        };

        recognition.start();
      } else {
        setTimeout(() => {
          const currentSentenceObj = lesson.sentences[index];
          const simAnalysis = analyzeSentence(currentSentenceObj.tokens, currentSentenceObj.jp, currentSentenceObj.jp);
          setResults(prev => ({
            ...prev,
            [index]: {
              ...prev[index],
              spokenText: currentSentenceObj.jp,
              score: 95,
              analysis: simAnalysis,
              attempts: (prev[index]?.attempts || 0) + 1
            }
          }));
        }, 2000);
      }
    } catch (err) {
      console.error('Microphone error:', err);
      setErrorMessage('Không thể truy cập Microphone. Vui lòng cấp quyền micro trên trình duyệt.');
      setRecordingIndex(null);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setRecordingIndex(null);
  };

  const toggleRecording = (index: number) => {
    if (isPremiumSentence(index)) {
      openUpgradeModal();
      return;
    }

    if (recordingIndex === index) {
      stopRecording();
    } else {
      startRecording(index);
    }
  };

  // -------------------------------------------------------------
  // USER AUDIO PLAYBACK
  // -------------------------------------------------------------
  const playUserAudio = (index: number) => {
    const userAudioUrl = results[index]?.userAudioUrl;
    if (!userAudioUrl) return;

    if (userPlayingAudioIndex === index) {
      if (userAudioPlayerRef.current) {
        userAudioPlayerRef.current.pause();
        userAudioPlayerRef.current.currentTime = 0;
      }
      setUserPlayingAudioIndex(null);
      return;
    }

    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }

    const audio = new Audio(userAudioUrl);
    userAudioPlayerRef.current = audio;
    setUserPlayingAudioIndex(index);

    audio.onended = () => setUserPlayingAudioIndex(null);
    audio.onerror = () => setUserPlayingAudioIndex(null);
    audio.play();
  };

  const activeCurrentSentence = lesson.sentences[activeSentence] || lesson.sentences[0];
  const activeRecord = results[activeSentence];
  const activeIsRecording = recordingIndex === activeSentence;
  const activeIsPlaying = playingIndex === activeSentence;
  const activeIsUserPlaying = userPlayingAudioIndex === activeSentence;
  const activeHasScore = typeof activeRecord?.score === 'number';
  const activeIsLocked = isPremiumSentence(activeSentence);

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 md:px-8 pt-4 pb-14 max-w-7xl mx-auto font-sans">
      
      {/* Luxury Ambient Glow Layers */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50/50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20" />
      <div className="pointer-events-none fixed top-16 left-10 -z-10 h-72 w-72 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-900/10" />

      {/* Top Header & Breadcrumbs */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back & Course Breadcrumb */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/speaking/${courseId}/shadowing`)}
            className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs backdrop-blur-md transition-all hover:border-purple-300 hover:bg-white hover:text-purple-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-purple-500/40 dark:hover:text-purple-400"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Quay lại danh sách bài</span>
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-50/90 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/60 dark:text-purple-300">
            <Radio size={12} className="text-purple-500 animate-pulse" />
            <span>SHADOWING STUDIO • {currentLessonId.toUpperCase()}</span>
          </div>
        </div>

        {/* Global Controls: Speed & Play All */}
        <div className="flex items-center gap-2">
          {/* Speed Selector */}
          <div className="flex items-center rounded-xl border border-slate-200/80 bg-white/80 p-0.5 text-xs font-bold shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
            <button
              onClick={() => setSpeed(0.8)}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                speed === 0.8
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-600 dark:text-slate-400'
              }`}
            >
              0.8x
            </button>
            <button
              onClick={() => setSpeed(1.0)}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                speed === 1.0
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-600 dark:text-slate-400'
              }`}
            >
              1.0x
            </button>
          </div>

          {/* Master Play All */}
          <button
            onClick={handlePlayAll}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all shadow-xs ${
              isPlayingAll
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-105 shadow-purple-500/20'
            }`}
          >
            {isPlayingAll ? <Square size={12} className="fill-white" /> : <Play size={12} className="fill-white" />}
            <span>{isPlayingAll ? 'Dừng' : 'Đọc toàn bài'}</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle size={15} className="shrink-0" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 2-COLUMN STUDIO WORKSPACE (Bố Cục Phòng Thu Chuyên Nghiệp)                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ======================================================================= */}
        {/* LEFT COLUMN: 10-TRACK PLAYLIST SIDEBAR (4/12 cols)                      */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          
          {/* Tracklist Master Card */}
          <div className="rounded-3xl border border-purple-200/70 bg-white/90 p-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 space-y-3">
            
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-black font-jp text-slate-900 dark:text-white leading-tight">
                  {lesson.title}
                </h2>
                <p className="text-[11px] font-semibold text-slate-500 line-clamp-1">
                  {lesson.desc}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] font-black uppercase text-slate-400">Tiến độ</div>
                <div className="text-xs font-black text-purple-600 dark:text-purple-400">
                  {completedCount}/10
                </div>
              </div>
            </div>

            {/* 10 Track Items (Scrollable List) */}
            <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-200 dark:scrollbar-thumb-slate-700">
              {lesson.sentences.map((s, idx) => {
                const isActive = activeSentence === idx;
                const rec = results[idx];
                const isDone = typeof rec?.score === 'number' && rec.score > 0;
                const isLocked = isPremiumSentence(idx);
                const isTrackPlaying = playingIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      stopAudio();
                      setActiveSentence(idx);
                    }}
                    className={`group w-full text-left rounded-2xl p-2.5 transition-all duration-200 flex items-center justify-between gap-2 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/25 scale-[1.01]'
                        : isDone
                        ? 'bg-emerald-50/80 text-slate-800 border border-emerald-200/80 hover:bg-emerald-100/80 dark:bg-emerald-950/30 dark:text-slate-200 dark:border-emerald-800/60'
                        : isLocked
                        ? 'bg-slate-50/70 text-slate-500 border border-slate-200/60 hover:border-amber-300 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800'
                        : 'bg-white/60 text-slate-700 border border-slate-200/60 hover:bg-purple-50/60 hover:border-purple-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* Status / Index Badge */}
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-xl text-[10px] font-black ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isDone
                          ? 'bg-emerald-500 text-white'
                          : isLocked
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {isDone ? <Check size={12} strokeWidth={3} /> : isLocked ? <Crown size={11} strokeWidth={2.5} /> : idx + 1}
                      </span>

                      {/* Text Preview */}
                      <div className="min-w-0 flex-1">
                        <div className={`text-xs font-bold font-jp truncate ${
                          isActive ? 'text-white' : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {s.jp}
                        </div>
                        <div className={`text-[10px] truncate ${
                          isActive ? 'text-purple-200' : 'text-slate-400'
                        }`}>
                          {s.romaji}
                        </div>
                      </div>
                    </div>

                    {/* Right Badge / Indicator */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      {isTrackPlaying && (
                        <div className="flex items-center gap-0.5 h-3">
                          <span className="w-1 h-3 bg-white rounded-full animate-bounce" />
                          <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      )}

                      {isDone && (
                        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${
                          isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {rec.score}%
                        </span>
                      )}

                      {isLocked && !isDone && (
                        <span className="rounded-md bg-amber-100/90 dark:bg-amber-950/80 px-1.5 py-0.5 text-[9px] font-black text-amber-700 dark:text-amber-300">
                          PRO
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sidebar Footer Stats & Premium trigger */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-400">Điểm TB: <strong className="text-purple-600 dark:text-purple-400">{averageScore}%</strong></span>
              <button
                onClick={openUpgradeModal}
                className="inline-flex items-center gap-1 text-[11px] font-black text-amber-600 hover:text-amber-700 dark:text-amber-400"
              >
                <Crown size={12} />
                <span>Nâng cấp Premium</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT MAIN STAGE: THE HERO STUDIO STAGE (8/12 cols)                     */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* HERO TELEPROMPTER SCREEN */}
          <motion.div
            key={activeSentence}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="group relative overflow-hidden rounded-3xl border border-purple-200/80 bg-gradient-to-b from-white/95 via-purple-50/15 to-white/95 p-6 sm:p-8 text-center shadow-[0_16px_40px_rgba(147,51,234,0.08)] backdrop-blur-2xl dark:border-purple-500/20 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20"
          >
            {/* Top Glowing Ribbon */}
            <div className={`absolute inset-x-0 top-0 h-1.5 ${
              activeIsLocked
                ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400'
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
            }`} />

            {/* Kanji Watermark */}
            <div className="pointer-events-none absolute right-4 bottom-2 select-none font-jp text-[9rem] font-black leading-none text-purple-600/[0.03] dark:text-purple-400/[0.02]">
              音
            </div>

            {/* Track Badge & Standard Tokyo Audio indicator */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/60 bg-purple-50 px-3 py-1 text-[11px] font-black text-purple-700 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                {activeIsLocked ? <Crown size={12} className="text-amber-500" /> : <Sparkles size={12} className="text-purple-500" />}
                <span>CÂU {activeSentence + 1} / {lesson.sentences.length}</span>
              </div>

              {activeIsLocked && (
                <span className="rounded-full bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 text-[10px] font-black text-amber-700 dark:text-amber-300 border border-amber-300/60">
                  GÓI PREMIUM
                </span>
              )}
            </div>

            {/* Prominent Japanese Teleprompter Typography */}
            <div className="space-y-3 my-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-jp text-slate-900 dark:text-white tracking-wide leading-relaxed">
                {activeCurrentSentence.jp}
              </h1>
              <p className="text-xs sm:text-sm font-bold tracking-wider text-purple-600 dark:text-purple-400">
                {activeCurrentSentence.romaji}
              </p>
              <div className="inline-block rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 max-w-xl mx-auto border border-slate-200/50 dark:border-slate-700/50">
                {activeCurrentSentence.vi}
              </div>
            </div>

            {/* STUDIO CONSOLE CONTROLS: Audio Play, Central Mic Hub, Listen Back */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-5 border-t border-purple-100/80 dark:border-slate-800">
              
              {/* Native Tokyo Playback Button */}
              <button
                onClick={() => {
                  if (activeIsPlaying) {
                    stopAudio();
                  } else {
                    speakSentence(activeSentence);
                  }
                }}
                className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-black transition-all shadow-xs ${
                  activeIsPlaying
                    ? 'bg-purple-600 text-white shadow-purple-500/30 animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {activeIsPlaying ? <Pause size={16} className="fill-white" /> : <Volume2 size={16} />}
                <span>{activeIsPlaying ? 'Đang đọc mẫu...' : 'Nghe giọng mẫu'}</span>
              </button>

              {/* GIANT CENTRAL RECORDING CONSOLE */}
              <div className="relative flex flex-col items-center">
                {activeIsLocked ? (
                  /* PREMIUM LOCKED BUTTON (Sentences 6-10) */
                  <>
                    <button
                      onClick={openUpgradeModal}
                      className="relative grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full bg-slate-100 dark:bg-slate-800/90 text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700 shadow-md transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:text-amber-500 dark:hover:border-amber-500 active:scale-95 z-10"
                      title="Thu âm bị khóa. Bấm để mở khóa Premium."
                    >
                      <div className="relative">
                        <Mic size={28} strokeWidth={2.2} />
                        <div className="absolute -top-1.5 -right-2 grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-white shadow-xs">
                          <Lock size={10} strokeWidth={3} />
                        </div>
                      </div>
                    </button>

                    <div className="mt-2.5 flex flex-col items-center justify-center">
                      <button
                        onClick={openUpgradeModal}
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:border-amber-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        <Lock size={12} className="text-amber-500 shrink-0" />
                        <span>Thu âm (Khóa Premium)</span>
                      </button>
                    </div>
                  </>
                ) : (
                  /* NORMAL UNLOCKED RECORDING BUTTON (Sentences 1-5) */
                  <>
                    {/* BUTTON CONTAINER WITH PERFECT CIRCULAR SOUNDWAVES */}
                    <div className="relative flex items-center justify-center">
                      {/* Concentric Pulsing Circular Audio Waves */}
                      {activeIsRecording && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          {/* Outer Circular Wave 1 */}
                          <motion.div
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: [1, 1.7, 2.4], opacity: [0.7, 0.3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.9, ease: 'easeOut' }}
                            className="absolute h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-rose-500/50 bg-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                          />
                          {/* Middle Circular Wave 2 */}
                          <motion.div
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: [1, 1.45, 1.95], opacity: [0.8, 0.35, 0] }}
                            transition={{ repeat: Infinity, duration: 1.9, delay: 0.45, ease: 'easeOut' }}
                            className="absolute h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-pink-500/40 bg-pink-500/15 shadow-[0_0_15px_rgba(236,72,153,0.25)]"
                          />
                          {/* Inner Circular Wave 3 */}
                          <motion.div
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: [1, 1.25, 1.55], opacity: [0.9, 0.45, 0] }}
                            transition={{ repeat: Infinity, duration: 1.9, delay: 0.9, ease: 'easeOut' }}
                            className="absolute h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-rose-400/50 bg-rose-400/15"
                          />
                        </div>
                      )}

                      <button
                        onClick={() => toggleRecording(activeSentence)}
                        className={`relative grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full text-white shadow-xl transition-all duration-300 active:scale-95 z-10 ${
                          activeIsRecording
                            ? 'bg-gradient-to-tr from-rose-500 to-pink-500 shadow-rose-500/50 ring-4 ring-rose-300/80 dark:ring-rose-900/60'
                            : 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 shadow-purple-500/35 hover:scale-105 hover:shadow-purple-500/50 ring-4 ring-purple-100 dark:ring-purple-950'
                        }`}
                      >
                        {activeIsRecording ? (
                          <SoundWaveBars />
                        ) : (
                          <Mic size={28} strokeWidth={2.5} />
                        )}
                      </button>
                    </div>

                    {/* STATUS TEXT UNDERNEATH */}
                    <div className="mt-2.5 flex flex-col items-center justify-center">
                      {activeIsRecording ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                          <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                          Đang thu âm... Chạm để dừng
                        </span>
                      ) : (
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {activeHasScore ? 'Đọc lại câu này' : 'Bấm để thu âm'}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Listen to User Recording */}
              <button
                disabled={!activeRecord?.userAudioUrl}
                onClick={() => playUserAudio(activeSentence)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-black transition-all shadow-xs ${
                  !activeRecord?.userAudioUrl
                    ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
                    : activeIsUserPlaying
                    ? 'bg-purple-600 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                <Headphones size={16} />
                <span>{activeIsUserPlaying ? 'Đang phát...' : 'Nghe lại giọng bạn'}</span>
              </button>
            </div>

            {/* PREMIUM UPSELL BANNER (Visible on locked sentences 6-10) */}
            {activeIsLocked && (
              <div className="mt-6 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 p-4 text-center dark:border-amber-900/40 dark:bg-amber-950/20 space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-amber-800 dark:text-amber-300">
                  <Lock size={15} className="text-amber-500 shrink-0" />
                  <span>Hãy đăng ký Premium để tiếp tục sử dụng &quot;Thu âm&quot;</span>
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Mở khóa không giới hạn tính năng Thu âm, phân tích lỗi sai và chấm điểm AI cho các câu từ 6 đến 10.
                </p>
                <button
                  onClick={openUpgradeModal}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-4 py-2 text-xs font-black text-white shadow-md shadow-amber-500/25 hover:brightness-105 transition-all"
                >
                  <Crown size={13} strokeWidth={2.5} />
                  <span>Đăng ký gói Premium ngay</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* AI PHONETIC DIAGNOSTIC & MISTAKE BREAKDOWN CARD */}
          {activeHasScore && activeRecord?.analysis && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 sm:p-6 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 space-y-4"
            >
              {/* Score Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl font-black text-sm ${
                    (activeRecord.score || 0) >= 85
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : (activeRecord.score || 0) >= 70
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {activeRecord.score}%
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      {(activeRecord.score || 0) >= 85 ? 'Phát âm Xuất sắc! 🎯' : (activeRecord.score || 0) >= 70 ? 'Phát âm Khá tốt 👍' : 'Cần chú ý sửa âm ⚡'}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500">
                      Chẩn đoán chi tiết từng âm tiết dưới đây
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    ● Phát âm đúng
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-1 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                    ● Bị vấp / Lệch âm
                  </span>
                </div>
              </div>

              {/* Word Tokens Interactive Chips */}
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Ma trận ngữ âm (Chạm vào từ để nghe phát âm mẫu):
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {activeRecord.analysis.tokenFeedbacks.map((token, tIdx) => {
                    const isCorrect = token.status === 'correct';
                    const isWordPlaying = activeWordSpeech === token.text;

                    return (
                      <button
                        key={tIdx}
                        onClick={() => speakSingleWord(token.text)}
                        title={isCorrect ? 'Đọc đúng! Nhấn để nghe lại' : `${token.advice || 'Vấp âm'} - Nhấn để nghe cách đọc chuẩn`}
                        className={`group/token relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-jp font-black transition-all shadow-xs active:scale-95 ${
                          isWordPlaying
                            ? 'bg-purple-600 text-white scale-105 animate-pulse ring-2 ring-purple-400'
                            : isCorrect
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/80 hover:bg-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-rose-100 text-rose-800 border border-rose-300 line-through decoration-rose-500 hover:bg-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800'
                        }`}
                      >
                        <span>{token.text}</span>
                        <Volume2 size={13} className="opacity-60 group-hover/token:opacity-100" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Comparison Line */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 text-xs space-y-1.5 font-medium">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-400 shrink-0">Mẫu:</span>
                  <span className="font-jp font-bold text-slate-800 dark:text-slate-100">{activeCurrentSentence.jp}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-400 shrink-0">Bạn đọc:</span>
                  <span className="font-jp font-bold text-purple-700 dark:text-purple-300">
                    {activeRecord.spokenText ? `「${activeRecord.spokenText}」` : '(Chưa nhận diện rõ)'}
                  </span>
                </div>
              </div>

              {/* AI Coaching Tips */}
              {activeRecord.analysis.errorTips.length > 0 && (
                <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-3.5 dark:border-amber-950 dark:bg-amber-950/30 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-black text-amber-800 dark:text-amber-300">
                    <Lightbulb size={14} className="text-amber-500" />
                    <span>Lời khuyên của Huấn luyện viên AI:</span>
                  </div>
                  <ul className="pl-4 list-disc space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                    {activeRecord.analysis.errorTips.map((tip, idx) => (
                      <li key={idx} className="leading-snug">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* STAGE FOOTER NAVIGATION: Previous / Next Sentence */}
          <div className="flex items-center justify-between rounded-2xl bg-white/70 dark:bg-slate-900/70 p-3 border border-slate-200/60 dark:border-slate-800 backdrop-blur-md">
            <button
              disabled={activeSentence === 0}
              onClick={() => {
                stopAudio();
                setActiveSentence(prev => Math.max(0, prev - 1));
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-purple-300 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-300"
            >
              <ChevronLeft size={16} />
              <span>Câu trước</span>
            </button>

            <span className="text-xs font-bold text-slate-400">
              Câu {activeSentence + 1} / {lesson.sentences.length}
            </span>

            <button
              disabled={activeSentence === lesson.sentences.length - 1}
              onClick={() => {
                stopAudio();
                setActiveSentence(prev => Math.min(lesson.sentences.length - 1, prev + 1));
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-black text-white shadow-xs hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Câu tiếp theo</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COMPLETION CELEBRATION MODAL                                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-purple-200/80 bg-white p-7 text-center shadow-2xl dark:border-purple-900/40 dark:bg-slate-900"
            >
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/30">
                <Award size={32} />
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-jp">
                おめでとうございます！ 🎉
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mt-1">
                Hoàn thành bài luyện đọc Shadowing
              </p>

              <div className="my-5 rounded-2xl border border-purple-100 bg-purple-50/60 p-4 dark:border-purple-950 dark:bg-purple-950/30 space-y-1">
                <div className="text-xs font-bold text-slate-500">Điểm trung bình của bạn</div>
                <div className="text-4xl font-black text-purple-600 dark:text-purple-400">
                  {averageScore}%
                </div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                  Đã hoàn thành xuất sắc 10/10 câu đọc
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {currentLessonId === 'lesson-1' ? (
                  <button
                    onClick={() => {
                      setShowCompletionModal(false);
                      navigate(`/speaking/${courseId}/shadowing/lesson-2`);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-black text-white shadow-md transition-all hover:brightness-105"
                  >
                    <span>Luyện tiếp Lesson 02</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowCompletionModal(false);
                      navigate(`/speaking/${courseId}/shadowing`);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-black text-white shadow-md transition-all hover:brightness-105"
                  >
                    <span>Về danh sách bài đọc</span>
                    <ArrowRight size={16} />
                  </button>
                )}

                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="rounded-xl py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400"
                >
                  Xem lại kết quả các câu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
