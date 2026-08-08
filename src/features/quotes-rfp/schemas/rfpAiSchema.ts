import { z } from 'zod'

export const rfpAnalysisSchema = z.object({
  leadScore: z.number().int().min(0).max(100),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  projectComplexity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  executiveSummary: z.string().min(1, 'Executive summary is required.'),
  keyRequirements: z.array(z.string()),
  missingInformation: z.array(z.string()),
  riskFactors: z.array(z.string()),
  recommendedNextAction: z.enum([
    'CONTACT_CLIENT',
    'REQUEST_MORE_INFORMATION',
    'PRIORITIZE_FOR_REVIEW',
    'STANDARD_REVIEW',
  ]),
  recommendedQuestions: z.array(z.string()),
})

export type RfpAnalysisResult = z.infer<typeof rfpAnalysisSchema>
