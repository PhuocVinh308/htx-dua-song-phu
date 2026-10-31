#!/usr/bin/env node

/**
 * ============================================================================
 * E2E TEST RUNNER — HTX DỪA SONG PHÚ (SOCOOP TAM BÌNH)
 * ============================================================================
 * Comprehensive Opaque-Box E2E Testing Suite across Tiers 1-4:
 * - Tier 1: Feature Coverage (Typography tokens, 5 Reference Screens, Quick View,
 *           Cart +/-/delete/total, COD & Bank transfer checkout, Category filter,
 *           Bé CoCo AI, Zero Waste Diagram, QR Blockchain traceability).
 * - Tier 2: Boundary & Corner Cases (empty cart, invalid checkout form fields,
 *           0 quantity, nonexistent batch QR, search empty, max pagination).
 * - Tier 3: Cross-Feature Combinations (category filter + product card -> quick view
 *           -> add to cart -> cart drawer -> checkout COD/Bank transfer;
 *           AI Bé CoCo recommendation -> add to cart; Quick View -> Traceability;
 *           Zero Waste CTA -> Products catalog).
 * - Tier 4: Real-World Scenarios (complete purchasing journey with VietQR,
 *           mobile responsive layout checks, production bundle build verification).
 *
 * Usage:
 *   node scripts/run-e2e-tests.js
 *   node scripts/run-e2e-tests.js --tier=1
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { runTier1Tests } from '../tests/e2e/tier1-feature-coverage.test.js';
import { runTier2Tests } from '../tests/e2e/tier2-boundary-corner-cases.test.js';
import { runTier3Tests } from '../tests/e2e/tier3-cross-feature-combinations.test.js';
import { runTier4Tests } from '../tests/e2e/tier4-real-world-scenarios.test.js';

const args = process.argv.slice(2);
const tierArg = args.find((a) => a.startsWith('--tier='));
const targetTier = tierArg ? parseInt(tierArg.split('=')[1], 10) : null;

console.log(`\n🥥 ============================================================================`);
console.log(`   HTX DỪA SONG PHÚ — AUTOMATED E2E TEST RUNNER`);
console.log(`   Framework: React 18 + Vite 5 + Tailwind CSS | Opaque-Box Verification`);
console.log(`============================================================================\n`);

async function main() {
  const overallStart = Date.now();
  const suiteResults = [];

  try {
    if (!targetTier || targetTier === 1) {
      suiteResults.push(await runTier1Tests());
    }
    if (!targetTier || targetTier === 2) {
      suiteResults.push(await runTier2Tests());
    }
    if (!targetTier || targetTier === 3) {
      suiteResults.push(await runTier3Tests());
    }
    if (!targetTier || targetTier === 4) {
      suiteResults.push(await runTier4Tests());
    }
  } catch (fatalErr) {
    console.error(`\n💥 FATAL ERROR DURING TEST EXECUTION:`, fatalErr);
    process.exit(1);
  }

  const totalDuration = Date.now() - overallStart;
  const totalTests = suiteResults.reduce((s, r) => s + r.total, 0);
  const totalPassed = suiteResults.reduce((s, r) => s + r.passed, 0);
  const totalFailed = suiteResults.reduce((s, r) => s + r.failed, 0);
  const totalAssertions = suiteResults.reduce((s, r) => s + r.assertions, 0);

  console.log(`\n============================================================================`);
  console.log(`🏁 TEST SUITE EXECUTION SUMMARY`);
  console.log(`============================================================================`);
  console.log(`┌────────────────────────────────────────────────────────┬───────┬──────┬──────┬───────┬────────┐`);
  console.log(`│ Test Suite (Tier)                                      │ Tests │ Pass │ Fail │ Assrt │ Time   │`);
  console.log(`├────────────────────────────────────────────────────────┼───────┼──────┼──────┼───────┼────────┤`);

  for (const r of suiteResults) {
    const namePadded = r.name.padEnd(54, ' ').slice(0, 54);
    const testsPadded = String(r.total).padStart(5, ' ');
    const passPadded = String(r.passed).padStart(4, ' ');
    const failPadded = String(r.failed).padStart(4, ' ');
    const assertPadded = String(r.assertions).padStart(5, ' ');
    const timePadded = `${r.duration}ms`.padStart(6, ' ');
    console.log(`│ ${namePadded} │ ${testsPadded} │ ${passPadded} │ ${failPadded} │ ${assertPadded} │ ${timePadded} │`);
  }

  console.log(`├────────────────────────────────────────────────────────┼───────┼──────┼──────┼───────┼────────┤`);
  const grandName = 'TOTAL (All Suites)'.padEnd(54, ' ');
  const gTests = String(totalTests).padStart(5, ' ');
  const gPass = String(totalPassed).padStart(4, ' ');
  const gFail = String(totalFailed).padStart(4, ' ');
  const gAssert = String(totalAssertions).padStart(5, ' ');
  const gTime = `${totalDuration}ms`.padStart(6, ' ');
  console.log(`│ ${grandName} │ ${gTests} │ ${gPass} │ ${gFail} │ ${gAssert} │ ${gTime} │`);
  console.log(`└────────────────────────────────────────────────────────┴───────┴──────┴──────┴───────┴────────┘`);

  if (totalFailed > 0) {
    console.log(`\n❌ TEST SUITE FAILED: ${totalFailed} test(s) failed out of ${totalTests}.\n`);
    for (const r of suiteResults) {
      if (r.errors && r.errors.length > 0) {
        console.log(`Failures in [${r.name}]:`);
        for (const e of r.errors) {
          console.log(`  - ${e.test}: ${e.error.message}`);
        }
      }
    }
    process.exit(1);
  } else {
    console.log(`\n✅ ALL TESTS PASSED SUCCESSFULLY! (100% pass rate across ${totalTests} test cases, ${totalAssertions} assertions)\n`);
    process.exit(0);
  }
}

main();
