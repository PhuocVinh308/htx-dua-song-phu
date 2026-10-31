// Component: Navbar (Thanh điều hướng đa cấp, Topbar, Search, Cart Drawer trigger)
export function createNavbar(coopInfo, cartCount, onOpenCart, onOpenSearch) {
  const nav = document.createElement("header");
  nav.className = "sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm transition-all duration-300";
  nav.id = "main-header";

  nav.innerHTML = `
    <!-- Topbar Thông tin & Liên hệ (Phong cách tương tự HTX Thanh Bình) -->
    <div class="top-bar-gradient text-white text-xs py-2 px-4 border-b border-emerald-800">
      <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div class="flex items-center gap-4 flex-wrap">
          <span class="flex items-center gap-1.5 opacity-90">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            ${coopInfo.address}
          </span>
          <span class="hidden md:flex items-center gap-1.5 opacity-90 border-l border-emerald-700/60 pl-4">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${coopInfo.workingHours}
          </span>
        </div>
        <div class="flex items-center gap-4">
          <a href="tel:${coopInfo.hotline.split('-')[0].trim()}" class="flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition">
            <svg class="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            Hotline: ${coopInfo.hotline.split('-')[0].trim()}
          </a>
          <div class="flex items-center gap-1.5 border-l border-emerald-700/60 pl-3">
            <button class="px-1.5 py-0.5 rounded bg-emerald-700 text-[10px] font-bold text-white tracking-wider" title="Tiếng Việt">VI</button>
            <button class="px-1.5 py-0.5 rounded hover:bg-emerald-800 text-[10px] text-emerald-200 transition" title="English">EN</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <!-- Logo HTX Dừa Song Phú -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition transform">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="9" stroke="currentColor" fill="#1b4d3e" />
            <path d="M12 3a9 9 0 0 1 9 9" stroke="#f59e0b" stroke-width="2" />
            <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#ffffff" />
            <circle cx="10" cy="11" r="1.5" fill="#f59e0b" />
            <circle cx="14" cy="11" r="1.5" fill="#f59e0b" />
            <circle cx="12" cy="14" r="1.5" fill="#f59e0b" />
          </svg>
        </div>
        <div>
          <span class="block text-lg md:text-xl font-extrabold tracking-tight text-emerald-950 uppercase font-heading group-hover:text-emerald-700 transition">
            HTX DỪA SONG PHÚ
          </span>
          <span class="block text-[11px] font-semibold text-amber-700 tracking-wider uppercase">
            SOCOOP TAM BÌNH • OCOP VĨNH LONG
          </span>
        </div>
      </a>

      <!-- Desktop Menu -->
      <nav class="hidden lg:flex items-center gap-6 xl:gap-8 text-sm text-gray-700">
        <a href="#home" class="nav-link text-emerald-800 active">Trang Chủ</a>
        <a href="#about" class="nav-link hover:text-emerald-800">Giới Thiệu</a>
        <a href="#products" class="nav-link hover:text-emerald-800 flex items-center gap-1">
          Sản Phẩm
          <span class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">OCOP</span>
        </a>
        <a href="#circular-economy" class="nav-link hover:text-emerald-800 text-emerald-700 font-semibold flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Kinh Tế Tuần Hoàn
        </a>
        <a href="#traceability" class="nav-link hover:text-emerald-800">Truy Xuất Nguồn Gốc</a>
        <a href="#eco-tour" class="nav-link hover:text-emerald-800">Vườn Dừa Sinh Thái</a>
        <a href="#news" class="nav-link hover:text-emerald-800">Tin Tức</a>
        <a href="#contact" class="nav-link hover:text-emerald-800">Liên Hệ</a>
      </nav>

      <!-- Action Buttons (Search, Cart, Mobile Menu) -->
      <div class="flex items-center gap-3">
        <!-- Nút Tra Cứu / Tìm Kiếm -->
        <button id="btn-header-search" class="p-2 text-gray-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-full transition" title="Tìm kiếm sản phẩm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>

        <!-- Nút Giỏ Hàng Mini Cart (Tương tự giỏ hàng WooCommerce của HTX Thanh Bình) -->
        <button id="btn-header-cart" class="relative flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-full text-xs font-semibold shadow-sm transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          <span class="hidden sm:inline">Giỏ Hàng</span>
          <span id="nav-cart-badge" class="bg-amber-400 text-emerald-950 font-black px-1.5 py-0.5 rounded-full text-[11px] leading-none">
            ${cartCount}
          </span>
        </button>

        <!-- Mobile Menu Toggle Button -->
        <button id="btn-mobile-menu" class="lg:hidden p-2 text-gray-700 hover:text-emerald-800 rounded-lg" title="Mở danh mục">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div id="mobile-menu-drawer" class="fixed inset-0 z-50 transform translate-x-full transition-transform duration-300 lg:hidden pointer-events-none">
      <div id="mobile-menu-overlay" class="absolute inset-0 bg-black/50 opacity-0 transition-opacity"></div>
      <div class="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto pointer-events-auto">
        <div>
          <div class="flex items-center justify-between pb-4 border-b border-gray-100">
            <span class="font-bold text-emerald-900 font-heading">DANH MỤC HTX</span>
            <button id="btn-close-mobile-menu" class="p-1 text-gray-500 hover:text-red-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <nav class="flex flex-col gap-3 py-4 text-sm font-medium text-gray-700">
            <a href="#home" class="mobile-nav-link py-2 px-3 rounded hover:bg-emerald-50 hover:text-emerald-800">Trang Chủ</a>
            <a href="#about" class="mobile-nav-link py-2 px-3 rounded hover:bg-emerald-50 hover:text-emerald-800">Giới Thiệu HTX</a>
            <a href="#products" class="mobile-nav-link py-2 px-3 rounded hover:bg-emerald-50 hover:text-emerald-800">Sản Phẩm OCOP</a>
            <a href="#circular-economy" class="mobile-nav-link py-2 px-3 rounded bg-emerald-50 text-emerald-800 font-bold">Kinh Tế Tuần Hoàn Cây Dừa</a>
            <a href="#traceability" class="mobile-nav-link py-2 px-3 rounded hover:bg-emerald-50 hover:text-emerald-800">Truy Xuất Nguồn Gốc Số</a>
            <a href="#eco-tour" class="mobile-nav-link py-2 px-3 rounded hover:bg-emerald-50 hover:text-emerald-800">Vườn Dừa Sinh Thái</a>
            <a href="#news" class="mobile-nav-link py-2 px-3 rounded hover:bg-emerald-50 hover:text-emerald-800">Tin Tức & Hoạt Động</a>
            <a href="#b2b-export" class="mobile-nav-link py-2 px-3 rounded hover:bg-emerald-50 hover:text-emerald-800">Báo Giá Sỉ & Xuất Khẩu</a>
            <a href="#contact" class="mobile-nav-link py-2 px-3 rounded hover:bg-emerald-50 hover:text-emerald-800">Liên Hệ</a>
          </nav>
        </div>
        <div class="pt-4 border-t border-gray-100 text-xs text-gray-500">
          <p class="font-bold text-emerald-900">${coopInfo.name}</p>
          <p class="mt-1">${coopInfo.hotline}</p>
          <p class="mt-0.5">${coopInfo.address}</p>
        </div>
      </div>
    </div>
  `;

  // Gắn sự kiện
  const btnCart = nav.querySelector("#btn-header-cart");
  if (btnCart && onOpenCart) {
    btnCart.addEventListener("click", onOpenCart);
  }

  const btnSearch = nav.querySelector("#btn-header-search");
  if (btnSearch && onOpenSearch) {
    btnSearch.addEventListener("click", onOpenSearch);
  }

  const btnMobile = nav.querySelector("#btn-mobile-menu");
  const mobileDrawer = nav.querySelector("#mobile-menu-drawer");
  const btnCloseMobile = nav.querySelector("#btn-close-mobile-menu");
  const mobileOverlay = nav.querySelector("#mobile-menu-overlay");
  const mobileLinks = nav.querySelectorAll(".mobile-nav-link");

  function openMobileMenu() {
    mobileDrawer.classList.remove("translate-x-full");
    mobileDrawer.classList.remove("pointer-events-none");
    mobileOverlay.classList.remove("opacity-0");
  }

  function closeMobileMenu() {
    mobileDrawer.classList.add("translate-x-full");
    mobileDrawer.classList.add("pointer-events-none");
    mobileOverlay.classList.add("opacity-0");
  }

  if (btnMobile) btnMobile.addEventListener("click", openMobileMenu);
  if (btnCloseMobile) btnCloseMobile.addEventListener("click", closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener("click", closeMobileMenu));

  return nav;
}
