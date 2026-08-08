import { AIProvider, AIProviderName, StructuredOutputOptions, TextOutputOptions } from './types'

export class HuggingFaceProvider implements AIProvider {
  readonly name: AIProviderName = 'huggingface'

  private getApiKey(): string {
    const token = process.env.HF_TOKEN
    if (!token || token.trim() === '' || token.includes('YOUR_HF_TOKEN')) {
      throw new Error('HF_TOKEN environment variable is missing or unconfigured.')
    }
    return token
  }

  private getModel(): string {
    return process.env.HF_MODEL || 'meta-llama/Llama-3.3-70B-Instruct'
  }

  async generateStructuredOutput<T>(options: StructuredOutputOptions<T>): Promise<T> {
    const token = this.getApiKey()
    const model = this.getModel()

    const messages = []
    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt })
    }
    messages.push({ role: 'user', content: options.userPrompt })

    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
      console.error('Hugging Face Provider HTTP Error:', response.status, errorText)
      throw new Error(`Hugging Face Router returned status ${response.status}: ${errorText}`)
    }

    const json = await response.json()
    const content = json.choices?.[0]?.message?.content
    if (!content) {
      throw new Error('Hugging Face Provider returned empty response content.')
    }

    const parsedJson = JSON.parse(content)
    return options.schema.parse(parsedJson)
  }

  async generateText(options: TextOutputOptions): Promise<string> {
    const token = this.getApiKey()
    const model = this.getModel()

    const messages = []
    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt })
    }
    messages.push({ role: 'user', content: options.userPrompt })

    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.3,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Hugging Face Provider HTTP Error:', response.status, errorText)
      throw new Error(`Hugging Face Router returned status ${response.status}: ${errorText}`)
    }

    const json = await response.json()
    const content = json.choices?.[0]?.message?.content
    if (!content) {
      throw new Error('Hugging Face Provider returned empty text content.')
    }

    return content.trim()
  }
}
