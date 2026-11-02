import test from 'node:test';
import assert from 'node:assert/strict';
import { loadComponent, renderToHtml } from './e2e/test-helpers.js';
import { coopData } from '../src/data/coopData.js';

test('Modern Interactive Features Suite', async (t) => {
  await t.test('1. SearchModal renders search input, quick keywords, and category results', async () => {
    const SearchModal = await loadComponent('components/SearchModal.jsx');
    const html = renderToHtml(SearchModal, {
      isOpen: true,
      onClose: () => {},
      products: coopData.products,
      collections: coopData.collections,
      certifications: coopData.certifications,
      traceabilityBatches: coopData.traceabilityBatches,
    });

    assert.ok(html.includes('Tìm kiếm sản phẩm, bài viết, chứng nhận'), 'Must render spotlight search placeholder');
    assert.ok(html.includes('Dừa xiêm kim cương'), 'Must render popular search keywords');
    assert.ok(html.includes('Sản Phẩm'), 'Must render product section in search');
  });

  await t.test('2. WishlistDrawer renders favorite items and move all to cart', async () => {
    const WishlistDrawer = await loadComponent('components/WishlistDrawer.jsx');
    const sampleWishlist = [coopData.products[0], coopData.products[1]];
    const html = renderToHtml(WishlistDrawer, {
      isOpen: true,
      onClose: () => {},
      wishlist: sampleWishlist,
    });

    assert.ok(html.includes('Sản Phẩm Yêu Thích'), 'Must render wishlist drawer title');
    assert.ok(html.includes(sampleWishlist[0].name), 'Must render first favorited item');
    assert.ok(html.includes('Thêm Tất Cả Vào Giỏ Hàng'), 'Must render bulk move to cart action');
  });

  await t.test('3. ProductCompareModal renders side-by-side technical specs table', async () => {
    const ProductCompareModal = await loadComponent('components/ProductCompareModal.jsx');
    const sampleCompare = [coopData.products[0], coopData.products[1]];
    const html = renderToHtml(ProductCompareModal, {
      isOpen: true,
      onClose: () => {},
      compareList: sampleCompare,
    });

    assert.ok(html.includes('Bảng So Sánh Chi Tiết Sản Phẩm'), 'Must render compare modal title');
    assert.ok(html.includes('Độ ngọt tự nhiên (°Brix)') || html.includes('Brix'), 'Must compare natural sweetness brix');
    assert.ok(html.includes('Tiêu chuẩn chất lượng'), 'Must compare quality standards');
    assert.ok(html.includes('Công nghệ chế biến'), 'Must compare processing technology');
  });

  await t.test('4. B2BCalculator computes volume tiers, box counts, and export savings', async () => {
    const B2BCalculator = await loadComponent('components/B2BCalculator.jsx');
    const html = renderToHtml(B2BCalculator, {});

    assert.ok(html.includes('Bảng Tính Chiết Khấu Giá Sỉ &amp; Dự Toán Xuất Khẩu B2B') || html.includes('Bảng Tính Chiết Khấu'), 'Must render B2B calculator header');
    assert.ok(html.includes('Sản lượng dự kiến'), 'Must include volume input slider/label');
    assert.ok(html.includes('Đóng thùng') || html.includes('Thùng'), 'Must calculate carton box counts');
    assert.ok(html.includes('Tổng trọng lượng') || html.includes('Tấn'), 'Must estimate total tonnage');
  });

  await t.test('5. CartDrawer renders interactive voucher discount code input and tags', async () => {
    const CartDrawer = await loadComponent('components/CartDrawer.jsx');
    const cart = {
      P01: { product: coopData.products[0], quantity: 2 },
    };
    const html = renderToHtml(CartDrawer, {
      isOpen: true,
      onClose: () => {},
      cart,
    });

    assert.ok(html.includes('SOCOOP10'), 'Must render SOCOOP10 discount coupon');
    assert.ok(html.includes('FREESHIP'), 'Must render FREESHIP discount coupon');
    assert.ok(html.includes('Áp dụng'), 'Must render coupon apply button');
  });
});
