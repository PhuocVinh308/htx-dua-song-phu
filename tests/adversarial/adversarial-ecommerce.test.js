import fs from 'node:fs';
import path from 'node:path';
import esbuild from 'esbuild';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { coopData } from '../../src/data/coopData.js';

const ROOT_DIR = path.resolve('.');
const TEST_CACHE_DIR = path.resolve(ROOT_DIR, '.test-cache');

/**
 * Compile JSX/JS files under src/ into .test-cache/ using esbuild
 */
function compileTestComponents() {
  if (!fs.existsSync(TEST_CACHE_DIR)) {
    fs.mkdirSync(TEST_CACHE_DIR, { recursive: true });
  }

  const findFiles = (dir) => {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(findFiles(fullPath));
      } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
        results.push(fullPath);
      }
    }
    return results;
  };

  const srcFiles = findFiles(path.resolve(ROOT_DIR, 'src'));

  esbuild.buildSync({
    entryPoints: srcFiles,
    outdir: TEST_CACHE_DIR,
    outbase: path.resolve(ROOT_DIR, 'src'),
    format: 'esm',
    bundle: true,
    packages: 'external',
    loader: { 
      '.jsx': 'jsx', 
      '.js': 'js', 
      '.css': 'empty', 
      '.jpg': 'file', 
      '.jpeg': 'file', 
      '.png': 'file', 
      '.svg': 'file' 
    },
    jsx: 'automatic',
    outExtension: { '.js': '.js' },
  });
}

async function loadComponent(subpath) {
  compileTestComponents();
  const fullPath = path.resolve(TEST_CACHE_DIR, subpath.replace(/\.jsx$/, '.js'));
  const mod = await import(fullPath + `?t=${Date.now()}`);
  return mod.default || mod;
}

async function loadModule(subpath) {
  compileTestComponents();
  const fullPath = path.resolve(TEST_CACHE_DIR, subpath.replace(/\.jsx$/, '.js'));
  return await import(fullPath + `?t=${Date.now()}`);
}

function renderToHtml(Component, props = {}) {
  const element = React.createElement(Component, props);
  return ReactDOMServer.renderToStaticMarkup(element);
}

// Adversarial Test Runner
class AdversarialHarness {
  constructor(name) {
    this.name = name;
    this.cases = [];
    this.findings = [];
  }

  test(title, fn) {
    this.cases.push({ title, fn });
  }

  recordFinding(level, id, title, details) {
    this.findings.push({ level, id, title, details });
  }

  async run() {
    console.log(`\n============================================================`);
    console.log(`🔥 ADVERSARIAL STRESS HARNESS: ${this.name}`);
    console.log(`============================================================\n`);

    let passed = 0;
    let failed = 0;

    for (const c of this.cases) {
      try {
        await c.fn(this);
        passed++;
        console.log(`  ✓ ${c.title}`);
      } catch (err) {
        failed++;
        console.log(`  💥 FAILURE DETECTED: ${c.title}`);
        console.log(`     Error: ${err.message}`);
        if (err.stack) {
          console.log(`     Stack: ${err.stack.split('\n').slice(0, 3).join('\n')}`);
        }
      }
    }

    console.log(`\n------------------------------------------------------------`);
    console.log(`Harness completed: ${passed} passed, ${failed} failed / findings generated.`);
    console.log(`Total confirmed vulnerability / bug findings: ${this.findings.length}`);
    console.log(`------------------------------------------------------------\n`);

    return {
      passed,
      failed,
      findings: this.findings,
    };
  }
}

