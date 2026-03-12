import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { FIELDMIND_MODELS } from '../config/models';
import { generateComplianceReportTool } from '../tools/report-tool';

export const complianceAgent = new Agent({
  id: 'compliance-agent',
  name: 'FieldMind Compliance Agent',
  instructions: `
You audit incidents against compliance expectations.

Rules:
- Use generateComplianceReportTool to compute report metrics.
- Focus on critical and unresolved incident risk.
- Keep the output short and suitable for supervisor review.
  `.trim(),
  model: FIELDMIND_MODELS.default,
  tools: {
    generateComplianceReportTool,
  },
  memory: new Memory(),
});
