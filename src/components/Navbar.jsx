import React, { useState } from 'react';
import { Clock, Phone, ShoppingCart, Search, Menu, X, Facebook, Youtube } from 'lucide-react';

export default function Navbar({
  coopInfo,
  cartCount,
  onOpenCart,
  onOpenSearch,
  activeTab,
  setActiveTab,
  onSelectCategory,
  currentArticleCategory,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const isItemActive = (itemId) => {
    if (activeTab === itemId) return true;
    if (itemId === 'products' && activeTab === 'product-detail') return true;
    if (itemId === 'collections' && activeTab === 'article-detail' && currentArticleCategory !== 'Chứng nhận') return true;
    if (itemId === 'certifications' && activeTab === 'article-detail' && currentArticleCategory === 'Chứng nhận') return true;
    return false;
  };

  const navItems = [
    { id: 'home', label: 'TRANG CHỦ' },
    { id: 'about', label: 'GIỚI THIỆU' },
    { id: 'products', label: 'SẢN PHẨM', hasDropdown: true },
    { id: 'collections', label: 'BỘ SƯU TẬP' },
    { id: 'certifications', label: 'CHỨNG NHẬN' },
    { id: 'circular', label: 'KINH TẾ TUẦN HOÀN' },
    { id: 'traceability', label: 'TRUY XUẤT NGUỒN GỐC' },
    { id: 'contact', label: 'LIÊN HỆ' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    handleNavClick('products');
    setProductDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm font-sans">
      {/* Tầng 1: Top Bar mỏng (như trong ảnh 1, 2, 3) */}
      <div className="bg-[#f4f7f2] border-b border-gray-200/80 text-[11px] py-1.5 px-4 text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-[#3b8224]">📍</span>
            <span className="truncate">{coopInfo.address}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-gray-500 shrink-0">
            <button onClick={() => handleNavClick('contact')} className="hover:text-[#2e6b27] transition">Liên hệ</button>
            <span>|</span>
            <button onClick={() => handleNavClick('about')} className="hover:text-[#2e6b27] transition">Giới thiệu</button>
          </div>
        </div>
      </div>

      {/* Tầng 2: Middle Header - Giờ làm việc, Logo trung tâm, Hotline, Social & Cart */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Trái: Giờ làm việc & Hotline */}
        <div className="hidden md:flex items-center gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#eef7e9] text-[#3e8822] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-gray-700">Mon - Fri | 8:00 - 17:00</p>
              <p className="text-gray-500 text-[11px]">Sat | 8:00 - 12:00</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#eef7e9] text-[#3e8822] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block leading-none">Hotline</span>
              <a href={`tel:${coopInfo.hotline}`} className="font-bold text-gray-800 hover:text-[#3e8822] transition text-sm">
                {coopInfo.hotline}
              </a>
            </div>
          </div>
        </div>

        {/* Giữa: LOGO THƯƠNG HIỆU CHUẨN XÁC NHƯ TRONG ẢNH */}
        <div className="flex flex-col items-center cursor-pointer mx-auto md:mx-0" onClick={() => handleNavClick('home')}>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full border-2 border-[#4fa32d] flex items-center justify-center bg-white shadow-sm p-1">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* 2 mầm lá lồng nhau hình giọt nước xanh mạ non như logo Thabi Farm */}
                <path d="M50 15 C30 35 25 65 50 85 C75 65 70 35 50 15 Z" fill="#7bc144" opacity="0.9" />
                <path d="M40 30 C25 50 30 75 50 85 C40 70 40 45 40 30 Z" fill="#2d7f36" />
                <circle cx="50" cy="50" r="10" fill="#facc15" />
              </svg>
            </div>
            <div className="text-left">
              <span className="block text-base sm:text-lg font-black tracking-tight text-[#0f4c3a] leading-none uppercase">
                SOCOOP FARM
              </span>
              <span className="text-[10px] font-bold text-[#4fa32d] tracking-widest block uppercase">
                DỪA SONG PHÚ
              </span>
            </div>
          </div>
        </div>

        {/* Phải: Social, Cart, Language & Mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-gray-500 mr-2">
            <a href={coopInfo.socials.facebook} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#3b8224] hover:text-white flex items-center justify-center transition text-xs">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href={coopInfo.socials.youtube} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition text-xs">
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a href={coopInfo.socials.tiktok} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition text-xs font-bold">
              ♪
            </a>
          </div>

          {/* Mini cart icon với badge đỏ như trong ảnh */}
          <button onClick={onOpenCart} className="relative p-2 rounded-full hover:bg-gray-100 text-[#0f4c3a] transition" title="Giỏ hàng">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Cờ Việt Nam / Cờ Anh */}
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-gray-200">
            <span className="cursor-pointer text-sm" title="Tiếng Việt">🇻🇳</span>
            <span className="cursor-pointer text-sm opacity-60 hover:opacity-100 transition" title="English">🇬🇧</span>
          </div>

          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-700 hover:text-[#0f4c3a]">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tầng 3: Menu bar nền xanh rêu sẫm #0f4c3a đặc trưng */}
      <div className="nav-menu-bar text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <nav className="hidden lg:flex items-center mx-auto space-x-1 py-1.5 text-xs font-bold tracking-wider">
            {navItems.map((item) => {
              const isActive = isItemActive(item.id);
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => item.hasDropdown && setProductDropdownOpen(true)}
                    onMouseLeave={() => item.hasDropdown && setProductDropdownOpen(false)}
                    className={`px-4 py-2 rounded-full transition flex items-center gap-1 uppercase ${
                      isActive
                        ? 'btn-pill-green text-white shadow-sm'
                        : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <span className="text-[10px]">▾</span>}
                  </button>

                  {/* Dropdown Menu Sản Phẩm */}
                  {item.hasDropdown && productDropdownOpen && (
                    <div
                      onMouseEnter={() => setProductDropdownOpen(true)}
                      onMouseLeave={() => setProductDropdownOpen(false)}
                      className="absolute top-full left-0 mt-0.5 w-56 bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-100 animate-fadeIn z-50 text-xs font-semibold"
                    >
                      <button onClick={() => handleCategorySelect('all')} className="w-full text-left px-4 py-2 hover:bg-[#eef7e9] hover:text-[#3e8822] transition">
                        Tất cả sản phẩm từ dừa
                      </button>
                      <button onClick={() => handleCategorySelect('trai-cay-tuoi')} className="w-full text-left px-4 py-2 hover:bg-[#eef7e9] hover:text-[#3e8822] transition">
                        Dừa tươi Song Phú & Dừa sáp
                      </button>
                      <button onClick={() => handleCategorySelect('my-pham')} className="w-full text-left px-4 py-2 hover:bg-[#eef7e9] hover:text-[#3e8822] transition">
                        Dầu dừa ép lạnh & Mỹ phẩm xanh
                      </button>
                      <button onClick={() => handleCategorySelect('thuc-pham')} className="w-full text-left px-4 py-2 hover:bg-[#eef7e9] hover:text-[#3e8822] transition">
                        Cơm dừa sấy & Mật hoa dừa
                      </button>
                      <button onClick={() => handleCategorySelect('thu-cong')} className="w-full text-left px-4 py-2 hover:bg-[#eef7e9] hover:text-[#3e8822] transition">
                        Thủ công mỹ nghệ gáo dừa
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <button onClick={onOpenSearch} className="p-2 text-white/80 hover:text-white transition ml-auto lg:ml-0" title="Tìm kiếm">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div onClick={() => setMobileMenuOpen(false)} className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-bold text-[#0f4c3a] text-sm">HTX DỪA SONG PHÚ</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-500 hover:text-red-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1.5 py-4 text-xs font-bold uppercase">
              {navItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-2.5 px-3 rounded-lg text-left transition ${
                      isItemActive(item.id) ? 'bg-[#4fa32d] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                  {item.hasDropdown && (
                    <div className="pl-4 py-1 space-y-1">
                      <button
                        onClick={() => handleCategorySelect('all')}
                        className="block w-full text-left py-1 text-[11px] text-gray-500 hover:text-[#3e8822]"
                      >
                        • Tất cả sản phẩm
                      </button>
                      <button
                        onClick={() => handleCategorySelect('trai-cay-tuoi')}
                        className="block w-full text-left py-1 text-[11px] text-gray-500 hover:text-[#3e8822]"
                      >
                        • Dừa tươi & Dừa sáp
                      </button>
                      <button
                        onClick={() => handleCategorySelect('my-pham')}
                        className="block w-full text-left py-1 text-[11px] text-gray-500 hover:text-[#3e8822]"
                      >
                        • Dầu dừa & Mỹ phẩm
                      </button>
                      <button
                        onClick={() => handleCategorySelect('thuc-pham')}
                        className="block w-full text-left py-1 text-[11px] text-gray-500 hover:text-[#3e8822]"
                      >
                        • Cơm dừa & Mật hoa dừa
                      </button>
                      <button
                        onClick={() => handleCategorySelect('thu-cong')}
                        className="block w-full text-left py-1 text-[11px] text-gray-500 hover:text-[#3e8822]"
                      >
                        • Thủ công mỹ nghệ
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
            <p className="font-bold text-[#0f4c3a]">{coopInfo.name}</p>
            <p className="mt-1">{coopInfo.hotline}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
