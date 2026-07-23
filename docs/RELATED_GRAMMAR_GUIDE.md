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

Thuật toán `parseKanjiReading` sẽ tự động đảm nhiệm việc bóc tách và bôi màu Kanji. Bạn **không cần phải sửa UI** thêm lần nào nữa, chỉ cần chạy Script để nạp Data là web sẽ tự động render rất đẹp!
