import { GoogleGenAI } from '@google/genai'
import { AIProvider, AIProviderName, StructuredOutputOptions, TextOutputOptions } from './types'

export class GeminiProvider implements AIProvider {
  readonly name: AIProviderName = 'gemini'

  private getApiKey(): string {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_API_KEY')) {
      throw new Error('GEMINI_API_KEY environment variable is missing or unconfigured.')
    }
    return apiKey
  }

  private getModel(): string {
    return process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  }

  private getClient(): GoogleGenAI {
    const apiKey = this.getApiKey()
    return new GoogleGenAI({ apiKey })
  }

  async generateStructuredOutput<T>(options: StructuredOutputOptions<T>): Promise<T> {
    const ai = this.getClient()
    const model = this.getModel()

    try {
      const response = await ai.models.generateContent({
        model,
        contents: options.userPrompt,
        config: {
          systemInstruction: options.systemPrompt || undefined,
          responseMimeType: 'application/json',
          temperature: options.temperature ?? 0.2,
        },
      })

      const text = response.text
      if (!text) {
        throw new Error('Gemini Provider returned empty output.')
      }

      const parsedJson = JSON.parse(text)
      return options.schema.parse(parsedJson)
    } catch (error: any) {
      console.error('Gemini Provider Error:', error.message || error)
      throw new Error(`Gemini Provider generation failed: ${error.message || error}`)
    }
  }

  async generateText(options: TextOutputOptions): Promise<string> {
    const ai = this.getClient()
    const model = this.getModel()

    try {
      const response = await ai.models.generateContent({
        model,
        contents: options.userPrompt,
        config: {
          systemInstruction: options.systemPrompt || undefined,
          temperature: options.temperature ?? 0.3,
        },
      })

      const text = response.text
      if (!text) {
        throw new Error('Gemini Provider returned empty text content.')
      }

      return text.trim()
    } catch (error: any) {
      console.error('Gemini Provider Error:', error.message || error)
      throw new Error(`Gemini Provider generation failed: ${error.message || error}`)
    }
  }
}
