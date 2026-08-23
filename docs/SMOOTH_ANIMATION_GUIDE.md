# HƯỚNG DẪN CHUẨN HÓA ANIMATION & HIỆU NĂNG 120FPS (SMOOTH ANIMATION GUIDE)

> **Tài liệu quy chuẩn chuyển động (Motion & Animation Standards) áp dụng đồng bộ cho toàn bộ dự án JP FORUS.**  
> Mục tiêu: Đảm bảo mọi Modal, Dropdown, Button, Card, Tab và Page Transition đều mượt mà 90fps - 120fps, không bao giờ giật lag, khựng vị trí hay tụt khung hình (Zero Frame Drops).

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE GOLDEN RULES)

### 🥇 Quy tắc 1: Chỉ Animate thuộc tính Compositor (GPU-Only Properties)
* **TUYỆT ĐỐI CHỈ DÙNG**: `transform` (`scale`, `translate`, `rotate`) và `opacity`.
* **CẤM DÙNG**: `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width` trong animation vì chúng kích hoạt **Layout & Repaint** trên CPU ở từng khung hình.

### 🥈 Quy tắc 2: Bộ Đường Cong Chuyển Động Chuẩn (Standard Easing Library)

| Mục đích sử dụng | Đường cong (Easing / Spring) | Thời lượng (Duration) | Cảm giác trải nghiệm |
| :--- | :--- | :--- | :--- |
| **Modal / Dialog / Bottom Sheet** | `ease: [0.16, 1, 0.3, 1]` *(Cinematic Expo-Out)* | `0.35s - 0.40s` | Lướt mở dứt khoát, giảm tốc siêu êm (Chuẩn Apple iOS / macOS) |
| **Dropdown / Menu / Tooltip** | `ease: [0.22, 1, 0.36, 1]` | `0.20s - 0.25s` | Nhanh, chính xác, không trễ thao tác |
| **Button / Icon / Micro-interactions** | `type: "spring", stiffness: 400, damping: 25` | Tự động theo vật lý | Đàn hồi, phản hồi xúc giác như phím cơ |
| **Card / Tile Hover** | `ease: [0.25, 1, 0.5, 1]` | `0.25s - 0.30s` | Nổi nhẹ nhàng, không nảy giật |
| **Backdrop Overlay (Fade)** | `ease: "easeOut"` | `0.20s - 0.25s` | Mờ nền êm ái, bảo vệ tài nguyên GPU |

---

## 2. NHẬN DIỆN & KHẮC PHỤC 4 LỖI CHUYỂN ĐỘNG PHỔ BIẾN

### ❌ Lỗi 1: `backdrop-blur` trên phần tử đang animate
* **Triệu chứng**: Modal mở ra bị đơ 0.2s đầu, FPS tụt từ 120 xuống 25.
* **Nguyên nhân**: Khi lớp nền `fixed inset-0` có `backdrop-blur` thay đổi `opacity: 0 -> 1`, GPU buộc phải làm mờ lại 2.073.600 pixel (màn Full HD) 60-120 lần/giây.
* **Giải pháp chuẩn**:
  ```tsx
  // ❌ SAI:
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/60 backdrop-blur-md" />

  // ✅ ĐÚNG:
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease: "easeOut" }} className="fixed inset-0 bg-slate-950/65" />
  ```

---

### ❌ Lỗi 2: Xung đột ma trận Transform lồng nhau (Parent + Children Collision)
* **Triệu chứng**: Khung cha vừa phóng to, các thẻ con bên trong cũng vừa scale vừa chạy lên, khiến chuyển động giật cục, rung lắc.
* **Giải pháp chuẩn (Decoupled Motion)**:
  - Khung cha chịu trách nhiệm phóng mở duy nhất.
  - Các phần tử con giữ layout tĩnh tự nhiên, chỉ animate hover hoặc stagger `opacity` đơn thuần.

---

