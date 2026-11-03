import test from 'node:test';
import assert from 'node:assert/strict';
import { loadComponent, renderToHtml } from './e2e/test-helpers.js';

test('Promo & Advertisement Modal Suite', async (t) => {
  await t.test('1. PromoModal renders promotional title, discount voucher, and OCOP badge', async () => {
    const PromoModal = await loadComponent('components/PromoModal.jsx');
    const html = renderToHtml(PromoModal, {
      isOpen: true,
      onClose: () => {},
      onApplyVoucher: () => {},
      onExploreProducts: () => {},
    });

    assert.ok(html.includes('GIẢM 10%'), 'Must display 10% discount banner');
    assert.ok(html.includes('SOCOOP10'), 'Must display primary voucher code SOCOOP10');
    assert.ok(html.includes('FREESHIP'), 'Must display secondary freeship voucher code');
    assert.ok(html.includes('OCOP 4 SAO VĨNH LONG'), 'Must display OCOP certified badge');
    assert.ok(html.includes('ÁP DỤNG MÃ &amp; MUA NGAY') || html.includes('ÁP DỤNG MÃ'), 'Must render CTA purchase button');
    assert.ok(html.includes('Không hiển thị lại hôm nay'), 'Must offer option to not show again today');
  });

  await t.test('2. PromoModal returns empty markup when isOpen is false', async () => {
    const PromoModal = await loadComponent('components/PromoModal.jsx');
    const html = renderToHtml(PromoModal, {
      isOpen: false,
      onClose: () => {},
    });

    assert.strictEqual(html, '', 'PromoModal must render nothing when closed');
  });
});
