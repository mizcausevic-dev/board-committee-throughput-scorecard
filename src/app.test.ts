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
});