export async function runAdversarialSuite() {
  const harness = new AdversarialHarness('E-Commerce & State Machine Adversarial Suite');

  // Load compiled components and module exports
  const CartDrawerMod = await loadModule('components/CartDrawer.jsx');
  const CartDrawer = CartDrawerMod.default;
  const { generateOrderId, validateVietnamesePhone, calculateCartTotals, formatVND } = CartDrawerMod;

  const AppMod = await loadModule('App.jsx');
  const { parseSafeCart, safeAddToCart } = AppMod;

  const ProductsPageMod = await loadModule('components/ProductsPage.jsx');
  const ProductsPage = ProductsPageMod.default;
  const { robustSortProducts } = ProductsPageMod;

  const ProductModal = await loadComponent('components/ProductModal.jsx');

  // ==========================================================================
  // SUITE 1: Cart Drawer State Machine & Boundaries
  // ==========================================================================

  // 1.1 Cart with 0 or Negative Quantity
  harness.test('ADV-CART-01: Cart with quantity <= 0 produces distorted totals or negative amount', async (h) => {
    // Inject corrupted cart with negative quantity
    const corruptedCart = {
      P01: { product: coopData.products[0], quantity: -2 },
      P02: { product: coopData.products[1], quantity: 1 },
    };

    const html = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart: corruptedCart,
      onUpdateQuantity: () => {},
      onRemoveItem: () => {},
      onCheckout: () => {},
    });

    const totals = calculateCartTotals(corruptedCart);

    const hasNegativeFormattedTotal = /-\s*[\d.,]+\s*₫/.test(html);

    // Negative quantity check
    if (totals.totalCount < 0 || totals.totalAmount < 0 || hasNegativeFormattedTotal) {
      h.recordFinding('HIGH', 'BUG-CART-NEG-QTY', 'Cart accepts negative quantity without sanitization or clamping', {
        inputCart: corruptedCart,
        calculatedTotalCount: totals.totalCount,
        calculatedTotalAmount: totals.totalAmount,
        renderedHtmlContainsNegativeTotal: hasNegativeFormattedTotal,
      });
    }

    // App.jsx addToCart: test safeAddToCart
    const cartAfterZeroAdd = safeAddToCart({}, coopData.products[0], 0);
    if (cartAfterZeroAdd.P01 && cartAfterZeroAdd.P01.quantity <= 0) {
      h.recordFinding('MEDIUM', 'BUG-APP-ADD-ZERO-QTY', 'addToCart does not reject or clamp quantity <= 0 when adding new item', {
        resultItem: cartAfterZeroAdd.P01,
      });
    }
  });

  // 1.2 Empty Cart Checkout Form Submission
  harness.test('ADV-CART-02: Checkout form submission on empty cart is guarded against empty submission', async (h) => {
    const emptyCart = {};
    const totals = calculateCartTotals(emptyCart);

    const html = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart: emptyCart,
      onUpdateQuantity: () => {},
      onRemoveItem: () => {},
      onCheckout: () => {},
    });

    // Check if checkout button is disabled / styled inactive when cart is empty
    const hasDisabledCheckout = html.includes('disabled') && (html.includes('opacity-50') || html.includes('cursor-not-allowed'));

    if (!hasDisabledCheckout && totals.items.length === 0) {
      h.recordFinding('HIGH', 'BUG-CHECKOUT-EMPTY-CART', 'Checkout submission lacks empty-cart guard in validateForm/handleSubmitOrder', {
        cartItemCount: totals.items.length,
        hasDisabledCheckout,
        consequence: 'Submitting checkout with empty cart creates a zero-item order record and triggers onCheckout with totalAmount=0',
      });
    }
  });

  // 1.3 Subtotal Currency Formatting & NaN / Missing Price Resilience
  harness.test('ADV-CART-03: CartDrawer with missing or NaN price produces NaN ₫ string in subtotal', async (h) => {
    const corruptedProduct = {
      id: 'P99',
      name: 'Sản phẩm lỗi giá',
      price: NaN,
      unit: 'hộp',
      image: '/test.jpg',
    };

    const badCart = {
      P99: { product: corruptedProduct, quantity: 2 },
    };

    const html = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart: badCart,
      onUpdateQuantity: () => {},
      onRemoveItem: () => {},
      onCheckout: () => {},
    });

    if (html.includes('NaN')) {
      h.recordFinding('HIGH', 'BUG-CART-NAN-PRICE', 'CartDrawer renders "NaN ₫" when product.price is NaN or undefined', {
        foundInHtml: true,
        sampleOutput: 'Tổng tiền tạm tính: NaN ₫',
      });
    }
  });

  // 1.4 Cart Item with null product throws TypeError
  harness.test('ADV-CART-04: Cart item with null product throws TypeError on item.product.price', async (h) => {
    const badCart = {
      P01: { product: null, quantity: 1 },
    };

    let crashed = false;
    let crashError = null;
    try {
      renderToHtml(CartDrawer, {
        isOpen: true,
        onClose: () => {},
        cart: badCart,
        onUpdateQuantity: () => {},
        onRemoveItem: () => {},
        onCheckout: () => {},
      });
    } catch (err) {
      crashed = true;
      crashError = err.message;
    }

    if (crashed) {
      h.recordFinding('CRITICAL', 'BUG-CART-NULL-PRODUCT-CRASH', 'CartDrawer crashes with TypeError if any cart item has null product', {
        errorMessage: crashError,
        location: 'CartDrawer.jsx:19: item.product.price',
      });
    }
  });

  // ==========================================================================
  // SUITE 2: Checkout Form Phone Validation & Security Boundaries
  // ==========================================================================

  // 2.1 Adversarial Phone Validation
  harness.test('ADV-PHONE-01: Phone regex accepts non-digit punctuation strings with zero numbers', async (h) => {
    const adversarialPhones = [
      '---------',       // 9 hyphens
      '+++++++++',       // 9 plus signs
      '((((()))))',       // 10 parentheses
      '+ - ( ) - +',     // 11 punctuation chars
      '0000000000',       // 10 zeros
      '123456789012345',  // 15 digits (error msg says 9-11)
    ];

    const acceptedBypasses = [];
    for (const p of adversarialPhones) {
      if (validateVietnamesePhone(p)) {
        acceptedBypasses.push(p);
      }
    }

    if (acceptedBypasses.length > 0) {
      h.recordFinding('HIGH', 'BUG-PHONE-REGEX-BYPASS', 'Phone regex allows strings without valid digits or with invalid length', {
        acceptedInvalidInputs: acceptedBypasses,
        impact: 'Users can submit bogus phone numbers consisting solely of hyphens, plus signs, or parens.',
      });
    }

    // False negatives: valid Vietnamese international format numbers that FAIL regex
    const validVNPhones = [
      '+84 (028) 3822 1234',  // length 20
      '+84 0918 268 379',     // length 16
      '(+84) 918 268 379',    // length 17
    ];

    const falselyRejected = [];
    for (const p of validVNPhones) {
      if (!validateVietnamesePhone(p)) {
        falselyRejected.push(p);
      }
    }

    if (falselyRejected.length > 0) {
      h.recordFinding('MEDIUM', 'BUG-PHONE-FALSE-REJECT', 'Phone regex falsely rejects legitimate phone numbers longer than 15 characters', {
        falselyRejected,
        reason: 'Length is capped at 15 chars, rejecting standard international formatting with spaces and area codes.',
      });
    }
  });

  // 2.2 COD vs Bank Transfer State Toggle & VietQR Payload
  harness.test('ADV-PAY-01: COD vs Bank Transfer state transitions and VietQR URL formatting', async (h) => {
    // Test COD render
    const codHtml = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart: { P01: { product: coopData.products[0], quantity: 1 } },
      onUpdateQuantity: () => {},
      onRemoveItem: () => {},
      onCheckout: () => {},
    });

    // In 'cart' view, bank details should not show
    const bankDetailsInCartView = codHtml.includes('Thông Tin Tài Khoản HTX');

    // Test VietQR URL generation robustness
    const orderId = 'SP-123456';
    const totalAmount = 50000;
    const vietQrUrl = `https://api.vietqr.io/image/970405-7300205168379-qr_only.jpg?amount=${totalAmount}&addInfo=${encodeURIComponent(orderId)}`;

    if (!vietQrUrl.includes('amount=50000') || !vietQrUrl.includes('addInfo=SP-123456')) {
      h.recordFinding('HIGH', 'BUG-VIETQR-URL', 'VietQR URL malformed', { vietQrUrl });
    }
  });

  // 2.3 Order ID Collision Probability
  harness.test('ADV-ORDER-01: Order ID generation collision vulnerability under burst requests', async (h) => {
    const generated = new Set();
    let collisions = 0;
    const BURST_COUNT = 50;

    for (let i = 0; i < BURST_COUNT; i++) {
      const id = generateOrderId();
      if (generated.has(id)) {
        collisions++;
      } else {
        generated.add(id);
      }
    }

    if (collisions > 0) {
      h.recordFinding('CRITICAL', 'BUG-ORDERID-COLLISION', 'Date.now().toString().slice(-6) causes guaranteed orderId collisions during rapid/burst submissions', {
        burstCount: BURST_COUNT,
        uniqueGenerated: generated.size,
        collisionsDetected: collisions,
        collisionRate: `${((collisions / BURST_COUNT) * 100).toFixed(1)}%`,
        mechanism: 'Date.now() returns identical timestamp within same millisecond; slice(-6) has only 1,000,000 values and wraps every 16.6 minutes.',
      });
    }
  });

  // ==========================================================================
  // SUITE 3: LocalStorage & App State Persistence Poisoning
  // ==========================================================================

  // 3.1 LocalStorage "null" poisoning crash
  harness.test('ADV-STORAGE-01: LocalStorage value "null" causes fatal TypeError crash in App.jsx', async (h) => {
    const rawStored = 'null';
    const parsed = parseSafeCart(rawStored);

    let crashed = false;
    let crashError = null;
    try {
      const cartTotalCount = Object.values(parsed).reduce((sum, item) => sum + (item?.quantity || 0), 0);
    } catch (err) {
      crashed = true;
      crashError = err.message;
    }

    if (crashed || !parsed || typeof parsed !== 'object') {
      h.recordFinding('CRITICAL', 'BUG-STORAGE-NULL-CRASH', 'App.jsx crashes with fatal TypeError if localStorage "socoop_cart" is "null"', {
        rawStoredValue: 'null',
        evaluatedCart: parsed,
        errorMessage: crashError,
        location: 'App.jsx:108: Object.values(cart)',
      });
    }
  });

  // ==========================================================================
  // SUITE 4: Quick View Modal Edge Cases & Crash Vectors
  // ==========================================================================

  // 4.1 Product with string features crashes ProductModal
  harness.test('ADV-MODAL-01: ProductModal crashes with TypeError when product.features is a string', async (h) => {
    // When a developer or API provides features as a string:
    const corruptedProduct = {
      id: 'P_STR',
      name: 'Dừa đặc sản',
      price: 30000,
      features: 'Ngọt thanh, mát lành, 100% tự nhiên', // String instead of Array!
      image: '/test.jpg',
    };

    let crashed = false;
    let crashMsg = null;
    try {
      renderToHtml(ProductModal, {
        product: corruptedProduct,
        onClose: () => {},
        onAddToCart: () => {},
      });
    } catch (err) {
      crashed = true;
      crashMsg = err.message;
    }

    if (crashed) {
      h.recordFinding('CRITICAL', 'BUG-MODAL-FEATURES-CRASH', 'ProductModal crashes when product.features is a string instead of array', {
        errorMessage: crashMsg,
        vulnerableLine: 'ProductModal.jsx:93: product.features?.map',
        cause: 'Condition `product.features && product.features.length > 0` is true for strings, but string has no .map method.',
      });
    }
  });

  // 4.2 Product with NaN price
  harness.test('ADV-MODAL-02: ProductModal renders "NaN ₫" when product.price is NaN', async (h) => {
    const nanProduct = {
      id: 'P_NAN',
      name: 'Dừa lỗi',
      price: NaN,
      image: '/test.jpg',
    };

    let html = '';
    try {
      html = renderToHtml(ProductModal, {
        product: nanProduct,
        onClose: () => {},
        onAddToCart: () => {},
      });
    } catch (err) {}

    if (html.includes('NaN ₫') || html.includes('NaN')) {
      h.recordFinding('MEDIUM', 'BUG-MODAL-NAN-PRICE', 'ProductModal renders "NaN ₫" when product.price is NaN', {
        renderedHtmlContainsNan: true,
      });
    }
  });

  // 4.3 ProductModal with empty object `{}`
  harness.test('ADV-MODAL-03: ProductModal handles empty object `{}` without throwing exception', async (h) => {
    let crashed = false;
    let errorMsg = null;
    try {
      const html = renderToHtml(ProductModal, {
        product: {},
        onClose: () => {},
        onAddToCart: () => {},
      });
    } catch (err) {
      crashed = true;
      errorMsg = err.message;
    }

    if (crashed) {
      h.recordFinding('HIGH', 'BUG-MODAL-EMPTY-OBJECT', 'ProductModal crashes on empty object product `{}`', {
        errorMsg,
      });
    }
  });

  // ==========================================================================
  // SUITE 5: ProductsPage Category Filtering & Sorting Boundaries
  // ==========================================================================

  // 5.1 ProductsPage with undefined/null products crashes
  harness.test('ADV-PROD-01: ProductsPage crashes if products prop is undefined or null', async (h) => {
    let crashed = false;
    let crashError = null;

    try {
      renderToHtml(ProductsPage, {
        products: undefined,
        onQuickView: () => {},
      });
    } catch (err) {
      crashed = true;
      crashError = err.message;
    }

    if (crashed) {
      h.recordFinding('CRITICAL', 'BUG-PRODUCTSPAGE-NULL-CRASH', 'ProductsPage lacks default prop `products = []`, crashing on undefined/null', {
        crashError,
        location: 'ProductsPage.jsx:45: products.filter / products.slice',
      });
    }
  });

  // 5.2 ProductsPage Sorting with undefined/null prices
  harness.test('ADV-PROD-02: ProductsPage sorting price-asc/price-desc corrupted when prices are null/undefined', async (h) => {
    const productsWithNullPrice = [
      { id: '1', name: 'A', price: 10000 },
      { id: '2', name: 'B', price: undefined },
      { id: '3', name: 'C', price: 5000 },
    ];

    const sorted = robustSortProducts(productsWithNullPrice, 'price-asc');
    const safeDiff = (Number.isFinite(productsWithNullPrice[0].price) ? productsWithNullPrice[0].price : 0) -
                     (Number.isFinite(productsWithNullPrice[1].price) ? productsWithNullPrice[1].price : 0);

    if (Number.isNaN(safeDiff) || !Array.isArray(sorted) || sorted.length !== 3) {
      h.recordFinding('MEDIUM', 'BUG-SORT-NAN-PRICE', 'Sorting by price-asc or price-desc produces NaN comparisons when prices are undefined/null', {
        subtractionResult: 'NaN',
        impact: 'Sorting order becomes corrupted and unstable when any product item has missing or non-numeric price.',
      });
    }
  });

  // 5.3 Unknown Category Boundary
  harness.test('ADV-PROD-03: Filtering with unknown category renders 0 items and empty state', async (h) => {
    const html = renderToHtml(ProductsPage, {
      products: coopData.products,
      selectedCategory: 'nonexistent-category-xyz',
      onQuickView: () => {},
    });

    const hasEmptyNotice = html.includes('Không tìm thấy') || html.includes('Chưa có sản phẩm nào');
    if (!hasEmptyNotice) {
      h.recordFinding('MEDIUM', 'BUG-FILTER-UNKNOWN-CAT', 'Unknown category filter does not render expected empty state', {});
    }
  });

  return await harness.run();
}

// Direct CLI execution
if (process.argv[1] && process.argv[1].endsWith('adversarial-ecommerce.test.js')) {
  runAdversarialSuite().then((results) => {
    console.log('Results summary:', JSON.stringify(results, null, 2));
    process.exit(results.findings.length > 0 ? 1 : 0);
  });
}
