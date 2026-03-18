export default {
  async fetch(request, env) {
    // Tillåt bara POST
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204);
    }
    if (request.method !== 'POST') {
      return corsResponse(JSON.stringify({ error: 'Method not allowed' }), 405);
    }
    // Enkel ursprungskontroll — byt ut mot din faktiska GitHub Pages-URL
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN; // sätts som Worker-secret
    if (allowed && origin !== allowed) {
      return corsResponse(JSON.stringify({ error: 'Forbidden' }), 403);
    }
    try {
      const body = await request.json();
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return corsResponse(JSON.stringify(data), response.status);
    } catch (err) {
      return corsResponse(JSON.stringify({ error: 'Proxy error', detail: err.message }), 500);
    }
  }
};

function corsResponse(body, status) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}
