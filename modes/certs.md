# certs.md — Certification Gap Analysis Mode

**Trigger:** `/certs`

Read `modes/_shared.md` first.
This mode does not exist in career-ops. It is a core differentiator of Push Job.

---

## Step 1 — Load Application History

Read all files in `reports/` and `data/applications.md`.
For each Tier 1 (score 6.0+) and Tier 2 (score 4.0–5.9) application, extract:
- Company name
- Role title
- Score
- Status
- Required certifications (from the report's "Cert Gap Analysis" section)
- Preferred certifications

---

## Step 2 — Build Cert Frequency Table

Aggregate across all applications:

```
CERT FREQUENCY ANALYSIS

Cert Name            | Total | Tier 1 (6+) | Tier 2 (4–5.9) | Your Status
---------------------|-------|-------------|----------------|------------------
AWS CLF-C02          |    X  |      X      |       X        | In Progress
CompTIA CySA+        |    X  |      X      |       X        | In Progress
CompTIA Security+    |    X  |      X      |       X        | Not started
AWS SAA-C03          |    X  |      X      |       X        | Not started
Microsoft AZ-500     |    X  |      X      |       X        | Not started
CISSP                |    X  |      X      |       X        | Not started (Tier 3)
...
```

---

## Step 3 — Prioritized Recommendations

Generate a ranked list of cert priorities based on frequency data:

```
CERT PRIORITY RECOMMENDATIONS

1. FINISH AWS CLF-C02 FIRST
   → Appears in X of your top applications
   → Required/preferred in X Tier 1 opportunities
   → Unlocking this immediately strengthens X active applications
   → Your current progress: [from profile.yml]

2. FINISH CySA+ SECOND
   → Appears in X applications
   → Strong overlap with Security+ requirements (30–40% shared content)
   → X Tier 1 SOC Analyst roles specifically require or prefer it

3. NEXT: CompTIA Security+ OR AZ-500
   → Security+: Appears in X applications, partial overlap with CySA+ content
   → AZ-500: Appears in X applications, high value for Azure-heavy roles
   → Recommendation: [choose based on which appears more in Tier 1 roles]

...
```

---

## Step 4 — Cert vs. Role Archetype Matrix

```
CERT → ROLE UNLOCK MATRIX

Cert            | SOC Analyst | Cloud Eng | Cloud Security | DevSecOps
----------------|-------------|-----------|----------------|----------
AWS CLF-C02     |     ●       |    ●●     |      ●●        |    ●
CySA+           |    ●●●      |           |      ●●        |    ●
Security+       |    ●●       |           |      ●●        |    ●●
AWS SAA-C03     |             |   ●●●     |      ●●●       |    ●●
AZ-500          |    ●●       |    ●      |      ●●●       |    ●●

●●● = High impact  ●● = Medium  ● = Low
```

---

## Step 5 — Study Plan Integration

Read `config/profile.yml` for cert progress and target dates.
Output a simple week-by-week study suggestion:

> "Based on your progress on CLF-C02 (50%) and your target date of [date]:
> You need X more weeks of study. At 10 hours/week, you're on track.
> Suggested focus this week: [topic from AWS CLF-C02 exam guide]."

---

## Step 6 — Update Profile

> "Want me to update your cert progress in config/profile.yml?"
If yes, read the current file and make the targeted update.
