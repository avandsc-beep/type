import { Counter } from 'counterapi'

export const runtime = 'nodejs'

const workspace = process.env.COUNTERAPI_WORKSPACE || 'avand-type'
const accessToken = process.env.COUNTERAPI_ACCESS_TOKEN

const counter = new Counter({
  workspace,
  ...(accessToken ? { accessToken } : {}),
  timeout: 5000,
})

function counterName(font) {
  return `download-${String(font).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

export async function GET(request) {
  const font = request.nextUrl.searchParams.get('font')
  if (!font) return Response.json({ error: 'Missing font' }, { status: 400 })

  try {
    const result = await counter.get(counterName(font))
    const count = Number(result?.data?.up_count ?? result?.data?.value ?? result?.value ?? 0)
    return Response.json({ count: Number.isFinite(count) ? count : 0 })
  } catch (error) {
    console.error('CounterAPI GET error:', error)
    return Response.json({ count: 0 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const font = body?.font
    if (!font) return Response.json({ error: 'Missing font' }, { status: 400 })

    const result = await counter.up(counterName(font))
    const count = Number(result?.data?.up_count ?? result?.data?.value ?? result?.value ?? 0)
    return Response.json({ ok: true, count: Number.isFinite(count) ? count : 0 })
  } catch (error) {
    console.error('CounterAPI POST error:', error)
    return Response.json({ ok: false, error: 'Counter unavailable' }, { status: 503 })
  }
}
