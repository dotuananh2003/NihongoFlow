# Tích hợp Smooth Scrolling (CSS Nguyên bản)

Nhằm tối ưu hóa hiệu suất và mang lại cảm giác cuộn quen thuộc nhất cho người dùng, dự án đã quyết định **KHÔNG SỬ DỤNG** các thư viện hay kỹ thuật mô phỏng cuộn bằng Javascript (như Lenis hay Framer Motion). 

Thay vào đó, chúng ta sẽ áp dụng triết lý "Less is More" bằng cách sử dụng các thuộc tính CSS gốc (Native CSS). Độ mượt của trang web, từ tốc độ lăn chuột đến giới hạn khung hình (60hz/90hz/120hz), sẽ được giao phó toàn bộ cho nhân xử lý đồ họa của trình duyệt và hệ điều hành.

## Cơ chế hoạt động
Chỉ sử dụng thuộc tính tiêu chuẩn của W3C là `scroll-behavior`. Thuộc tính này cho phép các thao tác cuộn (đặc biệt là click vào các đường link neo - anchor links) được diễn ra từ từ và mượt mà thay vì nhảy cóc tức thì.

## Các thay đổi đã áp dụng

### 1. Dọn dẹp thư viện ngoại lai
- Không sử dụng và đã gỡ bỏ các đoạn mã can thiệp vào sự kiện cuộn (scroll event) của window.
- Không khóa thẻ `body` (không dùng `overflow: hidden`).

### 2. Tinh chỉnh Global CSS
#### File: `src/index.css`
Đảm bảo thuộc tính CSS duy nhất sau đây được áp dụng ở cấp độ cao nhất:
```css
html {
  scroll-behavior: smooth;
}
```

## Ưu điểm của phương pháp này
1. **0 byte Javascript:** Không tiêu tốn dung lượng bundle của React, không làm nặng main thread.
2. **Khả năng truy cập (Accessibility):** Tương thích 100% với các thiết bị đọc màn hình và phím tắt điều hướng của trình duyệt.
3. **Cảm giác quen thuộc:** Lăn chuột trên trang web này sẽ có đà quán tính, tốc độ và cảm giác y hệt như mọi trang web truyền thống khác trên thiết bị của bạn.

---

# Hiệu ứng chuyển Tab Mượt mà (Shared Layout Animation) trên Sidebar

Để khắc phục hiện tượng khối màu nền (Background) bị giật cục khi chuyển tab trên thanh Sidebar, chúng ta áp dụng kỹ thuật **Shared Layout Animation** của Framer Motion.

## Cơ chế hoạt động
Sử dụng thuộc tính `layoutId` để liên kết các component tĩnh. Khi chuyển tab, Framer Motion sẽ nhận diện và tự động "trượt" cả mảng màu nền lẫn vạch đánh dấu từ vị trí cũ sang vị trí mới một cách liền mạch, tạo cảm giác như một khối chất lỏng di chuyển.

## Các thay đổi đã áp dụng

### 1. Đồng bộ Chuyển động (Synced Motion)
- **File:** `src/components/Sidebar/Sidebar.tsx`
- Bọc khối màu nền (Background) bên trong `<motion.div>` và thiết lập `layoutId="sidebar-active-bg-light"` (và dark).
- Đảm bảo vạch kẻ dọc (Indicator) cũng có `layoutId="sidebar-active-indicator"`.

### 2. Thuật toán Lò xo (Spring Physics)
- Áp dụng cấu hình lò xo: `transition={{ type: "spring", stiffness: 400, damping: 30 }}` cho cả khối màu nền và vạch đánh dấu.
- Điều này tạo ra gia tốc trượt cực nhanh khi mới click, nhưng sẽ hãm đà êm ái khi tiếp cận tab đích, mô phỏng hoàn hảo chuyển động tự nhiên.

---

# Tuyệt Kĩ Làm Mượt Trang Nhiều Card

Áp dụng khi một trang vẫn còn cảm giác cứng, giật hoặc khựng dù đã dùng native `scroll-behavior`. Mục tiêu là giảm chi phí repaint/layout trong lúc cuộn, không giả lập cuộn bằng Javascript.

## Nguyên tắc
- Không thêm thư viện smooth-scroll và không lắng nghe `scroll` bằng JS nếu không thật sự cần.
- Ưu tiên làm nhẹ bề mặt đang cuộn: giảm blur, shadow lớn, animation hover và các hiệu ứng cần repaint liên tục.
- Dùng containment cho panel lớn và vùng scroll để trình duyệt cô lập phạm vi vẽ lại.
- Chỉ dùng `content-visibility: auto` cho item có chiều cao ổn định. Nếu item nhỏ bị khựng khi xuất hiện, chuyển sang row ổn định bằng `content-visibility: visible`.

## CSS Utility Khuyến Nghị

```css
.smooth-panel {
  contain: paint style;
  transform: translateZ(0);
  backface-visibility: hidden;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.smooth-scroll-area {
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  -webkit-overflow-scrolling: touch;
  contain: paint style;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.steady-scroll-row {
  content-visibility: visible;
  contain: paint style;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.fixed-bg-plane {
  contain: paint;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

## Checklist Khi Trang Còn Giật
- Bỏ hoặc giảm `backdrop-blur` trên panel lặp lại, nhất là panel nằm trên ảnh nền lớn.
- Giảm `box-shadow` lớn trong danh sách; tránh `hover:shadow-[...]` trên nhiều card.
- Tránh `transition-all`; dùng `transition-colors` hoặc transition đúng thuộc tính cần đổi.
- Với list dài, thêm `overscroll-behavior: contain` và `scrollbar-gutter: stable` cho vùng `overflow-y-auto`.
- Với ảnh nền `fixed`, thêm containment/GPU hint cho wrapper và ảnh.
- Nếu đang có scroll lồng nhau, chỉ giữ vùng scroll nội bộ khi thật cần; nếu không, để trang chính cuộn tự nhiên.
- Kiểm tra `contain-intrinsic-size` có gần đúng chiều cao thật của item không. Sai quá nhiều có thể gây nhảy/khựng.

## Ví Dụ Đã Áp Dụng
- `src/index.css`: thêm các utility như `kanji-lesson-panel`, `kanji-lesson-scroll`, `kanji-steady-row`, `kanji-bg-plane`, `kanji-bg-raster`.
- `src/pages/Kanji/KanjiLesson.tsx`: gắn utility vào panel/list, giảm shadow hover và bỏ blur runtime.
- `src/components/Layout/Layout.tsx`: gắn utility cho lớp ảnh nền Kanji cố định.
