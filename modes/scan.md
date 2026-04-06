# scan.md — Portal Scanning Mode

**Trigger:** `/scan`

Read `modes/_shared.md` first.

---

## Step 1 — Load Portal List

Read `portals.yml` (user's personal copy, gitignored).
If it doesn't exist, prompt:
> "portals.yml not found. Copy templates/portals.example.yml to portals.yml and customize it."

Filter out any company with `skip: true`.

---

## Step 2 — Scan Portal Categories

Group portals by category and scan in this priority order:
1. Cloud Providers (AWS, Azure, GCP, Cloudflare, DigitalOcean)
2. Cybersecurity (CrowdStrike, Palo Alto, SentinelOne, Okta, Huntress, Rapid7)
3. SIEM/SOC (Splunk, Elastic, Arctic Wolf, Devo)
4. Defense/GovCloud (Booz Allen, SAIC, Leidos, MITRE)
5. DevSecOps (Wiz, Snyk, HashiCorp, Lacework)
6. Enterprise (Microsoft, IBM, Accenture)
7. Job Boards (LinkedIn, Dice, Wellfound, RemoteOK)

For each portal:
- Use Playwright to load the careers/jobs page
- Search for roles matching Brian's target titles:
  "SOC Analyst", "Cloud Engineer", "Cloud Security", "DevSecOps", "Security Analyst"
- Collect URL, title, location, and date posted for each match

---

## Step 3 — Filter Results

Remove:
- Roles requiring 5+ years experience (unless score would still be 6+)
- On-site roles in cities Brian hasn't listed in profile.yml
- Roles requiring senior-level certs Brian has no path to in 12 months

---

## Step 4 — Display Results

Output a scan report:

```
=== PORTAL SCAN — [DATE] ===
Scanned: X companies | Found: X new roles

NEW OPPORTUNITIES
  [Company] — [Role] — [Remote/Location] — [Posted date]
  URL: [url]
  Quick read: [1-line fit assessment]

  ...

ADDED TO PIPELINE
  X URLs saved to data/pipeline.md
===
```

---

## Step 5 — Update Pipeline

Append all found URLs to `data/pipeline.md` with a timestamp comment.
Append company+role pairs to `data/scan-history.tsv` to avoid re-scanning.

Prompt:
> "X new roles found. Run `/evaluate [URL]` on any of these, or `/batch` to evaluate all."
