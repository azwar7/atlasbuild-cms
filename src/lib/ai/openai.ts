import { AIProvider, AIProviderName, StructuredOutputOptions, TextOutputOptions } from './types'

export class OpenAIProvider implements AIProvider {
  readonly name: AIProviderName = 'openai'

  private getApiKey(): string {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_API_KEY')) {
      throw new Error('OPENAI_API_KEY environment variable is missing or unconfigured.')
    }
    return apiKey
  }

  private getModel(): string {
    return process.env.OPENAI_MODEL || 'gpt-4o'
  }

  async generateStructuredOutput<T>(options: StructuredOutputOptions<T>): Promise<T> {
    const apiKey = this.getApiKey()
    const model = this.getModel()

    const messages = []
    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt })
    }
    messages.push({ role: 'user', content: options.userPrompt })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        response_format: { type: 'json_object' },
        temperature: options.temperature ?? 0.2,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI Provider HTTP Error:', response.status, errorText)
      throw new Error(`OpenAI API returned status ${response.status}: ${errorText}`)
    }

    const json = await response.json()
    const content = json.choices?.[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI Provider returned empty response content.')
    }

    const parsedJson = JSON.parse(content)
    return options.schema.parse(parsedJson)
  }

  async generateText(options: TextOutputOptions): Promise<string> {
    const apiKey = this.getApiKey()
    const model = this.getModel()

    const messages = []
    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt })
    }
    messages.push({ role: 'user', content: options.userPrompt })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.3,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI Provider HTTP Error:', response.status, errorText)
      throw new Error(`OpenAI API returned status ${response.status}: ${errorText}`)
    }

    const json = await response.json()
    const content = json.choices?.[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI Provider returned empty text content.')
    }

    return content.trim()
  }
}
