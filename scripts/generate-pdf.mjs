#!/usr/bin/env node
/**
 * generate-pdf.mjs
 * Converts an HTML file to a PDF using Playwright Chromium.
 *
 * Usage:
 *   node scripts/generate-pdf.mjs <input.html> <output.pdf>
 *
 * Examples:
 *   node scripts/generate-pdf.mjs templates/resume.html output/resume.pdf
 *   node scripts/generate-pdf.mjs templates/cover.html output/crowdstrike-cover-2026-04-05.pdf
 */

import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const [,, inputArg, outputArg] = process.argv;

if (!inputArg || !outputArg) {
  console.error('Usage: node scripts/generate-pdf.mjs <input.html> <output.pdf>');
  process.exit(1);
}

const inputPath = resolve(projectRoot, inputArg);
const outputPath = resolve(projectRoot, outputArg);

if (!existsSync(inputPath)) {
  console.error(`Error: Input file not found: ${inputPath}`);
  process.exit(1);
}

// Ensure output directory exists
const outputDir = dirname(outputPath);
const { mkdirSync } = await import('fs');
mkdirSync(outputDir, { recursive: true });

console.log(`Generating PDF...`);
console.log(`  Input:  ${inputPath}`);
console.log(`  Output: ${outputPath}`);

const browser = await chromium.launch();
const page = await browser.newPage();

// Load HTML file directly (supports local CSS and assets)
await page.goto(`file://${inputPath}`, { waitUntil: 'networkidle' });

// Generate PDF
await page.pdf({
  path: outputPath,
  format: 'Letter',
  printBackground: true,
  margin: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
  },
});

await browser.close();

console.log(`PDF saved: ${outputPath}`);
