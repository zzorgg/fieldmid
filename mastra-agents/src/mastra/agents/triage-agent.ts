import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { FIELDMIND_MODELS } from '../config/models';
import { classifyIncidentTool } from '../tools/incident-tool';

export const triageAgent = new Agent({
  id: 'triage-agent',
  name: 'FieldMind Triage Agent',
  instructions: `
You triage incoming field incidents.

Rules:
- Always classify using the classifyIncidentTool.
- Keep responses concise and operational.
- If severity is HIGH or CRITICAL, clearly state escalation is required.
- Return practical action-focused language for supervisors.
  `.trim(),
  model: FIELDMIND_MODELS.default,
  tools: {
    classifyIncidentTool,
  },
  memory: new Memory(),
});
