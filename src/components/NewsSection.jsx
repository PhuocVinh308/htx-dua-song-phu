import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function NewsSection({ newsList, onExploreAll, onArticleClick }) {
  const [startIndex, setStartIndex] = useState(0);

  const prevArticle = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const nextArticle = () => {
    setStartIndex((prev) => Math.min(newsList.length - 3, prev + 1));
  };

  const visibleNews = newsList.slice(startIndex, startIndex + 3);

  return (
    <section className="py-14 sm:py-20 bg-white" id="news">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề & mô tả chuẩn Ảnh 1 */}
        <div className="text-center mb-10">
          <h2 className="font-script-title mb-2">
            Tin tức nổi bật
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mb-3">
            Cùng khám phá những thông tin mới nhất về thực phẩm hữu cơ để hiểu sâu hơn về những lợi ích mà nó mang lại.
          </p>
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4fa32d] fill-current">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.2-.1-1.2.2-2.4.9-3.4 1.2-1.7 3.2-2.8 5.4-2.8 1.5 0 2.9.5 4 1.4 1.2.9 2 2.3 2.2 3.8 2.5-1.7 4-4.5 4-7.2 0-5.5-4.5-10-9-10z" />
            </svg>
          </div>
        </div>

        {/* Lưới bài viết có mũi tên trái phải và điều hướng mobile */}
        <div className="relative">
          <button
            onClick={prevArticle}
            disabled={startIndex === 0}
            className={`flex absolute -left-2 sm:-left-5 top-1/3 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-600 hover:text-[#4fa32d] transition ${
              startIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'
            }`}
            aria-label="Bài trước"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={nextArticle}
            disabled={startIndex >= newsList.length - 1}
            className={`flex absolute -right-2 sm:-right-5 top-1/3 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-600 hover:text-[#4fa32d] transition ${
              startIndex >= newsList.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'
            }`}
            aria-label="Bài kế tiếp"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Desktop view: 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {newsList.slice(Math.min(startIndex, Math.max(0, newsList.length - 3)), Math.min(startIndex, Math.max(0, newsList.length - 3)) + 3).map((item) => (
              <article
                key={item.id}
                onClick={() => onArticleClick && onArticleClick(item)}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between cursor-pointer hover:shadow-md transition"
              >
                <div>
                  <div className="w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                      <span>{item.date}</span>
                      <span className="text-[#3b8224] font-semibold">{item.category}</span>
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-gray-800 uppercase leading-snug line-clamp-2 hover:text-[#2e6b27] transition mb-2">
                      {item.title}
                    </h3>

                    <p className="text-[12px] text-gray-500 line-clamp-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-4 pt-1">
                  <span className="inline-flex items-center text-[11px] font-bold text-[#4fa32d] hover:underline">
                    <span>› Xem Chi tiết</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile view: single card with active index */}
          <div className="block md:hidden">
            {newsList[startIndex] && (
              <article
                onClick={() => onArticleClick && onArticleClick(newsList[startIndex])}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between cursor-pointer hover:shadow-md transition"
              >
                <div>
                  <div className="w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={newsList[startIndex].image}
                      alt={newsList[startIndex].title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                      <span>{newsList[startIndex].date}</span>
                      <span className="text-[#3b8224] font-semibold">{newsList[startIndex].category}</span>
                    </div>

                    <h3 className="font-bold text-sm text-gray-800 uppercase leading-snug hover:text-[#2e6b27] transition mb-2">
                      {newsList[startIndex].title}
                    </h3>

                    <p className="text-[12px] text-gray-500 line-clamp-3 leading-relaxed">
                      {newsList[startIndex].desc}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1">
                  <span className="inline-flex items-center text-[11px] font-bold text-[#4fa32d] hover:underline">
                    <span>› Xem Chi tiết</span>
                  </span>
                </div>
              </article>
            )}

            {/* Mobile Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {newsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStartIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    startIndex === idx ? 'w-6 bg-[#4fa32d]' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Bài viết ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Nút Xem Thêm bên dưới chuẩn Ảnh 1 */}
        <div className="text-center mt-10">
          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 btn-pill-green px-7 py-2.5 text-xs sm:text-sm shadow-md"
          >
            <span>Xem thêm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
