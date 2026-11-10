import { groq } from '@ai-sdk/groq'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'

// Allow streaming responses up to 30s
export const maxDuration = 30

const SYSTEM_PROMPT = `You are UniDuck 🦆, a friendly, clever CS50-style rubber duck AI tutor for university students.
RULES:
1. NEVER give full code solutions, direct homework answers, or write essays for the student.
2. Use the Socratic Method: break their problem down, explain the underlying concept simply, and ask a guiding question so they figure out the next step themselves.
3. If they share buggy code, point them toward the logic error or line and ask what they think is happening there.
4. Keep responses concise, well-formatted with Markdown, and encouraging. Occasionally include a subtle duck pun ('Quack!').`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const result = streamText({
    model: groq('openai/gpt-oss-120b'),
    system: SYSTEM_PROMPT,
    messages,
    onError: ({ error }) => {
      console.error('[UniDuck API] streamText error:', error)
    },
  })

  return result.toDataStreamResponse({
    getErrorMessage: (err) => {
      console.error('[UniDuck API] stream error:', err)
      return err instanceof Error ? err.message : 'Unknown error'
    },
  })
}
