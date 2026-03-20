export const ALGEBRA_BANK = [
  // ─── NIVÅ E ───────────────────────────────────────────────────────────────
  {
    id: 'AE1',
    level: 'E',
    subtopic: 'ekvation',
    type: 'numeric',
    question: 'Lös ekvationen: x + 7 = 15\nVad är x?',
    figure_svg: null,
    options: null,
    correct_answer: '8',
    hint: 'Vad behöver du subtrahera från 15 för att få 7?',
    evaluation_criteria: null,
  },
  {
    id: 'AE2',
    level: 'E',
    subtopic: 'mönster',
    type: 'multiple_choice',
    question:
      'En figursekvens byggs av rutor:\n' +
      'Figur 1 har 3 rutor, Figur 2 har 5 rutor, Figur 3 har 7 rutor.\n' +
      'Hur många rutor har Figur 4?',
    figure_svg: null,
    options: ['8', '9', '10', '11'],
    correct_answer: '9',
    hint: 'Hur många rutor läggs till varje gång?',
    evaluation_criteria: null,
  },
  {
    id: 'AE3',
    level: 'E',
    subtopic: 'ekvation',
    type: 'numeric',
    question: 'Lös: 3 × x = 24\nVad är x?',
    figure_svg: null,
    options: null,
    correct_answer: '8',
    hint: 'Vilket tal gånger 3 ger 24?',
    evaluation_criteria: null,
  },
  {
    id: 'AE4',
    level: 'E',
    subtopic: 'mönster',
    type: 'multiple_choice',
    question: 'Talserie: 2, 5, 8, 11, 14, …\nVilket tal kommer härnäst?',
    figure_svg: null,
    options: ['14', '16', '17', '18'],
    correct_answer: '17',
    hint: 'Hur mycket ökar talen varje steg?',
    evaluation_criteria: null,
  },

  // ─── NIVÅ C ───────────────────────────────────────────────────────────────
  {
    id: 'AC1',
    level: 'C',
    subtopic: 'ekvation',
    type: 'numeric',
    question:
      'Anna har ett okänt antal kronor.\n' +
      'Hon köper en bok för 45 kr och har 30 kr kvar.\n' +
      'Hur mycket hade Anna från början?',
    figure_svg: null,
    options: null,
    correct_answer: '75',
    hint: 'Sätt upp: x − 45 = 30',
    evaluation_criteria: null,
  },
  {
    id: 'AC2',
    level: 'C',
    subtopic: 'mönster',
    type: 'open',
    question:
      'En rad bygger tändstickor:\n' +
      'Figur 1 = 4 tändstickor, Figur 2 = 7 tändstickor, Figur 3 = 10 tändstickor.\n\n' +
      'Hur många tändstickor har Figur 5?\n' +
      'Förklara hur du räknar ut det.',
    figure_svg: null,
    options: null,
    correct_answer: '16 tändstickor.',
    hint: 'Hur mycket ökar antalet tändstickor för varje ny figur?',
    evaluation_criteria:
      'Eleven ska: (1) identifiera att varje ny figur tillförs 3 tändstickor, ' +
      '(2) beräkna Figur 5 = 4 + 4×3 = 16 tändstickor, ' +
      '(3) förklara regeln bakom räkningen (t.ex. "varje ny figur läggs 3 till"). ' +
      'Eleven ska visa beräkningsgången — inte bara slutsvaret.',
  },
  {
    id: 'AC3',
    level: 'C',
    subtopic: 'ekvation',
    type: 'open',
    question:
      '"Jag tänker på ett tal. Om jag multiplicerar det med 4\n' +
      'och sedan subtraherar 6 får jag 18."\n\n' +
      'Skriv en ekvation för detta påstående och lös den.\n' +
      'Visa hur du tänker.',
    figure_svg: null,
    options: null,
    correct_answer: 'x = 6 (ekvation: 4x − 6 = 18)',
    hint: 'Låt x vara det okända talet. Skriv operationerna som en ekvation.',
    evaluation_criteria:
      'Eleven ska: (1) skriva korrekt ekvation: 4x − 6 = 18, ' +
      '(2) lösa: 4x = 24, x = 6, ' +
      '(3) visa lösningsgången steg för steg.',
  },
  {
    id: 'AC4',
    level: 'C',
    subtopic: 'mönster',
    type: 'open',
    question:
      'En tabell visar sambandet mellan x och y:\n' +
      'x=1 ger y=5, x=2 ger y=8, x=3 ger y=11.\n\n' +
      'Vad är y när x=4?\n' +
      'Beskriv sambandet mellan x och y med ord.',
    figure_svg: null,
    options: null,
    correct_answer: 'y=14. Sambandet: y = 3x + 2.',
    hint: 'Hur förändras y när x ökar med 1? Vad är y när x=0?',
    evaluation_criteria:
      'Eleven ska: (1) beräkna y=14 när x=4 — krav för godkänt. ' +
      '(2) Beskriva sambandet — godkänn både algebraisk form (y=3x+2) ' +
      'och beskrivning med ord ("varje gång x ökar med 1 ökar y med 3, ' +
      'och när x är 1 är y 5"). Kräv inte algebraisk notation.',
  },

  // ─── NIVÅ A ───────────────────────────────────────────────────────────────
  {
    id: 'AA1',
    level: 'A',
    subtopic: 'mönster',
    type: 'open',
    question:
      'En figursekvens: Figur 1 har 5 tändstickor, Figur 2 har 8, Figur 3 har 11.\n\n' +
      'a) Hur många tändstickor har Figur 100?\n' +
      'b) Skriv en allmän formel som funkar för vilket figurnummer n som helst.\n' +
      'c) Förklara din formel.',
    figure_svg: null,
    options: null,
    correct_answer: 'a) 302 tändstickor. b) T = 3n + 2. c) Varje ny figur läggs 3 till; Figur 1 börjar med 5 = 3×1+2.',
    hint: 'Gör en tabell: n=1→5, n=2→8, n=3→11. Vad ökar lika mycket varje steg?',
    evaluation_criteria:
      'Fullständig lösning: (1) identifiera att varje ny figur tillförs 3, startantal 5 → ' +
      'formel: 3n+2 (eller 5 + (n−1)×3 = 3n+2), ' +
      '(2) beräkna Figur 100 = 302, ' +
      '(3) förklara formeln med ord: "n är figurnumret, varje figur läggs 3 till, och Figur 1 börjar med 5 som är 3×1+2". ' +
      'A-nivå kräver att eleven formulerar en GENERELL REGEL för godtyckligt n — ' +
      'inte bara beräknar nästa steg. Enbart korrekt svar utan formel ger inte A-nivåpoäng.',
  },
  {
    id: 'AA2',
    level: 'A',
    subtopic: 'ekvation',
    type: 'open',
    question:
      'En rektangel har en längd som är 3 cm längre än bredden.\n' +
      'Arean är 40 cm².\n\n' +
      'a) Skriv en ekvation som beskriver situationen.\n' +
      'b) Förklara hur du skulle gå tillväga för att lösa den.\n' +
      'c) Om du behöver prova dig fram — motivera varför.',
    figure_svg: null,
    options: null,
    correct_answer: 'b = 5 cm, längd = 8 cm. Ekvation: b(b+3) = 40. Prövning: 5×8 = 40 ✓',
    hint: 'Låt b = bredden. Längden = b + 3. Area = b × (b+3).',
    evaluation_criteria:
      'Eleven ska: (1) definiera variabel (t.ex. b = bredd, längd = b+3), ' +
      '(2) sätta upp ekvation: b(b+3) = 40, ' +
      '(3) visa att detta är en andragradsekvation som kräver prövning i åk 6 ' +
      '(b=5 ger 5×8=40 ✓), ' +
      '(4) motivera att man systematiskt provar för att hitta svaret. ' +
      'A-nivå: eleven inser att det handlar om prövning och förklarar logiken bakom. ' +
      'Enbart korrekt svar utan ekvation och förklaring ger inte A-nivåpoäng.',
  },

  // ─── UTÖKAD BANK AE5–AE6, AC5–AC6, AA3 ──────────────────────────────────
  {
    id: 'AE5',
    level: 'E',
    subtopic: 'ekvation',
    type: 'multiple_choice',
    question: 'Lös ekvationen: x − 9 = 14\nVad är x?',
    figure_svg: null,
    options: ['5', '23', '9', '14'],
    correct_answer: '23',
    hint: 'Vad behöver du addera till 9 för att få 14? Lägg till 9 på båda sidor.',
    evaluation_criteria: null,
  },
  {
    id: 'AE6',
    level: 'E',
    subtopic: 'mönster',
    type: 'multiple_choice',
    question:
      'Talserie: 100, 90, 80, 70, …\n' +
      'Vilket tal kommer härnäst?',
    figure_svg: null,
    options: ['50', '55', '60', '65'],
    correct_answer: '60',
    hint: 'Hur mycket minskar talen varje steg?',
    evaluation_criteria: null,
  },
  {
    id: 'AC5',
    level: 'C',
    subtopic: 'ekvation',
    type: 'open',
    question:
      'Två vänner delar på kostnaden för en present.\n' +
      'Den ena betalar 40 kr mer än den andra.\n' +
      'Totalt kostar presenten 180 kr.\n\n' +
      'Skriv en ekvation och räkna ut hur mycket varje person betalar.\n' +
      'Visa hur du tänker.',
    figure_svg: null,
    options: null,
    correct_answer:
      'Den ena betalar 70 kr, den andra 110 kr. ' +
      'Ekvation: x + (x + 40) = 180 → 2x + 40 = 180 → x = 70.',
    hint: 'Låt x vara den lägre summan. Den andra betalar x + 40.',
    evaluation_criteria:
      'Eleven ska: (1) definiera variabel, t.ex. x = lägre summa, ' +
      '(2) skriva ekvation: x + (x+40) = 180, ' +
      '(3) lösa: 2x = 140, x = 70, ' +
      '(4) svara att personerna betalar 70 kr och 110 kr. ' +
      'C-poäng kräver korrekt ekvation och fullständig lösningsgång. ' +
      'Acceptera andra korrekta variabelval om ekvationen är logisk.',
  },
  {
    id: 'AC6',
    level: 'C',
    subtopic: 'mönster',
    type: 'open',
    question:
      'En tabell visar antal kakel på en vägg:\n' +
      'Rad 1: 3 kakel, Rad 2: 6 kakel, Rad 3: 9 kakel.\n\n' +
      'a) Hur många kakel finns på rad 7?\n' +
      'b) Beskriv sambandet mellan radnummer och antal kakel med ord eller formel.',
    figure_svg: null,
    options: null,
    correct_answer: 'a) 21 kakel. b) Antal kakel = 3 × radnummer (K = 3n).',
    hint: 'Vad är mönstret? Hur hänger radnumret ihop med antalet kakel?',
    evaluation_criteria:
      'Del a: 3 × 7 = 21 — krav för godkänt. ' +
      'Del b: C-poäng kräver att eleven beskriver sambandet — ' +
      'acceptera "antal kakel är tre gånger radnumret", K = 3n, eller likvärdig formulering. ' +
      'Kräv inte algebraisk notation om beskrivningen med ord är korrekt och tydlig.',
  },
  {
    id: 'AA3',
    level: 'A',
    subtopic: 'mönster',
    type: 'open',
    question:
      'En trappa byggs av kvadratiska stenar med sidan 1 m:\n' +
      'Steg 1: 1 sten, Steg 2: 3 stenar totalt, Steg 3: 6 stenar totalt.\n\n' +
      'a) Hur många stenar totalt på steg 10?\n' +
      'b) Skriv en formel för antal stenar på steg n.\n' +
      'c) Förklara varför formeln fungerar — vad händer geometriskt för varje nytt steg?\n' +
      'd) Steg k har 120 stenar. Vilket steg är det? Visa hur du löser det.',
    figure_svg: null,
    options: null,
    correct_answer:
      'a) 55 stenar. b) S = n(n+1)/2. c) Varje nytt steg n tillför n stenar — ' +
      'summan är en triangeltalsserie. d) n(n+1)/2 = 120 → n(n+1) = 240 → n = 15 (15×16=240).',
    hint: 'Gör en tabell: steg 1→1, 2→3, 3→6, 4→10. Vad ökar för varje steg? Kan du se ett mönster i skillnaderna?',
    evaluation_criteria:
      'Del a: S(10) = 10×11/2 = 55 — krav för godkänt. ' +
      'Del b: A-nivå kräver formel S = n(n+1)/2 eller likvärdig — ' +
      'enbart beskrivning av nästa steg ger C-poäng. ' +
      'Del c: eleven ska förklara att steg n tillför exakt n stenar och att ' +
      'summan därför är 1+2+3+…+n = n(n+1)/2. ' +
      'Del d: eleven ska sätta upp n(n+1)/2 = 120, lösa n(n+1) = 240 och ' +
      'via prövning eller resonemang hitta n=15. ' +
      'Fullständig A-nivå kräver korrekt formel, geometrisk förklaring och lösning av del d. ' +
      'Enbart korrekt svar på a och b utan förklaring ger inte A-nivåpoäng.',
  },
];
