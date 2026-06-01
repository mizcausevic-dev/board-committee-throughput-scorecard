# Architecture

Board Committee Throughput Scorecard is a static-friendly TypeScript executive-intelligence surface for showing where agenda load, decision-slot coverage, committee cadence, and escalation turnover are constraining board-backed decisions.

## Routes

- `/`
- `/throughput-lane`
- `/agenda-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample committee-throughput items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores agenda overflow, committee load, slot coverage, escalation turnover, decision velocity, and board confidence.
3. `src/services/verticalBriefService.ts` shapes the board-readable throughput packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
