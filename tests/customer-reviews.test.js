import test from 'node:test';
import assert from 'node:assert/strict';
import { loadComponent, renderToHtml } from './e2e/test-helpers.js';
import { coopData } from '../src/data/coopData.js';

test('Customer Reviews & Ratings System Test Suite', async (t) => {
  await t.test('1. ProductCard displays star rating and review count', async () => {
    const ProductCard = await loadComponent('components/ProductCard.jsx');
    const sampleProduct = coopData.products[0];
    const html = renderToHtml(ProductCard, { product: sampleProduct });

    assert.ok(html.includes('đánh giá') || html.includes('nhận xét'), 'ProductCard must display reviews indicator');
    assert.ok(html.includes(String(sampleProduct.rating || '4.9')), 'ProductCard must display numerical rating');
  });

  await t.test('2. ProductModal displays clickable rating and reviews preview', async () => {
    const ProductModal = await loadComponent('components/ProductModal.jsx');
    const sampleProduct = coopData.products[0];
    const html = renderToHtml(ProductModal, { product: sampleProduct, onViewDetail: () => {} });

    assert.ok(html.includes('Nhận xét khách hàng'), 'ProductModal must have reviews preview');
    assert.ok(html.includes('Xem tất cả') && html.includes('đánh giá'), 'ProductModal must have link to full reviews');
  });

  await t.test('3. ProductDetailPage renders rating summary, breakdown bars, and review list', async () => {
    const ProductDetailPage = await loadComponent('components/ProductDetailPage.jsx');
    const sampleProduct = coopData.products[0];
    const html = renderToHtml(ProductDetailPage, { 
      product: sampleProduct, 
      allProducts: coopData.products,
      initialTab: 'reviews'
    });

    assert.ok(html.includes('trên 5 sao'), 'ProductDetailPage must render rating score out of 5');
    assert.ok(html.includes('100% Khách hàng hài lòng') || html.includes('hài lòng'), 'Must show satisfaction metric');
    assert.ok(html.includes('5 sao') && html.includes('4 sao'), 'Must show star breakdown');
    assert.ok(html.includes('Viết đánh giá của bạn'), 'Must render write review action button');
    assert.ok(html.includes('Đã mua hàng tại HTX'), 'Must display verified purchase badges');
  });
});
