// Component Dùng Chung: ProductModal (Modal Xem Chi Tiết Sản Phẩm Chuẩn E-Commerce)
export function createProductModal(onAddToCart, onTraceClick) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-sm";
  modal.id = "product-detail-modal";

  let currentProduct = null;
  let quantity = 1;

  modal.innerHTML = `
    <div class="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 transform scale-95 transition-transform duration-300" id="modal-box">
      <!-- Close Button -->
      <button id="btn-close-modal" class="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <!-- Modal Body -->
      <div id="modal-content-body">
        <!-- Rendered by JS -->
      </div>
    </div>
  `;

  const modalBox = modal.querySelector("#modal-box");
  const modalBody = modal.querySelector("#modal-content-body");
  const btnClose = modal.querySelector("#btn-close-modal");

  function open(product) {
    currentProduct = product;
    quantity = 1;

    const formattedPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price);
    const formattedOriginal = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.originalPrice);

    modalBody.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        <!-- Image with Badge -->
        <div class="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-md">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
          <span class="absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-md shadow ${product.badgeColor}">
            ${product.badge}
          </span>
        </div>

        <!-- Info Column -->
        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span class="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Mã lô: ${product.traceBatch}
              </span>
              <span class="text-amber-500 font-bold">★ ${product.rating} (${product.reviewsCount} đánh giá)</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-heading text-emerald-950 leading-tight">
              ${product.name}
            </h2>
            <p class="text-xs text-amber-700 font-medium mt-1">
              ${product.tagline}
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span class="text-2xl font-extrabold text-emerald-900 font-heading">
              ${formattedPrice}
            </span>
            <span class="text-xs text-gray-400 line-through">
              ${formattedOriginal}
            </span>
            <span class="text-xs text-gray-500 font-medium">/ ${product.unit}</span>
          </div>

          <!-- Short Description -->
          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
            ${product.shortDesc}
          </p>

          <!-- Farmer & Trace Info -->
          <div class="text-xs text-gray-500 border-t border-b border-gray-100 py-2.5 flex items-center justify-between">
            <span>Nông hộ: <b>${product.farmerName}</b></span>
            <button id="modal-trace-link" class="text-emerald-700 hover:underline font-bold flex items-center gap-1">
              Tra cứu lý lịch lô
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          <!-- Features List -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Đặc điểm nổi bật:</h4>
            <ul class="space-y-1.5 text-xs text-gray-700">
              ${product.features.map(f => `
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Actions -->
          <div class="pt-2 flex items-center gap-3">
            <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden text-sm bg-gray-50">
              <button id="modal-qty-minus" class="px-3 py-2 text-gray-600 font-bold hover:bg-gray-200">-</button>
              <span id="modal-qty-label" class="px-3 py-2 font-mono font-bold text-gray-900">1</span>
              <button id="modal-qty-plus" class="px-3 py-2 text-gray-600 font-bold hover:bg-gray-200">+</button>
            </div>

            <button id="modal-btn-add" class="flex-1 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <span>Thêm Vào Giỏ Hàng</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Quantity events
    const qtyLabel = modal.querySelector("#modal-qty-label");
    modal.querySelector("#modal-qty-minus").addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        qtyLabel.textContent = quantity;
      }
    });
    modal.querySelector("#modal-qty-plus").addEventListener("click", () => {
      quantity++;
      qtyLabel.textContent = quantity;
    });

    // Add to cart event
    modal.querySelector("#modal-btn-add").addEventListener("click", () => {
      onAddToCart && onAddToCart(currentProduct, quantity);
      close();
    });

    // Trace link event
    modal.querySelector("#modal-trace-link").addEventListener("click", () => {
      close();
      onTraceClick && onTraceClick(currentProduct.traceBatch);
    });

    modal.classList.remove("opacity-0", "pointer-events-none");
    modalBox.classList.remove("scale-95");
    modalBox.classList.add("scale-100");
  }

  function close() {
    modal.classList.add("opacity-0", "pointer-events-none");
    modalBox.classList.remove("scale-100");
    modalBox.classList.add("scale-95");
  }

  btnClose.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  modal.openModal = open;
  modal.closeModal = close;

  return modal;
}
