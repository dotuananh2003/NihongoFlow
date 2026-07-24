# Hướng dẫn Bổ sung Cấu trúc Ngữ pháp Liên quan (Template)

Tài liệu này đóng vai trò như một **Khuôn mẫu (Template)** chuẩn mực. Bất cứ khi nào bạn muốn tạo cấu trúc ngữ pháp liên quan cho Bài 5, Bài 6 hay N4, N3, bạn chỉ cần làm theo tài liệu này.

## 1. Cấu trúc Dữ liệu Chuẩn (Data Structure)

Để thêm cấu trúc liên quan, dữ liệu của một ngữ pháp cần được khai báo thêm mảng `relatedGrammars` theo đúng định dạng sau:

```typescript
export interface RelatedGrammar {
  name: string;      // Tên cấu trúc (VD: N は Aな です)
  meaning: string;   // Ý nghĩa/Cách dùng (VD: Miêu tả tính chất bằng tính từ na)
  example: {         // Ví dụ minh họa (Bắt buộc có đủ 4 trường)
    japanese: string;
    reading: string;
    romaji: string;
    vietnamese: string;
  };
}
```

## 2. Kịch bản Tự động hóa (Node.js Script Template)

Thay vì phải copy-paste thủ công hàng trăm dòng code vào file `grammarData.ts`, bạn có thể sử dụng lại **Script Node.js** mẫu tại đường dẫn `scripts/add_related.cjs`.

**Cách dùng:**
1. Mở file `scripts/add_related.cjs`.
2. Sửa lại biến `newRelatedData` bên trong file. Đổi key `g1`, `g2` thành ID ngữ pháp bạn muốn thêm, và cập nhật nội dung ví dụ tương ứng.
3. Mở Terminal lên và chạy lệnh: 
   ```bash
   node scripts/add_related.cjs
   ```

```javascript
// Cấu trúc mẫu bên trong file add_related.cjs:
const newRelatedData = {
  g1: [
    {
      name: 'N は N です',
      meaning: 'Miêu tả bản chất sự vật bằng Danh từ',
      example: {
        japanese: '彼は学生です。',
        reading: 'かれはがくせいです。',
        romaji: 'kare wa gakusei desu.',
        vietnamese: 'Anh ấy là học sinh.'
      }
    }
  ]
};
```

## 3. Quy tắc Hiển thị UI
Giao diện hiển thị cấu trúc này đã được lập trình sẵn và tự động hiển thị trong component `GrammarPointDetail.tsx`. 

Thuật toán `parseKanjiReading` sẽ tự động đảm nhiệm việc bóc tách và bôi màu Kanji. 

**Quy tắc Đồng bộ Chuỗi Phiên âm (Bắt buộc):**
Để thuật toán có thể bóc tách và bôi màu tự động (cho cả Kanji và cụm phiên âm tương ứng phía dưới), tất cả các ký tự **không phải là Kanji** (bao gồm số đếm, chữ Katakana, dấu câu, khoảng trắng...) ở câu tiếng Nhật gốc (`japanese`) **BẮT BUỘC** phải được giữ nguyên y hệt khi viết xuống dòng phiên âm (`reading`).
*Ví dụ:*
- Đúng: `japanese`: `ホテルから 10分` -> `reading`: `ホテルから 10ぷん`
- Sai: `japanese`: `ホテルから 10分` -> `reading`: `ほてるから じゅっぷん` (Lỗi thuật toán mất màu do khác Katakana và số)

**Quy tắc lên màu tự động (Colorization):**
Thành phần giao diện tự động nhận diện các ký hiệu ngữ pháp và bôi màu để tạo sự liên kết đa ngôn ngữ (cho cả Tiếng Nhật và Tiếng Việt):
- `N`, `N1`, `N2`, `N3` (Danh từ): Xanh dương (Blue)
- `A`, `Aい`, `Aな` (Tính từ): Cam (Orange)
- `V` (Động từ): Xanh ngọc (Emerald)

