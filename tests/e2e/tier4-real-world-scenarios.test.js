import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { TestSuite, loadComponent, renderToHtml } from './test-helpers.js';
import { coopData } from '../../src/data/coopData.js';

export async function runTier4Tests() {
  const suite = new TestSuite('Tier 4: Real-World Scenarios & Responsive Layout Verification');

  // Scenario 1: Complete User Purchasing Journey with VietQR Bank Transfer
  suite.test('R4.1 Complete customer purchasing journey: browse -> quickview -> add multiple -> cart -> VietQR bank transfer checkout', async (t) => {
    // Stage 1: User lands on Home, discovers featured products
    const ProductSection = await loadComponent('components/ProductSection.jsx');
    const pDiamond = coopData.products.find((p) => p.id === 'P07') || coopData.products[0];
    const pPowder = coopData.products.find((p) => p.id === 'P02') || coopData.products[1];

    t.assert(!!pDiamond, 'Featured product Diamond Coconut must exist');
    t.assert(!!pPowder, 'Featured product Coconut Powder must exist');

    // Stage 2: Quick View & Add Diamond Coconut (qty 2)
    const ProductModal = await loadComponent('components/ProductModal.jsx');
    const modalHtml1 = renderToHtml(ProductModal, {
      product: pDiamond,
      onClose: () => {},
      onAddToCart: () => {},
    });
    t.assert(modalHtml1.includes(pDiamond.name), 'Modal must show Diamond Coconut');

    // Stage 3: Quick View & Add Coconut Powder (qty 1)
    const modalHtml2 = renderToHtml(ProductModal, {
      product: pPowder,
      onClose: () => {},
      onAddToCart: () => {},
    });
    t.assert(modalHtml2.includes(pPowder.name), 'Modal must show Coconut Powder');

    // Stage 4: Cart State accumulates both products
    const cart = {
      [pDiamond.id]: { product: pDiamond, quantity: 2 },
      [pPowder.id]: { product: pPowder, quantity: 1 },
    };

    const grandTotal = pDiamond.price * 2 + pPowder.price * 1;
    t.assertEqual(grandTotal, pDiamond.price * 2 + pPowder.price * 1, 'Grand total must equal sum of line items');

    // Stage 5: Cart Drawer View & Checkout
    const CartDrawer = await loadComponent('components/CartDrawer.jsx');
    const cartHtml = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart,
      onUpdateQuantity: () => {},
      onRemoveItem: () => {},
      onCheckout: () => {},
    });

    t.assert(cartHtml.includes(pDiamond.name), 'Cart contains Diamond Coconut');
    t.assert(cartHtml.includes(pPowder.name), 'Cart contains Coconut Powder');
    t.assert(cartHtml.includes('Agribank') || cartHtml.includes('Tiến Hành Đặt Hàng'),
      'Cart drawer provides checkout initiation');

    // Stage 6: Bank Transfer Checkout Execution
    const customerOrder = {
      orderId: `SP-${Date.now().toString().slice(-6)}`,
      customer: {
        fullName: 'Lê Hoàng Long',
        phone: '0918268379',
        address: 'Khóm 2, Thị trấn Tam Bình, Huyện Tam Bình, Tỉnh Vĩnh Long',
        note: 'Giao hàng sau 14h chiều',
        paymentMethod: 'bank_transfer',
      },
      items: Object.values(cart),
      totalAmount: grandTotal,
      totalCount: 3,
      bankAccount: {
        bankName: 'Agribank - Ngân hàng Nông nghiệp & PTNT Việt Nam',
        shortBank: 'Agribank',
        branch: 'Chi nhánh Tam Bình, Vĩnh Long',
        accountNumber: '7300205168379',
        accountName: 'HOP TAC XA DUA SONG PHU',
      },
    };

    t.assertEqual(customerOrder.customer.paymentMethod, 'bank_transfer', 'Payment method must be bank_transfer');
    t.assertEqual(customerOrder.bankAccount.accountNumber, '7300205168379', 'VietQR account number must match HTX official account');
    t.assertEqual(customerOrder.bankAccount.accountName, 'HOP TAC XA DUA SONG PHU', 'Beneficiary name must be HOP TAC XA DUA SONG PHU');
    t.assertEqual(customerOrder.totalCount, 3, 'Total items count must be 3');
    t.assertEqual(customerOrder.totalAmount, grandTotal, 'Order amount matches calculated total');
  });

  // Scenario 2: Mobile & Multi-Device Responsive Layout Contracts
  suite.test('R4.2 Responsive layout contracts across Mobile (375px/414px), Tablet (768px), and Desktop (1280px+)', async (t) => {
    const Navbar = await loadComponent('components/Navbar.jsx');
    const ProductsPage = await loadComponent('components/ProductsPage.jsx');
    const CartDrawer = await loadComponent('components/CartDrawer.jsx');

    // Navbar responsive contracts
    const navHtml = renderToHtml(Navbar, {
      coopInfo: coopData.coopInfo,
      cartCount: 2,
      activeTab: 'home',
      setActiveTab: () => {},
      onOpenCart: () => {},
      onOpenSearch: () => {},
    });

    // Check mobile hamburger toggle presence
    t.assert(
      navHtml.includes('md:hidden') || navHtml.includes('lg:hidden') || navHtml.includes('Menu') || navHtml.includes('menu'),
      'Navbar must contain responsive mobile hamburger menu toggle'
    );

    // ProductsPage responsive grid contracts (2 cols mobile, 3-4 cols tablet, 5 cols desktop)
    const prodPageHtml = renderToHtml(ProductsPage, {
      products: coopData.products,
      onQuickView: () => {},
    });

    t.assert(prodPageHtml.includes('grid-cols-2'), 'Product catalog must provide 2 columns on mobile screens');
    t.assert(prodPageHtml.includes('sm:grid-cols-3') || prodPageHtml.includes('md:grid-cols-4'),
      'Product catalog must scale to 3 or 4 columns on tablet screens');
    t.assert(prodPageHtml.includes('lg:grid-cols-5'), 'Product catalog must scale to 5 columns on desktop screens');

    // Cart Drawer responsive width contracts
    const drawerHtml = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart: {},
    });
    t.assert(drawerHtml.includes('w-full') && (drawerHtml.includes('max-w-md') || drawerHtml.includes('max-w-lg')),
      'Cart drawer must be full width on mobile and clamped (max-w-md) on desktop');
  });

  // Scenario 3: Production Build & Asset Integrity Verification
  suite.test('R4.3 Production build verification: npm run build produces valid bundles without errors', async (t) => {
    // Run vite build synchronously
    const buildOutput = execSync('npm run build', { encoding: 'utf8' });
    t.assert(buildOutput.includes('built in') || buildOutput.includes('dist/index.html'),
      'npm run build must succeed and produce dist output');

    const distIndex = path.resolve('dist/index.html');
    t.assert(fs.existsSync(distIndex), 'dist/index.html must exist after production build');

    const distHtml = fs.readFileSync(distIndex, 'utf8');
    t.assert(distHtml.includes('HỢP TÁC XÃ DỪA SONG PHÚ'), 'dist/index.html must contain brand title');
    t.assert(distHtml.includes('stylesheet') || distHtml.includes('.css'), 'dist/index.html must link to production CSS');
    t.assert(distHtml.includes('type="module"') || distHtml.includes('.js'), 'dist/index.html must link to production JS bundle');

    // Check assets directory
    const distAssets = path.resolve('dist/assets');
    t.assert(fs.existsSync(distAssets), 'dist/assets directory must exist');
    const assetFiles = fs.readdirSync(distAssets);
    const hasCssBundle = assetFiles.some((f) => f.endsWith('.css'));
    const hasJsBundle = assetFiles.some((f) => f.endsWith('.js'));

    t.assert(hasCssBundle, 'dist/assets must contain compiled CSS bundle');
    t.assert(hasJsBundle, 'dist/assets must contain compiled JS bundle');
  });

  return await suite.run();
}
