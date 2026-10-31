// Component Dùng Chung: ProductCard (Thẻ Sản Phẩm Tái Sử Dụng theo phong cách WooCommerce HTX Thanh Bình)
export function createProductCard(product, onQuickView, onAddToCart, onTraceClick) {
  const card = document.createElement("article");
  card.className = "htx-card flex flex-col justify-between overflow-hidden group";
  card.dataset.productId = product.id;

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(product.price);

  const formattedOriginalPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(product.originalPrice);

  card.innerHTML = `
    <!-- Image Wrapper (ar-1-1 tương tự Thanh Bình) -->
    <div class="relative w-full aspect-square overflow-hidden bg-gray-100 img-zoom-wrapper cursor-pointer" id="product-img-click">
      <img src="${product.image}" 
           alt="${product.name}" 
           loading="lazy"
           class="w-full h-full object-cover img-zoom">

      <!-- Badge OCOP / Nổi bật -->
      <div class="absolute top-3 left-3 z-10">
        <span class="inline-block px-2.5 py-1 text-[11px] font-extrabold text-white rounded-md shadow-md ${product.badgeColor}">
          ${product.badge}
        </span>
      </div>

      <!-- Quick Action Floating Overlay -->
      <div class="absolute inset-0 bg-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
        <button class="btn-quick-view p-2.5 rounded-full bg-white text-emerald-900 hover:bg-emerald-600 hover:text-white transition shadow-lg transform translate-y-3 group-hover:translate-y-0" title="Xem chi tiết nhanh">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
        </button>
        <button class="btn-trace-code p-2.5 rounded-full bg-amber-400 text-emerald-950 hover:bg-amber-300 transition shadow-lg transform translate-y-3 group-hover:translate-y-0" title="Tra cứu nguồn gốc lô hàng này">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
        </button>
      </div>
    </div>

    <!-- Product Info Content -->
    <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
      <div>
        <!-- Rating & Batch Tag -->
        <div class="flex items-center justify-between text-xs text-gray-500 mb-1.5">
          <div class="flex items-center text-amber-500">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <span class="ml-1 font-bold text-gray-800">${product.rating}</span>
            <span class="text-gray-400 ml-1">(${product.reviewsCount})</span>
          </div>
          <span class="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            ${product.traceBatch}
          </span>
        </div>

        <!-- Product Title (Tương tự h3.woocommerce-loop-product__title) -->
        <h3 class="font-bold text-base sm:text-lg text-emerald-950 group-hover:text-emerald-700 transition line-clamp-2 leading-snug mb-1 cursor-pointer" id="product-title-click">
          ${product.name}
        </h3>

        <!-- Tagline / Dòng phụ -->
        <p class="text-xs text-gray-500 line-clamp-1 mb-3">
          ${product.tagline}
        </p>
      </div>

      <!-- Pricing & Add to Cart -->
      <div class="pt-3 border-t border-gray-100">
        <div class="flex items-baseline gap-2 mb-3">
          <span class="text-lg sm:text-xl font-extrabold text-emerald-800">
            ${formattedPrice}
          </span>
          <span class="text-xs text-gray-400 line-through">
            ${formattedOriginalPrice}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button class="btn-card-detail w-full py-2 px-3 rounded-lg border border-emerald-700 text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition flex items-center justify-center gap-1">
            <span>Chi tiết</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
          
          <button class="btn-card-add-cart w-full py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <span>Chọn mua</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Gắn sự kiện
  const triggerQuickView = () => onQuickView && onQuickView(product);
  const triggerAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart && onAddToCart(product);
  };
  const triggerTrace = (e) => {
    e.stopPropagation();
    onTraceClick && onTraceClick(product.traceBatch);
  };

  card.querySelector("#product-img-click").addEventListener("click", triggerQuickView);
  card.querySelector("#product-title-click").addEventListener("click", triggerQuickView);
  card.querySelector(".btn-quick-view").addEventListener("click", (e) => {
    e.stopPropagation();
    triggerQuickView();
  });
  card.querySelector(".btn-card-detail").addEventListener("click", (e) => {
    e.stopPropagation();
    triggerQuickView();
  });
  card.querySelector(".btn-card-add-cart").addEventListener("click", triggerAddToCart);
  card.querySelector(".btn-trace-code").addEventListener("click", triggerTrace);

  return card;
}