## 4. Cách Dịch nghĩa Hình dung (Literal Translation)

Để giúp học viên dễ dàng hình dung cấu trúc bằng tiếng Việt, tiêu đề của cấu trúc liên quan (`name`) nên được đính kèm cụm dịch nghĩa trực tiếp nằm trong dấu ngoặc đơn. 

Ví dụ chuẩn cho dữ liệu:
- **Sai:** `name: 'N1 に N2 が あります'`
- **Đúng:** `name: 'N1 に N2 が あります (Ở N1 có N2)'`

Nhờ tính năng Colorization ở mục 3, các chữ `N1, N2` bên trong cụm tiếng Việt này cũng sẽ tự động được lên màu tương đồng với cấu trúc gốc!

## 5. Tham khảo: Hệ sinh thái Cấu trúc Bài 4 (Mẫu)
Dưới đây là một số mẫu cấu trúc mở rộng đã được áp dụng thành công cho Bài 4, bạn có thể tham khảo để phát triển cho các bài sau:
- Khẳng định / Phủ định / Quá khứ: `N は Aい N です (N2 là N1 A)`, `N は Aかった です (N đã A)`
- Mức độ: `ぜんぜん + A (phủ định) (Hoàn toàn không A)`
- Đặt câu hỏi & Liệt kê (Sự tồn tại): `N1 に なに が ありますか (Ở N1 có gì?)`, `N1 に N2 や N3 が あります (Ở N1 có N2 và N3)`

## 6. Quy chuẩn Hoàn thiện Dữ liệu Ngữ pháp (Grammar Details)
Ngoài mảng `relatedGrammars`, để một mục ngữ pháp hiển thị đầy đủ thông tin (5 khối thẻ màu) trên UI, đối tượng ngữ pháp gốc BẮT BUỘC phải khai báo đầy đủ các trường chi tiết sau:

```typescript
{
  id: 'gX',
  title: '...',
  meaning: '...',
  // ... (các trường cơ bản)
  barColor: 'bg-blue-500', // Màu sắc dải viền (VD: bg-blue-500, bg-emerald-500)
  structure: 'N1 に N2 が あります', // Công thức rút gọn
  structureDetails: 'Địa điểm + に + Danh từ + が + あります', // Công thức chi tiết (Diễn giải N1, N2 là gì)
  explanationTitle: 'Ở N1 có N2', // Tiêu đề giải nghĩa
  explanationDetails: 'Sự tồn tại / Hiện diện', // Chuyên mục ý nghĩa
  usage: 'Diễn tả sự tồn tại của sự vật...', // Phạm vi sử dụng & Bối cảnh
  note: 'があります dùng cho vật vô tri vô giác...', // Lưu ý quan trọng
  memoryTip: 'Nhớ cặp bài trùng: "Địa điểm" đi với trợ từ "に"...', // Mẹo ghi nhớ học nhanh
  commonWords: 'Từ chỉ vị trí: 上 (trên), 下 (dưới)...', // Dấu hiệu nhận biết / Từ đi kèm
  relatedGrammars: [ ... ]
}
```

**Lưu ý:**
- Nếu thiếu các trường này, UI sẽ hiển thị các dòng text mẫu (placeholder) chung chung không chính xác.
- Khi làm dữ liệu cho Bài 5, Bài 6 trở đi, hãy luôn check kỹ để đảm bảo không bị sót các trường giải thích chi tiết này!

