import { writeFileSync } from "node:fs";
import { sampleBoardCommitteeThroughput } from "../src/data/sampleVerticalBrief.js";
import { toExport } from "../src/analyze.js";

const clean = sampleBoardCommitteeThroughput.map((item) => ({
  ...item,
  relatedSurfaces: [],
  companyTags: [],
  narrative: "[redacted]",
  nextMove: "[redacted]"
}));

writeFileSync("fixtures/board-committee-throughput-scorecard.json", JSON.stringify(toExport(sampleBoardCommitteeThroughput), null, 2));
writeFileSync("fixtures/board-committee-throughput-scorecard-clean.json", JSON.stringify(toExport(clean), null, 2));
