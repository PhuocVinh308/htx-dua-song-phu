import React, { useState, useEffect } from 'react';
import { coopData } from './data/coopData.js';
import Navbar from './components/Navbar.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import AboutSection from './components/AboutSection.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import ProductSection from './components/ProductSection.jsx';
import ProductionGallery from './components/ProductionGallery.jsx';
import NewsSection from './components/NewsSection.jsx';

import AboutPage from './components/AboutPage.jsx';
import ProductsPage from './components/ProductsPage.jsx';
import CollectionsPage from './components/CollectionsPage.jsx';
import CertificationsPage from './components/CertificationsPage.jsx';
import ZeroWasteDiagram from './components/ZeroWasteDiagram.jsx';
import TraceabilitySection from './components/TraceabilitySection.jsx';
import B2BExportSection from './components/B2BExportSection.jsx';

import CartDrawer from './components/CartDrawer.jsx';
import ProductModal from './components/ProductModal.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import ArticleDetailPage from './components/ArticleDetailPage.jsx';
import AICoCoAssistant from './components/AICoCoAssistant.jsx';
import Footer from './components/Footer.jsx';

// Safely parse localStorage cart data protecting against "null" string or corrupted types
export const parseSafeCart = (rawStored) => {
  try {
    const parsed = JSON.parse(rawStored || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

// Pure reducer function ensuring quantities are strictly clamped to >= 1
export const safeAddToCart = (prevCart, product, quantity = 1) => {
  if (!product || !product.id) return prevCart || {};
  const safeQty = Math.max(1, parseInt(quantity, 10) || 1);
  const next = { ...(prevCart || {}) };
  if (next[product.id]) {
    next[product.id] = {
      ...next[product.id],
      quantity: Math.max(1, (next[product.id].quantity || 0) + safeQty),
    };
  } else {
    next[product.id] = {
      product,
      quantity: safeQty,
    };
  }
  return next;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return parseSafeCart(localStorage.getItem('socoop_cart'));
    }
    return {};
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleSourceTab, setArticleSourceTab] = useState('collections');
  const [traceBatchCode, setTraceBatchCode] = useState('SP-DXL-2026-01');
  const [toastMessage, setToastMessage] = useState(null);

  const handleViewDetail = (product) => {
    setSelectedDetailProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewArticle = (article, source = 'collections') => {
    setSelectedArticle(article);
    setArticleSourceTab(source);
    setActiveTab('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('socoop_cart', JSON.stringify(cart || {}));
    }
  }, [cart]);

  // Support URL hash navigation fallback
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'about', 'products', 'collections', 'certifications', 'circular', 'traceability', 'contact', 'product-detail', 'article-detail'];
      if (hash && validTabs.includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    setCart((prev) => safeAddToCart(prev, product, quantity));
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) => {
      const next = { ...(prev || {}) };
      if (next[productId]) {
        const newQty = (next[productId].quantity || 0) + delta;
        if (newQty <= 0) {
          delete next[productId];
        } else {
          next[productId] = {
            ...next[productId],
            quantity: newQty,
          };
        }
      }
      return next;
    });
  };

  const removeItem = (productId) => {
    setCart((prev) => {
      const next = { ...(prev || {}) };
      delete next[productId];
      return next;
    });
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleCheckout = (orderRecord) => {
    setCart({});
    showToast(`Đơn hàng #${orderRecord?.orderId || ''} đã được tiếp nhận thành công!`);
  };

  const handleTraceClick = (code) => {
    setTraceBatchCode(code);
    setActiveTab('traceability');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotalCount = Object.values(cart || {}).reduce((sum, item) => sum + Math.max(0, item?.quantity || 0), 0);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#4fa32d] selection:text-white bg-[#fbfbfb]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#0f4c3a] text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-400 text-xs sm:text-sm flex items-center gap-2 animate-bounce">
          <span className="text-amber-300 text-base">🥥</span>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Navbar Chuẩn 100% Theo Ảnh */}
      <Navbar
        coopInfo={coopData.coopInfo}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenSearch={() => {
          setSelectedCategory('all');
          setActiveTab('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        currentArticleCategory={selectedArticle?.category || (selectedArticle?.code ? 'Chứng nhận' : '')}
      />

      <main className="flex-1">
        {/* TAB 1: TRANG CHỦ CHUẨN XÁC 100% NHƯ ẢNH 1 */}
        {activeTab === 'home' && (
          <>
            {/* Hero Banner với khung kính mờ Frosted Glass và viền cong lượn sóng */}
            <HeroSlider
              banner={coopData.heroBanner}
              onExploreClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Giới thiệu Hợp tác xã Song Phú với ảnh nải quả dán tem tròn */}
            <AboutSection
              coopInfo={coopData.coopInfo}
              onMoreClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Tại sao chọn chúng tôi: 4 vòng tròn ảnh & Logo tròn ở giữa chuẩn Ảnh 1 */}
            <WhyChooseUs pillars={coopData.whyChooseUsPillars} />

            {/* Sản phẩm nổi bật: 12 sản phẩm dạng thẻ nền trắng có nút > XEM CHI TIẾT */}
            <ProductSection
              products={coopData.products}
              onQuickView={handleViewDetail}
              onExploreAll={() => {
                setSelectedCategory('all');
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Hình ảnh sản xuất: 8 ảnh 2 hàng x 4 cột chuẩn Ảnh 1 */}
            <ProductionGallery images={coopData.productionImages} />

            {/* Tin tức nổi bật: 3 bài viết có mũi tên trái phải chuẩn Ảnh 1 */}
            <NewsSection
              newsList={coopData.collections}
              onExploreAll={() => {
                setActiveTab('collections');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onArticleClick={(item) => {
                handleViewArticle(item, 'home');
              }}
            />
          </>
        )}

        {/* TAB CHI TIẾT SẢN PHẨM: ĐẦY ĐỦ GIÁ TIỀN, ĐẶC ĐIỂM, THÔNG SỐ, ĐÁNH GIÁ */}
        {activeTab === 'product-detail' && selectedDetailProduct && (
          <ProductDetailPage
            product={selectedDetailProduct}
            allProducts={coopData.products}
            onBack={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={addToCart}
            onBuyNow={(prod, q) => {
              addToCart(prod, q);
              setCartDrawerOpen(true);
            }}
            onSelectProduct={(p) => {
              setSelectedDetailProduct(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTraceClick={handleTraceClick}
          />
        )}

        {/* TAB CHI TIẾT BÀI VIẾT / CHỨNG NHẬN: HIỂN THỊ NỘI DUNG ĐỌC TIẾP */}
        {activeTab === 'article-detail' && (
          <ArticleDetailPage
            article={selectedArticle || coopData.collections[0]}
            allArticles={selectedArticle?.code ? coopData.certifications : coopData.collections}
            onBack={(target) => {
              if (target === 'home') {
                setActiveTab('home');
              } else if (target === 'certifications') {
                setActiveTab('certifications');
              } else if (target === 'collections') {
                setActiveTab('collections');
              } else {
                setActiveTab(articleSourceTab || 'collections');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArticle={(item) => {
              setSelectedArticle(item);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreProducts={() => {
              setSelectedCategory('all');
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContactClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            showToast={showToast}
          />
        )}

        {/* TAB 2: GIỚI THIỆU CHUẨN XÁC 100% NHƯ ẢNH 2 */}
        {activeTab === 'about' && (
          <AboutPage coopInfo={coopData.coopInfo} />
        )}

        {/* TAB 3: SẢN PHẨM CHUẨN XÁC 100% NHƯ ẢNH 3 */}
        {activeTab === 'products' && (
          <ProductsPage
            products={coopData.products}
            onQuickView={handleViewDetail}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

        {/* TAB 4: BỘ SƯU TẬP CHUẨN XÁC 100% NHƯ ẢNH 4 */}
        {activeTab === 'collections' && (
          <CollectionsPage
            collections={coopData.collections}
            onArticleClick={(item) => handleViewArticle(item, 'collections')}
          />
        )}

        {/* TAB 5: CHỨNG NHẬN CHUẨN XÁC 100% NHƯ ẢNH 5 */}
        {activeTab === 'certifications' && (
          <CertificationsPage
            certifications={coopData.certifications}
            onArticleClick={(item) => handleViewArticle(item, 'certifications')}
          />
        )}

        {/* TAB 6: KINH TẾ TUẦN HOÀN (SÁNG TẠO VƯỢT TRỘI) */}
        {activeTab === 'circular' && (
          <ZeroWasteDiagram
            parts={coopData.circularEconomyParts}
            onExploreProducts={() => {
              setSelectedCategory('all');
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 7: TRUY XUẤT NGUỒN GỐC SỐ (SÁNG TẠO VƯỢT TRỘI) */}
        {activeTab === 'traceability' && (
          <TraceabilitySection
            batches={coopData.traceabilityBatches}
            initialCode={traceBatchCode}
          />
        )}

        {/* TAB 8: LIÊN HỆ & BÁO GIÁ XUẤT KHẨU */}
        {activeTab === 'contact' && (
          <B2BExportSection coopInfo={coopData.coopInfo} />
        )}
      </main>

      {/* Footer Chuẩn 100% Theo 5 Ảnh Với Dải Silhouette Núi Đồi Hàng Cây */}
      <Footer coopInfo={coopData.coopInfo} onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Giỏ hàng trượt Mini Cart */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Modal Xem Nhanh Sản Phẩm */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={addToCart}
        onTraceClick={handleTraceClick}
        onViewDetail={handleViewDetail}
      />

      {/* Trợ lý AI Bé CoCo */}
      <AICoCoAssistant
        knowledgeBase={coopData.aiKnowledge}
        products={coopData.products}
        onAddToCart={addToCart}
        onQuickView={handleViewDetail}
      />
    </div>
  );
}
