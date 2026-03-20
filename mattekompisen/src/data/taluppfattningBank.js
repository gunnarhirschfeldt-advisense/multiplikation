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
    question: 'Vilket uttryck ger det MINSTA värdet? Använd överslagsräkning.',
    figure_svg: null,
    options: ['198 × 4', '51 × 8', '11 × 31', '99 × 3'],
    correct_answer: '99 × 3',
    hint: 'Avrunda varje tal till närmaste hundra eller tiotal och jämför.',
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
      'Eleven ska: (1) dela Göteborgs invånare med Sveriges befolkning, ' +
      '(2) få ett svar nära 6% — godkänn svar mellan 5% och 7% om ' +
      'beräkningsgången visas. Godkänn "ungefär 6%" och liknande ' +
      'avrundningar. Exakt svar är 6%.',
  },
  {
    id: 'TC4',
    level: 'C',
    subtopic: 'rimlighetsbedömning',
    type: 'open',
    question: 'En elev påstår att 3,2 × 47 ≈ 200. Är det ett rimligt svar? Visa med överslagsräkning och förklara hur du bedömer rimligheten.',
    figure_svg: null,
    options: null,
    correct_answer: null,
    hint: 'Avrunda 3,2 och 47 till enkla tal och räkna.',
    evaluation_criteria: 'Godkänt (C-nivå): Eleven avrundar båda talen (t.ex. 3 × 50 = 150 eller 3 × 47 = 141) och drar slutsatsen att 200 är för högt — inte rimligt. Godkänn svar som visar avrundning + korrekt slutsats. Exakt svar är 150,4. Välutvecklat (A-nivå, ej krav här): eleven förklarar åt vilket håll avrundningsfelen drar och varför 200 är klart för högt.',
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

  // ─── UTÖKAD BANK TE5–TE6, TC5–TC6, TA3 ───────────────────────────────────
  {
    id: 'TE5',
    level: 'E',
    subtopic: 'aritmetik',
    type: 'multiple_choice',
    question: 'Beräkna: 48 × 25',
    figure_svg: null,
    options: ['1 200', '1 100', '1 250', '960'],
    correct_answer: '1 200',
    hint: 'Prova att tänka 48 × 25 = 48 × 100 ÷ 4.',
    evaluation_criteria: null,
  },
  {
    id: 'TE6',
    level: 'E',
    subtopic: 'stora_tal',
    type: 'multiple_choice',
    question: 'Vilket av dessa tal är störst?',
    figure_svg: null,
    options: ['4 698 500', '4 750 000', '4 650 000', '4 709 999'],
    correct_answer: '4 750 000',
    hint: 'Jämför siffrorna position för position, börja med den högsta platsvärdet.',
    evaluation_criteria: null,
  },
  {
    id: 'TC5',
    level: 'C',
    subtopic: 'aritmetik',
    type: 'open',
    question:
      'En buss har 48 sittplatser och gör 6 fullsatta turer på en dag.\n\n' +
      'a) Hur många passagerare åker totalt?\n' +
      'b) En annan dag ska 1 500 passagerare transporteras.\n' +
      '   Hur många hela bussturer behövs minst?\n' +
      'Visa dina beräkningar.',
    figure_svg: null,
    options: null,
    correct_answer: 'a) 288 passagerare. b) 32 turer (1 500 ÷ 48 = 31,25 → avrundat uppåt till 32).',
    hint: 'Del b: Division ger inte ett jämnt svar. Hur avrundar du för att alla ska få plats?',
    evaluation_criteria:
      'Del a: 48 × 6 = 288. ' +
      'Del b: 1 500 ÷ 48 = 31,25 → eleven måste avrunda UPPÅT till 32 och förklara varför ' +
      '(31 turer räcker inte — 31 × 48 = 1 488 < 1 500). ' +
      'C-poäng kräver korrekt hantering av rest vid division och motivering av avrundningen.',
  },
  {
    id: 'TC6',
    level: 'C',
    subtopic: 'rimlighetsbedömning',
    type: 'open',
    question:
      'Erik säger att 18 × 32 ≈ 600.\n' +
      'Anna säger att det är ungefär 540.\n\n' +
      'Vem har gjort den rimligaste uppskattningen?\n' +
      'Visa hur du bedömer rimligheten.',
    figure_svg: null,
    options: null,
    correct_answer:
      'Anna. Exakt svar: 576. Eriks 600 avviker mer (24) än Annas 540 (36) — ' +
      'men ett resonemang om t.ex. 20 × 30 = 600 som överskattning är också godkänt.',
    hint: 'Räkna det exakta svaret eller avrunda båda talen och jämför vem som hamnar närmast.',
    evaluation_criteria:
      'Exakt svar: 18 × 32 = 576. ' +
      'Godkänt: eleven visar ett avrundningsresonemang (t.ex. 20 × 30 = 600 är en överskattning, ' +
      'eller 18 × 30 = 540 är en underskattning) och drar slutsats om vem som är rimligast. ' +
      'Acceptera båda svaren om resonemanget är korrekt och konsekvent — ' +
      'det viktiga är att eleven motiverar rimligheten, inte bara anger ett namn.',
  },
  {
    id: 'TA3',
    level: 'A',
    subtopic: 'aritmetik',
    type: 'open',
    question:
      'Du vet att 144 ÷ 12 = 12.\n\n' +
      'a) Vad är 144 ÷ 0,12? Förklara varför utan att räkna från grunden.\n' +
      'b) Vad är 1 440 ÷ 12? Förklara varför utan att räkna från grunden.\n' +
      'c) Formulera en generell regel: vad händer med kvoten när ' +
      'nämnaren delas med 10, respektive när täljaren multipliceras med 10?',
    figure_svg: null,
    options: null,
    correct_answer: 'a) 1 200. b) 120. c) Nämnaren ÷ 10 → kvoten × 10. Täljaren × 10 → kvoten × 10.',
    hint: 'Tänk på vad som händer med bråket 144/12 om du krymper nämnaren — eller om du förstärker täljaren.',
    evaluation_criteria:
      'Korrekt svar: a) 1 200, b) 120. ' +
      'A-poäng kräver att eleven förklarar SAMBANDEN utan att räkna från grunden: ' +
      '(a) 0,12 = 12 ÷ 100, så kvoten multipliceras med 100 → 12 × 100 = 1 200. ' +
      '(b) täljaren multipliceras med 10, så kvoten multipliceras med 10 → 12 × 10 = 120. ' +
      'Del c kräver en formulerad GENERELL REGEL — inte bara de två specifika fallen. ' +
      'Enbart korrekta svar utan förklaring av sambandet ger C-poäng.',
  },
];
