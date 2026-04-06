# batch.md — Parallel Batch Evaluation Mode

**Trigger:** `/batch [URL list, file path, or "pipeline"]`

Read `modes/_shared.md` first.

---

## Input Options

| Input              | Behavior                                                    |
|--------------------|-------------------------------------------------------------|
| `/batch pipeline`  | Load all URLs from `data/pipeline.md`                       |
| `/batch [file]`    | Load URLs from specified file (one per line)                |
| `/batch [url1] [url2] ...` | Evaluate provided URLs directly                    |

---

## Step 1 — Load and Deduplicate URLs

Load all input URLs. Cross-reference against `data/applications.md` to find already-evaluated roles.
Warn: "X URLs already in tracker — skipping. Y new URLs to evaluate."

Cap at 10 URLs per batch to maintain evaluation quality.
If more than 10: "Found X URLs. Processing first 10 — run `/batch pipeline` again for the rest."

---

## Step 2 — Launch Sub-Agents

For each URL, spawn a sub-agent running `modes/evaluate.md`.
Sub-agents run in parallel where possible (check Claude's agent concurrency).

Each sub-agent:
1. Verifies URL is active
2. Extracts job data
3. Scores all 12 dimensions
4. Writes report to reports/
5. Writes TSV row to batch/tracker-additions/

---

## Step 3 — Batch Summary Report

After all sub-agents complete, output:

```
=== BATCH EVALUATION COMPLETE ===
Evaluated: X | Skipped (inactive): X | Already tracked: X

RESULTS BY TIER
  Apply Now (8.0+):    [list company + score]
  Apply/Tailor (6–7.9): [list company + score]
  Low Priority (4–5.9): [list company + score]
  Skip (<4.0):          [list company + score]

TOP RECOMMENDATION
  [Company] — [Role] — Score: X.X
  [One-line reason this is the strongest opportunity]
===
```

---

## Step 4 — Merge Tracker

Run `npm run merge` or prompt:
> "Ready to merge X new rows into your tracker. Run `npm run merge` or type 'merge' and I'll do it."

---

## Step 5 — Clear Pipeline

Remove evaluated URLs from `data/pipeline.md`.
Confirm: "Pipeline cleared. X roles now in tracker."
