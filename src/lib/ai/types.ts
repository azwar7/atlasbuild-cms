import { z } from 'zod'

export type AIProviderName = 'openai' | 'gemini' | 'huggingface'

export interface StructuredOutputOptions<T> {
  systemPrompt: string
  userPrompt: string
  schema: z.ZodType<T>
  temperature?: number
}

export interface TextOutputOptions {
  systemPrompt?: string
  userPrompt: string
  temperature?: number
}

export interface AIProvider {
  readonly name: AIProviderName
  
  /**
   * Generates a response guaranteed and validated against a Zod schema.
   */
  generateStructuredOutput<T>(options: StructuredOutputOptions<T>): Promise<T>
  
  /**
   * Generates standard text response from the model.
   */
  generateText(options: TextOutputOptions): Promise<string>
}
