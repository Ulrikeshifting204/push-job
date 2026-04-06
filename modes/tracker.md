# tracker.md — Application Status Tracker

**Trigger:** `/tracker` or `/status`

Read `modes/_shared.md` first.

---

## Step 1 — Read Tracker

Read `data/applications.md` in full.
Parse all TSV rows (skip the header line).

---

## Step 2 — Display Pipeline Summary

```
=== APPLICATION TRACKER ===
Last updated: [date of most recent entry]

PIPELINE OVERVIEW
  Total applications: X
  Evaluated (not yet applied): X
  Applied: X
  Followed Up: X
  Responded: X
  Interviewing: X
  Offers: X
  Rejected: X
  Discarded/SKIP: X

ACTIVE APPLICATIONS (Applied → Offer)
  [Company] — [Role] — Score: X.X — Status: [Status] — Applied: [date] — FollowUp: [date]
  ...

INTERVIEWS
  [Company] — [Role] — Status: Interview — [notes]
  ...

OFFERS
  [Company] — [Role] — [notes]
  ...
===
```

---

## Step 3 — Flag Follow-Ups

Highlight any rows where:
- Status is `Applied` or `Followed Up` AND today >= FollowUp date

```
FOLLOW-UPS DUE
  ⚠️  [Company] — [Role] — Applied [X days ago] — run `/followup`
```

---

## Step 4 — Update a Status

If user says "mark [company] as [status]":
1. Find the row in `data/applications.md`
2. Update the Status field
3. Update FollowUp date if moving to `Applied` (set to +7 days)
4. Confirm: "Updated [Company] — [Role] to [Status]."

---

## Step 5 — Open a Report

If user says "show report for [company]":
Find the matching file in `reports/` and display it.
