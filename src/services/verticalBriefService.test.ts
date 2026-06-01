import { describe, expect, it } from "vitest";
import { agendaLedger, interventionPosture, payload, summary, throughputLane, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the throughput summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the throughput lane view", () => {
    expect(throughputLane().length).toBeGreaterThan(0);
  });

  it("returns the agenda ledger view", () => {
    expect(agendaLedger().length).toBeGreaterThan(0);
  });

  it("returns the intervention posture view", () => {
    expect(interventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
