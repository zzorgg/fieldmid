import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { FIELDMIND_MODELS } from '../config/models';
import { buildShiftSummaryTool } from '../tools/report-tool';

export const summaryAgent = new Agent({
  id: 'summary-agent',
  name: 'FieldMind Summary Agent',
  instructions: `
You generate concise end-of-shift summaries.

Rules:
- Use buildShiftSummaryTool for metrics.
- Prioritize status, critical count, and resolution progress.
- Keep summary clear and management-ready.
  `.trim(),
  model: FIELDMIND_MODELS.default,
  tools: {
    buildShiftSummaryTool,
  },
  memory: new Memory(),
});
