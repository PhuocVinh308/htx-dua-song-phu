import React, { useState, useMemo, useRef, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'trai-cay-tuoi', label: 'Dừa tươi & Dừa sáp' },
  { id: 'thuc-pham', label: 'Thực phẩm từ dừa' },
  { id: 'trai-cay-say', label: 'Trái cây sấy' },
  { id: 'my-pham', label: 'Dầu dừa & Mỹ phẩm' },
  { id: 'thu-cong', label: 'Thủ công mỹ nghệ' },
  { id: 'vat-lieu', label: 'Vật liệu sinh thái' },
];

// Robust product sort comparator preventing NaN pollution
export const robustSortProducts = (productsList, sortOption) => {
  const list = Array.isArray(productsList) ? [...productsList] : [];
  switch (sortOption) {
    case 'popularity':
      return list.sort((a, b) => (Number(b?.reviewsCount) || 0) - (Number(a?.reviewsCount) || 0));
    case 'rating':
      return list.sort((a, b) => (Number(b?.rating) || 0) - (Number(a?.rating) || 0));
    case 'price-asc':
      return list.sort((a, b) => (Number.isFinite(a?.price) ? a.price : 0) - (Number.isFinite(b?.price) ? b.price : 0));
    case 'price-desc':
      return list.sort((a, b) => (Number.isFinite(b?.price) ? b.price : 0) - (Number.isFinite(a?.price) ? a.price : 0));
    case 'default':
    default:
      return list;
  }
};

export default function ProductsPage({
  products = [],
  onQuickView,
  selectedCategory = 'all',
  onSelectCategory,
  wishlistIds = [],
  onToggleWishlist,
  compareIds = [],
  onToggleCompare,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  const recentScrollRef = useRef(null);
  const pageSize = 10;

  const safeProducts = Array.isArray(products) ? products : [];

  useEffect(() => {
    setLocalCategory(selectedCategory);
    setCurrentPage(1);
  }, [selectedCategory]);

  const activeCategory = onSelectCategory ? selectedCategory : localCategory;

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setLocalCategory(catId);
    }
    setCurrentPage(1);
  };

  // 1. Lọc theo danh mục
  const filteredProducts = useMemo(() => {
    if (!activeCategory || activeCategory === 'all') return safeProducts;
    return safeProducts.filter((p) => p && p.category === activeCategory);
  }, [safeProducts, activeCategory]);

  // 2. Sắp xếp theo lựa chọn
  const sortedProducts = useMemo(() => {
    return robustSortProducts(filteredProducts, sortOption);
  }, [filteredProducts, sortOption]);

  // 3. Phân trang
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [sortedProducts, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Cuộn sản phẩm đã xem
  const scrollRecent = (direction) => {
    if (recentScrollRef.current) {
      const distance = 280;
      recentScrollRef.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth',
      });
    }
  };

  // Danh sách sản phẩm đã xem (lấy 8 sản phẩm tiêu biểu)
  const recentlyViewed = useMemo(() => {
    return safeProducts.slice(0, 8);
  }, [safeProducts]);

  return (
    <div className="bg-white min-h-screen py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Title & Breadcrumb chuẩn Ảnh 3 */}
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 font-heading">
            SẢN PHẨM
          </h1>
          <p className="text-xs text-gray-400">
            Trang chủ &nbsp;/&nbsp; <span className="text-[#3b8224] font-medium">Sản phẩm</span>
          </p>
        </div>

        {/* Category Filter Pills / Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shadow-sm border ${
                    isActive
                      ? 'bg-[#3b7e28] text-white border-[#3b7e28] shadow'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thanh kết quả và sắp xếp chuẩn Ảnh 3 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 mb-8 border-b border-gray-100 pb-4">
          <span>
            {sortedProducts.length === 0 ? (
              'Không tìm thấy sản phẩm nào'
            ) : (
              <>
                Hiển thị {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, sortedProducts.length)} của {sortedProducts.length} kết quả
              </>
            )}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 hidden sm:inline">Sắp xếp:</span>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-[#3b7e28]"
            >
              <option value="default">Thứ tự mặc định</option>
              <option value="popularity">Mức độ phổ biến</option>
              <option value="rating">Điểm đánh giá</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>

        {/* LƯỚI SẢN PHẨM 5 CỘT CHUẨN XÁC NHƯ ẢNH 3 */}
        {paginatedProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-500 space-y-3">
            <p className="font-bold text-base">Chưa có sản phẩm nào trong danh mục này</p>
            <button
              onClick={() => handleCategoryClick('all')}
              className="px-4 py-2 rounded-full bg-[#70a340] text-white text-xs font-bold hover:bg-[#5d8e30] transition"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-12">
            {paginatedProducts.map((product) => (
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
        )}

        {/* Phân Trang Chuẩn Ảnh 3 (Active Pagination) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mb-16 text-xs font-bold text-gray-700">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 transition ${
                currentPage === 1 ? 'opacity-30 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100'
              }`}
              title="Trang trước"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm ${
                    isActive
                      ? 'bg-[#4fa32d] text-white font-bold'
                      : 'hover:bg-gray-100 border border-gray-200 text-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 transition ${
                currentPage === totalPages ? 'opacity-30 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100'
              }`}
              title="Trang tiếp"
            >
              ›
            </button>
          </div>
        )}

        {/* KHỐI "SẢN PHẨM ĐÃ XEM" CHUẨN XÁC NHƯ ẢNH 3 CÓ SCROLL TIỆN LỢI */}
        <div className="border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-tight font-heading">
              SẢN PHẨM ĐÃ XEM
            </h3>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollRecent('left')}
                className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#4fa32d] hover:border-[#4fa32d] transition"
                aria-label="Cuộn sang trái"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollRecent('right')}
                className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#4fa32d] hover:border-[#4fa32d] transition"
                aria-label="Cuộn sang phải"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={recentScrollRef}
            className="flex items-stretch gap-3.5 overflow-x-auto scrollbar-none scroll-smooth pb-4"
          >
            {recentlyViewed.map((product) => (
              <div key={`recent-${product.id}`} className="w-[170px] sm:w-[190px] shrink-0">
                <ProductCard
                  product={product}
                  onQuickView={onQuickView}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
