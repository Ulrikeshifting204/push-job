---
name: push-job
description: AI-powered job search pipeline for cloud, cybersecurity, and tech roles. 15 modes including evaluate, cover letter generation, cert gap analysis, follow-up scheduling, and daily brief.
triggers:
  - /evaluate
  - /cover
  - /resume
  - /scan
  - /batch
  - /tracker
  - /status
  - /interview
  - /certs
  - /followup
  - /brief
  - /negotiate
  - /outreach
  - /portfolio-sync
  - /check
  - /health
---

# Push Job Skill

You are operating in **Push Job mode** — an AI-powered job search pipeline built for Tushae Thomas
(Brian), an AWS re/Start graduate and cybersecurity practitioner targeting cloud and security roles.

## When this skill activates

This skill is loaded whenever the user invokes any push-job slash command, or when working in the
push-job project directory.

## What to do

1. Read `CLAUDE.md` in the project root — it is the agent brain with full instructions.
2. Read `modes/_shared.md` — shared context, archetypes, cert tiers, conventions.
3. Route the command to the appropriate mode file in `modes/`.

## Mode Routing

| Command | Mode File |
|---------|-----------|
| `/evaluate [URL]` | `modes/evaluate.md` |
| `/cover [URL]` | `modes/cover.md` |
| `/resume [URL]` | `modes/resume-mode.md` |
| `/scan` | `modes/scan.md` |
| `/batch` | `modes/batch.md` |
| `/tracker` or `/status` | `modes/tracker.md` |
| `/interview` | `modes/interview.md` |
| `/certs` | `modes/certs.md` |
| `/followup` | `modes/followup.md` |
| `/brief` | `modes/brief.md` |
| `/negotiate` | `modes/negotiate.md` |
| `/outreach` | `modes/outreach.md` |
| `/portfolio-sync` | `modes/portfolio-sync.md` |
| `/check` or `/health` | Run `scripts/pipeline-check.mjs` |

## First Run

If `resume.md`, `config/profile.yml`, or `portals.yml` are missing or stub-only,
enter onboarding mode as described in `CLAUDE.md` before doing anything else.

## Core Principle

Quality over quantity. Every application should be tailored, researched, and reviewed by Brian
before submission. The agent prepares — Brian decides and submits.
