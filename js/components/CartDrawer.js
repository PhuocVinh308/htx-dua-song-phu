// Component Dùng Chung: CartDrawer (Giỏ Hàng Mini Cart dạng Trượt theo phong cách WooCommerce HTX Thanh Bình)
export function createCartDrawer(cart, onUpdateQuantity, onRemoveItem, onCheckout) {
  const container = document.createElement("div");
  container.className = "fixed inset-0 z-50 pointer-events-none transition-all duration-300";
  container.id = "cart-drawer-container";

  container.innerHTML = `
    <!-- Backdrop -->
    <div id="cart-backdrop" class="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300"></div>

    <!-- Drawer Content -->
    <div id="cart-panel" class="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col justify-between transform translate-x-full transition-transform duration-300 ease-in-out pointer-events-auto">
      <!-- Drawer Header -->
      <div class="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-950 text-white">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          <h3 class="font-bold text-base font-heading">Giỏ Hàng Nông Sản HTX</h3>
          <span id="cart-total-badge" class="bg-amber-400 text-emerald-950 text-xs px-2 py-0.5 rounded-full font-bold">0</span>
        </div>
        <button id="btn-close-cart" class="p-1 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Drawer Body (Items list) -->
      <div id="cart-items-list" class="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-gray-100">
        <!-- Rendered by JS -->
      </div>

      <!-- Drawer Footer (Subtotal & Actions) -->
      <div class="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/80 space-y-4">
        <div class="flex items-center justify-between text-sm sm:text-base">
          <span class="text-gray-600 font-medium">Tổng tiền tạm tính:</span>
          <span id="cart-subtotal-price" class="text-xl font-extrabold text-emerald-900 font-heading">0 ₫</span>
        </div>

        <p class="text-[11px] text-gray-500 italic">
          * Đã bao gồm hỗ trợ đóng gói xốp kháng khuẩn và bảo hiểm tươi ngon 1 đổi 1 từ HTX.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button id="btn-cart-zalo" class="w-full py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.21.72 4.25 1.94 5.92L2 22l4.22-1.91C7.84 21.31 9.85 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
            <span>Đặt Nhanh Qua Zalo</span>
          </button>
          
          <button id="btn-cart-checkout" class="w-full py-3 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md">
            <span>Tiến Hành Đặt Hàng</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  const backdrop = container.querySelector("#cart-backdrop");
  const panel = container.querySelector("#cart-panel");
  const closeBtn = container.querySelector("#btn-close-cart");
  const itemsList = container.querySelector("#cart-items-list");
  const totalBadge = container.querySelector("#cart-total-badge");
  const subtotalLabel = container.querySelector("#cart-subtotal-price");
  const btnZalo = container.querySelector("#btn-cart-zalo");
  const btnCheckout = container.querySelector("#btn-cart-checkout");

  function openDrawer() {
    container.classList.remove("pointer-events-none");
    backdrop.classList.remove("opacity-0");
    panel.classList.remove("translate-x-full");
  }

  function closeDrawer() {
    backdrop.classList.add("opacity-0");
    panel.classList.add("translate-x-full");
    setTimeout(() => {
      container.classList.add("pointer-events-none");
    }, 300);
  }

  closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  function renderCart(currentCart) {
    const items = Object.values(currentCart);
    totalBadge.textContent = items.reduce((sum, it) => sum + it.quantity, 0);

    const totalAmount = items.reduce((sum, it) => sum + (it.product.price * it.quantity), 0);
    subtotalLabel.textContent = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(totalAmount);

    if (items.length === 0) {
      itemsList.innerHTML = `
        <div class="py-16 text-center text-gray-500 space-y-3">
          <div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
            🥥
          </div>
          <p class="font-bold text-gray-700 text-sm">Giỏ hàng của bạn đang trống</p>
          <p class="text-xs text-gray-400">Hãy thêm những đặc sản dừa tươi OCOP mát lành vào giỏ nhé!</p>
        </div>
      `;
      btnZalo.classList.add("opacity-50", "pointer-events-none");
      btnCheckout.classList.add("opacity-50", "pointer-events-none");
      return;
    }

    btnZalo.classList.remove("opacity-50", "pointer-events-none");
    btnCheckout.classList.remove("opacity-50", "pointer-events-none");

    itemsList.innerHTML = items.map(item => `
      <div class="pt-4 first:pt-0 flex items-start gap-3">
        <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100">
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-xs sm:text-sm text-emerald-950 truncate">${item.product.name}</h4>
          <span class="text-[11px] text-gray-500 block mb-1.5">${item.product.unit}</span>
          <span class="text-xs font-bold text-emerald-800">
            ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.product.price)}
          </span>
        </div>
        <div class="flex flex-col items-end gap-2">
          <!-- Tăng giảm số lượng -->
          <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white text-xs">
            <button class="btn-qty-minus px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold" data-id="${item.product.id}">-</button>
            <span class="px-2 py-1 font-mono font-bold text-gray-800">${item.quantity}</span>
            <button class="btn-qty-plus px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold" data-id="${item.product.id}">+</button>
          </div>
          <!-- Nút xóa -->
          <button class="btn-item-remove text-[11px] text-red-500 hover:underline" data-id="${item.product.id}">
            Xóa
          </button>
        </div>
      </div>
    `).join('');

    // Gắn sự kiện các nút trong giỏ
    itemsList.querySelectorAll(".btn-qty-minus").forEach(btn => {
      btn.addEventListener("click", () => onUpdateQuantity && onUpdateQuantity(btn.dataset.id, -1));
    });
    itemsList.querySelectorAll(".btn-qty-plus").forEach(btn => {
      btn.addEventListener("click", () => onUpdateQuantity && onUpdateQuantity(btn.dataset.id, 1));
    });
    itemsList.querySelectorAll(".btn-item-remove").forEach(btn => {
      btn.addEventListener("click", () => onRemoveItem && onRemoveItem(btn.dataset.id));
    });
  }

  btnZalo.addEventListener("click", () => {
    alert("Dạ hệ thống đang kết nối đến Zalo Hợp tác xã Dừa Song Phú (0918 268 379) để gửi danh sách đơn hàng của Quý khách. Xin cảm ơn!");
  });

  btnCheckout.addEventListener("click", () => {
    onCheckout && onCheckout();
  });

  container.openDrawer = openDrawer;
  container.closeDrawer = closeDrawer;
  container.renderCart = renderCart;

  return container;
}
