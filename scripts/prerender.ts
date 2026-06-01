import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderAgendaLedger,
  renderDocs,
  renderInterventionPosture,
  renderOverview,
  renderThroughputLane,
  renderVerification
} from "../src/services/render.js";
import { agendaLedger, interventionPosture, payload, riskMap, summary, throughputLane, verification } from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/throughput-lane", ["throughput-lane/index.html", renderThroughputLane()]],
  ["/agenda-ledger", ["agenda-ledger/index.html", renderAgendaLedger()]],
  ["/intervention-posture", ["intervention-posture/index.html", renderInterventionPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://throughput.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://throughput.kineticgain.com/</loc></url><url><loc>https://throughput.kineticgain.com/throughput-lane/</loc></url><url><loc>https://throughput.kineticgain.com/agenda-ledger/</loc></url><url><loc>https://throughput.kineticgain.com/intervention-posture/</loc></url><url><loc>https://throughput.kineticgain.com/verification/</loc></url><url><loc>https://throughput.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/throughput-lane.json": throughputLane(),
  "api/agenda-ledger.json": agendaLedger(),
  "api/intervention-posture.json": interventionPosture(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
