import { Counter } from 'counterapi'
import { fonts, counterKey } from '../../../lib/fonts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const workspace = process.env.COUNTERAPI_WORKSPACE || 'avand-type'
const accessToken = process.env.COUNTERAPI_ACCESS_TOKEN

const counter = new Counter({
  workspace,
  ...(accessToken ? { accessToken } : {}),
  timeout: 5000,
})

// CounterAPI ha devuelto el valor en distintos campos según la versión.
function readCount(result) {
  const n = Number(result?.data?.up_count ?? result?.data?.value ?? result?.value ?? 0)
  return Number.isFinite(n) ? n : 0
}

// GET /api/download → { counts: { '001': 12, '002': 3, ... } }  (una sola llamada para toda la página)
export async function GET() {
  const entries = await Promise.all(
    fonts.map(async (font) => {
      try {
        return [font.id, readCount(await counter.get(counterKey(font.name)))]
      } catch {
        return [font.id, 0]
      }
    })
  )
  return Response.json(
    { counts: Object.fromEntries(entries) },
    { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=300' } }
  )
}

// POST /api/download  { id: '001' } → suma una descarga. Solo acepta ids que existen en el archivo.
export async function POST(request) {
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get('host')) {
        return Response.json({ ok: false, error: 'Forbidden' }, { status: 403 })
      }
    } catch {
      return Response.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const font = fonts.find((f) => f.id === body?.id)
  if (!font) return Response.json({ ok: false, error: 'Unknown font' }, { status: 400 })

  try {
    const result = await counter.up(counterKey(font.name))
    return Response.json({ ok: true, count: readCount(result) })
  } catch (error) {
    console.error('CounterAPI POST error:', error)
    return Response.json({ ok: false, error: 'Counter unavailable' }, { status: 503 })
  }
}
