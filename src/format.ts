import type { BoardCommitteeThroughputExport } from "./types.js";

export function formatSummary(report: BoardCommitteeThroughputExport) {
  return [
    "Board Committee Throughput Scorecard",
    `Generated: ${report.generatedAt}`,
    `Lanes: ${report.summary.items}`,
    `Constrained lanes: ${report.summary.constrainedLanes}`,
    `Add or reorder lanes: ${report.summary.addOrReorderLanes}`,
    `Average board confidence: ${report.summary.averageBoardConfidence}`,
    `Value at stake: $${report.summary.valueAtStakeMillions}M`,
    `Lead: ${report.summary.leadingMessage}`
  ].join("\n");
}

export function formatJson(report: BoardCommitteeThroughputExport) {
  return JSON.stringify(report, null, 2);
}
