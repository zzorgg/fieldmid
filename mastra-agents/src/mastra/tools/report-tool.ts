import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const incidentSchema = z.object({
  id: z.string(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  status: z.enum(['open', 'escalated', 'acknowledged', 'resolved', 'closed']),
  tags: z.array(z.string()).default([]),
});

type Incident = z.infer<typeof incidentSchema>;

export const generateComplianceReportTool = createTool({
  id: 'generate-compliance-report',
  description: 'Generate a compact compliance report from incident data.',
  inputSchema: z.object({
    siteId: z.string(),
    incidents: z.array(incidentSchema),
  }),
  outputSchema: z.object({
    criticalCount: z.number().int(),
    unresolvedCount: z.number().int(),
    flaggedPatterns: z.array(z.string()),
    summary: z.string(),
  }),
  execute: async ({ context }) => {
    const incidents = context.incidents as Incident[];

    const criticalCount = incidents.filter(
      (incident: Incident) => incident.severity === 'CRITICAL',
    ).length;

    const unresolvedCount = incidents.filter(
      (incident: Incident) =>
        incident.status !== 'resolved' && incident.status !== 'closed',
    ).length;

    const hazardTagHits = incidents.filter((incident: Incident) =>
      incident.tags.some(
        (tag: string) => tag.includes('safety') || tag.includes('hazard'),
      ),
    ).length;

    const flaggedPatterns = [] as string[];
    if (criticalCount > 0) flaggedPatterns.push('critical-incidents-detected');
    if (hazardTagHits >= 3) flaggedPatterns.push('repeated-safety-pattern');

    return {
      criticalCount,
      unresolvedCount,
      flaggedPatterns,
      summary: `Site ${context.siteId}: ${criticalCount} critical and ${unresolvedCount} unresolved incidents.`,
    };
  },
});

export const buildShiftSummaryTool = createTool({
  id: 'build-shift-summary',
  description: 'Create shift-level metrics and summary text.',
  inputSchema: z.object({
    siteId: z.string(),
    shiftDate: z.string(),
    incidents: z.array(incidentSchema),
  }),
  outputSchema: z.object({
    totalIncidents: z.number().int(),
    criticalCount: z.number().int(),
    resolvedCount: z.number().int(),
    summaryText: z.string(),
  }),
  execute: async ({ context }) => {
    const incidents = context.incidents as Incident[];

    const totalIncidents = incidents.length;
    const criticalCount = incidents.filter(
      (incident: Incident) => incident.severity === 'CRITICAL',
    ).length;
    const resolvedCount = incidents.filter(
      (incident: Incident) =>
        incident.status === 'resolved' || incident.status === 'closed',
    ).length;

    return {
      totalIncidents,
      criticalCount,
      resolvedCount,
      summaryText: `Shift ${context.shiftDate} at ${context.siteId}: ${resolvedCount}/${totalIncidents} incidents resolved, ${criticalCount} critical.`,
    };
  },
});
