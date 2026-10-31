import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ProductCard({ product, onQuickView }) {
  return (
    <article 
      onClick={() => onQuickView && onQuickView(product)}
      className="tb-product-card p-3 sm:p-4 flex flex-col justify-between items-center text-center cursor-pointer group"
    >
      {/* Ảnh sản phẩm (tương tự Ảnh 1 & Ảnh 3) */}
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2 mb-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Tên sản phẩm in hoa đậm font Barlow chuẩn mẫu Thanh Bình */}
      <h3 className="text-xs sm:text-[13px] font-bold text-gray-800 uppercase tracking-tight group-hover:text-[#3b7e28] transition line-clamp-2 min-h-[36px] flex items-center justify-center mb-3">
        {product.name}
      </h3>

      {/* Nút Xem chi tiết màu xanh lá dạng pill chuẩn 100% như trong ảnh */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onQuickView && onQuickView(product);
        }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#70a340] hover:bg-[#5d8e30] text-white text-[11px] font-bold shadow-sm transition"
      >
        <span className="w-3.5 h-3.5 rounded-full bg-white text-[#70a340] flex items-center justify-center text-[9px] font-black">
          ›
        </span>
        <span className="tracking-wide">XEM CHI TIẾT</span>
      </button>
    </article>
  );
}
