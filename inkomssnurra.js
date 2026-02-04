// Körs i webbläsare via CDN (React + ReactDOM + Babel). 
// Förväntar att React och ReactDOM finns som globala variabler.
const { useMemo, useState } = React;

/**
 * Inkomstförsäkringskalkylator (Sveriges Ingenjörer / Folksam – beräkningslogik återgiven i förenklad form).
 *
 * Datapunkter (källor):
 * - Grundskydd: upp till 80% av a-kassegrundande lön upp till 100 000 kr/mån brutto i 150 ersättningsdagar.
 * - Frivilligt tillägg: inkomsttak 160 000 kr, nivåer: 80% dag 1–100, 70% dag 101–200, 65% dag 201–300.
 * - A-kassans inkomsttak (fr.o.m. 1 okt 2025): 34 000 kr/mån för dag 1–300.
 * - Äldre villkor (t.o.m. 30 sep 2025): inkomsttak 33 000 (1–100), 27 500 (101–200), 31 428 (201–300) och nivå 80% (1–200), 70% (201–300).
 * - Folksam beskriver även att schablonavdrag görs enligt skattetabell 30 kolumn 5 och att utbetalad ersättning är skattefri.
 *
 * OBS: Den här kalkylatorn är avsedd som en pedagogisk webapp (”indikativ beräkning”).
 * Faktisk ersättning bestäms av a-kassans beslut och Folksams villkor.
 */

// -------------------------
// Design tokens (Trygg-Hansa-inspirerade)
// -------------------------
const theme = {
  // Inspirerat av Trygg-Hansas visuella uttryck (mörk blå bas + varm accent).
  // Om ni har exakta brand-HEX från en brandbook: byt här.
  thBlue900: "#0B2B4C",
  thBlue700: "#11406E",
  thBlue050: "#F3F7FB",
  thYellow: "#F4B400",
  thText: "#0B1B2B",
  thMuted: "#5B6B7A",
  thBorder: "#D6E1EC",
  thWhite: "#FFFFFF",
  thDanger: "#B42318",
};

// -------------------------
// Product/rule definitions
// -------------------------
const RULESETS = {
  post_2025_10_01: {
    id: "post_2025_10_01",
    label: "Villkor från 1 okt 2025 (standard)",
    // A-kassans tak: 34 000 kr/mån dag 1–300
    akassaCapsByDaySpan: [
      { fromDay: 1, toDay: 300, monthlyCap: 34000 },
    ],
    // Ersättningsnivåer: 80% (1–100), 70% (101–200), 65% (201–300)
    levelsByDaySpan: [
      { fromDay: 1, toDay: 100, level: 0.8 },
      { fromDay: 101, toDay: 200, level: 0.7 },
      { fromDay: 201, toDay: 300, level: 0.65 },
    ],
  },
  pre_2025_10_01: {
    id: "pre_2025_10_01",
    label: "Villkor t.o.m. 30 sep 2025",
    // A-kassans tak: 33 000 (1–100), 27 500 (101–200), 31 428 (201–300)
    akassaCapsByDaySpan: [
      { fromDay: 1, toDay: 100, monthlyCap: 33000 },
      { fromDay: 101, toDay: 200, monthlyCap: 27500 },
      { fromDay: 201, toDay: 300, monthlyCap: 31428 },
    ],
    // Nivå: 80% (1–200), 70% (201–300)
    levelsByDaySpan: [
      { fromDay: 1, toDay: 200, level: 0.8 },
      { fromDay: 201, toDay: 300, level: 0.7 },
    ],
  },
};

const PRODUCTS = {
  base: {
    id: "base",
    label: "Inkomstförsäkring (ingår)",
    insuredIncomeCap: 100000,
    maxDays: 150,
    // I Folksams text anges ”upp till 80% … i 150 ersättningsdagar”.
    // För en enkel räknesnurra antar vi 80% under perioden.
    fixedLevel: 0.8,
  },
  addon: {
    id: "addon",
    label: "Frivilligt tillägg (upp till 300 dagar / högre inkomst)",
    insuredIncomeCap: 160000,
    maxDays: 300,
    // Nivåerna styrs av regelsystemet (fr.o.m. 1 okt 2025: 80/70/65; tidigare: 80/70)
    usesRulesetLevels: true,
  },
};

