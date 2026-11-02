import React from 'react';
import { Heart, Scale, Star } from 'lucide-react';

export default function ProductCard({
  product,
  onQuickView,
  isLiked = false,
  onToggleWishlist,
  isCompared = false,
  onToggleCompare,
}) {
  return (
    <article 
      onClick={() => onQuickView && onQuickView(product)}
      className="tb-product-card p-3 sm:p-4 flex flex-col justify-between items-center text-center cursor-pointer group relative"
    >
      {/* Floating Action Icons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        {onToggleWishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`w-7 h-7 rounded-full bg-white/95 shadow-sm border border-gray-100 flex items-center justify-center transition-transform hover:scale-110 ${
              isLiked ? 'text-rose-500 fill-rose-500' : 'text-gray-400 hover:text-rose-500'
            }`}
            title={isLiked ? 'Bỏ thích' : 'Thêm vào yêu thích'}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        )}

        {onToggleCompare && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`w-7 h-7 rounded-full bg-white/95 shadow-sm border border-gray-100 flex items-center justify-center transition-transform hover:scale-110 ${
              isCompared ? 'bg-emerald-600 text-white border-emerald-600' : 'text-gray-400 hover:text-emerald-700'
            }`}
            title={isCompared ? 'Bỏ so sánh' : 'Thêm vào so sánh'}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Badge OCOP/Top sell if present */}
      {product.badge && (
        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/90 text-white shadow-xs pointer-events-none">
          {product.badge}
        </span>
      )}

      {/* Ảnh sản phẩm (tương tự Ảnh 1 & Ảnh 3) */}
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2 mb-2">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Tên sản phẩm in hoa đậm font Barlow chuẩn mẫu Thanh Bình */}
      <h3 className="text-xs sm:text-[13px] font-bold text-gray-800 uppercase tracking-tight group-hover:text-[#3b7e28] transition line-clamp-2 min-h-[36px] flex items-center justify-center mb-1">
        {product.name}
      </h3>

      {/* Đánh giá sao & Số lượt nhận xét */}
      <div className="flex items-center justify-center gap-1 mb-1 text-[11px] text-amber-500 font-semibold" title={`Đánh giá: ${product.rating || '5.0'} / 5 sao (${product.reviewsCount || 28} nhận xét)`}>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-current text-amber-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-gray-700 font-bold ml-0.5">{product.rating || '5.0'}</span>
        <span className="text-gray-400 text-[10px] font-normal">({product.reviewsCount || 28} đánh giá)</span>
      </div>

      {/* Giá tiền niêm yết chuẩn e-commerce */}
      {product.price && (
        <p className="text-xs font-extrabold text-emerald-800 mb-2 font-mono">
          {product.price?.toLocaleString('vi-VN')} ₫
        </p>
      )}

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
