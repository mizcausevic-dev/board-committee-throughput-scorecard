import { describe, expect, it } from "vitest";
import {
  renderAgendaLedger,
  renderDocs,
  renderInterventionPosture,
  renderOverview,
  renderThroughputLane,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderOverview()).toContain("Board Committee Throughput Scorecard");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });

  it("renders every public route with shared proof-depth modules", () => {
    const routes = [
      renderOverview(),
      renderThroughputLane(),
      renderAgendaLedger(),
      renderInterventionPosture(),
      renderVerification(),
      renderDocs()
    ];

    for (const html of routes) {
      expect(html).toContain("Product depth");
      expect(html).toContain("What these repos have in common");
      expect(html).toContain("portfolio.kineticgain.com");
      expect(html).toContain("GitHub");
    }
  });
});
