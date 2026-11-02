import fs from 'node:fs';
import path from 'node:path';
import esbuild from 'esbuild';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const ROOT_DIR = path.resolve('.');
const TEST_CACHE_DIR = path.resolve(ROOT_DIR, '.test-cache');

/**
 * Compile JSX/JS files under src/ into .test-cache/ using esbuild bundling with external packages
 */
export function compileTestComponents() {
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

/**
 * Load a compiled component dynamically from .test-cache
 */
export async function loadComponent(subpath) {
  compileTestComponents();
  const fullPath = path.resolve(TEST_CACHE_DIR, subpath.replace(/\.jsx$/, '.js'));
  const mod = await import(fullPath + `?t=${Date.now()}`);
  return mod.default || mod;
}

/**
 * Render a React component to static HTML string
 */
export function renderToHtml(Component, props = {}) {
  const element = React.createElement(Component, props);
  return ReactDOMServer.renderToStaticMarkup(element);
}

/**
 * Extract text without HTML tags
 */
export function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Query helper to check if HTML contains class
 */
export function hasClass(html, className) {
  const regex = new RegExp(`class="[^"]*\\b${className}\\b[^"]*"`, 'i');
  return regex.test(html);
}

/**
 * Simple Test Runner Framework for Tiers 1-4
 */
export class TestSuite {
  constructor(name) {
    this.name = name;
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
    this.assertions = 0;
    this.errors = [];
  }

  test(description, fn) {
    this.tests.push({ description, fn });
  }

  assert(condition, message) {
    this.assertions++;
    if (!condition) {
      const err = new Error(message || 'Assertion failed');
      throw err;
    }
  }

  assertEqual(actual, expected, message) {
    this.assertions++;
    if (actual !== expected) {
      const err = new Error(
        `${message || 'Equality failed'}: Expected [${expected}] but got [${actual}]`
      );
      throw err;
    }
  }

  assertIncludes(actual, substring, message) {
    this.assertions++;
    if (typeof actual === 'string' && !actual.includes(substring)) {
      const err = new Error(
        `${message || 'Substring match failed'}: Did not find "${substring}" in string`
      );
      throw err;
    }
    if (Array.isArray(actual) && !actual.includes(substring)) {
      const err = new Error(
        `${message || 'Array include failed'}: Array did not include expected element`
      );
      throw err;
    }
  }

  assertMatch(actual, regex, message) {
    this.assertions++;
    if (!regex.test(actual)) {
      const err = new Error(
        `${message || 'Regex match failed'}: Value does not match pattern ${regex}`
      );
      throw err;
    }
  }

  async run() {
    console.log(`\n============================================================`);
    console.log(`RUNNING SUITE: ${this.name}`);
    console.log(`============================================================`);
    const startTime = Date.now();

    for (const t of this.tests) {
      try {
        await t.fn(this);
        this.passed++;
        console.log(`  ✓ ${t.description}`);
      } catch (err) {
        this.failed++;
        console.log(`  ✗ ${t.description}`);
        console.log(`    -> Error: ${err.message}`);
        this.errors.push({ test: t.description, error: err });
      }
    }

    const duration = Date.now() - startTime;
    console.log(`------------------------------------------------------------`);
    console.log(`Results for ${this.name}: ${this.passed} passed, ${this.failed} failed (${this.assertions} assertions, ${duration}ms)`);
    console.log(`------------------------------------------------------------\n`);

    return {
      name: this.name,
      total: this.tests.length,
      passed: this.passed,
      failed: this.failed,
      assertions: this.assertions,
      duration,
      errors: this.errors,
    };
  }
}