## 7. Quy tắc Tối đa hóa Dữ liệu (Maximized Data Guidelines)
Để mang lại trải nghiệm học tập phong phú nhất, bộ dữ liệu cho một cấu trúc ngữ pháp cần tuân thủ 3 nguyên tắc sau:
1. **Liệt kê TỐI ĐA các cấu trúc liên quan:** Mở rộng danh sách `relatedGrammars` cho mỗi cấu trúc (từ 3-5 cấu trúc thay vì chỉ 1 cái) để học viên dễ dàng liên kết kiến thức, đối chiếu phủ định/khẳng định, quá khứ/hiện tại, câu hỏi/câu trả lời.
2. **Ví dụ chính phong phú (~15 ví dụ):** Mảng `examples` (ví dụ gốc của cấu trúc chính) nên được cung cấp thật nhiều (khoảng 15 câu). Điều này giúp học viên trải nghiệm đủ mọi ngữ cảnh, sắc thái từ vựng trong thực tế thay vì chỉ học vẹt 2-3 câu sách giáo khoa.
3. **Quy tắc "1 Ví dụ" cho Cấu trúc liên quan:** Để giữ giao diện thẻ ngữ pháp tinh gọn và không bị rối mắt, bên trong mảng `relatedGrammars`, mỗi cấu trúc phụ vẫn CẦN VÀ CHỈ CẦN DUY NHẤT **1 ví dụ** minh họa. Cấu trúc: `example: { japanese, reading, romaji, vietnamese }`.

## 8. Quy tắc Phát âm Tự động (TTS & Voice Selector)
Nhằm mang lại trải nghiệm luyện nghe chân thực, ứng dụng đã tích hợp cả 2 hệ thống phát âm (Giọng Hệ điều hành & Giọng AI Lồng tiếng Anime) cho các câu ví dụ:
- **Chống đọc sai (Đọc bằng Hiragana):** Do chữ Kanji có nhiều cách đọc tùy ngữ cảnh, thuật toán phát âm sẽ **LUÔN LUÔN ưu tiên lấy chuỗi `reading` (phiên âm Hiragana/Katakana) để đọc** thay vì chuỗi `japanese`. Đây là lý do tại sao ở mục 3, bạn bắt buộc phải tuân thủ nghiêm ngặt "Quy tắc Đồng bộ Chuỗi Phiên âm".
- **Giao diện Voice Selector (2 Nhóm Giọng):** Tại ngay đầu danh sách "VÍ DỤ", UI được trang bị một Custom Dropdown phân chia thành 2 nhóm giọng đọc:
  1. **Giọng AI Lồng Tiếng (VOICEVOX - Online):** Tích hợp qua API `tts.quest`, cung cấp các giọng lồng tiếng siêu đáng yêu và truyền cảm (như Zundamon, Shikoku Metan, Tsukuyomi Shouta...). Yêu cầu kết nối mạng và mất 1-2s để tải âm thanh (có hiệu ứng Loading).
  2. **Giọng Hệ Điều Hành (Offline):** Trích xuất qua `Web Speech API` từ các giọng Tiếng Nhật có sẵn trên máy (Ví dụ: Ichiro, Haruka, Kyoko). Phát âm ngay lập tức, không có độ trễ.
Hệ thống sẽ tự động bắt lấy giọng đọc do người dùng chọn để áp dụng cho tất cả các câu tiếng Nhật trên trang.

## 9. Quy tắc Giao diện Gamification (Bài tập)
Để mang lại trải nghiệm học tập sinh động và cuốn hút như các ứng dụng hàng đầu (Duolingo, Quizlet), thành phần `GrammarExercise.tsx` đã được áp dụng bộ thiết kế Gamification cao cấp:
- **Thanh Tiêu Đề Bài Tập (Exercise Header):** Lột xác toàn diện để đồng bộ phong cách Gamification.
  - **Badge Dạng Bài:** Được thiết kế dạng viên thuốc (`rounded-full`) kết hợp đổ bóng phát sáng (Glow) tùy theo dạng bài (Xanh, Lục, Tím, Cam).
  - **Nút Thoát:** Là một khối "Pill 3D" tinh tế với viền dưới dày nhẹ. Khi hover sẽ ửng màu tương ứng, khi click lún xuống (tactile feedback) giống các nút chính, duy trì sự hài hòa tuyệt đối.
  - **Tiêu đề ngữ pháp:** Sử dụng font tiếng Nhật siêu đậm (`font-black font-jp`) cao cấp, phân tách bằng dấu chấm tròn.
