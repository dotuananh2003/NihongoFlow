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

---

# Cap Nhat: Lam Muot Trang Chi Tiet Tu Vung

Ap dung cho cac trang co danh sach row tuong tac, nhieu nut con va noi dung text thay doi theo search/filter.

## Ky thuat moi da them
- Them `vocab-list-surface` cho vung chua danh sach de co `overscroll-behavior: contain`, `scrollbar-gutter: stable` va GPU hint, nhung khong dung `contain` tren ca vung scroll dai.
- Chuyen `vocab-detail-row` sang `content-visibility: visible`. Voi row nho, `content-visibility: auto` co the gay khung luc item vua vao viewport.
- Bo Framer Motion tren tung row va cac nut con lap lai. Row trong list chi nen dung CSS `transition-colors`, khong dung `whileHover`, `whileTap` hoac hover translate.
- Giam shadow row ve `shadow-none` hoac shadow cuc nhe co dinh. Trang thai selected dung border/ring thay vi nang card len.
- Voi grid lesson card lap lai, uu tien `article/button` thuong thay vi `motion.article` tren moi card; giu animation cho panel lon hoac modal.

## Khi nao dung mau nay
- List co tu 20 item tro len.
- Moi item co nhieu text, icon button hoac trang thai selected/bookmarked.
- Nguoi dung bao cuon bi khung khi filter/search hoac khi hover qua danh sach.

## Mau class khuyen nghi
```tsx
<div className="vocab-list-surface space-y-3">
  {items.map(item => (
    <div className="vocab-detail-row transition-colors duration-150">
      ...
    </div>
  ))}
</div>
```

## Luu y
- Khong boc tung row bang `motion.div` neu row xuat hien hang loat trong list.
- Khong dung `transition-all` cho tab/filter/action trong vung scroll.
- Khong dung hover translate hoac hover shadow tren moi row; uu tien border, color, ring nhe.
- Neu van thay khung, giam hoac bo cac lop `blur-3xl`, glow lon va `will-change` tren nhieu phan tu lap lai. `will-change` chi nen dat tren panel dang animate, khong dat hang loat tren card.

---

# Cập Nhật: Chuẩn Hóa Trang Hub / Dashboard Nhiều Card (Vocabulary Hub)

Áp dụng cho các trang tổng quan (Hub/Dashboard) có Hero Banner, lưới bài học, bộ công cụ luyện tập và các widget thống kê.

## 1. Nguyên Tắc Tránh Lỗi Composite Layer Khổng Lồ
- **Tuyệt đối KHÔNG gắn `.smooth-scroll-area` lên thẻ cha cấp trang**:
  - Class `.smooth-scroll-area` có chứa `transform: translateZ(0)` và `overscroll-behavior: contain`.
  - Nếu gắn lên thẻ container bao bọc cả trang (vốn cuộn theo `window`), GPU sẽ bị ép phải render một Texture Layer nguyên khối khổng lồ (chiều cao > 2000px). Khi người dùng cuộn, việc repaint và composite layer khổng lồ này sẽ gây tụt khung hình nghiêm trọng (từ 120fps rớt xuống 30-40fps).
  - **Giải pháp**: Ở cấp trang cha, chỉ sử dụng thẻ `div` bọc thông thường hoặc class nhẹ như `.vocab-main-surface` (`content-visibility: visible;`). Chỉ dùng `.smooth-scroll-area` trên các hộp có `overflow-y-auto` thực sự (như modal hoặc popup cuộn nội bộ).

## 2. Chuyển Đổi Hover/Tap Từ JS Sang Pure CSS GPU Transitions
- **Không dùng `motion.div` với `whileHover={{ y: -6 }}` và `whileTap` trên các thẻ bài học/công cụ**:
  - Khi người dùng lăn chuột lướt qua các card, Framer Motion sẽ liên tục bắt sự kiện mouseenter/mouseleave và chạy vòng lặp Animation Frame trên Main Thread, gây khựng tay cuộn.
  - **Giải pháp**: Sử dụng CSS Native:
    ```tsx
    // ✅ Chuẩn 90fps - 120fps:
    className="smooth-panel steady-scroll-row transition-colors duration-150"
    ```

## 3. Triệt Tiêu Heavy Repaints Khi Hover
- **Bỏ `hover:shadow-[0_20px_45px_...]` và `hover:shadow-xl`**: Thay bằng `shadow-sm hover:shadow-md` nhẹ nhàng hoặc đổi màu viền (`border-rose-400`).
- **Tránh scale ảnh nền raster (`group-hover:scale-105`) và watermark text lớn (`group-hover:scale-110`)**: Việc biến đổi tỷ lệ các phần tử có diện tích lớn buộc trình duyệt phải rasterize lại liên tục trên GPU.

