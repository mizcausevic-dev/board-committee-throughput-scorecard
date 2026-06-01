import { analyze } from "../analyze.js";
import { sampleBoardCommitteeThroughput } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardCommitteeThroughput, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Add AI and biotech decision slots first, reorder identity and procurement agendas second, and defer FinTech queue growth until committee throughput catches up."
  };
}

export function throughputLane() {
  return sampleBoardCommitteeThroughput.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    throughputTheme: item.throughputTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    committeeMeetingsPerMonth: item.committeeMeetingsPerMonth,
    decisionSlotsAvailable: item.decisionSlotsAvailable
  }));
}

export function agendaLedger() {
  return sampleBoardCommitteeThroughput.map((item) => ({
    lane: item.lane,
    throughputHeadline: item.throughputHeadline,
    agendaSignal: item.agendaSignal,
    escalationOwner: item.escalationOwner,
    requiredEvidence: item.requiredEvidence,
    committeeMeetingsPerMonth: item.committeeMeetingsPerMonth,
    decisionSlotsAvailable: item.decisionSlotsAvailable
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeThroughputRiskScore: item.compositeThroughputRiskScore,
    overflow: item.overflowAssessment,
    committee: item.committeeAssessment,
    slots: item.slotAssessment,
    escalation: item.escalationAssessment,
    velocity: item.velocityAssessment,
    boardConfidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeThroughputRiskScore: item.compositeThroughputRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic committee-throughput data only - no live committee calendars, actual board agendas, or real decision packets are included.",
    "Scores are modeled to show how Kinetic Gain can turn agenda pressure and decision-slot scarcity into board-readable scheduling tradeoffs.",
    "All routes are read-only and demonstrate committee-throughput packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    throughputLane: throughputLane(),
    agendaLedger: agendaLedger(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardCommitteeThroughput
  };
}
