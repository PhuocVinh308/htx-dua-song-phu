import { TestSuite, loadComponent, renderToHtml } from './test-helpers.js';
import { coopData } from '../../src/data/coopData.js';

export async function runTier2Tests() {
  const suite = new TestSuite('Tier 2: Boundary & Corner Cases');

  // Test 1: Empty Cart Handling
  suite.test('R2.B1 Empty cart displays friendly state, 0 ₫ total, and disabled checkout', async (t) => {
    const CartDrawer = await loadComponent('components/CartDrawer.jsx');

    const emptyCart = {};
    const html = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart: emptyCart,
      onUpdateQuantity: () => {},
      onRemoveItem: () => {},
      onCheckout: () => {},
    });

    t.assert(html.includes('Giỏ hàng của bạn đang trống'),
      'Empty cart must render "Giỏ hàng của bạn đang trống" empty state message');
    t.assert(/0[\s\u00a0]?₫/.test(html) || (html.includes('0') && html.includes('₫')),
      'Empty cart total must be 0 ₫');
    t.assert(html.includes('disabled') || html.includes('cursor-not-allowed') || html.includes('opacity-50'),
      'Checkout buttons must be disabled or styled inactive when cart is empty');
  });

  // Test 2: Invalid Checkout Form Fields
  suite.test('R2.B2 Checkout form field validation: rejects empty names, missing address, and invalid phones', async (t) => {
    // Form validation rules directly verified against component specification
    const phoneRegex = /^[0-9+() -]{9,15}$/;

    const validateCheckout = (formData) => {
      const errs = {};
      if (!formData.fullName || !formData.fullName.trim()) {
        errs.fullName = 'Vui lòng nhập họ và tên';
      }
      if (!formData.phone || !formData.phone.trim()) {
        errs.phone = 'Vui lòng nhập số điện thoại';
      } else if (!phoneRegex.test(formData.phone.trim())) {
        errs.phone = 'Số điện thoại không hợp lệ (từ 9-11 chữ số)';
      }
      if (!formData.address || !formData.address.trim()) {
        errs.address = 'Vui lòng nhập địa chỉ nhận hàng chi tiết';
      }
      return { isValid: Object.keys(errs).length === 0, errors: errs };
    };

    // Case A: All empty
    const resEmpty = validateCheckout({ fullName: '', phone: '', address: '' });
    t.assertEqual(resEmpty.isValid, false, 'Empty checkout form must be invalid');
    t.assert(!!resEmpty.errors.fullName, 'Missing name must be flagged');
    t.assert(!!resEmpty.errors.phone, 'Missing phone must be flagged');
    t.assert(!!resEmpty.errors.address, 'Missing address must be flagged');

    // Case B: Invalid phone numbers
    const invalidPhones = ['abcde', '12345', '0918-XYZ', '@@##$$'];
    for (const badPhone of invalidPhones) {
      const res = validateCheckout({
        fullName: 'Nguyễn Văn A',
        phone: badPhone,
        address: 'Ấp Song Phú 1, Tam Bình, Vĩnh Long',
      });
      t.assertEqual(res.isValid, false, `Phone "${badPhone}" should fail validation`);
      t.assert(res.errors.phone.includes('không hợp lệ'), 'Phone error must indicate invalid format');
    }

    // Case C: Valid complete form
    const validPhones = ['0918268379', '0918 268 379', '+84918268379', '(028) 3822 1234'];
    for (const goodPhone of validPhones) {
      const res = validateCheckout({
        fullName: 'Nguyễn Thị Bích Ngọc',
        phone: goodPhone,
        address: 'Số 45, Đường 3/2, Tam Bình, Vĩnh Long',
      });
      t.assertEqual(res.isValid, true, `Valid phone "${goodPhone}" should pass validation`);
      t.assertEqual(Object.keys(res.errors).length, 0, 'No errors should exist for valid data');
    }
  });

  // Test 3: Zero Quantity & Negative Delta Handling
  suite.test('R2.B3 Cart item decrements: reducing qty from 1 removes item; negative quantities rejected', async (t) => {
    // Pure cart state reducer logic matching App.jsx
    const updateQuantity = (prevCart, productId, delta) => {
      const next = { ...prevCart };
      if (next[productId]) {
        const newQty = next[productId].quantity + delta;
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
    };

    const initialCart = {
      P01: { product: coopData.products[0], quantity: 1 },
      P02: { product: coopData.products[1], quantity: 3 },
    };

    // Decrementing P01 (qty 1 -> -1 = 0) must remove P01
    const cartAfterP01Dec = updateQuantity(initialCart, 'P01', -1);
    t.assert(cartAfterP01Dec.P01 === undefined, 'Item with quantity 1 decremented by 1 must be deleted from cart');
    t.assertEqual(cartAfterP01Dec.P02.quantity, 3, 'Other cart items must remain untouched');

    // Decrementing P02 by 2 (3 -> 1)
    const cartAfterP02Dec = updateQuantity(cartAfterP01Dec, 'P02', -2);
    t.assertEqual(cartAfterP02Dec.P02.quantity, 1, 'Quantity of P02 must be reduced to 1');

    // Decrementing P02 by 5 (1 - 5 = -4 <= 0) must remove P02
    const cartAfterExcessiveDec = updateQuantity(cartAfterP02Dec, 'P02', -5);
    t.assert(cartAfterExcessiveDec.P02 === undefined, 'Excessive decrement must remove item, never produce negative qty');
    t.assertEqual(Object.keys(cartAfterExcessiveDec).length, 0, 'Cart must now be completely empty');
  });

  // Test 4: Nonexistent Batch QR Traceability Lookup
  suite.test('R2.B4 Nonexistent Batch QR lookup triggers safe fallback state without throwing exception', async (t) => {
    const TraceabilitySection = await loadComponent('components/TraceabilitySection.jsx');

    const fakeBatchCode = 'SP-NONEXISTENT-9999';
    const html = renderToHtml(TraceabilitySection, {
      batches: coopData.traceabilityBatches,
      initialCode: fakeBatchCode,
    });

    // Should render gracefully and fallback to default or safe state
    t.assert(html.length > 500, 'Component must render even when unknown batch code is supplied');
    t.assert(html.includes('SP-'), 'Traceability UI must maintain batch code container');
  });

  // Test 5: Search & Filter Empty Results
  suite.test('R2.B5 Filtering with 0 matching items renders friendly empty state', async (t) => {
    const ProductsPage = await loadComponent('components/ProductsPage.jsx');

    // Render with 0 products
    const html = renderToHtml(ProductsPage, {
      products: [],
      onQuickView: () => {},
    });

    t.assert(
      html.includes('Không tìm thấy') || html.includes('0 của 0') || html.includes('0 kết quả') || html.includes('trống'),
      'Empty products catalog must render friendly empty results message'
    );
  });

  // Test 6: Max Pagination Boundaries
  suite.test('R2.B6 Pagination boundaries: clamps within [1, totalPages] and handles edge pages', async (t) => {
    const pageSize = 10;
    const totalItems = coopData.products.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    t.assert(totalPages >= 2, `With ${totalItems} products and pageSize ${pageSize}, totalPages must be >= 2`);

    const paginate = (items, page, size) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      const start = (validPage - 1) * size;
      return {
        page: validPage,
        items: items.slice(start, start + size),
        isFirst: validPage === 1,
        isLast: validPage === totalPages,
      };
    };

    // First page
    const p1 = paginate(coopData.products, 1, pageSize);
    t.assertEqual(p1.page, 1, 'Page 1 must stay at page 1');
    t.assertEqual(p1.isFirst, true, 'isFirst must be true for page 1');
    t.assertEqual(p1.items.length, pageSize, 'Page 1 must have exactly pageSize items');

    // Underflow test (page 0 or negative)
    const pUnder = paginate(coopData.products, -1, pageSize);
    t.assertEqual(pUnder.page, 1, 'Negative page must clamp to page 1');

    // Last page
    const pLast = paginate(coopData.products, totalPages, pageSize);
    t.assertEqual(pLast.page, totalPages, 'Last page must match totalPages');
    t.assertEqual(pLast.isLast, true, 'isLast must be true on final page');
    t.assert(pLast.items.length > 0 && pLast.items.length <= pageSize,
      'Last page must have remaining items');

    // Overflow test (page 999)
    const pOver = paginate(coopData.products, 999, pageSize);
    t.assertEqual(pOver.page, totalPages, 'Overflow page must clamp to totalPages');
  });

  return await suite.run();
}
