import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { FIELDMIND_MODELS } from '../config/models';
import { draftEscalationMessageTool, notifySupervisorTool } from '../tools/notify-tool';

export const escalationAgent = new Agent({
  id: 'escalation-agent',
  name: 'FieldMind Escalation Agent',
  instructions: `
You handle supervisor escalation for high-risk incidents.

Rules:
- Draft a short escalation message with context.
- Use notifySupervisorTool for dispatch simulation.
- Prefer clear, urgent, non-verbose language.
- Include severity, impact, and immediate next action.
  `.trim(),
  model: FIELDMIND_MODELS.default,
  tools: {
    draftEscalationMessageTool,
    notifySupervisorTool,
  },
  memory: new Memory(),
});
