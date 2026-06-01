import type {
  BoardCommitteeThroughputExport,
  BoardCommitteeThroughputItem,
  BoardCommitteeThroughputReportItem,
  ThroughputAssessment,
  ThroughputSeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): ThroughputAssessment {
  let severity: ThroughputSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): ThroughputAssessment {
  let severity: ThroughputSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardCommitteeThroughputItem[],
  options: { now?: string } = {}
): BoardCommitteeThroughputExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardCommitteeThroughputReportItem[] = items.map((item) => {
    const overflowAssessment = assessDelay(
      item.agendaOverflowRate,
      18,
      32,
      "Agenda overflow remains inside the current committee planning window.",
      "Agenda overflow is rising and will start to push decisions into later meetings.",
      "Agenda overflow is now materially constraining the next board-safe decision window."
    );

    const committeeAssessment = assessDelay(
      item.committeeLoadScore,
      42,
      58,
      "Committee load remains inside the current operating band.",
      "Committee load is rising and needs better ordering or extra slots soon.",
      "Committee load is now exceeding practical throughput and distorting decision timing."
    );

    const slotAssessment = assessStrength(
      item.slotCoverageScore,
      76,
      60,
      "Decision-slot coverage is strong enough to support the current agenda.",
      "Decision-slot coverage is thinning and needs tighter prioritization.",
      "Decision-slot coverage is too weak to support the current board queue."
    );

    const escalationAssessment = assessStrength(
      item.escalationTurnoverScore,
      78,
      62,
      "Escalation turnover is strong enough to keep committee follow-ups moving.",
      "Escalation turnover is becoming uneven and needs stronger follow-up ownership.",
      "Escalation turnover is too weak to clear committee carryover safely."
    );

    const velocityAssessment = assessStrength(
      item.decisionVelocityScore,
      75,
      58,
      "Decision velocity remains strong enough to keep committee actions moving.",
      "Decision velocity is getting patchy and may soon require reprioritization.",
      "Decision velocity is too weak to sustain clean board-facing sequencing."
    );

    const confidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains clear enough to support the current committee cadence.",
      "Board confidence is becoming dependent on extra explanation and agenda triage.",
      "Board confidence is too thin to support the current committee pace without intervention."
    );

    const compositeThroughputRiskScore =
      Math.round(
        ((item.agendaOverflowRate * 2 +
          item.committeeLoadScore +
          (100 - item.slotCoverageScore) +
          (100 - item.escalationTurnoverScore) +
          (100 - item.decisionVelocityScore) +
          (100 - item.boardConfidenceScore)) /
          7) *
          10
      ) / 10;

    return {
      ...item,
      overflowAssessment,
      committeeAssessment,
      slotAssessment,
      escalationAssessment,
      velocityAssessment,
      confidenceAssessment,
      compositeThroughputRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.overflowAssessment.severity === "HIGH" ||
      item.committeeAssessment.severity === "HIGH" ||
      item.slotAssessment.severity === "HIGH" ||
      item.escalationAssessment.severity === "HIGH" ||
      item.velocityAssessment.severity === "HIGH" ||
      item.confidenceAssessment.severity === "HIGH"
  ).length;

  const addOrReorderLanes = reportItems.filter(
    (item) => item.action === "ADD_SLOT" || item.action === "REORDER"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Committee throughput remains aligned with the current board agenda and does not require schedule changes."
      : constrainedLanes <= 2
        ? "A few lanes are accumulating enough agenda pressure to justify board-visible slot changes or reordering."
        : "Committee throughput is now a shared operating constraint across multiple lanes and needs explicit scheduling intervention.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      addOrReorderLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardCommitteeThroughputItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
