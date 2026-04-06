# brief.md — Daily Pipeline Brief Mode

**Trigger:** `/brief`

Read `modes/_shared.md` first.
This mode does not exist in career-ops. It is a core differentiator of Push Job.

---

## Step 1 — Load All Data Sources

Read:
- `data/applications.md` (full tracker)
- `data/followups.md` (follow-up log)
- `data/pipeline.md` (pending URLs)
- `config/profile.yml` (cert progress, targets)

Get today's date.

---

## Step 2 — Compute Metrics

**Pipeline snapshot:**
- Count rows by Status
- Total active applications (Applied → Interview → Offer)

**Follow-up alerts:**
- Count Applied rows where today >= FollowUp date (Due Today)
- Count Applied rows where today >= FollowUp date + 7 (Overdue)

**Pipeline queue:**
- Count URLs in `data/pipeline.md` not yet evaluated

**Cert progress:**
- Read `certifications.tier1_in_progress` from `config/profile.yml`
- Show name, current progress %, and target date

---

## Step 3 — Determine Today's Recommended Action

Priority logic (pick the highest applicable):
1. If there are overdue follow-ups → "Resolve overdue follow-ups first — run `/followup`"
2. If there are follow-ups due today → "Send today's follow-ups — run `/followup`"
3. If pipeline.md has 3+ pending URLs → "Evaluate pending jobs — run `/batch pipeline`"
4. If all active applications are quiet AND no pending URLs → "Run a portal scan — run `/scan`"
5. If cert progress is < 50% and no jobs need attention → "Study session: [cert name] — [specific topic]"

---

## Step 4 — Output Daily Brief

```
╔══════════════════════════════════════════════════╗
║         PUSH JOB DAILY BRIEF — [DATE]            ║
╚══════════════════════════════════════════════════╝

PIPELINE SNAPSHOT
  Total tracked:    X
  Applied:          X
  Interviewing:     X
  Offers:           X
  Rejected:         X
  Discarded/SKIP:   X

FOLLOW-UPS
  Due today:   X  [company names if any]
  Overdue:     X  [company names if any]

PENDING EVALUATION
  URLs in pipeline.md: X

CERT PROGRESS
  AWS CLF-C02:  [X%] — Target: [date] — [on track / behind]
  CySA+:        [X%] — Target: [date] — [on track / behind]

TODAY'S RECOMMENDED ACTION
  → [One specific, actionable thing to do today]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
