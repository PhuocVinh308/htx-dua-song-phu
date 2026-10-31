// File Điều Phối Chính: app.js
import { coopData } from "./data/coopData.js";
import { createNavbar } from "./components/Navbar.js";
import { createHeroSlider } from "./components/HeroSlider.js";
import { createAboutSection } from "./components/AboutSection.js";
import { createWhyChooseUs } from "./components/WhyChooseUs.js";
import { createZeroWasteDiagram } from "./components/ZeroWasteDiagram.js";
import { createProductSection } from "./components/ProductSection.js";
import { createTraceabilitySection } from "./components/TraceabilitySection.js";
import { createEcoTourSection } from "./components/EcoTourSection.js";
import { createProductionGallery } from "./components/ProductionGallery.js";
import { createNewsSection } from "./components/NewsSection.js";
import { createB2BExportSection } from "./components/B2BExportSection.js";
import { createCartDrawer } from "./components/CartDrawer.js";
import { createProductModal } from "./components/ProductModal.js";
import { createAICoCoAssistant } from "./components/AICoCoAssistant.js";
import { createFooter } from "./components/Footer.js";

// Khởi tạo State Toàn Cục
class AppState {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("socoop_cart") || "{}");
    this.listeners = [];
  }

  saveCart() {
    localStorage.setItem("socoop_cart", JSON.stringify(this.cart));
    this.notify();
  }

  addToCart(product, quantity = 1) {
    if (this.cart[product.id]) {
      this.cart[product.id].quantity += quantity;
    } else {
      this.cart[product.id] = {
        product: product,
        quantity: quantity
      };
    }
    this.saveCart();
    this.showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  }

  updateQuantity(productId, delta) {
    if (this.cart[productId]) {
      this.cart[productId].quantity += delta;
      if (this.cart[productId].quantity <= 0) {
        delete this.cart[productId];
      }
      this.saveCart();
    }
  }

  removeFromCart(productId) {
    if (this.cart[productId]) {
      delete this.cart[productId];
      this.saveCart();
      this.showToast("Đã xóa sản phẩm khỏi giỏ hàng");
    }
  }

  getTotalCount() {
    return Object.values(this.cart).reduce((sum, item) => sum + item.quantity, 0);
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.cart));
  }

  showToast(message) {
    const existing = document.getElementById("app-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "fixed top-20 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-400 text-xs sm:text-sm flex items-center gap-2 transform translate-y-[-20px] opacity-0 transition-all duration-300";
    toast.innerHTML = `
      <span class="text-amber-300 text-base">🥥</span>
      <span class="font-medium">${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-[-20px]", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("translate-y-0", "opacity-100");
      toast.classList.add("translate-y-[-20px]", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

const state = new AppState();

// Khởi chạy ứng dụng khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app-root");
  if (!root) return;

  // 1. Modal Chi Tiết Sản Phẩm
  const productModal = createProductModal(
    (product, qty) => state.addToCart(product, qty),
    (batchCode) => traceabilitySection.lookupCode(batchCode)
  );
  document.body.appendChild(productModal);

  // 2. Giỏ Hàng Trượt Mini Cart
  const cartDrawer = createCartDrawer(
    state.cart,
    (id, delta) => state.updateQuantity(id, delta),
    (id) => state.removeFromCart(id),
    () => {
      alert("Cảm ơn Quý khách! Đơn hàng đã được gửi đến ban quản lý HTX Dừa Song Phú. Chúng tôi sẽ liên hệ xác nhận và giao hàng ngay.");
      state.cart = {};
      state.saveCart();
      cartDrawer.closeDrawer();
    }
  );
  document.body.appendChild(cartDrawer);

  // 3. Navbar
  const navbar = createNavbar(
    coopData.coopInfo,
    state.getTotalCount(),
    () => cartDrawer.openDrawer(),
    () => {
      const searchInput = document.getElementById("product-search-input");
      if (searchInput) {
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
        searchInput.focus();
      }
    }
  );
  root.appendChild(navbar);

  // 4. Hero Banner Slider
  const heroSlider = createHeroSlider(coopData.heroSlides);
  root.appendChild(heroSlider);

  // 5. Khối Giới Thiệu HTX Dừa Song Phú
  const aboutSection = createAboutSection(coopData.coopInfo);
  root.appendChild(aboutSection);

  // 6. Khối "Tại Sao Chọn Chúng Tôi"
  const whyChooseUs = createWhyChooseUs();
  root.appendChild(whyChooseUs);

  // 7. Khối Mô Hình Kinh Tế Tuần Hoàn Cây Dừa (Sáng tạo)
  const zeroWasteDiagram = createZeroWasteDiagram(coopData.circularEconomyParts);
  root.appendChild(zeroWasteDiagram);

  // 8. Khối Sản Phẩm OCOP Tiêu Biểu & Bộ Lọc
  const productSection = createProductSection(
    coopData.products,
    coopData.categories,
    (product) => productModal.openModal(product),
    (product) => state.addToCart(product, 1),
    (batchCode) => traceabilitySection.lookupCode(batchCode)
  );
  root.appendChild(productSection);

  // 9. Khối Tra Cứu Truy Xuất Nguồn Gốc Số Blockchain (Sáng tạo)
  const traceabilitySection = createTraceabilitySection(coopData.traceabilityBatches);
  root.appendChild(traceabilitySection);

  // 10. Khối Tour Tham Quan Vườn Dừa Sinh Thái
  const ecoTourSection = createEcoTourSection();
  root.appendChild(ecoTourSection);

  // 11. Khối Album Hình Ảnh Sản Xuất & Xã Viên
  const productionGallery = createProductionGallery();
  root.appendChild(productionGallery);

  // 12. Khối Tin Tức & Kiến Thức Dừa OCOP
  const newsSection = createNewsSection(coopData.news);
  root.appendChild(newsSection);

  // 13. Khối Báo Giá B2B & Xuất Khẩu
  const b2bSection = createB2BExportSection(coopData.coopInfo);
  root.appendChild(b2bSection);

  // 14. Footer Chân Trang
  const footer = createFooter(coopData.coopInfo);
  root.appendChild(footer);

  // 15. Trợ Lý Ảo Bé CoCo (Sáng tạo)
  const aiAssistant = createAICoCoAssistant(coopData.aiKnowledge);
  document.body.appendChild(aiAssistant);

  // Lắng nghe thay đổi của State giỏ hàng để cập nhật Navbar và Cart Drawer
  state.subscribe((updatedCart) => {
    const badge = document.getElementById("nav-cart-badge");
    if (badge) {
      badge.textContent = state.getTotalCount();
      badge.classList.add("scale-125");
      setTimeout(() => badge.classList.remove("scale-125"), 200);
    }
    cartDrawer.renderCart(updatedCart);
  });

  // Render khởi tạo giỏ hàng
  cartDrawer.renderCart(state.cart);
});
