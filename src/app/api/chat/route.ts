import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URL =
  process.env.N8N_CHAT_WEBHOOK_URL ||
  'https://rachid1model.app.n8n.cloud/webhook/taxfinalization-chat'

const MAX_MESSAGE_LENGTH = 2000

type JsonRecord = Record<string, unknown>

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function findReply(payload: unknown): string | null {
  if (typeof payload === 'string' && payload.trim()) return payload.trim()

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const reply = findReply(item)
      if (reply) return reply
    }
    return null
  }

  if (!isRecord(payload)) return null

  for (const key of ['reply', 'output', 'text', 'answer', 'message']) {
    const value = payload[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }

  for (const key of ['data', 'result', 'response']) {
    const reply = findReply(payload[key])
    if (reply) return reply
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as JsonRecord
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const sessionId =
      typeof body.sessionId === 'string' ? body.sessionId.slice(0, 160) : ''

    if (!message) {
      return NextResponse.json({ error: 'Please enter a message.' }, { status: 400 })
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
        { status: 400 }
      )
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Unable to start a chat session. Please refresh and try again.' },
        { status: 400 }
      )
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId,
        timestamp:
          typeof body.timestamp === 'string'
            ? body.timestamp
            : new Date().toISOString(),
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(25000),
    })

    const rawResponse = await response.text()
    let payload: unknown = rawResponse

    try {
      payload = rawResponse ? JSON.parse(rawResponse) : null
    } catch {
      // Plain-text n8n responses are supported by findReply.
    }

    if (!response.ok) {
      console.error('Chat webhook error:', response.status, rawResponse.slice(0, 500))
      return NextResponse.json(
        { error: 'The AI assistant is temporarily unavailable. Please try again shortly.' },
        { status: 503 }
      )
    }

    const reply = findReply(payload)
    if (!reply) {
      console.error('Chat webhook returned no usable reply:', rawResponse.slice(0, 500))
      return NextResponse.json(
        { error: 'The assistant returned an empty response. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat proxy error:', error)

    const isTimeout =
      error instanceof DOMException &&
      (error.name === 'TimeoutError' || error.name === 'AbortError')

    return NextResponse.json(
      {
        error: isTimeout
          ? 'The assistant took too long to respond. Please try again.'
          : 'Unable to connect to the AI assistant. Please try again.',
      },
      { status: isTimeout ? 504 : 500 }
    )
  }
}
