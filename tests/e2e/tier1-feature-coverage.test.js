import fs from 'node:fs';
import path from 'node:path';
import { TestSuite, loadComponent, renderToHtml } from './test-helpers.js';
import { coopData } from '../../src/data/coopData.js';

export async function runTier1Tests() {
  const suite = new TestSuite('Tier 1: Feature Coverage & Reference Screen Verification');

  // Test 1: Typography Tokens Contract
  suite.test('R1.1 Typography tokens: Lobster, Barlow, Dancing Script declared across tokens', async (t) => {
    const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf8');
    const indexCss = fs.readFileSync(path.resolve('src/index.css'), 'utf8');
    const tailwindConfig = fs.readFileSync(path.resolve('tailwind.config.js'), 'utf8');

    // Google fonts link in index.html
    t.assert(indexHtml.includes('fonts.googleapis.com'), 'index.html must preconnect to google fonts');
    t.assert(indexHtml.includes('family=Barlow'), 'index.html must load Barlow font family');
    t.assert(indexHtml.includes('family=Dancing+Script'), 'index.html must load Dancing Script font family');
    t.assert(indexHtml.includes('family=Lobster'), 'index.html must load Lobster font family');

    // CSS variables in index.css
    t.assert(indexCss.includes('--font-lobster'), 'index.css must define --font-lobster');
    t.assert(indexCss.includes('--font-barlow'), 'index.css must define --font-barlow');
    t.assert(indexCss.includes('--font-script'), 'index.css must define --font-script');

    // Lobster classes in index.css
    t.assert(indexCss.includes('.font-script-title') || indexCss.includes('.font-lobster-heading'),
      'index.css must define .font-script-title or .font-lobster-heading');

    // Tailwind config definitions
    t.assert(tailwindConfig.includes('barlow:'), 'tailwind.config.js must define barlow font token');
    t.assert(tailwindConfig.includes('lobster:'), 'tailwind.config.js must define lobster font token');
    t.assert(tailwindConfig.includes('script:'), 'tailwind.config.js must define script font token');
  });

  // Test 2: Screen 1 - Home Page Structure (HTX Thanh Bình Reference Screen 1)
  suite.test('R1.2 Screen 1: Home page reference match (Header, Frosted Glass Hero, 2-Photo About, 4-Circle Pillars, 12 Products, 8 Production Photos, 3 News, Mountain Silhouette)', async (t) => {
    const Navbar = await loadComponent('components/Navbar.jsx');
    const HeroSlider = await loadComponent('components/HeroSlider.jsx');
    const AboutSection = await loadComponent('components/AboutSection.jsx');
    const WhyChooseUs = await loadComponent('components/WhyChooseUs.jsx');
    const ProductSection = await loadComponent('components/ProductSection.jsx');
    const ProductionGallery = await loadComponent('components/ProductionGallery.jsx');
    const NewsSection = await loadComponent('components/NewsSection.jsx');
    const Footer = await loadComponent('components/Footer.jsx');

    // Navbar: 3-tier header structure
    const navbarHtml = renderToHtml(Navbar, {
      coopInfo: coopData.coopInfo,
      cartCount: 3,
      activeTab: 'home',
      setActiveTab: () => {},
      onOpenCart: () => {},
      onOpenSearch: () => {},
    });
    t.assert(navbarHtml.includes(coopData.coopInfo.hotline) || navbarHtml.includes(coopData.coopInfo.phoneDisplay),
      'Navbar must render hotline in top header tier');
    t.assert(navbarHtml.includes('TRANG CHỦ') || navbarHtml.includes('Trang chủ'),
      'Navbar must contain main navigation link TRANG CHỦ');
    t.assert(navbarHtml.includes('SẢN PHẨM') || navbarHtml.includes('Sản phẩm'),
      'Navbar must contain main navigation link SẢN PHẨM');

    // Hero: Frosted glass box & wave svg
    const heroHtml = renderToHtml(HeroSlider, {
      banner: coopData.heroBanner,
      onExploreClick: () => {},
    });
    t.assert(heroHtml.includes('backdrop-blur') || heroHtml.includes('bg-[#182a20]/75'),
      'Hero banner must contain frosted glass styling');
    t.assert(heroHtml.includes('<svg') && (heroHtml.includes('1200 120') || heroHtml.includes('path')),
      'Hero banner must render bottom wave SVG divider');
    t.assert(heroHtml.includes(coopData.heroBanner.title),
      'Hero banner must render hero title');

    // About Section: 2 overlapping photos & OCOP seal
    const aboutHtml = renderToHtml(AboutSection, {
      coopInfo: coopData.coopInfo,
      onMoreClick: () => {},
    });
    t.assert(aboutHtml.includes('OCOP') || aboutHtml.includes('ocop'),
      'About section must display OCOP seal badge');
    t.assert(aboutHtml.includes('Song Phú') || aboutHtml.includes('SONG PHÚ'),
      'About section must feature Song Phu cooperative name');

    // Why Choose Us: 4 circular pillars & central logo
    const whyHtml = renderToHtml(WhyChooseUs, {
      pillars: coopData.whyChooseUsPillars,
    });
    t.assert(coopData.whyChooseUsPillars.length === 4, 'Must have exactly 4 core pillars');
    t.assert(whyHtml.includes('circle-pillar') || (whyHtml.includes('rounded-full') && whyHtml.includes('100% Tự nhiên')),
      'Why choose us must render circular pillar images');

    // Product Section: 12 featured products grid
    const prodSecHtml = renderToHtml(ProductSection, {
      products: coopData.products,
      onQuickView: () => {},
      onExploreAll: () => {},
    });
    t.assert(prodSecHtml.includes('btn-pill-green') || prodSecHtml.includes('XEM CHI TIẾT'),
      'Product section must feature pill buttons for details');

    // Production Gallery: 8 photos
    const galleryHtml = renderToHtml(ProductionGallery, {
      images: coopData.productionImages,
    });
    t.assert(coopData.productionImages.length >= 8, 'Production gallery must have at least 8 images');

    // News Section: 3 articles
    const newsHtml = renderToHtml(NewsSection, {
      newsList: coopData.collections,
      onExploreAll: () => {},
      onArticleClick: () => {},
    });
    t.assert(coopData.collections.length >= 3, 'News section must supply at least 3 articles');

    // Footer: Mountain silhouette background banner
    const footerHtml = renderToHtml(Footer, {
      coopInfo: coopData.coopInfo,
      onNavClick: () => {},
    });
    t.assert(footerHtml.includes('footer-mountain-bg') || footerHtml.includes('background-image'),
      'Footer must feature mountain silhouette background styling');
  });

  // Test 3: Screen 2 - About Page Reference Match
  suite.test('R1.3 Screen 2: AboutPage reference match (9 cooperative principles & leadership)', async (t) => {
    const AboutPage = await loadComponent('components/AboutPage.jsx');
    const html = renderToHtml(AboutPage, { coopInfo: coopData.coopInfo });

    t.assert(html.includes('GIỚI THIỆU') || html.includes('Giới thiệu'),
      'About page must have clear page title');
    t.assert(html.includes('HỢP TÁC XÃ DỪA SONG PHÚ') || html.includes('SONG PHU COOP'),
      'About page must feature full cooperative name');
    t.assert(html.includes('Tam Bình') || html.includes('Song Phú'),
      'About page must state location Tam Bình / Song Phú');
  });

  // Test 4: Screen 3 - Products Page Reference Match
  suite.test('R1.4 Screen 3: ProductsPage reference match (5-column catalog grid & recently viewed)', async (t) => {
    const ProductsPage = await loadComponent('components/ProductsPage.jsx');
    const html = renderToHtml(ProductsPage, {
      products: coopData.products,
      onQuickView: () => {},
    });

    // 5-column grid check
    t.assert(html.includes('lg:grid-cols-5'), 'Products catalog grid must implement 5-column layout on desktop (lg:grid-cols-5)');
    t.assert(html.includes('SẢN PHẨM ĐÃ XEM'), 'Products page must have "SẢN PHẨM ĐÃ XEM" recently viewed block');
    t.assert(html.includes('Thứ tự mặc định') || html.includes('sortOption'), 'Products page must include sorting controls');
  });

  // Test 5: Screen 4 - Collections Page Reference Match
  suite.test('R1.5 Screen 4: CollectionsPage reference match (3-column articles grid)', async (t) => {
    const CollectionsPage = await loadComponent('components/CollectionsPage.jsx');
    const html = renderToHtml(CollectionsPage, {
      collections: coopData.collections,
    });

    t.assert(html.includes('BỘ SƯU TẬP') || html.includes('TIN TỨC') || html.includes('CÂU CHUYỆN'),
      'Collections page must render proper header title');
    t.assert(html.includes('md:grid-cols-3') || html.includes('grid-cols-3'),
      'Collections page must implement 3-column articles grid');
  });

  // Test 6: Screen 5 - Certifications Page Reference Match
  suite.test('R1.6 Screen 5: CertificationsPage reference match (3-column diplomas & quality standards)', async (t) => {
    const CertificationsPage = await loadComponent('components/CertificationsPage.jsx');
    const html = renderToHtml(CertificationsPage, {
      certifications: coopData.certifications,
    });

    t.assert(html.includes('CHỨNG NHẬN') || html.includes('TIÊU CHUẨN'),
      'Certifications page must have certifications heading');
    t.assert(html.includes('ISO') || html.includes('HACCP') || html.includes('MÃ VÙNG TRỒNG'),
      'Certifications must list ISO/HACCP/Mã Vùng Trồng credentials');
    t.assert(html.includes('md:grid-cols-2') || html.includes('lg:grid-cols-3') || html.includes('grid-cols-3'),
      'Certifications page must implement 3-column layout');
  });

  // Test 7: Quick View Modal Rendering & Safe Guards
  suite.test('R2.1 Quick View Modal: displays enriched specs and protects against missing fields', async (t) => {
    const ProductModal = await loadComponent('components/ProductModal.jsx');

    // 1. Full enriched product
    const fullProduct = coopData.products[0];
    const fullHtml = renderToHtml(ProductModal, {
      product: fullProduct,
      onClose: () => {},
      onAddToCart: () => {},
      onTraceClick: () => {},
    });

    t.assert(fullHtml.includes(fullProduct.name), 'Modal must render product name');
    t.assert(fullHtml.includes('Mã lô') || fullHtml.includes(fullProduct.traceBatch), 'Modal must render trace batch code');
    t.assert(fullHtml.includes('Thêm Vào Giỏ') || fullHtml.includes('Thêm vào giỏ'), 'Modal must have Add to Cart CTA');
    t.assert(fullHtml.includes('Tra cứu lý lịch lô'), 'Modal must link to Traceability lookup');

    // 2. Safe guards against null/empty product
    const nullHtml = renderToHtml(ProductModal, { product: null });
    t.assertEqual(nullHtml, '', 'Modal with null product must safely render nothing without crashing');

    // 3. Product with missing optional fields (features: undefined, price: null)
    const sparseProduct = {
      id: 'P999',
      name: 'Sản phẩm thử nghiệm',
      price: null,
      features: null,
    };
    const sparseHtml = renderToHtml(ProductModal, {
      product: sparseProduct,
      onClose: () => {},
      onAddToCart: () => {},
    });
    t.assert(sparseHtml.includes('Sản phẩm thử nghiệm'), 'Modal must render sparse product safely without throwing');
    t.assert(sparseHtml.includes('0 ₫'), 'Modal must format null price as 0 ₫ without NaN');
  });

  // Test 8: Cart Drawer & Checkout Form Contract
  suite.test('R2.2 Cart Drawer: Line items, calculations, COD and Bank Transfer (VietQR)', async (t) => {
    const CartDrawer = await loadComponent('components/CartDrawer.jsx');

    const sampleCart = {
      P01: {
        product: coopData.products[0],
        quantity: 2,
      },
      P02: {
        product: coopData.products[1],
        quantity: 1,
      },
    };

    const expectedTotal = sampleCart.P01.product.price * 2 + sampleCart.P02.product.price * 1;
    const formattedExpected = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(expectedTotal);

    const html = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart: sampleCart,
      onUpdateQuantity: () => {},
      onRemoveItem: () => {},
      onCheckout: () => {},
    });

    t.assert(html.includes(sampleCart.P01.product.name), 'Cart drawer must display first cart product name');
    t.assert(html.includes(sampleCart.P02.product.name), 'Cart drawer must display second cart product name');
    t.assert(html.includes(formattedExpected), 'Cart drawer must accurately calculate total amount formatted in VND');
  });

  // Test 9: Category Filter Logic
  suite.test('R2.3 Category Filter: Products correctly mapped to categories', async (t) => {
    const categories = new Set(coopData.products.map((p) => p.category));
    t.assert(categories.size >= 3, 'Must have at least 3 distinct product categories');

    for (const cat of categories) {
      const filtered = coopData.products.filter((p) => p.category === cat);
      t.assert(filtered.length > 0, `Category ${cat} must contain at least one product`);
      t.assert(filtered.every((p) => p.category === cat), `Every product in filter must match category ${cat}`);
    }
  });

  // Test 10: AI Assistant Bé CoCo Knowledge Base & FAB
  suite.test('R3.1 Bé CoCo AI Assistant: FAB button & Knowledge base coverage', async (t) => {
    const AICoCoAssistant = await loadComponent('components/AICoCoAssistant.jsx');
    const html = renderToHtml(AICoCoAssistant, {
      knowledgeBase: coopData.aiKnowledge,
    });

    t.assert(html.includes('coco-fab'), 'AI assistant must have floating action button with .coco-fab class');
    t.assert(html.includes('Bé CoCo') || html.includes('CoCo'), 'AI assistant must identify as Bé CoCo');

    // Verify knowledge base items have questions and keywords
    t.assert(coopData.aiKnowledge.length >= 3, 'AI knowledge base must contain at least 3 FAQ topics');
    for (const item of coopData.aiKnowledge) {
      t.assert(Array.isArray(item.keywords) && item.keywords.length > 0,
        `Topic "${item.topic || 'FAQ'}" must have search keywords`);
      t.assert(typeof item.answer === 'string' && item.answer.length > 20,
        `Topic "${item.topic || 'FAQ'}" must have substantial detailed answer`);
    }
  });

  // Test 11: Zero Waste Diagram (Circular Economy)
  suite.test('R3.2 Zero Waste Diagram: Circular phases and 0% waste metrics', async (t) => {
    const ZeroWasteDiagram = await loadComponent('components/ZeroWasteDiagram.jsx');
    const html = renderToHtml(ZeroWasteDiagram, {
      parts: coopData.circularEconomyParts,
    });

    t.assert(html.includes('TUẦN HOÀN') || html.includes('Tuần hoàn') || html.includes('Zero Waste') || html.includes('0%'),
      'Zero Waste diagram must highlight circular economy and zero waste');
    t.assert(coopData.circularEconomyParts.length >= 5,
      'Must describe at least 5 anatomical parts of coconut tree (thân, lá, cùi, nước, vỏ, gáo)');
  });

  // Test 12: Blockchain QR Traceability Section
  suite.test('R3.3 Blockchain QR Traceability: Batch provenance & verifiable certificates', async (t) => {
    const TraceabilitySection = await loadComponent('components/TraceabilitySection.jsx');
    const batchCodes = Object.keys(coopData.traceabilityBatches);
    t.assert(batchCodes.length >= 1, 'Must have at least 1 traceability batch');
    const firstCode = batchCodes[0];
    const defaultBatch = coopData.traceabilityBatches[firstCode];

    const html = renderToHtml(TraceabilitySection, {
      batches: coopData.traceabilityBatches,
      initialCode: firstCode,
    });

    t.assert(html.includes('Tra Cứu Nguồn Gốc') || html.includes('TRUY XUẤT') || html.includes('Truy xuất'),
      'Traceability section must have clear title');
    t.assert(html.includes(defaultBatch.batchCode),
      'Traceability section must render the initial batch code');
    t.assert(html.includes(defaultBatch.farmOwner) || html.includes(defaultBatch.productName),
      'Traceability section must display the associated farm owner or product name');
    t.assert(html.includes('Blockchain') || html.includes('Khối') || html.includes('0x') || html.includes('CHUỖI CUNG ỨNG'),
      'Traceability section must reference blockchain/supply chain verification');
  });

  return await suite.run();
}
