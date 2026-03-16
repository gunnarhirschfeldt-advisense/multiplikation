# 🎮 Kids Math Quest — Projektöversikt

Interaktiva matteappar byggda som självständiga HTML-filer för mobil och desktop.
Skapade för **Jakob (10 år)** och **Louise (12 år)**.

---

## Appar

### `multiplikation.html` — Math Quest
Multiplikationsträning med pixel/retro-spelkänsla.

**Spellägen**
- ⚔️ Klassisk — 10 frågor, blandat
- ⚡ Speed — 8 sekunder per fråga
- 👾 Boss — klara 20 i rad utan fel
- 🎯 Fokus — adaptivt, övar svagaste kombinationerna automatiskt

**Features**
- XP-system med 7 nivåer (Nybörjare → Legenden)
- 8 badges att låsa upp
- Daglig streak (7-dagarsvyn)
- Statistikskärm med rutnät (2×2 – 10×10), svåraste/långsammaste kombinationer
- Anpassningsbart namn
- All data sparas i `localStorage` under nyckeln `jakob_mq`

**Datastruktur (`localStorage: jakob_mq`)**
```json
{
  "xp": 0,
  "totalAnswered": 0,
  "totalCorrect": 0,
  "perfectPasses": 0,
  "maxStreak": 0,
  "maxDayStreak": 0,
  "bossKills": 0,
  "earnedBadges": [],
  "dayStreak": 0,
  "lastPlayDate": null,
  "tableWeights": {},
  "combStats": {
    "7x8": { "a": 7, "b": 8, "correct": 3, "wrong": 1, "totalTime": 18.4, "attempts": 4 }
  },
  "playerName": "Jakob"
}
```

---

### `louise_ekvationer.html` — Equation Lab
Ekvationslösning med en animerad våg/balansvåg. Laboratorietema.

**Svårighetsgrader**
- 🌱 Enkel — `x + a = b`
- ⚗️ Medel — `ax + b = c`
- 🔬 Svår — `ax + b = cx + d`

**Gameplay**
- 8 frågor per pass
- Välj värde på x bland 6 alternativ
- Vågen visar visuellt om ekvationen balanserar
- Ledtråd-knapp (ger inga bonus-XP)
- XP-system med 7 nivåer (Nybörjare → Legenden)
- Daglig streak

**Datastruktur (`localStorage: louise_eq`)**
```json
{
  "xp": 0,
  "totalSolved": 0,
  "totalAttempts": 0,
  "totalWrong": 0,
  "maxStreak": 0,
  "dayStreak": 0,
  "lastPlayDate": null,
  "maxDayStreak": 0,
  "playerName": "Louise"
}
```

---

## Teknisk stack

| Vad | Hur |
|-----|-----|
| Format | Självständiga `.html`-filer, inga beroenden |
| Ramverk | Vanilla JS, CSS custom properties |
| Fonts | Google Fonts (Press Start 2P + Nunito / Syne + DM Mono) |
| Lagring | `localStorage` per webbläsare/enhet |
| Deploy | GitHub Pages (statisk hosting) |

---

## Idéer för nästa version

### Jakob — Math Quest v3
- [ ] Synka statistik mellan enheter (t.ex. via enkel backend eller Firebase)
- [ ] Fler badge-kategorier (snabbhet, tabellmästare per tabell)
- [ ] Graf som visar förbättring över tid
- [ ] Dela upp i separata JS/CSS-filer

### Louise — Equation Lab v2
- [ ] Fritext-input istället för flerval (skriva in svaret själv)
- [ ] Statistik per ekvationstyp (som Jakobs `combStats`)
- [ ] Negativa tal och decimalkoefficienter
- [ ] Animera "flytta termer" steg-för-steg som pedagogisk hjälp

### Gemensamt
- [ ] Gemensam topplista / tävlingsläge syskon emellan
- [ ] Nästa app: Koordinatjakten, Bråk-Fighter eller Procentjägaren

---

## Deployment (GitHub Pages)

```bash
# Lägg filerna i ett repo och aktivera GitHub Pages
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/DITT-ANVÄNDARNAMN/math-apps.git
git push -u origin main
# Aktivera Pages under Settings → Pages → main branch
```

Appen är sedan tillgänglig på:
`https://DITT-ANVÄNDARNAMN.github.io/math-apps/multiplikation.html`

---

## Tips till Claude Code

```
Hej! Jag har ett projekt med två interaktiva matteappar för barn.
- jakob_multiplikation.html – multiplikationsträning för Jakob (10 år)
- louise_ekvationer.html – ekvationslösning för Louise (12 år)

Läs README.md för fullständig dokumentation och datastrukturer.
Båda apparna är self-contained HTML med vanilla JS och localStorage.
```
