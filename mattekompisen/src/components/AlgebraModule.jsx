import { useState, useEffect } from 'react';
import {
  hämtaProgress,
  sparaProgress,
  rensaProgress,
  getNextQuestionFromBank,
  uppdateraEfterSvar,
  checkLevelChange,
} from '../utils/adaptiveEngine';
import { genereraFråga } from '../api/claudeApi';
import { ALGEBRA_BANK } from '../data/algebraBank';

import LevelIndicator       from './LevelIndicator';
import SubtopicStrengths    from './SubtopicStrengths';
import StreakBar             from './StreakBar';
import QuestionCard         from './QuestionCard';
import LoadingSpinner       from './LoadingSpinner';
import LevelSuggestionModal from './LevelSuggestionModal';

// ─── Module constants ─────────────────────────────────────────────────────────
const STORAGE_KEY   = 'progress_algebra';
const SUBTOPIC_KEYS = ['ekvation', 'mönster'];

const INITIAL_PROGRESS = {
  levels: {
    E: { completed: false, score: 0, total: 0 },
    C: { completed: false, score: 0, total: 0 },
    A: { completed: false, score: 0, total: 0 },
  },
  subtopics: {
    ekvation: { correct: 0, attempts: 0, lastSeen: null },
    mönster:  { correct: 0, attempts: 0, lastSeen: null },
  },
  recentMistakes:     [],
  recentResults:      [],
  currentLevel:       'E',
  seenIds:            [],
  consecutiveCorrect: 0,
  consecutiveWrong:   0,
};

const SUBTOPIC_NAMN = {
  ekvation: 'Ekvationer',
  mönster:  'Mönster & generalisering',
};

const SUBTOPIC_ETIKETTER = {
  ekvation: '🔢 Ekvationer',
  mönster:  '🔢 Mönster',
};

// ─── Algebra-specific Claude system prompt ────────────────────────────────────
const ALGEBRA_FRÅGE_SYSTEM = `Du är en mattelärare som skapar algebra- och mönsteruppgifter för åk 6 i Sverige.
Returnera ENDAST giltig JSON utan markdown.
Följ exakt detta schema:
{
  "id": "generated_[timestamp]",
  "level": "E|C|A",
  "subtopic": "ekvation|mönster",
  "type": "multiple_choice|numeric|open",
  "question": "string",
  "figure_svg": null,
  "options": ["string"] | null,
  "correct_answer": "string",
  "hint": "string",
  "evaluation_criteria": "string | null"
}

figure_svg: alltid null för ekvation-uppgifter.
För mönster-uppgifter: figure_svg kan vara null eller en enkel SVG (viewBox "0 0 300 220", bara rect/line/text/path med M/L-kommandon, inga förbjudna element).

Nivå-regler:
E-nivå: Enstegsuppgifter. numeric eller multiple_choice.
  - ekvation: lösa x + a = b eller a × x = b med enkla heltal
  - mönster: identifiera nästa steg i en talföljd eller figurserie

C-nivå: Flerstegsproblem, textuppgifter, tabeller.
  - ekvation: sätta upp ekvation från textproblem, lösa 2-stegs-ekvation
  - mönster: beräkna icke-omedelbart steg, beskriva sambandet med ord

A-nivå: Generalisering — eleven ska formulera en ALLMÄN REGEL för godtyckligt n.
  - mönster: formel för figur n krävs — enbart beräkning av nästa steg ger inte A-poäng
  - ekvation: andragradsekvation via prövning, förklara varför metoden fungerar
  - evaluation_criteria ska explicit ange att generell formel/förklaring krävs`;

// ─── Bedömningsprompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Du är en varm och uppmuntrande matematiklärare för elever i årskurs 6 (ca 12 år).
Bedöm elevens svar om algebra och mönster och ge pedagogisk feedback på svenska.
Returnera alltid giltig JSON i exakt detta format:
{"correct": true/false, "feedback": "...", "hint": null/"..."}

BEDÖMNINGSPRINCIP — positiv poängsättning:
Lyft fram förtjänster i elevens lösning. En elev som kommit en bit på väg
mot rätt svar ska få erkännande för det hen visat, inte bara kritik för felet.

NIVÅKRAV (baserat på nationella provens kunskapskrav):
- E: Eleven identifierar rätt svar, använder en fungerande metod i ett steg.
  Enkla resonemang kopplade till konkreta exempel. Inget krav på förklaring.
- C: Eleven visar god kunskap om matematiska begrepp och samband. Kan växla
  mellan representationer. För utvecklade resonemang — förklarar hur delar
  hänger ihop, inte bara svarar. Uppgifter i flera steg.
- A: Eleven ser och beskriver generella samband. För välutvecklade och
  systematiska resonemang som täcker alla delar av en frågeställning eller
  logiskt utesluter felaktiga alternativ. Lyfter blicken och förklarar
  det matematiska sambandet bakom svaret — inte bara ger ett svar.

