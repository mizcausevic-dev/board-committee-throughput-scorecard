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
});
