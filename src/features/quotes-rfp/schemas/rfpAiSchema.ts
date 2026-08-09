import { z } from 'zod'

export const rfpAnalysisSchema = z.object({
  // Phase 1A Core Metrics
  leadScore: z.number().int().min(0).max(100),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  projectComplexity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  executiveSummary: z.string().min(1, 'Executive summary is required.'),
  keyRequirements: z.array(z.string()),
  missingInformation: z.array(z.string()),
  riskFactors: z.array(z.string()),
  recommendedQuestions: z.array(z.string()),

  // Phase 1B Lead Prioritization & Scoring Metrics
  opportunityScore: z.number().int().min(0).max(100),
  riskScore: z.number().int().min(0).max(100),
  priorityScore: z.number().int().min(0).max(100),
  priorityLevel: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
  recommendedAction: z.enum([
    'CONTACT_IMMEDIATELY',
    'PRIORITIZE_REVIEW',
    'REQUEST_INFORMATION',
    'STANDARD_REVIEW',
    'DEFER',
  ]),
  priorityReason: z.string().min(1, 'Priority reason explanation is required.'),
  keyPositiveFactors: z.array(z.string()).optional().default([]),
  recommendedNextSteps: z.array(z.string()).optional().default([]),
})

export type RfpAnalysisResult = z.infer<typeof rfpAnalysisSchema>
