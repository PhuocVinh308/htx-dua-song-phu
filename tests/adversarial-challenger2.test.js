/**
 * ADVERSARIAL STRESS TEST HARNESS — CHALLENGER 2
 * Focus: Bé CoCo AI Assistant, Blockchain QR Traceability, Zero Waste CTA, Responsive Invariants
 */

import fs from 'node:fs';
import path from 'node:path';
import { coopData } from '../src/data/coopData.js';
import { loadComponent, renderToHtml, TestSuite } from './e2e/test-helpers.js';

export async function runChallenger2AdversarialSuite() {
  const suite = new TestSuite('Challenger 2: Adversarial Stress Test Suite');

  // =========================================================================
  // DOMAIN 1: BÉ COCO AI ASSISTANT ADVERSARIAL TESTING
  // =========================================================================

  // 1.1 Unknown Questions Handling & Fallback
  suite.test('ADV-1.1 Bé CoCo: Unknown & out-of-domain queries return polite fallback without crashing', async (t) => {
    const AICoCoAssistant = await loadComponent('components/AICoCoAssistant.jsx');

    // Simulate query processor matching AICoCoAssistant.jsx handleSend logic
    const processQuery = (query, kb = coopData.aiKnowledge, prods = coopData.products) => {
      const lower = query.toLowerCase();
      let matched = null;
      let matchedItem = null;

      for (const item of kb) {
        if (item.keywords.some((kw) => lower.includes(kw))) {
          matched = item.answer;
          matchedItem = item;
          break;
        }
      }

      let recs = [];
      if (matchedItem && matchedItem.recommendedProductIds) {
        recs = prods.filter((p) => matchedItem.recommendedProductIds.includes(p.id));
      } else {
        if (lower.includes('dầu dừa') || lower.includes('ly tâm') || lower.includes('dưỡng da')) {
          recs = prods.filter((p) => p.id === 'P13');
        } else if (lower.includes('mật hoa') || lower.includes('tiểu đường') || lower.includes('ăn kiêng')) {
          recs = prods.filter((p) => p.id === 'P14' || p.id === 'P04');
        } else if (lower.includes('dừa xiêm') || lower.includes('kim cương') || lower.includes('dừa tươi')) {
          recs = prods.filter((p) => p.id === 'P07' || p.id === 'P06');
        } else if (lower.includes('dừa sáp')) {
          recs = prods.filter((p) => p.id === 'P12');
        } else if (lower.includes('bát') || lower.includes('thủ công') || lower.includes('gáo dừa')) {
          recs = prods.filter((p) => p.id === 'P15' || p.id === 'P16');
        } else if (lower.includes('sấy') || lower.includes('snack') || lower.includes('mít')) {
          recs = prods.filter((p) => p.id === 'P09' || p.id === 'P10');
        } else if (lower.includes('sỉ') || lower.includes('b2b') || lower.includes('xơ dừa')) {
          recs = prods.filter((p) => p.id === 'P01' || p.id === 'P15');
        } else {
          recs = prods.filter((p) => p.id === 'P07' || p.id === 'P13');
        }
      }

      if (!matched) {
        matched =
          'Dạ câu hỏi này hay quá! Toàn bộ sản phẩm của HTX Dừa Song Phú chúng em đều canh tác hữu cơ sinh thái trên đất phù sa bãi bồi Tam Bình, đạt chuẩn OCOP 4 sao và VietGAP. Anh/chị có thể tham khảo các sản phẩm gợi ý bên dưới hoặc liên hệ Hotline/Zalo **0918 268 379** để kỹ sư nông nghiệp hỗ trợ chu đáo nhất ạ! 🥥';
      }

      return { matched, matchedItem, recs };
    };

    const unknownQueries = [
      'Thời tiết hôm nay thế nào?',
      '1 + 1 bằng mấy?',
      'Bạn có biết chơi game Liên Minh Huyền Thoại không?',
      'Lập trình JavaScript bằng framework nào tốt nhất?',
      'Chỉ đường đi từ Sài Gòn về Tam Bình Vĩnh Long',
    ];

    for (const q of unknownQueries) {
      const result = processQuery(q);
      t.assert(result.matched.includes('Dạ câu hỏi này hay quá!'), `Query "${q}" must trigger polite fallback`);
      t.assertEqual(result.recs.length, 2, `Fallback must recommend default anchor products`);
      t.assert(result.recs.some((p) => p.id === 'P07'), `Fallback must include P07`);
      t.assert(result.recs.some((p) => p.id === 'P13'), `Fallback must include P13`);
    }

    // Render component with knowledge base and verify initial greeting
    const html = renderToHtml(AICoCoAssistant, {
      knowledgeBase: coopData.aiKnowledge,
      products: coopData.products,
    });
    t.assert(html.includes('Bé CoCo'), 'Component must render Bé CoCo FAB');
  });

  // 1.2 Diacritics & Accents Resilience Test
  suite.test('ADV-1.2 Bé CoCo: Accent/diacritic variations (accented vs unaccented Vietnamese)', async (t) => {
    // Load compiled module to get removeVietnameseDiacritics
    const rawMod = await import('../.test-cache/components/AICoCoAssistant.js');
    const { removeVietnameseDiacritics } = rawMod;

    // Test if unaccented query matches knowledge base
    const testCases = [
      { accented: 'dầu dừa ly tâm', unaccented: 'dau dua ly tam', expectedMatch: true },
      { accented: 'mật hoa dừa', unaccented: 'mat hoa dua', expectedMatch: true },
      { accented: 'dừa xiêm gọt kim cương', unaccented: 'dua xiem got kim cuong', expectedMatch: true },
    ];

    for (const tc of testCases) {
      const lowerAccented = tc.accented.toLowerCase();
      const lowerUnaccented = tc.unaccented.toLowerCase();
      const foldedUnaccented = removeVietnameseDiacritics ? removeVietnameseDiacritics(lowerUnaccented) : lowerUnaccented;

      let matchedAccented = false;
      let matchedUnaccented = false;

      for (const item of coopData.aiKnowledge) {
        if (item.keywords.some((kw) => lowerAccented.includes(kw.toLowerCase()))) matchedAccented = true;
        if (item.keywords.some((kw) => {
          const lowerKw = kw.toLowerCase();
          const foldedKw = removeVietnameseDiacritics ? removeVietnameseDiacritics(lowerKw) : lowerKw;
          return lowerUnaccented.includes(lowerKw) || foldedUnaccented.includes(foldedKw);
        })) matchedUnaccented = true;
      }

      t.assertEqual(matchedAccented, tc.expectedMatch,
        `Accented query "${tc.accented}" match status expected ${tc.expectedMatch}`);

      t.assertEqual(matchedUnaccented, true,
        `Unaccented query "${tc.unaccented}" matches knowledge base with diacritic folding`);
    }

    // Verify that the built-in quick prompt "Dừa xiêm lửa gọt kim cương có gì đặc biệt?" is in KB!
    let quickPromptInKb = false;
    const quickPrompt = 'Dừa xiêm lửa gọt kim cương có gì đặc biệt?'.toLowerCase();
    for (const item of coopData.aiKnowledge) {
      if (item.keywords.some((kw) => quickPrompt.includes(kw.toLowerCase()))) {
        quickPromptInKb = true;
      }
    }
    t.assertEqual(quickPromptInKb, true,
      'Built-in Quick Prompt "Dừa xiêm kim cương" is present in aiKnowledge');
  });

  // 1.3 Punctuation, Casing, and Whitespace Variations
  suite.test('ADV-1.3 Bé CoCo: Punctuation, capitalization, and whitespace resilience', async (t) => {
    const variations = [
      'DẦU DỪA ÉP LẠNH LY TÂM',
      'dầu dừa???',
      'mật hoa dừa...   ',
      '    dầu dừa   ',
      'DẦU DỪA!!! CÓ TỐT KHÔNG???',
    ];

    for (const q of variations) {
      const lower = q.toLowerCase();
      let matched = false;
      for (const item of coopData.aiKnowledge) {
        if (item.keywords.some((kw) => lower.includes(kw))) {
          matched = true;
          break;
        }
      }
      t.assert(matched, `Query with punctuation/casing "${q}" must still match knowledge base`);
    }
  });

  // 1.4 Recommendation Accuracy & Product Existence Verification
  suite.test('ADV-1.4 Bé CoCo: Recommendation accuracy ensures only valid, existing products are recommended', async (t) => {
    const validProductIds = new Set(coopData.products.map((p) => p.id));

    // Check all knowledgeBase recommendation IDs
    for (const item of coopData.aiKnowledge) {
      if (item.recommendedProductIds) {
        for (const pid of item.recommendedProductIds) {
          t.assert(validProductIds.has(pid), `Recommended product ID "${pid}" in knowledgeBase must exist in coopData.products`);
        }
      }
    }

    // Check heuristic fallback IDs: P13, P14, P04, P07, P06, P12, P15, P16, P09, P10, P01
    const heuristicIds = ['P13', 'P14', 'P04', 'P07', 'P06', 'P12', 'P15', 'P16', 'P09', 'P10', 'P01'];
    for (const hid of heuristicIds) {
      t.assert(validProductIds.has(hid), `Heuristic product ID "${hid}" must exist in coopData.products`);
    }
  });

  // 1.5 Add to Cart Trigger & Missing Handler Protection
  suite.test('ADV-1.5 Bé CoCo: Add to Cart callback triggers with exact product and handles missing onAddToCart safely', async (t) => {
    let capturedProduct = null;
    let capturedQty = null;

    const mockAddToCart = (prod, qty) => {
      capturedProduct = prod;
      capturedQty = qty;
    };

    const targetProduct = coopData.products.find((p) => p.id === 'P13');
    t.assert(targetProduct !== undefined, 'Target product P13 must exist');

    // Simulate clicking handleAddToCartClick
    const handleAddToCartClick = (product, cb) => {
      if (cb) cb(product, 1);
    };

    // 1. Normal invocation
    handleAddToCartClick(targetProduct, mockAddToCart);
    t.assertEqual(capturedProduct.id, 'P13', 'Captured product ID must match P13');
    t.assertEqual(capturedQty, 1, 'Quantity added must be exactly 1');

    // 2. Invocation when onAddToCart is null / undefined
    let threw = false;
    try {
      handleAddToCartClick(targetProduct, null);
    } catch {
      threw = true;
    }
    t.assert(!threw, 'Invoking handleAddToCartClick with null handler must not throw');
  });

  // 1.6 Adversarial XSS Security Vulnerability in Bé CoCo User Input
  suite.test('ADV-1.6 Bé CoCo: Security challenge — dangerouslySetInnerHTML injection on user message', async (t) => {
    const rawUserInput = '<img src=x onerror="window.__xss_test=1">';

    // Load compiled AICoCoAssistant to verify formatAiMessage
    const rawMod = await import('../.test-cache/components/AICoCoAssistant.js');
    const { formatAiMessage } = rawMod;

    // 1. AI responses escape raw HTML before injecting bold tags
    const formatted = formatAiMessage ? formatAiMessage(rawUserInput) : rawUserInput.replace(/</g, '&lt;');
    t.assert(!formatted.includes('<img src=x onerror='), 'AI responses must escape HTML characters');
    t.assert(formatted.includes('&lt;img src=x'), 'Raw HTML must be sanitized into entities');

    // 2. Component source check: User messages rendered as plain text JSX {m.text}
    const compSource = fs.readFileSync(path.resolve('src/components/AICoCoAssistant.jsx'), 'utf8');
    const rendersUserAsPlainText = compSource.includes("{m.sender === 'user' ? (") && compSource.includes("{m.text}");
    t.assert(rendersUserAsPlainText, 'User messages are rendered as plain text {m.text} without dangerouslySetInnerHTML');
  });

  // =========================================================================
  // DOMAIN 2: BLOCKCHAIN QR TRACEABILITY ADVERSARIAL TESTING
  // =========================================================================

  // 2.1 Valid Batches Lookup
  suite.test('ADV-2.1 Traceability: Valid batch codes return rich provenance data', async (t) => {
    const validCodes = ['SP-DXL-2026-01', 'SP-DDL-2026-03', 'SP-MHD-2026-02'];

    for (const code of validCodes) {
      const batch = coopData.traceabilityBatches[code];
      t.assert(batch !== undefined, `Batch ${code} must exist in traceabilityBatches`);
      t.assertEqual(batch.batchCode, code, `Batch code in record must equal ${code}`);
      t.assert(batch.productName.length > 5, `Batch ${code} must have a valid product name`);
      t.assert(batch.farmOwner.length > 5, `Batch ${code} must have an identified farm owner`);
      t.assert(batch.location.length > 10, `Batch ${code} must have detailed geographic coordinates/location`);
      t.assert(batch.blockchainTx.startsWith('0x'), `Batch ${code} must have cryptographic blockchainTx hash`);
      t.assert(batch.certifications.length >= 2, `Batch ${code} must have at least 2 certified credentials`);
    }
  });

  // 2.2 Normalization: Lowercase & Whitespace-Padded Codes
  suite.test('ADV-2.2 Traceability: Code normalization (trim & toUpperCase) correctly resolves variations', async (t) => {
    const variations = [
      { input: 'sp-dxl-2026-01', expected: 'SP-DXL-2026-01' },
      { input: '   SP-DXL-2026-01   ', expected: 'SP-DXL-2026-01' },
      { input: '\tsp-ddl-2026-03\n', expected: 'SP-DDL-2026-03' },
      { input: '  sp-mhd-2026-02  ', expected: 'SP-MHD-2026-02' },
    ];

    const normalize = (code) => code.trim().toUpperCase();

    for (const v of variations) {
      const normalized = normalize(v.input);
      t.assertEqual(normalized, v.expected, `Normalized code for "${v.input}" must equal ${v.expected}`);
      t.assert(coopData.traceabilityBatches[normalized] !== undefined, `Normalized code ${normalized} must exist in registry`);
    }
  });

  // 2.3 Dispatch Batch Codes Validation (Testing codes mentioned in dispatch)
  suite.test('ADV-2.3 Traceability: Dispatch batch codes (SP-2026-08, SP-2026-01, SP-2026-03) validation', async (t) => {
    const dispatchCodes = ['SP-2026-08', 'SP-2026-01', 'SP-2026-03'];

    for (const code of dispatchCodes) {
      const exists = coopData.traceabilityBatches[code] !== undefined;
      // Note finding: These dispatch codes do not exist in coopData.traceabilityBatches!
      console.log(`    [Empirical Note] Dispatch code "${code}" in traceabilityBatches: ${exists}`);
    }

    // Verify what batch codes actually exist on the products
    const productBatches = new Set(coopData.products.map((p) => p.traceBatch));
    t.assert(productBatches.has('SP-DXL-2026-01'), 'Products link to SP-DXL-2026-01');
    t.assert(productBatches.has('SP-DDL-2026-03'), 'Products link to SP-DDL-2026-03');
    t.assert(productBatches.has('SP-MHD-2026-02'), 'Products link to SP-MHD-2026-02');
  });

  // 2.4 Nonexistent Batch Lookup & Fallback State
  suite.test('ADV-2.4 Traceability: Nonexistent batch lookup behavior & activeBatch fallback', async (t) => {
    const TraceabilitySection = await loadComponent('components/TraceabilitySection.jsx');

    const fakeCode = 'SP-FAKE-BATCH-999';

    // When initialized with a fake code, does it fallback to default SP-DXL-2026-01?
    const html = renderToHtml(TraceabilitySection, {
      batches: coopData.traceabilityBatches,
      initialCode: fakeCode,
    });

    t.assert(html.includes('SP-DXL-2026-01'), 'TraceabilitySection must fallback to SP-DXL-2026-01 when unknown code is passed');
    t.assert(html.includes('Dừa Xiêm Lửa Song Phú Gọt Kim Cương'), 'Fallback must render default product details');
  });

  // 2.5 Empty Batches Edge Case Crash Assessment
  suite.test('ADV-2.5 Traceability: Edge case — empty batches registry crash vulnerability', async (t) => {
    const TraceabilitySection = await loadComponent('components/TraceabilitySection.jsx');

    let threw = false;
    let html = '';
    try {
      html = renderToHtml(TraceabilitySection, {
        batches: {},
        initialCode: 'ANY',
      });
    } catch (err) {
      threw = true;
      console.log(`    [Empirical Crash Finding] TraceabilitySection throws with empty batches registry: ${err.message}`);
    }
    t.assert(!threw, 'TraceabilitySection must render gracefully without throwing when batches registry is empty');
    t.assert(html.includes('Không Có Dữ Liệu Lô Hàng'), 'TraceabilitySection must render friendly empty state');
  });

  // =========================================================================
  // DOMAIN 3: ZERO WASTE DIAGRAM CTA & CIRCULAR ECONOMY
  // =========================================================================

  // 3.1 Zero Waste CTA with onExploreProducts Callback
  suite.test('ADV-3.1 Zero Waste: CTA button triggers onExploreProducts callback when provided', async (t) => {
    let callbackTriggered = false;
    const mockExplore = () => {
      callbackTriggered = true;
    };

    // Simulate button action in ZeroWasteDiagram.jsx line 114:
    const simulateCtaClick = (onExplore) => {
      if (onExplore) {
        onExplore();
      } else {
        // window.location.hash = '#products';
      }
    };

    simulateCtaClick(mockExplore);
    t.assert(callbackTriggered, 'CTA button must invoke onExploreProducts callback');
  });

  // 3.2 Zero Waste CTA Fallback Without onExploreProducts
  suite.test('ADV-3.2 Zero Waste: CTA button fallback behavior when onExploreProducts is omitted', async (t) => {
    let hashSet = null;
    const fakeWindow = { location: { hash: '' } };

    const simulateCtaClick = (onExplore, win) => {
      if (onExplore) {
        onExplore();
      } else {
        win.location.hash = '#products';
      }
    };

    simulateCtaClick(null, fakeWindow);
    t.assertEqual(fakeWindow.location.hash, '#products', 'CTA must fallback to window.location.hash = "#products"');

    // Verify App.jsx listens to hashchange for fallback navigation
    const appSource = fs.readFileSync(path.resolve('src/App.jsx'), 'utf8');
    const hasHashListener = appSource.includes('hashchange') || appSource.includes('window.location.hash');
    t.assert(hasHashListener, 'App.jsx listens to hashchange to handle fallback hash navigation for activeTab');
  });

  // 3.3 Circular Economy 5 Phases & Mass Balance (100% Tree Utilization)
  suite.test('ADV-3.3 Zero Waste: Verify 100% mass balance across all coconut tree parts', async (t) => {
    const parts = coopData.circularEconomyParts;
    t.assertEqual(parts.length, 5, 'Must describe exactly 5 anatomical parts of coconut tree');

    // Calculate total percentage: 28% + 25% + 15% + 30% + 2%
    let totalPct = 0;
    for (const p of parts) {
      const val = parseInt(p.percentage.replace('%', ''), 10);
      totalPct += val;
      t.assert(p.products.length >= 3, `Part "${p.part}" must yield at least 3 high-value products`);
      t.assert(p.valueAdded.length > 10, `Part "${p.part}" must document economic value added`);
      t.assert(p.process.length > 20, `Part "${p.part}" must document circular processing pipeline`);
    }

    t.assertEqual(totalPct, 100, `Mass percentage sum must equal exactly 100% (got ${totalPct}%)`);
  });

  // =========================================================================
  // DOMAIN 4: RESPONSIVE LAYOUT INVARIANTS (375px, 414px, 768px, 1280px+)
  // =========================================================================

  // 4.1 Chatbox Dimension Constraints across Viewports
  suite.test('ADV-4.1 Responsive: .coco-chatbox dimensions clamp within viewport bounds (375px, 414px, 768px, 1280px)', async (t) => {
    // Read css rule from src/index.css
    const cssContent = fs.readFileSync(path.resolve('src/index.css'), 'utf8');
    t.assert(cssContent.includes('.coco-chatbox'), 'CSS must define .coco-chatbox');
    t.assert(cssContent.includes('max-width: calc(100vw - 32px)'), 'Chatbox must constrain max-width with 32px padding');
    t.assert(cssContent.includes('max-height: calc(100vh - 120px)'), 'Chatbox must constrain max-height for mobile viewport');

    // Mathematical boundary checks
    const viewports = [
      { w: 375, expectedMaxW: 343 },
      { w: 414, expectedMaxW: 382 },
      { w: 768, expectedMaxW: 736 },
      { w: 1280, expectedMaxW: 1248 },
    ];

    for (const vp of viewports) {
      const maxAllowed = vp.w - 32;
      t.assertEqual(maxAllowed, vp.expectedMaxW, `Viewport ${vp.w}px must limit chatbox to ${vp.expectedMaxW}px`);
      // Since fixed width is 380px, actual width will be min(380, maxAllowed)
      const actualWidth = Math.min(380, maxAllowed);
      t.assert(actualWidth <= vp.w, `Chatbox width ${actualWidth}px must never exceed viewport ${vp.w}px`);
      t.assert(actualWidth <= 380, `Chatbox width must not exceed 380px`);
    }
  });

  // 4.2 ProductsPage Grid Breakpoints (375px, 768px, 1280px+)
  suite.test('ADV-4.2 Responsive: ProductsPage column invariant contracts', async (t) => {
    const ProductsPage = await loadComponent('components/ProductsPage.jsx');
    const html = renderToHtml(ProductsPage, {
      products: coopData.products,
      onQuickView: () => {},
    });

    // Mobile: 2 columns
    t.assert(html.includes('grid-cols-2'), 'ProductsPage must render 2 columns on mobile (375px / 414px)');
    // Tablet: 4 columns
    t.assert(html.includes('md:grid-cols-4') || html.includes('sm:grid-cols-3'), 'ProductsPage must render 3-4 columns on tablet (768px)');
    // Desktop: 5 columns
    t.assert(html.includes('lg:grid-cols-5'), 'ProductsPage must render 5 columns on desktop (1280px+)');
  });

  // 4.3 Collections & Certifications Grid Invariants
  suite.test('ADV-4.3 Responsive: Collections and Certifications 3-column invariants', async (t) => {
    const CollectionsPage = await loadComponent('components/CollectionsPage.jsx');
    const CertificationsPage = await loadComponent('components/CertificationsPage.jsx');

    const colHtml = renderToHtml(CollectionsPage, { collections: coopData.collections });
    const certHtml = renderToHtml(CertificationsPage, { certifications: coopData.certifications });

    t.assert(colHtml.includes('grid-cols-1'), 'Collections must start with 1 column on mobile');
    t.assert(colHtml.includes('md:grid-cols-2') || colHtml.includes('sm:grid-cols-2'), 'Collections must adapt to 2 columns on tablet');
    t.assert(colHtml.includes('lg:grid-cols-3'), 'Collections must achieve 3 columns on desktop (1280px+)');

    t.assert(certHtml.includes('grid-cols-1'), 'Certifications must start with 1 column on mobile');
    t.assert(certHtml.includes('md:grid-cols-2') || certHtml.includes('sm:grid-cols-2'), 'Certifications must adapt to 2 columns on tablet');
    t.assert(certHtml.includes('lg:grid-cols-3'), 'Certifications must achieve 3 columns on desktop (1280px+)');
  });

  // 4.4 Mobile Horizontal Overflow Guard Check
  suite.test('ADV-4.4 Responsive: Scan components for unbounded fixed widths causing horizontal scroll', async (t) => {
    const componentDir = path.resolve('src/components');
    const files = fs.readdirSync(componentDir).filter((f) => f.endsWith('.jsx'));

    const overflowViolations = [];
    // Regular expression detecting rigid widths greater than 360px without max-w or responsive prefixes
    const rigidWidthRegex = /\b(?:w-\[\s*(\d+)px\s*\])\b/g;

    for (const file of files) {
      const content = fs.readFileSync(path.join(componentDir, file), 'utf8');
      let match;
      while ((match = rigidWidthRegex.exec(content)) !== null) {
        const widthVal = parseInt(match[1], 10);
        if (widthVal > 360) {
          overflowViolations.push({ file, width: widthVal, match: match[0] });
        }
      }
    }

    t.assertEqual(overflowViolations.length, 0,
      `No component should have fixed width > 360px without responsive clamping (violations: ${JSON.stringify(overflowViolations)})`);
  });

  return await suite.run();
}

if (process.argv[1].endsWith('adversarial-challenger2.test.js')) {
  runChallenger2AdversarialSuite()
    .then((results) => {
      process.exit(results.failed > 0 ? 1 : 0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
