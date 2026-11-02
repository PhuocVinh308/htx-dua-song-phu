import React from 'react';
import ProductCard from './ProductCard.jsx';
import { ArrowRight } from 'lucide-react';

export default function ProductSection({
  products = [],
  onQuickView,
  onExploreAll,
  wishlistIds = [],
  onToggleWishlist,
  compareIds = [],
  onToggleCompare,
}) {
  // Hiển thị 12 sản phẩm nổi bật ở trang chủ (như trong Ảnh 1)
  const featured = products.slice(0, 12);

  return (
    <section className="py-14 sm:py-20 bg-white" id="products">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề & mô tả chuẩn Ảnh 1 */}
        <div className="text-center mb-10">
          <h2 className="font-script-title mb-2">
            Sản phẩm nổi bật
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mb-3">
            Thực phẩm hữu cơ: Sự lựa chọn chất lượng và tốt cho sức khỏe.
          </p>
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4fa32d] fill-current">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.2-.1-1.2.2-2.4.9-3.4 1.2-1.7 3.2-2.8 5.4-2.8 1.5 0 2.9.5 4 1.4 1.2.9 2 2.3 2.2 3.8 2.5-1.7 4-4.5 4-7.2 0-5.5-4.5-10-9-10z" />
            </svg>
          </div>
        </div>

        {/* Lưới 4 cột x 3 hàng như trong Ảnh 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              isLiked={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              isCompared={compareIds.includes(product.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
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
