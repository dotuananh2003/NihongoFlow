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
