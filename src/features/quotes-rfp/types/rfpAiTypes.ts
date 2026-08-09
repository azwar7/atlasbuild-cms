import { RfpAnalysisResult } from '../schemas/rfpAiSchema'

export interface AnalyzeRfpOptions {
  forceReanalyze?: boolean
}

export interface RfpAiAnalysisResponse {
  analysis: RfpAnalysisResult
  analyzedAt: string
  version: string
  cached: boolean
  providerUsed?: string
  priorityLevel?: string
  priorityScore?: number
  opportunityScore?: number
  riskScore?: number
  recommendedAction?: string
  humanPriority?: string | null
}
