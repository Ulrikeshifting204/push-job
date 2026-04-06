# Push Job — Setup Guide

## Prerequisites

- [Claude Code](https://claude.ai/code) installed and authenticated
- [Node.js](https://nodejs.org) v18 or later
- [Git](https://git-scm.com) installed
- [GitHub CLI](https://cli.github.com) (optional — for repo management)

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/TushaeThomas/push-job.git
cd push-job

# 2. Install dependencies
npm install

# 3. Install Playwright browser
npx playwright install chromium

# 4. Launch Claude Code
claude
```

On first launch, Claude will detect missing personal files and walk you through onboarding.

---

## Onboarding Steps

Claude will guide you through these automatically:

1. **Resume** — Paste your resume in any format. Claude structures it into `resume.md`.
2. **Profile** — Answer a few questions to set up `config/profile.yml` (salary, remote prefs, cert progress).
3. **Portfolio sync** — Claude visits your GitHub and pulls your public repos into `portfolio.md`.
4. **Portals** — Copy `templates/portals.example.yml` to `portals.yml` and customize the company list.
5. **Tracker init** — Claude initializes `data/applications.md` with the correct TSV header.

---

## File Layout (Personal Files)

These files stay local — they are gitignored:

| File | Purpose |
|------|---------|
| `resume.md` | Your master resume (source for all tailoring) |
| `portfolio.md` | GitHub project summaries (proof points) |
| `config/profile.yml` | Job search preferences, cert progress, salary targets |
| `portals.yml` | Your personalized company/portal list |
| `data/applications.md` | Application tracker (TSV) |
| `data/pipeline.md` | URLs pending evaluation |
| `data/followups.md` | Follow-up action log |
| `reports/` | Per-job evaluation reports |
| `output/` | Generated PDFs |

---

## Available Commands

| Command | What it does |
|---------|-------------|
| `/evaluate [URL]` | Score a job posting across 12 dimensions |
| `/cover [URL]` | Generate a tailored cover letter |
| `/resume [URL]` | Generate an ATS-optimized resume |
| `/scan` | Scan 60+ portals for new roles |
| `/batch pipeline` | Evaluate all URLs in data/pipeline.md |
| `/tracker` | View full application pipeline |
| `/interview [company]` | Generate interview prep for a specific role |
| `/certs` | Analyze cert gaps across all applications |
| `/followup` | Check and draft overdue follow-ups |
| `/brief` | Get today's pipeline summary |
| `/negotiate [amount]` | Script a salary negotiation |
| `/outreach [company]` | Draft LinkedIn/cold outreach |
| `/portfolio-sync` | Refresh portfolio.md from GitHub |
| `/check` | Run pipeline health checks |

---

## PDF Generation

Requires Playwright Chromium (installed via `npx playwright install chromium`).

```bash
# Generate resume PDF
node scripts/generate-pdf.mjs templates/resume.html output/my-resume.pdf

# Generate cover letter PDF
node scripts/generate-pdf.mjs templates/cover.html output/company-cover.pdf
```

Claude handles this automatically when you confirm "generate PDF" in any mode.

---

## Tracker Management

```bash
# Merge batch evaluations into tracker
npm run merge

# Run pipeline health check
npm run check
```

---

## Updating Your Resume

```bash
# Open Claude Code, then:
# "Update my resume.md to add [new experience/project/cert]"
# Claude will read the current resume.md and make targeted edits.
```

---

## Keeping Portals Updated

Edit `portals.yml` directly or tell Claude:
> "Add [Company] to portals.yml under [category]"

---

## Troubleshooting

**Playwright won't launch:**
```bash
npx playwright install chromium
npx playwright install-deps  # Linux only
```

**PDF is blank or unstyled:**
- Make sure the HTML template has `printBackground: true` (it does by default)
- Check that the template path is correct (absolute or relative to project root)

**Tracker merge finds no files:**
- Run `/evaluate` or `/batch` first — these write to `batch/tracker-additions/`
- Then run `npm run merge`

**Claude doesn't find my resume:**
- Confirm `resume.md` exists at the project root (not in a subfolder)
- If it's a stub, complete onboarding: "let's set up my resume"
