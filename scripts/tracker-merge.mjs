#!/usr/bin/env node
/**
 * tracker-merge.mjs
 * Merges TSV files from batch/tracker-additions/ into data/applications.md.
 * Deduplicates by company + role before appending.
 *
 * Usage:
 *   node scripts/tracker-merge.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, unlinkSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const TRACKER_PATH = join(projectRoot, 'data', 'applications.md');
const ADDITIONS_DIR = join(projectRoot, 'batch', 'tracker-additions');

const TSV_HEADER = 'Date\tCompany\tRole\tURL\tScore\tStatus\tResume\tCover\tNotes\tFollowUp';

// ─── Ensure required directories exist ───────────────────────────────────────

mkdirSync(join(projectRoot, 'data'), { recursive: true });
mkdirSync(ADDITIONS_DIR, { recursive: true });

// ─── Load existing tracker ────────────────────────────────────────────────────

let existingContent = '';
let existingRows = [];

if (existsSync(TRACKER_PATH)) {
  existingContent = readFileSync(TRACKER_PATH, 'utf8');
  existingRows = existingContent
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('Date\t'));
} else {
  // Initialize with header
  existingContent = TSV_HEADER + '\n';
}

// Build a dedup key set: "company::role" (case-insensitive)
const existingKeys = new Set(
  existingRows.map(row => {
    const cols = row.split('\t');
    return `${(cols[1] || '').toLowerCase()}::${(cols[2] || '').toLowerCase()}`;
  })
);

// ─── Load additions ───────────────────────────────────────────────────────────

const additionFiles = readdirSync(ADDITIONS_DIR).filter(f => f.endsWith('.tsv'));

if (additionFiles.length === 0) {
  console.log('No additions found in batch/tracker-additions/. Nothing to merge.');
  process.exit(0);
}

let addedCount = 0;
let skippedCount = 0;
const newRows = [];

for (const file of additionFiles) {
  const filePath = join(ADDITIONS_DIR, file);
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('Date\t'));

  for (const line of lines) {
    const cols = line.split('\t');
    if (cols.length < 6) {
      console.warn(`  Skipping malformed row in ${file}: ${line.substring(0, 60)}...`);
      continue;
    }

    const company = (cols[1] || '').toLowerCase();
    const role = (cols[2] || '').toLowerCase();
    const key = `${company}::${role}`;

    if (existingKeys.has(key)) {
      console.log(`  SKIP (duplicate): ${cols[1]} — ${cols[2]}`);
      skippedCount++;
    } else {
      newRows.push(line);
      existingKeys.add(key);
      console.log(`  ADD: ${cols[1]} — ${cols[2]}`);
      addedCount++;
    }
  }
}

// ─── Write updated tracker ────────────────────────────────────────────────────

if (newRows.length > 0) {
  // Ensure file ends with newline before appending
  const base = existingContent.endsWith('\n') ? existingContent : existingContent + '\n';
  const updated = base + newRows.join('\n') + '\n';
  writeFileSync(TRACKER_PATH, updated, 'utf8');
}

// ─── Clean up processed addition files ───────────────────────────────────────

for (const file of additionFiles) {
  unlinkSync(join(ADDITIONS_DIR, file));
}

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log('');
console.log('Merge complete:');
console.log(`  Added:   ${addedCount}`);
console.log(`  Skipped: ${skippedCount} (duplicates)`);
console.log(`  Files processed: ${additionFiles.length}`);
console.log(`  Tracker: ${TRACKER_PATH}`);