FEEDBACK-REGLER (max 3 meningar):
- Börja alltid med vad eleven gör rätt, även vid fel svar
- Förklara kort vad som saknas med enkla ord för en 12-åring
- Avsluta med ett konkret nästa steg eller en fråga som hjälper vidare
- Använd aldrig: tyvärr, fel, felaktigt, inte rätt
- Använd gärna: nästan, bra start, du är på rätt spår, prova att tänka på

HINT (bara om correct=false, annars null):
En kort ledtråd som pekar mot rätt tankesätt utan att avslöja svaret. Max en mening.

NIVÅANPASSNING utifrån elevens nivå:
- E-nivå: bekräfta rätt svar och beröm konkret observation. Inga höga krav på förklaring.
- C-nivå: lyft fram om eleven förklarar sambandet. Uppmuntra mer om det saknas.
- A-nivå: efterfråga generalisering om den saknas. Bekräfta systematiskt resonemang.
  Godkänn INTE A-svar som bara ger rätt svar utan att förklara varför metoden fungerar.

TIDIGARE MISSTAG: Om angivna — koppla feedbacken till mönstret om det är relevant.`;

// ─── Frågeprompt med few-shot-exempel från NP ─────────────────────────────────
function byggPrompt(progress) {
  const { currentLevel: level, recentMistakes } = progress;
  const subtopic = SUBTOPIC_KEYS
    .slice()
    .sort((a, b) => {
      const st = progress.subtopics;
      return (st[a].correct / Math.max(st[a].attempts, 1)) - (st[b].correct / Math.max(st[b].attempts, 1));
    })[0];
  const mistakesText = recentMistakes?.length > 0
    ? `Eleven har nyligen haft problem med: ${recentMistakes.join(', ')}. `
    : '';
  const examples = {
    E: 'Exempel E-uppgift (nationellt prov): "38 = 6·x + 8, vad är x?" — lös enkel ekvation, ett steg. Eller: "Talserie 2,5,8,11 — vilket tal kommer härnäst?" — identifiera nästa steg.',
    C: 'Exempel C-uppgift (nationellt prov): "Det kostar 50kr att bli medlem i klubben, sedan 10kr/månad. Skriv ett uttryck för kostnaden för x månader." — sätta upp uttryck från text, visa förståelse för samband.',
    A: 'Exempel A-uppgift (nationellt prov): "Samira köper x kr/kg äpplen, köper 3 kg, betalar med 50kr. Skriv ett uttryck för växeln." — generellt uttryck med variabel, eleven ska formulera 50−3x och förklara varför.',
  };
  return `${mistakesText}Generera en uppgift om ${subtopic} på ${level}-nivå för åk 6.
