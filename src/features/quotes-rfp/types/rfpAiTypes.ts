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
}
