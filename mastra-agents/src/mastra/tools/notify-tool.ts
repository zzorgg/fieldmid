import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const draftEscalationMessageTool = createTool({
  id: 'draft-escalation-message',
  description: 'Create a concise escalation message for supervisors.',
  inputSchema: z.object({
    incidentId: z.string(),
    title: z.string(),
    aiSeverity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    aiSummary: z.string(),
  }),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async ({ context }) => {
    return {
      message: `[${context.aiSeverity}] Incident ${context.incidentId}: ${context.title}. ${context.aiSummary}`,
    };
  },
});

export const notifySupervisorTool = createTool({
  id: 'notify-supervisor',
  description: 'Simulate supervisor notifications for escalation routing.',
  inputSchema: z.object({
    supervisorId: z.string(),
    channel: z.enum(['email', 'slack', 'push']).default('email'),
    message: z.string(),
  }),
  outputSchema: z.object({
    delivered: z.boolean(),
    channel: z.enum(['email', 'slack', 'push']),
    receiptId: z.string(),
  }),
  execute: async ({ context }) => {
    const receiptId = `${context.channel}-${Date.now()}`;

    return {
      delivered: true,
      channel: context.channel,
      receiptId,
    };
  },
});
