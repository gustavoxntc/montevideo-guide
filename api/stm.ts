/**
 * Vercel Edge Function — proxy para la API STM de Montevideo
 * Maneja la autenticación OAuth2 (Client Credentials) server-side
 * para evitar exponer credenciales en el frontend y resolver problemas de CORS.
 */

export const config = { runtime: 'edge' }

const TOKEN_URL =
  'https://mvdapi-auth.montevideo.gub.uy/auth/realms/pci/protocol/openid-connect/token'
const STM_BASE = 'https://api.montevideo.gub.uy/api/transportepublico'

async function getAccessToken(): Promise<string> {
  const clientId = process.env.STM_CLIENT_ID ?? '69ed5b19'
  const clientSecret = process.env.STM_CLIENT_SECRET ?? '891dfbfc3611ebc34e903388a292fef3'

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!res.ok) {
    throw new Error(`Token request failed: ${res.status}`)
  }

  const data = await res.json() as { access_token: string }
  return data.access_token
}

export default async function handler(request: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  const url = new URL(request.url)

  // ?endpoint=buses&lines=121  o  ?endpoint=buses/busstops/12345/upcomingbuses
  const endpoint = url.searchParams.get('endpoint') ?? 'buses'
  url.searchParams.delete('endpoint')

  // Construir URL de la API STM con los query params restantes
  const stmUrl = new URL(`${STM_BASE}/${endpoint}`)
  url.searchParams.forEach((value, key) => {
    stmUrl.searchParams.set(key, value)
  })

  try {
    const token = await getAccessToken()

    const stmRes = await fetch(stmUrl.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!stmRes.ok) {
      return new Response(
        JSON.stringify({ error: `STM API error: ${stmRes.status}` }),
        { status: stmRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const data = await stmRes.text()

    return new Response(data, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=25, stale-while-revalidate=60',
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
}
