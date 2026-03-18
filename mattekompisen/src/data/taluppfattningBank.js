export const TALUPPFATTNING_BANK = [
  // ─── NIVÅ E ───────────────────────────────────────────────────────────────
  {
    id: 'TE1',
    level: 'E',
    subtopic: 'aritmetik',
    type: 'numeric',
    question: 'Beräkna: 347 + 285',
    figure_svg: null,
    options: null,
    correct_answer: '632',
    hint: 'Addera hundratal, tiotal och ental var för sig.',
    evaluation_criteria: null,
  },
  {
    id: 'TE2',
    level: 'E',
    subtopic: 'aritmetik',
    type: 'numeric',
    question: 'Beräkna: 12,5 × 4',
    figure_svg: null,
    options: null,
    correct_answer: '50',
    hint: 'Tänk: 12 × 4 = 48, och 0,5 × 4 = 2.',
    evaluation_criteria: null,
  },
  {
    id: 'TE3',
    level: 'E',
    subtopic: 'stora_tal',
    type: 'multiple_choice',
    question: 'En stad har 23,1 miljoner invånare.\nSkriv detta antal med enbart siffror.',
    figure_svg: null,
    options: ['23 100 000', '2 310 000', '231 000 000', '23 100'],
    correct_answer: '23 100 000',
    hint: 'En miljon är 1 000 000.',
    evaluation_criteria: null,
  },
  {
    id: 'TE4',
    level: 'E',
    subtopic: 'rimlighetsbedömning',
    type: 'multiple_choice',
    question: 'Vilket uttryck ger det MINSTA värdet?\nAnvänd överslagsräkning.',
    figure_svg: null,
    options: ['198 × 3', '200 × 3', '99 × 6', '100 × 6'],
    correct_answer: '198 × 3',
    hint: 'Avrunda och jämför: 200×3=600, 100×6=600, 198×3 är strax under 600…',
    evaluation_criteria: null,
  },

  // ─── NIVÅ C ───────────────────────────────────────────────────────────────
  {
    id: 'TC1',
    level: 'C',
    subtopic: 'aritmetik',
    type: 'numeric',
    question: 'En tröja kostar 280 kr. Den är rabatterad med 15%.\nHur mycket kostar tröjan efter rabatten?',
    figure_svg: null,
    options: null,
    correct_answer: '238',
    hint: 'Beräkna 15% av 280 och subtrahera.',
    evaluation_criteria: null,
  },
  {
    id: 'TC2',
    level: 'C',
    subtopic: 'aritmetik',
    type: 'open',
    question:
      'En bil kör 8 liter per mil. En resa är 15 mil.\n' +
      'Bränslet kostar 20 kr per liter.\n\n' +
      'Hur mycket kostar bränslet för resan?\n' +
      'Visa dina beräkningar steg för steg.',
    figure_svg: null,
    options: null,
    correct_answer: '2 400 kr.',
    hint: 'Räkna först ut hur mycket bränsle som behövs totalt.',
    evaluation_criteria:
      'Eleven ska: (1) beräkna totalt bränsle: 8 × 15 = 120 liter, ' +
      '(2) beräkna kostnad: 120 × 20 = 2 400 kr, ' +
      '(3) visa beräkningarna steg för steg. ' +
      'Delvisa poäng om rätt metod men räknefel.',
  },
  {
    id: 'TC3',
    level: 'C',
    subtopic: 'stora_tal',
    type: 'open',
    question:
      'Sveriges befolkning är ungefär 10 miljoner.\n' +
      'Göteborg har ungefär 600 000 invånare.\n\n' +
      'Ungefär hur stor andel (i procent) av Sveriges befolkning bor i Göteborg?\n' +
      'Förklara hur du räknar.',
    figure_svg: null,
    options: null,
    correct_answer: 'Ungefär 6%.',
    hint: 'Dela Göteborgs invånare med Sveriges totala befolkning.',
    evaluation_criteria:
      'Eleven ska: (1) beräkna 600 000 / 10 000 000 = 0,06 = 6%, ' +
      '(2) förklara beräkningen. ' +
      'Godkänt svar: 6%. ' +
      'Välutvecklat: eleven förklarar att de delar stadens invånare med landets och ' +
      'visar hur de växlar mellan representationerna (del / helhet = procent).',
  },
  {
    id: 'TC4',
    level: 'C',
    subtopic: 'rimlighetsbedömning',
    type: 'open',
    question:
      'En elev påstår att 4,8 × 52 ≈ 250.\n\n' +
      'Är det ett rimligt svar?\n' +
      'Visa med överslagsräkning och förklara hur du bedömer rimligheten.',
    figure_svg: null,
    options: null,
    correct_answer: 'Rimligt men något lågt — 5 × 52 = 260, och 4,8 × 52 är strax under.',
    hint: 'Avrunda 4,8 till 5 och beräkna 5 × 50.',
    evaluation_criteria:
      'Eleven ska: (1) avrunda: 5 × 50 = 250 (rimligt), ' +
      '(2) konstatera att 4,8 × 52 är nära 5 × 52 = 260 och strax under, ' +
      '(3) bedöma 250 som rimligt men något lågt. ' +
      'Eleven ska visa mellanstegen i överslagsräkningen.',
  },

  // ─── NIVÅ A ───────────────────────────────────────────────────────────────
  {
    id: 'TA1',
    level: 'A',
    subtopic: 'aritmetik',
    type: 'open',
    question:
      'En affär säljer ägg i kartonger om 6 ägg eller 12 ägg.\n' +
      'Lina vill köpa totalt 60 ägg.\n' +
      'Hon måste köpa minst 2 kartonger av varje storlek.\n\n' +
      'Hur många olika kombinationer av kartonger kan Lina köpa?\n' +
      'Visa hur du löser uppgiften systematiskt.',
    figure_svg: null,
    options: null,
    correct_answer: '3 kombinationer: (2×12 + 6×6), (3×12 + 4×6), (4×12 + 2×6).',
    hint: 'Prova systematiskt: börja med minsta möjliga antal 12-kartong (minst 2).',
    evaluation_criteria:
      'Systematisk lösning krävs: Låt x = antal 12-kartong, y = antal 6-kartong. ' +
      'Villkor: 12x + 6y = 60 → 2x + y = 10. Med x ≥ 2 och y ≥ 2: ' +
      'x=2 ger y=6 ✓, x=3 ger y=4 ✓, x=4 ger y=2 ✓. Svar: 3 kombinationer. ' +
      'A-nivå: eleven visar systematisk genomgång av alla möjligheter och ' +
      'motiverar varför inga fler finns. Enbart svar utan systematik ger inte A-nivåpoäng.',
  },
  {
    id: 'TA2',
    level: 'A',
    subtopic: 'aritmetik',
    type: 'open',
    question:
      '"Dubbla ett tal, lägg sedan till hälften av ursprungstalet.\n' +
      'Resultatet är 75."\n\n' +
      'Vilket är ursprungstalet?\n' +
      'Skriv en ekvation, lös den och förklara varför din lösningsmetod fungerar.',
    figure_svg: null,
    options: null,
    correct_answer: 'Ursprungstalet är 30. Ekvation: 2x + x/2 = 75 → 2,5x = 75 → x = 30.',
    hint: 'Låt x vara ursprungstalet. Dubbla = 2x, hälften = x/2.',
    evaluation_criteria:
      'Eleven ska: (1) sätta upp ekvation: 2x + x/2 = 75 → 2,5x = 75, ' +
      '(2) lösa: x = 30, ' +
      '(3) förklara varför metoden fungerar. ' +
      'A-nivå: eleven inser att "2x + 0,5x = 2,5x" och förklarar att man kan slå ihop termerna. ' +
      'Extra (välutvecklat): verifiera 2×30 + 15 = 75. ' +
      'Enbart korrekt svar utan ekvation och förklaring ger inte A-nivåpoäng.',
  },
];
