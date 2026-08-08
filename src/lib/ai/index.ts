import { AIProvider, AIProviderName } from './types'
import { OpenAIProvider } from './openai'
import { GeminiProvider } from './gemini'
import { HuggingFaceProvider } from './huggingface'

export * from './types'
export { OpenAIProvider } from './openai'
export { GeminiProvider } from './gemini'
export { HuggingFaceProvider } from './huggingface'

/**
 * Factory function to retrieve the active AI Provider based on process.env.AI_PROVIDER
 * or an explicit override parameter.
 */
export function getAIProvider(overrideProvider?: string): AIProvider {
  const providerName = (overrideProvider || process.env.AI_PROVIDER || 'openai').toLowerCase().trim()

  switch (providerName) {
    case 'gemini':
      return new GeminiProvider()
    case 'huggingface':
    case 'hf':
      return new HuggingFaceProvider()
    case 'openai':
    default:
      return new OpenAIProvider()
  }
}
