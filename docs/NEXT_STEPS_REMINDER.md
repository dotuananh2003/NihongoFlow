# Ghi chú & Lộ trình Tiếp theo (Reminder)

File này lưu lại trạng thái hoàn thành của dự án và các mục tiêu tiếp theo để tiện theo dõi.

## 1. Trạng thái hiện tại
- Đã trích xuất và lưu cấu trúc 11 mẫu ngữ pháp của **JPD123 - Bài 7** vào `src/data/grammarDataJPD123Lesson7.ts`.
- Đã link thành công file dữ liệu này vào hệ thống tổng (`grammarData.ts`) mà không làm ảnh hưởng bài khác.
- Đã xử lý triệt để lỗi parse cú pháp (thiếu `]`) do tool trích xuất gây ra và lỗi export vòng (circular dependency) của Vite.

## 2. Các công việc cần làm (Next Steps)

### A. Phát triển Nội dung (Content)
- **Ngữ pháp:** Tiến hành cấu trúc và thêm dữ liệu ngữ pháp cho Bài 8, Bài 9, Bài 10 (JPD123). Có thể cân nhắc tạo từng file riêng rẽ tương tự Bài 7 (`grammarDataJPD123Lesson8.ts`, v.v.) để giảm tải cho file tổng và tránh rủi ro.
- **Bài tập (Exam Practice):** Tiếp tục dùng script tự động để trích xuất ảnh câu hỏi. Hiện tại tiến độ đang dừng ở index ảnh **840** (theo `docs/extraction_progress.json`).

### B. Phát triển Tính năng (Features)
- **Tích hợp Voicevox:** Hiện đã có sẵn một vài script test (như `test_voicevox.cjs`), cần tiến hành ghép nối API để phát âm tự động các mẫu câu tiếng Nhật trong giao diện ứng dụng.
- **UI/UX Improvements:**
  - Triển khai **Smooth Scroll** cho ứng dụng theo kế hoạch `docs/SMOOTH_SCROLL_PLAN.md`.
  - Cải tiến giao diện của trang Kana (hiện đang sửa dở `KanaGrid.tsx` và `KanaPath.tsx`) và trang Exam Practice.

## 3. Ghi chú
> [!TIP]
> Hãy luôn check log trong `extraction_progress.json` trước khi chạy script trích xuất để đảm bảo nối tiếp đúng index hình ảnh câu hỏi.
> Đối với những file config/UI đang dang dở, nên gom nhóm lại theo từng module (Kana / Exam) để commit dần, tránh commit gộp quá nhiều logic khác nhau.