## 4. Cô Lập Vẽ Lại (Containment) Cho Từng Widget Riêng Biệt
- Gắn `.smooth-panel` (`contain: paint style; transform: translateZ(0); backface-visibility: hidden;`) trực tiếp lên từng Widget độc lập (Hero Banner, Thẻ từ vựng hôm nay, Widget chu kỳ quên) để trình duyệt cô lập chi phí vẽ lại của từng hộp, không làm ảnh hưởng đến các phần tử xung quanh khi cuộn.

---

# Cập Nhật: Native Momentum Smooth Scroll Engine (Không Dùng Thư Viện Ngoài / No Lenis)

Nhằm giải quyết triệt để cảm giác lăn chuột bị giật bước (100px/step) trên hệ điều hành Windows mà **không cài bất kỳ thư viện npm bên ngoài nào (0 byte overhead, không dùng Lenis)**:

## 1. Cơ Chế Hoạt Động (`src/utils/nativeSmoothScroll.ts`)
- **Nội suy quán tính vi sai (Differential Lerp)**:
  - Bắt sự kiện `wheel` của con lăn chuột và tính toán vị trí mục tiêu `targetY`.
  - Sử dụng vòng lặp `requestAnimationFrame` trực tiếp với `ease = 0.18` được chuẩn hóa theo `elapsed` từng frame, giúp chuyển động đều hơn trên màn hình **60Hz / 90Hz / 120Hz / 144Hz**.
- **Tự động nhận diện ngữ cảnh thông minh**:
  - **Trackpad Pass-through**: Nhận diện cử chỉ touchpad (delta nhỏ liên tục) để giữ nguyên chuyển động gốc của hệ điều hành.
  - **Inner Container Pass-through**: Tự động nhận diện khi con trỏ chuột nằm trong Modal, Sidebar hoặc Dropdown có `overflow-y: auto` để nhường quyền cuộn cho khung con, không chặn cuộn nội bộ.
  - **Scrollbar Dragging Sync**: Tự động đồng bộ vị trí khi người dùng kéo thanh scrollbar bằng chuột hoặc bấm phím điều hướng.
- **Tối ưu triệt để Main Thread (`body.is-smooth-scrolling`)**:
  - Không dùng `pointer-events: none` trên toàn `body` vì có thể làm mất tương tác và gây style recalculation rộng.
  - Chỉ tạm dừng `transition`/`animation` trong khu vực đang cần performance bằng class route như `body.vocab-performance-scroll`.

## 2. Nâng Cấp Giao Diện Scrollbar Kính Mờ Cao Cấp (Glassmorphic Scrollbar)
- Thiết kế thanh cuộn dạng viên thuốc bo tròn (Pill Capsule), viền trong suốt `background-clip: padding-box`.
- Hiệu ứng đổi màu chuyển tiếp mượt mà `0.2s cubic-bezier` khi Hover và Active kéo chuột.
- Hỗ trợ đầy đủ chuẩn W3C `scrollbar-width: thin` và `scrollbar-color` cho cả Chrome/Edge và Firefox.

## 3. Cap Nhat Silky Scroll Cho Trang Vocabulary Hub
- `NativeSmoothScroll` dung lerp theo thoi gian frame (`elapsed`) thay vi ease co dinh theo moi RAF. Cach nay giu cam giac deu hon tren man 60/90/120/144Hz.
- Khi nguoi dung `pointerdown`, `touchstart`, `keydown` hoac keo scrollbar, engine dung ngay va dong bo ve native `window.scrollY` de khong giat nguoc.
- Trang Vocabulary Hub them `body.vocab-performance-scroll`; trong luc `body.is-smooth-scrolling`, chi pause transition/animation ben trong hub/header/sidebar thay vi khoa pointer toan trang.
- Hero mascot trong trang hub nen de static (`disableMotion`) neu mascot la SVG co nhieu `motion.g` lap vo han. Animation mascot chi nen dung trong modal/auth/onboarding, khong dat trong vung cuon dai.
- Sticky chrome nhu Header/Sidebar khong nen co `backdrop-filter`, `blur-2xl/3xl`, `will-change` layer lon hoac shadow lon. Dung nen trang/opacity cao, `shadow-sm`, `transition-colors`.
