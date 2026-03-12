import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

const workflowInputSchema = z.object({
  incidentId: z.string(),
  title: z.string(),
  aiSeverity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  aiSummary: z.string(),
  supervisorId: z.string(),
  channel: z.enum(['email', 'slack', 'push']).default('email'),
});

const messageSchema = z.object({
  incidentId: z.string(),
  supervisorId: z.string(),
  channel: z.enum(['email', 'slack', 'push']),
  message: z.string(),
  aiSeverity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
});

const prepareEscalationStep = createStep({
  id: 'prepare-escalation',
  description: 'Prepares escalation payload from incident details.',
  inputSchema: workflowInputSchema,
  outputSchema: messageSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Escalation input is required');
    }

    return {
      incidentId: inputData.incidentId,
      supervisorId: inputData.supervisorId,
      channel: inputData.channel,
      aiSeverity: inputData.aiSeverity,
      message: `[${inputData.aiSeverity}] Incident ${inputData.incidentId}: ${inputData.title}. ${inputData.aiSummary}`,
    };
  },
});

const dispatchEscalationStep = createStep({
  id: 'dispatch-escalation',
  description: 'Dispatches escalation and returns delivery status.',
  inputSchema: messageSchema,
  outputSchema: z.object({
    escalationId: z.string(),
    status: z.enum(['skipped', 'sent']),
    incidentId: z.string(),
    supervisorId: z.string(),
    channel: z.enum(['email', 'slack', 'push']),
    message: z.string(),
  }),
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Prepared escalation payload is required');
    }

    if (inputData.aiSeverity === 'LOW' || inputData.aiSeverity === 'MEDIUM') {
      return {
        escalationId: `skip-${Date.now()}`,
        status: 'skipped' as const,
        incidentId: inputData.incidentId,
        supervisorId: inputData.supervisorId,
        channel: inputData.channel,
        message: inputData.message,
      };
    }

    return {
      escalationId: `esc-${Date.now()}`,
      status: 'sent' as const,
      incidentId: inputData.incidentId,
      supervisorId: inputData.supervisorId,
      channel: inputData.channel,
      message: inputData.message,
    };
  },
});

export const escalationWorkflow = createWorkflow({
  id: 'fieldmind-escalation-workflow',
  inputSchema: workflowInputSchema,
  outputSchema: z.object({
    escalationId: z.string(),
    status: z.enum(['skipped', 'sent']),
    incidentId: z.string(),
    supervisorId: z.string(),
    channel: z.enum(['email', 'slack', 'push']),
    message: z.string(),
  }),
})
  .then(prepareEscalationStep)
  .then(dispatchEscalationStep);

escalationWorkflow.commit();
