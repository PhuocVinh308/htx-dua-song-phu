import React from 'react';
import { X, Check, ArrowRight, ShoppingCart, Plus, Sparkles, Scale } from 'lucide-react';

export default function ProductCompareModal({
  isOpen,
  onClose,
  compareList = [],
  onRemoveFromCompare,
  onAddToCart,
  onClearCompare
}) {
  if (!isOpen) return null;

  const specs = [
    { label: 'Giá bán', render: (p) => <span className="font-extrabold text-emerald-800 text-sm">{p.price?.toLocaleString('vi-VN')} ₫</span> },
    { label: 'Quy cách / Khối lượng', render: (p) => <span className="font-medium text-gray-700">{p.unit || 'Theo quả / hũ'}</span> },
    { label: 'Độ ngọt tự nhiên (°Brix)', render: (p) => <span className="font-bold text-amber-700">{p.brix || (p.category === 'trai-cay-tuoi' ? '7.8 - 8.5° Brix' : 'Tự nhiên không đường')}</span> },
    { label: 'Tiêu chuẩn chất lượng', render: (p) => <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">{p.badge || 'OCOP 4 SAO'}</span> },
    { label: 'Công nghệ chế biến', render: (p) => <span className="text-gray-600 text-xs">{p.tech || 'Sơ chế lạnh khép kín'}</span> },
    { label: 'Hạn sử dụng', render: (p) => <span className="text-gray-600 text-xs">{p.shelfLife || '45 ngày (2-5°C)'}</span> },
    { label: 'Đặc điểm nổi bật', render: (p) => <span className="text-gray-600 text-xs line-clamp-2">{p.tagline || p.desc}</span> },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn font-sans">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                Bảng So Sánh Chi Tiết Sản Phẩm
              </h3>
              <p className="text-xs text-gray-500">
                Đối chiếu thông số kỹ thuật, quy chuẩn chế biến và giá thành nông sản dừa SOCOOP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={onClearCompare}
                className="hidden sm:inline-block text-xs text-gray-400 hover:text-red-500 font-medium px-3 py-1.5 transition"
              >
                Xóa tất cả
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          {compareList.length === 0 ? (
            <div className="py-20 text-center">
              <Scale className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-bold">Chưa chọn sản phẩm nào để so sánh</p>
              <p className="text-xs text-gray-400 mt-1">Bấm nút "So sánh" trên các thẻ sản phẩm để đưa vào bảng đối chiếu.</p>
            </div>
          ) : (
            <div className="min-w-[600px]">
              {/* Product Cards Row */}
              <div className="grid grid-cols-4 gap-4 pb-6 border-b border-gray-200">
                <div className="col-span-1 flex flex-col justify-end p-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Sản Phẩm ({compareList.length}/4)
                  </span>
                </div>
                {compareList.map((p) => (
                  <div key={p.id} className="relative bg-gray-50/80 rounded-2xl p-3 border border-gray-200 flex flex-col justify-between text-center group">
                    <button
                      onClick={() => onRemoveFromCompare?.(p.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow text-gray-400 hover:text-red-500 flex items-center justify-center transition"
                      title="Gỡ khỏi bảng so sánh"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 bg-white border border-gray-100">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 truncate mb-1">{p.name}</h4>
                    <button
                      onClick={() => onAddToCart?.(p, 1)}
                      className="mt-2 w-full py-1.5 rounded-lg btn-pill-green text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Chọn Mua</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Specs Rows */}
              <div className="divide-y divide-gray-100 text-xs">
                {specs.map((spec, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 py-3.5 items-center hover:bg-gray-50/50 transition">
                    <span className="font-bold text-gray-500 pl-2">{spec.label}</span>
                    {compareList.map((p) => (
                      <div key={p.id} className="text-center px-2">
                        {spec.render(p)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Cam kết đồng nhất tiêu chuẩn chất lượng 100% từ HTX Dừa Song Phú</span>
          <button
            onClick={onClose}
            className="btn-pill-green px-5 py-2 font-bold"
          >
            Đóng bảng so sánh
          </button>
        </div>
      </div>
    </div>
  );
}
