const PROXY_URL = import.meta.env.VITE_PROXY_URL;

async function anropa(systemprompt, userprompt, maxTokens) {
  const response = await fetch(`${PROXY_URL}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
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
// Används som fallback om ingen systemPrompt skickas från modulen
const BEDÖMNING_SYSTEM_FALLBACK = `Du är en tålmodig mattelärare för åk 6 i Sverige.
Returnera ENDAST giltig JSON utan markdown:
{
  "correct": boolean,
  "feedback": "string (max 3 meningar, uppmuntrande, på svenska)",
  "hint": "string eller null"
}`;

export async function bedömSvar({ question, correct_answer, evaluation_criteria, elevensSvar, recentMistakes, level, systemPrompt = null }) {
  const userMessage = `
Fråga: ${question}
Rätt svar / bedömningskriterier: ${evaluation_criteria || correct_answer}
Elevens nivå: ${level}
Elevens svar: ${elevensSvar}
${recentMistakes?.length ? `Tidigare misstag: ${recentMistakes.join(', ')}` : ''}
`.trim();

  return anropa(systemPrompt ?? BEDÖMNING_SYSTEM_FALLBACK, userMessage, 400);
}
