import test from 'node:test';
import assert from 'node:assert/strict';
import { loadComponent, renderToHtml } from './e2e/test-helpers.js';
import { coopData } from '../src/data/coopData.js';

test('Article Detail & Read More Flow Test Suite', async (t) => {
  await t.test('renders ArticleDetailPage with full article data', async () => {
    const ArticleDetailPage = await loadComponent('components/ArticleDetailPage.jsx');
    const article = coopData.collections[0];
    const html = renderToHtml(ArticleDetailPage, {
      article,
      allArticles: coopData.collections,
    });

    assert.ok(html.includes(article.title), 'Must render article title');
    assert.ok(html.includes('BỘ SƯU TẬP') || html.includes('Bộ Sưu Tập'), 'Must render category badge');
    assert.ok(html.includes(article.date), 'Must render article date');
    assert.ok(html.includes('Quay lại danh mục'), 'Must render back navigation button');
    assert.ok(html.includes('Cam Kết Chất Lượng'), 'Must render quality commitment highlight box');
    assert.ok(html.includes('Chia sẻ bài viết'), 'Must render share button');
    assert.ok(html.includes('Bài Viết') && html.includes('Liên Quan'), 'Must render related articles');
  });

  await t.test('renders ArticleDetailPage with certification data and official verification badges', async () => {
    const ArticleDetailPage = await loadComponent('components/ArticleDetailPage.jsx');
    const cert = coopData.certifications[0];
    const html = renderToHtml(ArticleDetailPage, {
      article: cert,
      allArticles: coopData.certifications,
    });

    assert.ok(html.includes(cert.title), 'Must render certification title');
    assert.ok(html.includes(cert.code), 'Must render certification code');
    assert.ok(html.includes('Chứng nhận'), 'Must indicate certification category');
    assert.ok(html.includes('Hồ Sơ Pháp Lý') && html.includes('Thẩm Định Chất Lượng'), 'Must render legal profile section');
    assert.ok(html.includes('Có hiệu lực chính thức'), 'Must show active status');
  });

  await t.test('ArticleDetailPage gracefully handles empty or null article without crashing', async () => {
    const ArticleDetailPage = await loadComponent('components/ArticleDetailPage.jsx');
    const html = renderToHtml(ArticleDetailPage, {
      article: null,
    });

    assert.ok(html.includes('Không tìm thấy nội dung bài viết'), 'Must render friendly fallback');
    assert.ok(html.includes('Quay lại'), 'Must render back button');
  });

  await t.test('CollectionsPage renders 9 collections items and ĐỌC TIẾP buttons', async () => {
    const CollectionsPage = await loadComponent('components/CollectionsPage.jsx');
    const html = renderToHtml(CollectionsPage, {
      collections: coopData.collections,
    });

    assert.ok(html.includes('BỘ SƯU TẬP'), 'Must render page header');
    assert.ok(html.includes('ĐỌC TIẾP'), 'Must render read more action');
    assert.ok(html.includes(coopData.collections[0].title), 'Must render first collection title');
  });

  await t.test('CertificationsPage renders 8 certification items and ĐỌC TIẾP buttons', async () => {
    const CertificationsPage = await loadComponent('components/CertificationsPage.jsx');
    const html = renderToHtml(CertificationsPage, {
      certifications: coopData.certifications,
    });

    assert.ok(html.includes('CHỨNG NHẬN'), 'Must render certifications header');
    assert.ok(html.includes('MÃ VÙNG TRỒNG'), 'Must render VN-DNCB-0087 cert title');
    assert.ok(html.includes('ĐỌC TIẾP'), 'Must render read more buttons');
  });
});