- **Thanh Tiến Trình (Progress Header):** Trải dài toàn màn hình, sử dụng dải màu Gradient lấp lánh (Cyan sang Indigo) với hiệu ứng bóng đổ phát sáng (Glow). Các chỉ số thành tích (Combo Lửa, Điểm Sao, Bộ đếm số câu) được bố trí gọn gàng sát lề phải, sử dụng chung font chữ `font-black` đồng bộ.
- **Thẻ Đáp Án Trắc Nghiệm (3D Gamification Card):** 
  - Khối 3D: Viền dưới của nút bấm được làm cực dày (`border-b-[6px]`) tạo chiều sâu. Khi click, thẻ sẽ lún xuống vật lý (giảm viền dưới và `translate-y-[4px]`) mang lại haptic feedback cực kỳ thỏa mãn.
  - Vệt màu (Accent Stripe): Mép trái mỗi thẻ có một dải màu nhỏ. Khi rê chuột (hover) sẽ chớp sáng, và khi chọn đáp án, toàn bộ thẻ (và vệt màu) sẽ bùng sáng màu Ngọc lục bảo (Đúng) hoặc Đỏ hồng (Sai) rất trực quan và rực rỡ.
- **Nút "Kiểm Tra" (Type 3 - Tự Luận):** Được thiết kế thành khối phím cơ 3D khổng lồ màu Xanh lam rực rỡ (`bg-blue-500`, `border-b-[6px]`). Nút có cơ chế thông minh: Vô hiệu hóa (màu xám) khi chưa nhập liệu, phát sáng khi đã nhập, và hiệu ứng lún thụt mạnh khi click/nhấn Enter.
- **Khung Phản hồi Kết quả (Feedback Banner 3D):**
  - Loại bỏ hoàn toàn giao diện viền phẳng (Flat UI). Thay bằng khối Panel 3D chắc nịch (`border-b-[6px]`).
  - Phân cực cảm xúc rõ nét bằng màu sắc: Ngọc lục bảo rực rỡ + Icon ✔ + Tiêu đề "Tuyệt vời!" khi làm đúng, và Đỏ hồng + Icon ✖ + Tiêu đề "Sai mất rồi!" khi làm sai.
  - Nút "Tiếp tục" bên trong cũng biến đổi thành phím cơ 3D đồng bộ 100% màu sắc với kết quả.

## 10. Quy tắc Dò chính tả & Châm chước lỗi (Fuzzy Matching & Typo Tolerance)
Trong dạng bài tập Tự luận (Type 3) - gõ phím, để mang lại trải nghiệm êm ái và không gây ức chế, hệ thống chấm điểm áp dụng cơ chế "Bao dung" gồm 2 bước:
1. **Chuẩn hóa & Dung nạp Trợ từ (Normalization & Particle Tolerance):** 
   - Hàm `normalizeForTyping` tự động bóc tách và loại bỏ sạch sẽ mọi dấu câu (chấm, phẩy, hỏi chấm, khoảng trắng...). Việc gõ thiếu dấu chấm câu `。` trong tiếng Nhật sẽ vẫn được công nhận đúng tuyệt đối.
   - **Đồng bộ Trợ từ Tiếng Nhật:** Hệ thống tự động quy đổi `は` (ha) -> `わ` (wa), `を` (wo) -> `お` (o), `へ` (he) -> `え` (e). Bạn hoàn toàn có thể gõ "kono kamera wa..." bằng phím `わ` mà máy vẫn chấm đúng!
   - **Đối chiếu Đa tầng:** Hỗ trợ so khớp sâu qua 3 tầng: Kanji nguyên gốc -> Hiragana đã chuẩn hóa -> Romaji. Gõ lẫn lộn Hiragana và Katakana cũng được chấp nhận.
