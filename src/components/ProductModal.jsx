import React, { useState } from 'react';
import { X, Star, Check, ArrowRight, Plus } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart, onTraceClick }) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const formattedPrice = Number.isFinite(product.price)
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)
    : '0 ₫';
  const formattedOriginal = Number.isFinite(product.originalPrice)
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)
    : null;

  const traceCode = product.traceBatch || 'SP-DXL-2026-01';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-md">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80'}
              alt={product.name || 'Sản phẩm'}
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-md shadow ${product.badgeColor || 'bg-emerald-600'}`}>
              {product.badge || 'OCOP 4 SAO'}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Mã lô: {traceCode}
                </span>
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{product.rating || 5.0} ({product.reviewsCount || 24} đánh giá)</span>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-emerald-950 leading-tight">
                {product.name || 'Sản phẩm HTX Song Phú'}
              </h2>
              {product.tagline && (
                <p className="text-xs text-amber-700 font-medium mt-1">
                  {product.tagline}
                </p>
              )}
            </div>

            <div className="flex items-baseline gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-2xl font-extrabold text-emerald-900 font-heading">
                {formattedPrice}
              </span>
              {formattedOriginal && (
                <span className="text-xs text-gray-400 line-through">
                  {formattedOriginal}
                </span>
              )}
              {product.unit && (
                <span className="text-xs text-gray-500 font-medium">/ {product.unit}</span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {product.shortDesc || product.desc || 'Sản phẩm dừa tự nhiên chất lượng cao từ HTX Dừa Song Phú.'}
            </p>

            <div className="text-xs text-gray-500 border-t border-b border-gray-100 py-2.5 flex items-center justify-between">
              <span>Nông hộ: <b>{product.farmerName || 'Tổ hợp tác xã viên Song Phú'}</b></span>
              <button
                onClick={() => {
                  onClose();
                  onTraceClick && onTraceClick(traceCode);
                }}
                className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
              >
                Tra cứu lý lịch lô
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {Array.isArray(product.features) && product.features.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Đặc điểm nổi bật:</h4>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {typeof product.features === 'string' && product.features.trim().length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Đặc điểm nổi bật:</h4>
                <p className="text-xs text-gray-700 leading-relaxed">{product.features}</p>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden text-sm bg-gray-50">
                <button
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-gray-600 font-bold hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-3 py-2 font-mono font-bold text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="px-3 py-2 text-gray-600 font-bold hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  if (onAddToCart) onAddToCart(product, qty);
                  if (onClose) onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Vào Giỏ Hàng</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
