import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist = [],
  onRemoveFromWishlist,
  onAddToCart,
  onClearWishlist,
  onExploreProducts,
  onQuickView
}) {
  if (!isOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((prod) => {
      onAddToCart?.(prod, 1);
    });
    onClearWishlist?.();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#fbfbfb]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  Sản Phẩm Yêu Thích
                </h3>
                <span className="text-[11px] text-gray-400">
                  {wishlist.length} sản phẩm đã lưu
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm">
                  Chưa có sản phẩm yêu thích nào
                </h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Hãy bấm vào biểu tượng trái tim ở các sản phẩm để lưu lại xem sau nhé!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts?.();
                  }}
                  className="btn-pill-green px-5 py-2 text-xs font-bold mt-2"
                >
                  Khám Phá Sản Phẩm Ngay
                </button>
              </div>
            ) : (
              wishlist.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white shadow-xs transition group"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    onClick={() => {
                      onQuickView?.(prod);
                      onClose();
                    }}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
                  />

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onQuickView?.(prod);
                        onClose();
                      }}
                      className="font-bold text-xs sm:text-sm text-gray-900 truncate hover:text-[#2e6b27] cursor-pointer"
                    >
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate">{prod.tagline || prod.category}</p>
                    <p className="text-xs font-bold text-emerald-800 mt-0.5">
                      {prod.price?.toLocaleString('vi-VN')} ₫
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onAddToCart?.(prod, 1);
                        onRemoveFromWishlist?.(prod.id);
                      }}
                      className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0f4c3a] transition"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist?.(prod.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition"
                      title="Xóa khỏi danh sách"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-[#fbfbfb] space-y-2.5">
              <button
                onClick={handleMoveAllToCart}
                className="w-full py-3 px-4 rounded-xl bg-[#0f4c3a] hover:bg-[#155d47] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Tất Cả Vào Giỏ Hàng</span>
              </button>

              <button
                onClick={onClearWishlist}
                className="w-full py-2 text-center text-xs text-gray-400 hover:text-red-500 transition font-medium"
              >
                Xóa tất cả mục đã lưu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