2. **Thuật toán Châm chước Cấp độ Từ (Word-level Fuzzy Matching):**
   - Khắc phục nhược điểm của Levenshtein (chỉ đếm ký tự), hệ thống giờ đây hỗ trợ **Bao dung 1 từ đệm**.
   - Đối với Tiếng Việt, nếu người dùng thêm hoặc bớt 1 từ đệm nhỏ (như "này", "thì", "là", "cái") mà vẫn giữ đúng phần nghĩa gốc, thuật toán Word-level Subset sẽ nhận diện và tính điểm ĐÚNG. Đảm bảo trải nghiệm dịch thuật tự nhiên nhất.

## 11. Quy tắc Trình bày Thông tin Phản hồi (Feedback Data Presentation)
Để bảng phản hồi (Answer Feedback) mang lại giá trị học tập cao nhất, nó phải tuân thủ nghiêm ngặt 2 nguyên tắc hiển thị dữ liệu:
1. **Bắt buộc hiển thị Phiên âm (Reading & Romaji):** Khi đáp án đúng chứa Kanji (đặc biệt trong các dạng bài tập Tự luận hoặc Sắp xếp tiếng Nhật), hệ thống BẮT BUỘC hiển thị chuỗi phiên âm Hiragana (`reading`) và `romaji` ngay bên dưới để học viên biết cách đọc. Việc chỉ hiển thị Kanji là một trải nghiệm tồi.
2. **Giải thích Đa năng & Đầy đủ (Universal Explanation):**
   - Ô "Giải thích" không được phép để trống ở bất kỳ dạng bài nào (Type 1, 2, 3, 4).
   - Nội dung giải thích phải bao gồm 2 phần cốt lõi: 
     - **Bối cảnh:** Dịch nghĩa tiếng Việt của toàn bộ câu ví dụ đó.
     - **Phân tích:** Giải thích tại sao lại dùng cấu trúc ngữ pháp đó trong câu (kết nối giữa `grammarPoint.title` và `grammarPoint.meaning`).
    - Cấu trúc chung: *"Câu này có nghĩa là: [Nghĩa Tiếng Việt]. Nó áp dụng cấu trúc [Tên Ngữ pháp] để diễn tả ý nghĩa [Ý nghĩa Ngữ pháp]."*

## 12. Quy tắc Tối ưu Hiệu năng (Performance - 90fps Native)
Đối với các màn hình chứa nhiều phần tử lặp lại (như danh sách Ví dụ dài, danh sách Cấu trúc liên quan), phải tuân thủ nghiêm ngặt quy tắc tối ưu hiệu năng CPU và GPU để loại bỏ hoàn toàn tình trạng giật/khựng (scroll jank):
1. **Memoization thuật toán nặng (CPU Bound):** Các thao tác xử lý chuỗi phức tạp (đặc biệt là thuật toán Regex như `parseKanjiReading`) tuyệt đối **không được đặt trực tiếp bên trong vòng lặp render**. Phải sử dụng `useMemo` để tính toán trước một lần duy nhất vào bộ nhớ đệm (cache), sau đó biến render mới lôi ra sử dụng.
2. **Loại bỏ Thư viện JS Animation (GPU Bound):** Tuyệt đối không lạm dụng các thư viện hoạt ảnh bằng Javascript (như `framer-motion`, `motion.div`) cho các danh sách dài. Việc gắn quá nhiều Listener sự kiện vào hàng chục phần tử sẽ làm nghẽn Main Thread, tốn bộ nhớ và gây lag khung hình.
3. **Ưu tiên CSS Native Transitions:** Chuyển đổi mọi hiệu ứng tương tác đơn giản (hover lún, nổi, mờ, đổ bóng) sang CSS Native thuần túy (VD: `hover:-translate-y-[2px] transition-transform duration-300`). Trình duyệt sẽ giao cho GPU xử lý trực tiếp các layer này, mang lại trải nghiệm cuộn mượt mà tuyệt đối 90-120fps mà không cần viện đến các thư viện cuộn ngoại vi.
