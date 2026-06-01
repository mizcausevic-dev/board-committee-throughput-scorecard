import { agendaLedger, interventionPosture, payload, riskMap, summary, throughputLane, verification } from "./verticalBriefService.js";

const productTitle = "Board Committee Throughput Scorecard";
const domain = "https://throughput.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/throughput-lane", "Throughput lane"],
    ["/agenda-ledger", "Agenda ledger"],
    ["/intervention-posture", "Intervention posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = throughputLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Throughput theme:</strong> ${escapeHtml(item.throughputTheme)}</p>
        <p><strong>Meetings / month:</strong> ${item.committeeMeetingsPerMonth} · <strong>Slots:</strong> ${item.decisionSlotsAvailable}</p>
        <p><strong>Board confidence:</strong> ${item.boardConfidenceScore}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeThroughputRiskScore} · $${item.valueAtStakeMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Committee throughput</span>
      <h1>Where is board-safe decision flow outrunning agenda capacity, slot coverage, and escalation turnover?</h1>
      <p class="lede">Board Committee Throughput Scorecard turns agenda overflow, slot scarcity, committee load, and board-confidence drag into one board-readable packet for added meetings, reordered agendas, escalations, or deferred asks.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Throughput lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled committee-throughput lanes in the current board packet.</div></div>
        <div class="metric"><span class="metric-label">Constrained lanes</span><span class="metric-value">${executiveSummary.constrainedLanes}</span><div class="metric-copy">Lanes with high overflow, load, slot, escalation, velocity, or confidence strain.</div></div>
        <div class="metric"><span class="metric-label">Add or reorder</span><span class="metric-value">${executiveSummary.addOrReorderLanes}</span><div class="metric-copy">Lanes that already justify an extra slot or agenda reordering before more scope is approved.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to unresolved committee-throughput constraints.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Throughput lane</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible throughput exposures</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready committee-throughput surface for agenda load, decision slots, escalation turnover, and scheduling tradeoffs across the executive estate."
  );
}

export function renderThroughputLane() {
  const rows = throughputLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.throughputTheme)}</td>
        <td>${item.committeeMeetingsPerMonth}</td>
        <td>${item.decisionSlotsAvailable}</td>
        <td>${item.boardConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Throughput lane",
    "/throughput-lane",
    `<section class="hero">
      <span class="eyebrow">Throughput lane</span>
      <h1>Each lane stays tied to one throughput theme, one board audience, one scheduling action, and one safe next move.</h1>
      <p class="lede">The throughput lane keeps agenda pressure readable instead of hiding slot scarcity and sequencing tradeoffs across scattered committee packets.</p>
      <div class="nav">${navLinks("/throughput-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Throughput theme</th><th>Meetings / month</th><th>Slots</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Committee-throughput view showing actions, agenda pressure, and board-confidence strength."
  );
}

export function renderAgendaLedger() {
  const rows = agendaLedger()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.throughputHeadline)}</td>
        <td>${escapeHtml(item.agendaSignal)}</td>
        <td>${escapeHtml(item.escalationOwner)}</td>
        <td>${item.committeeMeetingsPerMonth}</td>
        <td>${item.decisionSlotsAvailable}</td>
        <td>${escapeHtml(item.requiredEvidence.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Agenda ledger",
    "/agenda-ledger",
    `<section class="hero">
      <span class="eyebrow">Agenda ledger</span>
      <h1>Throughput headlines, overflow signals, escalation owners, meeting counts, and required evidence stay visible before carryover becomes a board problem.</h1>
      <p class="lede">This view makes it obvious which committee bottlenecks are truly scheduling problems and who must respond before leadership funds more scope.</p>
      <div class="nav">${navLinks("/agenda-ledger")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Throughput headline</th><th>Agenda signal</th><th>Escalation owner</th><th>Meetings / month</th><th>Slots</th><th>Required evidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Agenda-ledger view for committee overflow, named escalation ownership, and decision-slot pressure."
  );
}

export function renderInterventionPosture() {
  const rows = interventionPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeThroughputRiskScore}</td>
        <td>${escapeHtml(item.overflow.severity)}</td>
        <td>${escapeHtml(item.committee.severity)}</td>
        <td>${escapeHtml(item.slots.severity)}</td>
        <td>${escapeHtml(item.escalation.severity)}</td>
        <td>${escapeHtml(item.boardConfidence.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Intervention posture",
    "/intervention-posture",
    `<section class="hero">
      <span class="eyebrow">Intervention posture</span>
      <h1>See where leadership should add slots, reorder agendas, escalate ownership, or defer asks before throughput strain distorts the board story.</h1>
      <p class="lede">This posture view keeps overflow risk and scheduling risk connected so leadership can intervene before committee drag compounds across adjacent lanes.</p>
      <div class="nav">${navLinks("/intervention-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Composite risk</th><th>Overflow</th><th>Committee</th><th>Slots</th><th>Escalation</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Intervention posture for committee-throughput severities, slot stress, and board-safe action."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this committee-throughput packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, scheduling assumptions, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Committee Throughput Scorecard sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Committee Throughput Scorecard docs</h1>
      <p class="lede">This surface packages board-readable committee-throughput signals into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/throughput-lane</code> keeps actions, throughput themes, and next moves readable.</li>
        <li><code>/agenda-ledger</code> compares overflow signals, slot pressure, and escalation ownership.</li>
        <li><code>/intervention-posture</code> shows which lanes should add, reorder, escalate, or defer.</li>
        <li><code>/api/payload</code> exposes the reproducible committee-throughput packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Committee Throughput Scorecard and its board-ready routes."
  );
}
