import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Hook đo chiều cao thực tế của nội dung trang thông qua ResizeObserver
  useEffect(() => {
    if (!contentRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(contentRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Bắt giá trị cuộn gốc của trình duyệt
  const { scrollY } = useScroll();

  // Áp dụng thuật toán Lò xo (Spring Physics) để làm mượt giá trị cuộn
  const transform = useTransform(scrollY, (y) => -y);
  const physics = { damping: 90, mass: 0.1, stiffness: 800 }; // Cuộn dứt khoát, không trượt dài
  const spring = useSpring(transform, physics);

  // Tính toán chiều cao ảo cho màn hình gốc để trình duyệt hiển thị thanh cuộn
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Container chính hiển thị nội dung - Bị khóa ở vị trí fixed */}
      <motion.div
        ref={contentRef}
        style={{ y: spring }}
        className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>

      {/* Thẻ div "bóng ma" để tạo không gian cuộn cho trình duyệt */}
      <div style={{ height: contentHeight }} className="w-full" />
    </>
  );
};
