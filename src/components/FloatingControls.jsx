import React, { useState, useEffect } from 'react';
import { ArrowUp, Scale } from 'lucide-react';

export default function FloatingControls({
  compareCount = 0,
  onOpenCompare
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.round((window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
        setShowScrollTop(window.scrollY > 320);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      {/* Compare Floating Pill if active */}
      {compareCount > 0 && (
        <button
          onClick={onOpenCompare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0f4c3a] hover:bg-[#165a46] text-white shadow-xl border border-amber-400/60 transition-transform hover:scale-105 animate-bounce text-xs font-bold"
          title="Mở bảng so sánh sản phẩm"
        >
          <Scale className="w-4 h-4 text-amber-300" />
          <span>So sánh ({compareCount}/4)</span>
        </button>
      )}

      {/* Scroll To Top with Circular Progress */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="relative w-11 h-11 rounded-full bg-white text-gray-700 shadow-xl border border-gray-200/80 flex items-center justify-center hover:text-[#3b8224] transition-all hover:scale-105 group"
          title={`Lên đầu trang (${scrollProgress}%)`}
        >
          {/* SVG Circular Progress Ring */}
          <svg className="w-11 h-11 absolute inset-0 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <path
              className="text-gray-100"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#4fa32d] transition-all duration-150"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <ArrowUp className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}
