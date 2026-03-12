import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const severityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

const classifyIncidentInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  voiceTranscript: z.string().optional(),
});

const classifyIncidentOutputSchema = z.object({
  aiSeverity: severityEnum,
  riskScore: z.number().int().min(0).max(100),
  tags: z.array(z.string()),
  escalationNeeded: z.boolean(),
  summary: z.string(),
});

const CRITICAL_KEYWORDS = ['gas leak', 'fire', 'explosion', 'collapse'];
const HIGH_KEYWORDS = ['pressure', 'smoke', 'electrical', 'spill'];

function scoreIncident(text: string) {
  const normalized = text.toLowerCase();

  const hasCritical = CRITICAL_KEYWORDS.some((keyword) =>
    normalized.includes(keyword),
  );
  const hasHigh = HIGH_KEYWORDS.some((keyword) => normalized.includes(keyword));

  if (hasCritical) {
    return {
      aiSeverity: 'CRITICAL' as const,
      riskScore: 95,
      tags: ['safety', 'immediate-response'],
      escalationNeeded: true,
    };
  }

  if (hasHigh) {
    return {
      aiSeverity: 'HIGH' as const,
      riskScore: 75,
      tags: ['safety', 'urgent-review'],
      escalationNeeded: true,
    };
  }

  if (normalized.length > 140) {
    return {
      aiSeverity: 'MEDIUM' as const,
      riskScore: 45,
      tags: ['operations', 'needs-review'],
      escalationNeeded: false,
    };
  }

  return {
    aiSeverity: 'LOW' as const,
    riskScore: 20,
    tags: ['operations'],
    escalationNeeded: false,
  };
}

export const classifyIncidentTool = createTool({
  id: 'classify-incident',
  description: 'Classify field incidents and produce escalation metadata.',
  inputSchema: classifyIncidentInputSchema,
  outputSchema: classifyIncidentOutputSchema,
  execute: async ({ context }) => {
    const fullText = [context.title, context.description, context.voiceTranscript]
      .filter(Boolean)
      .join(' | ');

    const result = scoreIncident(fullText);

    return {
      ...result,
      summary: `${context.title}: ${result.aiSeverity} severity with risk score ${result.riskScore}.`,
    };
  },
});
