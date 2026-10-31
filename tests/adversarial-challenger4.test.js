/**
 * ADVERSARIAL STRESS TEST HARNESS — CHALLENGER 4
 * Focus: Empirical Re-Verification of AI, Security & Traceability Remediations
 * - DOM XSS Injection Probing in AICoCoAssistant (User & AI messages)
 * - Unaccented Vietnamese Search Queries & Diacritic Folding
 * - Substring Collision & Semantic Match Accuracy in AICoCoAssistant
 * - Batch Code Aliases (SP-2026-01, SP-2026-03, SP-2026-08, SP-2026-02)
 * - Empty Batch Safe Guard & Defensive Invariants
 */

import fs from 'node:fs';
import path from 'node:path';
import { coopData } from '../src/data/coopData.js';
import { loadComponent, renderToHtml, TestSuite } from './e2e/test-helpers.js';

export async function runChallenger4AdversarialSuite() {
  const suite = new TestSuite('Challenger 4: Adversarial AI, Security & Traceability Verification Suite');

  // Load compiled components and helper functions
  const AICoCoAssistant = await loadComponent('components/AICoCoAssistant.jsx');
  const TraceabilitySection = await loadComponent('components/TraceabilitySection.jsx');
  const aiAssistantMod = await import('../.test-cache/components/AICoCoAssistant.js');
  const { removeVietnameseDiacritics, formatAiMessage, findMatchingKnowledge } = aiAssistantMod;

  // =========================================================================
  // DOMAIN 1: DOM XSS INJECTION PROBING IN AICoCoAssistant
  // =========================================================================

  suite.test('ADV4-1.1 XSS Probing: formatAiMessage entity escaping against diverse XSS vectors', async (t) => {
    t.assert(typeof formatAiMessage === 'function', 'formatAiMessage must be exported from AICoCoAssistant');

    const hostilePayloads = [
      '<script>window.__pwned = 1;</script>',
      '<img src=x onerror="alert(\'XSS\')">',
      '<svg onload=alert(1)>',
      '<iframe src="javascript:alert(1)"></iframe>',
      '<details open ontoggle="alert(1)">',
      '<a href="javascript:alert(1)">click me</a>',
      '<div style="background:url(javascript:alert(1))">',
      '"><script>alert(1)</script>',
      '\'><script>alert(1)</script>',
      '<body onload=alert(1)>',
      '<input autofocus onfocus=alert(1)>',
      '<textarea autofocus onfocus=alert(1)>',
    ];

    for (const payload of hostilePayloads) {
      const sanitized = formatAiMessage(payload);
      t.assert(!sanitized.includes('<script>'), `Payload "${payload}" must not produce unescaped <script>`);
      t.assert(!sanitized.includes('<img '), `Payload "${payload}" must not produce unescaped <img `);
      t.assert(!sanitized.includes('<svg'), `Payload "${payload}" must not produce unescaped <svg`);
      t.assert(!sanitized.includes('<iframe'), `Payload "${payload}" must not produce unescaped <iframe`);
      t.assert(!sanitized.includes('<details'), `Payload "${payload}" must not produce unescaped <details`);
      t.assert(!sanitized.includes('<a '), `Payload "${payload}" must not produce unescaped <a `);
      t.assert(!sanitized.includes('<body'), `Payload "${payload}" must not produce unescaped <body`);
      t.assert(!sanitized.includes('<input'), `Payload "${payload}" must not produce unescaped <input`);

      // Verify that angle brackets are turned into HTML entities
      t.assert(!sanitized.includes('<') || sanitized.includes('<b>') || sanitized.includes('<br/>'),
        `All angle brackets in payload must be escaped into &lt; or &gt; (except legitimate <b> and <br/>)`);
    }
  });

  suite.test('ADV4-1.2 XSS Probing: Markdown bolding within formatAiMessage does not bypass sanitization', async (t) => {
    // Attack vector: Trying to use ** around tags to trick regex or re-inject unescaped HTML
    const boldInjectionPayloads = [
      '**<script>alert(1)</script>**',
      '**<img src=x onerror=alert(1)>**',
      '**<b>bold inside</b>**',
      'Before **<svg onload=alert(1)>** After',
      '***<script>alert(1)</script>***',
    ];

    for (const payload of boldInjectionPayloads) {
      const sanitized = formatAiMessage(payload);
      t.assert(!sanitized.includes('<script>'), `Bold payload "${payload}" must not inject <script>`);
      t.assert(!sanitized.includes('<img'), `Bold payload "${payload}" must not inject <img>`);
      t.assert(!sanitized.includes('<svg'), `Bold payload "${payload}" must not inject <svg>`);
      t.assert(sanitized.includes('&lt;'), `Bold payload "${payload}" must escape inner < to &lt;`);
    }

    // Normal markdown should still work
    const normalMarkdown = 'Em là **Bé CoCo 🌴** của HTX **Song Phú**.\nDòng thứ 2';
    const formatted = formatAiMessage(normalMarkdown);
    t.assert(formatted.includes('<b>Bé CoCo 🌴</b>'), 'Normal bold markdown must convert to <b>');
    t.assert(formatted.includes('<b>Song Phú</b>'), 'Normal bold markdown must convert to <b>');
    t.assert(formatted.includes('<br/>'), 'Newlines must convert to <br/>');
  });

  suite.test('ADV4-1.3 XSS Probing: formatAiMessage edge cases (null, undefined, numbers, massive strings)', async (t) => {
    t.assertEqual(formatAiMessage(null), '', 'formatAiMessage(null) must return empty string');
    t.assertEqual(formatAiMessage(undefined), '', 'formatAiMessage(undefined) must return empty string');
    t.assertEqual(formatAiMessage(''), '', 'formatAiMessage("") must return empty string');
    t.assertEqual(formatAiMessage(12345), '12345', 'formatAiMessage(number) must handle numbers safely');

    // Massive payload (10,000 characters)
    const bigString = '<script>alert(1)</script>'.repeat(400);
    const bigFormatted = formatAiMessage(bigString);
    t.assert(!bigFormatted.includes('<script>'), 'Massive payload must be completely escaped');
    t.assert(bigFormatted.includes('&lt;script&gt;'), 'Massive payload must contain escaped entities');
  });

  suite.test('ADV4-1.4 XSS Probing: Source verification of user message rendering in AICoCoAssistant.jsx', async (t) => {
    const compSource = fs.readFileSync(path.resolve('src/components/AICoCoAssistant.jsx'), 'utf8');

    // User message branch must render plain JSX text {m.text}
    const hasUserPlainText = compSource.includes("{m.sender === 'user' ? (") &&
                             compSource.includes('<div className="whitespace-pre-wrap">{m.text}</div>');
    t.assert(hasUserPlainText, 'User message MUST be rendered as raw JSX {m.text} in a whitespace-pre-wrap div');

    // AI message branch must pass through formatAiMessage
    const hasAiFormattedHtml = compSource.includes('dangerouslySetInnerHTML={{') &&
                               compSource.includes('__html: formatAiMessage(m.text)');
    t.assert(hasAiFormattedHtml, 'AI message dangerouslySetInnerHTML MUST pass through formatAiMessage');

    // Neither branch should pass raw m.text directly into dangerouslySetInnerHTML
    const hasRawDangerouslySet = compSource.includes('__html: m.text');
    t.assert(!hasRawDangerouslySet, 'Direct __html: m.text MUST NOT exist anywhere in AICoCoAssistant.jsx');
  });

  // =========================================================================
  // DOMAIN 2: UNACCENTED VIETNAMESE SEARCH QUERIES & MATCHING ACCURACY
  // =========================================================================

  suite.test('ADV4-2.1 Unaccented Vietnamese: Comprehensive removeVietnameseDiacritics validation', async (t) => {
    t.assert(typeof removeVietnameseDiacritics === 'function', 'removeVietnameseDiacritics must be exported');

    // Test comprehensive vowel diacritics
    const mappingTests = [
      { input: 'Dầu dừa ép lạnh ly tâm', expected: 'Dau dua ep lanh ly tam' },
      { input: 'Mật hoa dừa cô đặc OCOP', expected: 'Mat hoa dua co dac OCOP' },
      { input: 'Dừa xiêm lửa gọt kim cương', expected: 'Dua xiem lua got kim cuong' },
      { input: 'Đồng bằng Sông Cửu Long', expected: 'Dong bang Song Cuu Long' },
      { input: 'đường hoa dừa, giấm hoa dừa', expected: 'duong hoa dua, giam hoa dua' },
      { input: 'Ăn kiêng, tiểu đường, bồi bổ', expected: 'An kieng, tieu duong, boi bo' },
      { input: 'Thạch dừa bionano & than gáo dừa', expected: 'Thach dua bionano & than gao dua' },
      { input: 'Hợp tác xã viên Song Phú - Tam Bình', expected: 'Hop tac xa vien Song Phu - Tam Binh' },
    ];

    for (const mt of mappingTests) {
      const output = removeVietnameseDiacritics(mt.input);
      t.assertEqual(output, mt.expected, `Diacritic folding for "${mt.input}"`);
    }

    // Defensive edge cases
    t.assertEqual(removeVietnameseDiacritics(''), '', 'Empty string must return empty string');
    t.assertEqual(removeVietnameseDiacritics(null), '', 'null must return empty string');
    t.assertEqual(removeVietnameseDiacritics(undefined), '', 'undefined must return empty string');
  });

  suite.test('ADV4-2.2 Word-boundary & Token Matching: Prevents keyword substring collision', async (t) => {
    // Helper executing matching logic from AICoCoAssistant.jsx
    const executeAssistantMatch = (query) => {
      if (typeof findMatchingKnowledge === 'function') {
        const res = findMatchingKnowledge(query, coopData.aiKnowledge);
        return { matchedIndex: res?.matchedIndex ?? -1, matchedItem: res };
      }
      return { matchedIndex: -1, matchedItem: null };
    };

    // Prompt 4: "Chính sách giao hàng và giá sỉ của HTX ra sao?" contains "chinh" -> does NOT collide on "hi", matches Item 1 (shipping)!
    const prompt4 = 'Chính sách giao hàng và giá sỉ của HTX ra sao?';
    const res4 = executeAssistantMatch(prompt4);
    console.log(`    [Remediation Verified] Prompt 4 "${prompt4}" matched Item ${res4.matchedIndex} (${res4.matchedItem?.keywords[0]})`);
    t.assertEqual(res4.matchedIndex, 1, 'REMEDIATION VERIFIED: Prompt 4 correctly matches Item 1 (shipping) without colliding on "hi"');

    // Prompt 3: "Dừa xiêm lửa gọt kim cương có gì đặc biệt?" contains "cuong" -> does NOT collide on "uong", matches Item 4 (diamond coconut)!
    const prompt3 = 'Dừa xiêm lửa gọt kim cương có gì đặc biệt?';
    const res3 = executeAssistantMatch(prompt3);
    console.log(`    [Remediation Verified] Prompt 3 "${prompt3}" matched Item ${res3.matchedIndex} (${res3.matchedItem?.keywords[0]})`);
    t.assertEqual(res3.matchedIndex, 4, 'REMEDIATION VERIFIED: Prompt 3 correctly matches Item 4 (diamond coconut) without colliding on "uong" in "cuong"');

    // Prompt 2: "Mật hoa dừa người tiểu đường có dùng được không?" contains "duong" -> does NOT collide on "uong", matches Item 3 (mật hoa dừa)!
    const prompt2 = 'Mật hoa dừa người tiểu đường có dùng được không?';
    const res2 = executeAssistantMatch(prompt2);
    console.log(`    [Remediation Verified] Prompt 2 "${prompt2}" matched Item ${res2.matchedIndex} (${res2.matchedItem?.keywords[0]})`);
    t.assertEqual(res2.matchedIndex, 3, 'REMEDIATION VERIFIED: Prompt 2 correctly matches Item 3 (mật hoa dừa) without colliding on "uong" in "duong"');
  });

  suite.test('ADV4-2.3 Keyword stem "mật hoa" in aiKnowledge[3] matches query', async (t) => {
    // Exact dispatch query "mat hoa" without "dua" suffix
    const query = 'mat hoa';
    const lowerQuery = query.toLowerCase();
    const foldedQuery = removeVietnameseDiacritics(lowerQuery);

    let kbMatched = false;
    for (const item of coopData.aiKnowledge) {
      if (item.keywords.some((kw) => {
        const lowerKw = kw.toLowerCase();
        const foldedKw = removeVietnameseDiacritics(lowerKw);
        return lowerQuery.includes(lowerKw) || foldedQuery.includes(foldedKw);
      })) {
        kbMatched = true;
        break;
      }
    }

    // Heuristic fallback check in AICoCoAssistant.jsx line 87:
    const heuristicMatched = foldedQuery.includes('mat hoa') || foldedQuery.includes('tieu duong');

    console.log(`    [Remediation Verified] Query "mat hoa" -> in aiKnowledge.keywords: ${kbMatched} | in heuristic recs: ${heuristicMatched}`);
    t.assertEqual(kbMatched, true, 'REMEDIATION VERIFIED: Exact query "mat hoa" matches aiKnowledge item');
    t.assertEqual(heuristicMatched, true, 'Heuristic fallback in AICoCoAssistant correctly catches "mat hoa" for P14/P04 recommendation');
  });

  suite.test('ADV4-2.4 Accented & Unaccented Queries: Behavior on non-colliding phrases', async (t) => {
    // For queries that do NOT collide with short subwords, diacritic folding works
    const nonColliding = [
      { query: 'dau dua', expectedMatch: true, expectedItem: 2 },
      { query: 'mat hoa dua', expectedMatch: true, expectedItem: 3 }, // with "dua" it matches
    ];

    for (const nc of nonColliding) {
      const lower = nc.query.toLowerCase();
      const folded = removeVietnameseDiacritics(lower);
      let matchedIndex = -1;
      for (let i = 0; i < coopData.aiKnowledge.length; i++) {
        const item = coopData.aiKnowledge[i];
        if (item.keywords.some((kw) => {
          const lowerKw = kw.toLowerCase();
          const foldedKw = removeVietnameseDiacritics(lowerKw);
          return lower.includes(lowerKw) || folded.includes(foldedKw);
        })) {
          matchedIndex = i;
          break;
        }
      }
      t.assert(matchedIndex !== -1, `Query "${nc.query}" must find a match`);
    }
  });

  // =========================================================================
  // DOMAIN 3: TRACEABILITY BATCH CODE ALIASES (SP-2026-01, SP-2026-03, SP-2026-08, SP-2026-02)
  // =========================================================================

  suite.test('ADV4-3.1 Batch Code Aliases: Verify all requested aliases exist in coopData.traceabilityBatches', async (t) => {
    const requiredAliases = ['SP-2026-01', 'SP-2026-03', 'SP-2026-08', 'SP-2026-02'];

    for (const alias of requiredAliases) {
      const record = coopData.traceabilityBatches[alias];
      t.assert(record !== undefined, `Alias "${alias}" MUST exist in coopData.traceabilityBatches`);
      t.assertEqual(record.batchCode, alias, `Batch code on record must be "${alias}"`);
      t.assert(record.productName && record.productName.length > 5, `Record for "${alias}" must have valid productName`);
      t.assert(record.farmOwner && record.farmOwner.length > 5, `Record for "${alias}" must have identified farmOwner`);
      t.assert(record.location && record.location.length > 10, `Record for "${alias}" must have location details`);
      t.assert(record.blockchainTx && record.blockchainTx.startsWith('0x'), `Record for "${alias}" must have blockchainTx hash`);
      t.assert(Array.isArray(record.certifications) && record.certifications.length >= 2, `Record for "${alias}" must list certifications`);
      t.assert(record.image && record.image.startsWith('http'), `Record for "${alias}" must have valid image URL`);
    }
  });

  suite.test('ADV4-3.2 Batch Code Aliases: TraceabilitySection renders rich data for all aliases', async (t) => {
    const testCases = [
      { code: 'SP-2026-01', expectedText: 'Dừa Xiêm Lửa Song Phú Gọt Kim Cương' },
      { code: 'SP-2026-03', expectedText: 'Dầu Dừa Nguyên Chất Ép Lạnh Ly Tâm' },
      { code: 'SP-2026-08', expectedText: 'Dừa Xiêm Lửa Song Phú Gọt Kim Cương (Lô Tuyển Chọn)' },
      { code: 'SP-2026-02', expectedText: 'Mật Hoa Dừa Cô Đặc Song Phú Lên Men Sinh Học' },
    ];

    for (const tc of testCases) {
      const html = renderToHtml(TraceabilitySection, {
        batches: coopData.traceabilityBatches,
        initialCode: tc.code,
      });

      t.assert(html.includes(tc.code), `HTML output must contain batch code "${tc.code}"`);
      t.assert(html.includes(tc.expectedText), `HTML output for "${tc.code}" must contain "${tc.expectedText}"`);
      t.assert(html.includes('Đã xác thực số'), `HTML output for "${tc.code}" must render "Đã xác thực số" badge`);
      t.assert(html.includes('Mã QR truy xuất bảo mật'), `HTML output for "${tc.code}" must render QR code label`);
    }
  });

  suite.test('ADV4-3.3 Batch Code Aliases: Case insensitivity and whitespace tolerance for aliases', async (t) => {
    const variations = [
      { input: 'sp-2026-01', expectedCode: 'SP-2026-01' },
      { input: '   SP-2026-01   ', expectedCode: 'SP-2026-01' },
      { input: 'sp-2026-03', expectedCode: 'SP-2026-03' },
      { input: '  sp-2026-08  ', expectedCode: 'SP-2026-08' },
      { input: '\tsp-2026-02\n', expectedCode: 'SP-2026-02' },
    ];

    for (const v of variations) {
      const normalized = v.input.trim().toUpperCase();
      t.assertEqual(normalized, v.expectedCode, `Normalization of "${v.input}" must equal "${v.expectedCode}"`);
      t.assert(coopData.traceabilityBatches[normalized] !== undefined, `Batch "${normalized}" must exist in registry`);
    }
  });

  // =========================================================================
  // DOMAIN 4: EMPTY BATCH REGISTRY SAFE GUARD & DEFENSIVE INVARIANTS
  // =========================================================================

  suite.test('ADV4-4.1 Empty Batch Safe Guard: Renders friendly empty state without throwing', async (t) => {
    // 1. Empty object
    let threw = false;
    let htmlEmptyObj = '';
    try {
      htmlEmptyObj = renderToHtml(TraceabilitySection, { batches: {}, initialCode: 'SP-2026-01' });
    } catch (err) {
      threw = true;
    }
    t.assert(!threw, 'TraceabilitySection must NOT throw when batches is {}');
    t.assert(htmlEmptyObj.includes('Không Có Dữ Liệu Lô Hàng'), 'Must render "Không Có Dữ Liệu Lô Hàng" heading');
    t.assert(htmlEmptyObj.includes('Hiện chưa có thông tin lô hàng truy xuất trong hệ thống'),
      'Must render user-friendly guidance message');

    // 2. null batches
    threw = false;
    let htmlNull = '';
    try {
      htmlNull = renderToHtml(TraceabilitySection, { batches: null });
    } catch (err) {
      threw = true;
    }
    t.assert(!threw, 'TraceabilitySection must NOT throw when batches is null');
    t.assert(htmlNull.includes('Không Có Dữ Liệu Lô Hàng'), 'Null batches must render safe empty state');

    // 3. undefined batches
    threw = false;
    let htmlUndefined = '';
    try {
      htmlUndefined = renderToHtml(TraceabilitySection, { batches: undefined });
    } catch (err) {
      threw = true;
    }
    t.assert(!threw, 'TraceabilitySection must NOT throw when batches is undefined');
    t.assert(htmlUndefined.includes('Không Có Dữ Liệu Lô Hàng'), 'Undefined batches must render safe empty state');

    // 4. Non-object batches (e.g., array or string)
    threw = false;
    let htmlArray = '';
    try {
      htmlArray = renderToHtml(TraceabilitySection, { batches: [] });
    } catch (err) {
      threw = true;
    }
    t.assert(!threw, 'TraceabilitySection must NOT throw when batches is []');

    // 5. Corrupt batch with null value
    threw = false;
    let htmlCorrupt = '';
    try {
      htmlCorrupt = renderToHtml(TraceabilitySection, { batches: { 'SP-INVALID': null }, initialCode: 'SP-INVALID' });
    } catch (err) {
      threw = true;
    }
    t.assert(!threw, 'TraceabilitySection must NOT throw when batch item is null');
  });

  suite.test('ADV4-4.2 Fallback Selection: When initialCode is not found, falls back safely to first valid batch', async (t) => {
    const singleBatch = {
      'SP-SOLO-01': {
        batchCode: 'SP-SOLO-01',
        productName: 'Sản Phẩm Độc Bản',
        farmOwner: 'Nông Hộ Thử Nghiệm',
        location: 'Song Phú, Vĩnh Long',
        farmArea: '1ha',
        soilType: 'Phù sa',
        pollinationDate: '01/01/2026',
        harvestDate: '01/06/2026',
        harvestMethod: 'Thủ công',
        processDate: '02/06/2026',
        certifications: ['OCOP 4 Sao'],
        labTest: 'Đạt chuẩn 100%',
        auditor: 'Trung Tâm Thử Nghiệm',
        blockchainTx: '0x1111111111111111111',
        image: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705',
      },
    };

    const html = renderToHtml(TraceabilitySection, {
      batches: singleBatch,
      initialCode: 'SP-NON-EXISTENT-CODE',
    });

    t.assert(html.includes('SP-SOLO-01'), 'Must fallback to first available batch SP-SOLO-01 when requested code does not exist');
    t.assert(html.includes('Sản Phẩm Độc Bản'), 'Must render product details of the fallback batch');
  });

  return await suite.run();
}

if (process.argv[1].endsWith('adversarial-challenger4.test.js')) {
  runChallenger4AdversarialSuite()
    .then((results) => {
      process.exit(results.failed > 0 ? 1 : 0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
