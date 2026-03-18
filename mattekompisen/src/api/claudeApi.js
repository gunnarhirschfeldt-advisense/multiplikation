const API_URL = 'https://api.anthropic.com/v1/messages';

function getApiKey() {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!key || key === 'din_nyckel_här') throw new Error('API_KEY_SAKNAS');
  return key;
}

async function anropa(systemprompt, userprompt, maxTokens) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': getApiKey(),
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system: systemprompt,
      messages: [{ role: 'user', content: userprompt }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API-fel ${response.status}: ${text}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? '';

  // Strip any accidental markdown fences
  const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  return JSON.parse(clean);
}

// ─── Anrop 1: Frågegenerering ─────────────────────────────────────────────────
const FRÅGE_SYSTEM = `Du är en mattelärare som skapar övningsuppgifter för åk 6 i Sverige.
Returnera ENDAST giltig JSON utan markdown eller förklaringar.
Följ exakt detta schema:
{
  "id": "generated_[timestamp]",
  "level": "E|C|A",
  "subtopic": "jämförelse|tallinje|omvandling|andel",
  "type": "multiple_choice|numeric|open",
  "question": "string",
  "options": ["string"] | null,
  "correct_answer": "string",
  "hint": "string",
  "evaluation_criteria": "string | null"
}`;

/**
 * @param {string}      userPrompt        – the dynamic user prompt
 * @param {string|null} customSystemPrompt – override the default system prompt
 *   (use this for modules with different question schemas, e.g. Geometri)
 */
export async function genereraFråga(userPrompt, customSystemPrompt = null) {
  const fråga = await anropa(customSystemPrompt ?? FRÅGE_SYSTEM, userPrompt, 600);
  if (!fråga.id || fråga.id === 'generated_[timestamp]') {
    fråga.id = `generated_${Date.now()}`;
  }
  return fråga;
}

// ─── Anrop 2: Svarsbedömning (open-frågor) ────────────────────────────────────
const BEDÖMNING_SYSTEM = `Du är en tålmodig mattelärare för åk 6 i Sverige.
Returnera ENDAST giltig JSON utan markdown:
{
  "correct": boolean,
  "feedback": "string (max 2 meningar, uppmuntrande, på svenska)",
  "hint": "string (konkret nästa steg om fel, tom sträng om rätt)",
  "mistakeSummary": "string (en mening om vad som verkar vara missförståndet, tom sträng om rätt)"
}`;

export async function bedömSvar({ question, correct_answer, evaluation_criteria, elevensSvar, recentMistakes }) {
  const mistakesText =
    recentMistakes && recentMistakes.length > 0
      ? recentMistakes.join('; ')
      : 'inga registrerade';

  const prompt = `Uppgift: ${question}
Rätt svar: ${correct_answer}
Bedömningskriterier: ${evaluation_criteria ?? 'Matematiskt korrekt svar'}
Elevsvar: ${elevensSvar}
Elevens tidigare misstag på detta subtopic: ${mistakesText}
Bedöm om resonemanget är matematiskt korrekt enligt kriterierna.
Om fel: fyll i mistakeSummary med vad som verkar vara kärnproblemet.`;

  return anropa(BEDÖMNING_SYSTEM, prompt, 400);
}
