# Hướng Dẫn Định Dạng Câu Hỏi (Question Format Guide)

Tài liệu này quy định cấu trúc chuẩn của object câu hỏi khi được trích xuất và thêm mới vào các file dữ liệu (ví dụ: `jpd123_practice.json`). 

Việc tuân thủ định dạng này đảm bảo hệ thống Frontend có thể đọc, chấm điểm và hiển thị chính xác mà không gặp lỗi lặp ký tự hoặc sai đáp án.

## 1. Cấu trúc JSON chuẩn của một câu hỏi

Một câu hỏi đúng chuẩn bắt buộc phải tuân theo cấu trúc sau:

```json
{
  "id": 1,
  "question": "Các từ trong ngoặc [ ] dưới đây có chữ Hán tương ứng như thế nào?\n毎日、パンを [たべます]。",
  "options": [
    "食えます",
    "飲べます",
    "たべます",
    "食べます"
  ],
  "correctAnswer": 3,
  "explanation": "たべます (Thực) có nghĩa là ăn. Chữ Hán đúng là 食べます."
}
```

## 2. Quy tắc cho từng trường (Fields)

### `id` (Number)
- Là số nguyên dương định danh duy nhất cho câu hỏi.
- Thường tự tăng dựa trên index của mảng (`index + 1`).

### `question` (String)
- Nội dung câu hỏi.
- Hỗ trợ ký tự xuống dòng `\n` nếu câu hỏi có nhiều đoạn.

### `options` (Array of Strings)
- Mảng chứa các câu trả lời (thường là 4 options).
- **QUAN TRỌNG:** Phải là nội dung nguyên bản, **KHÔNG ĐƯỢC CHỨA** các tiền tố như `"A. "`, `"B. "`, `"C. "`, `"D. "` ở đầu chuỗi (vì Frontend đã tự động render các tiền tố này rồi).
  - ❌ Sai: `["A. 食えます", "B. 飲べます"]`
  - ✅ Đúng: `["食えます", "飲べます"]`

### `correctAnswer` (Number)
- Vị trí của đáp án đúng trong mảng `options`.
- Sử dụng chỉ mục index (bắt đầu từ 0):
  - Đáp án A => `0`
  - Đáp án B => `1`
  - Đáp án C => `2`
  - Đáp án D => `3`
- **QUAN TRỌNG:** Không sử dụng trường string kiểu `"answer": "A"`. Bắt buộc dùng `correctAnswer` dạng số.

### `explanation` (String)
- Lời giải thích chi tiết cho câu hỏi, sẽ được hiển thị sau khi người dùng trả lời (bất kể đúng hay sai).