// -------------------------
// Helpers
// -------------------------
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function formatSEK(value) {
  if (!Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function parseSEK(input) {
  // Tillåt t.ex. "52 000" eller "52000" eller "52,000".
  const normalized = String(input).replace(/\s/g, "").replace(/,/g, "");
  const v = Number(normalized);
  return Number.isFinite(v) ? v : NaN;
}

function formatSEKCompact(value) {
  if (!Number.isFinite(value)) return "–";
  const v = Math.round(value);
  if (v >= 1000000) return `${(v / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (v >= 1000) return `${Math.round(v / 1000)}k`;
  return String(v);
}

function buildSegments({ ruleset, product }) {
  const maxDays = product.maxDays;

  // Nivåer
  const levelSpans = product.usesRulesetLevels
    ? ruleset.levelsByDaySpan
    : [{ fromDay: 1, toDay: maxDays, level: product.fixedLevel }];

  // A-kassans tak (månadsinkomst)
  const capSpans = ruleset.akassaCapsByDaySpan;

  // Bygg segment genom att dela på alla brytpunkter (fromDay) från nivåer och tak, samt maxDays.
  const cutpoints = new Set([1, maxDays + 1]);
  for (const s of levelSpans) {
    cutpoints.add(s.fromDay);
    cutpoints.add(s.toDay + 1);
  }
  for (const s of capSpans) {
    cutpoints.add(s.fromDay);
    cutpoints.add(s.toDay + 1);
  }

  const points = Array.from(cutpoints).sort((a, b) => a - b);
  const segments = [];

  function levelAt(day) {
    const hit = levelSpans.find((s) => day >= s.fromDay && day <= s.toDay);
    return hit ? hit.level : levelSpans[levelSpans.length - 1].level;
  }

  function capAt(day) {
    const hit = capSpans.find((s) => day >= s.fromDay && day <= s.toDay);
    return hit ? hit.monthlyCap : capSpans[capSpans.length - 1].monthlyCap;
  }

  for (let i = 0; i < points.length - 1; i++) {
    const fromDay = points[i];
    const toDay = points[i + 1] - 1;
    if (fromDay > maxDays) continue;
    const clippedTo = Math.min(toDay, maxDays);
    if (fromDay > clippedTo) continue;

    segments.push({
      fromDay,
      toDay: clippedTo,
      days: clippedTo - fromDay + 1,
      level: levelAt(fromDay),
      akassaMonthlyCap: capAt(fromDay),
    });
  }

  return segments;
}

function computeMonthly({ salary, product, ruleset, insuredCapOverride, baseCap = 100000 }) {
  const segments = buildSegments({ ruleset, product });
  const insuredCap = Math.max(0, Math.min(
    typeof insuredCapOverride === "number" ? insuredCapOverride : product.insuredIncomeCap,
    product.insuredIncomeCap
  ));

  const rows = segments.map((seg) => {
    const level = seg.level;
    const akassa = level * Math.min(salary, seg.akassaMonthlyCap);

    // Total mål (upp till valt maxtak)
    const targetTotal = level * Math.min(salary, insuredCap);

    // Uppdelning:
    // - Obligatorisk del: toppar upp från a-kassa till mål upp till bas-taket (vanligen 100 000)
    // - Frivilligt tillägg: del över bas-taket upp till valt maxtak
    // För segment efter att basen normalt upphör (dag > 150) sätts obligatorisk del till 0.
    const baseApplies = product.id === "addon" ? seg.fromDay <= 150 : true;
    const baseCapEffective = Math.min(baseCap, insuredCap);

    const targetBase = baseApplies ? level * Math.min(salary, baseCapEffective) : 0;
    const obligatory = Math.max(0, targetBase - akassa);

    const voluntary = Math.max(0, targetTotal - akassa - obligatory);

    const total = akassa + obligatory + voluntary;

    return {
      ...seg,
      level,
      akassaMonthlyApprox: akassa,
      obligatoryMonthly: obligatory,
      voluntaryMonthly: voluntary,
      totalMonthly: total,
      insuredIncomeCap: insuredCap,
    };
  });

  return { segments: rows, insuredIncomeCap: insuredCap };
}

// -------------------------
// UI components
// -------------------------
function Badge({ children, tone = "neutral" }) {
  const bg =
    tone === "accent"
      ? "rgba(244,180,0,0.18)"
      : tone === "info"
      ? "rgba(17,64,110,0.10)"
      : "rgba(91,107,122,0.12)";
  const fg =
    tone === "accent" ? theme.thText : tone === "info" ? theme.thBlue900 : theme.thMuted;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        background: bg,
        color: fg,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.2,
      }}
    >
      {children}
    </span>
  );
}

function Card({ title, subtitle, children, right }) {
  return (
    <section
      style={{
        background: theme.thWhite,
        border: `1px solid ${theme.thBorder}`,
        borderRadius: 16,
        boxShadow: "0 10px 25px rgba(11,43,76,0.06)",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          padding: "18px 18px 12px 18px",
          borderBottom: `1px solid ${theme.thBorder}`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: theme.thText }}>{title}</div>
          {subtitle ? (
            <div style={{ marginTop: 6, fontSize: 13, color: theme.thMuted, lineHeight: 1.35 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        {right ? <div style={{ flex: "0 0 auto" }}>{right}</div> : null}
      </header>
      <div style={{ padding: 18 }}>{children}</div>
    </section>
  );
}

function Field({ label, hint, children, error }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.thText }}>{label}</div>
        {hint ? <div style={{ fontSize: 12, color: theme.thMuted }}>{hint}</div> : null}
      </div>
      <div style={{ marginTop: 8 }}>{children}</div>
      {error ? (
        <div style={{ marginTop: 8, fontSize: 12, color: theme.thDanger, fontWeight: 600 }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "12px 12px",
        borderRadius: 12,
        border: `1px solid ${theme.thBorder}`,
        background: theme.thWhite,
        color: theme.thText,
        fontSize: 14,
        outline: "none",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode="numeric"
      style={{
        width: "100%",
        padding: "12px 12px",
        borderRadius: 12,
        border: `1px solid ${theme.thBorder}`,
        background: theme.thWhite,
        color: theme.thText,
        fontSize: 16,
        outline: "none",
      }}
    />
  );
}

function Table({ rows }) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        border: `1px solid ${theme.thBorder}`,
        borderRadius: 14,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
        <thead>
          <tr style={{ background: theme.thBlue050 }}>
            {[
              "Period",
              "Nivå",
              "A-kassans inkomsttak",
              "A-kassa (approx)",
              "Obligatorisk del",
              "Frivilligt tillägg",
              "Total ersättning",
            ].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "12px 12px",
                  fontSize: 12,
                  color: theme.thMuted,
                  fontWeight: 800,
                  borderBottom: `1px solid ${theme.thBorder}`,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} style={{ background: idx % 2 ? "#fff" : "rgba(243,247,251,0.35)" }}>
              <td style={{ padding: "12px 12px", borderBottom: `1px solid ${theme.thBorder}` }}>
                Dag {r.fromDay}–{r.toDay}
              </td>
              <td style={{ padding: "12px 12px", borderBottom: `1px solid ${theme.thBorder}` }}>
                {Math.round(r.level * 100)}%
              </td>
              <td style={{ padding: "12px 12px", borderBottom: `1px solid ${theme.thBorder}` }}>
                {formatSEK(r.akassaMonthlyCap)}/mån
              </td>
              <td style={{ padding: "12px 12px", borderBottom: `1px solid ${theme.thBorder}` }}>
                {formatSEK(r.akassaMonthlyApprox)}/mån
              </td>
              <td style={{ padding: "12px 12px", borderBottom: `1px solid ${theme.thBorder}` }}>
                {formatSEK(r.obligatoryMonthly)}/mån
              </td>
              <td style={{ padding: "12px 12px", borderBottom: `1px solid ${theme.thBorder}` }}>
                {formatSEK(r.voluntaryMonthly)}/mån
              </td>
              <td style={{ padding: "12px 12px", borderBottom: `1px solid ${theme.thBorder}` }}>
                <span style={{ fontWeight: 900 }}>{formatSEK(r.totalMonthly)}/mån</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SegmentedToggle({ value, onChange }) {
  const btnStyle = (active, left, right) => ({
    flex: "1 1 0",
    padding: "10px 14px",
    border: `1px solid ${theme.thBorder}`,
    background: active ? theme.thBlue700 : theme.thWhite,
    color: active ? theme.thWhite : theme.thText,
    fontWeight: 900,
    borderRadius: left ? "999px 0 0 999px" : right ? "0 999px 999px 0" : 0,
    cursor: "pointer",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 999,
        border: `1px solid ${theme.thBorder}`,
        overflow: "hidden",
        background: theme.thWhite,
      }}
    >
      <button type="button" onClick={() => onChange("diagram")} style={btnStyle(value === "diagram", true, false)}>
        Diagram
      </button>
      <button type="button" onClick={() => onChange("table")} style={btnStyle(value === "table", false, true)}>
        Tabell
      </button>
    </div>
  );
}

function PeriodStackedChart({ rows, title = "Diagram", subtitle }) {
  const width = 980;
  const height = 420;
  const padding = { top: 28, right: 18, bottom: 110, left: 74 };

  const maxY = Math.max(
    1,
    ...rows.map((r) => r.akassaMonthlyApprox + r.obligatoryMonthly + r.voluntaryMonthly)
  );

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const yScale = (v) => padding.top + (1 - v / maxY) * innerH;
  const hScale = (v) => (v / maxY) * innerH;

  const gap = 70;
  const barW = Math.max(70, Math.min(200, (innerW - gap * (rows.length - 1)) / rows.length));
  const totalBarsW = barW * rows.length + gap * (rows.length - 1);
  const startX = padding.left + Math.max(0, (innerW - totalBarsW) / 2);

  const yTicks = 4;
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => (i * maxY) / yTicks);

  return (
    <div
      style={{
        border: `1px solid ${theme.thBorder}`,
        borderRadius: 14,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(243,247,251,0.55))",
      }}
    >
      <div style={{ padding: "12px 12px 0 12px" }}>
        <div style={{ fontWeight: 900, color: theme.thText }}>{title}</div>
        {subtitle ? (
          <div style={{ marginTop: 4, fontSize: 12, color: theme.thMuted, lineHeight: 1.35 }}>{subtitle}</div>
        ) : null}
      </div>

      <div style={{ padding: 12 }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" role="img" aria-label={title}>
          {/* Grid + Y ticks */}
          {yTickVals.map((v, i) => {
            const y = yScale(v);
            return (
              <g key={`y-${i}`}>
                <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke={theme.thBorder} strokeWidth="1" />
                <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="12" fill={theme.thMuted}>
                  {formatSEK(v)}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1={padding.left} x2={padding.left} y1={padding.top} y2={height - padding.bottom} stroke={theme.thMuted} strokeWidth="1.2" />
          <line x1={padding.left} x2={width - padding.right} y1={height - padding.bottom} y2={height - padding.bottom} stroke={theme.thMuted} strokeWidth="1.2" />

          {/* Bars */}
          {rows.map((r, i) => {
            const x = startX + i * (barW + gap);
            const baseY = height - padding.bottom;

            const hVol = hScale(r.voluntaryMonthly);
            const hObl = hScale(r.obligatoryMonthly);
            const hAk = hScale(r.akassaMonthlyApprox);

            const yVol = baseY - hVol;
            const yObl = yVol - hObl;
            const yAk = yObl - hAk;

            const total = r.akassaMonthlyApprox + r.obligatoryMonthly + r.voluntaryMonthly;

            const labelPeriod = `Dag ${r.fromDay}–${r.toDay}`;

            return (
              <g key={`bar-${i}`}>
                {/* Total label */}
                <text x={x} y={yAk - 16} textAnchor="start" fontSize="14" fill={theme.thText} style={{ fontWeight: 900 }}>
                  Totalt
                </text>
                <text x={x} y={yAk - 2} textAnchor="start" fontSize="16" fill={theme.thText} style={{ fontWeight: 950 }}>
                  {formatSEK(total)}/månad
                </text>

                {/* A-kassa (top) */}
                <rect x={x} y={yAk} width={barW} height={hAk} rx={12} ry={12} fill={theme.thBlue900} />

                {/* Obligatorisk (middle) */}
                {hObl > 0 ? (
                  <rect x={x} y={yObl} width={barW} height={hObl} fill="#9ED2FF" />
                ) : null}

                {/* Frivilligt (bottom) */}
                {hVol > 0 ? (
                  <rect x={x} y={yVol} width={barW} height={hVol} rx={12} ry={12} fill="#F4B6DE" />
                ) : null}

                {/* Segment labels */}
                <text x={x + 16} y={yAk + Math.min(hAk - 10, 44)} fontSize="13" fill={theme.thWhite} style={{ fontWeight: 800 }}>
                  A-kassa
                </text>
                <text x={x + 16} y={yAk + Math.min(hAk - 10, 64)} fontSize="14" fill={theme.thWhite} style={{ fontWeight: 900 }}>
                  {formatSEK(r.akassaMonthlyApprox)}/månad
                </text>

                {hObl > 0 ? (
                  <>
                    <text x={x + 16} y={yObl + 34} fontSize="13" fill={theme.thText} style={{ fontWeight: 800 }}>
                      Obligatorisk försäkring
                    </text>
                    <text x={x + 16} y={yObl + 56} fontSize="14" fill={theme.thText} style={{ fontWeight: 950 }}>
                      {formatSEK(r.obligatoryMonthly)}/månad
                    </text>
                  </>
                ) : null}

                {hVol > 0 ? (
                  <>
                    <text x={x + 16} y={yVol + 34} fontSize="13" fill={theme.thText} style={{ fontWeight: 800 }}>
                      Frivilligt tillägg
                    </text>
                    <text x={x + 16} y={yVol + 56} fontSize="14" fill={theme.thText} style={{ fontWeight: 950 }}>
                      {formatSEK(r.voluntaryMonthly)}/månad
                    </text>
                  </>
                ) : null}

                {/* X label */}
                <text x={x + barW / 2} y={height - padding.bottom + 34} textAnchor="middle" fontSize="13" fill={theme.thText}>
                  {labelPeriod}
                </text>
              </g>
            );
          })}

          {/* Axis labels */}
          <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="12" fill={theme.thMuted}>
            Tidsperiod (ersättningsdagar)
          </text>
          <text
            x={14}
            y={height / 2}
            textAnchor="middle"
            fontSize="12"
            fill={theme.thMuted}
            transform={`rotate(-90 14 ${height / 2})`}
          >
            Ersättning per månad
          </text>
        </svg>

        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 12, alignItems: "center" }}>
          <span style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 12, color: theme.thMuted }}>
            <span style={{ width: 18, height: 18, background: theme.thBlue900, display: "inline-block", borderRadius: 6 }} />
            A-kassa
          </span>
          <span style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 12, color: theme.thMuted }}>
            <span style={{ width: 18, height: 18, background: "#9ED2FF", display: "inline-block", borderRadius: 6 }} />
            Obligatorisk försäkring
          </span>
          <span style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 12, color: theme.thMuted }}>
            <span style={{ width: 18, height: 18, background: "#F4B6DE", display: "inline-block", borderRadius: 6 }} />
            Frivilligt tillägg
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------
// App
// -------------------------
function App() {
  const [salaryInput, setSalaryInput] = useState("55000");
  const [productId, setProductId] = useState(PRODUCTS.base.id);
  const [rulesetId, setRulesetId] = useState(RULESETS.post_2025_10_01.id);
  const [showNotes, setShowNotes] = useState(true);
  const [viewMode, setViewMode] = useState("diagram");
  const [insuredCapInput, setInsuredCapInput] = useState(String(PRODUCTS.base.insuredIncomeCap));

  const salary = useMemo(() => parseSEK(salaryInput), [salaryInput]);
  const product = PRODUCTS[productId];
  const ruleset = RULESETS[rulesetId];

  // Uppdatera default för maxtak när man byter produkt
  React.useEffect(() => {
    setInsuredCapInput(String(PRODUCTS[productId].insuredIncomeCap));
  }, [productId]);

  const insuredCapValue = parseSEK(insuredCapInput);
  const insuredCapError =
    Number.isFinite(insuredCapValue) && insuredCapValue > 0
      ? null
      : "Ange ett maxtak (SEK/mån) som ett positivt tal.";

  const insuredCapClamped = Number.isFinite(insuredCapValue)
    ? clamp(insuredCapValue, 1, product.insuredIncomeCap)
    : product.insuredIncomeCap;

  const salaryError =
    Number.isFinite(salary) && salary > 0
      ? null
      : "Ange en månadslön (brutto) som ett positivt tal.";

  const result = useMemo(() => {
    if (!Number.isFinite(salary) || salary <= 0) return null;
    return computeMonthly({ salary, product, ruleset, insuredCapOverride: insuredCapClamped, baseCap: 100000 });
  }, [salary, product, ruleset, insuredCapClamped]);

  const headline = "Räkna ut ersättning vid arbetslöshet";
  const subheadline =
    "Indikativ kalkylator för inkomstförsäkring (Sveriges Ingenjörer / Folksam). Ange din månadslön för att se ungefärlig ersättning från a-kassa och inkomstförsäkring.";

  const summary = useMemo(() => {
    if (!result) return null;
    const rows = result.segments;

    const maxIncomeCap = product.insuredIncomeCap;
    const cappedSalary = Math.min(salary, maxIncomeCap);

    // Visa första segmentet som "startnivå".
    const first = rows[0];
    const last = rows[rows.length - 1];

    return {
      cappedSalary,
      firstTotal: first.totalMonthly,
      firstIncomeInsurance: first.obligatoryMonthly + first.voluntaryMonthly,
      firstAkassa: first.akassaMonthlyApprox,
      lastTotal: last.totalMonthly,
      lastIncomeInsurance: last.obligatoryMonthly + last.voluntaryMonthly,
      lastAkassa: last.akassaMonthlyApprox,
    };
  }, [result, product, salary]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(1200px 800px at 20% -10%, rgba(17,64,110,0.20), transparent 55%), radial-gradient(900px 600px at 110% 10%, rgba(244,180,0,0.20), transparent 45%), ${theme.thBlue050}`,
        color: theme.thText,
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: `linear-gradient(90deg, ${theme.thBlue900}, ${theme.thBlue700})`,
          color: theme.thWhite,
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              aria-hidden
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: `linear-gradient(135deg, rgba(244,180,0,0.95), rgba(244,180,0,0.55))`,
                boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
                display: "grid",
                placeItems: "center",
                color: theme.thBlue900,
                fontWeight: 950,
                letterSpacing: 0.2,
              }}
            >
              TH
            </div>
            <div>
              <div style={{ fontWeight: 900, letterSpacing: 0.2 }}>
                Trygg-Hansa • Inkomstförsäkring
              </div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Webapp (prototyp)</div>
            </div>
          </div>
          <Badge tone="accent">Räknesnurra</Badge>
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 18px 40px 18px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: -0.2 }}>{headline}</h1>
          <p style={{ margin: 0, color: theme.thMuted, lineHeight: 1.55 }}>{subheadline}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 16,
              alignItems: "start",
            }}
          >
            {/* Inputs */}
            <div style={{ gridColumn: "span 12" }}>
              <Card
                title="Ange dina uppgifter"
                subtitle="Beräkningen bygger på Folksams beskrivning av inkomstförsäkringen för Sveriges Ingenjörer och a-kassans inkomsttak/ersättningsnivåer."
                right={
                  <button
                    type="button"
                    onClick={() => setShowNotes((v) => !v)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: `1px solid ${theme.thBorder}`,
                      background: theme.thWhite,
                      color: theme.thText,
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    {showNotes ? "Dölj antaganden" : "Visa antaganden"}
                  </button>
                }
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: 14,
                  }}
                >
                  <div style={{ gridColumn: "span 12" }}>
                    <Field label="Månadslön (brutto)" hint="SEK" error={salaryError}>
                      <Input
                        value={salaryInput}
                        onChange={setSalaryInput}
                        placeholder="Ex: 55 000"
                      />
                    </Field>
                  </div>

                  <div style={{ gridColumn: "span 12" }}>
                    <Field label="Försäkringsvariant" hint="Välj skyddsnivå">
                      <Select
                        value={productId}
                        onChange={setProductId}
                        options={Object.values(PRODUCTS).map((p) => ({
                          value: p.id,
                          label: p.label,
                        }))}
                      />
                    </Field>
                  </div>

                  <div style={{ gridColumn: "span 12" }}>
                    <Field label="Regelverk" hint="Påverkar nivåer och a-kassetak">
                      <Select
                        value={rulesetId}
                        onChange={setRulesetId}
                        options={Object.values(RULESETS).map((r) => ({
                          value: r.id,
                          label: r.label,
                        }))}
                      />
                    </Field>
                  </div>

                  <div style={{ gridColumn: "span 12" }}>
                    <Field
                      label="Maxtak inkomstförsäkring"
                      hint={`Max ${formatSEK(product.insuredIncomeCap)}/mån`}
                      error={insuredCapError}
                    >
                      <Input
                        value={insuredCapInput}
                        onChange={setInsuredCapInput}
                        placeholder={`Ex: ${product.insuredIncomeCap}`}
                      />
                    </Field>
                    <div style={{ marginTop: 6, fontSize: 12, color: theme.thMuted }}>
                      Används som beräkningstak (kan inte överstiga produktens max). Just nu: <strong>{formatSEK(insuredCapClamped)}/mån</strong>.
                    </div>
                  </div>

                  {showNotes ? (
                    <div style={{ gridColumn: "span 12" }}>
                      <div
                        style={{
                          borderRadius: 14,
                          padding: 14,
                          background: "rgba(17,64,110,0.06)",
                          border: `1px solid ${theme.thBorder}`,
                        }}
                      >
                        <div style={{ fontWeight: 900, marginBottom: 8 }}>Antaganden i prototypen</div>
                        <ul style={{ margin: 0, paddingLeft: 18, color: theme.thMuted, lineHeight: 1.5 }}>
                          <li>
                            A-kassa approximeras som <strong>ersättningsnivå × min(lön, a-kassans inkomsttak)</strong>.
                          </li>
                          <li>
                            Inkomstförsäkringen beräknas som <strong>max(0, mål – a-kassa)</strong>, där mål =
                            <strong> ersättningsnivå × min(lön, försäkringens inkomsttak)</strong>.
                          </li>
                          <li>
                            Beloppen visas som <strong>brutto/indikativa</strong>. Folksam anger att ett schablonavdrag görs enligt
                            skattetabell 30 kolumn 5 och att utbetalad ersättning är skattefri.
                          </li>
                          <li>
                            Den faktiska ersättningen styrs av a-kassans beslut (bl.a. ersättningsperiod och nivå) och Folksams villkor.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Card>
            </div>

            {/* Summary */}
            <div style={{ gridColumn: "span 12" }}>
              <Card
                title="Resultat (per månad)"
                subtitle={
                  productId === PRODUCTS.base.id
                    ? `Grundskydd upp till inkomsttak ${formatSEK(PRODUCTS.base.insuredIncomeCap)}/mån och max ${PRODUCTS.base.maxDays} ersättningsdagar.`
                    : `Frivilligt tillägg upp till inkomsttak ${formatSEK(PRODUCTS.addon.insuredIncomeCap)}/mån och upp till ${PRODUCTS.addon.maxDays} ersättningsdagar.`
                }
                right={
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Badge tone="info">Indikativt</Badge>
                    <SegmentedToggle value={viewMode} onChange={setViewMode} />
                  </div>
                }
              >
                {!result ? (
                  <div style={{ color: theme.thMuted }}>Ange en lön för att se beräkning.</div>
                ) : (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(12, 1fr)",
                        gap: 14,
                        marginBottom: 14,
                      }}
                    >
                      <div
                        style={{
                          gridColumn: "span 12",
                          borderRadius: 16,
                          padding: 14,
                          border: `1px solid ${theme.thBorder}`,
                          background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(243,247,251,0.65))",
                        }}
                      >
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                          <Badge tone="neutral">Lön: {formatSEK(salary)}/mån</Badge>
                          <Badge tone="neutral">Beräknad lön inom tak: {formatSEK(summary.cappedSalary)}/mån</Badge>
                          <Badge tone="accent">Inkomsttak: {formatSEK(product.insuredIncomeCap)}/mån</Badge>
                        </div>

                        <div
                          style={{
                            marginTop: 12,
                            display: "grid",
                            gridTemplateColumns: "repeat(12, 1fr)",
                            gap: 12,
                          }}
                        >
                          <div style={{ gridColumn: "span 12" }}>
                            <div style={{ fontSize: 12, color: theme.thMuted, fontWeight: 800 }}>
                              Start (första ersättningsperioden i vald modell)
                            </div>
                            <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 10 }}>
                              <div style={{ fontWeight: 950, fontSize: 20 }}>
                                Total: {formatSEK(summary.firstTotal)}/mån
                              </div>
                              <div style={{ color: theme.thMuted, alignSelf: "center" }}>
                                (A-kassa: {formatSEK(summary.firstAkassa)} / Inkomstförsäkring: {formatSEK(summary.firstIncomeInsurance)})
                              </div>
                            </div>
                          </div>

                          {productId === PRODUCTS.addon.id ? (
                            <div style={{ gridColumn: "span 12" }}>
                              <div style={{ fontSize: 12, color: theme.thMuted, fontWeight: 800 }}>
                                Senare i perioden (sista segmentet i vald modell)
                              </div>
                              <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 10 }}>
                                <div style={{ fontWeight: 950, fontSize: 18 }}>
                                  Total: {formatSEK(summary.lastTotal)}/mån
                                </div>
                                <div style={{ color: theme.thMuted, alignSelf: "center" }}>
                                  (A-kassa: {formatSEK(summary.lastAkassa)} / Inkomstförsäkring: {formatSEK(summary.lastIncomeInsurance)})
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {viewMode === "diagram" ? (
                      <PeriodStackedChart
                        rows={result.segments}
                        subtitle="Staplarna visar per period hur ersättningen fördelas mellan a-kassa, obligatorisk del och frivilligt tillägg."
                      />
                    ) : (
                      <Table rows={result.segments} />
                    )}

                    <div style={{ marginTop: 12, color: theme.thMuted, fontSize: 12, lineHeight: 1.45 }}>
                      Tips: Vill ni spegla Folksams räknesnurra mer exakt kan ni komplettera med (1) schablonavdrag enligt skattetabell 30 kol 5,
                      (2) dag-/månadskonvertering enligt a-kassans utbetalningsmodell, samt (3) hantering av samordning med omställningsavtal.
                    </div>
                  </>
                )}
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div style={{ color: theme.thMuted, fontSize: 12, lineHeight: 1.5, marginTop: 8 }}>
            <div style={{ fontWeight: 900, color: theme.thText }}>Juridisk/produktnotis</div>
            <div>
              Den här webappen är en prototyp. Försäkringsvillkor och ersättning fastställs av Folksam och Akademikernas a-kassa.
              Beräkningen här är förenklad och avsedd att illustrera principen "tillsammans med a-kassan upp till X%" och inkomsttak.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Gör komponenten tillgänglig globalt (valfritt)
window.InkomstsnurraApp = App;

// Auto-mount om det finns en #root på sidan
const rootEl = document.getElementById("root");
if (rootEl && window.ReactDOM?.createRoot) {
  ReactDOM.createRoot(rootEl).render(<App />);
} else if (rootEl && window.ReactDOM?.render) {
  // Fallback för äldre ReactDOM
  ReactDOM.render(<App />, rootEl);
}
