export const BRAK_PROCENT_BANK = [
  // ─── NIVÅ E ───────────────────────────────────────────────
  {
    id: 'E1',
    level: 'E',
    subtopic: 'jämförelse',
    type: 'multiple_choice',
    question: 'Vilket bråk är störst?',
    figure_svg: null,
    options: ['3/4', '2/3', 'De är lika stora'],
    correct_answer: '3/4',
    hint: 'Tänk: vilket är närmast en hel? Omvandla till procent.',
    evaluation_criteria: null,
  },
  {
    id: 'E2',
    level: 'E',
    subtopic: 'omvandling',
    type: 'numeric',
    question: 'Hur många procent är 1/4?',
    figure_svg: null,
    options: null,
    correct_answer: '25',
    hint: 'Dela täljaren med nämnaren och multiplicera med 100.',
    evaluation_criteria: null,
  },
  {
    id: 'E3',
    level: 'E',
    subtopic: 'tallinje',
    type: 'multiple_choice',
    question: 'En tallinje går från 0 till 1. Var hamnar 3/5?',
    figure_svg: null,
    options: ['0,45', '0,55', '0,60', '0,65', '0,70'],
    correct_answer: '0,60',
    hint: '3/5 = 3 delat med 5. Räkna ut decimaltalet.',
    evaluation_criteria: null,
  },

  // ─── NIVÅ C ───────────────────────────────────────────────
  {
    id: 'C1',
    level: 'C',
    subtopic: 'jämförelse',
    type: 'open',
    question:
      'Sortera dessa bråk från minst till störst och förklara hur du tänker: 5/8, 2/3, 7/12',
    figure_svg: null,
    options: null,
    correct_answer: '7/12, 5/8, 2/3',
    hint: 'Omvandla till gemensam nämnare 24, eller räkna om till procent.',
    evaluation_criteria:
      'Eleven ska visa uträkning eller tydligt resonemang — inte bara lista svaret. ' +
      'Eleven ska namnge eller visa sambandet mellan de jämförda representationerna ' +
      '(t.ex. omvandling till gemensam nämnare, decimalform eller procent) och förklara ' +
      'varför dessa är likvärdiga sätt att uttrycka samma storlek.',
  },
  {
    id: 'C2',
    level: 'C',
    subtopic: 'andel',
    type: 'open',
    question:
      'I en klass är 12 av 30 elever med i en sportaktivitet. Hur stor andel är det i procent? Visa hur du räknar.',
    figure_svg: null,
    options: null,
    correct_answer: '40%',
    hint: 'Skriv det som ett bråk först: 12/30. Förenkla eller dela direkt.',
    evaluation_criteria:
      'Eleven ska visa beräkningssteg: 12/30 = 2/5 = 40% eller 12÷30×100. ' +
      'Eleven ska namnge eller visa sambandet mellan de två representationerna ' +
      '(bråk 12/30 och procent 40%) och förklara att de är samma storlek, bara skriven på olika sätt.',
  },
  {
    id: 'C3',
    level: 'C',
    subtopic: 'tallinje',
    type: 'multiple_choice',
    question:
      'En tallinje går från 0 till 2. Punkt A sitter på 3/4 av vägen till 1. Vilket tal är A?',
    figure_svg: null,
    options: ['1/4', '3/4', '3/2', '6/4'],
    correct_answer: '3/4',
    hint: 'Tallinjen slutar på 2 men A sitter innan 1. Vad är 3/4 av vägen till 1?',
    evaluation_criteria: null,
  },

  // ─── NIVÅ A ───────────────────────────────────────────────
  {
    id: 'A1',
    level: 'A',
    subtopic: 'andel',
    type: 'open',
    question:
      'Sverige tog 8 medaljer: 3 guld, 2 silver, 3 brons.\n' +
      'a) Hur stor andel var guld? Ange som bråk och procent.\n' +
      'b) En kompis säger att "mer än hälften var inte guld". Stämmer det? Förklara.',
    figure_svg: null,
    options: null,
    correct_answer: '3/8 = 37,5%. Ja, 5/8 = 62,5% var inte guld.',
    hint: 'Del a: guld/totalt. Del b: räkna ut hur många som INTE var guld.',
    evaluation_criteria:
      'Korrekt beräkning i del a med bråk OCH procent. ' +
      'Del b kräver välutvecklat resonemang — eleven ska förklara VARFÖR påståendet stämmer, ' +
      'inte bara svara ja/nej. Godkänt: eleven beräknar 5/8 = 62,5% > 50% och förklarar att ' +
      'mer än hälften av medaljerna inte var guld. ' +
      'Ej godkänt: enbart korrekt svar utan förklaring av sambandet.',
  },
  {
    id: 'A2',
    level: 'A',
    subtopic: 'omvandling',
    type: 'open',
    question:
      'En vara kostar 200 kr. Priset höjs med 25%, sedan sänks det nya priset med 25%.\n' +
      'Hamnar du på 200 kr igen?\n' +
      'Förklara varför eller varför inte.',
    figure_svg: null,
    options: null,
    correct_answer: 'Nej: 200×1,25=250, 250×0,75=187,50 kr',
    hint: 'Räkna steg för steg. Är 25% av 250 samma sak som 25% av 200?',
    evaluation_criteria:
      'Eleven ska räkna båda stegen och förklara varför procentbasen förändras. ' +
      'Välutvecklat resonemang (A-nivå): eleven förklarar DET MATEMATISKA SAMBANDET — ' +
      '"25% av en större summa är ett större belopp, så sänkningen tar mer än höjningen gav." ' +
      'Ej godkänt A: enbart korrekt beräkning utan förklaring av varför resultatet inte blir 200.',
  },
  {
    id: 'A3',
    level: 'A',
    subtopic: 'jämförelse',
    type: 'open',
    question:
      'Förklara, utan att omvandla till decimaltal, varför 5/9 är närmast hälften\n' +
      'av de två bråken 5/9 och 3/7.\n' +
      'Använd ett matematiskt resonemang.',
    figure_svg: null,
    options: null,
    correct_answer: null,
    hint: 'Tänk: vad är hälften av 9? Vad är hälften av 7? Hur nära är täljaren?',
    evaluation_criteria:
      'Eleven ska resonera om att 1/2 av 9 är 4,5 — och 5/9 är 0,5 delar över hälften. ' +
      '1/2 av 7 är 3,5 — och 3/7 är också 0,5 delar över hälften. ' +
      'Men en niondel är en MINDRE del än en sjundedel, så 5/9 är närmre hälften. ' +
      'Ej godkänt: enbart decimalberäkning (5÷9≈0,556, 3÷7≈0,429) — ' +
      'uppgiften kräver resonemang om täljare/nämnares inbördes relation.',
  },

  // ─── UTÖKAD BANK BP9–BP15 ─────────────────────────────────────────────────
  {
    id: 'BP9',
    level: 'E',
    subtopic: 'procent',
    type: 'multiple_choice',
    question: 'En tröja kostar 300 kr. Den är nedsatt med 10%. Vad kostar tröjan nu?',
    figure_svg: null,
    options: ['270 kr', '290 kr', '310 kr', '30 kr'],
    correct_answer: '270 kr',
    hint: 'Räkna ut 10% av 300 och dra bort det från priset.',
    evaluation_criteria: null,
  },
  {
    id: 'BP10',
    level: 'E',
    subtopic: 'jämförelse',
    type: 'multiple_choice',
    question: 'Vilket tal är störst?',
    figure_svg: null,
    options: ['3/4', '2/3', '5/8', '7/12'],
    correct_answer: '3/4',
    hint: 'Försök göra om bråken till samma nämnare eller decimaler.',
    evaluation_criteria: null,
  },
  {
    id: 'BP11',
    level: 'E',
    subtopic: 'omvandling',
    type: 'multiple_choice',
    question: 'Hur skriver man 0,4 som ett bråk i förenklad form?',
    figure_svg: null,
    options: ['2/5', '4/10', '1/4', '2/4'],
    correct_answer: '2/5',
    hint: 'Skriv 0,4 som 4/10 och förenkla sedan.',
    evaluation_criteria: null,
  },
  {
    id: 'BP12',
    level: 'C',
    subtopic: 'procent',
    type: 'open',
    question: 'I en klass är 12 av 30 elever med i skolans idrottsklubb. Hur stor andel i procent är det? Förklara hur du räknade.',
    figure_svg: null,
    options: null,
    correct_answer: '40%',
    hint: 'Dela antalet i klubben med totala antalet elever och multiplicera med 100.',
    evaluation_criteria:
      'Eleven ska komma fram till 40%. Full poäng kräver att eleven visar beräkningen ' +
      '(12/30 = 0,4 = 40%) eller förklarar hur andelen tas fram. ' +
      'Acceptera olika räknevägar så länge metoden är korrekt.',
  },
  {
    id: 'BP13',
    level: 'C',
    subtopic: 'tallinje',
    type: 'open',
    question: 'Placera talen 1/2, 0,3 och 75% i rätt ordning från minst till störst. Förklara hur du jämförde dem.',
    figure_svg: null,
    options: null,
    correct_answer: '0,3 < 1/2 < 75%',
    hint: 'Gör om alla tal till samma form — t.ex. decimaler — innan du jämför.',
    evaluation_criteria:
      'Korrekt ordning: 0,3 < 1/2 < 75% (dvs. 0,3 < 0,5 < 0,75). ' +
      'C-poäng kräver att eleven visar hur de gjort talen jämförbara, t.ex. genom att omvandla ' +
      'till decimaler eller procent. Enbart korrekt ordning utan förklaring ger E.',
  },
  {
    id: 'BP14',
    level: 'A',
    subtopic: 'procent',
    type: 'open',
    question: 'En vara kostar 250 kr efter att priset höjts med 25%. Vad kostade varan innan höjningen? Förklara din metod.',
    figure_svg: null,
    options: null,
    correct_answer: '200 kr',
    hint: 'Det nya priset är 125% av det gamla. Vad är då 100%?',
    evaluation_criteria:
      'Korrekt svar är 200 kr. A-poäng kräver att eleven förstår och förklarar att 250 kr ' +
      'motsvarar 125% och att man därför delar med 1,25 (eller räknar 250/125×100). ' +
      'Eleven ska förklara VARFÖR metoden fungerar — att det ursprungliga priset är basen (100%) ' +
      'och att man räknar baklänges. Enbart korrekt svar utan förklaring ger C.',
  },
  {
    id: 'BP15',
    level: 'A',
    subtopic: 'jämförelse',
    type: 'open',
    question: 'Är 3/7 eller 4/9 närmast 1/2? Förklara utan att räkna om till decimaler.',
    figure_svg: null,
    options: null,
    correct_answer: '4/9',
    hint: 'Tänk på hur långt varje bråk är från hälften — hur stor är "skillnaden" i täljare och nämnare?',
    evaluation_criteria:
      'Korrekt svar är 4/9. A-poäng kräver ett resonemang utan decimalomvandling. ' +
      'Accepterade metoder: (1) Jämföra med halva nämnaren: hälften av 7 är 3,5 → 3/7 är 0,5/7 under 1/2; ' +
      'hälften av 9 är 4,5 → 4/9 är 0,5/9 under 1/2. Eftersom 0,5/9 < 0,5/7 är 4/9 närmast. ' +
      '(2) Likvärdigt algebraiskt resonemang. Poängen ligger i att eleven kan jämföra avstånd från 1/2 ' +
      'utan att konvertera till decimaler och förklarar VARFÖR metoden fungerar.',
  },
];
