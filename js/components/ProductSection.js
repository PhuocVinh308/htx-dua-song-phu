// Component: ProductSection (Khối Danh mục & Sản phẩm nổi bật OCOP tương tự phong cách HTX Thanh Bình)
import { createProductCard } from "./ProductCard.js";

export function createProductSection(products, categories, onQuickView, onAddToCart, onTraceClick) {
  const section = document.createElement("section");
  section.className = "py-16 md:py-24 bg-white relative";
  section.id = "products";

  let activeCategory = "all";
  let searchQuery = "";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <!-- Section Header Tương tự phong cách HTX Thanh Bình -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
          CHỨNG NHẬN OCOP 4 SAO & XUẤT KHẨU
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-emerald-950 mb-3">
          Sản Phẩm Dừa Tiêu Biểu
        </h2>
        <div class="w-20 h-1 bg-emerald-600 mx-auto mb-4 rounded-full"></div>
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
          Nông sản sinh thái được thu hoạch tươi từ các vườn dừa Tam Bình và chế biến sâu theo quy chuẩn chất lượng khắt khe, an toàn tuyệt đối cho người tiêu dùng.
        </p>
      </div>

      <!-- Search & Category Filters Bar -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none" id="category-tabs-container">
          ${categories.map(cat => `
            <button class="cat-filter-btn shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${cat.id === 'all' ? 'bg-emerald-800 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'}" 
                    data-cat-id="${cat.id}">
              ${cat.name}
            </button>
          `).join('')}
        </div>

        <!-- Live Search Input -->
        <div class="relative w-full md:w-72 shrink-0">
          <input type="text" 
                 id="product-search-input" 
                 placeholder="Tìm tên sản phẩm, mã lô..." 
                 class="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600">
          <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      <!-- Product Count Info -->
      <div class="flex items-center justify-between text-xs text-gray-500 mb-6 px-1">
        <span id="product-count-label">Hiển thị tất cả 8 sản phẩm</span>
        <span class="text-emerald-700 font-semibold flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          Sẵn hàng tại kho HTX Song Phú
        </span>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="products-grid-container">
        <!-- Rendered by JS -->
      </div>

      <!-- Báo Giá B2B Callout Banner dưới sản phẩm -->
      <div class="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="space-y-1 text-center sm:text-left">
          <h4 class="text-base sm:text-lg font-bold text-emerald-950 font-heading">
            Doanh Nghiệp / Chuỗi Siêu Thị Cần Nhập Sỉ Số Lượng Lớn?
          </h4>
          <p class="text-xs sm:text-sm text-gray-600">
            HTX Dừa Song Phú cung ứng ổn định dừa tươi gọt kim cương, dầu dừa ly tâm và than gáo dừa với hóa đơn VAT và chứng nhận xuất xứ CO.
          </p>
        </div>
        <a href="#b2b-export" class="shrink-0 px-6 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition shadow-md">
          Yêu Cầu Báo Giá Sỉ
        </a>
      </div>
    </div>
  `;

  const gridContainer = section.querySelector("#products-grid-container");
  const countLabel = section.querySelector("#product-count-label");
  const searchInput = section.querySelector("#product-search-input");
  const tabButtons = section.querySelectorAll(".cat-filter-btn");

  function filterAndRender() {
    let filtered = products;

    if (activeCategory !== "all") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.tagline.toLowerCase().includes(q) || 
        p.traceBatch.toLowerCase().includes(q)
      );
    }

    gridContainer.innerHTML = "";
    countLabel.textContent = `Hiển thị ${filtered.length} sản phẩm`;

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-span-full py-12 text-center text-gray-500">
          <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p class="font-bold text-gray-700">Không tìm thấy sản phẩm phù hợp</p>
          <p class="text-xs mt-1">Vui lòng thử tìm từ khóa khác hoặc bấm nút "Tất cả sản phẩm"</p>
        </div>
      `;
      return;
    }

    filtered.forEach(product => {
      const card = createProductCard(product, onQuickView, onAddToCart, onTraceClick);
      gridContainer.appendChild(card);
    });
  }

  // Render khởi tạo
  filterAndRender();

  // Sự kiện lọc danh mục
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.catId;

      tabButtons.forEach(b => {
        if (b.dataset.catId === activeCategory) {
          b.className = "cat-filter-btn shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition bg-emerald-800 text-white shadow-md";
        } else {
          b.className = "cat-filter-btn shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800";
        }
      });

      filterAndRender();
    });
  });

  // Sự kiện tìm kiếm trực tiếp
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    filterAndRender();
  });

  return section;
}