### ❌ Lỗi 3: Ngắt `AnimatePresence` trước khi kịp chạy Exit Animation
* **Triệu chứng**: Modal mở có hiệu ứng nhưng khi đóng/tắt thì **biến mất trong 0ms** giật cục.
* **Nguyên nhân**: Đặt `if (!isOpen) return null;` trước `<AnimatePresence>`.
* **Giải pháp chuẩn**:
  ```tsx
  // ❌ SAI:
  export const MyModal = ({ isOpen }) => {
    if (!isOpen) return null;
    return createPortal(<AnimatePresence><motion.div ... /></AnimatePresence>, document.body);
  };

  // ✅ ĐÚNG:
  export const MyModal = ({ isOpen, onClose }) => {
    return createPortal(
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="fixed inset-0 z-[99999] ...">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} ... />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 12 }} ... />
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  };
  ```

---

### ❌ Lỗi 4: CSS `transition: all 0.2s` và `box-shadow` nặng
* **Triệu chứng**: Rê chuột qua thẻ cảm giác cứng đờ, giật cục.
* **Nguyên nhân**: `transition: all` ép trình duyệt theo dõi hàng chục thuộc tính cùng lúc; `box-shadow` lớn buộc tính toán lại đồ họa mỗi frame.
* **Giải pháp chuẩn**:
  ```tsx
  // ✅ Dùng Framer Motion whileHover với GPU acceleration:
  <motion.div
    initial={false}
    whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
    className="smooth-panel rounded-2xl border bg-white p-5 shadow-md"
  >
  ```

---

## 3. CÁC MẪU CODE CHUẨN ÁP DỤNG MỌI NƠI (COPY-PASTE BLUEPRINTS)

### 📦 Blueprint 1: Modal / Popup / Dialog Chuẩn 120fps
```tsx
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const StandardModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-slate-950/60"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="relative flex flex-col w-full max-w-lg max-h-[calc(100vh-32px)] overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{title}</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
              >
                ✕
              </motion.button>
            </div>

            <div className="smooth-scroll-area flex-1 overflow-y-auto pt-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
```

---

### 🔘 Blueprint 2: Nút Bấm Xúc Giác Đàn Hồi (Tactile Spring Button)
```tsx
import { motion } from 'framer-motion';

export const TactileButton = ({ onClick, children, className = '' }) => (
  <motion.button
    whileHover={{ scale: 1.03, y: -1 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-black shadow-md ${className}`}
  >
    {children}
  </motion.button>
);
```

---

### 🃏 Blueprint 3: Thẻ Card Nổi Mượt Mà (Smooth Elevated Card)
```tsx
import { motion } from 'framer-motion';

export const SmoothCard = ({ children, className = '' }) => (
  <motion.div
    initial={false}
    whileHover={{ 
      y: -6,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } 
    }}
    className={`smooth-panel rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 ${className}`}
  >
    {children}
  </motion.div>
);
```

---

### 📜 Blueprint 4: Dropdown / Flyout Menu Mở Nhanh
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Menu items */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 4. CHECKLIST KIỂM THỬ TRƯỚC KHI DEPLOY (QA CHECKLIST)

1. [ ] **Chỉ dùng transform & opacity**: Không animate `width/height/margin/padding`.
2. [ ] **Đúng vị trí `AnimatePresence`**: Luôn bọc `{isOpen && (...)}` bên trong `AnimatePresence`.
3. [ ] **Không lồng transform cha + con**: Khung cha zoom thì con không đồng thời zoom.
4. [ ] **Khử tải backdrop-blur**: Không animate opacity trên backdrop có blur.
5. [ ] **Có `will-change: transform, opacity`** trên các modal/dropdown chuyển cảnh nhanh.
6. [ ] **Kiểm tra FPS**: Bật Chrome DevTools `More Tools -> Rendering -> Frame Rendering Stats`, đảm bảo đồ thị FPS thẳng đứng ở 90fps - 120fps khi đóng/mở.
