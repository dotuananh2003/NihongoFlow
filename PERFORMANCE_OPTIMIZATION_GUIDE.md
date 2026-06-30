# 🚀 Bí kíp Tối ưu Hóa Hiệu năng & Khung hình (90 FPS Smooth Scrolling)

Tài liệu này ghi chú lại quá trình tối ưu hóa hiện tượng **"Khựng, giật lag khi cuộn trang và chuyển tab"** để làm tài liệu tham khảo, giúp tránh lặp lại lỗi khi phát triển các tính năng sau này.

---

## 🛑 Lỗi 1: Lạm dụng `will-change-transform` và `transform-gpu`

### Triệu chứng:
- Cuộn trang dài (như danh sách Hán Tự, Từ vựng) bị giật lag, rớt FPS thê thảm.
- Các thiết bị yếu hoặc trình duyệt Safari bị khựng hình nặng.

### Nguyên nhân:
- Việc gắn các class `will-change-transform` hoặc `transform-gpu` (TailwindCSS) lên một khối (container) chứa quá nhiều phần tử (như `<motion.div>` bọc toàn trang, hoặc từng thẻ Kanji card) ép GPU (Card đồ họa) phải tạo ra một kết cấu (texture) riêng biệt cho toàn bộ DOM tree đó. 
- Khi người dùng cuộn, bộ nhớ VRAM bị quá tải, gây tràn bộ nhớ đệm và rớt khung hình (frame drops).

### Cách khắc phục & Phòng tránh:
1. **Tuyệt đối không dùng `will-change: transform`** lên các vùng chứa nội dung dài, có thể cuộn.
2. Với `framer-motion`, thư viện đã tự động xử lý phần cứng khi diễn hoạt (animation), sau khi diễn hoạt xong nó sẽ gỡ bỏ `will-change`, nên không cần phải gán cứng class của Tailwind vào.
3. Tôi đã dùng lệnh regex để xóa sạch các class này trên toàn bộ mã nguồn:
   - Xóa `transform-gpu`
   - Xóa `will-change-transform`

---

## 🛑 Lỗi 2: Hiệu ứng chuyển Tab quá nặng (Page Transition Lag)

### Triệu chứng:
- Đang cuộn mượt ở tab Hán tự, click sang tab Từ vựng thì trang khựng lại khoảng 0.5s rồi mới chuyển, cuộn trang trong giây đầu tiên cũng bị đơ.

### Nguyên nhân:
- Trong `Layout.tsx`, khối `<AnimatePresence>` dùng để bọc toàn bộ Nội dung trang có cấu hình hiệu ứng tọa độ `y`:
  ```tsx
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  ```
- Khi chuyển đổi giữa hai trang chứa hàng nghìn node DOM, việc ép trình duyệt tính toán lại Layout Shift (dịch chuyển y) cho toàn bộ trang khiến CPU chạy 100%, gây ra tình trạng "treo" nhẹ.

### Cách khắc phục:
- Xóa bỏ dịch chuyển `y`, chỉ sử dụng hiệu ứng `opacity` (mờ dần/hiện dần).
- Giảm thời gian chuyển cảnh (`duration`) xuống `0.2s`. Trình duyệt xử lý `opacity` cực kỳ nhẹ nhàng và không làm ảnh hưởng đến luồng cuộn (Scroll Thread).
  ```tsx
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2, ease: "easeInOut" }}
  ```

---

## 🛑 Lỗi 3: Đưa Scroll vào thẻ `<main>` thay vì `<body>` gốc

### Triệu chứng:
- Mất hiệu ứng cuộn mượt (Native smooth scrolling), cảm giác cuộn bị "cứng", đôi khi mất quán tính (rubber-banding) trên di động/trackpad.
- Text trôi tuột ra đằng sau Header bị hiển thị đè lên (nếu Header làm trong suốt).

### Nguyên nhân:
- Layout được code theo kiểu cố định độ cao `h-screen`, sau đó cho `<main>` thuộc tính `overflow-y-auto`. Việc cuộn trên một thẻ `div` con nested luôn không mượt bằng cuộn trực tiếp trên cấp độ cao nhất (`<body>` hoặc Window).
- Tuy việc này giúp text không bị tràn ra đằng sau Header (vì nó bị cắt ngay tại viền trên của thẻ `<main>`), nhưng lại đánh đổi bằng trải nghiệm cuộn tệ hại.

### Cách khắc phục:
1. **Trả lại cuộn cho Window:** Xóa các giới hạn `h-screen` hay `overflow-y-auto` ở các thẻ bọc ngoài, để trình duyệt tự do cuộn nguyên trang.
2. **Che nội dung tràn (Scroll Masking):** Thay vì gò ép thanh cuộn, hãy để cho trang cuộn tự do, nhưng đổ màu nền khối (Solid Background) cho phần tử `<div className="sticky top-0 z-30">` bọc Header.
   - Thêm `bg-[var(--background)] dark:bg-slate-950` cho thanh Header ở các trang thông thường.
   - Với các trang đặc biệt có Background Image toàn trang (như trang Từ vựng JPD123), cần một thẻ `div` riêng nằm ở `z-[20]` chứa Background Image tương ứng và đổ nền đặc, nằm dưới thanh Header (`z-30`) và nằm trên nội dung cuộn để che mắt người dùng.

---

> 💡 **TỔNG KẾT BÀI HỌC:** 
> - **Hiệu năng:** Hãy để trình duyệt làm những việc nó giỏi nhất (Cuộn tự nhiên). Càng ít can thiệp bằng CSS nâng cao (`will-change`, Scroll lồng nhau) thì ứng dụng càng chạy mượt.
> - **Chuyển cảnh:** Đừng bao giờ tạo hiệu ứng chuyển động vị trí (transform tọa độ) cho một khối chứa quá nhiều DOM. Chỉ dùng thay đổi độ mờ (`opacity`).