${examples[level]}
figure_svg: null om inte mönsterfigur behövs (då: viewBox "0 0 300 220", bara rect/line/text).
${level === 'A' ? 'OBS: A-nivå kräver att eleven formulerar ett GENERELLT uttryck/formel — inte bara beräknar ett specifikt värde.' : ''}
Returnera JSON: {id, level, subtopic, type, question, figure_svg, options, correct_answer, hint, evaluation_criteria}`;
}

function hämtaFallback(level) {
  const kandidater = ALGEBRA_BANK.filter((q) => q.level === level);
  if (!kandidater.length) return ALGEBRA_BANK[0];
  return kandidater[Math.floor(Math.random() * kandidater.length)];
}

// ─── AlgebraModule ────────────────────────────────────────────────────────────
export default function AlgebraModule({ modul }) {
  const [progress, setProgress]               = useState(() => hämtaProgress(STORAGE_KEY, INITIAL_PROGRESS));
  const [aktivFråga, setAktivFråga]           = useState(null);
  const [laddar, setLaddar]                   = useState(false);
  const [apiError, setApiError]               = useState(null);
  const [svaratPåAktiv, setSvarat]            = useState(false);
  const [levelSuggestion, setLevelSuggestion] = useState(null);

  async function laddaNästaFråga(prog) {
    setLaddar(true);
    setApiError(null);
    setSvarat(false);

    const frånBank = getNextQuestionFromBank(prog, ALGEBRA_BANK);
    if (frånBank) {
      setAktivFråga(frånBank);
      setLaddar(false);
      return;
    }

    try {
      const generated = await genereraFråga(byggPrompt(prog), ALGEBRA_FRÅGE_SYSTEM);
      setAktivFråga(generated);
    } catch (err) {
      setApiError(
        err.message === 'API_KEY_SAKNAS'
          ? 'API-nyckel saknas. Skapa .env med VITE_ANTHROPIC_API_KEY.'
          : 'Kunde inte hämta ny fråga från AI. Kontrollera din anslutning.'
      );
      setAktivFråga(hämtaFallback(prog.currentLevel));
    } finally {
      setLaddar(false);
    }
  }

  useEffect(() => { laddaNästaFråga(progress); }, []); // eslint-disable-line

  function hanteraSvarat(korrekt, mistakeSummary) {
    setSvarat(true);
    const { progress: ny } = uppdateraEfterSvar(progress, aktivFråga, korrekt, mistakeSummary);
    sparaProgress(STORAGE_KEY, ny);
    setProgress(ny);
    const suggestion = checkLevelChange(ny, ALGEBRA_BANK);
    if (suggestion) setLevelSuggestion(suggestion);
  }

  function hanteraNivåbyte(suggestion) {
    const nyNivå = suggestion === 'upgrade'
      ? { E: 'C', C: 'A' }[progress.currentLevel]
      : { C: 'E', A: 'C' }[progress.currentLevel];
    if (!nyNivå) { setLevelSuggestion(null); return; }
    const nyProgress = { ...progress, currentLevel: nyNivå, recentResults: [], consecutiveCorrect: 0, consecutiveWrong: 0 };
    sparaProgress(STORAGE_KEY, nyProgress);
    setProgress(nyProgress);
    setLevelSuggestion(null);
    laddaNästaFråga(nyProgress);
  }

  function hanteraManuellUppgradering() {
    const nästa = { E: 'C', C: 'A' }[progress.currentLevel];
    if (!nästa) return;
    const nyProgress = { ...progress, currentLevel: nästa, recentResults: [], consecutiveCorrect: 0, consecutiveWrong: 0 };
    sparaProgress(STORAGE_KEY, nyProgress);
    setProgress(nyProgress);
    laddaNästaFråga(nyProgress);
  }

  function hanteraManuellNedgradering() {
    const föregående = { C: 'E', A: 'C' }[progress.currentLevel];
    if (!föregående) return;
    const nyProgress = { ...progress, currentLevel: föregående, recentResults: [], consecutiveCorrect: 0, consecutiveWrong: 0 };
    sparaProgress(STORAGE_KEY, nyProgress);
    setProgress(nyProgress);
    laddaNästaFråga(nyProgress);
  }

  function hanteraNästa() {
    setProgress((latest) => { laddaNästaFråga(latest); return latest; });
  }

  const apiKeyMissing = !import.meta.env.VITE_PROXY_URL;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {levelSuggestion && (
        <LevelSuggestionModal
          suggestion={levelSuggestion}
          currentLevel={progress.currentLevel}
          onAccept={() => hanteraNivåbyte(levelSuggestion)}
          onDismiss={() => setLevelSuggestion(null)}
        />
      )}

      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl ${modul.ikonBg} flex items-center justify-center text-2xl`}>
          {modul.ikon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{modul.namn}</h1>
          <p className="text-gray-500 text-sm">{modul.beskrivning}</p>
        </div>
      </div>

      <LevelIndicator current={progress.currentLevel} levels={progress.levels} />
      <SubtopicStrengths subtopics={progress.subtopics} namen={SUBTOPIC_NAMN} />
      <StreakBar
        progress={progress}
        currentLevel={progress.currentLevel}
        onManualUpgrade={hanteraManuellUppgradering}
        onManualDowngrade={hanteraManuellNedgradering}
      />

      {progress.levels.A.completed && (
        <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-3xl p-8 text-center space-y-3">
          <div className="text-6xl">🏆</div>
          <h2 className="text-2xl font-bold text-green-700">Modulen avklarad!</h2>
          <p className="text-gray-600">Du har klarat alla nivåer i {modul.namn}. Imponerande!</p>
          <button
            onClick={() => { rensaProgress(STORAGE_KEY); window.location.reload(); }}
            className="mt-2 px-5 py-2 rounded-xl bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors text-sm"
          >
            Öva igen från början
          </button>
        </div>
      )}

      {apiKeyMissing && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-sm text-amber-700 flex gap-2">
          <span>⚠️</span>
          <span>
            <strong>Proxy saknas.</strong> Redovisningsfrågor och AI-genererade frågor
            kräver att <code className="bg-amber-100 px-1 rounded">VITE_PROXY_URL</code> är satt.
          </span>
        </div>
      )}

      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-sm text-red-700">
          ⚠️ {apiError}
        </div>
      )}

      {laddar ? (
        <LoadingSpinner text="Hämtar nästa fråga…" />
      ) : aktivFråga && !progress.levels.A.completed ? (
        <>
          <QuestionCard
            key={aktivFråga.id}
            fråga={aktivFråga}
            onSvarat={hanteraSvarat}
            recentMistakes={progress.recentMistakes}
            subtopicEtiketter={SUBTOPIC_ETIKETTER}
            level={progress.currentLevel}
            systemPrompt={SYSTEM_PROMPT}
          />
          {svaratPåAktiv && (
            <button
              onClick={hanteraNästa}
              className="w-full py-3 px-6 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors"
            >
              Nästa fråga →
            </button>
          )}
        </>
      ) : null}

      <div className="bg-white rounded-2xl border border-gray-200 p-4 grid grid-cols-3 gap-3 text-center text-sm">
        {['E', 'C', 'A'].map((l) => {
          const lv = progress.levels[l];
          return (
            <div key={l}>
              <div className="font-bold text-gray-700">Nivå {l}</div>
              <div className="text-gray-500">{lv.score}/{lv.total} rätt</div>
              {lv.completed && <div className="text-green-500 text-xs">✓ Klar</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
