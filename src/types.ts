export type CommitteeThroughputTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type CommitteeAction = "ADD_SLOT" | "REORDER" | "ESCALATE" | "DEFER";

export type ThroughputSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardCommitteeThroughputItem {
  id: string;
  lane: string;
  track: CommitteeThroughputTrack;
  action: CommitteeAction;
  throughputTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  throughputHeadline: string;
  agendaSignal: string;
  escalationOwner: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  committeeMeetingsPerMonth: number;
  decisionSlotsAvailable: number;
  agendaOverflowRate: number;
  committeeLoadScore: number;
  slotCoverageScore: number;
  escalationTurnoverScore: number;
  decisionVelocityScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface ThroughputAssessment {
  severity: ThroughputSeverity;
  ok: boolean;
  message: string;
}

export interface BoardCommitteeThroughputReportItem extends BoardCommitteeThroughputItem {
  overflowAssessment: ThroughputAssessment;
  committeeAssessment: ThroughputAssessment;
  slotAssessment: ThroughputAssessment;
  escalationAssessment: ThroughputAssessment;
  velocityAssessment: ThroughputAssessment;
  confidenceAssessment: ThroughputAssessment;
  compositeThroughputRiskScore: number;
}

export interface BoardCommitteeThroughputSummary {
  items: number;
  constrainedLanes: number;
  addOrReorderLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardCommitteeThroughputExport {
  generatedAt: string;
  summary: BoardCommitteeThroughputSummary;
  items: BoardCommitteeThroughputReportItem[];
}

export interface BoardCommitteeThroughputPayload {
  report: BoardCommitteeThroughputExport;
  throughputLane: ReturnType<typeof import("./services/verticalBriefService.js").throughputLane>;
  agendaLedger: ReturnType<typeof import("./services/verticalBriefService.js").agendaLedger>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardCommitteeThroughputItem[];
}
