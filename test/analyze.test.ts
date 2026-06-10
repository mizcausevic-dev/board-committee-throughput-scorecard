import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardCommitteeThroughput } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardCommitteeThroughput, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardCommitteeThroughput.length);
  });

  it("counts constrained lanes", () => {
    const report = analyze(sampleBoardCommitteeThroughput, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.constrainedLanes).toBeGreaterThan(0);
  });

  it("counts add or reorder actions", () => {
    const report = analyze(sampleBoardCommitteeThroughput, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.addOrReorderLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardCommitteeThroughput, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(157);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardCommitteeThroughput, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("describes an aligned committee when no lanes are constrained", () => {
    const healthyItems = sampleBoardCommitteeThroughput.slice(0, 2).map((item) => ({
      ...item,
      agendaOverflowRate: 8,
      committeeLoadScore: 30,
      slotCoverageScore: 90,
      escalationTurnoverScore: 88,
      decisionVelocityScore: 86,
      boardConfidenceScore: 91
    }));

    const report = analyze(healthyItems, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.constrainedLanes).toBe(0);
    expect(report.summary.leadingMessage).toContain("remains aligned");
  });

  it("describes a narrow pressure band when only a few lanes are constrained", () => {
    const mixedItems = sampleBoardCommitteeThroughput.slice(0, 3).map((item, index) => ({
      ...item,
      agendaOverflowRate: index === 0 ? 42 : 8,
      committeeLoadScore: index === 1 ? 70 : 30,
      slotCoverageScore: 90,
      escalationTurnoverScore: 88,
      decisionVelocityScore: 86,
      boardConfidenceScore: 91
    }));

    const report = analyze(mixedItems, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.constrainedLanes).toBe(2);
    expect(report.summary.leadingMessage).toContain("A few lanes");
  });
});
