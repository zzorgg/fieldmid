export const FIELDMIND_MODELS = {
  default: [
    {
      model: 'cerebras/gpt-oss-120b',
      maxRetries: 1,
    },
    {
      model: 'cerebras/llama3.1-8b',
      maxRetries: 1,
    },
  ],
} as const;
