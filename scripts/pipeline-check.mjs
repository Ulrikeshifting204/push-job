#!/usr/bin/env node
/**
 * pipeline-check.mjs
 * Health and integrity checks for the Push Job pipeline.
 * Exits with code 1 if any checks fail.
 *
 * Usage:
 *   node scripts/pipeline-check.mjs
 *   npm run check
 */

import { existsSync, readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const CANONICAL_STATUSES = new Set([
  'Evaluated', 'Applied', 'Followed Up', 'Responded',
  'Interview', 'Offer', 'Rejected', 'Discarded', 'SKIP',
]);

let passed = 0;
let failed = 0;
const errors = [];

function check(label, condition, errorMsg) {
  if (condition) {
    console.log(`  ✅  ${label}`);
    passed++;
  } else {
    console.log(`  ❌  ${label}`);
    errors.push(errorMsg || label);
    failed++;
  }
}

function checkFile(label, relPath) {
  const fullPath = join(projectRoot, relPath);
  check(label, existsSync(fullPath), `Missing file: ${relPath}`);
  return existsSync(fullPath);
}

// ─── Section 1: Required files ────────────────────────────────────────────────

console.log('\n── REQUIRED FILES ──');
checkFile('CLAUDE.md exists', 'CLAUDE.md');
checkFile('package.json exists', 'package.json');
checkFile('.gitignore exists', '.gitignore');
checkFile('config/profile.example.yml exists', 'config/profile.example.yml');
checkFile('config/scoring.yml exists', 'config/scoring.yml');
checkFile('templates/resume.html exists', 'templates/resume.html');
checkFile('templates/cover.html exists', 'templates/cover.html');
checkFile('templates/portals.example.yml exists', 'templates/portals.example.yml');
checkFile('templates/states.yml exists', 'templates/states.yml');

console.log('\n── MODE FILES ──');
const modes = [
  '_shared', 'evaluate', 'cover', 'resume-mode', 'scan', 'batch',
  'tracker', 'interview', 'certs', 'followup', 'brief',
  'negotiate', 'outreach', 'portfolio-sync',
];
for (const mode of modes) {
  checkFile(`modes/${mode}.md exists`, `modes/${mode}.md`);
}

console.log('\n── SCRIPTS ──');
checkFile('scripts/generate-pdf.mjs exists', 'scripts/generate-pdf.mjs');
checkFile('scripts/tracker-merge.mjs exists', 'scripts/tracker-merge.mjs');
checkFile('scripts/pipeline-check.mjs exists', 'scripts/pipeline-check.mjs');

// ─── Section 2: Personal config (warn only, not fail) ─────────────────────────

console.log('\n── PERSONAL CONFIG (gitignored) ──');
const personalFiles = ['resume.md', 'portfolio.md', 'config/profile.yml', 'portals.yml'];
for (const f of personalFiles) {
  const exists = existsSync(join(projectRoot, f));
  const size = exists ? readFileSync(join(projectRoot, f), 'utf8').trim().length : 0;
  const isStub = size < 100;
  if (!exists || isStub) {
    console.log(`  ⚠️   ${f} — ${!exists ? 'not found' : 'stub only'} (run onboarding)`);
  } else {
    console.log(`  ✅  ${f}`);
  }
}

// ─── Section 3: Tracker integrity ─────────────────────────────────────────────

const trackerPath = join(projectRoot, 'data', 'applications.md');
if (existsSync(trackerPath)) {
  console.log('\n── TRACKER INTEGRITY ──');
  const content = readFileSync(trackerPath, 'utf8');
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('Date\t'));

  let trackerErrors = 0;
  for (let i = 0; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    if (cols.length !== 10) {
      console.log(`  ❌  Row ${i + 2}: expected 10 columns, got ${cols.length}`);
      trackerErrors++;
      failed++;
    } else {
      const status = cols[5].trim();
      if (!CANONICAL_STATUSES.has(status)) {
        console.log(`  ❌  Row ${i + 2}: invalid status "${status}" for ${cols[1]}`);
        errors.push(`Invalid status "${status}" in row ${i + 2}`);
        trackerErrors++;
        failed++;
      }
    }
  }

  if (trackerErrors === 0) {
    console.log(`  ✅  Tracker valid — ${lines.length} rows, all statuses canonical`);
    passed++;
  }
} else {
  console.log('\n── TRACKER ──');
  console.log('  ⚠️   data/applications.md not found (run onboarding to initialize)');
}

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log('\n────────────────────────────────────');
console.log(`PIPELINE CHECK: ${passed} passed, ${failed} failed`);

if (errors.length > 0) {
  console.log('\nErrors:');
  for (const e of errors) {
    console.log(`  • ${e}`);
  }
  console.log('');
  process.exit(1);
} else {
  console.log('All checks passed. Pipeline is healthy.\n');
  process.exit(0);
}
