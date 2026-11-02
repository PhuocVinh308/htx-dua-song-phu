import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CertificationsPage({ certifications = [], onArticleClick }) {
  return (
    <div className="bg-white min-h-screen py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Title & Breadcrumb chuẩn Ảnh 5 */}
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            CHỨNG NHẬN
          </h1>
          <p className="text-xs text-gray-400">
            Trang chủ &nbsp;/&nbsp; <span className="text-[#3b8224] font-medium">Chứng nhận</span>
          </p>
        </div>

        {/* LƯỚI 3 CỘT CHỨNG NHẬN CHUẨN XÁC NHƯ ẢNH 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((item) => (
            <article
              key={item.code}
              onClick={() => onArticleClick && onArticleClick(item)}
              className="space-y-3 group cursor-pointer"
            >
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-gray-50 border border-gray-200 shadow-sm p-2 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span>August 8, 2026</span>
                  <span className="text-[#3b8224] font-semibold">Chứng nhận</span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-gray-900 uppercase leading-snug group-hover:text-[#2e6b27] transition">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onArticleClick) onArticleClick(item);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-800 group-hover:text-[#4fa32d] hover:text-[#4fa32d] uppercase transition"
                  >
                    <span>ĐỌC TIẾP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
