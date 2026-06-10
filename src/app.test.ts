import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-committee-throughput-scorecard app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Committee Throughput Scorecard");
  });

  it("serves the throughput lane route", async () => {
    const response = await request(app).get("/throughput-lane");
    expect(response.status).toBe(200);
  });

  it("serves the agenda ledger route", async () => {
    const response = await request(app).get("/agenda-ledger");
    expect(response.status).toBe(200);
  });

  it("serves the intervention posture route", async () => {
    const response = await request(app).get("/intervention-posture");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });

  it("serves every JSON evidence route", async () => {
    const routes = [
      "/api/dashboard/summary",
      "/api/throughput-lane",
      "/api/agenda-ledger",
      "/api/intervention-posture",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of routes) {
      const response = await request(app).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    }
  });

  it("returns 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown");
    expect(response.status).toBe(404);
  });
});
