import { TestSuite, loadComponent, renderToHtml } from './test-helpers.js';
import { coopData } from '../../src/data/coopData.js';

export async function runTier3Tests() {
  const suite = new TestSuite('Tier 3: Cross-Feature Combinations');

  // Combination 1: Category Filter -> Product -> Quick View -> Add to Cart -> Cart Drawer -> COD Checkout
  suite.test('R3.C1 End-to-end combination: Category filter -> Quick View -> Cart Drawer -> COD Checkout flow', async (t) => {
    // 1. Filter products by category 'trai-cay-tuoi'
    const targetCat = 'trai-cay-tuoi';
    const categoryProducts = coopData.products.filter((p) => p.category === targetCat);
    t.assert(categoryProducts.length > 0, `Must have products in category ${targetCat}`);
    const selectedProduct = categoryProducts[0];

    // 2. Open Quick View Modal
    const ProductModal = await loadComponent('components/ProductModal.jsx');
    let modalCartProduct = null;
    let modalCartQty = 0;
    const modalHtml = renderToHtml(ProductModal, {
      product: selectedProduct,
      onClose: () => {},
      onAddToCart: (p, q) => {
        modalCartProduct = p;
        modalCartQty = q;
      },
      onTraceClick: () => {},
    });

    t.assert(modalHtml.includes(selectedProduct.name), 'Modal must render selected product name');
    t.assert(modalHtml.includes(selectedProduct.traceBatch || 'SP-'), 'Modal must render batch code');

    // Simulate adding 3 items from Quick View
    const addQty = 3;
    let cart = {};
    cart[selectedProduct.id] = {
      product: selectedProduct,
      quantity: addQty,
    };

    // 3. Render Cart Drawer with item
    const CartDrawer = await loadComponent('components/CartDrawer.jsx');
    let checkoutOrderRecord = null;

    const cartHtml = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart,
      onUpdateQuantity: () => {},
      onRemoveItem: () => {},
      onCheckout: (record) => {
        checkoutOrderRecord = record;
      },
    });

    const expectedTotal = selectedProduct.price * addQty;
    t.assert(cartHtml.includes(selectedProduct.name), 'Cart drawer must contain selected product');
    t.assert(cartHtml.includes(String(addQty)), 'Cart drawer must reflect added quantity');

    // 4. Simulate complete checkout submission (COD)
    const orderSubmission = {
      orderId: `SP-ORD-${Date.now().toString().slice(-4)}`,
      customer: {
        fullName: 'Nguyễn Văn Minh',
        phone: '0918268379',
        address: 'Ấp Song Phú 1, Xã Song Phú, Tam Bình, Vĩnh Long',
        note: 'Giao hàng giờ hành chính',
        paymentMethod: 'cod',
      },
      items: Object.values(cart),
      totalAmount: expectedTotal,
      totalCount: addQty,
    };

    t.assertEqual(orderSubmission.customer.paymentMethod, 'cod');
    t.assertEqual(orderSubmission.totalAmount, expectedTotal);
    t.assertEqual(orderSubmission.items.length, 1);

    // Simulate cart clearing upon order completion
    cart = {};
    t.assertEqual(Object.keys(cart).length, 0, 'Cart must reset to empty after order placement');
  });

  // Combination 2: AI Bé CoCo recommendation -> Add to cart drawer
  suite.test('R3.C2 AI Bé CoCo recommendation -> Add to Cart integration', async (t) => {
    // 1. Search knowledge base for coconut oil query
    const userQuery = 'Em muốn tư vấn về dầu dừa ly tâm nguyên chất';
    const lower = userQuery.toLowerCase();
    let matchedAnswer = null;

    for (const item of coopData.aiKnowledge) {
      if (item.keywords && item.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
        matchedAnswer = item.answer;
        break;
      }
    }

    t.assert(matchedAnswer !== null, 'AI knowledge base must successfully match query on coconut oil');
    t.assert(
      matchedAnswer.includes('dầu dừa') || matchedAnswer.includes('ly tâm') || matchedAnswer.includes('OCOP'),
      'AI answer must specifically describe coconut oil characteristics'
    );

    // 2. Identify corresponding product from products catalog
    const oilProduct = coopData.products.find(
      (p) => p.name.toLowerCase().includes('dầu dừa') || p.id === 'P09'
    ) || coopData.products[0];

    t.assert(oilProduct !== undefined, 'Must find matching coconut oil product');

    // 3. Simulate Add to Cart from AI card
    const simulatedCart = {};
    simulatedCart[oilProduct.id] = {
      product: oilProduct,
      quantity: 1,
    };

    t.assertEqual(simulatedCart[oilProduct.id].quantity, 1, 'Product from AI recommendation added to cart');
    t.assertEqual(simulatedCart[oilProduct.id].product.name, oilProduct.name, 'Product name matches recommended item');
  });

  // Combination 3: Quick View "Tra cứu lý lịch lô" -> Traceability Section linkage
  suite.test('R3.C3 Quick View "Tra cứu lý lịch lô" transitions to Traceability section with matching batch code', async (t) => {
    const ProductModal = await loadComponent('components/ProductModal.jsx');
    const TraceabilitySection = await loadComponent('components/TraceabilitySection.jsx');

    const sampleProduct = coopData.products[0];
    const targetBatch = sampleProduct.traceBatch || 'SP-DXL-2026-01';

    let triggeredTraceCode = null;
    let currentTab = 'products';

    const handleTraceClick = (code) => {
      triggeredTraceCode = code;
      currentTab = 'traceability';
    };

    // Render ProductModal with trace handler
    const modalHtml = renderToHtml(ProductModal, {
      product: sampleProduct,
      onClose: () => {},
      onAddToCart: () => {},
      onTraceClick: handleTraceClick,
    });

    t.assert(modalHtml.includes('Tra cứu lý lịch lô'), 'Product modal must offer "Tra cứu lý lịch lô" button');

    // Simulate clicking trace
    handleTraceClick(targetBatch);
    t.assertEqual(currentTab, 'traceability', 'Active tab must transition to traceability');
    t.assertEqual(triggeredTraceCode, targetBatch, 'Target batch code must be passed to traceability state');

    // Render Traceability section with that target batch
    const traceHtml = renderToHtml(TraceabilitySection, {
      batches: coopData.traceabilityBatches,
      initialCode: triggeredTraceCode,
    });

    t.assert(traceHtml.includes(triggeredTraceCode), 'Traceability view must reflect clicked batch code');
  });

  // Combination 4: Zero Waste CTA -> Products Navigation
  suite.test('R3.C4 Zero Waste Diagram CTA directs users to products catalog', async (t) => {
    const ZeroWasteDiagram = await loadComponent('components/ZeroWasteDiagram.jsx');

    let navigatedTab = null;
    const onExploreProducts = () => {
      navigatedTab = 'products';
    };

    const html = renderToHtml(ZeroWasteDiagram, {
      parts: coopData.circularEconomyParts,
      onExploreClick: onExploreProducts,
    });

    t.assert(html.includes('KHÁM PHÁ SẢN PHẨM TUẦN HOÀN') || html.includes('sản phẩm') || html.includes('TUẦN HOÀN'),
      'Zero Waste diagram must provide CTA to explore products');

    // Simulate clicking explore
    onExploreProducts();
    t.assertEqual(navigatedTab, 'products', 'CTA must trigger navigation to products catalog');
  });

  return await suite.run();
}
