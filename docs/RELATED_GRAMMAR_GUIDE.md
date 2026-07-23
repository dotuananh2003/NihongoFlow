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
