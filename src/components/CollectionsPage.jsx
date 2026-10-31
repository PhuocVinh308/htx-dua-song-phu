import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CollectionsPage({ collections }) {
  return (
    <div className="bg-white min-h-screen py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Title & Breadcrumb chuẩn Ảnh 4 */}
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            BỘ SƯU TẬP
          </h1>
          <p className="text-xs text-gray-400">
            Trang chủ &nbsp;/&nbsp; Tin tức &nbsp;/&nbsp; <span className="text-[#3b8224] font-medium">Bộ Sưu Tập</span>
          </p>
        </div>

        {/* LƯỚI 3 CỘT BÀI VIẾT BỘ SƯU TẬP CHUẨN XÁC NHƯ ẢNH 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item) => (
            <article key={item.id} className="space-y-3 group cursor-pointer">
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-gray-100 shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span>{item.date}</span>
                  <span className="text-[#3b8224] font-semibold">{item.category}</span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-gray-900 uppercase leading-snug line-clamp-2 group-hover:text-[#2e6b27] transition">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-800 group-hover:text-[#4fa32d] uppercase">
                    <span>ĐỌC TIẾP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
